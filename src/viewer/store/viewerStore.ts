import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { buildContributorIndex } from '../../core/model/contributorIndex'
import {
  loadContributors,
  loadElementLibrary,
  loadMapDefinition,
  loadMapsIndex,
  loadZoneLibrary,
} from '../../core/model/dataSource'
import { buildElementIndex, buildZoneIndex } from '../../core/model/elementIndex'
import { defaultTrialId, initialFloorIndex } from '../../core/model/mapDefaults'
import type {
  Contributors,
  ElementLibrary,
  MapDefinition,
  Room,
  ZoneLibrary,
} from '../../core/model/types'
import { collectMapLogicIssues } from '../../core/model/validation'

export const useViewerStore = defineStore('viewer', () => {
  const map = ref<MapDefinition | null>(null)
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

  const trials = computed(() => map.value?.trials ?? [])
  const filters = computed(() => map.value?.filters ?? [])
  const floorsTopDown = computed(() =>
    [...(map.value?.floors ?? [])].sort((a, b) => b.index - a.index),
  )
  const activeFloorName = computed(
    () => map.value?.floors.find((floor) => floor.index === activeFloor.value)?.name ?? '',
  )
  const elementIndex = computed(() => buildElementIndex(library.value))
  const zonesById = computed(() => buildZoneIndex(zones.value))
  /** Authors of the open map, with a profile link where possible (contributors.json). */
  const credits = computed(() => {
    const byName = buildContributorIndex(contributors.value)
    return (map.value?.meta.authors ?? []).map((name) => ({
      name,
      profileUrl: byName.get(name)?.profileUrl,
    }))
  })
  const selectedRoom = computed<Room | null>(
    () => map.value?.rooms.find((room) => room.id === selectedRoomId.value) ?? null,
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

  async function loadMap(mapId: string): Promise<void> {
    loading.value = true
    loadError.value = ''
    map.value = null
    selectedRoomId.value = null
    void loadBackground(mapId)
    void loadCredits()
    try {
      const [definition, loadedLibrary, loadedZones] = await Promise.all([
        loadMapDefinition(mapId),
        library.value ?? loadElementLibrary(),
        zones.value ?? loadZoneLibrary(),
      ])
      library.value = loadedLibrary
      zones.value = loadedZones
      map.value = definition
      activeTrialId.value = defaultTrialId(definition.trials) ?? ''
      activeFloor.value = initialFloorIndex(definition.floors)
      disabledFilterIds.value = new Set(
        definition.filters.filter((filter) => filter.default === false).map((filter) => filter.id),
      )
      warnAboutLogicIssues(definition, loadedLibrary, loadedZones)
    } catch (error) {
      loadError.value = String(error)
    } finally {
      loading.value = false
    }
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

  /** Data problems do not block the viewer but must stay discoverable (docs/03 §5). */
  function warnAboutLogicIssues(
    definition: MapDefinition,
    loadedLibrary: ElementLibrary,
    loadedZones: ZoneLibrary,
  ): void {
    for (const issue of collectMapLogicIssues(definition, loadedLibrary, loadedZones)) {
      console.warn(`map "${definition.id}": ${issue.path}: ${issue.message}`)
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
    const ascending = [...(map.value?.floors ?? [])].sort((a, b) => a.index - b.index)
    const position = ascending.findIndex((floor) => floor.index === activeFloor.value)
    const next = ascending[position + step]
    if (next) {
      activeFloor.value = next.index
    }
  }

  return {
    map,
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
    toggleFilter,
    stepFloor,
  }
})
