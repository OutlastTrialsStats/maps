<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import ColorPicker from 'primevue/colorpicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import { computed } from 'vue'
import { ICON_FILE_PATTERN, MARKER_COLOR, MARKER_DEFAULT_OFFSET } from '../../core/constants'
import { elementIconUrl, toIconFileName } from '../../core/model/dataSource'
import type { CalloutMarker, Placement, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ placementId: string }>()
const store = useEditorStore()

type MarkerContent = { label: number } | { icon: string }
type MarkerMode = 'label' | 'icon'

const modeOptions: Array<{ label: string; value: MarkerMode }> = [
  { label: 'Number', value: 'label' },
  { label: 'Icon', value: 'icon' },
]

const marker = computed(
  () => store.document?.placements.find((entry) => entry.id === props.placementId)?.marker,
)
const mode = computed<MarkerMode>(() => (marker.value && 'icon' in marker.value ? 'icon' : 'label'))
const label = computed(() => (marker.value && 'label' in marker.value ? marker.value.label : null))
const icon = computed(() => (marker.value && 'icon' in marker.value ? marker.value.icon : null))

const iconValid = computed(() => icon.value === null || ICON_FILE_PATTERN.test(icon.value))
const iconPreview = computed(() =>
  iconValid.value && icon.value ? elementIconUrl(icon.value) : undefined,
)

const markerColor = computed(() => marker.value?.color ?? MARKER_COLOR)
const lineColor = computed(() => marker.value?.lineColor ?? markerColor.value)

function mutatePlacement(mutate: (placement: Placement) => void): void {
  store.commit((doc) => {
    const placement = doc.placements.find((entry) => entry.id === props.placementId)
    if (placement) {
      mutate(placement)
    }
  })
}

function mutateMarker(mutate: (marker: CalloutMarker) => void): void {
  mutatePlacement((placement) => {
    if (placement.marker) {
      mutate(placement.marker)
    }
  })
}

/** Next free number on this floor, so numbering does not restart at 1 every time. */
function nextLabel(): number {
  const placement = store.document?.placements.find((entry) => entry.id === props.placementId)
  const used = (store.document?.placements ?? [])
    .filter((entry) => entry.floor === placement?.floor)
    .map((entry) => entry.marker)
    .filter((entry): entry is Extract<CalloutMarker, { label: number }> =>
      Boolean(entry && 'label' in entry),
    )
    .map((entry) => entry.label)
  return used.length > 0 ? Math.max(...used) + 1 : 1
}

function replaceContent(content: MarkerContent): void {
  mutatePlacement((placement) => {
    const current = placement.marker
    if (!current) {
      return
    }
    const next: CalloutMarker = { ...content, offset: current.offset }
    if (current.color !== undefined) {
      next.color = current.color
    }
    if (current.lineColor !== undefined) {
      next.lineColor = current.lineColor
    }
    if (current.lineDashed) {
      next.lineDashed = true
    }
    placement.marker = next
  })
}

function toggle(enabled: boolean): void {
  if (!enabled) {
    mutatePlacement((placement) => {
      delete placement.marker
    })
    return
  }
  const nextNumber = nextLabel()
  mutatePlacement((placement) => {
    placement.marker = { label: nextNumber, offset: [...MARKER_DEFAULT_OFFSET] }
  })
}

function setMode(value: MarkerMode): void {
  if (value === mode.value) {
    return
  }
  replaceContent(value === 'icon' ? { icon: '' } : { label: nextLabel() })
}

function setLabel(value: number | null): void {
  mutateMarker((entry) => {
    if ('label' in entry) {
      entry.label = Math.round(value ?? 0)
    }
  })
}

function setIcon(value: string | undefined): void {
  const name = toIconFileName((value ?? '').trim())
  mutateMarker((entry) => {
    if ('icon' in entry) {
      entry.icon = name
    }
  })
}

function setOffset(axis: 0 | 1, value: number | null): void {
  mutateMarker((entry) => {
    const offset: Vec2 = [...entry.offset]
    offset[axis] = value ?? 0
    entry.offset = offset
  })
}

/** The PrimeVue ColorPicker returns hex without "#". */
function setColor(value: unknown): void {
  if (typeof value !== 'string' || !value) {
    return
  }
  const color = `#${value}`
  mutateMarker((entry) => {
    if (color === MARKER_COLOR) {
      delete entry.color
    } else {
      entry.color = color
    }
  })
}

function setLineColor(value: unknown): void {
  if (typeof value !== 'string' || !value) {
    return
  }
  const color = `#${value}`
  mutateMarker((entry) => {
    if (color === (entry.color ?? MARKER_COLOR)) {
      delete entry.lineColor
    } else {
      entry.lineColor = color
    }
  })
}

function setDashed(dashed: boolean): void {
  mutateMarker((entry) => {
    if (dashed) {
      entry.lineDashed = true
    } else {
      delete entry.lineDashed
    }
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
      <span>Marker</span>
    </label>
    <template v-if="marker">
      <SelectButton
        :model-value="mode"
        :options="modeOptions"
        option-label="label"
        option-value="value"
        :allow-empty="false"
        size="small"
        @update:model-value="setMode($event as MarkerMode)"
      />
      <label v-if="mode === 'label'" class="field">
        <span class="field-label">Number</span>
        <InputNumber
          :model-value="label"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="0"
          @update:model-value="setLabel($event)"
        />
      </label>
      <label v-else class="field">
        <span class="field-label">Icon file name (game-assets, without .webp)</span>
        <InputText
          :model-value="icon ?? ''"
          size="small"
          placeholder="objectif_key"
          @update:model-value="setIcon($event)"
        />
        <small v-if="!iconValid || icon === ''" class="field-error">
          Only a bare file name is allowed (no path, no .webp).
        </small>
        <img v-if="iconPreview" :src="iconPreview" alt="" class="icon-preview" />
      </label>
      <div class="field-row">
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
      <div class="field-row">
        <label class="field color-field">
          <span class="field-label">Marker color</span>
          <ColorPicker
            :model-value="markerColor.slice(1)"
            @update:model-value="setColor($event)"
          />
        </label>
        <label class="field color-field">
          <span class="field-label">Line color</span>
          <ColorPicker
            :model-value="lineColor.slice(1)"
            @update:model-value="setLineColor($event)"
          />
        </label>
        <label class="toggle-row dashed-toggle">
          <Checkbox
            :model-value="Boolean(marker.lineDashed)"
            binary
            @update:model-value="setDashed($event as boolean)"
          />
          <span>Dashed line</span>
        </label>
      </div>
    </template>
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

.color-field {
  flex: 0 0 auto;
}

.dashed-toggle {
  align-self: flex-end;
  padding-bottom: 4px;
}

.field-label {
  font-size: 12px;
  color: var(--text-muted);
}

.field-error {
  font-size: 11px;
  color: var(--danger);
}

.icon-preview {
  width: 32px;
  height: 32px;
  margin-top: 4px;
  object-fit: contain;
}

.field-row {
  display: flex;
  gap: 6px;
}
</style>
