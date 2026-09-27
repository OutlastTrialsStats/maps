<script setup lang="ts">
import { computed } from 'vue'
import type { MapRegistryEntry } from '../core/model/types'

const props = defineProps<{ maps: MapRegistryEntry[] }>()

const available = computed(() => props.maps.filter((entry) => entry.enabled).length)
</script>

<template>
  <header class="maps-heading">
    <h2>Maps</h2>
    <p v-if="maps.length > 0" class="count tabular-nums">
      {{ available }} of {{ maps.length }} available
    </p>
  </header>
</template>

<style scoped>
.maps-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 4px 14px;
  margin-bottom: 4px;
  text-align: center;
}

h2 {
  margin: 0;
  font-family: var(--font-brand);
  font-size: 1.5rem;
  color: var(--text-primary);
  text-shadow: 0 2px 8px var(--text-shadow-color);
}

.count {
  margin: 0;
  font-family: var(--font-data);
  font-size: 0.85rem;
  color: var(--text-muted);
  text-shadow: 0 1px 4px var(--text-shadow-color);
}
</style>
