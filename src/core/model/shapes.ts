import { openPathPoints, translateAbsolutePathStart } from './roomPath'
import type { MapShape, Vec2 } from './types'

export function isCircleShape(shape: MapShape): shape is Extract<MapShape, { radius: number }> {
  return 'radius' in shape
}

export function isRectShape(shape: MapShape): shape is Extract<MapShape, { size: Vec2 }> {
  return 'size' in shape
}

export function isLineShape(shape: MapShape): shape is Extract<MapShape, { path: string }> {
  return 'path' in shape
}

/**
 * Characteristic points in world coordinates: circle extremes, rotated rect
 * corners, polyline vertices.
 */
export function shapeWorldPoints(shape: MapShape): Vec2[] {
  if (isCircleShape(shape)) {
    const [x, y] = shape.pos
    const r = shape.radius
    return [
      [x - r, y],
      [x + r, y],
      [x, y - r],
      [x, y + r],
    ]
  }
  if (isRectShape(shape)) {
    const [cx, cy] = shape.pos
    const [hw, hh] = [shape.size[0] / 2, shape.size[1] / 2]
    const angle = ((shape.rotation ?? 0) * Math.PI) / 180
    const [cos, sin] = [Math.cos(angle), Math.sin(angle)]
    const corners: Vec2[] = [
      [-hw, -hh],
      [hw, -hh],
      [hw, hh],
      [-hw, hh],
    ]
    return corners.map(([x, y]): Vec2 => [cx + x * cos - y * sin, cy + x * sin + y * cos])
  }
  return openPathPoints(shape.path)
}

export function translateShape(shape: MapShape, delta: Vec2): void {
  if (isLineShape(shape)) {
    shape.path = translateAbsolutePathStart(shape.path, delta) ?? shape.path
    return
  }
  shape.pos = [shape.pos[0] + delta[0], shape.pos[1] + delta[1]]
}
