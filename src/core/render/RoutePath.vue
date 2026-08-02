<script setup lang="ts">
import { SELECTION_COLOR } from '../constants'
import type { RouteLine } from '../model/types'

defineProps<{
  route: RouteLine
  selected?: boolean
  /** Adds an invisible wide stroke so the thin dashed line is clickable (editor). */
  hitArea?: boolean
}>()
</script>

<template>
  <g data-entity-kind="route" :data-entity-id="route.id">
    <path v-if="hitArea" :d="route.path" class="route-hit" />
    <path
      :d="route.path"
      class="route"
      :style="selected ? { stroke: SELECTION_COLOR } : undefined"
    />
  </g>
</template>

<style scoped>
.route {
  fill: none;
  stroke: #e0913c;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 8 5;
}

.route-hit {
  fill: none;
  stroke: transparent;
  stroke-width: 12;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
</style>
