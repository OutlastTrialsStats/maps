<script setup lang="ts">
import { computed } from 'vue'
import {
  ICON_DEFAULT_SIZE,
  INACTIVE_ICON_FILTER,
  SELECTION_COLOR,
  SELECTION_RING_OFFSET,
} from '../constants'
import { elementIconUrl } from '../model/dataSource'
import type { ElementDefinition, Placement } from '../model/types'
import ShuttleBody from './ShuttleBody.vue'
import StructuralBody from './StructuralBody.vue'
import { STRUCTURAL_META, placementTransform } from './structuralShapes'
import { useIconFallback } from './useIconFallback'

const props = defineProps<{
  placement: Placement
  element: ElementDefinition
  selected?: boolean
}>()

const iconUrl = computed(() => elementIconUrl(props.element.icon))

const { showIcon, onIconError } = useIconFallback(iconUrl)

const kind = computed(() => props.element.render?.kind)
const meta = computed(() => (kind.value ? STRUCTURAL_META[kind.value] : undefined))

const dims = computed(() => {
  const render = props.element.render
  const fallback = { length: render?.length ?? 0, thickness: render?.thickness ?? 0 }
  if (!meta.value?.resizable) {
    return fallback
  }
  return {
    length: props.placement.size?.[0] ?? fallback.length,
    thickness: props.placement.size?.[1] ?? fallback.thickness,
  }
})

const iconStyle = computed(() =>
  props.placement.inactive ? { filter: INACTIVE_ICON_FILTER } : undefined,
)

const groupTransform = computed(() => placementTransform(props.placement))

/** Symbol centered in the shape; with an `edge` anchor the center sits at -t/2. */
const icon = computed(() => {
  const url = iconUrl.value
  if (!showIcon.value || !url) {
    return undefined
  }
  const size = props.element.size ?? ICON_DEFAULT_SIZE
  const centerY = meta.value?.anchor === 'edge' ? -dims.value.thickness / 2 : 0
  return { url, size, x: -size / 2, y: centerY - size / 2 }
})

const selectionBounds = computed(() => {
  const { length: l, thickness: t } = dims.value
  const offset = SELECTION_RING_OFFSET
  return {
    x: -l / 2 - offset,
    y: (meta.value?.anchor === 'edge' ? -t : -t / 2) - offset,
    width: l + 2 * offset,
    height: t + 2 * offset,
  }
})
</script>

<template>
  <g
    :transform="groupTransform"
    data-entity-kind="placement"
    :data-entity-id="placement.id"
    class="structural"
  >
    <ShuttleBody
      v-if="kind === 'shuttle'"
      :placement="placement"
      :length="dims.length"
      :thickness="dims.thickness"
      :color="element.color"
    />
    <StructuralBody
      v-else-if="kind"
      :kind="kind"
      :placement="placement"
      :color="element.color"
      :length="dims.length"
      :thickness="dims.thickness"
    />
    <image
      v-if="icon"
      :href="icon.url"
      :x="icon.x"
      :y="icon.y"
      :width="icon.size"
      :height="icon.size"
      :style="iconStyle"
      @error="onIconError"
    />
    <rect
      v-if="selected"
      v-bind="selectionBounds"
      class="selection-outline"
      :stroke="SELECTION_COLOR"
    />
  </g>
</template>

<style scoped>
.selection-outline {
  fill: none;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
  pointer-events: none;
}
</style>
