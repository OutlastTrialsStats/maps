import { computed, ref } from 'vue'
import { parseOpenPath, pointsToOpenPath } from '../../core/model/roomPath'
import type { RouteLine, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, ToolOverlay } from './toolTypes'

const MIN_ROUTE_POINTS = 2

/**
 * Vertex editing for routes, entered by double-clicking a route with the select
 * tool: drag points, click a midpoint to insert, Alt+click to delete, Escape or
 * a click elsewhere exits. The select tool delegates its pointer events here
 * first — mirrors the `useRoomResize` pattern.
 */
export function useRouteEditMode() {
  const store = useEditorStore()
  const editRouteId = ref<string | null>(null)
  const activeIndex = ref<number | null>(null)
  let drag: { index: number; moved: boolean } | null = null

  function currentRoute(): RouteLine | null {
    return store.document?.routes.find((route) => route.id === editRouteId.value) ?? null
  }

  function currentPoints(): Vec2[] | null {
    const route = currentRoute()
    return route ? parseOpenPath(route.path) : null
  }

  function writePoints(route: RouteLine, points: Vec2[]): void {
    route.path = pointsToOpenPath(points)
  }

  function enter(routeId: string): void {
    const route = store.document?.routes.find((entry) => entry.id === routeId)
    if (!route) {
      return
    }
    if (!parseOpenPath(route.path)) {
      store.toolHint = 'This route path uses unsupported commands — vertex editing is disabled.'
      return
    }
    editRouteId.value = routeId
    activeIndex.value = null
    store.toolHint = 'Drag points; click a midpoint to insert, Alt+click a point to delete.'
  }

  function exit(): void {
    if (drag?.moved) {
      store.cancelDrag()
    }
    drag = null
    if (editRouteId.value) {
      editRouteId.value = null
      activeIndex.value = null
      store.toolHint = ''
    }
  }

  function hitIndex(points: Vec2[], world: Vec2, hitRadius: number): number {
    return points.findIndex(
      (point) => Math.hypot(world[0] - point[0], world[1] - point[1]) <= hitRadius,
    )
  }

  function midpointIndex(points: Vec2[], world: Vec2, hitRadius: number): number {
    for (let index = 0; index < points.length - 1; index += 1) {
      const mid: Vec2 = [
        (points[index][0] + points[index + 1][0]) / 2,
        (points[index][1] + points[index + 1][1]) / 2,
      ]
      if (Math.hypot(world[0] - mid[0], world[1] - mid[1]) <= hitRadius) {
        return index
      }
    }
    return -1
  }

  function onPointerDown(event: CanvasPointerEvent): boolean {
    if (!editRouteId.value) {
      return false
    }
    const points = currentPoints()
    if (!points) {
      exit()
      return false
    }
    const vertex = hitIndex(points, event.world, event.hitRadius)
    if (vertex >= 0) {
      if (event.event.altKey) {
        if (points.length > MIN_ROUTE_POINTS) {
          store.commit((doc) => {
            const route = doc.routes.find((entry) => entry.id === editRouteId.value)
            if (route) {
              writePoints(route, points.filter((_, index) => index !== vertex))
            }
          })
        }
        activeIndex.value = null
        return true
      }
      drag = { index: vertex, moved: false }
      activeIndex.value = vertex
      return true
    }
    const midpoint = midpointIndex(points, event.world, event.hitRadius)
    if (midpoint >= 0) {
      const inserted: Vec2 = [
        (points[midpoint][0] + points[midpoint + 1][0]) / 2,
        (points[midpoint][1] + points[midpoint + 1][1]) / 2,
      ]
      store.commit((doc) => {
        const route = doc.routes.find((entry) => entry.id === editRouteId.value)
        if (route) {
          writePoints(route, [
            ...points.slice(0, midpoint + 1),
            inserted,
            ...points.slice(midpoint + 1),
          ])
        }
      })
      activeIndex.value = midpoint + 1
      return true
    }
    exit()
    return true
  }

  function onPointerMove(event: CanvasPointerEvent): boolean {
    if (!editRouteId.value) {
      return false
    }
    if (drag) {
      if (!drag.moved) {
        store.beginDrag()
        drag.moved = true
      }
      const route = currentRoute()
      const points = currentPoints()
      if (route && points) {
        points[drag.index] = event.snapped
        writePoints(route, points)
      }
    }
    return true
  }

  function onPointerUp(): boolean {
    if (!editRouteId.value) {
      return false
    }
    if (drag) {
      if (drag.moved) {
        store.endDrag()
      }
      drag = null
    }
    return true
  }

  function onKeydown(event: KeyboardEvent): boolean {
    if (!editRouteId.value) {
      return false
    }
    if (event.key === 'Escape') {
      exit()
      return true
    }
    return false
  }

  const overlay = computed<ToolOverlay | null>(() => {
    if (!editRouteId.value) {
      return null
    }
    const points = currentPoints()
    if (!points) {
      return null
    }
    return {
      kind: 'vertices',
      origin: [0, 0],
      points,
      activeIndex: activeIndex.value,
      closed: false,
    }
  })

  return { enter, exit, onPointerDown, onPointerMove, onPointerUp, onKeydown, overlay }
}
