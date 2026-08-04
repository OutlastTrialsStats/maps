<script setup lang="ts">
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import { computed } from 'vue'
import { useEditorStore } from '../store/editorStore'
import { useLibraryStore } from '../store/libraryStore'

const store = useEditorStore()
const libraryStore = useLibraryStore()

const filters = computed(() => store.document?.filters ?? [])
const categoryOptions = computed(() =>
  libraryStore.categories.map((entry) => ({ label: entry.name, value: entry.id })),
)

function rename(filterId: string, raw: string): void {
  const name = raw.trim()
  if (!name) {
    return
  }
  store.commit((doc) => {
    const filter = doc.filters.find((entry) => entry.id === filterId)
    if (filter) {
      filter.name = name
    }
  })
}

function setCategories(filterId: string, categories: string[]): void {
  if (categories.length === 0) {
    return
  }
  store.commit((doc) => {
    const filter = doc.filters.find((entry) => entry.id === filterId)
    if (filter) {
      filter.categories = categories
    }
  })
}

function setDefault(filterId: string, enabled: boolean): void {
  store.commit((doc) => {
    const filter = doc.filters.find((entry) => entry.id === filterId)
    if (filter) {
      if (enabled) {
        filter.default = true
      } else {
        delete filter.default
      }
    }
  })
}

function remove(filterId: string): void {
  store.commit((doc) => {
    doc.filters = doc.filters.filter((filter) => filter.id !== filterId)
  })
}

function add(): void {
  const firstCategory = libraryStore.categories[0]?.id
  if (!firstCategory) {
    return
  }
  store.commit((doc) => {
    doc.filters.push({
      id: store.generateId('filter'),
      name: 'New Filter',
      categories: [firstCategory],
      default: true,
    })
  })
}
</script>

<template>
  <fieldset class="filters">
    <legend>Viewer filters (checkbox = on by default)</legend>
    <div v-for="filter in filters" :key="filter.id" class="row">
      <Checkbox
        :model-value="filter.default === true"
        binary
        @update:model-value="setDefault(filter.id, $event as boolean)"
      />
      <InputText
        :model-value="filter.name"
        size="small"
        class="name-input"
        @change="rename(filter.id, ($event.target as HTMLInputElement).value)"
      />
      <Button
        v-tooltip.left="'Remove filter'"
        icon="pi pi-trash"
        aria-label="Remove filter"
        size="small"
        severity="danger"
        text
        @click="remove(filter.id)"
      />
      <MultiSelect
        :model-value="filter.categories"
        :options="categoryOptions"
        option-label="label"
        option-value="value"
        size="small"
        class="category-select"
        @update:model-value="setCategories(filter.id, $event)"
      />
    </div>
    <Button
      label="Add filter"
      size="small"
      severity="secondary"
      :disabled="categoryOptions.length === 0"
      @click="add"
    />
  </fieldset>
</template>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid var(--border-default);
  border-radius: 4px;
  padding: 8px;
}

.filters legend {
  font-size: 12px;
  color: var(--text-muted);
  padding: 0 4px;
}

.row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 4px 6px;
  align-items: center;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border-subtle);
}

.name-input,
.category-select {
  min-width: 0;
}

.category-select {
  grid-column: 1 / -1;
}
</style>
