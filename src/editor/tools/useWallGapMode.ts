import { computed, ref, type ComputedRef } from 'vue'
import {
  VERTEX_HIT_RADIUS,
  WALL_GAP_DEFAULT_LENGTH,
  WALL_GAP_MIN_LENGTH,
} from '../../core/constants'
import { shapeToPoints } from '../../core/model/roomPath'
import type { Room, Vec2, WallGap } from '../../core/model/types'
import {
  distanceToEdge,
  edgeLength,
  edgeSegments,
  gapEndpoints,
  projectOnEdge,
} from '../../core/model/wallGaps'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, ToolOverlay } from './toolTypes'

const HINT_PICK_ROOM = 'Wall gaps: click a room to open its outline.'
const HINT_EDIT =
  'Click an edge to cut an opening · drag the round handles to resize · Alt+click an opening removes it · Escape leaves the room.'

interface ActiveRoom {
  roomId: string
  origin: Vec2
  points: Vec2[]
}

interface DragState {
  gapIndex: number
  end: 'start' | 'end'
  moved: boolean
}

const EDGE_HIT_DISTANCE = VERTEX_HIT_RADIUS

/** Room-tool mode that cuts openings into the outer wall (`Room.wallGaps`). */
export interface WallGapMode {
  onPointerDown(event: CanvasPointerEvent): void
  onPointerMove(event: CanvasPointerEvent): void
  onPointerUp(): void
  onKeydown(event: KeyboardEvent): boolean
  reset(): void
  overlay: ComputedRef<ToolOverlay | null>
}

export function useWallGapMode(): WallGapMode {
  const store = useEditorStore()
  const active = ref<ActiveRoom | null>(null)
  const drag = ref<DragState | null>(null)

  function currentRoom(): Room | undefined {
    return store.document?.rooms.find((room) => room.id === active.value?.roomId)
  }

  function gapsOf(): WallGap[] {
    return currentRoom()?.wallGaps ?? []
  }

  function mutateGaps(mutate: (gaps: WallGap[]) => WallGap[]): void {
    const roomId = active.value?.roomId
    if (!roomId) {
      return
    }
    store.commit((doc) => {
      const room = doc.rooms.find((entry) => entry.id === roomId)
      if (!room) {
        return
      }
      const next = mutate(room.wallGaps ?? [])
      if (next.length === 0) {
        delete room.wallGaps
      } else {
        room.wallGaps = next
      }
    })
  }

  function enterRoom(roomId: string): void {
    const room = store.document?.rooms.find((entry) => entry.id === roomId)
    if (!room) {
      return
    }
    const points = shapeToPoints(room.shape)
    if (!points) {
      store.toolHint = 'This room path uses unsupported commands — wall gaps are disabled.'
      return
    }
    active.value = { roomId, origin: room.shape.origin, points }
    store.toolHint = HINT_EDIT
    store.setSelection([{ kind: 'room', id: roomId }])
  }

  function reset(): void {
    active.value = null
    drag.value = null
    store.toolHint = HINT_PICK_ROOM
  }

  function toLocal(current: ActiveRoom, point: Vec2): Vec2 {
    return [point[0] - current.origin[0], point[1] - current.origin[1]]
  }

  function findHandle(current: ActiveRoom, local: Vec2): DragState | null {
    const gaps = gapsOf()
    for (let index = 0; index < gaps.length; index += 1) {
      const endpoints = gapEndpoints(current.points, gaps[index])
      if (!endpoints) {
        continue
      }
      const [from, to] = endpoints
      if (Math.hypot(local[0] - from[0], local[1] - from[1]) <= VERTEX_HIT_RADIUS) {
        return { gapIndex: index, end: 'start', moved: false }
      }
      if (Math.hypot(local[0] - to[0], local[1] - to[1]) <= VERTEX_HIT_RADIUS) {
        return { gapIndex: index, end: 'end', moved: false }
      }
    }
    return null
  }

  function findGap(current: ActiveRoom, local: Vec2): number {
    const edges = edgeSegments(current.points)
    return gapsOf().findIndex((gap) => {
      if (gap.edge >= edges.length) {
        return false
      }
      const edge = edges[gap.edge]
      if (distanceToEdge(edge, local) > EDGE_HIT_DISTANCE) {
        return false
      }
      const distance = projectOnEdge(edge, local)
      return distance >= gap.start && distance <= gap.start + gap.length
    })
  }

  function createGap(current: ActiveRoom, world: Vec2, snapped: Vec2): boolean {
    const edges = edgeSegments(current.points)
    const worldLocal = toLocal(current, world)
    let bestIndex = -1
    let bestDistance = EDGE_HIT_DISTANCE
    edges.forEach((edge, index) => {
      const distance = distanceToEdge(edge, worldLocal)
      if (distance <= bestDistance) {
        bestDistance = distance
        bestIndex = index
      }
    })
    if (bestIndex < 0) {
      return false
    }
    const edge = edges[bestIndex]
    const available = edgeLength(edge)
    const length = Math.min(WALL_GAP_DEFAULT_LENGTH, available)
    if (length < WALL_GAP_MIN_LENGTH) {
      return false
    }
    const center = projectOnEdge(edge, toLocal(current, snapped))
    const start = Math.min(Math.max(center - length / 2, 0), available - length)
    mutateGaps((gaps) => [...gaps, { edge: bestIndex, start, length }])
    return true
  }

  function resizeGap(current: ActiveRoom, state: DragState, snapped: Vec2): void {
    const gap = currentRoom()?.wallGaps?.[state.gapIndex]
    const edges = edgeSegments(current.points)
    if (!gap || gap.edge >= edges.length) {
      return
    }
    const edge = edges[gap.edge]
    const available = edgeLength(edge)
    const distance = projectOnEdge(edge, toLocal(current, snapped))
    const end = gap.start + gap.length
    if (state.end === 'start') {
      const start = Math.min(Math.max(distance, 0), end - WALL_GAP_MIN_LENGTH)
      gap.start = start
      gap.length = end - start
      return
    }
    gap.length = Math.min(Math.max(distance, gap.start + WALL_GAP_MIN_LENGTH), available) - gap.start
  }

  return {
    onPointerDown(event: CanvasPointerEvent): void {
      const current = active.value
      if (current) {
        const local = toLocal(current, event.world)
        const handle = findHandle(current, local)
        if (handle) {
          drag.value = handle
          return
        }
        if (event.event.altKey) {
          const gapIndex = findGap(current, local)
          if (gapIndex >= 0) {
            mutateGaps((gaps) => gaps.filter((_, index) => index !== gapIndex))
            return
          }
        }
        if (createGap(current, event.world, event.snapped)) {
          return
        }
      }
      if (event.hit?.kind === 'room' && event.hit.id !== current?.roomId) {
        enterRoom(event.hit.id)
        return
      }
      if (!event.hit) {
        reset()
      }
    },

    onPointerMove(event: CanvasPointerEvent): void {
      const current = active.value
      const state = drag.value
      if (!current || !state) {
        return
      }
      if (!state.moved) {
        store.beginDrag()
        state.moved = true
      }
      resizeGap(current, state, event.snapped)
    },

    onPointerUp(): void {
      if (drag.value?.moved) {
        store.endDrag()
      }
      drag.value = null
    },

    onKeydown(event: KeyboardEvent): boolean {
      if (event.key === 'Escape' && active.value) {
        reset()
        return true
      }
      return false
    },

    reset,

    overlay: computed<ToolOverlay | null>(() => {
      const current = active.value
      if (!current) {
        return null
      }
      const gaps = gapsOf()
        .map((gap) => gapEndpoints(current.points, gap))
        .filter((endpoints): endpoints is [Vec2, Vec2] => endpoints !== null)
      return {
        kind: 'wallgaps',
        origin: current.origin,
        points: current.points,
        gaps,
        activeIndex: drag.value?.gapIndex ?? null,
      }
    }),
  }
}
