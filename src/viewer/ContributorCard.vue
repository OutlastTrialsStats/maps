<script setup lang="ts">
import { computed } from 'vue'
import { PROFILE_WIDGET_SIZE } from '../core/constants'
import type { Contributor, MapRegistryEntry } from '../core/model/types'
import { useProfileWidget } from './useProfileWidget'

const props = defineProps<{ contributor: Contributor; maps: MapRegistryEntry[] }>()

const { state } = useProfileWidget()

/** Unknown map IDs are skipped — CI already reports them. */
const creditedMapNames = computed(() =>
  props.contributor.maps
    .map((mapId) => props.maps.find((entry) => entry.id === mapId)?.name)
    .filter((name): name is string => name !== undefined)
    .join(', '),
)
</script>

<template>
  <li class="contributor">
    <totstats-profile
      v-if="state !== 'failed'"
      class="profile"
      :profile-id="contributor.profileId"
      :size="PROFILE_WIDGET_SIZE"
    >
      <span v-if="creditedMapNames" class="credited">{{ creditedMapNames }}</span>
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
  gap: 12px;
  padding: 8px 16px 8px 10px;
  background: var(--glass-bg);
  border-color: var(--border-strong);
  transition: border-color 0.2s ease;
}

.profile::part(card):hover {
  border-color: var(--accent);
}

.profile::part(name) {
  font-size: 0.95rem;
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
