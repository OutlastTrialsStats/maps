import { computed, ref } from 'vue'
import { FULL_CIRCLE_DEG, HALF_CIRCLE_DEG } from '../../core/constants'
import type { Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, ToolOverlay } from './toolTypes'

/**
 * While `store.cameraPick` is armed this mode swallows all pointer events:
 * pointer-down sets the camera position, dragging turns the view direction,
 * pointer-up writes `image.camera` in a single commit.
 */
export function useCameraPickMode() {
  const store = useEditorStore()
  const hover = ref<Vec2 | null>(null)
  const drag = ref<{ pos: Vec2; rotation: number } | null>(null)

  function reset(): void {
    hover.value = null
    drag.value = null
  }

  function onPointerDown(event: CanvasPointerEvent): boolean {
    if (!store.cameraPick) {
      return false
    }
    drag.value = { pos: event.snapped, rotation: 0 }
    return true
  }

  function onPointerMove(event: CanvasPointerEvent): boolean {
    if (!store.cameraPick) {
      return false
    }
    if (drag.value) {
      const dx = event.world[0] - drag.value.pos[0]
      const dy = event.world[1] - drag.value.pos[1]
      if (dx !== 0 || dy !== 0) {
        const degrees = (Math.atan2(dy, dx) * HALF_CIRCLE_DEG) / Math.PI
        drag.value = {
          pos: drag.value.pos,
          rotation: Math.round((degrees + FULL_CIRCLE_DEG) % FULL_CIRCLE_DEG),
        }
      }
    } else {
      hover.value = event.snapped
    }
    return true
  }

  function onPointerUp(): boolean {
    const pick = store.cameraPick
    if (!pick) {
      return false
    }
    const state = drag.value
    if (state) {
      store.commit((doc) => {
        const image = doc.rooms.find((room) => room.id === pick.roomId)?.info?.images?.[
          pick.imageIndex
        ]
        if (image) {
          image.camera = { pos: state.pos, rotation: state.rotation }
        }
      })
    }
    reset()
    store.cancelCameraPick()
    return true
  }

  function cancel(): void {
    reset()
    store.cancelCameraPick()
  }

  const overlay = computed<ToolOverlay | null>(() => {
    if (!store.cameraPick) {
      return null
    }
    const preview = drag.value ?? (hover.value ? { pos: hover.value, rotation: 0 } : null)
    return preview ? { kind: 'camera', pos: preview.pos, rotation: preview.rotation } : null
  })

  return { onPointerDown, onPointerMove, onPointerUp, cancel, overlay }
}
