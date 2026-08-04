/**
 * Layout of the data files relative to the data root — the single source for
 * fetch URLs, export repo paths and the CI script. Import-free on purpose:
 * scripts/validate-data.mjs loads it via Node type stripping.
 */

export const MAPS_INDEX_PATH = 'maps/index.json'
export const ELEMENT_LIBRARY_PATH = 'elements.json'
export const ZONE_LIBRARY_PATH = 'zones.json'
export const CONTRIBUTORS_PATH = 'contributors.json'
export const MAP_MANIFEST_FILENAME = 'map.json'

export function mapManifestPath(mapId: string): string {
  return `maps/${mapId}/${MAP_MANIFEST_FILENAME}`
}

export function trialsDirPath(mapId: string): string {
  return `maps/${mapId}/trials`
}

export function trialDocumentPath(mapId: string, trialId: string): string {
  return `${trialsDirPath(mapId)}/${trialId}.json`
}
