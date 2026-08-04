import { computed, ref, type ComputedRef } from 'vue'
import { MIN_POLYGON_POINTS, WALL_GAP_MIN_LENGTH } from '../../core/constants'
import { pointsToRelativePath, shapeToPoints } from '../../core/model/roomPath'
import type { Vec2, WallGap } from '../../core/model/types'
import { midpoint, withinRadius } from '../../core/model/vec2'
import {
  clampWallGaps,
  remapWallGapsOnInsert,
  remapWallGapsOnRemove,
  setWallGaps,
} from '../../core/model/wallGaps'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, ToolOverlay } from './toolTypes'

interface VertexEdit {
  roomId: string
  origin: Vec2
  points: Vec2[]
  dragIndex: number | null
  dragged: boolean
  /** Edge indexes of the wall gaps shift with inserted/removed vertices. */
  gapRemap: ((gaps: WallGap[]) => WallGap[]) | null
}

interface RoomVertexMode {
  isActive: ComputedRef<boolean>
  enter(roomId: string): void
  reset(): void
  onPointerDown(event: CanvasPointerEvent): void
  onPointerMove(event: CanvasPointerEvent): void
  onPointerUp(): void
  overlay: ComputedRef<ToolOverlay | null>
}

/**
 * Vertex editing of a room outline, entered by double-clicking a room with the
 * room tool: drag vertices, click a midpoint to insert, Alt+click deletes.
 * The room tool delegates its pointer events here while active — mirrors the
 * `useWallGapMode` pattern.
 */
export function useRoomVertexMode(): RoomVertexMode {
  const store = useEditorStore()
  const edit = ref<VertexEdit | null>(null)

  const isActive = computed(() => edit.value !== null)

  /** End of vertex editing: normalize the origin to the first point, rect becomes path. */
  function commitEdit(current: VertexEdit): void {
    const first = current.points[0]
    const origin: Vec2 = [current.origin[0] + first[0], current.origin[1] + first[1]]
    const local = current.points.map(([x, y]): Vec2 => [x - first[0], y - first[1]])
    const remap = current.gapRemap
    current.gapRemap = null
    store.commitOn('room', current.roomId, (room) => {
      room.shape = { origin, path: pointsToRelativePath(local) }
      const previous = room.wallGaps ?? []
      setWallGaps(
        room,
        clampWallGaps(local, remap ? remap(previous) : previous, WALL_GAP_MIN_LENGTH),
      )
    })
  }

  function enter(roomId: string): void {
    const room = store.document?.rooms.find((entry) => entry.id === roomId)
    if (!room) {
      return
    }
    const points = shapeToPoints(room.shape)
    if (!points) {
      store.toolHint = 'This room path uses unsupported commands — vertex editing is disabled.'
      return
    }
    edit.value = {
      roomId,
      origin: room.shape.origin,
      points,
      dragIndex: null,
      dragged: false,
      gapRemap: null,
    }
    store.toolHint = 'Drag vertices; click a midpoint to insert, Alt+click a vertex to delete.'
    store.setSelection([{ kind: 'room', id: roomId }])
  }

  function reset(): void {
    if (edit.value) {
      edit.value = null
      store.toolHint = ''
    }
  }

  function onPointerDown(event: CanvasPointerEvent): void {
    const current = edit.value
    if (!current) {
      return
    }
    const local: Vec2 = [event.world[0] - current.origin[0], event.world[1] - current.origin[1]]
    const vertexIndex = current.points.findIndex((point) =>
      withinRadius(point, local, event.hitRadius),
    )
    if (vertexIndex >= 0) {
      if (event.event.altKey) {
        if (current.points.length > MIN_POLYGON_POINTS) {
          current.points.splice(vertexIndex, 1)
          current.gapRemap = (gaps) => remapWallGapsOnRemove(gaps, vertexIndex)
          commitEdit(current)
          enter(current.roomId)
        }
        return
      }
      current.dragIndex = vertexIndex
      current.dragged = false
      return
    }
    const midIndex = current.points.findIndex((point, index) => {
      const next = current.points[(index + 1) % current.points.length]
      return withinRadius(midpoint(point, next), local, event.hitRadius)
    })
    if (midIndex >= 0) {
      const next = current.points[(midIndex + 1) % current.points.length]
      current.points.splice(midIndex + 1, 0, midpoint(current.points[midIndex], next))
      current.gapRemap = (gaps) => remapWallGapsOnInsert(gaps, midIndex)
      current.dragIndex = midIndex + 1
      current.dragged = true
      return
    }
    reset()
  }

  function onPointerMove(event: CanvasPointerEvent): void {
    const current = edit.value
    if (current && current.dragIndex !== null) {
      current.points[current.dragIndex] = [
        event.snapped[0] - current.origin[0],
        event.snapped[1] - current.origin[1],
      ]
      current.dragged = true
    }
  }

  function onPointerUp(): void {
    const current = edit.value
    if (current && current.dragIndex !== null) {
      if (current.dragged) {
        commitEdit(current)
        enter(current.roomId)
      } else {
        current.dragIndex = null
      }
    }
  }

  const overlay = computed<ToolOverlay | null>(() => {
    const current = edit.value
    if (!current) {
      return null
    }
    return {
      kind: 'vertices',
      origin: current.origin,
      points: current.points,
      activeIndex: current.dragIndex,
    }
  })

  return { isActive, enter, reset, onPointerDown, onPointerMove, onPointerUp, overlay }
}
