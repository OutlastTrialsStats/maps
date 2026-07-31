/**
 * Layout of a map's files relative to the data root — the single source for
 * fetch URLs, export repo paths and the CI script. Import-free on purpose:
 * scripts/validate-data.mjs loads it via Node type stripping.
 */

export function mapManifestPath(mapId: string): string {
  return `maps/${mapId}/map.json`
}

export function trialDocumentPath(mapId: string, trialId: string): string {
  return `maps/${mapId}/trials/${trialId}.json`
}
