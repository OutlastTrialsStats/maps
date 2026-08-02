<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, onMounted, ref, watch } from 'vue'
import { KEBAB_ID_PATTERN } from '../../core/constants'
import { loadMapManifest, loadMapsIndex, loadTrialDocument } from '../../core/model/dataSource'
import type { MapManifest, MapRegistryEntry } from '../../core/model/types'
import {
  createEmptyWorkspace,
  createTrialDocument,
  ensureTrialInManifest,
  loadAutosave,
  type AutosavePayload,
} from '../store/documentIO'
import { useEditorStore } from '../store/editorStore'

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

/** Manifest of the map picked in step 1; step 2 picks or creates the trial. */
const selectedManifest = ref<MapManifest | null>(null)
const loadingTrialId = ref('')
const creatingTrial = ref(false)
const newTrialId = ref('')
const newTrialName = ref('')
const copyFromTrialId = ref<string | null>(null)
const trialIdValid = computed(
  () =>
    KEBAB_ID_PATTERN.test(newTrialId.value) &&
    !selectedManifest.value?.trials.some((trial) => trial.id === newTrialId.value),
)
const copyOptions = computed(() =>
  (selectedManifest.value?.trials ?? []).map((trial) => ({ label: trial.name, value: trial.id })),
)

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
    newTrialId.value = ''
    newTrialName.value = ''
    copyFromTrialId.value = null
    mode.value = 'trial'
  } catch (error) {
    loadError.value = `Failed to load map "${mapId}": ${String(error)}`
  } finally {
    loadingMapId.value = ''
  }
}

async function loadTrial(trialId: string): Promise<void> {
  const manifest = selectedManifest.value
  if (!manifest) {
    return
  }
  loadingTrialId.value = trialId
  loadError.value = ''
  try {
    const document = await loadTrialDocument(manifest.id, trialId)
    editor.setWorkspace(manifest, document)
  } catch (error) {
    loadError.value = `Failed to load trial "${trialId}": ${String(error)}`
  } finally {
    loadingTrialId.value = ''
  }
}

async function startNewTrial(): Promise<void> {
  const manifest = selectedManifest.value
  if (!manifest || !trialIdValid.value) {
    return
  }
  creatingTrial.value = true
  loadError.value = ''
  try {
    const source = copyFromTrialId.value
      ? await loadTrialDocument(manifest.id, copyFromTrialId.value)
      : undefined
    const document = createTrialDocument(manifest.id, newTrialId.value, source)
    ensureTrialInManifest(manifest, newTrialId.value, newTrialName.value)
    editor.setWorkspace(manifest, document, { markDirty: true })
  } catch (error) {
    loadError.value = `Failed to create trial "${newTrialId.value}": ${String(error)}`
  } finally {
    creatingTrial.value = false
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

    <div v-else-if="mode === 'trial'" class="menu">
      <span class="section-label">{{ selectedManifest?.meta.name }} — choose a trial</span>
      <Button
        v-for="trial in selectedManifest?.trials ?? []"
        :key="trial.id"
        :label="trial.default ? `${trial.name} (default)` : trial.name"
        severity="secondary"
        :loading="loadingTrialId === trial.id"
        @click="loadTrial(trial.id)"
      />
      <div class="new-trial">
        <span class="section-label">New trial</span>
        <label class="field">
          <span>Trial ID (kebab-case, e.g. "kill-the-snitch")</span>
          <InputText v-model.trim="newTrialId" placeholder="my-trial" />
        </label>
        <label class="field">
          <span>Trial name</span>
          <InputText v-model.trim="newTrialName" placeholder="My Trial" />
        </label>
        <label class="field">
          <span>Copy content from</span>
          <Select
            v-model="copyFromTrialId"
            :options="copyOptions"
            option-label="label"
            option-value="value"
            show-clear
            size="small"
            placeholder="Start empty"
          />
        </label>
      </div>
      <div class="actions">
        <Button label="Back" severity="secondary" text @click="mode = 'menu'" />
        <Button
          label="Create trial"
          :disabled="!trialIdValid"
          :loading="creatingTrial"
          @click="startNewTrial"
        />
      </div>
    </div>

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

.existing,
.new-trial {
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
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.error {
  color: var(--danger);
}
</style>
