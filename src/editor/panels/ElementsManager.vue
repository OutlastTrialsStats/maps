<script setup lang="ts">
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import { groupElementsByCategory, useLibraryStore } from '../store/libraryStore'
import ElementCrudDialogs from './ElementCrudDialogs.vue'
import ElementGroupList from './ElementGroupList.vue'

const libraryStore = useLibraryStore()
const crud = ref<InstanceType<typeof ElementCrudDialogs> | null>(null)

const groups = computed(() => groupElementsByCategory(libraryStore.library))
</script>

<template>
  <div class="elements-manager">
    <p class="hint">
      The element library is global — edits and deletions affect every map. Categories are
      maintained by hand in elements.json.
    </p>
    <ElementGroupList
      :groups="groups"
      @pick="crud?.openEdit($event)"
      @edit="crud?.openEdit($event)"
      @remove="crud?.openDelete($event)"
    />
    <Button label="New element" size="small" severity="secondary" @click="crud?.openCreate()" />
    <ElementCrudDialogs ref="crud" />
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
</style>
