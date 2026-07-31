import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { buildContributorIndex } from '../../core/model/contributorIndex'
import {
  loadContributors,
  loadElementLibrary,
  loadMapManifest,
  loadMapsIndex,
  loadTrialDocument,
  loadZoneLibrary,
} from '../../core/model/dataSource'
import { buildElementIndex, buildZoneIndex } from '../../core/model/elementIndex'
import { defaultTrialId, initialFloorIndex } from '../../core/model/mapDefaults'
import type {
  Contributors,
  ElementLibrary,
  MapManifest,
  Room,
  TrialDocument,
  ZoneLibrary,
} from '../../core/model/types'
import { collectTrialLogicIssues } from '../../core/model/validation'

export const useViewerStore = defineStore('viewer', () => {
  const manifest = ref<MapManifest | null>(null)
  const trial = ref<TrialDocument | null>(null)
  const library = ref<ElementLibrary | null>(null)
  const zones = ref<ZoneLibrary | null>(null)
  const contributors = ref<Contributors | null>(null)
  const loading = ref(false)
  const loadError = ref('')
  const activeTrialId = ref('')
  const activeFloor = ref(0)
  const disabledFilterIds = ref<ReadonlySet<string>>(new Set())
  const selectedRoomId = ref<string | null>(null)
  const panelOpen = ref(true)
  const backgroundUrl = ref('')
  /** Trial documents already fetched for the open map (cleared on map change). */
  const trialCache = new Map<string, TrialDocument>()

  const trials = computed(() => manifest.value?.trials ?? [])
  const filters = computed(() => trial.value?.filters ?? [])
  const floorsTopDown = computed(() =>
    [...(trial.value?.floors ?? [])].sort((a, b) => b.index - a.index),
  )
  const activeFloorName = computed(
    () => trial.value?.floors.find((floor) => floor.index === activeFloor.value)?.name ?? '',
  )
  const elementIndex = computed(() => buildElementIndex(library.value))
  const zonesById = computed(() => buildZoneIndex(zones.value))
  /** Authors of the open map, with a profile link where possible (contributors.json). */
  const credits = computed(() => {
    const byName = buildContributorIndex(contributors.value)
    return (manifest.value?.meta.authors ?? []).map((name) => ({
      name,
      profileUrl: byName.get(name)?.profileUrl,
    }))
  })
  const selectedRoom = computed<Room | null>(
    () => trial.value?.rooms.find((room) => room.id === selectedRoomId.value) ?? null,
  )
  const hiddenCategories = computed(() => {
    const hidden = new Set<string>()
    for (const filter of filters.value) {
      if (disabledFilterIds.value.has(filter.id)) {
        for (const category of filter.categories) {
          hidden.add(category)
        }
      }
    }
    return hidden
  })

  async function loadMap(mapId: string, initialTrialId?: string): Promise<void> {
    loading.value = true
    loadError.value = ''
    manifest.value = null
    trial.value = null
    selectedRoomId.value = null
    trialCache.clear()
    void loadBackground(mapId)
    void loadCredits()
    try {
      // The trial fetch only depends on the manifest — chain it there instead of
      // waiting for the library/zones fetches.
      const [[loadedManifest, trialId, document], loadedLibrary, loadedZones] = await Promise.all([
        loadMapManifest(mapId).then(async (loaded) => {
          const requested = loaded.trials.some((entry) => entry.id === initialTrialId)
            ? initialTrialId
            : undefined
          const id = requested ?? defaultTrialId(loaded.trials) ?? ''
          return [loaded, id, await fetchTrial(mapId, id)] as const
        }),
        library.value ?? loadElementLibrary(),
        zones.value ?? loadZoneLibrary(),
      ])
      library.value = loadedLibrary
      zones.value = loadedZones
      manifest.value = loadedManifest
      trial.value = document
      activeTrialId.value = trialId
      activeFloor.value = initialFloorIndex(document.floors)
      disabledFilterIds.value = new Set(
        document.filters.filter((filter) => filter.default === false).map((filter) => filter.id),
      )
      warnAboutLogicIssues(document, loadedLibrary, loadedZones)
    } catch (error) {
      loadError.value = String(error)
    } finally {
      loading.value = false
    }
  }

  /** Trial switch = fetch of the trial file; floor and filter state carry over where possible. */
  async function setActiveTrial(trialId: string): Promise<void> {
    const mapId = manifest.value?.id
    if (!mapId || trialId === activeTrialId.value) {
      return
    }
    loadError.value = ''
    try {
      const document = await fetchTrial(mapId, trialId)
      trial.value = document
      activeTrialId.value = trialId
      if (!document.floors.some((floor) => floor.index === activeFloor.value)) {
        activeFloor.value = initialFloorIndex(document.floors)
      }
      const filterIds = new Set(document.filters.map((filter) => filter.id))
      disabledFilterIds.value = new Set(
        [...disabledFilterIds.value].filter((id) => filterIds.has(id)),
      )
      if (selectedRoomId.value && !document.rooms.some((room) => room.id === selectedRoomId.value)) {
        selectedRoomId.value = null
      }
      warnAboutLogicIssues(document, library.value, zones.value)
    } catch (error) {
      loadError.value = String(error)
    }
  }

  async function fetchTrial(mapId: string, trialId: string): Promise<TrialDocument> {
    const cached = trialCache.get(trialId)
    if (cached) {
      return cached
    }
    const document = await loadTrialDocument(mapId, trialId)
    trialCache.set(trialId, document)
    return document
  }

  /** Background image from the registry — failures here do not block the viewer. */
  async function loadBackground(mapId: string): Promise<void> {
    backgroundUrl.value = ''
    try {
      const { maps } = await loadMapsIndex()
      backgroundUrl.value = maps.find((entry) => entry.id === mapId)?.background ?? ''
    } catch {
      backgroundUrl.value = ''
    }
  }

  /** Profile links are an extra — if they are missing, author names stay unlinked. */
  async function loadCredits(): Promise<void> {
    if (contributors.value) {
      return
    }
    try {
      contributors.value = await loadContributors()
    } catch {
      contributors.value = null
    }
  }

  /** Data problems do not block the viewer but must stay discoverable. */
  function warnAboutLogicIssues(
    document: TrialDocument,
    loadedLibrary: ElementLibrary | null,
    loadedZones: ZoneLibrary | null,
  ): void {
    for (const issue of collectTrialLogicIssues(document, loadedLibrary, loadedZones)) {
      console.warn(
        `trial "${document.mapId}/${document.trialId}": ${issue.path}: ${issue.message}`,
      )
    }
  }

  function toggleFilter(filterId: string): void {
    const next = new Set(disabledFilterIds.value)
    if (!next.delete(filterId)) {
      next.add(filterId)
    }
    disabledFilterIds.value = next
  }

  function stepFloor(step: 1 | -1): void {
    const ascending = [...(trial.value?.floors ?? [])].sort((a, b) => a.index - b.index)
    const position = ascending.findIndex((floor) => floor.index === activeFloor.value)
    const next = ascending[position + step]
    if (next) {
      activeFloor.value = next.index
    }
  }

  return {
    manifest,
    trial,
    loading,
    loadError,
    activeTrialId,
    activeFloor,
    disabledFilterIds,
    selectedRoomId,
    panelOpen,
    backgroundUrl,
    trials,
    filters,
    floorsTopDown,
    activeFloorName,
    elementIndex,
    zonesById,
    credits,
    selectedRoom,
    hiddenCategories,
    loadMap,
    setActiveTrial,
    toggleFilter,
    stepFloor,
  }
})
