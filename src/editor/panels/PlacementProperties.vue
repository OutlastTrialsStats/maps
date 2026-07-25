<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import { computed } from 'vue'
import { ROTATION_VALUES } from '../../core/constants'
import { STRUCTURAL_META } from '../../core/render/structuralShapes'
import type { MapDefinition, Placement, Visibility } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { useLibraryStore } from '../store/libraryStore'
import PropsSchemaForm from './PropsSchemaForm.vue'
import VisibilityEditor from './VisibilityEditor.vue'

const props = defineProps<{ placement: Placement }>()
const store = useEditorStore()
const libraryStore = useLibraryStore()

const rotationOptions = ROTATION_VALUES.map((value) => ({ label: `${value}°`, value }))

const element = computed(() => libraryStore.elementIndex.get(props.placement.element))

const structural = computed(() => {
  const render = element.value?.render
  return render && STRUCTURAL_META[render.kind].resizable ? render : undefined
})

const roomOptions = computed(() => [
  { label: '(no room)', value: null as string | null },
  ...(store.document?.rooms ?? [])
    .filter((room) => room.floor === props.placement.floor)
    .map((room) => ({ label: room.info?.title ?? room.id, value: room.id as string | null })),
])

/** All changes go through the document object from the store (never through the prop). */
function mutatePlacement(mutate: (placement: Placement, doc: MapDefinition) => void): void {
  store.commit((doc) => {
    const placement = doc.placements.find((entry) => entry.id === props.placement.id)
    if (placement) {
      mutate(placement, doc)
    }
  })
}

function setPos(axis: 0 | 1, value: number | null): void {
  mutatePlacement((placement) => {
    const pos: [number, number] = [...placement.pos]
    pos[axis] = value ?? 0
    placement.pos = pos
  })
}

function setRotation(value: number | null): void {
  mutatePlacement((placement) => {
    if (!value) {
      delete placement.rotation
    } else {
      placement.rotation = value
    }
  })
}

function setSize(axis: 0 | 1, value: number | null): void {
  const render = structural.value
  if (!render) {
    return
  }
  const defaults: [number, number] = [render.length, render.thickness]
  mutatePlacement((placement) => {
    const size: [number, number] = [
      placement.size?.[0] ?? defaults[0],
      placement.size?.[1] ?? defaults[1],
    ]
    size[axis] = value && value > 0 ? value : defaults[axis]
    if (size[0] === defaults[0] && size[1] === defaults[1]) {
      delete placement.size
    } else {
      placement.size = size
    }
  })
}

function setRoomId(roomId: string | null): void {
  mutatePlacement((placement) => {
    if (roomId) {
      placement.roomId = roomId
    } else {
      delete placement.roomId
    }
  })
}

function setVisibility(visibility: Visibility | undefined): void {
  mutatePlacement((placement) => {
    if (visibility) {
      placement.visibility = visibility
    } else {
      delete placement.visibility
    }
  })
}

function setProps(value: Placement['props']): void {
  mutatePlacement((placement) => {
    if (value) {
      placement.props = value
    } else {
      delete placement.props
    }
  })
}
</script>

<template>
  <div class="placement-props">
    <h3>{{ element?.name ?? placement.element }}</h3>
    <p class="meta">{{ placement.id }}</p>
    <div class="field-row">
      <label class="field">
        <span class="field-label">X</span>
        <InputNumber
          :model-value="placement.pos[0]"
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
          :model-value="placement.pos[1]"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setPos(1, $event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Rotation</span>
        <Select
          :model-value="placement.rotation ?? 0"
          :options="rotationOptions"
          option-label="label"
          option-value="value"
          size="small"
          fluid
          @update:model-value="setRotation($event)"
        />
      </label>
    </div>
    <div v-if="structural" class="field-row">
      <label class="field">
        <span class="field-label">Length</span>
        <InputNumber
          :model-value="placement.size?.[0] ?? structural.length"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          :min="0.5"
          @update:model-value="setSize(0, $event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Width</span>
        <InputNumber
          :model-value="placement.size?.[1] ?? structural.thickness"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          :min="0.5"
          @update:model-value="setSize(1, $event)"
        />
      </label>
    </div>
    <label class="field">
      <span class="field-label">Room</span>
      <Select
        :model-value="placement.roomId ?? null"
        :options="roomOptions"
        option-label="label"
        option-value="value"
        size="small"
        @update:model-value="setRoomId($event)"
      />
    </label>
    <VisibilityEditor
      :model-value="placement.visibility"
      :trials="store.trials"
      @update:model-value="setVisibility"
    />
    <template v-if="element?.propsSchema">
      <span class="field-label">Properties</span>
      <PropsSchemaForm
        :schema="element.propsSchema"
        :model-value="placement.props"
        @update:model-value="setProps"
      />
    </template>
  </div>
</template>

<style scoped>
.placement-props {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h3 {
  margin: 0;
  font-size: 14px;
}

.meta {
  margin: 0;
  font-size: 11px;
  color: var(--text-faint);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 2px;
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

.field-row .field {
  flex: 1 1 0;
}
</style>
