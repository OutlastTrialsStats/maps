import { pointsToOpenPath } from '../../core/model/roomPath'
import type { RouteLine, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, EditorTool } from './toolTypes'
import { useOpenPathDrawing } from './useOpenPathDrawing'

export function useRouteTool(): EditorTool {
  const store = useEditorStore()

  const drawing = useOpenPathDrawing((points: Vec2[]) => {
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
  })

  return {
    onPointerDown(event: CanvasPointerEvent): void {
      drawing.addPoint(event.snapped)
    },

    onPointerMove(event: CanvasPointerEvent): void {
      drawing.setPreview(event.snapped)
    },

    onDblClick(): void {
      drawing.commit()
    },

    onKeydown(event: KeyboardEvent): boolean {
      return drawing.onKeydown(event)
    },

    deactivate(): void {
      drawing.reset()
    },

    overlay: drawing.overlay,
  }
}
