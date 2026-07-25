<script setup lang="ts">
import { CAMERA_MARKER_SIZE } from '../constants'
import type { CameraInfo } from '../model/types'

defineProps<{ camera: CameraInfo }>()
</script>

<template>
  <g
    :transform="`translate(${camera.pos[0]},${camera.pos[1]}) rotate(${camera.rotation})`"
    class="camera-marker"
  >
    <path
      :d="`M0,0 L${CAMERA_MARKER_SIZE},${-CAMERA_MARKER_SIZE / 2} L${CAMERA_MARKER_SIZE},${CAMERA_MARKER_SIZE / 2} Z`"
      class="camera-cone"
    />
    <circle :r="CAMERA_MARKER_SIZE / 4" class="camera-dot" />
  </g>
</template>

<style scoped>
.camera-marker {
  pointer-events: none;
}

.camera-cone {
  fill: rgba(77, 163, 255, 0.35);
}

.camera-dot {
  fill: #4da3ff;
}
</style>
