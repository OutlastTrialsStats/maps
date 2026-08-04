import { computed, ref } from 'vue'
import {
  ARROW_DIRECTIONS,
  MARKER_BADGE_RADIUS,
  MARQUEE_MIN_DRAG_PX,
  NUDGE_STEP,
  NUDGE_STEP_LARGE,
} from '../../core/constants'
import type { HitTarget } from '../../core/interaction/hitTest'
import {
  openPathPoints,
  pointsBounds,
  roomWorldPoints,
  translateAbsolutePathStart,
} from '../../core/model/roomPath'
import { isLineShape, shapeWorldPoints, translateShape } from '../../core/model/shapes'
import type { Bounds, TrialDocument, Vec2 } from '../../core/model/types'
import { distance, withinRadius } from '../../core/model/vec2'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, EditorTool, ToolOverlay } from './toolTypes'
import { useClipboard } from './useClipboard'
import { useRoomResize } from './useRoomResize'
import { useRouteEditMode } from './useRouteEditMode'

function inRect(rect: Bounds, point: Vec2): boolean {
  return (
    point[0] >= rect.min[0] &&
    point[0] <= rect.max[0] &&
    point[1] >= rect.min[1] &&
    point[1] <= rect.max[1]
  )
}

function boundsOverlap(rect: Bounds, bounds: Bounds): boolean {
  return (
    bounds.min[0] <= rect.max[0] &&
    bounds.max[0] >= rect.min[0] &&
    bounds.min[1] <= rect.max[1] &&
    bounds.max[1] >= rect.min[1]
  )
}

export function useSelectTool(): EditorTool {
  const store = useEditorStore()
  const clipboard = useClipboard()
  const resize = useRoomResize()
  const routeEdit = useRouteEditMode()
  let dragState: { last: Vec2; moved: boolean; markerId: string | null } | null = null
  const marquee = ref<{ from: Vec2; to: Vec2; screenFrom: Vec2; additive: boolean } | null>(null)

  function targetsInRect(rect: Bounds): HitTarget[] {
    const doc = store.document
    if (!doc) {
      return []
    }
    const targets: HitTarget[] = []
    for (const room of doc.rooms) {
      if (room.floor !== store.activeFloor) {
        continue
      }
      const points = roomWorldPoints(room)
      if (points.length > 0 && boundsOverlap(rect, pointsBounds(points))) {
        targets.push({ kind: 'room', id: room.id })
      }
    }
    for (const placement of doc.placements) {
      if (placement.floor === store.activeFloor && inRect(rect, placement.pos)) {
        targets.push({ kind: 'placement', id: placement.id })
      }
    }
    for (const route of doc.routes) {
      if (route.floor !== store.activeFloor) {
        continue
      }
      if (openPathPoints(route.path).some((point) => inRect(rect, point))) {
        targets.push({ kind: 'route', id: route.id })
      }
    }
    for (const shape of doc.shapes) {
      if (shape.floor !== store.activeFloor) {
        continue
      }
      const points = shapeWorldPoints(shape)
      const overlaps = isLineShape(shape)
        ? points.some((point) => inRect(rect, point))
        : boundsOverlap(rect, pointsBounds(points))
      if (overlaps) {
        targets.push({ kind: 'shape', id: shape.id })
      }
    }
    return targets
  }

  function finishMarquee(event: CanvasPointerEvent): void {
    const state = marquee.value
    if (!state) {
      return
    }
    marquee.value = null
    const screenDistance = distance(
      [event.event.clientX, event.event.clientY],
      state.screenFrom,
    )
    if (screenDistance < MARQUEE_MIN_DRAG_PX) {
      if (!state.additive) {
        store.clearSelection()
      }
      return
    }
    const rect: Bounds = {
      min: [Math.min(state.from[0], state.to[0]), Math.min(state.from[1], state.to[1])],
      max: [Math.max(state.from[0], state.to[0]), Math.max(state.from[1], state.to[1])],
    }
    const found = targetsInRect(rect)
    if (state.additive) {
      const existing = new Set(store.selection.map((target) => target.id))
      store.setSelection([
        ...store.selection,
        ...found.filter((target) => !existing.has(target.id)),
      ])
    } else {
      store.setSelection(found)
    }
  }

  /** Hit-tested geometrically — `CalloutMarker.vue` is pointer-transparent. */
  function markerUnderPointer(world: Vec2, hitRadius: number): string | null {
    const radius = Math.max(MARKER_BADGE_RADIUS, hitRadius)
    const placement = (store.document?.placements ?? []).find((entry) => {
      if (!entry.marker || entry.floor !== store.activeFloor) {
        return false
      }
      const badge: Vec2 = [
        entry.pos[0] + entry.marker.offset[0],
        entry.pos[1] + entry.marker.offset[1],
      ]
      return withinRadius(world, badge, radius)
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
    for (const shape of doc.shapes) {
      if (ids.has(shape.id)) {
        translateShape(shape, delta)
      }
    }
  }

  return {
    onPointerDown(event: CanvasPointerEvent): void {
      if (routeEdit.onPointerDown(event)) {
        return
      }
      if (resize.onPointerDown(event)) {
        return
      }
      const markerId = markerUnderPointer(event.world, event.hitRadius)
      if (markerId) {
        store.setSelection([{ kind: 'placement', id: markerId }])
        dragState = { last: event.snapped, moved: false, markerId }
        return
      }
      const hit = event.hit
      if (!hit) {
        // Selection is only cleared on pointer-up: a drag from empty canvas is a marquee.
        marquee.value = {
          from: event.world,
          to: event.world,
          screenFrom: [event.event.clientX, event.event.clientY],
          additive: event.event.shiftKey,
        }
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
      if (routeEdit.onPointerMove(event)) {
        return
      }
      if (marquee.value) {
        marquee.value = { ...marquee.value, to: event.world }
        return
      }
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

    onPointerUp(event: CanvasPointerEvent): void {
      if (routeEdit.onPointerUp()) {
        return
      }
      if (marquee.value) {
        finishMarquee(event)
        return
      }
      if (resize.onPointerUp()) {
        return
      }
      if (dragState?.moved) {
        store.endDrag()
      }
      dragState = null
    },

    onDblClick(event: CanvasPointerEvent): void {
      if (event.hit?.kind === 'route') {
        store.setSelection([event.hit])
        routeEdit.enter(event.hit.id)
      }
    },

    onKeydown(event: KeyboardEvent): boolean {
      if (routeEdit.onKeydown(event)) {
        return true
      }
      if (store.selection.length === 0) {
        return false
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') {
        clipboard.duplicateSelection()
        return true
      }
      const arrow = ARROW_DIRECTIONS[event.key]
      if (arrow) {
        const step = event.shiftKey ? NUDGE_STEP_LARGE : NUDGE_STEP
        store.commit((doc) => moveSelection(doc, [arrow[0] * step, arrow[1] * step]))
        return true
      }
      return false
    },

    deactivate(): void {
      routeEdit.exit()
      resize.cancel()
      dragState = null
      marquee.value = null
    },

    overlay: computed<ToolOverlay | null>(() => {
      if (marquee.value) {
        return { kind: 'rect', from: marquee.value.from, to: marquee.value.to }
      }
      return routeEdit.overlay.value ?? resize.overlay.value
    }),
  }
}
