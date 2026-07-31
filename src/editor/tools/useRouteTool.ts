import { computed, ref } from 'vue'
import { pointsToOpenPath } from '../../core/model/roomPath'
import type { RouteLine, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, EditorTool, ToolOverlay } from './toolTypes'

const MIN_ROUTE_POINTS = 2

export function useRouteTool(): EditorTool {
  const store = useEditorStore()
  const drawing = ref<{ points: Vec2[]; preview: Vec2 | null } | null>(null)

  function commitRoute(): void {
    const points = drawing.value?.points ?? []
    drawing.value = null
    if (points.length < MIN_ROUTE_POINTS) {
      return
    }
    store.commit((doc) => {
      const route: RouteLine = {
        id: store.generateId('route'),
        name: `Route ${doc.routes.length + 1}`,
        floor: store.activeFloor,
        path: pointsToOpenPath(points),
        style: 'route',
      }
      doc.routes.push(route)
      store.setSelection([{ kind: 'route', id: route.id }])
    })
  }

  return {
    onPointerDown(event: CanvasPointerEvent): void {
      if (drawing.value) {
        drawing.value.points.push(event.snapped)
      } else {
        drawing.value = { points: [event.snapped], preview: null }
      }
    },

    onPointerMove(event: CanvasPointerEvent): void {
      if (drawing.value) {
        drawing.value.preview = event.snapped
      }
    },

    onDblClick(): void {
      commitRoute()
    },

    onKeydown(event: KeyboardEvent): boolean {
      if (event.key === 'Enter' && drawing.value) {
        commitRoute()
        return true
      }
      if (event.key === 'Escape' && drawing.value) {
        drawing.value = null
        return true
      }
      return false
    },

    deactivate(): void {
      drawing.value = null
    },

    overlay: computed<ToolOverlay | null>(() =>
      drawing.value
        ? { kind: 'polyline', points: drawing.value.points, preview: drawing.value.preview }
        : null,
    ),
  }
}
