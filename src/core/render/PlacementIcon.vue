<script setup lang="ts">
import { computed } from 'vue'
import {
  ICON_DEFAULT_SIZE,
  PLACEHOLDER_FONT_RATIO,
  SELECTION_COLOR,
  SELECTION_RING_OFFSET,
  UNKNOWN_ELEMENT_COLOR,
} from '../constants'
import { elementIconUrl } from '../model/dataSource'
import type { ElementDefinition, Placement, Vec2 } from '../model/types'
import { initialsOf } from '../text'
import { placementTransform } from './structuralShapes'
import { useIconFallback } from './useIconFallback'

const props = defineProps<{
  placement: Placement
  element?: ElementDefinition
  selected?: boolean
}>()

const iconUrl = computed(() => elementIconUrl(props.element?.icon))

const { showIcon, onIconError } = useIconFallback(iconUrl)

const size = computed(() => props.element?.size ?? ICON_DEFAULT_SIZE)

/** Icon center in local coordinates, depending on the anchor of the element. */
const center = computed<Vec2>(() =>
  props.element?.anchor === 'topleft' ? [size.value / 2, size.value / 2] : [0, 0],
)

const initials = computed(() => initialsOf(props.element?.name))

const groupTransform = computed(() => placementTransform(props.placement))
</script>

<template>
  <g
    :transform="groupTransform"
    data-entity-kind="placement"
    :data-entity-id="placement.id"
    class="placement"
  >
    <image
      v-if="showIcon"
      :href="iconUrl"
      :x="center[0] - size / 2"
      :y="center[1] - size / 2"
      :width="size"
      :height="size"
      @error="onIconError"
    />
    <template v-else>
      <circle
        :cx="center[0]"
        :cy="center[1]"
        :r="size / 2"
        :fill="element?.color ?? UNKNOWN_ELEMENT_COLOR"
        class="placeholder"
      />
      <text
        :x="center[0]"
        :y="center[1]"
        :font-size="size * PLACEHOLDER_FONT_RATIO"
        class="placeholder-initials"
      >
        {{ initials }}
      </text>
    </template>
    <circle
      v-if="selected"
      :cx="center[0]"
      :cy="center[1]"
      :r="size / 2 + SELECTION_RING_OFFSET"
      class="selection-ring"
      :stroke="SELECTION_COLOR"
    />
  </g>
</template>

<style scoped>
.placeholder {
  stroke: rgba(0, 0, 0, 0.4);
}

.placeholder-initials {
  fill: #101013;
  font-weight: 600;
  text-anchor: middle;
  dominant-baseline: central;
  pointer-events: none;
  user-select: none;
}

.selection-ring {
  fill: none;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
  pointer-events: none;
}
</style>
