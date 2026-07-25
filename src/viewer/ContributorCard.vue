<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { gameAssetUrl } from '../core/model/dataSource'
import { useIconFallback } from '../core/render/useIconFallback'
import type { Contributor, MapRegistryEntry } from '../core/model/types'
import { initialsOf } from '../core/text'

const props = defineProps<{ contributor: Contributor; maps: MapRegistryEntry[] }>()

const avatarUrl = computed(() =>
  props.contributor.avatar ? gameAssetUrl(props.contributor.avatar) : undefined,
)
const { showIcon, onIconError } = useIconFallback(() => avatarUrl.value)

/** Unknown map IDs are skipped — CI already reports them. */
const creditedMaps = computed(() =>
  props.contributor.maps
    .map((mapId) => props.maps.find((entry) => entry.id === mapId))
    .filter((entry): entry is MapRegistryEntry => entry !== undefined),
)
</script>

<template>
  <li class="contributor surface-card">
    <img
      v-if="showIcon"
      class="avatar"
      :src="avatarUrl"
      :alt="contributor.name"
      loading="lazy"
      @error="onIconError"
    />
    <span v-else class="avatar avatar-placeholder" aria-hidden="true">
      {{ initialsOf(contributor.name) }}
    </span>
    <div class="body">
      <a :href="contributor.profileUrl" target="_blank" rel="noopener" class="name">
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
    </div>
  </li>
</template>

<style scoped>
.contributor {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
}

/* Game assets are square — hence no rounding, so nothing looks cropped. */
.avatar {
  flex: 0 0 auto;
  width: 56px;
  height: 56px;
  object-fit: cover;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-active);
  font-family: var(--font-data);
  font-size: 1.1rem;
  color: var(--text-body);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.name {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.name:hover {
  color: var(--accent-hover);
}

.name .pi {
  font-size: 0.7rem;
  color: var(--text-faint);
}

.map-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
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
