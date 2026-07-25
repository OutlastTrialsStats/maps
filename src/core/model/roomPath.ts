import type { Room, RoomShape, Vec2 } from './types'

/**
 * Minimal path parser for room outlines (docs/03 §7: paths are only parsed for
 * editing in the editor and for validation). Supports exactly the commands the
 * editor emits itself: M/m, L/l, H/h, V/v, Z/z — a single subpath.
 * Curves etc. return `null` (vertex editing is then disabled).
 */

const COMMAND_RE = /^[A-Za-z]$/
const TOKEN_RE = /[A-Za-z]|-?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/g
const CHARSET_RE = /^[MmLlHhVvZz0-9eE+,.\s-]*$/

const fmt = (value: number): string => String(Math.round(value * 1000) / 1000)

/** Points in shape-local coordinates (relative to the origin, implicit "M 0 0"). */
export function parseRoomPath(path: string): Vec2[] | null {
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
  const nextNumber = (): number | null => {
    if (!isNumberNext()) {
      return null
    }
    const value = Number(tokens[index])
    index += 1
    return Number.isFinite(value) ? value : null
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
    switch (command) {
      case 'M':
      case 'm': {
        if (started) {
          return null
        }
        const x = nextNumber()
        const y = nextNumber()
        if (x === null || y === null) {
          return null
        }
        current = command === 'M' ? [x, y] : [current[0] + x, current[1] + y]
        points[0] = current
        while (isNumberNext()) {
          const lx = nextNumber()
          const ly = nextNumber()
          if (lx === null || ly === null) {
            return null
          }
          push(command === 'M' ? [lx, ly] : [current[0] + lx, current[1] + ly])
        }
        break
      }
      case 'L':
      case 'l': {
        do {
          const x = nextNumber()
          const y = nextNumber()
          if (x === null || y === null) {
            return null
          }
          push(command === 'L' ? [x, y] : [current[0] + x, current[1] + y])
        } while (isNumberNext())
        break
      }
      case 'H':
      case 'h': {
        do {
          const x = nextNumber()
          if (x === null) {
            return null
          }
          push(command === 'H' ? [x, current[1]] : [current[0] + x, current[1]])
        } while (isNumberNext())
        break
      }
      case 'V':
      case 'v': {
        do {
          const y = nextNumber()
          if (y === null) {
            return null
          }
          push(command === 'V' ? [current[0], y] : [current[0], current[1] + y])
        } while (isNumberNext())
        break
      }
      case 'Z':
      case 'z':
        closed = true
        break
      default:
        return null
    }
  }

  if (points.length < 3) {
    return null
  }
  const first = points[0]
  const last = points[points.length - 1]
  if (points.length > 3 && first[0] === last[0] && first[1] === last[1]) {
    points.pop()
  }
  return points
}

function appendRelativeSegments(parts: string[], points: Vec2[]): void {
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i][0] - points[i - 1][0]
    const dy = points[i][1] - points[i - 1][1]
    if (dx === 0 && dy === 0) {
      continue
    }
    if (dy === 0) {
      parts.push(`h${fmt(dx)}`)
    } else if (dx === 0) {
      parts.push(`v${fmt(dy)}`)
    } else {
      parts.push(`l${fmt(dx)},${fmt(dy)}`)
    }
  }
}

export function pointsToRelativePath(points: Vec2[]): string {
  const parts: string[] = []
  const start = points[0]
  if (start[0] !== 0 || start[1] !== 0) {
    parts.push(`M${fmt(start[0])},${fmt(start[1])}`)
  }
  appendRelativeSegments(parts, points)
  parts.push('z')
  return parts.join(' ')
}

/** Open path (inner lines, routes): explicit M to the first point, then h/v/l. */
export function pointsToOpenPath(points: Vec2[]): string {
  if (points.length === 0) {
    return ''
  }
  const parts: string[] = [`M${fmt(points[0][0])},${fmt(points[0][1])}`]
  appendRelativeSegments(parts, points)
  return parts.join(' ')
}

/**
 * Translates an absolute path (e.g. routes) through its leading "M x,y".
 * Returns `null` when the remainder contains further absolute commands and the
 * translation is therefore not possible through the start point alone.
 */
export function translateAbsolutePathStart(path: string, delta: Vec2): string | null {
  const match = /^\s*M\s*(-?(?:\d*\.\d+|\d+))[\s,]+(-?(?:\d*\.\d+|\d+))([\s\S]*)$/.exec(path)
  if (!match || /[MLHVCSQTA]/.test(match[3])) {
    return null
  }
  const x = Number(match[1]) + delta[0]
  const y = Number(match[2]) + delta[1]
  return `M${fmt(x)},${fmt(y)}${match[3]}`
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

export function pointsBounds(points: Vec2[]): { min: Vec2; max: Vec2 } {
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

export function roomsBounds(rooms: Room[]): { min: Vec2; max: Vec2 } | null {
  const worldPoints = rooms.flatMap((room) => {
    const points = shapeToPoints(room.shape) ?? []
    return points.map(([x, y]): Vec2 => [x + room.shape.origin[0], y + room.shape.origin[1]])
  })
  return worldPoints.length > 0 ? pointsBounds(worldPoints) : null
}
