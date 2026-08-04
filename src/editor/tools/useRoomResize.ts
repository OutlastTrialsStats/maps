import { computed, ref } from 'vue'
import { ROOM_RESIZE_MIN_SIZE } from '../../core/constants'
import { pointsBounds, roomWorldPoints } from '../../core/model/roomPath'
import { applyRoomGeometry, isRoomScalable, scaleRoomGeometry } from '../../core/model/roomScale'
import type { Bounds, Room, Vec2 } from '../../core/model/types'
import { withinRadius } from '../../core/model/vec2'
import { useEditorStore } from '../store/editorStore'
import { jsonClone } from '../store/jsonClone'
import type { CanvasPointerEvent, ToolOverlay } from './toolTypes'

/** Clockwise from top-left: even indexes are corners, odd ones edge midpoints. */
const HANDLE_COUNT = 8
/** Cap of the handle hit radius relative to the box: the center stays free for dragging. */
const HANDLE_HIT_BOX_RATIO = 0.25
const MOVES_X = [true, false, true, true, true, false, true, true]
const MOVES_Y = [true, true, true, false, true, true, true, false]

function handlePositions(min: Vec2, max: Vec2): Vec2[] {
  const midX = (min[0] + max[0]) / 2
  const midY = (min[1] + max[1]) / 2
  return [
    [min[0], min[1]],
    [midX, min[1]],
    [max[0], min[1]],
    [max[0], midY],
    [max[0], max[1]],
    [midX, max[1]],
    [min[0], max[1]],
    [min[0], midY],
  ]
}

interface ResizeDrag {
  roomId: string
  /** Snapshot at drag start — every move scales from here, not incrementally. */
  original: Room
  handles: Vec2[]
  index: number
  moved: boolean
}

/**
 * Bounding-box resize of the single selected room: dragging a handle scales
 * the whole geometry around the opposite handle. Lives beside the select tool,
 * which delegates its pointer events here first.
 */
export function useRoomResize() {
  const store = useEditorStore()
  const drag = ref<ResizeDrag | null>(null)
  const activeIndex = computed(() => drag.value?.index ?? null)

  function roomBounds(room: Room): Bounds | null {
    const points = roomWorldPoints(room)
    return points.length > 0 ? pointsBounds(points) : null
  }

  const targetRoom = computed<Room | null>(() => {
    const room = store.selectedRoom
    if (!room || room.floor !== store.activeFloor || !isRoomScalable(room)) {
      return null
    }
    return room
  })

  const overlay = computed<ToolOverlay | null>(() => {
    const room = targetRoom.value
    if (!room) {
      return null
    }
    const bounds = roomBounds(room)
    if (!bounds) {
      return null
    }
    return {
      kind: 'resize',
      min: bounds.min,
      max: bounds.max,
      handles: handlePositions(bounds.min, bounds.max),
      activeIndex: activeIndex.value,
    }
  })

  /** Dragged span relative to the anchor: same side as the original, never below min size. */
  function axisFactor(axis: 0 | 1, moves: boolean, anchor: Vec2, target: Vec2): number {
    const state = drag.value
    if (!state || !moves) {
      return 1
    }
    const originalSpan = state.handles[state.index][axis] - anchor[axis]
    if (originalSpan === 0) {
      return 1
    }
    const sign = Math.sign(originalSpan)
    const desired = (target[axis] - anchor[axis]) * sign
    return (Math.max(desired, ROOM_RESIZE_MIN_SIZE) * sign) / originalSpan
  }

  function onPointerDown(event: CanvasPointerEvent): boolean {
    const room = targetRoom.value
    if (!room) {
      return false
    }
    const bounds = roomBounds(room)
    if (!bounds) {
      return false
    }
    const handles = handlePositions(bounds.min, bounds.max)
    const shortestEdge = Math.min(bounds.max[0] - bounds.min[0], bounds.max[1] - bounds.min[1])
    const hitRadius = Math.min(event.hitRadius, shortestEdge * HANDLE_HIT_BOX_RATIO)
    const index = handles.findIndex((handle) => withinRadius(event.world, handle, hitRadius))
    if (index < 0) {
      return false
    }
    drag.value = { roomId: room.id, original: jsonClone(room), handles, index, moved: false }
    return true
  }

  function onPointerMove(event: CanvasPointerEvent): boolean {
    const state = drag.value
    if (!state) {
      return false
    }
    const anchor = state.handles[(state.index + HANDLE_COUNT / 2) % HANDLE_COUNT]
    const factors: Vec2 = [
      axisFactor(0, MOVES_X[state.index], anchor, event.snapped),
      axisFactor(1, MOVES_Y[state.index], anchor, event.snapped),
    ]
    if (!state.moved) {
      store.beginDrag()
      state.moved = true
    }
    const geometry = scaleRoomGeometry(state.original, anchor, factors)
    const room = store.document?.rooms.find((entry) => entry.id === state.roomId)
    if (geometry && room) {
      applyRoomGeometry(room, geometry)
    }
    return true
  }

  function onPointerUp(): boolean {
    if (!drag.value) {
      return false
    }
    if (drag.value.moved) {
      store.endDrag()
    }
    drag.value = null
    return true
  }

  function cancel(): void {
    if (drag.value?.moved) {
      store.cancelDrag()
    }
    drag.value = null
  }

  return { overlay, onPointerDown, onPointerMove, onPointerUp, cancel }
}
