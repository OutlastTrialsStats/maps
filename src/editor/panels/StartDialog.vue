<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, onMounted, ref, watch } from 'vue'
import { KEBAB_ID_PATTERN } from '../../core/constants'
import { loadMapManifest, loadMapsIndex } from '../../core/model/dataSource'
import type { MapManifest, MapRegistryEntry } from '../../core/model/types'
import { createEmptyWorkspace, loadAutosave, type AutosavePayload } from '../store/documentIO'
import { useEditorStore } from '../store/editorStore'
import TrialStep from './TrialStep.vue'

const emit = defineEmits<{ import: [] }>()

const editor = useEditorStore()

const visible = computed(() => !editor.document)
const mode = ref<'menu' | 'new' | 'trial'>('menu')
const autosave = ref<AutosavePayload | null>(null)
const registry = ref<MapRegistryEntry[]>([])
const loadError = ref('')
const loadingMapId = ref('')
const newMapId = ref('')
const newMapAuthor = ref('')
const idValid = computed(() => KEBAB_ID_PATTERN.test(newMapId.value))

/** Manifest of the map picked in step 1; the TrialStep picks or creates the trial. */
const selectedManifest = ref<MapManifest | null>(null)

const loadableMaps = computed(() => registry.value.filter((entry) => entry.enabled))
const autosaveLabel = computed(() => {
  if (!autosave.value) {
    return ''
  }
  const savedAt = new Date(autosave.value.savedAt)
  const { mapId, trialId } = autosave.value.document
  return `${mapId} / ${trialId} — ${savedAt.toLocaleString()}`
})

onMounted(async () => {
  autosave.value = loadAutosave()
  try {
    registry.value = (await loadMapsIndex()).maps
  } catch (error) {
    loadError.value = `Failed to load the map registry: ${String(error)}`
  }
})

// The dialog stays mounted; on reopen ("Open…" in the toolbar) reset the stale state.
watch(visible, (open) => {
  if (open) {
    mode.value = 'menu'
    loadError.value = ''
    selectedManifest.value = null
    autosave.value = loadAutosave()
  }
})

function continueAutosave(): void {
  if (autosave.value) {
    editor.restoreAutosave(autosave.value)
  }
}

function startNewMap(): void {
  const workspace = createEmptyWorkspace(newMapId.value, newMapAuthor.value)
  editor.setWorkspace(workspace.manifest, workspace.document, { markDirty: true })
}

async function pickMap(mapId: string): Promise<void> {
  loadingMapId.value = mapId
  loadError.value = ''
  try {
    selectedManifest.value = await loadMapManifest(mapId)
    mode.value = 'trial'
  } catch (error) {
    loadError.value = `Failed to load map "${mapId}": ${String(error)}`
  } finally {
    loadingMapId.value = ''
  }
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :closable="false"
    :draggable="false"
    header="Map Editor"
  >
    <p v-if="loadError" class="error" role="alert">{{ loadError }}</p>

    <div v-if="mode === 'menu'" class="menu">
      <Button
        v-if="autosave"
        :label="`Continue autosave (${autosaveLabel})`"
        @click="continueAutosave"
      />
      <Button label="New map" severity="secondary" @click="mode = 'new'" />
      <Button label="Import trial file" severity="secondary" @click="emit('import')" />
      <div class="existing">
        <span class="section-label">Load existing map</span>
        <Button
          v-for="entry in loadableMaps"
          :key="entry.id"
          :label="entry.name"
          severity="secondary"
          :loading="loadingMapId === entry.id"
          @click="pickMap(entry.id)"
        />
      </div>
    </div>

    <TrialStep
      v-else-if="mode === 'trial' && selectedManifest"
      :manifest="selectedManifest"
      @back="mode = 'menu'"
    />

    <div v-else class="new-form">
      <label class="field">
        <span>Map ID (kebab-case, e.g. "fun-park")</span>
        <InputText v-model.trim="newMapId" placeholder="my-map" />
      </label>
      <label class="field">
        <span>Your name (for map credits)</span>
        <InputText v-model.trim="newMapAuthor" placeholder="anonymous" />
      </label>
      <div class="actions">
        <Button label="Back" severity="secondary" text @click="mode = 'menu'" />
        <Button label="Create" :disabled="!idValid" @click="startNewMap" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.menu,
.new-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 360px;
}

.existing {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.section-label {
  font-size: 12px;
  color: var(--text-muted);
}

.field {
  gap: 4px;
  font-size: 13px;
}
</style>
