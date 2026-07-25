<script setup lang="ts">
import Button from 'primevue/button'
import { computed } from 'vue'
import { groupElementsByCategory, useLibraryStore } from '../store/libraryStore'
import ElementDialog from './ElementDialog.vue'
import PaletteElementButton from './PaletteElementButton.vue'
import UsageDeleteDialog from './UsageDeleteDialog.vue'
import { useElementCrud } from './useElementCrud'

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

const groups = computed(() => groupElementsByCategory(libraryStore.library))
</script>

<template>
  <div class="elements-manager">
    <p class="hint">
      The element library is global — edits and deletions affect every map. Categories are
      maintained by hand in elements.json.
    </p>
    <div v-for="group in groups" :key="group.id" class="group">
      <p class="group-name">{{ group.name }}</p>
      <PaletteElementButton
        v-for="element in group.elements"
        :key="element.id"
        :element="element"
        @pick="openEdit(element.id)"
        @edit="openEdit(element.id)"
        @remove="openDelete(element)"
      />
    </div>
    <Button label="New element" size="small" severity="secondary" @click="openCreate()" />
    <ElementDialog v-model:visible="showElementDialog" :element-id="editElementId" />
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
.elements-manager {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hint {
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
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
