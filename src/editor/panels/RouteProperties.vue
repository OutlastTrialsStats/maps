<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed } from 'vue'
import type { RouteLine } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ route: RouteLine }>()
const store = useEditorStore()

const floorOptions = computed(() =>
  store.floors.map((floor) => ({ label: floor.name, value: floor.index })),
)

/** All changes go through the document object from the store (never through the prop). */
function mutateRoute(mutate: (route: RouteLine) => void): void {
  store.commit((doc) => {
    const route = doc.routes.find((entry) => entry.id === props.route.id)
    if (route) {
      mutate(route)
    }
  })
}

function setName(raw: string): void {
  const name = raw.trim()
  if (name) {
    mutateRoute((route) => {
      route.name = name
    })
  }
}

function setFloor(floor: number): void {
  mutateRoute((route) => {
    route.floor = floor
  })
}
</script>

<template>
  <div class="route-props">
    <h3>Route</h3>
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
        :options="floorOptions"
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
}

.field-label {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
