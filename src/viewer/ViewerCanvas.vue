<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  LONG_PRESS_MOVE_TOLERANCE_PX,
  LONG_PRESS_MS,
  TOOLTIP_OFFSET_PX,
} from '../core/constants'
import { hitFromEventTarget, type HitTarget } from '../core/interaction/hitTest'
import { usePanZoom } from '../core/interaction/usePanZoom'
import { roomsBounds } from '../core/model/roomPath'
import type { Placement } from '../core/model/types'
import CameraMarker from '../core/render/CameraMarker.vue'
import FloorLayer from '../core/render/FloorLayer.vue'
import MapCanvas from '../core/render/MapCanvas.vue'
import { useViewerStore } from './store/viewerStore'

const emit = defineEmits<{ openMenu: [hit: HitTarget | null, event: MouseEvent] }>()

const viewer = useViewerStore()
const canvas = ref<InstanceType<typeof MapCanvas> | null>(null)
const svgEl = computed(() => canvas.value?.svgEl ?? null)
const { transform, resetView } = usePanZoom(svgEl, { dragPan: true })

watch(
  () => viewer.map,
  (map) => {
    if (map) {
      resetView(roomsBounds(map.rooms) ?? undefined)
    }
  },
  { flush: 'post' },
)

const selectedIds = computed(
  () => new Set(viewer.selectedRoomId ? [viewer.selectedRoomId] : []),
)

const cameraMarkers = computed(() => {
  const room = viewer.selectedRoom
  if (!room || room.floor !== viewer.activeFloor) {
    return []
  }
  return (room.info?.images ?? []).flatMap((image) => (image.camera ? [image.camera] : []))
})

const tooltip = ref<{ x: number; y: number; placement: Placement } | null>(null)

const tooltipElement = computed(() =>
  tooltip.value ? viewer.elementIndex.get(tooltip.value.placement.element) : undefined,
)
const tooltipNote = computed(() => {
  const note = tooltip.value?.placement.props?.note
  return typeof note === 'string' ? note : ''
})

function onPointerMove(event: PointerEvent): void {
  cancelLongPressOnMove(event)
  const hit = hitFromEventTarget(event.target)
  const hitId = hit?.kind === 'placement' ? hit.id : undefined
  // Same placement as before: only follow up with the tooltip position.
  const placement = hitId
    ? tooltip.value?.placement.id === hitId
      ? tooltip.value.placement
      : viewer.map?.placements.find((entry) => entry.id === hitId)
    : undefined
  tooltip.value = placement
    ? { x: event.clientX + TOOLTIP_OFFSET_PX, y: event.clientY + TOOLTIP_OFFSET_PX, placement }
    : null
}

function onContextMenu(event: MouseEvent): void {
  emit('openMenu', hitFromEventTarget(event.target), event)
}

let longPressTimer: number | undefined
let longPressStart: [number, number] | null = null

function onPointerDown(event: PointerEvent): void {
  if (event.pointerType !== 'touch') {
    return
  }
  longPressStart = [event.clientX, event.clientY]
  const hit = hitFromEventTarget(event.target)
  window.clearTimeout(longPressTimer)
  longPressTimer = window.setTimeout(() => emit('openMenu', hit, event), LONG_PRESS_MS)
}

function cancelLongPressOnMove(event: PointerEvent): void {
  if (
    longPressStart &&
    Math.hypot(event.clientX - longPressStart[0], event.clientY - longPressStart[1]) >
      LONG_PRESS_MOVE_TOLERANCE_PX
  ) {
    cancelLongPress()
  }
}

function cancelLongPress(): void {
  window.clearTimeout(longPressTimer)
  longPressStart = null
}
</script>

<template>
  <div class="viewer-canvas">
    <MapCanvas
      ref="canvas"
      :transform="transform"
      @pointermove="onPointerMove"
      @pointerdown="onPointerDown"
      @pointerup="cancelLongPress"
      @pointerleave="tooltip = null"
      @contextmenu.prevent="onContextMenu"
    >
      <FloorLayer
        v-if="viewer.map"
        :map="viewer.map"
        :floor="viewer.activeFloor"
        :trial-id="viewer.activeTrialId"
        :element-index="viewer.elementIndex"
        :zones="viewer.zonesById"
        :selected-ids="selectedIds"
        :hidden-categories="viewer.hiddenCategories"
      />
      <CameraMarker v-for="(camera, index) in cameraMarkers" :key="index" :camera="camera" />
    </MapCanvas>
    <div
      v-if="tooltip && tooltipElement"
      class="tooltip"
      :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px`, borderColor: tooltipElement.color }"
    >
      <span class="tooltip-name">{{ tooltipElement.name }}</span>
      <span v-if="tooltipNote" class="tooltip-note">{{ tooltipNote }}</span>
    </div>
  </div>
</template>

<style scoped>
.viewer-canvas {
  width: 100%;
  height: 100%;
}

.tooltip {
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 240px;
  padding: 6px 10px;
  border: 1px solid;
  border-radius: var(--radius-sm);
  background: var(--surface-popup);
  backdrop-filter: blur(12px);
  pointer-events: none;
}

.tooltip-name {
  font-size: 13px;
  font-weight: 600;
}

.tooltip-note {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
