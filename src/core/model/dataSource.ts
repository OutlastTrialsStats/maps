import {
  CONTRIBUTORS_URL,
  DATA_BASE_URL,
  ELEMENT_LIBRARY_URL,
  GAME_ASSETS_BASE_URL,
  ICON_FILE_EXTENSION,
  MAPS_INDEX_URL,
  ZONE_LIBRARY_URL,
} from '../constants'
import { mapManifestPath, trialDocumentPath } from './dataPaths'
import type {
  Contributors,
  ElementLibrary,
  MapManifest,
  MapsIndex,
  TrialDocument,
  ZoneLibrary,
} from './types'

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${url}: HTTP ${response.status}`)
  }
  return (await response.json()) as T
}

export function loadMapsIndex(): Promise<MapsIndex> {
  return fetchJson<MapsIndex>(MAPS_INDEX_URL)
}

export function loadElementLibrary(): Promise<ElementLibrary> {
  return fetchJson<ElementLibrary>(ELEMENT_LIBRARY_URL)
}

export function loadZoneLibrary(): Promise<ZoneLibrary> {
  return fetchJson<ZoneLibrary>(ZONE_LIBRARY_URL)
}

export function loadContributors(): Promise<Contributors> {
  return fetchJson<Contributors>(CONTRIBUTORS_URL)
}

export function loadMapManifest(mapId: string): Promise<MapManifest> {
  return fetchJson<MapManifest>(`${DATA_BASE_URL}/${mapManifestPath(mapId)}`)
}

export function loadTrialDocument(mapId: string, trialId: string): Promise<TrialDocument> {
  return fetchJson<TrialDocument>(`${DATA_BASE_URL}/${trialDocumentPath(mapId, trialId)}`)
}

export function mapAssetUrl(mapId: string, relativePath: string): string {
  return `${DATA_BASE_URL}/maps/${mapId}/${relativePath}`
}

/** Full URL of a game image whose file name alone is stored in the data. */
export function gameAssetUrl(filename: string): string {
  return `${GAME_ASSETS_BASE_URL}/${filename}`
}

/** Full icon URL of an element; undefined when the element has no icon. */
export function elementIconUrl(icon: string | undefined): string | undefined {
  return icon ? gameAssetUrl(`${icon}${ICON_FILE_EXTENSION}`) : undefined
}

/** Reduces a pasted full icon URL back to the bare file name; other input is returned unchanged. */
export function toIconFileName(value: string): string {
  const withoutHost = value.startsWith(`${GAME_ASSETS_BASE_URL}/`)
    ? value.slice(GAME_ASSETS_BASE_URL.length + 1)
    : value
  return withoutHost.endsWith(ICON_FILE_EXTENSION)
    ? withoutHost.slice(0, -ICON_FILE_EXTENSION.length)
    : withoutHost
}
