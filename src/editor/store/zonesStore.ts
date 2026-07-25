import { defineStore } from 'pinia'
import { computed } from 'vue'
import { loadZoneLibrary } from '../../core/model/dataSource'
import { buildZoneIndex } from '../../core/model/elementIndex'
import { useWorkingCopy } from './workingCopy'

export const useZonesStore = defineStore('zones', () => {
  const copy = useWorkingCopy(loadZoneLibrary, 'zone library')

  const zones = computed(() => copy.working.value?.zones ?? [])
  const zonesById = computed(() => buildZoneIndex(copy.working.value))

  return {
    zoneLibrary: copy.working,
    loadError: copy.loadError,
    dirty: copy.dirty,
    zones,
    zonesById,
    load: copy.load,
    restore: copy.restore,
    markExported: copy.markExported,
  }
})
