import { computed, ref } from 'vue'
import { VERTEX_HIT_RADIUS } from '../../core/constants'
import { snapOrtho } from '../../core/interaction/snapping'
import {
  pointsToOpenPath,
  pointsToRelativePath,
  shapeToPoints,
} from '../../core/model/roomPath'
import type { Room, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { useZonesStore } from '../store/zonesStore'
import type { CanvasPointerEvent, EditorTool, ToolOverlay } from './toolTypes'

const MIN_POLYGON_POINTS = 3

type RoomToolState =
  | { kind: 'idle' }
  | { kind: 'drawing'; points: Vec2[]; preview: Vec2 | null }
  | { kind: 'rect'; start: Vec2; preview: Vec2 | null }
  | { kind: 'innerline'; roomId: string; origin: Vec2; points: Vec2[]; preview: Vec2 | null }
  | { kind: 'vertex'; roomId: string; origin: Vec2; points: Vec2[]; dragIndex: number | null; dragged: boolean }

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

  /** Räume brauchen eine gültige globale Zone; ohne geladene Zonen kein Raum. */
  function firstZoneId(): string | null {
    const zoneId = zonesStore.zones[0]?.id ?? null
    if (!zoneId) {
      store.toolHint = 'Zones are not loaded yet — cannot create rooms'
    }
    return zoneId
  }

  /** Ortho-Snapping relativ zum letzten Punkt (Alt = frei), Grid-Snap kommt vom Canvas. */
  function snapPoint(event: CanvasPointerEvent, anchor?: Vec2): Vec2 {
    if (anchor && !event.event.altKey) {
      return snapOrtho(anchor, event.snapped)
    }
    return event.snapped
  }

  function reset(): void {
    state.value = { kind: 'idle' }
    store.toolHint = ''
  }

  /** Gemeinsamer Abschluss von Polygon- und Rechteck-Modus. */
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
      if (store.visibilityForNewObjects) {
        room.visibility = store.visibilityForNewObjects
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
    // Kopie statt Referenz: points[0] ist ein Reactive-Proxy aus dem Tool-State.
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

  /** Vertex-Edit-Abschluss: origin auf ersten Punkt normalisieren, rect wird zu path. */
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
    const local: Vec2 = [
      event.world[0] - current.origin[0],
      event.world[1] - current.origin[1],
    ]
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
          const point = snapPoint(event, current.points[current.points.length - 1])
          if (
            current.points.length >= MIN_POLYGON_POINTS &&
            distance(point, current.points[0]) <= VERTEX_HIT_RADIUS
          ) {
            commitPolygon(current.points)
            return
          }
          current.points.push(point)
          return
        }
        state.value = { kind: 'drawing', points: [event.snapped], preview: null }
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
      // Innenlinien-Modus: erster Klick muss einen Raum treffen.
      if (current.kind === 'innerline') {
        current.points.push(event.snapped)
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
          }
        }
        return
      }
      store.toolHint = 'Inner lines: click inside a room to start drawing.'
    },

    onPointerMove(event: CanvasPointerEvent): void {
      const current = state.value
      if (current.kind === 'drawing') {
        current.preview = snapPoint(event, current.points[current.points.length - 1])
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
        return { kind: 'polyline', points: current.points, preview: current.preview }
      }
      if (current.kind === 'rect') {
        return { kind: 'rect', from: current.start, to: current.preview ?? current.start }
      }
      if (current.kind === 'innerline') {
        return { kind: 'polyline', points: current.points, preview: current.preview }
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
