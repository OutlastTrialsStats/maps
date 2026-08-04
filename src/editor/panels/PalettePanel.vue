<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import type { ElementDefinition } from '../../core/model/types'
import { NEEDS_DOCUMENT_HINT, useEditorStore } from '../store/editorStore'
import { groupElementsByCategory, useLibraryStore } from '../store/libraryStore'
import ElementCrudDialogs from './ElementCrudDialogs.vue'
import ElementGroupList from './ElementGroupList.vue'

const store = useEditorStore()
const libraryStore = useLibraryStore()
const crud = ref<InstanceType<typeof ElementCrudDialogs> | null>(null)

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
    <ElementGroupList
      :groups="groups"
      :active-id="store.activeElementId"
      @pick="pick"
      @edit="crud?.openEdit($event)"
      @remove="crud?.openDelete($event)"
    />
    <span
      v-tooltip.top="{ value: NEEDS_DOCUMENT_HINT, disabled: Boolean(store.document) }"
      class="new-element-wrap"
    >
      <Button
        label="New element"
        size="small"
        severity="secondary"
        class="new-element"
        :disabled="!store.document"
        @click="crud?.openCreate()"
      />
    </span>
    <ElementCrudDialogs ref="crud" @saved="pick" />
  </div>
</template>

<style scoped>
.palette {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
