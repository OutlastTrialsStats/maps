import type { Bounds, Room, RoomShape, Vec2 } from './types'

/**
 * Minimal path parser for room outlines — paths are only parsed for editing in
 * the editor and for validation. Supports exactly the commands the editor
 * emits itself: M/m, L/l, H/h, V/v, Z/z — a single subpath.
 * Curves etc. return `null` (vertex editing is then disabled).
 */

const COMMAND_RE = /^[A-Za-z]$/
const TOKEN_RE = /[A-Za-z]|-?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/g
const CHARSET_RE = /^[MmLlHhVvZz0-9eE+,.\s-]*$/

/** Path numbers are rounded to 3 decimals so emitted `d` strings stay compact. */
export const formatPathNumber = (value: number): string =>
  String(Math.round(value * 1000) / 1000)

const LINETO = {
  L: ([x, y]: number[], current: Vec2, absolute: boolean): Vec2 =>
    absolute ? [x, y] : [current[0] + x, current[1] + y],
  H: ([x]: number[], current: Vec2, absolute: boolean): Vec2 =>
    absolute ? [x, current[1]] : [current[0] + x, current[1]],
  V: ([y]: number[], current: Vec2, absolute: boolean): Vec2 =>
    absolute ? [current[0], y] : [current[0], current[1] + y],
}

function parsePathPoints(path: string): { points: Vec2[]; closed: boolean } | null {
  if (!CHARSET_RE.test(path)) {
    return null
  }
  const tokens = path.match(TOKEN_RE)
  if (!tokens || tokens.length === 0) {
    return null
  }

  const points: Vec2[] = [[0, 0]]
  let current: Vec2 = [0, 0]
  let closed = false
  let started = false
  let index = 0

  const isNumberNext = (): boolean => index < tokens.length && !COMMAND_RE.test(tokens[index])
  const readNumbers = (count: number): number[] | null => {
    const values: number[] = []
    while (values.length < count) {
      if (!isNumberNext()) {
        return null
      }
      const value = Number(tokens[index])
      index += 1
      if (!Number.isFinite(value)) {
        return null
      }
      values.push(value)
    }
    return values
  }
  const push = (point: Vec2): void => {
    current = point
    points.push(point)
    started = true
  }

  while (index < tokens.length) {
    if (closed) {
      return null
    }
    const command = tokens[index]
    if (!COMMAND_RE.test(command)) {
      return null
    }
    index += 1
    const upper = command.toUpperCase()
    const absolute = command === upper
    if (upper === 'M') {
      if (started) {
        return null
      }
      const args = readNumbers(2)
      if (!args) {
        return null
      }
      current = absolute ? [args[0], args[1]] : [current[0] + args[0], current[1] + args[1]]
      points[0] = current
      // Further coordinate pairs after M/m are implicit linetos.
      while (isNumberNext()) {
        const lineArgs = readNumbers(2)
        if (!lineArgs) {
          return null
        }
        push(LINETO.L(lineArgs, current, absolute))
      }
    } else if (upper === 'L' || upper === 'H' || upper === 'V') {
      do {
        const args = readNumbers(upper === 'L' ? 2 : 1)
        if (!args) {
          return null
        }
        push(LINETO[upper](args, current, absolute))
      } while (isNumberNext())
    } else if (upper === 'Z') {
      closed = true
    } else {
      return null
    }
  }

  return { points, closed }
}

/** Points in shape-local coordinates (relative to the origin, implicit "M 0 0"). */
function parseRoomPath(path: string): Vec2[] | null {
  const parsed = parsePathPoints(path)
  if (!parsed || parsed.points.length < 3) {
    return null
  }
  const points = parsed.points
  const first = points[0]
  const last = points[points.length - 1]
  if (points.length > 3 && first[0] === last[0] && first[1] === last[1]) {
    points.pop()
  }
  return points
}

/** Open polyline (inner lines): at least two points, no implicit closing. */
export function parseOpenPath(path: string): Vec2[] | null {
  const parsed = parsePathPoints(path)
  if (!parsed || parsed.closed || parsed.points.length < 2) {
    return null
  }
  return parsed.points
}

function relativeSegments(points: Vec2[]): string[] {
  const parts: string[] = []
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i][0] - points[i - 1][0]
    const dy = points[i][1] - points[i - 1][1]
    if (dx === 0 && dy === 0) {
      continue
    }
    if (dy === 0) {
      parts.push(`h${formatPathNumber(dx)}`)
    } else if (dx === 0) {
      parts.push(`v${formatPathNumber(dy)}`)
    } else {
      parts.push(`l${formatPathNumber(dx)},${formatPathNumber(dy)}`)
    }
  }
  return parts
}

export function pointsToRelativePath(points: Vec2[]): string {
  const start = points[0]
  const prefix =
    start[0] !== 0 || start[1] !== 0
      ? [`M${formatPathNumber(start[0])},${formatPathNumber(start[1])}`]
      : []
  return [...prefix, ...relativeSegments(points), 'z'].join(' ')
}

/** Open path (inner lines, routes): explicit M to the first point, then h/v/l. */
export function pointsToOpenPath(points: Vec2[]): string {
  if (points.length === 0) {
    return ''
  }
  return [
    `M${formatPathNumber(points[0][0])},${formatPathNumber(points[0][1])}`,
    ...relativeSegments(points),
  ].join(' ')
}

const ABSOLUTE_START_RE = /^\s*M\s*(-?(?:\d*\.\d+|\d+))[\s,]+(-?(?:\d*\.\d+|\d+))([\s\S]*)$/

/**
 * Splits an absolute path (e.g. routes) into its leading "M x,y" and the rest.
 * `null` when the remainder contains further absolute commands — the path can
 * then not be translated through its start point alone.
 */
function splitAbsolutePath(path: string): { start: Vec2; rest: string } | null {
  const match = ABSOLUTE_START_RE.exec(path)
  if (!match || /[MLHVCSQTA]/.test(match[3])) {
    return null
  }
  return { start: [Number(match[1]), Number(match[2])], rest: match[3] }
}

/** Start point of an absolute path in world coordinates. */
export function absolutePathStart(path: string): Vec2 | null {
  return splitAbsolutePath(path)?.start ?? null
}

export function translateAbsolutePathStart(path: string, delta: Vec2): string | null {
  const parts = splitAbsolutePath(path)
  if (!parts) {
    return null
  }
  return `M${formatPathNumber(parts.start[0] + delta[0])},${formatPathNumber(parts.start[1] + delta[1])}${parts.rest}`
}

/** Vertices of a room shape in local coordinates; `rect` becomes 4 points. */
export function shapeToPoints(shape: RoomShape): Vec2[] | null {
  if ('rect' in shape) {
    const [width, height] = shape.rect
    return [
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
    ]
  }
  return parseRoomPath(shape.path)
}

export function pointsBounds(points: Vec2[]): Bounds {
  const min: Vec2 = [Infinity, Infinity]
  const max: Vec2 = [-Infinity, -Infinity]
  for (const [x, y] of points) {
    min[0] = Math.min(min[0], x)
    min[1] = Math.min(min[1], y)
    max[0] = Math.max(max[0], x)
    max[1] = Math.max(max[1], y)
  }
  return { min, max }
}

/** Vertices of a room in world coordinates (local points shifted by the origin). */
export function roomWorldPoints(room: Room): Vec2[] {
  const points = shapeToPoints(room.shape) ?? []
  return points.map(([x, y]): Vec2 => [x + room.shape.origin[0], y + room.shape.origin[1]])
}

export function roomsBounds(rooms: Room[]): Bounds | null {
  const worldPoints = rooms.flatMap(roomWorldPoints)
  return worldPoints.length > 0 ? pointsBounds(worldPoints) : null
}
