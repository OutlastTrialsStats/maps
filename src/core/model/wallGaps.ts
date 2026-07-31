import type { Vec2, WallGap } from './types'

/**
 * Wall gap geometry: a gap is anchored to one edge of the closed room outline,
 * measured from that edge's start point. Import-free on purpose (only types):
 * scripts/validate-data.mjs reaches this module through validation.ts via Node
 * type stripping.
 */

const fmt = (value: number): string => String(Math.round(value * 1000) / 1000)

const samePoint = (a: Vec2, b: Vec2): boolean => a[0] === b[0] && a[1] === b[1]

/** Edges of the closed outline, including the closing edge back to point 0. */
export function edgeSegments(points: Vec2[]): Array<[Vec2, Vec2]> {
  return points.map((point, index): [Vec2, Vec2] => [point, points[(index + 1) % points.length]])
}

export function edgeLength([from, to]: [Vec2, Vec2]): number {
  return Math.hypot(to[0] - from[0], to[1] - from[1])
}

export function pointOnEdge([from, to]: [Vec2, Vec2], distance: number): Vec2 {
  const total = edgeLength([from, to])
  if (total === 0) {
    return [from[0], from[1]]
  }
  const ratio = distance / total
  return [from[0] + (to[0] - from[0]) * ratio, from[1] + (to[1] - from[1]) * ratio]
}

/** Distance of the perpendicular projection of `point` from the edge start, clamped to the edge. */
export function projectOnEdge([from, to]: [Vec2, Vec2], point: Vec2): number {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const lengthSq = dx * dx + dy * dy
  if (lengthSq === 0) {
    return 0
  }
  const ratio = ((point[0] - from[0]) * dx + (point[1] - from[1]) * dy) / lengthSq
  return Math.min(Math.max(ratio, 0), 1) * Math.sqrt(lengthSq)
}

export function distanceToEdge(edge: [Vec2, Vec2], point: Vec2): number {
  const projected = pointOnEdge(edge, projectOnEdge(edge, point))
  return Math.hypot(point[0] - projected[0], point[1] - projected[1])
}

/** Start and end point of a gap in shape-local coordinates. */
export function gapEndpoints(points: Vec2[], gap: WallGap): [Vec2, Vec2] | null {
  const edges = edgeSegments(points)
  if (gap.edge >= edges.length) {
    return null
  }
  const edge = edges[gap.edge]
  return [pointOnEdge(edge, gap.start), pointOnEdge(edge, gap.start + gap.length)]
}

interface Interval {
  start: number
  end: number
}

/** Gaps of one edge, clipped to the edge, sorted and merged where they overlap. */
function mergedIntervals(gaps: WallGap[], edgeIndex: number, length: number): Interval[] {
  const clipped = gaps
    .filter((gap) => gap.edge === edgeIndex)
    .map((gap) => ({
      start: Math.max(0, Math.min(gap.start, length)),
      end: Math.max(0, Math.min(gap.start + gap.length, length)),
    }))
    .filter((interval) => interval.end > interval.start)
    .sort((a, b) => a.start - b.start)

  const merged: Interval[] = []
  for (const interval of clipped) {
    const previous = merged[merged.length - 1]
    if (previous && interval.start <= previous.end) {
      previous.end = Math.max(previous.end, interval.end)
    } else {
      merged.push({ ...interval })
    }
  }
  return merged
}

function runToPath(run: Vec2[], closed: boolean): string {
  const [first, ...rest] = run
  const line = rest.map((point) => `L${fmt(point[0])},${fmt(point[1])}`).join('')
  return `M${fmt(first[0])},${fmt(first[1])}${line}${closed ? ' z' : ''}`
}

/**
 * `d` of the walls that remain: one open subpath per uninterrupted run, so
 * corners inside a run keep their miter join. The traversal starts at point 0,
 * therefore a run crossing that corner is stitched back together at the end.
 */
export function wallRunsPath(points: Vec2[], gaps: WallGap[]): string {
  const edges = edgeSegments(points)
  const runs: Vec2[][] = []
  let run: Vec2[] = [edges[0][0]]

  const flush = (): void => {
    if (run.length >= 2) {
      runs.push(run)
    }
  }

  edges.forEach((edge, index) => {
    const length = edgeLength(edge)
    let cursor = 0
    for (const interval of mergedIntervals(gaps, index, length)) {
      if (interval.start > cursor) {
        run.push(pointOnEdge(edge, interval.start))
      }
      flush()
      run = [pointOnEdge(edge, interval.end)]
      cursor = interval.end
    }
    if (cursor < length) {
      run.push(edge[1])
    }
  })
  flush()

  if (runs.length === 0) {
    return ''
  }
  const first = runs[0]
  const last = runs[runs.length - 1]
  if (runs.length === 1) {
    // No gap anywhere: the single run is the closed outline.
    return samePoint(first[0], first[first.length - 1])
      ? runToPath(first.slice(0, -1), true)
      : runToPath(first, false)
  }
  if (samePoint(last[last.length - 1], first[0])) {
    runs[0] = [...last, ...first.slice(1)]
    runs.pop()
  }
  return runs.map((entry) => runToPath(entry, false)).join(' ')
}

/** Drops gaps on edges that no longer exist and clamps them to their edge length. */
export function clampWallGaps(points: Vec2[], gaps: WallGap[], minLength: number): WallGap[] {
  const edges = edgeSegments(points)
  return gaps.flatMap((gap) => {
    if (gap.edge >= edges.length) {
      return []
    }
    const edge = edges[gap.edge]
    const length = edgeLength(edge)
    const start = Math.min(Math.max(gap.start, 0), length)
    const gapLength = Math.min(gap.length, length - start)
    return gapLength >= minLength ? [{ edge: gap.edge, start, length: gapLength }] : []
  })
}

/**
 * Vertex inserted inside edge `edgeIndex`: later edges shift up by one;
 * gaps on the split edge keep their offset (clamped afterwards).
 */
export function remapWallGapsOnInsert(gaps: WallGap[], edgeIndex: number): WallGap[] {
  return gaps.map((gap) => (gap.edge > edgeIndex ? { ...gap, edge: gap.edge + 1 } : gap))
}

/**
 * Vertex at `vertexIndex` removed: gaps on its outgoing edge are dropped,
 * later edges shift down by one.
 */
export function remapWallGapsOnRemove(gaps: WallGap[], vertexIndex: number): WallGap[] {
  return gaps.flatMap((gap) => {
    if (gap.edge === vertexIndex) {
      return []
    }
    return [gap.edge > vertexIndex ? { ...gap, edge: gap.edge - 1 } : gap]
  })
}
