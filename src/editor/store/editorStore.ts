import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { AUTOSAVE_DEBOUNCE_MS, UNDO_STACK_LIMIT } from '../../core/constants'
import type { HitTarget } from '../../core/interaction/hitTest'
import type {
  ElementLibrary,
  InnerLineStyle,
  MapDefinition,
  Room,
  Placement,
  RouteLine,
  Visibility,
  ZoneLibrary,
} from '../../core/model/types'
import { defaultTrialId, initialFloorIndex } from '../../core/model/mapDefaults'
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

  const document = ref<MapDefinition | null>(null)
  const activeTool = ref<ToolId>('select')
  const roomToolMode = ref<RoomToolMode>('polygon')
  /** 90° snapping while drawing polygons (Alt inverts temporarily). */
  const roomOrthoSnap = ref(true)
  const innerLineStyle = ref<InnerLineStyle>('object')
  const drawingHistory = shallowRef<TransientHistory | null>(null)
  /** Short tool hint for the status bar (e.g. a path that cannot be edited). */
  const toolHint = ref('')
  const activeFloor = ref(0)
  /** Trial ID that drives the canvas filter and new objects; null only without a document. */
  const trialContext = ref<string | null>(null)
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
  const trials = computed(() => document.value?.trials ?? [])
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

  const visibilityForNewObjects = computed<Visibility | undefined>(() =>
    trialContext.value ? { trials: [trialContext.value] } : undefined,
  )

  /** Undo unit: document + both global working copies (cascades stay atomic). */
  function snapshot(): WorkspaceSnapshot {
    return jsonClone({
      document: document.value as MapDefinition,
      library: libraryStore.library,
      zones: zonesStore.zoneLibrary,
    })
  }

  function restoreSnapshot(snap: WorkspaceSnapshot): void {
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
  function commit(mutate: (doc: MapDefinition) => void): void {
    if (!document.value) {
      return
    }
    pushUndo()
    mutate(document.value)
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
    mutate: (workspace: { doc: MapDefinition; library: ElementLibrary }) => void,
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

  /** Selection/floor/trial context must not point at deleted objects after undo/redo. */
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
    if (!doc.trials.some((trial) => trial.id === trialContext.value)) {
      trialContext.value = defaultTrialId(doc.trials)
    }
    if (activeElementId.value && !libraryStore.elementIndex.has(activeElementId.value)) {
      activeElementId.value = null
    }
  }

  function setDocument(doc: MapDefinition, options?: { markDirty?: boolean }): void {
    document.value = doc
    undoStack.value = []
    redoStack.value = []
    drawingHistory.value = null
    selection.value = []
    activeTool.value = 'select'
    activeFloor.value = initialFloorIndex(doc.floors)
    trialContext.value = defaultTrialId(doc.trials)
    dirty.value = options?.markDirty ?? false
    autosaveError.value = ''
    if (dirty.value) {
      scheduleAutosave()
    }
  }

  /** "Continue autosave": restores existing working copies and the document. */
  function restoreAutosave(payload: AutosavePayload): void {
    // Null would mean: at autosave time the library was not loaded yet —
    // then do not overwrite the freshly fetched state.
    if (payload.library) {
      libraryStore.restore(payload.library)
    }
    if (payload.zones) {
      zonesStore.restore(payload.zones)
    }
    setDocument(payload.document, { markDirty: true })
  }

  function setSelection(targets: HitTarget[]): void {
    selection.value = targets
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
        doc.trials,
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
      if (!document.value) {
        return
      }
      // No snapshot clone needed: saveAutosave serializes the live objects directly.
      const error = saveAutosave({
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
    document,
    activeTool,
    roomToolMode,
    roomOrthoSnap,
    innerLineStyle,
    drawingHistory,
    toolHint,
    activeFloor,
    trialContext,
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
    selectedIds,
    primarySelection,
    selectedRoom,
    selectedPlacement,
    selectedRoute,
    visibilityForNewObjects,
    commit,
    commitLibrary,
    commitZones,
    commitWorkspace,
    beginDrag,
    endDrag,
    cancelDrag,
    undo,
    redo,
    setDocument,
    restoreAutosave,
    setSelection,
    generateId,
  }
})
