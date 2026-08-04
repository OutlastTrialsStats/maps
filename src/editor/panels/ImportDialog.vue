<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import { useToast } from 'primevue/usetoast'
import { computed, ref, watch } from 'vue'
import { TOAST_LIFE_MS } from '../../core/constants'
import type { ValidationIssue } from '../../core/model/validation'
import { importDocument } from '../store/documentIO'
import { useEditorStore } from '../store/editorStore'
import { useLibraryStore } from '../store/libraryStore'
import { useZonesStore } from '../store/zonesStore'
import IssueList from './IssueList.vue'

const visible = defineModel<boolean>('visible', { required: true })

const store = useEditorStore()
const libraryStore = useLibraryStore()
const zonesStore = useZonesStore()
const toast = useToast()

const text = ref('')
const issues = ref<ValidationIssue[]>([])
const importing = ref(false)

const replacesUnsaved = computed(() => Boolean(store.document) && store.dirty)

watch(visible, (open) => {
  if (open) {
    text.value = ''
    issues.value = []
  }
})

async function onFilePicked(event: Event): Promise<void> {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    text.value = await file.text()
  }
}

async function runImport(): Promise<void> {
  importing.value = true
  try {
    const result = await importDocument(text.value, libraryStore.library, zonesStore.zoneLibrary)
    issues.value = result.issues
    if (result.workspace) {
      const { manifest, document } = result.workspace
      store.setWorkspace(manifest, document, { markDirty: true })
      visible.value = false
      toast.add({
        severity: 'success',
        summary: `Imported "${document.mapId} / ${document.trialId}"`,
        life: TOAST_LIFE_MS,
      })
    }
  } catch (error) {
    issues.value = [{ path: '', message: `Import failed: ${String(error)}` }]
  } finally {
    importing.value = false
  }
}
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Import trial file">
    <div class="form">
      <input type="file" accept="application/json,.json" @change="onFilePicked" />
      <Textarea
        v-model="text"
        rows="10"
        class="json-input"
        placeholder="…or paste trials/<trial-id>.json content here"
      />
      <IssueList v-if="issues.length > 0" :issues="issues" />
      <p v-if="replacesUnsaved" class="replace-warning" role="alert">
        The open trial has unsaved changes — importing replaces it. The current state stays in
        the browser autosave.
      </p>
      <div class="actions">
        <Button label="Cancel" severity="secondary" text @click="visible = false" />
        <Button
          :label="replacesUnsaved ? 'Replace & import' : 'Import'"
          :severity="replacesUnsaved ? 'warn' : undefined"
          :disabled="!text.trim()"
          :loading="importing"
          @click="runImport"
        />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 420px;
}

.json-input {
  font-family: ui-monospace, Consolas, monospace;
  font-size: 12px;
}

.replace-warning {
  margin: 0;
  font-size: 12px;
  color: var(--warning);
}
</style>
