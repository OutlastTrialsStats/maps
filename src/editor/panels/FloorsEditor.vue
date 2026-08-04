<script setup lang="ts">
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import { useEditorStore } from '../store/editorStore'

const store = useEditorStore()

const newIndex = ref<number | null>(null)
const newName = ref('')

const referencedIndexes = computed<Set<number>>(() => {
  const indexes = new Set<number>()
  const doc = store.document
  if (!doc) {
    return indexes
  }
  for (const entity of [...doc.rooms, ...doc.placements, ...doc.routes]) {
    indexes.add(entity.floor)
  }
  return indexes
})

const canAdd = computed(
  () =>
    newIndex.value !== null &&
    Number.isInteger(newIndex.value) &&
    newName.value.trim() !== '' &&
    !store.floors.some((floor) => floor.index === newIndex.value),
)

function rename(index: number, raw: string): void {
  const name = raw.trim()
  if (!name) {
    return
  }
  store.commit((doc) => {
    const floor = doc.floors.find((entry) => entry.index === index)
    if (floor) {
      floor.name = name
    }
  })
}

function canRemove(index: number): boolean {
  return store.floors.length > 1 && !referencedIndexes.value.has(index)
}

function remove(index: number): void {
  store.commit((doc) => {
    doc.floors = doc.floors.filter((floor) => floor.index !== index)
  })
  if (store.activeFloor === index) {
    store.activeFloor = store.floors[0]?.index ?? 0
  }
}

function add(): void {
  if (!canAdd.value) {
    return
  }
  const index = newIndex.value as number
  const name = newName.value.trim()
  store.commit((doc) => {
    doc.floors.push({ index, name })
    doc.floors.sort((a, b) => a.index - b.index)
  })
  newIndex.value = null
  newName.value = ''
}
</script>

<template>
  <fieldset class="panel-fieldset floors">
    <legend>Floors</legend>
    <div v-for="floor in store.floors" :key="floor.index" class="row">
      <span class="index-badge">{{ floor.index }}</span>
      <InputText
        :model-value="floor.name"
        size="small"
        class="name-input"
        @change="rename(floor.index, ($event.target as HTMLInputElement).value)"
      />
      <span v-tooltip.left="canRemove(floor.index) ? 'Remove floor' : 'In use or last floor'">
        <Button
          icon="pi pi-trash"
          aria-label="Remove floor"
          size="small"
          severity="danger"
          text
          :disabled="!canRemove(floor.index)"
          @click="remove(floor.index)"
        />
      </span>
    </div>
    <div class="add-row">
      <InputNumber
        v-model="newIndex"
        size="small"
        placeholder="Idx"
        :use-grouping="false"
        class="index-input"
      />
      <InputText
        v-model="newName"
        size="small"
        placeholder="Floor name"
        class="name-input"
        @keydown.enter="add"
      />
      <Button label="Add" size="small" severity="secondary" :disabled="!canAdd" @click="add" />
    </div>
  </fieldset>
</template>

<style scoped>
.floors {
  gap: 6px;
}

.row,
.add-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.index-badge {
  min-width: 24px;
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
}

.index-input {
  width: 70px;
}

.name-input {
  flex: 1;
  min-width: 0;
}
</style>
