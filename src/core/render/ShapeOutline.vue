<script setup lang="ts">
import { computed } from 'vue'
import {
  SELECTION_COLOR,
  SHAPE_DEFAULT_COLOR,
  SHAPE_DEFAULT_STROKE_WIDTH,
  SHAPE_LINE_DASH,
} from '../constants'
import { isCircleShape, isRectShape } from '../model/shapes'
import type { MapShape } from '../model/types'

const props = defineProps<{
  shape: MapShape
  selected?: boolean
  /** Adds an invisible wide stroke so the thin outline is clickable (editor). */
  hitArea?: boolean
}>()

const geometry = computed(() => {
  const shape = props.shape
  if (isCircleShape(shape)) {
    return { is: 'circle', attrs: { cx: shape.pos[0], cy: shape.pos[1], r: shape.radius } }
  }
  if (isRectShape(shape)) {
    const [cx, cy] = shape.pos
    const [width, height] = shape.size
    return {
      is: 'rect',
      attrs: {
        x: cx - width / 2,
        y: cy - height / 2,
        width,
        height,
        transform: shape.rotation ? `rotate(${shape.rotation} ${cx} ${cy})` : undefined,
      },
    }
  }
  return { is: 'path', attrs: { d: shape.path } }
})

const strokeAttrs = computed(() => ({
  stroke: props.selected ? SELECTION_COLOR : (props.shape.color ?? SHAPE_DEFAULT_COLOR),
  'stroke-width': props.shape.strokeWidth ?? SHAPE_DEFAULT_STROKE_WIDTH,
  'stroke-dasharray': props.shape.dashed ? SHAPE_LINE_DASH : undefined,
}))
</script>

<template>
  <g data-entity-kind="shape" :data-entity-id="shape.id">
    <component :is="geometry.is" v-if="hitArea" v-bind="geometry.attrs" class="shape-hit" />
    <component
      :is="geometry.is"
      v-bind="{ ...geometry.attrs, ...strokeAttrs }"
      class="shape-outline"
    />
  </g>
</template>

<style scoped>
.shape-outline {
  fill: none;
  stroke-linecap: square;
  pointer-events: none;
}

.shape-hit {
  fill: none;
  stroke: transparent;
  stroke-width: 12;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
</style>
