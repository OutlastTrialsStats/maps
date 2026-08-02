import { computed, ref } from 'vue'
import { ROTATION_STEP_DEG } from '../../core/constants'
import type { Placement, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, EditorTool, ToolOverlay } from './toolTypes'

const FULL_CIRCLE_DEG = 360
const ARMED_HINT = 'Shift+click places multiple.'
const UNARMED_HINT = 'Pick an element from the palette.'

export function usePlacementTool(): EditorTool {
  const store = useEditorStore()
  const cursor = ref<Vec2 | null>(null)
  const rotation = ref(0)

  return {
    onPointerMove(event: CanvasPointerEvent): void {
      cursor.value = event.snapped
    },

    onPointerDown(event: CanvasPointerEvent): void {
      const elementId = store.activeElementId
      if (!elementId) {
        store.toolHint = 'Pick an element from the palette first.'
        return
      }
      store.toolHint = ARMED_HINT
      store.commit((doc) => {
        const placement: Placement = {
          id: store.generateId('pl'),
          element: elementId,
          floor: store.activeFloor,
          pos: event.snapped,
        }
        if (rotation.value) {
          placement.rotation = rotation.value
        }
        if (event.hit?.kind === 'room') {
          placement.roomId = event.hit.id
        }
        doc.placements.push(placement)
        store.setSelection([{ kind: 'placement', id: placement.id }])
      })
      // Focus the new placement instead of arming the next one — Shift keeps placing.
      if (!event.event.shiftKey) {
        store.activeTool = 'select'
      }
    },

    /** Right-click rotates the ghost — just like the R key. */
    onContextMenu(): boolean {
      if (!store.activeElementId) {
        return false
      }
      rotation.value = (rotation.value + ROTATION_STEP_DEG) % FULL_CIRCLE_DEG
      return true
    },

    onKeydown(event: KeyboardEvent): boolean {
      if (event.key.toLowerCase() === 'r' && !event.ctrlKey && !event.metaKey) {
        rotation.value = (rotation.value + ROTATION_STEP_DEG) % FULL_CIRCLE_DEG
        return true
      }
      if (event.key === 'Escape' && store.activeElementId) {
        store.activeElementId = null
        return true
      }
      return false
    },

    activate(): void {
      rotation.value = 0
      store.toolHint = store.activeElementId ? ARMED_HINT : UNARMED_HINT
    },

    deactivate(): void {
      cursor.value = null
      store.toolHint = ''
    },

    overlay: computed<ToolOverlay | null>(() =>
      store.activeElementId && cursor.value
        ? {
            kind: 'ghost',
            pos: cursor.value,
            rotation: rotation.value,
            elementId: store.activeElementId,
          }
        : null,
    ),
  }
}
