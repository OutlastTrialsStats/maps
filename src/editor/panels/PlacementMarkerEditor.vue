<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import { computed } from 'vue'
import { MARKER_DEFAULT_OFFSET } from '../../core/constants'
import type { Placement, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ placementId: string }>()
const store = useEditorStore()

const marker = computed(
  () => store.document?.placements.find((entry) => entry.id === props.placementId)?.marker,
)

function mutatePlacement(mutate: (placement: Placement) => void): void {
  store.commit((doc) => {
    const placement = doc.placements.find((entry) => entry.id === props.placementId)
    if (placement) {
      mutate(placement)
    }
  })
}

/** Next free number on this floor, so numbering does not restart at 1 every time. */
function nextLabel(): number {
  const placement = store.document?.placements.find((entry) => entry.id === props.placementId)
  const used = (store.document?.placements ?? [])
    .filter((entry) => entry.marker && entry.floor === placement?.floor)
    .map((entry) => entry.marker?.label ?? 0)
  return used.length > 0 ? Math.max(...used) + 1 : 1
}

function toggle(enabled: boolean): void {
  if (!enabled) {
    mutatePlacement((placement) => {
      delete placement.marker
    })
    return
  }
  const label = nextLabel()
  mutatePlacement((placement) => {
    placement.marker = { label, offset: [...MARKER_DEFAULT_OFFSET] }
  })
}

function setLabel(value: number | null): void {
  mutatePlacement((placement) => {
    if (placement.marker) {
      placement.marker.label = Math.round(value ?? 0)
    }
  })
}

function setOffset(axis: 0 | 1, value: number | null): void {
  mutatePlacement((placement) => {
    if (!placement.marker) {
      return
    }
    const offset: Vec2 = [...placement.marker.offset]
    offset[axis] = value ?? 0
    placement.marker.offset = offset
  })
}
</script>

<template>
  <div class="marker-editor">
    <label class="toggle-row">
      <Checkbox
        :model-value="Boolean(marker)"
        binary
        @update:model-value="toggle($event as boolean)"
      />
      <span>Number marker</span>
    </label>
    <div v-if="marker" class="field-row">
      <label class="field">
        <span class="field-label">Number</span>
        <InputNumber
          :model-value="marker.label"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="0"
          @update:model-value="setLabel($event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Badge X</span>
        <InputNumber
          :model-value="marker.offset[0]"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setOffset(0, $event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Badge Y</span>
        <InputNumber
          :model-value="marker.offset[1]"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setOffset(1, $event)"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.marker-editor {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1 1 0;
  min-width: 0;
}

.field-label {
  font-size: 12px;
  color: var(--text-muted);
}

.field-row {
  display: flex;
  gap: 6px;
}
</style>
