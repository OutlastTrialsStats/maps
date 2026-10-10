<script setup lang="ts">
import { computed } from 'vue'
import {
  DARK_FLOOR_FILL,
  INACTIVE_PLACEMENT_FILL,
  ROOM_WALL_WIDTH,
  SPAWN_DOOR_FILL,
  SPAWN_DOOR_LENGTH,
  SPAWN_DOOR_THICKNESS,
} from '../constants'
import type { Placement, StructuralKind } from '../model/types'
import {
  barricadeHatchPath,
  barricadePlankPath,
  centeredRectPath,
  crawlBarsPath,
  ladderRungsPath,
  obstacleChevronsPath,
  obstacleTeethPath,
  rollingDoorBarsPath,
  rollingDoorCapsPath,
  spawnRoomPath,
  stairsArrowPath,
  stairsRungsPath,
  windowMullionPath,
} from './structuralShapes'

const props = defineProps<{
  kind: Exclude<StructuralKind, 'shuttle'>
  placement: Placement
  color: string
  length: number
  thickness: number
}>()

const rectPath = computed(() => centeredRectPath(props.length, props.thickness))
const ascending = computed(() => props.placement.props?.direction !== 'down')

/** Door/window/stairs variants differ only by the library color, not by code. */
const elementFill = computed(() =>
  props.placement.inactive ? INACTIVE_PLACEMENT_FILL : props.color,
)

const spawnDoorPath = centeredRectPath(SPAWN_DOOR_LENGTH, SPAWN_DOOR_THICKNESS)
const spawnDoorFill = computed(() =>
  props.placement.inactive ? INACTIVE_PLACEMENT_FILL : SPAWN_DOOR_FILL,
)
</script>

<template>
  <path v-if="kind === 'door'" :d="rectPath" :fill="elementFill" class="body" />
  <template v-else-if="kind === 'double-door'">
    <path :d="rectPath" :fill="elementFill" class="body" />
    <path :d="rollingDoorCapsPath(length)" :fill="elementFill" class="body" />
    <path :d="rollingDoorBarsPath(length)" :fill="elementFill" class="rolling-door-bar" />
  </template>
  <template v-else-if="kind === 'barricaded-door'">
    <path :d="rectPath" :fill="elementFill" class="body" />
    <path :d="barricadePlankPath(length, thickness)" :fill="elementFill" class="barricade-plank" />
    <path :d="barricadeHatchPath(length, thickness)" class="barricade-hatch" />
  </template>
  <template v-else-if="kind === 'window'">
    <path :d="rectPath" :fill="elementFill" class="body" />
    <path :d="windowMullionPath(length)" class="window-mullion" />
  </template>
  <template v-else-if="kind === 'crawl-passage'">
    <path :d="rectPath" :fill="elementFill" class="body" />
    <path :d="crawlBarsPath(length, thickness)" class="crawl-bars" />
  </template>
  <template v-else-if="kind === 'obstacle'">
    <path :d="rectPath" :fill="elementFill" />
    <path :d="obstacleTeethPath(length, thickness)" class="obstacle-decor" />
    <path :d="obstacleChevronsPath(length, thickness)" class="obstacle-chevrons" />
  </template>
  <template v-else-if="kind === 'stairs'">
    <path :d="rectPath" :fill="elementFill" class="stairs" />
    <path :d="stairsRungsPath(length, thickness)" class="stairs-rungs" />
    <path :d="stairsArrowPath(length, thickness, ascending)" class="stairs-arrow" />
  </template>
  <template v-else-if="kind === 'ladder'">
    <path :d="rectPath" class="ladder-band" />
    <path :d="ladderRungsPath(length, thickness)" :stroke="elementFill" class="ladder-rungs" />
  </template>
  <template v-else-if="kind === 'spawn-room'">
    <path
      :d="spawnRoomPath(length, thickness)"
      :fill="DARK_FLOOR_FILL"
      :stroke-width="ROOM_WALL_WIDTH"
      class="spawn-walls"
    />
    <path :d="spawnDoorPath" :fill="spawnDoorFill" class="body" />
  </template>
</template>

<style scoped>
.body {
  stroke: #000000;
  stroke-width: 1;
}

.rolling-door-bar {
  stroke: #000000;
  stroke-width: 0.5;
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

.ladder-band {
  fill: #000000;
}

.ladder-rungs {
  fill: none;
  stroke-width: 1;
}

.spawn-walls {
  stroke: #000000;
}
</style>
