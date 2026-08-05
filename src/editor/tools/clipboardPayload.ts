import type { HitTarget } from '../../core/interaction/hitTest'
import { absolutePathStart, pointsBounds, roomWorldPoints } from '../../core/model/roomPath'
import { isLineShape, shapeWorldPoints } from '../../core/model/shapes'
import type { MapShape, Placement, Room, RouteLine, TrialDocument, Vec2 } from '../../core/model/types'

export const CLIPBOARD_FORMAT = 'outlasttrials-maps/clipboard'
export const CLIPBOARD_PAYLOAD_VERSION = 2

/** Copied objects as they travel through the system clipboard (JSON text). */
export interface ClipboardPayload {
  format: string
  version: number
  mapId: string
  trialId: string
  /** Top-left corner of the copied group in source world coordinates. */
  anchor: Vec2
  rooms: Room[]
  placements: Placement[]
  routes: RouteLine[]
  shapes: MapShape[]
}

/** Group anchor: the paste offset is derived from it, so relative distances survive. */
function groupAnchor(
  rooms: Room[],
  placements: Placement[],
  routes: RouteLine[],
  shapes: MapShape[],
): Vec2 {
  const routeStarts = routes
    .map((route) => absolutePathStart(route.path))
    .filter((start): start is Vec2 => start !== null)
  const points: Vec2[] = [
    ...rooms.flatMap(roomWorldPoints),
    ...placements.map((placement) => placement.pos),
    ...routeStarts,
    ...shapes.flatMap(shapeWorldPoints),
  ]
  return points.length > 0 ? pointsBounds(points).min : [0, 0]
}

/**
 * The returned arrays alias the live document — callers serialize or clone
 * before holding on to the payload.
 */
export function buildClipboardPayload(
  doc: TrialDocument,
  targets: HitTarget[],
): ClipboardPayload | null {
  const ids = new Set(targets.map((target) => target.id))
  const rooms = doc.rooms.filter((room) => ids.has(room.id))
  const placements = doc.placements.filter((placement) => ids.has(placement.id))
  const routes = doc.routes.filter((route) => ids.has(route.id))
  const shapes = doc.shapes.filter((shape) => ids.has(shape.id))
  if (rooms.length === 0 && placements.length === 0 && routes.length === 0 && shapes.length === 0) {
    return null
  }
  return {
    format: CLIPBOARD_FORMAT,
    version: CLIPBOARD_PAYLOAD_VERSION,
    mapId: doc.mapId,
    trialId: doc.trialId,
    anchor: groupAnchor(rooms, placements, routes, shapes),
    rooms,
    placements,
    routes,
    shapes,
  }
}

function isVec2(value: unknown): value is Vec2 {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((entry) => typeof entry === 'number' && Number.isFinite(entry))
  )
}

/** The fields the paste dereferences — clipboard text is external input. */
function hasValidItems(payload: ClipboardPayload): boolean {
  return (
    payload.rooms.every((room) => isVec2(room.shape?.origin)) &&
    payload.placements.every((placement) => isVec2(placement.pos)) &&
    payload.routes.every((route) => typeof route.path === 'string') &&
    payload.shapes.every((shape) =>
      isLineShape(shape) ? typeof shape.path === 'string' : isVec2(shape.pos),
    )
  )
}

/** `null` for anything that is not our own payload — the browser then pastes as usual. */
export function parseClipboardPayload(text: string): ClipboardPayload | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return null
  }
  const candidate = parsed as Partial<ClipboardPayload> | null
  if (
    !candidate ||
    candidate.format !== CLIPBOARD_FORMAT ||
    candidate.version !== CLIPBOARD_PAYLOAD_VERSION ||
    !isVec2(candidate.anchor) ||
    !Array.isArray(candidate.rooms) ||
    !Array.isArray(candidate.placements) ||
    !Array.isArray(candidate.routes) ||
    !Array.isArray(candidate.shapes)
  ) {
    return null
  }
  const payload = candidate as ClipboardPayload
  return hasValidItems(payload) ? payload : null
}
