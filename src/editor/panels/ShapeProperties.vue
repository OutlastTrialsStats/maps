<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import ColorPicker from 'primevue/colorpicker'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import { computed } from 'vue'
import {
  ROTATION_VALUES,
  SHAPE_DEFAULT_COLOR,
  SHAPE_DEFAULT_STROKE_WIDTH,
} from '../../core/constants'
import { isCircleShape, isLineShape, isRectShape } from '../../core/model/shapes'
import type { MapShape, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ shape: MapShape }>()
const store = useEditorStore()

const rotationOptions = ROTATION_VALUES.map((value) => ({ label: `${value}°`, value }))

const title = computed(() =>
  isCircleShape(props.shape) ? 'Circle' : isRectShape(props.shape) ? 'Rectangle' : 'Line',
)
const positioned = computed(() => (isLineShape(props.shape) ? null : props.shape))
const circle = computed(() => (isCircleShape(props.shape) ? props.shape : null))
const rect = computed(() => (isRectShape(props.shape) ? props.shape : null))

const effectiveColor = computed(() => props.shape.color ?? SHAPE_DEFAULT_COLOR)

/** All changes go through the document object from the store (never through the prop). */
function mutateShape(mutate: (shape: MapShape) => void, coalesce?: string): void {
  store.commitOn('shape', props.shape.id, mutate, coalesce ? { coalesce } : undefined)
}

/** The PrimeVue ColorPicker returns hex without "#". */
function setColor(value: unknown): void {
  if (typeof value !== 'string' || !value) {
    return
  }
  const color = `#${value}`
  mutateShape((shape) => {
    if (color === SHAPE_DEFAULT_COLOR) {
      delete shape.color
    } else {
      shape.color = color
    }
  }, 'color')
}

function setThickness(value: number | null): void {
  const width = value && value > 0 ? value : SHAPE_DEFAULT_STROKE_WIDTH
  mutateShape((shape) => {
    if (width === SHAPE_DEFAULT_STROKE_WIDTH) {
      delete shape.strokeWidth
    } else {
      shape.strokeWidth = width
    }
  }, 'strokeWidth')
}

function setDashed(dashed: boolean): void {
  mutateShape((shape) => {
    if (dashed) {
      shape.dashed = true
    } else {
      delete shape.dashed
    }
  })
}

function setFloor(floor: number): void {
  mutateShape((shape) => {
    shape.floor = floor
  })
  store.activeFloor = floor
}

function setPos(axis: 0 | 1, value: number | null): void {
  mutateShape((shape) => {
    if (!isLineShape(shape)) {
      const pos: Vec2 = [...shape.pos]
      pos[axis] = value ?? 0
      shape.pos = pos
    }
  }, `pos${axis}`)
}

function setRadius(value: number | null): void {
  if (!value || value <= 0) {
    return
  }
  mutateShape((shape) => {
    if (isCircleShape(shape)) {
      shape.radius = value
    }
  }, 'radius')
}

function setSize(axis: 0 | 1, value: number | null): void {
  if (!value || value <= 0) {
    return
  }
  mutateShape((shape) => {
    if (isRectShape(shape)) {
      const size: Vec2 = [...shape.size]
      size[axis] = value
      shape.size = size
    }
  }, `size${axis}`)
}

function setRotation(value: number | null): void {
  mutateShape((shape) => {
    if (!isRectShape(shape)) {
      return
    }
    if (!value) {
      delete shape.rotation
    } else {
      shape.rotation = value
    }
  })
}
</script>

<template>
  <div class="shape-props">
    <h3 class="panel-title">{{ title }}</h3>
    <p class="meta">{{ shape.id }}</p>
    <div v-if="positioned" class="field-row">
      <label class="field">
        <span class="field-label">X</span>
        <InputNumber
          :model-value="positioned.pos[0]"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setPos(0, $event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Y</span>
        <InputNumber
          :model-value="positioned.pos[1]"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setPos(1, $event)"
        />
      </label>
      <label v-if="circle" class="field">
        <span class="field-label">Radius</span>
        <InputNumber
          :model-value="circle.radius"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          :min="0.5"
          @update:model-value="setRadius($event)"
        />
      </label>
    </div>
    <div v-if="rect" class="field-row">
      <label class="field">
        <span class="field-label">Width</span>
        <InputNumber
          :model-value="rect.size[0]"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          :min="0.5"
          @update:model-value="setSize(0, $event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Height</span>
        <InputNumber
          :model-value="rect.size[1]"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          :min="0.5"
          @update:model-value="setSize(1, $event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Rotation</span>
        <Select
          :model-value="rect.rotation ?? 0"
          :options="rotationOptions"
          option-label="label"
          option-value="value"
          size="small"
          fluid
          @update:model-value="setRotation($event)"
        />
      </label>
    </div>
    <div class="field-row">
      <label class="field color-field">
        <span class="field-label">Color</span>
        <ColorPicker :model-value="effectiveColor.slice(1)" @update:model-value="setColor($event)" />
      </label>
      <label class="field">
        <span class="field-label">Thickness</span>
        <InputNumber
          :model-value="shape.strokeWidth ?? SHAPE_DEFAULT_STROKE_WIDTH"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          :min="0.5"
          @update:model-value="setThickness($event)"
        />
      </label>
      <label class="toggle-row">
        <Checkbox
          :model-value="Boolean(shape.dashed)"
          binary
          @update:model-value="setDashed($event as boolean)"
        />
        <span>Dashed</span>
      </label>
    </div>
    <label class="field">
      <span class="field-label">Floor</span>
      <Select
        :model-value="shape.floor"
        :options="store.floorOptions"
        option-label="label"
        option-value="value"
        size="small"
        @update:model-value="setFloor($event)"
      />
    </label>
  </div>
</template>

<style scoped>
.shape-props {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meta {
  margin: 0;
  font-size: 11px;
  color: var(--text-faint);
}

.field-row .field {
  flex: 1 1 0;
}

.color-field {
  flex: 0 0 auto;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: flex-end;
  padding-bottom: 4px;
  font-size: 13px;
}
</style>
