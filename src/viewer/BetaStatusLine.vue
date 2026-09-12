<script setup lang="ts">
import { computed } from 'vue'
import type { MapRegistryEntry } from '../core/model/types'

const props = defineProps<{ maps: MapRegistryEntry[] }>()

const available = computed(() => props.maps.filter((entry) => entry.enabled).length)
</script>

<template>
  <p v-if="maps.length > 0" class="status">
    <span class="rule" aria-hidden="true" />
    <span class="text">
      <span class="label">Beta</span>
      <span class="tabular-nums">{{ available }} of {{ maps.length }} maps available</span>
    </span>
    <span class="rule" aria-hidden="true" />
  </p>
</template>

<style scoped>
.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 0 0 20px;
}

.rule {
  flex: 1 1 24px;
  max-width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-strong));
}

.rule:last-child {
  transform: scaleX(-1);
}

.text {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 4px 10px;
  font-family: var(--font-data);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  text-shadow: 0 1px 4px var(--text-shadow-color);
}

.label {
  padding-right: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: var(--accent-hover);
  border-right: 1px solid var(--border-strong);
}
</style>
