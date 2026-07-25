import type { Vec2 } from '../model/types'

export function snapToGrid(point: Vec2, step: number): Vec2 {
  return [Math.round(point[0] / step) * step, Math.round(point[1] / step) * step]
}

/** Rastet auf die dominante Achse relativ zum Ankerpunkt — für orthogonales Zeichnen. */
export function snapOrtho(anchor: Vec2, point: Vec2): Vec2 {
  const dx = point[0] - anchor[0]
  const dy = point[1] - anchor[1]
  return Math.abs(dx) >= Math.abs(dy) ? [point[0], anchor[1]] : [anchor[0], point[1]]
}
