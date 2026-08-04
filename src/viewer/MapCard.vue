<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { MapRegistryEntry } from '../core/model/types'

defineProps<{ map: MapRegistryEntry }>()
</script>

<template>
  <component
    :is="map.enabled ? RouterLink : 'div'"
    :to="map.enabled ? `/maps/${map.id}` : undefined"
    class="card"
    :class="{ 'card-locked': !map.enabled }"
  >
    <img v-if="map.card" class="card-image" :src="map.card" :alt="map.name" loading="lazy" />
    <span class="card-shade" aria-hidden="true" />
    <span class="card-body">
      <span class="card-name">{{ map.name }}</span>
      <span v-if="map.enabled" class="card-progress tabular-nums">{{ map.progress }}% mapped</span>
      <span v-else class="card-progress locked-label">
        <i class="pi pi-lock" />
        Coming in the future
      </span>
      <span v-if="map.enabled" class="progress-track">
        <span class="progress-fill" :style="{ width: `${map.progress}%` }" />
      </span>
    </span>
  </component>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  align-items: flex-end;
  /* Original dimensions of the poster assets. */
  aspect-ratio: 548 / 728;
  overflow: hidden;
  background: var(--surface-card);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: transform 0.3s ease;
}

.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 55%,
    color-mix(in srgb, var(--bg-page) 90%, transparent) 100%
  );
}

.card-body {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 16px 20px;
}

.card:not(.card-locked):hover {
  transform: translateY(-6px) scale(1.03);
}

.card-name {
  font-family: var(--font-brand);
  font-size: 1.3rem;
  color: var(--text-primary);
  text-shadow: 0 2px 8px var(--text-shadow-color);
}

.card-progress {
  font-family: var(--font-data);
  font-size: 0.85rem;
  color: var(--text-muted);
}

.progress-track {
  height: 3px;
  margin-top: 4px;
  background: var(--surface-active);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.progress-fill {
  display: block;
  height: 100%;
  background: var(--accent);
  border-radius: var(--radius-pill);
}

.card-locked .card-image {
  filter: grayscale(0.9) brightness(0.55);
}

.card-locked .card-name {
  color: var(--text-faint);
}

.locked-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-faint);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .card:not(.card-locked):hover {
    transform: none;
  }
}
</style>
