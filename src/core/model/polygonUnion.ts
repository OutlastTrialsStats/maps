import { MIN_POLYGON_POINTS } from '../constants'
import type { Vec2 } from './types'
import { midpoint } from './vec2'
import { edgeLength, edgeSegments } from './wallGaps'

/**
 * Union of two simple polygons, restricted to what a room outline can express:
 * one closed ring without holes. Both outlines are split at every crossing and
 * each resulting sub-edge is kept or dropped by probing its two sides — that
 * way collinear overlaps (two rooms sharing a wall) need no traversal rules of
 * their own.
 */

export type PolygonUnionFailure = 'disjoint' | 'corner-touch' | 'hole' | 'degenerate'

export type PolygonUnionResult =
  | { ok: true; points: Vec2[] }
  | { ok: false; reason: PolygonUnionFailure }

type Edge = [Vec2, Vec2]

/**
 * Vertices snap to the 3 decimals the path writer emits. Every tolerance below
 * follows from that grid: side probes stay well inside half a quantum, so they
 * can never reach another edge, and genuinely collinear input yields an exact
 * zero rather than something needing a threshold.
 */
const QUANTUM_SCALE = 1000
const PROBE_DISTANCE = 2e-4
const PARALLEL_SINE = 1e-6
const COLLINEAR_DISTANCE = 5e-4
const COLLINEAR_CROSS = 1e-6
const PARAM_EPSILON = 1e-9

const quantize = (value: number): number => Math.round(value * QUANTUM_SCALE) / QUANTUM_SCALE
const quantized = ([x, y]: Vec2): Vec2 => [quantize(x), quantize(y)]
const pointKey = ([x, y]: Vec2): string => `${x},${y}`
const samePoint = (a: Vec2, b: Vec2): boolean => a[0] === b[0] && a[1] === b[1]
const subtract = (a: Vec2, b: Vec2): Vec2 => [a[0] - b[0], a[1] - b[1]]
const cross = (a: Vec2, b: Vec2): number => a[0] * b[1] - a[1] * b[0]
const dot = (a: Vec2, b: Vec2): number => a[0] * b[0] + a[1] * b[1]
const pointAt = ([from, to]: Edge, ratio: number): Vec2 => [
  from[0] + (to[0] - from[0]) * ratio,
  from[1] + (to[1] - from[1]) * ratio,
]
const onSegment = (ratio: number): boolean => ratio >= -PARAM_EPSILON && ratio <= 1 + PARAM_EPSILON

function toRing(points: Vec2[]): Vec2[] | null {
  const ring: Vec2[] = []
  for (const point of points) {
    const next = quantized(point)
    if (ring.length === 0 || !samePoint(ring[ring.length - 1], next)) {
      ring.push(next)
    }
  }
  if (ring.length > 1 && samePoint(ring[0], ring[ring.length - 1])) {
    ring.pop()
  }
  return ring.length >= MIN_POLYGON_POINTS ? ring : null
}

/** Even-odd ray casting; only ever called with probes that are off the boundary. */
function containsPoint(ring: Vec2[], [x, y]: Vec2): boolean {
  let inside = false
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const [xi, yi] = ring[index]
    const [xj, yj] = ring[previous]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

/** Where `point` projects onto the edge: 0 at its start, 1 at its end. */
function ratioOnEdge(edge: Edge, point: Vec2): number {
  const direction = subtract(edge[1], edge[0])
  return dot(subtract(point, edge[0]), direction) / dot(direction, direction)
}

function overlapSplits(edgeA: Edge, edgeB: Edge): { a: number[]; b: number[] } | null {
  const first = ratioOnEdge(edgeA, edgeB[0])
  const second = ratioOnEdge(edgeA, edgeB[1])
  const from = Math.max(0, Math.min(first, second))
  const to = Math.min(1, Math.max(first, second))
  if (to < from) {
    return null
  }
  return {
    a: [from, to],
    b: [ratioOnEdge(edgeB, pointAt(edgeA, from)), ratioOnEdge(edgeB, pointAt(edgeA, to))],
  }
}

function edgeSplits(edgeA: Edge, edgeB: Edge): { a: number[]; b: number[] } | null {
  const lengthA = edgeLength(edgeA)
  const lengthB = edgeLength(edgeB)
  if (lengthA === 0 || lengthB === 0) {
    return null
  }
  const directionA = subtract(edgeA[1], edgeA[0])
  const directionB = subtract(edgeB[1], edgeB[0])
  const delta = subtract(edgeB[0], edgeA[0])
  const denominator = cross(directionA, directionB)
  if (Math.abs(denominator) > PARALLEL_SINE * lengthA * lengthB) {
    const a = cross(delta, directionB) / denominator
    const b = cross(delta, directionA) / denominator
    return onSegment(a) && onSegment(b) ? { a: [a], b: [b] } : null
  }
  return Math.abs(cross(delta, directionA)) <= COLLINEAR_DISTANCE * lengthA
    ? overlapSplits(edgeA, edgeB)
    : null
}

function splitEdge(edge: Edge, ratios: number[]): Edge[] {
  const inner = ratios.filter((ratio) => ratio > 0 && ratio < 1).sort((a, b) => a - b)
  const points = [edge[0], ...inner.map((ratio) => quantized(pointAt(edge, ratio))), edge[1]]
  const parts: Edge[] = []
  for (let index = 1; index < points.length; index += 1) {
    if (!samePoint(points[index - 1], points[index])) {
      parts.push([points[index - 1], points[index]])
    }
  }
  return parts
}

/**
 * A sub-edge survives when exactly one of its sides lies inside — the wall two
 * rooms share has both sides inside and drops out. Orienting every survivor
 * with the interior on its left also collapses the duplicate that the second
 * room contributes for a shared stretch.
 */
function boundaryEdges(a: Vec2[], b: Vec2[], candidates: Edge[]): Edge[] {
  const inside = (point: Vec2): boolean => containsPoint(a, point) || containsPoint(b, point)
  const kept = new Map<string, Edge>()
  for (const [from, to] of candidates) {
    const size = edgeLength([from, to])
    if (size === 0) {
      continue
    }
    const direction = subtract(to, from)
    const offset: Vec2 = [
      (-direction[1] / size) * PROBE_DISTANCE,
      (direction[0] / size) * PROBE_DISTANCE,
    ]
    const middle = midpoint(from, to)
    const left = inside([middle[0] + offset[0], middle[1] + offset[1]])
    const right = inside([middle[0] - offset[0], middle[1] - offset[1]])
    if (left === right) {
      continue
    }
    const edge: Edge = left ? [from, to] : [to, from]
    kept.set(`${pointKey(edge[0])}|${pointKey(edge[1])}`, edge)
  }
  return [...kept.values()]
}

/** A point with two ways out pinches, and edges left over after one loop are a hole. */
function stitch(boundary: Edge[]): PolygonUnionResult {
  if (boundary.length < MIN_POLYGON_POINTS) {
    return { ok: false, reason: 'degenerate' }
  }
  const outgoing = new Map<string, Edge>()
  const incoming = new Set<string>()
  for (const edge of boundary) {
    const from = pointKey(edge[0])
    const to = pointKey(edge[1])
    if (outgoing.has(from) || incoming.has(to)) {
      return { ok: false, reason: 'corner-touch' }
    }
    outgoing.set(from, edge)
    incoming.add(to)
  }
  const points: Vec2[] = []
  let edge = boundary[0]
  for (let step = 0; step < boundary.length; step += 1) {
    points.push(edge[0])
    const next = outgoing.get(pointKey(edge[1]))
    if (!next) {
      return { ok: false, reason: 'degenerate' }
    }
    if (next === boundary[0]) {
      return points.length === boundary.length
        ? { ok: true, points }
        : { ok: false, reason: 'hole' }
    }
    edge = next
  }
  return { ok: false, reason: 'degenerate' }
}

/** Drops vertices in the middle of a straight run, including across the closing edge. */
function withoutCollinear(points: Vec2[]): Vec2[] {
  const ring = [...points]
  let index = 0
  while (ring.length > MIN_POLYGON_POINTS && index < ring.length) {
    const previous = ring[(index + ring.length - 1) % ring.length]
    const current = ring[index]
    const next = ring[(index + 1) % ring.length]
    if (Math.abs(cross(subtract(current, previous), subtract(next, current))) <= COLLINEAR_CROSS) {
      ring.splice(index, 1)
      index = Math.max(0, index - 1)
    } else {
      index += 1
    }
  }
  return ring
}

function signedArea(ring: Vec2[]): number {
  let sum = 0
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    sum += (ring[previous][0] - ring[index][0]) * (ring[previous][1] + ring[index][1])
  }
  return sum / 2
}

/** Both outlines cut into sub-edges at every point where they meet the other one. */
function splitAtCrossings(a: Vec2[], b: Vec2[]): { candidates: Edge[]; touching: boolean } {
  const edgesA = edgeSegments(a)
  const edgesB = edgeSegments(b)
  const splitsA: number[][] = edgesA.map(() => [])
  const splitsB: number[][] = edgesB.map(() => [])
  let touching = false
  edgesA.forEach((edgeA, indexA) => {
    edgesB.forEach((edgeB, indexB) => {
      const splits = edgeSplits(edgeA, edgeB)
      if (splits) {
        touching = true
        splitsA[indexA].push(...splits.a)
        splitsB[indexB].push(...splits.b)
      }
    })
  })
  return {
    touching,
    candidates: [
      ...edgesA.flatMap((edge, index) => splitEdge(edge, splitsA[index])),
      ...edgesB.flatMap((edge, index) => splitEdge(edge, splitsB[index])),
    ],
  }
}

export function unionSimplePolygons(first: Vec2[], second: Vec2[]): PolygonUnionResult {
  const a = toRing(first)
  const b = toRing(second)
  if (!a || !b) {
    return { ok: false, reason: 'degenerate' }
  }
  const { candidates, touching } = splitAtCrossings(a, b)
  if (!touching && !containsPoint(a, b[0]) && !containsPoint(b, a[0])) {
    return { ok: false, reason: 'disjoint' }
  }
  const stitched = stitch(boundaryEdges(a, b, candidates))
  if (!stitched.ok) {
    return stitched
  }
  const points = withoutCollinear(stitched.points)
  if (points.length < MIN_POLYGON_POINTS) {
    return { ok: false, reason: 'degenerate' }
  }
  // Keeping the winding of the first polygon keeps its wall gaps on their side.
  return {
    ok: true,
    points:
      signedArea(points) * signedArea(a) < 0 ? [points[0], ...points.slice(1).reverse()] : points,
  }
}
