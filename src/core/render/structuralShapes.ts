import {
  BARRICADE_HATCH_SPACING,
  BARRICADE_OVERHANG,
  BARRICADE_PLANK_GAP,
  BARRICADE_PLANK_THICKNESS,
  CRAWL_BAR_SPACING,
  OBSTACLE_TOOTH_SPACING,
  SHUTTLE_BUTTON_BOX_RATIO,
  SHUTTLE_BUTTON_RADIUS_RATIO,
  SHUTTLE_CONSOLE_RATIO,
  SHUTTLE_DOT_RATIO,
  SHUTTLE_RAIL_RATIO,
  SHUTTLE_WALL_RATIO,
  STAIRS_RUNG_SPACING,
} from '../constants'
import type { Placement, StructuralKind } from '../model/types'

/**
 * Geometry building blocks of the placement markers (`ElementDefinition.render`).
 * All shapes are centered around the origin, main axis = x;
 * the orientation comes from the rotation of the placement.
 */

/**
 * Properties per structural kind: `resizable` allows `placement.size`;
 * `anchor: 'edge'` anchors the shape at the anchor edge (y=0) instead of centered;
 * `fill: 'element'` fills the body with `ElementDefinition.color`, so door/window
 * variants differ by data alone. `spawn-room` keeps a neutral floor because its
 * color is the enemy category accent; `shuttle` renders in a fixed palette and
 * uses its color only as accent.
 */
export const STRUCTURAL_META: Record<
  StructuralKind,
  { resizable: boolean; anchor: 'center' | 'edge'; fill: 'element' | 'neutral' }
> = {
  door: { resizable: true, anchor: 'center', fill: 'element' },
  'double-door': { resizable: true, anchor: 'center', fill: 'element' },
  'barricaded-door': { resizable: true, anchor: 'center', fill: 'element' },
  window: { resizable: true, anchor: 'center', fill: 'element' },
  'crawl-passage': { resizable: true, anchor: 'center', fill: 'element' },
  obstacle: { resizable: true, anchor: 'center', fill: 'element' },
  stairs: { resizable: true, anchor: 'center', fill: 'element' },
  'spawn-room': { resizable: false, anchor: 'edge', fill: 'neutral' },
  shuttle: { resizable: true, anchor: 'center', fill: 'neutral' },
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

/** Center mullion of a window, along the main axis. */
export function windowMullionPath(length: number): string {
  return `M${-length / 2},0 h${length}`
}

function plankTop(thickness: number): number {
  return -thickness / 2 - BARRICADE_PLANK_GAP - BARRICADE_PLANK_THICKNESS
}

/** Plank across the side the door cannot be opened from (flips with rotation). */
export function barricadePlankPath(length: number, thickness: number): string {
  const width = length + 2 * BARRICADE_OVERHANG
  return `M${-width / 2},${plankTop(thickness)} h${width} v${BARRICADE_PLANK_THICKNESS} h${-width} z`
}

/** Diagonal hatching inside the barricade plank (top-left to bottom-right). */
export function barricadeHatchPath(length: number, thickness: number): string {
  const width = length + 2 * BARRICADE_OVERHANG
  const top = plankTop(thickness)
  const count = Math.max(1, Math.floor(width / BARRICADE_HATCH_SPACING))
  return Array.from({ length: count }, (_, index) => {
    const x = -width / 2 + index * BARRICADE_HATCH_SPACING
    const slant = Math.min(BARRICADE_PLANK_THICKNESS, width / 2 - x)
    return `M${x},${top} l${slant},${slant}`
  }).join(' ')
}

/** Slanted bars of a crawl passage, spanning the full thickness. */
export function crawlBarsPath(length: number, thickness: number): string {
  const count = Math.max(1, Math.floor(length / CRAWL_BAR_SPACING))
  const slant = length / count
  return Array.from(
    { length: count },
    (_, index) => `M${-length / 2 + index * slant},${-thickness / 2} l${slant},${thickness}`,
  ).join(' ')
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

interface ShuttleGeometry {
  cellHeight: number
  railHeight: number
  wallWidth: number
  consoleWidth: number
  cellWidth: number
  leftCells: number
  consoleLeft: number
}

/** Shuttle gate: cells split by a middle console, capped by side walls and rails. */
function shuttleGeometry(length: number, thickness: number, cells: number): ShuttleGeometry {
  const cellHeight = thickness / (1 + 2 * SHUTTLE_RAIL_RATIO)
  const railHeight = cellHeight * SHUTTLE_RAIL_RATIO
  const wallWidth = cellHeight * SHUTTLE_WALL_RATIO
  const consoleWidth = cellHeight * SHUTTLE_CONSOLE_RATIO
  const cellWidth = Math.max((length - 2 * wallWidth - consoleWidth) / cells, 0)
  const leftCells = Math.ceil(cells / 2)
  const consoleLeft = -length / 2 + wallWidth + leftCells * cellWidth
  return { cellHeight, railHeight, wallWidth, consoleWidth, cellWidth, leftCells, consoleLeft }
}

/** Cells right of the console shift by its width. */
function shuttleCellCenter(geometry: ShuttleGeometry, length: number, index: number): number {
  const consoleOffset = index >= geometry.leftCells ? geometry.consoleWidth : 0
  return -length / 2 + geometry.wallWidth + (index + 0.5) * geometry.cellWidth + consoleOffset
}

function rectSubpath(x: number, y: number, width: number, height: number): string {
  return `M${x},${y} h${width} v${height} h${-width} z`
}

function circlePath(cx: number, cy: number, r: number): string {
  return `M${cx - r},${cy} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0 z`
}

/** Side walls, top/bottom rails and the console column, one layer. */
export function shuttleFramePath(length: number, thickness: number, cells: number): string {
  const geometry = shuttleGeometry(length, thickness, cells)
  const top = -thickness / 2
  const innerWidth = Math.max(length - 2 * geometry.wallWidth, 0)
  return [
    rectSubpath(-length / 2, top, geometry.wallWidth, thickness),
    rectSubpath(length / 2 - geometry.wallWidth, top, geometry.wallWidth, thickness),
    rectSubpath(-length / 2 + geometry.wallWidth, top, innerWidth, geometry.railHeight),
    rectSubpath(
      -length / 2 + geometry.wallWidth,
      thickness / 2 - geometry.railHeight,
      innerWidth,
      geometry.railHeight,
    ),
    rectSubpath(geometry.consoleLeft, top, geometry.consoleWidth, thickness),
  ].join(' ')
}

/** Vertical seams between adjacent cells inside each group (console boundary excluded). */
export function shuttleSeamsPath(length: number, thickness: number, cells: number): string {
  const geometry = shuttleGeometry(length, thickness, cells)
  if (geometry.cellWidth <= 0) {
    return ''
  }
  const segments: string[] = []
  for (let index = 1; index < cells; index += 1) {
    if (index === geometry.leftCells) {
      continue
    }
    const x = shuttleCellCenter(geometry, length, index) - geometry.cellWidth / 2
    segments.push(`M${x},${-geometry.cellHeight / 2} v${geometry.cellHeight}`)
  }
  return segments.join(' ')
}

/** One dot per cell, shown when the shuttle is enterable. */
export function shuttleDotsPath(length: number, thickness: number, cells: number): string {
  const geometry = shuttleGeometry(length, thickness, cells)
  const radius = Math.min(SHUTTLE_DOT_RATIO * geometry.cellHeight, geometry.cellWidth / 2)
  if (radius <= 0) {
    return ''
  }
  return Array.from({ length: cells }, (_, index) =>
    circlePath(shuttleCellCenter(geometry, length, index), 0, radius),
  ).join(' ')
}

/** Control box protruding in front of the gate, flush with the console column. */
export function shuttleButtonBoxPath(length: number, thickness: number, cells: number): string {
  const geometry = shuttleGeometry(length, thickness, cells)
  const boxHeight = geometry.cellHeight * SHUTTLE_BUTTON_BOX_RATIO
  return rectSubpath(geometry.consoleLeft, -thickness / 2 - boxHeight, geometry.consoleWidth, boxHeight)
}

/** Red button in the center of the control box. */
export function shuttleButtonPath(length: number, thickness: number, cells: number): string {
  const geometry = shuttleGeometry(length, thickness, cells)
  const boxHeight = geometry.cellHeight * SHUTTLE_BUTTON_BOX_RATIO
  const radius = geometry.cellHeight * SHUTTLE_BUTTON_RADIUS_RATIO
  return circlePath(
    geometry.consoleLeft + geometry.consoleWidth / 2,
    -thickness / 2 - boxHeight / 2,
    radius,
  )
}
