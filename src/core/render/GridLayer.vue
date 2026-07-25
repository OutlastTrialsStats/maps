<script setup lang="ts">
import { computed } from 'vue'
import { EDITOR_GRID_MAJOR, EDITOR_GRID_MINOR, GRID_MIN_SPACING_PX } from '../constants'
import { screenToWorld, type ViewTransform } from '../interaction/viewTransform'
import type { Vec2 } from '../model/types'

const props = defineProps<{
  transform: ViewTransform
  /** Sichtbare Canvas-Größe in CSS-Pixeln. */
  viewport: Vec2
}>()

const worldRect = computed(() => ({
  topLeft: screenToWorld([0, 0], props.transform),
  bottomRight: screenToWorld(props.viewport, props.transform),
}))

function gridPath(step: number): string {
  const { topLeft, bottomRight } = worldRect.value
  const parts: string[] = []
  for (let x = Math.floor(topLeft[0] / step) * step; x <= bottomRight[0]; x += step) {
    parts.push(`M${x},${topLeft[1]}V${bottomRight[1]}`)
  }
  for (let y = Math.floor(topLeft[1] / step) * step; y <= bottomRight[1]; y += step) {
    parts.push(`M${topLeft[0]},${y}H${bottomRight[0]}`)
  }
  return parts.join('')
}

const minorPath = computed(() =>
  props.transform.k * EDITOR_GRID_MINOR >= GRID_MIN_SPACING_PX ? gridPath(EDITOR_GRID_MINOR) : '',
)
const majorPath = computed(() =>
  props.transform.k * EDITOR_GRID_MAJOR >= GRID_MIN_SPACING_PX ? gridPath(EDITOR_GRID_MAJOR) : '',
)
</script>

<template>
  <g class="grid" aria-hidden="true">
    <path v-if="minorPath" :d="minorPath" class="grid-minor" />
    <path v-if="majorPath" :d="majorPath" class="grid-major" />
  </g>
</template>

<style scoped>
.grid path {
  fill: none;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  pointer-events: none;
}

.grid-minor {
  stroke: #17171b;
}

.grid-major {
  stroke: #222229;
}
</style>
