<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import ColorPicker from 'primevue/colorpicker'
import { SHAPE_DEFAULT_COLOR } from '../../core/constants'
import type { MapShape } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { fromPickerHex, toPickerHex } from './colorPickerValue'

const props = defineProps<{ shape: MapShape }>()
const store = useEditorStore()

function mutateShape(mutate: (shape: MapShape) => void, coalesce?: string): void {
  store.commitOn('shape', props.shape.id, mutate, coalesce ? { coalesce } : undefined)
}

function setFilled(filled: boolean): void {
  mutateShape((shape) => {
    if (filled) {
      shape.fill = shape.color ?? SHAPE_DEFAULT_COLOR
    } else {
      delete shape.fill
    }
  })
}

function setFill(value: unknown): void {
  if (typeof value !== 'string' || !value) {
    return
  }
  mutateShape((shape) => {
    shape.fill = fromPickerHex(value, shape.fill)
  }, 'fill')
}
</script>

<template>
  <div class="field-row">
    <label class="toggle-row">
      <Checkbox
        :model-value="shape.fill !== undefined"
        binary
        @update:model-value="setFilled($event as boolean)"
      />
      <span>Filled</span>
    </label>
    <label v-if="shape.fill" class="field">
      <span class="field-label">Fill</span>
      <ColorPicker :model-value="toPickerHex(shape.fill)" @update:model-value="setFill($event)" />
    </label>
  </div>
</template>

<style scoped>
.field {
  flex: 1 1 0;
}
</style>
