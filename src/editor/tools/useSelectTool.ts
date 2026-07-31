import { computed } from 'vue'
import { DUPLICATE_OFFSET, NUDGE_STEP, NUDGE_STEP_LARGE } from '../../core/constants'
import type { HitTarget } from '../../core/interaction/hitTest'
import { translateAbsolutePathStart } from '../../core/model/roomPath'
import type { TrialDocument, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { jsonClone } from '../store/jsonClone'
import type { CanvasPointerEvent, EditorTool } from './toolTypes'

const ARROW_DELTAS: Record<string, Vec2> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
}

export function useSelectTool(): EditorTool {
  const store = useEditorStore()
  let dragState: { last: Vec2; moved: boolean } | null = null

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

  function duplicateSelection(): void {
    const targets = [...store.selection]
    store.commit((doc) => {
      const created: HitTarget[] = []
      for (const target of targets) {
        if (target.kind === 'room') {
          const room = doc.rooms.find((r) => r.id === target.id)
          if (!room) {
            continue
          }
          const copy = jsonClone(room)
          copy.id = store.generateId('room')
          copy.shape.origin = [
            copy.shape.origin[0] + DUPLICATE_OFFSET,
            copy.shape.origin[1] + DUPLICATE_OFFSET,
          ]
          doc.rooms.push(copy)
          created.push({ kind: 'room', id: copy.id })
        } else if (target.kind === 'placement') {
          const placement = doc.placements.find((p) => p.id === target.id)
          if (!placement) {
            continue
          }
          const copy = jsonClone(placement)
          copy.id = store.generateId('pl')
          copy.pos = [copy.pos[0] + DUPLICATE_OFFSET, copy.pos[1] + DUPLICATE_OFFSET]
          doc.placements.push(copy)
          created.push({ kind: 'placement', id: copy.id })
        } else {
          const route = doc.routes.find((r) => r.id === target.id)
          if (!route) {
            continue
          }
          const copy = jsonClone(route)
          copy.id = store.generateId('route')
          copy.path =
            translateAbsolutePathStart(copy.path, [DUPLICATE_OFFSET, DUPLICATE_OFFSET]) ?? copy.path
          doc.routes.push(copy)
          created.push({ kind: 'route', id: copy.id })
        }
      }
      store.setSelection(created)
    })
  }

  return {
    onPointerDown(event: CanvasPointerEvent): void {
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
      dragState = { last: event.snapped, moved: false }
    },

    onPointerMove(event: CanvasPointerEvent): void {
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
        moveSelection(store.document, delta)
      }
      dragState.last = event.snapped
    },

    onPointerUp(): void {
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
        duplicateSelection()
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
      dragState = null
    },

    overlay: computed(() => null),
  }
}
