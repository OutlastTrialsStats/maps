<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { PROFILE_WIDGET_SIZE } from '../core/constants'
import type { Contributor, MapRegistryEntry } from '../core/model/types'
import { useProfileWidget } from './useProfileWidget'

const props = defineProps<{ contributor: Contributor; maps: MapRegistryEntry[] }>()

const { state } = useProfileWidget()

/** Unknown map IDs are skipped — CI already reports them. */
const creditedMaps = computed(() =>
  props.contributor.maps
    .map((mapId) => props.maps.find((entry) => entry.id === mapId))
    .filter((entry): entry is MapRegistryEntry => entry !== undefined),
)
</script>

<template>
  <li class="contributor">
    <totstats-profile
      v-if="state !== 'failed'"
      class="profile"
      :profile-id="contributor.profileId"
      :size="PROFILE_WIDGET_SIZE"
    />
    <a
      v-else
      :href="contributor.profileUrl"
      target="_blank"
      rel="noopener"
      class="fallback surface-card"
    >
      {{ contributor.name }}
      <i class="pi pi-external-link" aria-hidden="true" />
    </a>
    <ul v-if="creditedMaps.length > 0" class="map-chips">
      <li v-for="map in creditedMaps" :key="map.id">
        <RouterLink v-if="map.enabled" :to="`/maps/${map.id}`" class="chip chip-link">
          {{ map.name }}
        </RouterLink>
        <span v-else class="chip">{{ map.name }}</span>
      </li>
    </ul>
  </li>
</template>

<style scoped>
.contributor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile {
  display: block;
}

.fallback {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 16px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.fallback:hover {
  color: var(--accent-hover);
}

.fallback .pi {
  font-size: 0.7rem;
  color: var(--text-faint);
}

.map-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0 4px;
  list-style: none;
}

.chip {
  display: inline-block;
  padding: 2px 8px;
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--surface-raised);
  border-radius: var(--radius-pill);
}

.chip-link {
  text-decoration: none;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.chip-link:hover {
  color: var(--text-primary);
  background: var(--surface-active);
}
</style>
