<script setup lang="ts">
import { computed } from 'vue'
import { VERTEX_HIT_RADIUS } from '../core/constants'
import type { ElementIndex } from '../core/model/elementIndex'
import { pointsToOpenPath } from '../core/model/roomPath'
import type { Placement, Vec2 } from '../core/model/types'
import PlacementMarker from '../core/render/PlacementMarker.vue'
import type { ToolOverlay } from './tools/toolTypes'

const props = defineProps<{
  overlay: ToolOverlay | null
  elementIndex: ElementIndex
}>()

const HANDLE_RADIUS = VERTEX_HIT_RADIUS / 2

const polyline = computed(() => (props.overlay?.kind === 'polyline' ? props.overlay : null))
const rect = computed(() => (props.overlay?.kind === 'rect' ? props.overlay : null))
const vertices = computed(() => (props.overlay?.kind === 'vertices' ? props.overlay : null))
const ghost = computed(() => (props.overlay?.kind === 'ghost' ? props.overlay : null))

const previewPathD = computed(() => {
  if (!polyline.value?.preview || polyline.value.points.length === 0) {
    return ''
  }
  const points = polyline.value.points
  const anchor = polyline.value.activeEnd === 'head' ? points[0] : points[points.length - 1]
  return `M${anchor[0]},${anchor[1]}L${polyline.value.preview[0]},${polyline.value.preview[1]}`
})

const activeEndIndex = computed(() => {
  if (!polyline.value?.activeEnd) {
    return null
  }
  return polyline.value.activeEnd === 'head' ? 0 : polyline.value.points.length - 1
})

const rectBounds = computed(() => {
  if (!rect.value) {
    return null
  }
  const { from, to } = rect.value
  return {
    x: Math.min(from[0], to[0]),
    y: Math.min(from[1], to[1]),
    width: Math.abs(to[0] - from[0]),
    height: Math.abs(to[1] - from[1]),
  }
})

const midpoints = computed<Vec2[]>(() => {
  const points = vertices.value?.points
  if (!points) {
    return []
  }
  return points.map((point, index): Vec2 => {
    const next = points[(index + 1) % points.length]
    return [(point[0] + next[0]) / 2, (point[1] + next[1]) / 2]
  })
})

const ghostPlacement = computed<Placement | null>(() =>
  ghost.value
    ? {
        id: 'ghost-preview',
        element: ghost.value.elementId,
        floor: 0,
        pos: ghost.value.pos,
        rotation: ghost.value.rotation || undefined,
      }
    : null,
)
const ghostElement = computed(() =>
  ghost.value ? props.elementIndex.get(ghost.value.elementId) : undefined,
)
</script>

<template>
  <g class="tool-overlay">
    <template v-if="polyline">
      <path :d="pointsToOpenPath(polyline.points)" class="draw-line" />
      <path v-if="previewPathD" :d="previewPathD" class="draw-preview" />
      <circle
        v-for="(point, index) in polyline.points"
        :key="index"
        :cx="point[0]"
        :cy="point[1]"
        :r="HANDLE_RADIUS"
        class="handle"
        :class="{ first: index === 0, 'active-end': index === activeEndIndex }"
      />
    </template>
    <rect
      v-else-if="rectBounds"
      :x="rectBounds.x"
      :y="rectBounds.y"
      :width="rectBounds.width"
      :height="rectBounds.height"
      class="draw-rect"
    />
    <template v-else-if="vertices">
      <g :transform="`translate(${vertices.origin[0]},${vertices.origin[1]})`">
        <polygon :points="vertices.points.map((p) => p.join(',')).join(' ')" class="vertex-outline" />
        <rect
          v-for="(mid, index) in midpoints"
          :key="`m${index}`"
          :x="mid[0] - HANDLE_RADIUS / 2"
          :y="mid[1] - HANDLE_RADIUS / 2"
          :width="HANDLE_RADIUS"
          :height="HANDLE_RADIUS"
          class="midpoint"
        />
        <circle
          v-for="(point, index) in vertices.points"
          :key="`v${index}`"
          :cx="point[0]"
          :cy="point[1]"
          :r="HANDLE_RADIUS"
          class="handle"
          :class="{ active: index === vertices.activeIndex }"
        />
      </g>
    </template>
    <g v-else-if="ghostPlacement" class="ghost">
      <PlacementMarker :placement="ghostPlacement" :element="ghostElement" />
    </g>
  </g>
</template>

<style scoped>
.tool-overlay {
  pointer-events: none;
}

.draw-line,
.vertex-outline {
  fill: none;
  stroke: var(--color-selection);
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
}

.draw-preview {
  fill: none;
  stroke: var(--color-selection);
  stroke-width: 1;
  stroke-dasharray: 4 3;
  vector-effect: non-scaling-stroke;
}

.draw-rect {
  fill: var(--color-selection-soft);
  stroke: var(--color-selection);
  stroke-width: 1.5;
  stroke-dasharray: 4 3;
  vector-effect: non-scaling-stroke;
}

.handle {
  fill: #16171d;
  stroke: var(--color-selection);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.handle.first {
  fill: var(--color-selection);
}

.handle.active-end {
  fill: #e0913c;
  stroke: #e0913c;
}

.handle.active {
  fill: #e0913c;
  stroke: #e0913c;
}

.midpoint {
  fill: #16171d;
  stroke: #8ab4e8;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.ghost {
  opacity: 0.6;
}
</style>
