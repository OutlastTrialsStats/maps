import type { Placement, StructuralKind } from '../model/types'

/**
 * Geometrie-Bausteine der Platzierungs-Marker (`ElementDefinition.render`).
 * Alle Formen liegen zentriert um den Ursprung, Hauptachse = x;
 * die Ausrichtung übernimmt die Rotation der Platzierung.
 */

/** Abstand der Stufen-Querlinien bei Treppen, in Map-Units. */
const STAIRS_RUNG_SPACING = 3
/** Abstand der Zacken auf Überwindungen, in Map-Units. */
const OBSTACLE_TOOTH_SPACING = 2.5

/**
 * Eigenschaften je Struktur-Kind: `resizable` erlaubt `placement.size`;
 * `anchor: 'edge'` verankert die Form an der Ankerkante (y=0) statt zentriert.
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

/** Mittelfuge einer Doppeltür, quer zur Hauptachse. */
export function doorSeamPath(thickness: number): string {
  return `M0,${-thickness / 2} v${thickness}`
}

/** Zackenreihe entlang der oberen Langkante (Überwindung). */
export function obstacleTeethPath(length: number, thickness: number): string {
  const toothDepth = thickness * 0.3
  const toothWidth = OBSTACLE_TOOTH_SPACING * 0.45
  const segments: string[] = []
  for (let x = -length / 2 + toothWidth; x + toothWidth <= length / 2; x += OBSTACLE_TOOTH_SPACING) {
    segments.push(`M${x},${-thickness / 2} h${toothWidth} v${toothDepth} h${-toothWidth} z`)
  }
  return segments.join(' ')
}

/** Zwei Chevron-Pfeile quer zur Hauptachse (Überwindungsrichtung). */
export function obstacleChevronsPath(length: number, thickness: number): string {
  const spread = length * 0.18
  const halfWidth = Math.min(2, length * 0.08)
  const top = -thickness * 0.2
  const bottom = thickness * 0.3
  const chevron = (cx: number): string =>
    `M${cx - halfWidth},${top} L${cx},${bottom} L${cx + halfWidth},${top}`
  return `${chevron(-spread)} ${chevron(spread)}`
}

/** Stufen-Querlinien einer Treppe. */
export function stairsRungsPath(length: number, thickness: number): string {
  const segments: string[] = []
  for (let x = -length / 2 + STAIRS_RUNG_SPACING; x < length / 2; x += STAIRS_RUNG_SPACING) {
    segments.push(`M${x},${-thickness / 2} v${thickness}`)
  }
  return segments.join(' ')
}

/** Richtungs-Chevron einer Treppe entlang der Hauptachse (`ascending: false` → Gegenrichtung). */
export function stairsArrowPath(length: number, thickness: number, ascending: boolean): string {
  const sign = ascending ? 1 : -1
  const tip = sign * (length / 2 + thickness * 0.6)
  const base = sign * (length / 2 + 0.5)
  const halfSpan = thickness * 0.4
  return `M${base},${-halfSpan} L${tip},0 L${base},${halfSpan}`
}

/**
 * Boden eines Spawn-Raums: Rechteck oberhalb des Ankerpunkts, offene Seite
 * bei y=0 zeigt zum Raum, an dessen Wand der Stub sitzt.
 */
export function spawnRoomFloorPath(width: number, depth: number): string {
  return `M${-width / 2},0 v${-depth} h${width} v${depth} z`
}

/** U-förmiger Wandzug des Spawn-Raums (offene Seite bei y=0). */
export function spawnRoomWallPath(width: number, depth: number): string {
  return `M${-width / 2},0 v${-depth} h${width} v${depth}`
}
