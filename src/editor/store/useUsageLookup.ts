import { loadMapDefinition, loadMapsIndex } from '../../core/model/dataSource'
import type { MapDefinition } from '../../core/model/types'
import { useEditorStore } from './editorStore'

/** Nutzung eines Bibliothekseintrags (Element/Zone) in einer Map. */
export interface UsageEntry {
  mapId: string
  mapName: string
  count: number
  /** True für die im Editor geöffnete Map (wird in-memory geprüft, nicht gefetcht). */
  isOpenDocument: boolean
}

/** Session-Cache: Fremde Maps ändern sich während einer Editor-Sitzung nicht. */
const mapCache = new Map<string, Promise<MapDefinition | null>>()

function fetchForeignMap(mapId: string): Promise<MapDefinition | null> {
  const cached = mapCache.get(mapId) ?? loadMapDefinition(mapId).catch(() => null)
  mapCache.set(mapId, cached)
  return cached
}

/**
 * Zählt Verwendungen über alle enabled Maps der Registry plus das offene
 * Dokument. Löschen ist blockiert, sobald eine fremde Map den Eintrag nutzt
 * (der Editor kann fremde map.json nicht mitschreiben — PR-Workflow).
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
