import type { Vec2 } from './types'

export const distance = (a: Vec2, b: Vec2): number => Math.hypot(b[0] - a[0], b[1] - a[1])

export const midpoint = (a: Vec2, b: Vec2): Vec2 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]

export const withinRadius = (a: Vec2, b: Vec2, radius: number): boolean =>
  distance(a, b) <= radius

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)
