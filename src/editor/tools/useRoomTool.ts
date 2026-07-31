import { computed, ref } from 'vue'
import { VERTEX_HIT_RADIUS } from '../../core/constants'
import { snapOrtho } from '../../core/interaction/snapping'
import { pointsToOpenPath, pointsToRelativePath, shapeToPoints } from '../../core/model/roomPath'
import type { Room, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { useZonesStore } from '../store/zonesStore'
import {
  activeAnchor,
  addPoint,
  oppositeEndpoint,
  redoPoint,
  switchEnd,
  undoPoint,
  type DrawingPoints,
} from './drawingPoints'
import type { CanvasPointerEvent, EditorTool, ToolOverlay } from './toolTypes'

const MIN_POLYGON_POINTS = 3
/** Below two points both ends coincide — the far end is the anchor itself. */
const MIN_ENDPOINT_HIT_POINTS = 2

const DRAWING_HINT =
  'Click the far end / Enter / double-click closes · Ctrl+Z/Backspace removes the last point · Tab switches the drawing end · Alt inverts 90° snapping.'

type RoomToolState =
  | { kind: 'idle' }
  | ({ kind: 'drawing'; preview: Vec2 | null } & DrawingPoints)
  | { kind: 'rect'; start: Vec2; preview: Vec2 | null }
  | ({ kind: 'innerline'; roomId: string; origin: Vec2; preview: Vec2 | null } & DrawingPoints)
  | {
      kind: 'vertex'
      roomId: string
      origin: Vec2
      points: Vec2[]
      dragIndex: number | null
      dragged: boolean
    }

function distance(a: Vec2, b: Vec2): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1])
}

function midpoint(a: Vec2, b: Vec2): Vec2 {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
}

export function useRoomTool(): EditorTool {
  const store = useEditorStore()
  const zonesStore = useZonesStore()
  const state = ref<RoomToolState>({ kind: 'idle' })

  /** Rooms need a valid global zone; without loaded zones there is no room. */
  function firstZoneId(): string | null {
    const zoneId = zonesStore.zones[0]?.id ?? null
    if (!zoneId) {
      store.toolHint = 'Zones are not loaded yet — cannot create rooms'
    }
    return zoneId
  }

  /** Ortho snapping relative to the anchor (toolbar toggle, Alt inverts), grid snapping comes from the canvas. */
  function snapPoint(event: CanvasPointerEvent, anchor?: Vec2): Vec2 {
    const ortho = store.roomOrthoSnap !== event.event.altKey
    if (anchor && ortho) {
      return snapOrtho(anchor, event.snapped)
    }
    return event.snapped
  }

  function reset(): void {
    state.value = { kind: 'idle' }
    store.drawingHistory = null
    store.toolHint = ''
  }

  function registerHistory(): void {
    store.drawingHistory = {
      canUndo: () => state.value.kind === 'drawing' || state.value.kind === 'innerline',
      canRedo: () => {
        const current = state.value
        return (
          (current.kind === 'drawing' || current.kind === 'innerline') &&
          current.redoPoints.length > 0
        )
      },
      undo: () => {
        const current = state.value
        if ((current.kind === 'drawing' || current.kind === 'innerline') && !undoPoint(current)) {
          reset()
        }
      },
      redo: () => {
        const current = state.value
        if (current.kind === 'drawing' || current.kind === 'innerline') {
          redoPoint(current)
        }
      },
    }
  }

  function handleDrawingClick(current: DrawingPoints, point: Vec2): void {
    if (distance(point, activeAnchor(current)) === 0) {
      return
    }
    addPoint(current, point)
  }

  /** Only polygons close: the click that joins the active end to the far end finishes the ring. */
  function isEndpointClick(current: DrawingPoints, event: CanvasPointerEvent): boolean {
    return (
      current.points.length >= MIN_ENDPOINT_HIT_POINTS &&
      distance(event.world, oppositeEndpoint(current)) <= VERTEX_HIT_RADIUS
    )
  }

  /** Shared completion of polygon and rectangle mode. */
  function createRoom(shape: Room['shape']): void {
    const zoneId = firstZoneId()
    if (!zoneId) {
      reset()
      return
    }
    store.commit((doc) => {
      const room: Room = {
        id: store.generateId('room'),
        floor: store.activeFloor,
        zone: zoneId,
        shape,
      }
      doc.rooms.push(room)
      store.setSelection([{ kind: 'room', id: room.id }])
    })
    reset()
  }

  function commitPolygon(points: Vec2[]): void {
    if (points.length < MIN_POLYGON_POINTS) {
      reset()
      return
    }
    // Copy instead of reference: points[0] is a reactive proxy from the tool state.
    const origin: Vec2 = [points[0][0], points[0][1]]
    const local = points.map(([x, y]): Vec2 => [x - origin[0], y - origin[1]])
    createRoom({ origin, path: pointsToRelativePath(local) })
  }

  function commitRect(start: Vec2, end: Vec2): void {
    const width = Math.abs(end[0] - start[0])
    const height = Math.abs(end[1] - start[1])
    if (width === 0 || height === 0) {
      reset()
      return
    }
    const origin: Vec2 = [Math.min(start[0], end[0]), Math.min(start[1], end[1])]
    createRoom({ origin, rect: [width, height] })
  }

  function commitInnerLine(roomId: string, origin: Vec2, points: Vec2[]): void {
    if (points.length < 2) {
      reset()
      return
    }
    const local = points.map(([x, y]): Vec2 => [x - origin[0], y - origin[1]])
    store.commit((doc) => {
      const room = doc.rooms.find((entry) => entry.id === roomId)
      if (!room) {
        return
      }
      room.innerLines = room.innerLines ?? []
      room.innerLines.push({ path: pointsToOpenPath(local), style: store.innerLineStyle })
    })
    reset()
  }

  /** End of vertex editing: normalize the origin to the first point, rect becomes path. */
  function commitVertexEdit(current: Extract<RoomToolState, { kind: 'vertex' }>): void {
    const first = current.points[0]
    const origin: Vec2 = [current.origin[0] + first[0], current.origin[1] + first[1]]
    const local = current.points.map(([x, y]): Vec2 => [x - first[0], y - first[1]])
    store.commit((doc) => {
      const room = doc.rooms.find((entry) => entry.id === current.roomId)
      if (room) {
        room.shape = { origin, path: pointsToRelativePath(local) }
      }
    })
  }

  function enterVertexEdit(roomId: string): void {
    const room = store.document?.rooms.find((entry) => entry.id === roomId)
    if (!room) {
      return
    }
    const points = shapeToPoints(room.shape)
    if (!points) {
      store.toolHint = 'This room path uses unsupported commands — vertex editing is disabled.'
      return
    }
    state.value = {
      kind: 'vertex',
      roomId,
      origin: room.shape.origin,
      points,
      dragIndex: null,
      dragged: false,
    }
    store.toolHint = 'Drag vertices; click a midpoint to insert, Alt+click a vertex to delete.'
    store.setSelection([{ kind: 'room', id: roomId }])
  }

  function handleVertexPointerDown(
    current: Extract<RoomToolState, { kind: 'vertex' }>,
    event: CanvasPointerEvent,
  ): void {
    const local: Vec2 = [event.world[0] - current.origin[0], event.world[1] - current.origin[1]]
    const vertexIndex = current.points.findIndex(
      (point) => distance(point, local) <= VERTEX_HIT_RADIUS,
    )
    if (vertexIndex >= 0) {
      if (event.event.altKey) {
        if (current.points.length > MIN_POLYGON_POINTS) {
          current.points.splice(vertexIndex, 1)
          commitVertexEdit(current)
          enterVertexEdit(current.roomId)
        }
        return
      }
      current.dragIndex = vertexIndex
      current.dragged = false
      return
    }
    const midIndex = current.points.findIndex((point, index) => {
      const next = current.points[(index + 1) % current.points.length]
      return distance(midpoint(point, next), local) <= VERTEX_HIT_RADIUS
    })
    if (midIndex >= 0) {
      const next = current.points[(midIndex + 1) % current.points.length]
      current.points.splice(midIndex + 1, 0, midpoint(current.points[midIndex], next))
      current.dragIndex = midIndex + 1
      current.dragged = true
      return
    }
    reset()
  }

  return {
    onPointerDown(event: CanvasPointerEvent): void {
      const current = state.value
      const mode = store.roomToolMode

      if (current.kind === 'vertex') {
        handleVertexPointerDown(current, event)
        return
      }
      if (mode === 'polygon') {
        if (current.kind === 'drawing') {
          if (isEndpointClick(current, event)) {
            // Below three points there is no area yet — ignore instead of stacking a point on the far end.
            if (current.points.length >= MIN_POLYGON_POINTS) {
              commitPolygon(current.points)
            }
            return
          }
          handleDrawingClick(current, snapPoint(event, activeAnchor(current)))
          return
        }
        state.value = {
          kind: 'drawing',
          points: [event.snapped],
          preview: null,
          activeEnd: 'tail',
          redoPoints: [],
        }
        registerHistory()
        store.toolHint = DRAWING_HINT
        return
      }
      if (mode === 'rect') {
        if (current.kind === 'rect') {
          commitRect(current.start, event.snapped)
          return
        }
        state.value = { kind: 'rect', start: event.snapped, preview: null }
        return
      }
      // Inner line mode: the first click has to hit a room.
      if (current.kind === 'innerline') {
        handleDrawingClick(current, event.snapped)
        return
      }
      if (event.hit?.kind === 'room') {
        const room = store.document?.rooms.find((entry) => entry.id === event.hit?.id)
        if (room) {
          state.value = {
            kind: 'innerline',
            roomId: room.id,
            origin: room.shape.origin,
            points: [event.snapped],
            preview: null,
            activeEnd: 'tail',
            redoPoints: [],
          }
          registerHistory()
        }
        return
      }
      store.toolHint = 'Inner lines: click inside a room to start drawing.'
    },

    onPointerMove(event: CanvasPointerEvent): void {
      const current = state.value
      if (current.kind === 'drawing') {
        current.preview = snapPoint(event, activeAnchor(current))
      } else if (current.kind === 'rect') {
        current.preview = event.snapped
      } else if (current.kind === 'innerline') {
        current.preview = event.snapped
      } else if (current.kind === 'vertex' && current.dragIndex !== null) {
        current.points[current.dragIndex] = [
          event.snapped[0] - current.origin[0],
          event.snapped[1] - current.origin[1],
        ]
        current.dragged = true
      }
    },

    onPointerUp(): void {
      const current = state.value
      if (current.kind === 'vertex' && current.dragIndex !== null) {
        if (current.dragged) {
          commitVertexEdit(current)
          enterVertexEdit(current.roomId)
        } else {
          current.dragIndex = null
        }
      }
    },

    onDblClick(event: CanvasPointerEvent): void {
      const current = state.value
      if (current.kind === 'drawing') {
        commitPolygon(current.points)
        return
      }
      if (current.kind === 'innerline') {
        commitInnerLine(current.roomId, current.origin, current.points)
        return
      }
      if (current.kind === 'idle' && store.roomToolMode !== 'rect' && event.hit?.kind === 'room') {
        enterVertexEdit(event.hit.id)
      }
    },

    onKeydown(event: KeyboardEvent): boolean {
      const current = state.value
      if (event.key === 'Tab' && (current.kind === 'drawing' || current.kind === 'innerline')) {
        switchEnd(current)
        return true
      }
      if (event.key === 'Enter') {
        if (current.kind === 'drawing') {
          commitPolygon(current.points)
          return true
        }
        if (current.kind === 'innerline') {
          commitInnerLine(current.roomId, current.origin, current.points)
          return true
        }
        return false
      }
      if (
        event.key === 'Backspace' &&
        (current.kind === 'drawing' || current.kind === 'innerline')
      ) {
        if (!undoPoint(current)) {
          reset()
        }
        return true
      }
      if (event.key === 'Escape' && current.kind !== 'idle') {
        reset()
        return true
      }
      return false
    },

    activate(): void {
      reset()
    },
    deactivate(): void {
      reset()
    },

    overlay: computed<ToolOverlay | null>(() => {
      const current = state.value
      if (current.kind === 'drawing') {
        return {
          kind: 'polyline',
          points: current.points,
          preview: current.preview,
          activeEnd: current.activeEnd,
        }
      }
      if (current.kind === 'rect') {
        return { kind: 'rect', from: current.start, to: current.preview ?? current.start }
      }
      if (current.kind === 'innerline') {
        return {
          kind: 'polyline',
          points: current.points,
          preview: current.preview,
          activeEnd: current.activeEnd,
        }
      }
      if (current.kind === 'vertex') {
        return {
          kind: 'vertices',
          origin: current.origin,
          points: current.points,
          activeIndex: current.dragIndex,
        }
      }
      return null
    }),
  }
}
