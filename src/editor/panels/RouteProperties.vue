<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import type { RouteLine } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ route: RouteLine }>()
const store = useEditorStore()

/** All changes go through the document object from the store (never through the prop). */
function setName(raw: string): void {
  const name = raw.trim()
  if (name) {
    store.commitOn('route', props.route.id, (route) => {
      route.name = name
    })
  }
}

function setFloor(floor: number): void {
  store.commitOn('route', props.route.id, (route) => {
    route.floor = floor
  })
}
</script>

<template>
  <div class="route-props">
    <h3 class="panel-title">Route</h3>
    <p class="meta">{{ route.id }}</p>
    <label class="field">
      <span class="field-label">Name</span>
      <InputText
        :model-value="route.name"
        size="small"
        @change="setName(($event.target as HTMLInputElement).value)"
      />
    </label>
    <label class="field">
      <span class="field-label">Floor</span>
      <Select
        :model-value="route.floor"
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
.route-props {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meta {
  margin: 0;
  font-size: 11px;
  color: var(--text-faint);
}
</style>
