<script setup lang="ts">
import Button from 'primevue/button'
import ColorPicker from 'primevue/colorpicker'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'
import { FALLBACK_ZONE_FILL, FALLBACK_ZONE_WALLS } from '../../core/constants'
import type { Zone } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { uniqueSlug } from '../store/ids'
import { useUsageLookup } from '../store/useUsageLookup'
import { useZonesStore } from '../store/zonesStore'
import UsageDeleteDialog from './UsageDeleteDialog.vue'
import { useUsageDelete } from './useUsageDelete'

const store = useEditorStore()
const zonesStore = useZonesStore()
const { collectZoneUsage } = useUsageLookup()
const { showDeleteDialog, deleteTarget, usage, usageLoading, openDelete } = useUsageDelete<Zone>(
  (zone) => collectZoneUsage(zone.id),
)

/** Zonen müssen von Räumen immer referenzierbar sein → Löschen nur ohne jede Nutzung. */
const usedInOpenDocument = computed(() =>
  usage.value.some((entry) => entry.isOpenDocument && entry.count > 0),
)

function rename(zoneId: string, raw: string): void {
  const name = raw.trim()
  if (!name) {
    return
  }
  store.commitZones((zones) => {
    const zone = zones.zones.find((entry) => entry.id === zoneId)
    if (zone) {
      zone.name = name
    }
  })
}

/** PrimeVue ColorPicker liefert Hex ohne "#" — fürs Schema normalisieren. */
function setColor(zoneId: string, key: 'fill' | 'walls', value: unknown): void {
  if (typeof value !== 'string' || !value) {
    return
  }
  store.commitZones((zones) => {
    const zone = zones.zones.find((entry) => entry.id === zoneId)
    if (zone) {
      zone[key] = `#${value.toLowerCase()}`
    }
  })
}

function add(): void {
  store.commitZones((zones) => {
    zones.zones.push({
      id: uniqueSlug('new-zone', new Set(zones.zones.map((zone) => zone.id))),
      name: 'New Zone',
      fill: FALLBACK_ZONE_FILL,
      walls: FALLBACK_ZONE_WALLS,
    })
  })
}

function confirmDelete(): void {
  const target = deleteTarget.value
  if (!target) {
    return
  }
  store.commitZones((zones) => {
    zones.zones = zones.zones.filter((zone) => zone.id !== target.id)
  })
}
</script>

<template>
  <div class="zones-manager">
    <p class="hint">Zones are global — changes affect every map. Colors: fill / walls.</p>
    <div v-for="zone in zonesStore.zones" :key="zone.id" class="row">
      <ColorPicker
        :model-value="zone.fill.slice(1)"
        @update:model-value="setColor(zone.id, 'fill', $event)"
      />
      <ColorPicker
        :model-value="zone.walls.slice(1)"
        @update:model-value="setColor(zone.id, 'walls', $event)"
      />
      <InputText
        :model-value="zone.name"
        size="small"
        class="name-input"
        @change="rename(zone.id, ($event.target as HTMLInputElement).value)"
      />
      <code class="zone-id">{{ zone.id }}</code>
      <Button
        v-tooltip.left="zonesStore.zones.length > 1 ? 'Delete' : 'Last zone'"
        icon="pi pi-trash"
        size="small"
        severity="danger"
        text
        :disabled="zonesStore.zones.length <= 1"
        @click="openDelete(zone)"
      />
    </div>
    <Button label="Add zone" size="small" severity="secondary" @click="add" />
    <UsageDeleteDialog
      v-model:visible="showDeleteDialog"
      header="Delete zone"
      :target-label="deleteTarget?.name ?? ''"
      :usage="usage"
      :loading="usageLoading"
      :blocked="usedInOpenDocument"
      blocked-hint="Blocked: rooms of the open map use this zone. Reassign them first."
      @confirm="confirmDelete()"
    />
  </div>
</template>

<style scoped>
.zones-manager {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hint {
  margin: 0 0 4px;
  font-size: 12px;
  color: var(--text-muted);
}

.row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.name-input {
  flex: 1;
  min-width: 0;
}

.zone-id {
  font-size: 11px;
  color: var(--text-faint);
}
</style>
