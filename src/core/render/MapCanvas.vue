<script setup lang="ts">
import { shallowRef } from 'vue'
import type { ViewTransform } from '../interaction/viewTransform'

defineProps<{ transform: ViewTransform }>()

const svgEl = shallowRef<SVGSVGElement | null>(null)
defineExpose({ svgEl })
</script>

<template>
  <svg ref="svgEl" class="map-canvas">
    <g :transform="`translate(${transform.x},${transform.y}) scale(${transform.k})`">
      <slot />
    </g>
    <slot name="screen" />
  </svg>
</template>

<style scoped>
.map-canvas {
  display: block;
  width: 100%;
  height: 100%;
  background: #0b0b0d;
  touch-action: none;
  user-select: none;
}
</style>
