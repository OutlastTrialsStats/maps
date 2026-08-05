import { computed, ref } from 'vue'
import { MIN_OPEN_PATH_POINTS } from '../../core/constants'
import type { Vec2 } from '../../core/model/types'
import type { ToolOverlay } from './toolTypes'

/** Click-to-append polyline drawing shared by the route tool and shape lines. */
export function useOpenPathDrawing(commitPoints: (points: Vec2[]) => void) {
  const drawing = ref<{ points: Vec2[]; preview: Vec2 | null } | null>(null)

  function addPoint(point: Vec2): void {
    if (drawing.value) {
      drawing.value.points.push(point)
    } else {
      drawing.value = { points: [point], preview: null }
    }
  }

  function setPreview(point: Vec2): void {
    if (drawing.value) {
      drawing.value.preview = point
    }
  }

  function commit(): void {
    const points = drawing.value?.points ?? []
    drawing.value = null
    if (points.length >= MIN_OPEN_PATH_POINTS) {
      commitPoints(points)
    }
  }

  function reset(): void {
    drawing.value = null
  }

  function onKeydown(event: KeyboardEvent): boolean {
    if (event.key === 'Enter' && drawing.value) {
      commit()
      return true
    }
    if (event.key === 'Escape' && drawing.value) {
      reset()
      return true
    }
    return false
  }

  const overlay = computed<ToolOverlay | null>(() =>
    drawing.value
      ? { kind: 'polyline', points: drawing.value.points, preview: drawing.value.preview }
      : null,
  )

  return { addPoint, setPreview, commit, reset, onKeydown, overlay }
}
