import { loadMapDefinition, loadMapsIndex } from '../../core/model/dataSource'
import type { MapDefinition } from '../../core/model/types'
import { useEditorStore } from './editorStore'

/** Usage of a library entry (element/zone) in one map. */
export interface UsageEntry {
  mapId: string
  mapName: string
  count: number
  /** True for the map open in the editor (checked in memory, not fetched). */
  isOpenDocument: boolean
}

/** Session cache: foreign maps do not change during an editor session. */
const mapCache = new Map<string, Promise<MapDefinition | null>>()

function fetchForeignMap(mapId: string): Promise<MapDefinition | null> {
  const cached = mapCache.get(mapId) ?? loadMapDefinition(mapId).catch(() => null)
  mapCache.set(mapId, cached)
  return cached
}

/**
 * Counts usages across all enabled maps of the registry plus the open document.
 * Deleting is blocked as soon as a foreign map uses the entry (the editor
 * cannot write foreign map.json files — PR workflow).
 */
export function useUsageLookup() {
  const store = useEditorStore()

  async function collectUsage(count: (map: MapDefinition) => number): Promise<UsageEntry[]> {
    const openDocument = store.document
    const entries: UsageEntry[] = []
    if (openDocument) {
      entries.push({
        mapId: openDocument.id,
        mapName: openDocument.meta.name,
        count: count(openDocument),
        isOpenDocument: true,
      })
    }
    const { maps } = await loadMapsIndex()
    const foreign = maps.filter((entry) => entry.enabled && entry.id !== openDocument?.id)
    const definitions = await Promise.all(foreign.map((entry) => fetchForeignMap(entry.id)))
    foreign.forEach((entry, index) => {
      const definition = definitions[index]
      if (definition) {
        entries.push({
          mapId: entry.id,
          mapName: entry.name,
          count: count(definition),
          isOpenDocument: false,
        })
      }
    })
    return entries.filter((entry) => entry.count > 0)
  }

  function collectElementUsage(elementId: string): Promise<UsageEntry[]> {
    return collectUsage(
      (map) => map.placements.filter((placement) => placement.element === elementId).length,
    )
  }

  function collectZoneUsage(zoneId: string): Promise<UsageEntry[]> {
    return collectUsage((map) => map.rooms.filter((room) => room.zone === zoneId).length)
  }

  return { collectElementUsage, collectZoneUsage }
}

export function isDeleteBlocked(usage: UsageEntry[]): boolean {
  return usage.some((entry) => !entry.isOpenDocument && entry.count > 0)
}
