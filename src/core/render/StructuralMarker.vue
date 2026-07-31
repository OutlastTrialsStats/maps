<script setup lang="ts">
import { computed } from 'vue'
import {
  ICON_DEFAULT_SIZE,
  ROOM_WALL_WIDTH,
  SELECTION_COLOR,
  SELECTION_RING_OFFSET,
} from '../constants'
import { elementIconUrl } from '../model/dataSource'
import type { ElementDefinition, Placement } from '../model/types'
import {
  STRUCTURAL_META,
  centeredRectPath,
  doorSeamPath,
  obstacleChevronsPath,
  obstacleTeethPath,
  placementTransform,
  spawnRoomFloorPath,
  spawnRoomWallPath,
  stairsArrowPath,
  stairsRungsPath,
} from './structuralShapes'
import { useIconFallback } from './useIconFallback'

const props = defineProps<{
  placement: Placement
  element: ElementDefinition
  selected?: boolean
}>()

const iconUrl = computed(() => elementIconUrl(props.element.icon))

const { showIcon, onIconError } = useIconFallback(() => iconUrl.value)

const render = computed(() => props.element.render)
const kind = computed(() => render.value?.kind)
const meta = computed(() => (kind.value ? STRUCTURAL_META[kind.value] : undefined))

const dims = computed<[number, number]>(() => {
  const fallback: [number, number] = [render.value?.length ?? 0, render.value?.thickness ?? 0]
  if (!meta.value?.resizable) {
    return fallback
  }
  return [props.placement.size?.[0] ?? fallback[0], props.placement.size?.[1] ?? fallback[1]]
})
const length = computed(() => dims.value[0])
const thickness = computed(() => dims.value[1])

const rectPath = computed(() => centeredRectPath(length.value, thickness.value))
const ascending = computed(() => props.placement.props?.direction !== 'down')

const groupTransform = computed(() => placementTransform(props.placement))

/** Symbol centered in the shape; with an `edge` anchor the center sits at -t/2. */
const icon = computed(() => {
  const url = iconUrl.value
  if (!showIcon.value || !url) {
    return undefined
  }
  const size = props.element.size ?? ICON_DEFAULT_SIZE
  const centerY = meta.value?.anchor === 'edge' ? -thickness.value / 2 : 0
  return { url, size, x: -size / 2, y: centerY - size / 2 }
})

const selectionBounds = computed(() => {
  const [l, t] = dims.value
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
    <template v-if="kind === 'door' || kind === 'double-door'">
      <path :d="rectPath" class="door" />
      <path v-if="kind === 'double-door'" :d="doorSeamPath(thickness)" class="door-seam" />
    </template>
    <template v-else-if="kind === 'obstacle'">
      <path :d="rectPath" class="obstacle" />
      <path :d="obstacleTeethPath(length, thickness)" class="obstacle-decor" />
      <path :d="obstacleChevronsPath(length, thickness)" class="obstacle-chevrons" />
    </template>
    <template v-else-if="kind === 'stairs'">
      <path :d="rectPath" class="stairs" />
      <path :d="stairsRungsPath(length, thickness)" class="stairs-rungs" />
      <path :d="stairsArrowPath(length, thickness, ascending)" class="stairs-arrow" />
    </template>
    <template v-else-if="kind === 'spawn-room'">
      <path :d="spawnRoomFloorPath(length, thickness)" class="spawn-floor" />
      <path
        :d="spawnRoomWallPath(length, thickness)"
        :stroke-width="ROOM_WALL_WIDTH"
        class="spawn-walls"
      />
    </template>
    <image
      v-if="icon"
      :href="icon.url"
      :x="icon.x"
      :y="icon.y"
      :width="icon.size"
      :height="icon.size"
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
.door {
  fill: #465b92;
  stroke: #000000;
  stroke-width: 1;
}

.door-seam {
  fill: none;
  stroke: #000000;
  stroke-width: 0.6;
}

.obstacle {
  fill: #1e616c;
}

.obstacle-decor {
  fill: #c6e7da;
}

.obstacle-chevrons {
  fill: none;
  stroke: #c6e7da;
  stroke-width: 0.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.stairs {
  fill: #556065;
  stroke: #000000;
  stroke-width: 0.6;
}

.stairs-rungs {
  fill: none;
  stroke: #cfd8dc;
  stroke-width: 0.6;
}

.stairs-arrow {
  fill: none;
  stroke: #cfd8dc;
  stroke-width: 0.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.spawn-floor {
  fill: #3d3d3d;
}

.spawn-walls {
  fill: none;
  stroke: #000000;
  stroke-linecap: square;
}

.selection-outline {
  fill: none;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
  pointer-events: none;
}
</style>
