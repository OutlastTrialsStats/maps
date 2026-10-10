<script setup lang="ts">
import { DEFAULT_LABEL_FONT_SIZE } from '../constants'
import type { Room, RoomLabel } from '../model/types'

defineProps<{
  room: Room
  label: RoomLabel
}>()
</script>

<template>
  <text
    :x="room.shape.origin[0] + label.pos[0]"
    :y="room.shape.origin[1] + label.pos[1]"
    :font-size="label.fontSize ?? DEFAULT_LABEL_FONT_SIZE"
    class="room-label"
  >
    {{ label.text }}
  </text>
</template>

<style scoped>
.room-label {
  fill: #d8d6d2;
  text-anchor: middle;
  pointer-events: none;
  user-select: none;
}
</style>
