<script setup lang="ts">
import { computed } from 'vue'
import {
  MARKER_BADGE_INNER_RADIUS,
  MARKER_BADGE_RADIUS,
  MARKER_COLOR,
  MARKER_DOT_RADIUS,
  MARKER_FONT_SIZE,
  MARKER_LEADER_WIDTH,
  MARKER_TEXT_BASELINE_OFFSET,
} from '../constants'
import type { NumberMarker, Vec2 } from '../model/types'

const props = defineProps<{
  marker: NumberMarker
  /** Placement position in world coordinates; the marker never rotates with it. */
  pos: Vec2
}>()

const badge = computed<Vec2>(() => [
  props.pos[0] + props.marker.offset[0],
  props.pos[1] + props.marker.offset[1],
])

/** Diamond centered on the origin, `radius` = half diagonal. */
function diamondPath(radius: number): string {
  return `M0,${-radius} l${radius},${radius} l${-radius},${radius} l${-radius},${-radius} z`
}

const outerDiamond = diamondPath(MARKER_BADGE_RADIUS)
const innerDiamond = diamondPath(MARKER_BADGE_INNER_RADIUS)
</script>

<template>
  <g class="number-marker">
    <line
      :x1="pos[0]"
      :y1="pos[1]"
      :x2="badge[0]"
      :y2="badge[1]"
      :stroke="MARKER_COLOR"
      :stroke-width="MARKER_LEADER_WIDTH"
    />
    <circle :cx="pos[0]" :cy="pos[1]" :r="MARKER_DOT_RADIUS" :fill="MARKER_COLOR" />
    <g :transform="`translate(${badge[0]},${badge[1]})`">
      <path :d="outerDiamond" class="badge-plate" />
      <path :d="outerDiamond" :stroke="MARKER_COLOR" class="badge-ring" />
      <path :d="innerDiamond" :fill="MARKER_COLOR" />
      <text :y="MARKER_TEXT_BASELINE_OFFSET" :font-size="MARKER_FONT_SIZE" class="badge-label">
        {{ marker.label }}
      </text>
    </g>
  </g>
</template>

<style scoped>
.number-marker {
  pointer-events: none;
}

.badge-plate {
  fill: #000000;
  stroke: #000000;
  stroke-width: 1.5;
}

.badge-ring {
  fill: none;
  stroke-width: 0.75;
  stroke-dasharray: 5.5 1.5;
  stroke-dashoffset: 2.5;
}

.badge-label {
  fill: #000000;
  text-anchor: middle;
  user-select: none;
}
</style>
