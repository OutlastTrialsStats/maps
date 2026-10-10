<script setup lang="ts">
import { computed } from 'vue'
import { DARK_FLOOR_FILL, INACTIVE_PLACEMENT_FILL, SHUTTLE_DEFAULT_CELLS } from '../constants'
import type { Placement } from '../model/types'
import {
  centeredRectPath,
  shuttleButtonBoxPath,
  shuttleButtonPath,
  shuttleDotsPath,
  shuttleFramePath,
  shuttleSeamsPath,
} from './structuralShapes'

const props = defineProps<{
  placement: Placement
  length: number
  thickness: number
  /** Element color, used for the cell dots. */
  color: string
}>()

const cells = computed(() => {
  const raw = Number(props.placement.props?.cells)
  return Number.isFinite(raw) ? Math.max(1, Math.floor(raw)) : SHUTTLE_DEFAULT_CELLS
})
/** Unchecked booleans are absent from `props`, so strict comparison is exact. */
const enterable = computed(() => props.placement.props?.enterable === true)
const redButton = computed(() => props.placement.props?.redButton === true)

/** Inline styles, because the class fills would override presentation attributes. */
const inactiveFillStyle = computed(() =>
  props.placement.inactive ? { fill: INACTIVE_PLACEMENT_FILL } : undefined,
)
const dotsStyle = computed(() => ({
  fill: props.placement.inactive ? INACTIVE_PLACEMENT_FILL : props.color,
}))
const inactiveShadeStyle = computed(() =>
  props.placement.inactive ? { fill: DARK_FLOOR_FILL } : undefined,
)
</script>

<template>
  <path :d="centeredRectPath(length, thickness)" class="shuttle-body" />
  <path :d="shuttleFramePath(length, thickness, cells)" class="shuttle-frame" />
  <path :d="shuttleSeamsPath(length, thickness, cells)" class="shuttle-seams" />
  <path
    v-if="enterable"
    :d="shuttleDotsPath(length, thickness, cells)"
    class="shuttle-dots"
    :style="dotsStyle"
  />
  <template v-if="redButton">
    <path
      :d="shuttleButtonBoxPath(length, thickness, cells)"
      class="shuttle-button-box"
      :style="inactiveShadeStyle"
    />
    <path
      :d="shuttleButtonPath(length, thickness, cells)"
      class="shuttle-button"
      :style="inactiveFillStyle"
    />
  </template>
</template>

<style scoped>
.shuttle-body {
  fill: #292a29;
  stroke: #000000;
  stroke-width: 0.6;
}

.shuttle-frame {
  fill: #162623;
}

.shuttle-seams {
  fill: none;
  stroke: #162623;
  stroke-width: 0.3;
}

.shuttle-button-box {
  fill: #666666;
}

.shuttle-button {
  fill: #bb0000;
  stroke: #000000;
  stroke-width: 0.25;
}
</style>
