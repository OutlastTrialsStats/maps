// Explicit .ts extensions: scripts/validate-data.mjs loads this module via Node
// type stripping, and Node's ESM resolver has no extensionless lookup.
import { shapeToPoints } from './roomPath.ts'
import type {
  Contributors,
  ElementDefinition,
  ElementLibrary,
  MapManifest,
  MapsIndex,
  Placement,
  Room,
  TrialDocument,
  ZoneLibrary,
} from './types'
import { edgeLength, edgeSegments } from './wallGaps.ts'

/**
 * Reference rules the JSON schema cannot express (the structural check is done
 * by the schema). Runs in the browser (editor export/import) and in Node
 * (scripts/validate-data.mjs) — hence: no DOM/Vue imports, only erasable
 * TypeScript syntax.
 */

export interface ValidationIssue {
  path: string
  message: string
}

function checkUniqueIds(
  issues: ValidationIssue[],
  path: string,
  label: string,
  ids: Array<string | number>,
): void {
  const seen = new Set<string | number>()
  for (const id of ids) {
    if (seen.has(id)) {
      issues.push({ path, message: `duplicate ${label} id "${id}"` })
    }
    seen.add(id)
  }
}

export function collectLibraryIssues(library: ElementLibrary): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  checkUniqueIds(
    issues,
    'categories',
    'category',
    library.categories.map((category) => category.id),
  )
  checkUniqueIds(
    issues,
    'elements',
    'element',
    library.elements.map((element) => element.id),
  )
  const categoryIds = new Set(library.categories.map((category) => category.id))
  library.elements.forEach((element, index) => {
    if (!categoryIds.has(element.category)) {
      issues.push({
        path: `elements[${index}].category`,
        message: `unknown category "${element.category}"`,
      })
    }
  })
  return issues
}

export function collectZoneLibraryIssues(zones: ZoneLibrary): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  checkUniqueIds(
    issues,
    'zones',
    'zone',
    zones.zones.map((zone) => zone.id),
  )
  return issues
}

export function collectMapsIndexIssues(mapsIndex: MapsIndex): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  checkUniqueIds(
    issues,
    'maps',
    'map',
    mapsIndex.maps.map((entry) => entry.id),
  )
  return issues
}

/**
 * Checks of the contributor list (contributors.json). The link runs through the
 * name, so every entry must appear in `meta.authors` of the map it names.
 * Runs in CI only — the browser never knows all maps at once.
 */
export function collectContributorIssues(
  contributors: Contributors,
  authorsByMapId: ReadonlyMap<string, string[]>,
  knownMapIds: ReadonlySet<string>,
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  checkUniqueIds(
    issues,
    'contributors',
    'contributor',
    contributors.contributors.map((entry) => entry.name),
  )
  contributors.contributors.forEach((entry, index) => {
    entry.maps.forEach((mapId) => {
      const path = `contributors[${index}].maps`
      if (!knownMapIds.has(mapId)) {
        issues.push({ path, message: `unknown map "${mapId}"` })
        return
      }
      const authors = authorsByMapId.get(mapId)
      // Without a map.json (map not captured yet) there is nothing to reconcile here.
      if (authors && !authors.includes(entry.name)) {
        issues.push({
          path,
          message: `"${entry.name}" is not listed in meta.authors of map "${mapId}"`,
        })
      }
    })
  })
  return issues
}

function collectWallGapIssues(room: Room, roomPath: string): ValidationIssue[] {
  const gaps = room.wallGaps
  if (!gaps?.length) {
    return []
  }
  const points = shapeToPoints(room.shape)
  if (!points) {
    return [
      {
        path: `${roomPath}.wallGaps`,
        message: 'wall gaps need a parsable outline (only M/L/H/V/Z are supported)',
      },
    ]
  }
  const edges = edgeSegments(points)
  const issues: ValidationIssue[] = []
  gaps.forEach((gap, index) => {
    const path = `${roomPath}.wallGaps[${index}]`
    const edge = edges[gap.edge]
    if (!edge) {
      issues.push({ path, message: `unknown edge ${gap.edge} (outline has ${edges.length})` })
      return
    }
    if (gap.length <= 0) {
      issues.push({ path, message: 'length must be greater than 0' })
      return
    }
    const available = edgeLength(edge)
    if (gap.start < 0 || gap.start + gap.length > available) {
      issues.push({
        path,
        message: `gap ${gap.start}–${gap.start + gap.length} exceeds edge ${gap.edge} (length ${Math.round(available * 100) / 100})`,
      })
    }
  })
  return issues
}

export function collectManifestIssues(manifest: MapManifest): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  checkUniqueIds(issues, 'trials', 'trial', manifest.trials.map((trial) => trial.id))
  const defaultCount = manifest.trials.filter((trial) => trial.default).length
  if (defaultCount !== 1) {
    issues.push({
      path: 'trials',
      message: `exactly one trial must have "default": true (found ${defaultCount})`,
    })
  }
  return issues
}

/** Lookup sets shared by the per-entity collectors of `collectTrialLogicIssues`. */
interface TrialContext {
  floorIndexes: ReadonlySet<number>
  zoneIds: ReadonlySet<string>
  categoryIds: ReadonlySet<string>
  elementsById: ReadonlyMap<string, ElementDefinition>
  roomsById: ReadonlyMap<string, Room>
}

function collectRoomIssues(room: Room, index: number, context: TrialContext): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!context.floorIndexes.has(room.floor)) {
    issues.push({ path: `rooms[${index}].floor`, message: `unknown floor ${room.floor}` })
  }
  if (!context.zoneIds.has(room.zone)) {
    issues.push({ path: `rooms[${index}].zone`, message: `unknown zone "${room.zone}"` })
  }
  issues.push(...collectWallGapIssues(room, `rooms[${index}]`))
  return issues
}

function collectPlacementIssues(
  placement: Placement,
  index: number,
  context: TrialContext,
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const element = context.elementsById.get(placement.element)
  if (!element) {
    issues.push({
      path: `placements[${index}].element`,
      message: `unknown element "${placement.element}"`,
    })
  }
  if (placement.size !== undefined) {
    if (element && !element.render) {
      issues.push({
        path: `placements[${index}].size`,
        message: `"size" is only allowed on structural elements (element "${placement.element}" has none)`,
      })
    }
    if (placement.size.some((value) => value <= 0)) {
      issues.push({
        path: `placements[${index}].size`,
        message: 'size values must be greater than 0',
      })
    }
  }
  if (!context.floorIndexes.has(placement.floor)) {
    issues.push({
      path: `placements[${index}].floor`,
      message: `unknown floor ${placement.floor}`,
    })
  }
  if (placement.roomId !== undefined) {
    const room = context.roomsById.get(placement.roomId)
    if (!room) {
      issues.push({
        path: `placements[${index}].roomId`,
        message: `unknown room "${placement.roomId}"`,
      })
    } else if (room.floor !== placement.floor) {
      issues.push({
        path: `placements[${index}].roomId`,
        message: `placement is on floor ${placement.floor} but room "${room.id}" is on floor ${room.floor}`,
      })
    }
  }
  return issues
}

export function collectTrialLogicIssues(
  trial: TrialDocument,
  library: ElementLibrary | null,
  zones: ZoneLibrary | null,
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const context: TrialContext = {
    floorIndexes: new Set(trial.floors.map((floor) => floor.index)),
    zoneIds: new Set((zones?.zones ?? []).map((zone) => zone.id)),
    categoryIds: new Set((library?.categories ?? []).map((category) => category.id)),
    elementsById: new Map((library?.elements ?? []).map((element) => [element.id, element])),
    roomsById: new Map(trial.rooms.map((room) => [room.id, room])),
  }

  const uniqueIdChecks: Array<[string, string, Array<string | number>]> = [
    ['floors', 'floor', trial.floors.map((floor) => floor.index)],
    ['filters', 'filter', trial.filters.map((filter) => filter.id)],
    ['rooms', 'room', trial.rooms.map((room) => room.id)],
    ['placements', 'placement', trial.placements.map((placement) => placement.id)],
    ['routes', 'route', trial.routes.map((route) => route.id)],
  ]
  for (const [path, label, ids] of uniqueIdChecks) {
    checkUniqueIds(issues, path, label, ids)
  }

  trial.rooms.forEach((room, index) => issues.push(...collectRoomIssues(room, index, context)))
  trial.placements.forEach((placement, index) =>
    issues.push(...collectPlacementIssues(placement, index, context)),
  )
  trial.routes.forEach((route, index) => {
    if (!context.floorIndexes.has(route.floor)) {
      issues.push({ path: `routes[${index}].floor`, message: `unknown floor ${route.floor}` })
    }
  })
  trial.filters.forEach((filter, filterIndex) => {
    filter.categories.forEach((category) => {
      if (!context.categoryIds.has(category)) {
        issues.push({
          path: `filters[${filterIndex}].categories`,
          message: `unknown category "${category}"`,
        })
      }
    })
  })

  return issues
}
