<script setup lang="ts">
import { computed } from 'vue'
import {
  DEFAULT_LABEL_FONT_SIZE,
  DISABLED_ROOM_OPACITY,
  FALLBACK_ZONE_FILL,
  FALLBACK_ZONE_WALLS,
  ROOM_WALL_WIDTH,
  SECRET_ROOM_FILL,
  SELECTION_COLOR,
} from '../constants'
import type { Room, Zone } from '../model/types'

const props = defineProps<{
  room: Room
  zone?: Zone
  selected?: boolean
}>()

const flags = computed(() => new Set(props.room.flags ?? []))

const pathD = computed(() => {
  const shape = props.room.shape
  if ('rect' in shape) {
    const [width, height] = shape.rect
    return `M0,0 h${width} v${height} h${-width} z`
  }
  return `M0,0 ${shape.path}`
})

const fill = computed(() =>
  flags.value.has('secret') ? SECRET_ROOM_FILL : (props.zone?.fill ?? FALLBACK_ZONE_FILL),
)
const wallColor = computed(() => props.zone?.walls ?? FALLBACK_ZONE_WALLS)
const stroke = computed(() => (flags.value.has('noWalls') ? 'none' : wallColor.value))
const opacity = computed(() => (flags.value.has('disabled') ? DISABLED_ROOM_OPACITY : 1))
</script>

<template>
  <g
    :transform="`translate(${room.shape.origin[0]},${room.shape.origin[1]})`"
    :opacity="opacity"
    :style="{ color: wallColor }"
    data-entity-kind="room"
    :data-entity-id="room.id"
  >
    <path
      :d="pathD"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="ROOM_WALL_WIDTH"
      stroke-linejoin="miter"
    />
    <path
      v-for="(line, index) in room.innerLines"
      :key="index"
      :d="`M0,0 ${line.path}`"
      class="inner-line"
      :class="`inner-${line.style}`"
    />
    <text
      v-if="room.label"
      :x="room.label.pos[0]"
      :y="room.label.pos[1]"
      :font-size="room.label.fontSize ?? DEFAULT_LABEL_FONT_SIZE"
      class="room-label"
    >
      {{ room.label.text }}
    </text>
    <path v-if="selected" :d="pathD" class="selection-outline" :stroke="SELECTION_COLOR" />
  </g>
</template>

<style scoped>
.inner-line {
  fill: none;
  stroke-linecap: square;
  pointer-events: none;
}

.inner-wall {
  stroke: currentColor;
  stroke-width: 2;
}

.inner-object {
  stroke: #85858c;
  stroke-width: 1;
}

.inner-objectDark {
  stroke: #4f4f55;
  stroke-width: 1;
}

.inner-dashed {
  stroke: #85858c;
  stroke-width: 1;
  stroke-dasharray: 3 2;
}

.room-label {
  fill: #d8d6d2;
  text-anchor: middle;
  pointer-events: none;
  user-select: none;
}

.selection-outline {
  fill: none;
  stroke-width: 2;
  stroke-dasharray: 4 3;
  vector-effect: non-scaling-stroke;
  pointer-events: none;
}
</style>
