<script setup lang="ts">
import { computed } from 'vue'
import {
  MARKER_BADGE_INNER_RADIUS,
  MARKER_BADGE_RADIUS,
  MARKER_COLOR,
  MARKER_DOT_RADIUS,
  MARKER_FONT_SIZE,
  MARKER_ICON_SIZE,
  MARKER_LEADER_WIDTH,
  MARKER_LINE_DASH,
  MARKER_TEXT_BASELINE_OFFSET,
} from '../constants'
import { elementIconUrl } from '../model/dataSource'
import type { CalloutMarker, Vec2 } from '../model/types'
import { useIconFallback } from './useIconFallback'

const props = defineProps<{
  marker: CalloutMarker
  /** Placement position in world coordinates; the marker never rotates with it. */
  pos: Vec2
}>()

const badge = computed<Vec2>(() => [
  props.pos[0] + props.marker.offset[0],
  props.pos[1] + props.marker.offset[1],
])

const markerColor = computed(() => props.marker.color ?? MARKER_COLOR)
const lineColor = computed(() => props.marker.lineColor ?? markerColor.value)
const lineDash = computed(() => (props.marker.lineDashed ? MARKER_LINE_DASH : undefined))
const label = computed(() => ('label' in props.marker ? props.marker.label : null))

const iconUrl = computed(() =>
  'icon' in props.marker ? elementIconUrl(props.marker.icon) : undefined,
)
const { showIcon, onIconError } = useIconFallback(iconUrl)

/** Diamond centered on the origin, `radius` = half diagonal. */
function diamondPath(radius: number): string {
  return `M0,${-radius} l${radius},${radius} l${-radius},${radius} l${-radius},${-radius} z`
}

const outerDiamond = diamondPath(MARKER_BADGE_RADIUS)
const innerDiamond = diamondPath(MARKER_BADGE_INNER_RADIUS)
</script>

<template>
  <g class="callout-marker">
    <line
      :x1="pos[0]"
      :y1="pos[1]"
      :x2="badge[0]"
      :y2="badge[1]"
      :stroke="lineColor"
      :stroke-width="MARKER_LEADER_WIDTH"
      :stroke-dasharray="lineDash"
    />
    <circle :cx="pos[0]" :cy="pos[1]" :r="MARKER_DOT_RADIUS" :fill="markerColor" />
    <g :transform="`translate(${badge[0]},${badge[1]})`">
      <path :d="outerDiamond" class="badge-plate" />
      <path :d="outerDiamond" :stroke="markerColor" class="badge-ring" />
      <image
        v-if="showIcon"
        :href="iconUrl"
        :x="-MARKER_ICON_SIZE / 2"
        :y="-MARKER_ICON_SIZE / 2"
        :width="MARKER_ICON_SIZE"
        :height="MARKER_ICON_SIZE"
        @error="onIconError"
      />
      <template v-else>
        <path :d="innerDiamond" :fill="markerColor" />
        <text
          v-if="label !== null"
          :y="MARKER_TEXT_BASELINE_OFFSET"
          :font-size="MARKER_FONT_SIZE"
          class="badge-label"
        >
          {{ label }}
        </text>
      </template>
    </g>
  </g>
</template>

<style scoped>
.callout-marker {
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
