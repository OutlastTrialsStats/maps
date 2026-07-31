import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { AUTOSAVE_DEBOUNCE_MS, UNDO_STACK_LIMIT } from '../../core/constants'
import type { HitTarget } from '../../core/interaction/hitTest'
import type {
  ElementLibrary,
  InnerLineStyle,
  MapManifest,
  Room,
  Placement,
  RouteLine,
  TrialDocument,
  ZoneLibrary,
} from '../../core/model/types'
import { initialFloorIndex } from '../../core/model/mapDefaults'
import type { RoomToolMode, ToolId } from '../tools/toolTypes'
import { saveAutosave, type AutosavePayload, type WorkspaceSnapshot } from './documentIO'
import { jsonClone } from './jsonClone'
import { useLibraryStore } from './libraryStore'
import { useZonesStore } from './zonesStore'

/** Number of digits of the running number in generated IDs (e.g. "pl-0042"). */
const GENERATED_ID_DIGITS = 4

/**
 * While set, undo/redo route here exclusively — a document undo/redo mid-drawing
 * could delete the very room an inner line is being drawn into.
 */
export interface TransientHistory {
  canUndo(): boolean
  canRedo(): boolean
  undo(): void
  redo(): void
}

export const useEditorStore = defineStore('editor', () => {
  const libraryStore = useLibraryStore()
  const zonesStore = useZonesStore()

  const manifest = ref<MapManifest | null>(null)
  const document = ref<TrialDocument | null>(null)
  const activeTool = ref<ToolId>('select')
  const roomToolMode = ref<RoomToolMode>('polygon')
  /** 90° snapping while drawing polygons — off by default, Alt inverts temporarily. */
  const roomOrthoSnap = ref(false)
  const innerLineStyle = ref<InnerLineStyle>('object')
  const drawingHistory = shallowRef<TransientHistory | null>(null)
  /** Short tool hint for the status bar (e.g. a path that cannot be edited). */
  const toolHint = ref('')
  const activeFloor = ref(0)
  const activeElementId = ref<string | null>(null)
  const selection = ref<HitTarget[]>([])
  const undoStack = ref<WorkspaceSnapshot[]>([])
  const redoStack = ref<WorkspaceSnapshot[]>([])
  const dirty = ref(false)
  const autosaveError = ref('')
  const lastAutosaveAt = ref<Date | null>(null)
  /** Counts completed mutations — a cheap watch signal instead of a deep watcher. */
  const revision = ref(0)

  let autosaveTimer: number | undefined

  const canUndo = computed(() => drawingHistory.value?.canUndo() ?? undoStack.value.length > 0)
  const canRedo = computed(() => drawingHistory.value?.canRedo() ?? redoStack.value.length > 0)
  const floors = computed(() => document.value?.floors ?? [])
  const trials = computed(() => manifest.value?.trials ?? [])
  /** Display name of the trial being edited (from the manifest, fallback: its ID). */
  const trialName = computed(() => {
    const trialId = document.value?.trialId
    return trials.value.find((trial) => trial.id === trialId)?.name ?? trialId ?? ''
  })
  const selectedIds = computed(() => new Set(selection.value.map((target) => target.id)))

  const primarySelection = computed(() =>
    selection.value.length === 1 ? selection.value[0] : null,
  )
  const selectedRoom = computed<Room | null>(() =>
    primarySelection.value?.kind === 'room'
      ? (document.value?.rooms.find((room) => room.id === primarySelection.value?.id) ?? null)
      : null,
  )
  const selectedPlacement = computed<Placement | null>(() =>
    primarySelection.value?.kind === 'placement'
      ? (document.value?.placements.find((p) => p.id === primarySelection.value?.id) ?? null)
      : null,
  )
  const selectedRoute = computed<RouteLine | null>(() =>
    primarySelection.value?.kind === 'route'
      ? (document.value?.routes.find((route) => route.id === primarySelection.value?.id) ?? null)
      : null,
  )

  /** Undo unit: manifest + document + both global working copies (cascades stay atomic). */
  function snapshot(): WorkspaceSnapshot {
    return jsonClone({
      manifest: manifest.value as MapManifest,
      document: document.value as TrialDocument,
      library: libraryStore.library,
      zones: zonesStore.zoneLibrary,
    })
  }

  function restoreSnapshot(snap: WorkspaceSnapshot): void {
    manifest.value = snap.manifest
    document.value = snap.document
    libraryStore.restore(snap.library)
    zonesStore.restore(snap.zones)
  }

  function pushUndo(): void {
    if (!document.value) {
      return
    }
    undoStack.value.push(snapshot())
    if (undoStack.value.length > UNDO_STACK_LIMIT) {
      undoStack.value.shift()
    }
    redoStack.value = []
  }

  function markChanged(): void {
    dirty.value = true
    revision.value += 1
    scheduleAutosave()
  }

  /** Default path for all document changes: snapshot → mutation → autosave. */
  function commit(mutate: (doc: TrialDocument) => void): void {
    if (!document.value) {
      return
    }
    pushUndo()
    mutate(document.value)
    markChanged()
  }

  /** Changes to the map manifest (meta, trial names) — same undo path as `commit`. */
  function commitManifest(mutate: (target: MapManifest) => void): void {
    if (!document.value || !manifest.value) {
      return
    }
    pushUndo()
    mutate(manifest.value)
    markChanged()
  }

  /** Changes to the global element library — same undo path as `commit`. */
  function commitLibrary(mutate: (library: ElementLibrary) => void): void {
    if (!document.value || !libraryStore.library) {
      return
    }
    pushUndo()
    mutate(libraryStore.library)
    markChanged()
  }

  function commitZones(mutate: (zones: ZoneLibrary) => void): void {
    if (!document.value || !zonesStore.zoneLibrary) {
      return
    }
    pushUndo()
    mutate(zonesStore.zoneLibrary)
    markChanged()
  }

  /** Atomic change across document + library (e.g. the element delete cascade). */
  function commitWorkspace(
    mutate: (workspace: { doc: TrialDocument; library: ElementLibrary }) => void,
  ): void {
    if (!document.value || !libraryStore.library) {
      return
    }
    pushUndo()
    mutate({ doc: document.value, library: libraryStore.library })
    markChanged()
  }

  /** For drags: one snapshot at the start, direct mutations until endDrag/cancelDrag. */
  function beginDrag(): void {
    pushUndo()
  }
  function endDrag(): void {
    markChanged()
  }
  function cancelDrag(): void {
    const previous = undoStack.value.pop()
    if (previous) {
      restoreSnapshot(previous)
    }
  }

  function undo(): void {
    if (drawingHistory.value) {
      drawingHistory.value.undo()
      return
    }
    const previous = undoStack.value.pop()
    if (!previous || !document.value) {
      return
    }
    redoStack.value.push(snapshot())
    restoreSnapshot(previous)
    cleanupAfterHistory()
    markChanged()
  }

  function redo(): void {
    if (drawingHistory.value) {
      drawingHistory.value.redo()
      return
    }
    const next = redoStack.value.pop()
    if (!next || !document.value) {
      return
    }
    undoStack.value.push(snapshot())
    restoreSnapshot(next)
    cleanupAfterHistory()
    markChanged()
  }

  /** Selection/floor must not point at deleted objects after undo/redo. */
  function cleanupAfterHistory(): void {
    const doc = document.value
    if (!doc) {
      selection.value = []
      return
    }
    const ids = new Set([
      ...doc.rooms.map((room) => room.id),
      ...doc.placements.map((placement) => placement.id),
      ...doc.routes.map((route) => route.id),
    ])
    selection.value = selection.value.filter((target) => ids.has(target.id))
    if (!doc.floors.some((floor) => floor.index === activeFloor.value)) {
      activeFloor.value = doc.floors[0]?.index ?? 0
    }
    if (activeElementId.value && !libraryStore.elementIndex.has(activeElementId.value)) {
      activeElementId.value = null
    }
  }

  function setWorkspace(
    newManifest: MapManifest,
    doc: TrialDocument,
    options?: { markDirty?: boolean },
  ): void {
    manifest.value = newManifest
    document.value = doc
    undoStack.value = []
    redoStack.value = []
    drawingHistory.value = null
    selection.value = []
    activeTool.value = 'select'
    activeFloor.value = initialFloorIndex(doc.floors)
    dirty.value = options?.markDirty ?? false
    autosaveError.value = ''
    if (dirty.value) {
      scheduleAutosave()
    }
  }

  /** "Continue autosave": restores existing working copies and the workspace. */
  function restoreAutosave(payload: AutosavePayload): void {
    // Null would mean: at autosave time the library was not loaded yet —
    // then do not overwrite the freshly fetched state.
    if (payload.library) {
      libraryStore.restore(payload.library)
    }
    if (payload.zones) {
      zonesStore.restore(payload.zones)
    }
    setWorkspace(payload.manifest, payload.document, { markDirty: true })
  }

  function setSelection(targets: HitTarget[]): void {
    selection.value = targets
  }

  function clearSelection(): void {
    selection.value = []
  }

  /** Removes all selected rooms/placements/routes from the document (undoable). */
  function deleteSelection(): void {
    if (selection.value.length === 0) {
      return
    }
    const ids = selectedIds.value
    commit((doc) => {
      doc.rooms = doc.rooms.filter((room) => !ids.has(room.id))
      doc.placements = doc.placements.filter((placement) => !ids.has(placement.id))
      doc.routes = doc.routes.filter((route) => !ids.has(route.id))
      for (const placement of doc.placements) {
        if (placement.roomId && ids.has(placement.roomId)) {
          delete placement.roomId
        }
      }
    })
    selection.value = []
  }

  function generateId(prefix: string): string {
    const doc = document.value
    let max = 0
    if (doc) {
      const pattern = new RegExp(`^${prefix}-(\\d+)$`)
      const lists: Array<Array<{ id: string }>> = [
        doc.rooms,
        doc.placements,
        doc.routes,
        doc.filters,
      ]
      for (const list of lists) {
        for (const item of list) {
          const match = pattern.exec(item.id)
          if (match) {
            max = Math.max(max, Number(match[1]))
          }
        }
      }
    }
    return `${prefix}-${String(max + 1).padStart(GENERATED_ID_DIGITS, '0')}`
  }

  function scheduleAutosave(): void {
    window.clearTimeout(autosaveTimer)
    autosaveTimer = window.setTimeout(() => {
      if (!document.value || !manifest.value) {
        return
      }
      // No snapshot clone needed: saveAutosave serializes the live objects directly.
      const error = saveAutosave({
        manifest: manifest.value,
        document: document.value,
        library: libraryStore.library,
        zones: zonesStore.zoneLibrary,
      })
      autosaveError.value = error ?? ''
      if (!error) {
        lastAutosaveAt.value = new Date()
      }
    }, AUTOSAVE_DEBOUNCE_MS)
  }

  return {
    manifest,
    document,
    activeTool,
    roomToolMode,
    roomOrthoSnap,
    innerLineStyle,
    drawingHistory,
    toolHint,
    activeFloor,
    activeElementId,
    selection,
    dirty,
    autosaveError,
    lastAutosaveAt,
    revision,
    canUndo,
    canRedo,
    floors,
    trials,
    trialName,
    selectedIds,
    primarySelection,
    selectedRoom,
    selectedPlacement,
    selectedRoute,
    commit,
    commitManifest,
    commitLibrary,
    commitZones,
    commitWorkspace,
    beginDrag,
    endDrag,
    cancelDrag,
    undo,
    redo,
    setWorkspace,
    restoreAutosave,
    setSelection,
    clearSelection,
    deleteSelection,
    generateId,
  }
})
