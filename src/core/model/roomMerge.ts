import { ROOM_MERGE_GAP_TOLERANCE, WALL_GAP_MIN_LENGTH } from '../constants'
import { unionSimplePolygons, type PolygonUnionFailure } from './polygonUnion'
import {
  parseOpenPath,
  pointsToOpenPath,
  pointsToRelativePath,
  roomWorldPoints,
  shapeToPoints,
} from './roomPath'
import type { RoomGeometry } from './roomScale'
import type { InnerLine, Room, Vec2, WallGap } from './types'
import { clampWallGaps, distanceToEdge, edgeSegments, gapEndpoints, projectOnEdge } from './wallGaps'

export type RoomMergeFailure = 'different-floors' | 'unsupported-path' | PolygonUnionFailure

export type RoomMergeResult =
  | { ok: true; geometry: RoomGeometry }
  | { ok: false; reason: RoomMergeFailure }

interface ParsedRoom {
  room: Room
  points: Vec2[]
  innerPoints: Vec2[][]
}

function parseRoom(room: Room): ParsedRoom | null {
  const points = shapeToPoints(room.shape)
  if (!points) {
    return null
  }
  const innerPoints: Vec2[][] = []
  for (const line of room.innerLines ?? []) {
    const parsed = parseOpenPath(line.path)
    if (!parsed) {
      return null
    }
    innerPoints.push(parsed)
  }
  return { room, points, innerPoints }
}

/** Moves shape-local points of `source` onto the merged origin. */
function rebaser(source: ParsedRoom, origin: Vec2): (point: Vec2) => Vec2 {
  const dx = source.room.shape.origin[0] - origin[0]
  const dy = source.room.shape.origin[1] - origin[1]
  return ([x, y]) => [x + dx, y + dy]
}

/**
 * Gaps keep their world position: both endpoints are re-attached to the merged
 * edge they still sit on. Those on the wall the two rooms shared find no edge
 * within the tolerance and drop out — that opening is interior now.
 */
function reprojectGaps(
  source: ParsedRoom,
  target: Vec2[],
  rebase: (point: Vec2) => Vec2,
): WallGap[] {
  const edges = edgeSegments(target)
  return (source.room.wallGaps ?? []).flatMap((gap) => {
    const endpoints = gapEndpoints(source.points, gap)
    if (!endpoints) {
      return []
    }
    const [start, end] = endpoints.map(rebase)
    let nearest = -1
    let nearestDistance = Infinity
    edges.forEach((edge, index) => {
      const distance = Math.max(distanceToEdge(edge, start), distanceToEdge(edge, end))
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearest = index
      }
    })
    if (nearestDistance > ROOM_MERGE_GAP_TOLERANCE) {
      return []
    }
    const from = projectOnEdge(edges[nearest], start)
    const to = projectOnEdge(edges[nearest], end)
    return [{ edge: nearest, start: Math.min(from, to), length: Math.abs(to - from) }]
  })
}

function rebaseInnerLines(source: ParsedRoom, rebase: (point: Vec2) => Vec2): InnerLine[] {
  return (source.room.innerLines ?? []).map((line, index) => ({
    ...line,
    path: pointsToOpenPath(source.innerPoints[index].map(rebase)),
  }))
}

/**
 * Outline, wall gaps, inner lines and label of `survivor` ⊕ `absorbed`. The
 * survivor's identity — id, zone, flags, info — is not touched here.
 */
export function mergeRoomGeometry(survivor: Room, absorbed: Room): RoomMergeResult {
  if (survivor.floor !== absorbed.floor) {
    return { ok: false, reason: 'different-floors' }
  }
  const survivorParts = parseRoom(survivor)
  const absorbedParts = parseRoom(absorbed)
  if (!survivorParts || !absorbedParts) {
    return { ok: false, reason: 'unsupported-path' }
  }
  const union = unionSimplePolygons(roomWorldPoints(survivor), roomWorldPoints(absorbed))
  if (!union.ok) {
    return { ok: false, reason: union.reason }
  }

  const origin = union.points[0]
  const points = union.points.map(([x, y]): Vec2 => [x - origin[0], y - origin[1]])
  const rebaseSurvivor = rebaser(survivorParts, origin)
  const rebaseAbsorbed = rebaser(absorbedParts, origin)
  const geometry: RoomGeometry = { shape: { origin, path: pointsToRelativePath(points) } }

  const gaps = clampWallGaps(
    points,
    [
      ...reprojectGaps(survivorParts, points, rebaseSurvivor),
      ...reprojectGaps(absorbedParts, points, rebaseAbsorbed),
    ],
    WALL_GAP_MIN_LENGTH,
  )
  if (gaps.length > 0) {
    geometry.wallGaps = gaps
  }
  const innerLines = [
    ...rebaseInnerLines(survivorParts, rebaseSurvivor),
    ...rebaseInnerLines(absorbedParts, rebaseAbsorbed),
  ]
  if (innerLines.length > 0) {
    geometry.innerLines = innerLines
  }
  const label = survivor.label ?? absorbed.label
  if (label) {
    const rebase = survivor.label ? rebaseSurvivor : rebaseAbsorbed
    geometry.label = { ...label, pos: rebase(label.pos) }
  }
  return { ok: true, geometry }
}
