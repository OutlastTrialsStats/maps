import { loadMapManifest, loadMapsIndex, loadTrialDocument } from '../../core/model/dataSource'
import type { TrialDocument } from '../../core/model/types'
import { useEditorStore } from './editorStore'

/** Usage of a library entry (element/zone) in one trial file. */
export interface UsageEntry {
  mapId: string
  mapName: string
  trialId: string
  count: number
  /** True for the trial open in the editor (checked in memory, not fetched). */
  isOpenDocument: boolean
}

/** Session cache: repo trial files do not change during an editor session. */
const trialsCache = new Map<string, Promise<TrialDocument[]>>()

function fetchMapTrials(mapId: string): Promise<TrialDocument[]> {
  const cached = trialsCache.get(mapId) ?? loadAllTrials(mapId)
  trialsCache.set(mapId, cached)
  return cached
}

async function loadAllTrials(mapId: string): Promise<TrialDocument[]> {
  try {
    const manifest = await loadMapManifest(mapId)
    const trials = await Promise.all(
      manifest.trials.map((trial) => loadTrialDocument(mapId, trial.id).catch(() => null)),
    )
    return trials.filter((trial): trial is TrialDocument => trial !== null)
  } catch {
    return []
  }
}

/**
 * Counts usages across all trial files of the enabled maps plus the open
 * document. Deleting is blocked as soon as any trial file the editor cannot
 * write uses the entry — including the open map's other trials (PR workflow).
 */
export function useUsageLookup() {
  const store = useEditorStore()

  async function collectUsage(count: (trial: TrialDocument) => number): Promise<UsageEntry[]> {
    const openDocument = store.document
    const entries: UsageEntry[] = []
    if (openDocument) {
      entries.push({
        mapId: openDocument.mapId,
        mapName: store.manifest?.meta.name ?? openDocument.mapId,
        trialId: openDocument.trialId,
        count: count(openDocument),
        isOpenDocument: true,
      })
    }
    const { maps } = await loadMapsIndex()
    const enabled = maps.filter((entry) => entry.enabled)
    const trialsPerMap = await Promise.all(enabled.map((entry) => fetchMapTrials(entry.id)))
    enabled.forEach((entry, index) => {
      for (const trial of trialsPerMap[index] ?? []) {
        // The open trial is judged from memory above, not from the repo state.
        if (trial.mapId === openDocument?.mapId && trial.trialId === openDocument.trialId) {
          continue
        }
        entries.push({
          mapId: entry.id,
          mapName: entry.name,
          trialId: trial.trialId,
          count: count(trial),
          isOpenDocument: false,
        })
      }
    })
    return entries.filter((entry) => entry.count > 0)
  }

  function collectElementUsage(elementId: string): Promise<UsageEntry[]> {
    return collectUsage(
      (trial) => trial.placements.filter((placement) => placement.element === elementId).length,
    )
  }

  function collectZoneUsage(zoneId: string): Promise<UsageEntry[]> {
    return collectUsage((trial) => trial.rooms.filter((room) => room.zone === zoneId).length)
  }

  return { collectElementUsage, collectZoneUsage }
}

export function isDeleteBlocked(usage: UsageEntry[]): boolean {
  return usage.some((entry) => !entry.isOpenDocument && entry.count > 0)
}
