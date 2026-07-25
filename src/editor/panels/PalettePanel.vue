<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import type { ElementDefinition } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { groupElementsByCategory, useLibraryStore } from '../store/libraryStore'
import ElementDialog from './ElementDialog.vue'
import PaletteElementButton from './PaletteElementButton.vue'
import UsageDeleteDialog from './UsageDeleteDialog.vue'
import { useElementCrud } from './useElementCrud'

const store = useEditorStore()
const libraryStore = useLibraryStore()
const {
  showElementDialog,
  editElementId,
  showDeleteDialog,
  deleteTarget,
  usage,
  usageLoading,
  cascadeHint,
  openCreate,
  openEdit,
  openDelete,
  confirmDelete,
} = useElementCrud()

const search = ref('')

const groups = computed(() => {
  const query = search.value.trim().toLowerCase()
  const matches = (element: ElementDefinition): boolean =>
    !query || element.name.toLowerCase().includes(query) || element.id.includes(query)
  return groupElementsByCategory(libraryStore.library, matches)
})

function pick(elementId: string): void {
  store.activeElementId = elementId
  store.activeTool = 'placement'
}
</script>

<template>
  <div class="palette">
    <InputText v-model.trim="search" size="small" placeholder="Search elements…" />
    <div v-for="group in groups" :key="group.id" class="group">
      <p class="group-name">{{ group.name }}</p>
      <PaletteElementButton
        v-for="element in group.elements"
        :key="element.id"
        :element="element"
        :active="store.activeElementId === element.id"
        @pick="pick(element.id)"
        @edit="openEdit(element.id)"
        @remove="openDelete(element)"
      />
    </div>
    <Button
      label="New element"
      size="small"
      severity="secondary"
      :disabled="!store.document"
      @click="openCreate()"
    />
    <ElementDialog v-model:visible="showElementDialog" :element-id="editElementId" @saved="pick" />
    <UsageDeleteDialog
      v-model:visible="showDeleteDialog"
      header="Delete element"
      :target-label="deleteTarget?.name ?? ''"
      :usage="usage"
      :loading="usageLoading"
      :cascade-hint="cascadeHint"
      @confirm="confirmDelete()"
    />
  </div>
</template>

<style scoped>
.palette {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.group-name {
  margin: 4px 0 2px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-faint);
}
</style>
