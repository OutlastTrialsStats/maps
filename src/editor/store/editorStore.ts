import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
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

/** Stellenzahl der laufenden Nummer in generierten IDs (z. B. "pl-0042"). */
const GENERATED_ID_DIGITS = 4

export const useEditorStore = defineStore('editor', () => {
  const libraryStore = useLibraryStore()
  const zonesStore = useZonesStore()

  const document = ref<MapDefinition | null>(null)
  const activeTool = ref<ToolId>('select')
  const roomToolMode = ref<RoomToolMode>('polygon')
  const innerLineStyle = ref<InnerLineStyle>('object')
  /** Kurzer Werkzeug-Hinweis für die Statusleiste (z. B. nicht editierbarer Pfad). */
  const toolHint = ref('')
  const activeFloor = ref(0)
  /** Trial-ID, die Canvas-Filter und neue Objekte bestimmt; null nur ohne Dokument. */
  const trialContext = ref<string | null>(null)
  /** In der Palette gewähltes Element fürs Platzierungs-Werkzeug. */
  const activeElementId = ref<string | null>(null)
  const selection = ref<HitTarget[]>([])
  const undoStack = ref<WorkspaceSnapshot[]>([])
  const redoStack = ref<WorkspaceSnapshot[]>([])
  const dirty = ref(false)
  const autosaveError = ref('')
  const lastAutosaveAt = ref<Date | null>(null)
  /** Zählt abgeschlossene Mutationen — billiges Watch-Signal statt deep-Watcher. */
  const revision = ref(0)

  let autosaveTimer: number | undefined

  const canUndo = computed(() => undoStack.value.length > 0)
  const canRedo = computed(() => redoStack.value.length > 0)
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

  /** Sichtbarkeit, die neue Objekte im aktuellen Trial-Kontext erhalten. */
  const visibilityForNewObjects = computed<Visibility | undefined>(() =>
    trialContext.value ? { trials: [trialContext.value] } : undefined,
  )

  /** Undo-Einheit: Dokument + beide globalen Arbeitskopien (Kaskaden bleiben atomar). */
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

  /** Standardweg für alle Dokument-Änderungen: Snapshot → Mutation → Autosave. */
  function commit(mutate: (doc: MapDefinition) => void): void {
    if (!document.value) {
      return
    }
    pushUndo()
    mutate(document.value)
    markChanged()
  }

  /** Änderungen an der globalen Element-Bibliothek — gleicher Undo-Pfad wie `commit`. */
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

  /** Atomare Änderung über Dokument + Bibliothek hinweg (z. B. Element-Löschkaskade). */
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

  /** Für Drags: ein Snapshot beim Start, direkte Mutationen bis endDrag/cancelDrag. */
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
    const next = redoStack.value.pop()
    if (!next || !document.value) {
      return
    }
    undoStack.value.push(snapshot())
    restoreSnapshot(next)
    cleanupAfterHistory()
    markChanged()
  }

  /** Auswahl/Etage/Trial-Kontext dürfen nach Undo/Redo nicht auf Gelöschtes zeigen. */
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

  /** "Continue autosave": restauriert vorhandene Arbeitskopien und das Dokument. */
  function restoreAutosave(payload: AutosavePayload): void {
    // Null hieße: beim Autosave war die Bibliothek noch nicht geladen —
    // dann den frisch gefetchten Stand nicht überschreiben.
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
      // Kein Snapshot-Clone nötig: saveAutosave serialisiert die Live-Objekte direkt.
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
    innerLineStyle,
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
