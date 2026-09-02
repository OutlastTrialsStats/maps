<script setup lang="ts">
import { computed } from 'vue'
import {
  ICON_DEFAULT_SIZE,
  ROOM_WALL_WIDTH,
  SELECTION_COLOR,
  SELECTION_RING_OFFSET,
  SHUTTLE_DEFAULT_CELLS,
} from '../constants'
import { elementIconUrl } from '../model/dataSource'
import type { ElementDefinition, Placement } from '../model/types'
import {
  STRUCTURAL_META,
  barricadeHatchPath,
  barricadePlankPath,
  centeredRectPath,
  crawlBarsPath,
  doorSeamPath,
  obstacleChevronsPath,
  obstacleTeethPath,
  placementTransform,
  shuttleButtonBoxPath,
  shuttleButtonPath,
  shuttleDotsPath,
  shuttleFramePath,
  shuttleSeamsPath,
  spawnRoomFloorPath,
  spawnRoomWallPath,
  stairsArrowPath,
  stairsRungsPath,
  windowMullionPath,
} from './structuralShapes'
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

const rectPath = computed(() => centeredRectPath(dims.value.length, dims.value.thickness))
const ascending = computed(() => props.placement.props?.direction !== 'down')

const shuttleCells = computed(() => {
  const raw = Number(props.placement.props?.cells)
  return Number.isFinite(raw) ? Math.max(1, Math.floor(raw)) : SHUTTLE_DEFAULT_CELLS
})
/** Unchecked booleans are absent from `props`, so strict comparison is exact. */
const shuttleEnterable = computed(() => props.placement.props?.enterable === true)
const shuttleRedButton = computed(() => props.placement.props?.redButton === true)

/** Door/window/stairs variants differ only by the library color, not by code. */
const bodyFill = computed(() =>
  meta.value?.fill === 'element' ? props.element.color : undefined,
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
    <template v-if="kind === 'door' || kind === 'double-door'">
      <path :d="rectPath" :fill="bodyFill" class="body" />
      <path v-if="kind === 'double-door'" :d="doorSeamPath(dims.thickness)" class="door-seam" />
    </template>
    <template v-else-if="kind === 'barricaded-door'">
      <path :d="rectPath" :fill="bodyFill" class="body" />
      <path :d="barricadePlankPath(dims.length, dims.thickness)" :fill="bodyFill" class="barricade-plank" />
      <path :d="barricadeHatchPath(dims.length, dims.thickness)" class="barricade-hatch" />
    </template>
    <template v-else-if="kind === 'window'">
      <path :d="rectPath" :fill="bodyFill" class="body" />
      <path :d="windowMullionPath(dims.length)" class="window-mullion" />
    </template>
    <template v-else-if="kind === 'crawl-passage'">
      <path :d="rectPath" :fill="bodyFill" class="body" />
      <path :d="crawlBarsPath(dims.length, dims.thickness)" class="crawl-bars" />
    </template>
    <template v-else-if="kind === 'obstacle'">
      <path :d="rectPath" :fill="bodyFill" />
      <path :d="obstacleTeethPath(dims.length, dims.thickness)" class="obstacle-decor" />
      <path :d="obstacleChevronsPath(dims.length, dims.thickness)" class="obstacle-chevrons" />
    </template>
    <template v-else-if="kind === 'stairs'">
      <path :d="rectPath" :fill="bodyFill" class="stairs" />
      <path :d="stairsRungsPath(dims.length, dims.thickness)" class="stairs-rungs" />
      <path :d="stairsArrowPath(dims.length, dims.thickness, ascending)" class="stairs-arrow" />
    </template>
    <template v-else-if="kind === 'shuttle'">
      <path :d="rectPath" class="shuttle-body" />
      <path :d="shuttleFramePath(dims.length, dims.thickness, shuttleCells)" class="shuttle-frame" />
      <path :d="shuttleSeamsPath(dims.length, dims.thickness, shuttleCells)" class="shuttle-seams" />
      <path
        v-if="shuttleEnterable"
        :d="shuttleDotsPath(dims.length, dims.thickness, shuttleCells)"
        class="shuttle-dots"
      />
      <template v-if="shuttleRedButton">
        <path
          :d="shuttleButtonBoxPath(dims.length, dims.thickness, shuttleCells)"
          class="shuttle-button-box"
        />
        <path
          :d="shuttleButtonPath(dims.length, dims.thickness, shuttleCells)"
          class="shuttle-button"
        />
      </template>
    </template>
    <template v-else-if="kind === 'spawn-room'">
      <path :d="spawnRoomFloorPath(dims.length, dims.thickness)" class="spawn-floor" />
      <path
        :d="spawnRoomWallPath(dims.length, dims.thickness)"
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
.body {
  stroke: #000000;
  stroke-width: 1;
}

.door-seam {
  fill: none;
  stroke: #000000;
  stroke-width: 0.6;
}

.window-mullion {
  fill: none;
  stroke: #000000;
  stroke-width: 1;
}

.barricade-plank {
  stroke: #000000;
  stroke-width: 0.25;
}

.barricade-hatch,
.crawl-bars {
  fill: none;
  stroke: #000000;
  stroke-width: 0.5;
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

.shuttle-dots {
  fill: #465b92;
}

.shuttle-button-box {
  fill: #666666;
}

.shuttle-button {
  fill: #bb0000;
  stroke: #000000;
  stroke-width: 0.25;
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
