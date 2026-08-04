import { WALL_GAP_MIN_LENGTH } from '../constants'
import { parseOpenPath, pointsToOpenPath, pointsToRelativePath, shapeToPoints } from './roomPath'
import type { InnerLine, Room, RoomLabel, RoomShape, Vec2, WallGap } from './types'
import { clampWallGaps, edgeLength, edgeSegments, setWallGaps } from './wallGaps'

/** Everything of a room that has to scale together when it is resized. */
export interface RoomGeometry {
  shape: RoomShape
  wallGaps?: WallGap[]
  innerLines?: InnerLine[]
  label?: RoomLabel
}

/** Writes a recomputed geometry back to the room; an empty gap list drops the property. */
export function applyRoomGeometry(room: Room, geometry: RoomGeometry): void {
  room.shape = geometry.shape
  setWallGaps(room, geometry.wallGaps ?? [])
  if (geometry.innerLines) {
    room.innerLines = geometry.innerLines
  }
  if (geometry.label) {
    room.label = geometry.label
  }
}

/** Resizing needs every path in parseable form — same restriction as vertex editing. */
export function isRoomScalable(room: Room): boolean {
  if (!shapeToPoints(room.shape)) {
    return false
  }
  return (room.innerLines ?? []).every((line) => parseOpenPath(line.path) !== null)
}

/** Gap distances are measured along their edge, so they scale with its length. */
function scaleWallGaps(gaps: WallGap[], oldPoints: Vec2[], newPoints: Vec2[]): WallGap[] {
  const oldEdges = edgeSegments(oldPoints)
  const newEdges = edgeSegments(newPoints)
  const scaled = gaps
    .filter((gap) => gap.edge < oldEdges.length)
    .map((gap) => {
      const oldLength = edgeLength(oldEdges[gap.edge])
      const factor = oldLength > 0 ? edgeLength(newEdges[gap.edge]) / oldLength : 1
      return { edge: gap.edge, start: gap.start * factor, length: gap.length * factor }
    })
  return clampWallGaps(newPoints, scaled, WALL_GAP_MIN_LENGTH)
}

/**
 * Scales a room's geometry per axis around a fixed world-space `anchor` (the
 * bounding-box handle opposite the dragged one). Origin-relative data (points,
 * label, inner lines) only needs the linear part; the origin itself carries the
 * translation. `null` when a path cannot be parsed.
 */
export function scaleRoomGeometry(room: Room, anchor: Vec2, factors: Vec2): RoomGeometry | null {
  const oldPoints = shapeToPoints(room.shape)
  if (!oldPoints) {
    return null
  }
  const innerPoints = (room.innerLines ?? []).map((line) => parseOpenPath(line.path))
  if (innerPoints.some((points) => points === null)) {
    return null
  }

  const scaleLocal = ([x, y]: Vec2): Vec2 => [x * factors[0], y * factors[1]]
  const origin: Vec2 = [
    anchor[0] + (room.shape.origin[0] - anchor[0]) * factors[0],
    anchor[1] + (room.shape.origin[1] - anchor[1]) * factors[1],
  ]
  const newPoints = oldPoints.map(scaleLocal)

  const geometry: RoomGeometry = {
    shape:
      'rect' in room.shape
        ? { origin, rect: [room.shape.rect[0] * factors[0], room.shape.rect[1] * factors[1]] }
        : { origin, path: pointsToRelativePath(newPoints) },
  }
  if (room.wallGaps && room.wallGaps.length > 0) {
    const gaps = scaleWallGaps(room.wallGaps, oldPoints, newPoints)
    if (gaps.length > 0) {
      geometry.wallGaps = gaps
    }
  }
  if (room.innerLines) {
    geometry.innerLines = room.innerLines.map((line, index) => ({
      ...line,
      path: pointsToOpenPath((innerPoints[index] as Vec2[]).map(scaleLocal)),
    }))
  }
  if (room.label) {
    geometry.label = { ...room.label, pos: scaleLocal(room.label.pos) }
  }
  return geometry
}
