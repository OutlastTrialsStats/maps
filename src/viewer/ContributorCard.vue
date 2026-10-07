<script setup lang="ts">
import { computed } from 'vue'
import {
  ICON_FILE_EXTENSION,
  MAP_CONTRIBUTOR_BADGE_ICON,
  PROFILE_WIDGET_SIZE,
} from '../core/constants'
import { gameAssetUrl } from '../core/model/dataSource'
import type { Contributor, MapRegistryEntry } from '../core/model/types'
import { useProfileWidget } from './useProfileWidget'

const props = defineProps<{ contributor: Contributor; maps: MapRegistryEntry[] }>()

const { state } = useProfileWidget()

const badgeIconUrl = gameAssetUrl(`${MAP_CONTRIBUTOR_BADGE_ICON}${ICON_FILE_EXTENSION}`)

/** Unknown map IDs are skipped — CI already reports them. */
const creditedMaps = computed(() =>
  props.contributor.maps
    .map((mapId) => props.maps.find((entry) => entry.id === mapId))
    .filter((entry): entry is MapRegistryEntry => entry !== undefined),
)

const creditedMapNames = computed(() => creditedMaps.value.map((map) => map.name).join(', '))
</script>

<template>
  <li class="contributor">
    <totstats-profile
      v-if="state !== 'failed'"
      class="profile"
      :profile-id="contributor.profileId"
      :size="PROFILE_WIDGET_SIZE"
      chip="none"
    >
      <span class="icons">
        <span v-tooltip.top="'Map Contributor'" class="icon">
          <img :src="badgeIconUrl" alt="Map Contributor" class="badge" />
        </span>
        <span v-for="map in creditedMaps" :key="map.id" v-tooltip.top="map.name" class="icon">
          <img v-if="map.card" :src="map.card" :alt="map.name" class="poster" loading="lazy" />
          <span v-else class="initial">{{ map.name.charAt(0) }}</span>
        </span>
      </span>
    </totstats-profile>
    <a
      v-else
      :href="contributor.profileUrl"
      target="_blank"
      rel="noopener"
      class="fallback surface-card"
    >
      <span class="fallback-name">
        {{ contributor.name }}
        <i class="pi pi-external-link" aria-hidden="true" />
      </span>
      <span v-if="creditedMapNames" class="credited">{{ creditedMapNames }}</span>
    </a>
  </li>
</template>

<style scoped>
.contributor {
  flex: none;
}

.profile {
  display: block;
}

.profile::part(card) {
  gap: 0.8rem;
  padding: 0.7rem 1rem 0.7rem 0.85rem;
  background: var(--surface-card);
  border-color: var(--border-default);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.profile::part(card):hover {
  background: var(--surface-hover);
  border-color: var(--border-strong);
}

.profile::part(avatar) {
  border-radius: 4px;
  overflow: hidden;
}

.profile::part(name) {
  font-size: 0.92rem;
  font-weight: 700;
}

.icons {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.4rem;
}

.icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  overflow: hidden;
  background: var(--surface-hover);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
}

.badge {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initial {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
}

.credited {
  display: block;
  margin-top: 2px;
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.fallback {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  text-decoration: none;
}

.fallback-name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.fallback:hover .fallback-name {
  color: var(--accent-hover);
}

.fallback .pi {
  font-size: 0.7rem;
  color: var(--text-faint);
}
</style>
