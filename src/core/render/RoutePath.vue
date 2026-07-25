<script setup lang="ts">
import { SELECTION_COLOR } from '../constants'
import type { RouteLine } from '../model/types'

defineProps<{
  route: RouteLine
  selected?: boolean
}>()
</script>

<template>
  <path
    :d="route.path"
    class="route"
    :style="selected ? { stroke: SELECTION_COLOR } : undefined"
    data-entity-kind="route"
    :data-entity-id="route.id"
  />
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
</style>
