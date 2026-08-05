import { computed, ref, watch } from 'vue'
import { pointsToOpenPath } from '../../core/model/roomPath'
import type { MapShape, MapShapeGeometry, Vec2 } from '../../core/model/types'
import { distance, midpoint } from '../../core/model/vec2'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, EditorTool, ToolOverlay } from './toolTypes'
import { useOpenPathDrawing } from './useOpenPathDrawing'

export function useShapeTool(): EditorTool {
  const store = useEditorStore()
  const twoClick = ref<{ kind: 'circle' | 'rect'; anchor: Vec2; preview: Vec2 | null } | null>(null)
  const line = useOpenPathDrawing((points: Vec2[]) =>
    createShape({ path: pointsToOpenPath(points) }),
  )

  function reset(): void {
    twoClick.value = null
    line.reset()
  }

  function createShape(geometry: MapShapeGeometry): void {
    store.commit((doc) => {
      const shape: MapShape = {
        id: store.generateId('shape'),
        floor: store.activeFloor,
        ...geometry,
      }
      doc.shapes.push(shape)
      store.setSelection([{ kind: 'shape', id: shape.id }])
    })
  }

  function commitTwoClick(kind: 'circle' | 'rect', anchor: Vec2, end: Vec2): void {
    twoClick.value = null
    if (kind === 'circle') {
      const radius = distance(anchor, end)
      if (radius > 0) {
        // Copy instead of reference: anchor is a reactive proxy from the tool state.
        createShape({ pos: [anchor[0], anchor[1]], radius })
      }
      return
    }
    const size: Vec2 = [Math.abs(end[0] - anchor[0]), Math.abs(end[1] - anchor[1])]
    if (size[0] > 0 && size[1] > 0) {
      createShape({ pos: midpoint(anchor, end), size })
    }
  }

  watch(() => store.shapeToolMode, reset)

  return {
    onPointerDown(event: CanvasPointerEvent): void {
      const mode = store.shapeToolMode
      if (mode === 'line') {
        line.addPoint(event.snapped)
        return
      }
      const current = twoClick.value
      if (current) {
        commitTwoClick(current.kind, current.anchor, event.snapped)
      } else {
        twoClick.value = { kind: mode, anchor: event.snapped, preview: null }
      }
    },

    onPointerMove(event: CanvasPointerEvent): void {
      line.setPreview(event.snapped)
      if (twoClick.value) {
        twoClick.value.preview = event.snapped
      }
    },

    onDblClick(): void {
      line.commit()
    },

    onKeydown(event: KeyboardEvent): boolean {
      if (line.onKeydown(event)) {
        return true
      }
      if (event.key === 'Escape' && twoClick.value) {
        twoClick.value = null
        return true
      }
      return false
    },

    deactivate(): void {
      reset()
    },

    overlay: computed<ToolOverlay | null>(() => {
      const current = twoClick.value
      if (current?.kind === 'circle') {
        return {
          kind: 'circle',
          center: current.anchor,
          radius: current.preview ? distance(current.anchor, current.preview) : 0,
        }
      }
      if (current) {
        return { kind: 'rect', from: current.anchor, to: current.preview ?? current.anchor }
      }
      return line.overlay.value
    }),
  }
}
