import type { Contributors, ElementLibrary, MapManifest, TrialDocument, ZoneLibrary } from './types'

/**
 * Logic rules from docs/02-datenmodell.md §5 — the structural check is done by
 * the JSON schema (including the path character set), the reference rules live here.
 * Runs in the browser (editor export/import) and in Node (scripts/validate-data.mjs)
 * — hence: no DOM/Vue imports, only erasable TypeScript syntax.
 */

export interface ValidationIssue {
  path: string
  message: string
}

export function checkUniqueIds(
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

export function collectTrialLogicIssues(
  trial: TrialDocument,
  library: ElementLibrary | null,
  zones: ZoneLibrary | null,
): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  const floorIndexes = new Set(trial.floors.map((floor) => floor.index))
  const zoneIds = new Set((zones?.zones ?? []).map((zone) => zone.id))
  const categoryIds = new Set((library?.categories ?? []).map((category) => category.id))
  const elementsById = new Map((library?.elements ?? []).map((element) => [element.id, element]))
  const roomsById = new Map(trial.rooms.map((room) => [room.id, room]))

  checkUniqueIds(issues, 'floors', 'floor', trial.floors.map((floor) => floor.index))
  checkUniqueIds(issues, 'filters', 'filter', trial.filters.map((filter) => filter.id))
  checkUniqueIds(issues, 'rooms', 'room', trial.rooms.map((room) => room.id))
  checkUniqueIds(issues, 'placements', 'placement', trial.placements.map((p) => p.id))
  checkUniqueIds(issues, 'routes', 'route', trial.routes.map((route) => route.id))

  trial.rooms.forEach((room, index) => {
    if (!floorIndexes.has(room.floor)) {
      issues.push({ path: `rooms[${index}].floor`, message: `unknown floor ${room.floor}` })
    }
    if (!zoneIds.has(room.zone)) {
      issues.push({ path: `rooms[${index}].zone`, message: `unknown zone "${room.zone}"` })
    }
  })

  trial.placements.forEach((placement, index) => {
    const element = elementsById.get(placement.element)
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
    if (!floorIndexes.has(placement.floor)) {
      issues.push({
        path: `placements[${index}].floor`,
        message: `unknown floor ${placement.floor}`,
      })
    }
    if (placement.roomId !== undefined) {
      const room = roomsById.get(placement.roomId)
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
  })

  trial.routes.forEach((route, index) => {
    if (!floorIndexes.has(route.floor)) {
      issues.push({ path: `routes[${index}].floor`, message: `unknown floor ${route.floor}` })
    }
  })

  trial.filters.forEach((filter, filterIndex) => {
    filter.categories.forEach((category) => {
      if (!categoryIds.has(category)) {
        issues.push({
          path: `filters[${filterIndex}].categories`,
          message: `unknown category "${category}"`,
        })
      }
    })
  })

  return issues
}
