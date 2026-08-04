import { computed, ref } from 'vue'
import { MIN_OPEN_PATH_POINTS } from '../../core/constants'
import { parseOpenPath, pointsToOpenPath } from '../../core/model/roomPath'
import type { RouteLine, Vec2 } from '../../core/model/types'
import { midpoint, withinRadius } from '../../core/model/vec2'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, ToolOverlay } from './toolTypes'

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
    return points.findIndex((point) => withinRadius(world, point, hitRadius))
  }

  function midpointHit(
    points: Vec2[],
    world: Vec2,
    hitRadius: number,
  ): { index: number; point: Vec2 } | null {
    for (let index = 0; index < points.length - 1; index += 1) {
      const mid = midpoint(points[index], points[index + 1])
      if (withinRadius(world, mid, hitRadius)) {
        return { index, point: mid }
      }
    }
    return null
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
    const routeId = editRouteId.value
    const vertex = hitIndex(points, event.world, event.hitRadius)
    if (vertex >= 0) {
      if (event.event.altKey) {
        if (points.length > MIN_OPEN_PATH_POINTS) {
          store.commitOn('route', routeId, (route) =>
            writePoints(route, points.filter((_, index) => index !== vertex)),
          )
        }
        activeIndex.value = null
        return true
      }
      drag = { index: vertex, moved: false }
      activeIndex.value = vertex
      return true
    }
    const mid = midpointHit(points, event.world, event.hitRadius)
    if (mid) {
      store.commitOn('route', routeId, (route) =>
        writePoints(route, [
          ...points.slice(0, mid.index + 1),
          mid.point,
          ...points.slice(mid.index + 1),
        ]),
      )
      activeIndex.value = mid.index + 1
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
