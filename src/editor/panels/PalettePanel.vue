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
    <div class="search-wrap">
      <InputText v-model.trim="search" size="small" class="search-input" placeholder="Search elements…" />
      <Button
        v-if="search"
        class="search-clear"
        icon="pi pi-times"
        aria-label="Clear search"
        size="small"
        text
        severity="secondary"
        @click="search = ''"
      />
    </div>
    <p v-if="search && groups.length === 0" class="empty-hint">No elements match "{{ search }}".</p>
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
    <span
      v-tooltip.top="{ value: 'Load or create a map first', disabled: Boolean(store.document) }"
      class="new-element-wrap"
    >
      <Button
        label="New element"
        size="small"
        severity="secondary"
        class="new-element"
        :disabled="!store.document"
        @click="openCreate()"
      />
    </span>
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

.search-wrap {
  position: relative;
  display: flex;
}

.search-input {
  flex: 1;
  min-width: 0;
  padding-right: 32px;
}

.search-clear {
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
}

.empty-hint {
  margin: 4px 0;
  font-size: 12px;
  color: var(--text-muted);
}

.new-element-wrap {
  display: flex;
}

.new-element {
  flex: 1;
}
</style>
