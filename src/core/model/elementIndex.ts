import type { ElementDefinition, ElementLibrary, Zone, ZoneLibrary } from './types'

export type ElementIndex = Map<string, ElementDefinition>

export function buildElementIndex(library: ElementLibrary | null): ElementIndex {
  return new Map((library?.elements ?? []).map((def) => [def.id, def]))
}

export function buildZoneIndex(library: ZoneLibrary | null): ReadonlyMap<string, Zone> {
  return new Map((library?.zones ?? []).map((zone) => [zone.id, zone]))
}
