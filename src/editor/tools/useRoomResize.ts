import { computed, ref } from 'vue'
import { ROOM_RESIZE_MIN_SIZE } from '../../core/constants'
import { pointsBounds, roomWorldPoints } from '../../core/model/roomPath'
import { isRoomScalable, scaleRoomGeometry } from '../../core/model/roomScale'
import type { Room, Vec2 } from '../../core/model/types'
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
  const activeIndex = ref<number | null>(null)
  let drag: ResizeDrag | null = null

  function roomBounds(room: Room): { min: Vec2; max: Vec2 } | null {
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
    if (!drag || !moves) {
      return 1
    }
    const originalSpan = drag.handles[drag.index][axis] - anchor[axis]
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
    const index = handles.findIndex(
      (handle) => Math.hypot(event.world[0] - handle[0], event.world[1] - handle[1]) <= hitRadius,
    )
    if (index < 0) {
      return false
    }
    drag = { roomId: room.id, original: jsonClone(room), handles, index, moved: false }
    activeIndex.value = index
    return true
  }

  function onPointerMove(event: CanvasPointerEvent): boolean {
    if (!drag) {
      return false
    }
    const anchor = drag.handles[(drag.index + HANDLE_COUNT / 2) % HANDLE_COUNT]
    const factors: Vec2 = [
      axisFactor(0, MOVES_X[drag.index], anchor, event.snapped),
      axisFactor(1, MOVES_Y[drag.index], anchor, event.snapped),
    ]
    if (!drag.moved) {
      store.beginDrag()
      drag.moved = true
    }
    const geometry = scaleRoomGeometry(drag.original, anchor, factors)
    const room = store.document?.rooms.find((entry) => entry.id === drag?.roomId)
    if (geometry && room) {
      room.shape = geometry.shape
      if (geometry.wallGaps) {
        room.wallGaps = geometry.wallGaps
      } else {
        delete room.wallGaps
      }
      if (geometry.innerLines) {
        room.innerLines = geometry.innerLines
      }
      if (geometry.label) {
        room.label = geometry.label
      }
    }
    return true
  }

  function onPointerUp(): boolean {
    if (!drag) {
      return false
    }
    if (drag.moved) {
      store.endDrag()
    }
    drag = null
    activeIndex.value = null
    return true
  }

  function cancel(): void {
    if (drag?.moved) {
      store.cancelDrag()
    }
    drag = null
    activeIndex.value = null
  }

  return { overlay, onPointerDown, onPointerMove, onPointerUp, cancel }
}
