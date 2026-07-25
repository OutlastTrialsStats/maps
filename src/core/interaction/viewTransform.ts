import type { Vec2 } from '../model/types'

/** Central pan/zoom transform: world → screen is `p * k + [x, y]`. */
export interface ViewTransform {
  x: number
  y: number
  k: number
}

export const IDENTITY_TRANSFORM: ViewTransform = { x: 0, y: 0, k: 1 }

export function screenToWorld(point: Vec2, transform: ViewTransform): Vec2 {
  return [(point[0] - transform.x) / transform.k, (point[1] - transform.y) / transform.k]
}

export function worldToScreen(point: Vec2, transform: ViewTransform): Vec2 {
  return [point[0] * transform.k + transform.x, point[1] * transform.k + transform.y]
}
