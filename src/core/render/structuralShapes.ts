import type { Placement, StructuralKind } from '../model/types'

/**
 * Geometry building blocks of the placement markers (`ElementDefinition.render`).
 * All shapes are centered around the origin, main axis = x;
 * the orientation comes from the rotation of the placement.
 */

/** Spacing of the step rungs on stairs, in map units. */
const STAIRS_RUNG_SPACING = 3
/** Spacing of the teeth on obstacles, in map units. */
const OBSTACLE_TOOTH_SPACING = 2.5

/**
 * Properties per structural kind: `resizable` allows `placement.size`;
 * `anchor: 'edge'` anchors the shape at the anchor edge (y=0) instead of centered.
 */
export const STRUCTURAL_META: Record<StructuralKind, { resizable: boolean; anchor: 'center' | 'edge' }> = {
  door: { resizable: true, anchor: 'center' },
  'double-door': { resizable: true, anchor: 'center' },
  obstacle: { resizable: true, anchor: 'center' },
  stairs: { resizable: true, anchor: 'center' },
  'spawn-room': { resizable: false, anchor: 'edge' },
}

export function placementTransform(placement: Placement): string {
  const [x, y] = placement.pos
  const rotation = placement.rotation ?? 0
  return rotation ? `translate(${x},${y}) rotate(${rotation})` : `translate(${x},${y})`
}

export function centeredRectPath(length: number, thickness: number): string {
  return `M${-length / 2},${-thickness / 2} h${length} v${thickness} h${-length} z`
}

/** Center seam of a double door, across the main axis. */
export function doorSeamPath(thickness: number): string {
  return `M0,${-thickness / 2} v${thickness}`
}

/** Row of teeth along the upper long edge (obstacle). */
export function obstacleTeethPath(length: number, thickness: number): string {
  const toothDepth = thickness * 0.3
  const toothWidth = OBSTACLE_TOOTH_SPACING * 0.45
  const segments: string[] = []
  for (let x = -length / 2 + toothWidth; x + toothWidth <= length / 2; x += OBSTACLE_TOOTH_SPACING) {
    segments.push(`M${x},${-thickness / 2} h${toothWidth} v${toothDepth} h${-toothWidth} z`)
  }
  return segments.join(' ')
}

/** Two chevron arrows across the main axis (direction to climb over). */
export function obstacleChevronsPath(length: number, thickness: number): string {
  const spread = length * 0.18
  const halfWidth = Math.min(2, length * 0.08)
  const top = -thickness * 0.2
  const bottom = thickness * 0.3
  const chevron = (cx: number): string =>
    `M${cx - halfWidth},${top} L${cx},${bottom} L${cx + halfWidth},${top}`
  return `${chevron(-spread)} ${chevron(spread)}`
}

/** Step rungs of a staircase. */
export function stairsRungsPath(length: number, thickness: number): string {
  const segments: string[] = []
  for (let x = -length / 2 + STAIRS_RUNG_SPACING; x < length / 2; x += STAIRS_RUNG_SPACING) {
    segments.push(`M${x},${-thickness / 2} v${thickness}`)
  }
  return segments.join(' ')
}

/** Direction chevron of a staircase along the main axis (`ascending: false` → opposite direction). */
export function stairsArrowPath(length: number, thickness: number, ascending: boolean): string {
  const sign = ascending ? 1 : -1
  const tip = sign * (length / 2 + thickness * 0.6)
  const base = sign * (length / 2 + 0.5)
  const halfSpan = thickness * 0.4
  return `M${base},${-halfSpan} L${tip},0 L${base},${halfSpan}`
}

/**
 * Floor of a spawn room: rectangle above the anchor, the open side at y=0
 * faces the room on whose wall the stub sits.
 */
export function spawnRoomFloorPath(width: number, depth: number): string {
  return `M${-width / 2},0 v${-depth} h${width} v${depth} z`
}

/** U-shaped wall run of the spawn room (open side at y=0). */
export function spawnRoomWallPath(width: number, depth: number): string {
  return `M${-width / 2},0 v${-depth} h${width} v${depth}`
}
