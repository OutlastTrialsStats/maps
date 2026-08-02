import { MARKER_BADGE_RADIUS, NUDGE_STEP, NUDGE_STEP_LARGE } from '../../core/constants'
import { translateAbsolutePathStart } from '../../core/model/roomPath'
import type { TrialDocument, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, EditorTool } from './toolTypes'
import { useClipboard } from './useClipboard'
import { useRoomResize } from './useRoomResize'

const ARROW_DELTAS: Record<string, Vec2> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
}

export function useSelectTool(): EditorTool {
  const store = useEditorStore()
  const clipboard = useClipboard()
  const resize = useRoomResize()
  let dragState: { last: Vec2; moved: boolean; markerId: string | null } | null = null

  /** Hit-tested geometrically — `CalloutMarker.vue` is pointer-transparent. */
  function markerUnderPointer(world: Vec2): string | null {
    const placement = (store.document?.placements ?? []).find((entry) => {
      if (!entry.marker || entry.floor !== store.activeFloor) {
        return false
      }
      const badge = [entry.pos[0] + entry.marker.offset[0], entry.pos[1] + entry.marker.offset[1]]
      return Math.hypot(world[0] - badge[0], world[1] - badge[1]) <= MARKER_BADGE_RADIUS
    })
    return placement?.id ?? null
  }

  function moveMarker(doc: TrialDocument, placementId: string, delta: Vec2): void {
    const marker = doc.placements.find((entry) => entry.id === placementId)?.marker
    if (marker) {
      marker.offset = [marker.offset[0] + delta[0], marker.offset[1] + delta[1]]
    }
  }

  function moveSelection(doc: TrialDocument, delta: Vec2): void {
    const ids = store.selectedIds
    for (const room of doc.rooms) {
      if (ids.has(room.id)) {
        room.shape.origin = [room.shape.origin[0] + delta[0], room.shape.origin[1] + delta[1]]
      }
    }
    for (const placement of doc.placements) {
      if (ids.has(placement.id)) {
        placement.pos = [placement.pos[0] + delta[0], placement.pos[1] + delta[1]]
      }
    }
    for (const route of doc.routes) {
      if (ids.has(route.id)) {
        route.path = translateAbsolutePathStart(route.path, delta) ?? route.path
      }
    }
  }

  return {
    onPointerDown(event: CanvasPointerEvent): void {
      if (resize.onPointerDown(event)) {
        return
      }
      const markerId = markerUnderPointer(event.world)
      if (markerId) {
        store.setSelection([{ kind: 'placement', id: markerId }])
        dragState = { last: event.snapped, moved: false, markerId }
        return
      }
      const hit = event.hit
      if (!hit) {
        store.clearSelection()
        return
      }
      const alreadySelected = store.selection.some((target) => target.id === hit.id)
      if (event.event.shiftKey) {
        store.setSelection(
          alreadySelected
            ? store.selection.filter((target) => target.id !== hit.id)
            : [...store.selection, hit],
        )
        return
      }
      if (!alreadySelected) {
        store.setSelection([hit])
      }
      dragState = { last: event.snapped, moved: false, markerId: null }
    },

    onPointerMove(event: CanvasPointerEvent): void {
      if (resize.onPointerMove(event)) {
        return
      }
      if (!dragState) {
        return
      }
      const delta: Vec2 = [
        event.snapped[0] - dragState.last[0],
        event.snapped[1] - dragState.last[1],
      ]
      if (delta[0] === 0 && delta[1] === 0) {
        return
      }
      if (!dragState.moved) {
        store.beginDrag()
        dragState.moved = true
      }
      if (store.document) {
        if (dragState.markerId) {
          moveMarker(store.document, dragState.markerId, delta)
        } else {
          moveSelection(store.document, delta)
        }
      }
      dragState.last = event.snapped
    },

    onPointerUp(): void {
      if (resize.onPointerUp()) {
        return
      }
      if (dragState?.moved) {
        store.endDrag()
      }
      dragState = null
    },

    onKeydown(event: KeyboardEvent): boolean {
      if (store.selection.length === 0) {
        return false
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') {
        clipboard.duplicateSelection()
        return true
      }
      const arrow = ARROW_DELTAS[event.key]
      if (arrow) {
        const step = event.shiftKey ? NUDGE_STEP_LARGE : NUDGE_STEP
        store.commit((doc) => moveSelection(doc, [arrow[0] * step, arrow[1] * step]))
        return true
      }
      return false
    },

    deactivate(): void {
      resize.cancel()
      dragState = null
    },

    overlay: resize.overlay,
  }
}
