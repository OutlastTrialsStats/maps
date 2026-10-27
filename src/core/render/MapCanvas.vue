<script setup lang="ts">
import { shallowRef } from 'vue'
import type { ViewTransform } from '../interaction/viewTransform'

defineProps<{ transform: ViewTransform; mirrored?: boolean }>()

const svgEl = shallowRef<SVGSVGElement | null>(null)
defineExpose({ svgEl })
</script>

<template>
  <svg ref="svgEl" class="map-canvas" :class="{ mirrored }">
    <g :transform="`translate(${transform.x},${transform.y}) scale(${transform.k})`">
      <g :transform="mirrored ? 'scale(-1,1)' : undefined">
        <slot />
      </g>
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

.map-canvas.mirrored :deep(image),
.map-canvas.mirrored :deep(text) {
  transform: scaleX(-1);
  transform-box: fill-box;
  transform-origin: center;
}
</style>
