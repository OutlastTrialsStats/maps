import { computed, ref, watch } from 'vue'
import { MIN_OPEN_PATH_POINTS, MIN_POLYGON_POINTS } from '../../core/constants'
import { snapOrtho } from '../../core/interaction/snapping'
import { pointsToOpenPath, pointsToRelativePath } from '../../core/model/roomPath'
import type { Room, Vec2 } from '../../core/model/types'
import { distance } from '../../core/model/vec2'
import { useEditorStore } from '../store/editorStore'
import { useZonesStore } from '../store/zonesStore'
import { useRoomVertexMode } from './useRoomVertexMode'
import { useWallGapMode } from './useWallGapMode'
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

/** Below two points both ends coincide — the far end is the anchor itself. */
const MIN_ENDPOINT_HIT_POINTS = 2

const DRAWING_HINT =
  'Click the far end / Enter / double-click closes · Ctrl+Z/Backspace removes the last point · Tab switches the drawing end · Alt inverts 90° snapping.'

type RoomToolState =
  | { kind: 'idle' }
  | ({ kind: 'drawing'; preview: Vec2 | null } & DrawingPoints)
  | { kind: 'rect'; start: Vec2; preview: Vec2 | null }
  | ({ kind: 'innerline'; roomId: string; origin: Vec2; preview: Vec2 | null } & DrawingPoints)

type DrawingState = Extract<RoomToolState, { kind: 'drawing' | 'innerline' }>

function isDrawing(state: RoomToolState): state is DrawingState {
  return state.kind === 'drawing' || state.kind === 'innerline'
}

export function useRoomTool(): EditorTool {
  const store = useEditorStore()
  const zonesStore = useZonesStore()
  const state = ref<RoomToolState>({ kind: 'idle' })
  const wallGaps = useWallGapMode()
  const vertexMode = useRoomVertexMode()

  const inWallGapMode = (): boolean => store.roomToolMode === 'wallgap'

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
    vertexMode.reset()
    store.drawingHistory = null
    if (inWallGapMode()) {
      wallGaps.reset()
      return
    }
    store.toolHint = ''
  }

  function registerHistory(): void {
    store.drawingHistory = {
      canUndo: () => isDrawing(state.value),
      canRedo: () => {
        const current = state.value
        return isDrawing(current) && current.redoPoints.length > 0
      },
      undo: () => {
        const current = state.value
        if (isDrawing(current) && !undoPoint(current)) {
          reset()
        }
      },
      redo: () => {
        const current = state.value
        if (isDrawing(current)) {
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
      distance(event.world, oppositeEndpoint(current)) <= event.hitRadius
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
    if (points.length < MIN_OPEN_PATH_POINTS) {
      reset()
      return
    }
    const local = points.map(([x, y]): Vec2 => [x - origin[0], y - origin[1]])
    store.commitOn('room', roomId, (room) => {
      room.innerLines = room.innerLines ?? []
      room.innerLines.push({ path: pointsToOpenPath(local), style: store.innerLineStyle })
    })
    reset()
  }

  watch(() => store.roomToolMode, reset)

  return {
    onPointerDown(event: CanvasPointerEvent): void {
      if (inWallGapMode()) {
        wallGaps.onPointerDown(event)
        return
      }
      if (vertexMode.isActive.value) {
        vertexMode.onPointerDown(event)
        return
      }
      const current = state.value
      const mode = store.roomToolMode

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
      if (inWallGapMode()) {
        wallGaps.onPointerMove(event)
        return
      }
      if (vertexMode.isActive.value) {
        vertexMode.onPointerMove(event)
        return
      }
      const current = state.value
      if (current.kind === 'drawing') {
        current.preview = snapPoint(event, activeAnchor(current))
      } else if (current.kind === 'rect' || current.kind === 'innerline') {
        current.preview = event.snapped
      }
    },

    onPointerUp(): void {
      if (inWallGapMode()) {
        wallGaps.onPointerUp()
        return
      }
      vertexMode.onPointerUp()
    },

    onDblClick(event: CanvasPointerEvent): void {
      if (inWallGapMode()) {
        return
      }
      const current = state.value
      // A double-click's first click already started a drawing; with too few
      // points to become anything it was meant for the room underneath.
      const startsVertexEdit =
        (current.kind === 'drawing' && current.points.length < MIN_POLYGON_POINTS) ||
        (current.kind === 'innerline' && current.points.length < MIN_OPEN_PATH_POINTS) ||
        current.kind === 'idle'
      if (startsVertexEdit && store.roomToolMode !== 'rect' && event.hit?.kind === 'room') {
        reset()
        vertexMode.enter(event.hit.id)
        return
      }
      if (current.kind === 'drawing') {
        commitPolygon(current.points)
        return
      }
      if (current.kind === 'innerline') {
        commitInnerLine(current.roomId, current.origin, current.points)
      }
    },

    onKeydown(event: KeyboardEvent): boolean {
      if (inWallGapMode()) {
        return wallGaps.onKeydown(event)
      }
      const current = state.value
      if (event.key === 'Tab' && isDrawing(current)) {
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
      if (event.key === 'Backspace' && isDrawing(current)) {
        if (!undoPoint(current)) {
          reset()
        }
        return true
      }
      if (event.key === 'Escape' && (current.kind !== 'idle' || vertexMode.isActive.value)) {
        reset()
        return true
      }
      return false
    },

    activate(): void {
      reset()
    },
    deactivate(): void {
      state.value = { kind: 'idle' }
      vertexMode.reset()
      store.drawingHistory = null
      wallGaps.reset()
      store.toolHint = ''
    },

    overlay: computed<ToolOverlay | null>(() => {
      if (inWallGapMode()) {
        return wallGaps.overlay.value
      }
      if (vertexMode.overlay.value) {
        return vertexMode.overlay.value
      }
      const current = state.value
      if (isDrawing(current)) {
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
      return null
    }),
  }
}
