import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'
import { DUPLICATE_OFFSET, GRID_SNAP_DEFAULT, TOAST_LIFE_MS } from '../../core/constants'
import type { HitTarget } from '../../core/interaction/hitTest'
import { snapToGrid } from '../../core/interaction/snapping'
import { translateAbsolutePathStart } from '../../core/model/roomPath'
import { translateShape } from '../../core/model/shapes'
import type { TrialDocument, Vec2 } from '../../core/model/types'
import { serializeJson } from '../store/documentIO'
import { useEditorStore } from '../store/editorStore'
import { jsonClone } from '../store/jsonClone'
import { useLibraryStore } from '../store/libraryStore'
import { useZonesStore } from '../store/zonesStore'
import {
  buildClipboardPayload,
  parseClipboardPayload,
  type ClipboardPayload,
} from './clipboardPayload'

/**
 * Fallback for the system clipboard: the paste button cannot read it without a
 * permission prompt, and `readText` is unavailable in some browsers. Module
 * scope so every caller shares the same content.
 */
const memoryClipboard = ref<ClipboardPayload | null>(null)

export function useClipboard() {
  const store = useEditorStore()
  const libraryStore = useLibraryStore()
  const zonesStore = useZonesStore()
  const toast = useToast()

  const canPaste = computed(() => memoryClipboard.value !== null)

  /** Serialized payload of the current selection, or `null` when nothing is selected. */
  function copySelection(): string | null {
    if (!store.document) {
      return null
    }
    const payload = buildClipboardPayload(store.document, store.selection)
    if (!payload) {
      return null
    }
    const text = serializeJson(payload)
    // The serialization is the snapshot — the payload itself aliases the document.
    memoryClipboard.value = JSON.parse(text) as ClipboardPayload
    return text
  }

  /** Button path: without a native copy event the clipboard has to be written explicitly. */
  async function copyToSystemClipboard(): Promise<boolean> {
    const text = copySelection()
    if (!text) {
      return false
    }
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      toast.add({
        severity: 'warn',
        summary: 'System clipboard not available',
        detail: `${String(error)} — pasting inside this tab still works.`,
        life: TOAST_LIFE_MS,
      })
    }
    return true
  }

  async function cutToSystemClipboard(): Promise<void> {
    if (await copyToSystemClipboard()) {
      store.deleteSelection()
    }
  }

  /**
   * Single owner of the fallback rule: the in-memory copy only stands in when
   * the system clipboard is empty or unreadable — foreign text stays foreign.
   */
  function resolvePayload(text: string | null): ClipboardPayload | null {
    if (text && text.trim() !== '') {
      return parseClipboardPayload(text)
    }
    return memoryClipboard.value
  }

  function missingReferences(payload: ClipboardPayload): string[] {
    const missing = new Set<string>()
    for (const room of payload.rooms) {
      if (!zonesStore.zonesById.has(room.zone)) {
        missing.add(room.zone)
      }
    }
    for (const placement of payload.placements) {
      if (!libraryStore.elementIndex.has(placement.element)) {
        missing.add(placement.element)
      }
    }
    return [...missing]
  }

  function insert(doc: TrialDocument, payload: ClipboardPayload, offset: Vec2): HitTarget[] {
    const created: HitTarget[] = []
    // Old → new room IDs, so a placement pasted together with its room keeps the link.
    const roomIds = new Map<string, string>()
    // Every copy is pushed before the next generateId call — it counts on the live document.
    for (const source of payload.rooms) {
      const room = jsonClone(source)
      const id = store.generateId('room')
      roomIds.set(room.id, id)
      room.id = id
      room.floor = store.activeFloor
      room.shape.origin = [room.shape.origin[0] + offset[0], room.shape.origin[1] + offset[1]]
      doc.rooms.push(room)
      created.push({ kind: 'room', id })
    }
    for (const source of payload.placements) {
      const placement = jsonClone(source)
      placement.id = store.generateId('pl')
      placement.floor = store.activeFloor
      placement.pos = [placement.pos[0] + offset[0], placement.pos[1] + offset[1]]
      // Remap to the pasted room; without one the link survives only when the
      // referenced room exists on the active floor (duplicate, same-trial paste).
      const mappedRoomId =
        (placement.roomId ? roomIds.get(placement.roomId) : undefined) ??
        (doc.rooms.some((room) => room.id === placement.roomId && room.floor === store.activeFloor)
          ? placement.roomId
          : undefined)
      if (mappedRoomId) {
        placement.roomId = mappedRoomId
      } else {
        delete placement.roomId
      }
      doc.placements.push(placement)
      created.push({ kind: 'placement', id: placement.id })
    }
    for (const source of payload.routes) {
      const route = jsonClone(source)
      route.id = store.generateId('route')
      route.floor = store.activeFloor
      route.path = translateAbsolutePathStart(route.path, offset) ?? route.path
      doc.routes.push(route)
      created.push({ kind: 'route', id: route.id })
    }
    for (const source of payload.shapes) {
      const shape = jsonClone(source)
      shape.id = store.generateId('shape')
      shape.floor = store.activeFloor
      translateShape(shape, offset)
      doc.shapes.push(shape)
      created.push({ kind: 'shape', id: shape.id })
    }
    return created
  }

  /** Pastes as one undo step; `at` is the world position the group anchor moves to. */
  function paste(payload: ClipboardPayload, at: Vec2 | null): void {
    if (!store.document) {
      return
    }
    const target = at ? snapToGrid(at, GRID_SNAP_DEFAULT) : null
    const offset: Vec2 = target
      ? [target[0] - payload.anchor[0], target[1] - payload.anchor[1]]
      : [DUPLICATE_OFFSET, DUPLICATE_OFFSET]
    store.commit((doc) => {
      store.setSelection(insert(doc, payload, offset))
    })
    const missing = missingReferences(payload)
    if (missing.length > 0) {
      toast.add({
        severity: 'warn',
        summary: 'Pasted with unknown references',
        detail: `Not in the current libraries: ${missing.join(', ')}. Import them or fix the objects before exporting.`,
        life: TOAST_LIFE_MS,
      })
    }
  }

  /** Ctrl+D: copy + paste at a fixed offset, without touching any clipboard. */
  function duplicateSelection(): void {
    if (!store.document) {
      return
    }
    const payload = buildClipboardPayload(store.document, store.selection)
    if (payload) {
      paste(payload, null)
    }
  }

  async function pasteFromSystemClipboard(at: Vec2 | null): Promise<void> {
    let text: string | null = null
    try {
      text = await navigator.clipboard.readText()
    } catch {
      text = null
    }
    const payload = resolvePayload(text)
    if (!payload) {
      toast.add({
        severity: 'info',
        summary: 'Nothing to paste',
        detail: 'Copy rooms, placements, routes or shapes first (Ctrl+C).',
        life: TOAST_LIFE_MS,
      })
      return
    }
    paste(payload, at)
  }

  return {
    canPaste,
    copySelection,
    copyToSystemClipboard,
    cutToSystemClipboard,
    resolvePayload,
    paste,
    duplicateSelection,
    pasteFromSystemClipboard,
  }
}
