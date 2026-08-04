<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, ref } from 'vue'
import { KEBAB_ID_PATTERN } from '../../core/constants'
import { loadTrialDocument } from '../../core/model/dataSource'
import type { MapManifest } from '../../core/model/types'
import { createTrialDocument, ensureTrialInManifest } from '../store/documentIO'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ manifest: MapManifest }>()
const emit = defineEmits<{ back: [] }>()

const editor = useEditorStore()

const loadError = ref('')
const loadingTrialId = ref('')
const creatingTrial = ref(false)
const newTrialId = ref('')
const newTrialName = ref('')
const copyFromTrialId = ref<string | null>(null)

const trialIdValid = computed(
  () =>
    KEBAB_ID_PATTERN.test(newTrialId.value) &&
    !props.manifest.trials.some((trial) => trial.id === newTrialId.value),
)
const copyOptions = computed(() =>
  props.manifest.trials.map((trial) => ({ label: trial.name, value: trial.id })),
)

async function loadTrial(trialId: string): Promise<void> {
  loadingTrialId.value = trialId
  loadError.value = ''
  try {
    const document = await loadTrialDocument(props.manifest.id, trialId)
    editor.setWorkspace(props.manifest, document)
  } catch (error) {
    loadError.value = `Failed to load trial "${trialId}": ${String(error)}`
  } finally {
    loadingTrialId.value = ''
  }
}

async function startNewTrial(): Promise<void> {
  if (!trialIdValid.value) {
    return
  }
  creatingTrial.value = true
  loadError.value = ''
  try {
    const source = copyFromTrialId.value
      ? await loadTrialDocument(props.manifest.id, copyFromTrialId.value)
      : undefined
    const document = createTrialDocument(props.manifest.id, newTrialId.value, source)
    ensureTrialInManifest(props.manifest, newTrialId.value, newTrialName.value)
    editor.setWorkspace(props.manifest, document, { markDirty: true })
  } catch (error) {
    loadError.value = `Failed to create trial "${newTrialId.value}": ${String(error)}`
  } finally {
    creatingTrial.value = false
  }
}
</script>

<template>
  <div class="trial-step">
    <p v-if="loadError" class="error" role="alert">{{ loadError }}</p>
    <span class="section-label">{{ manifest.meta.name }} — choose a trial</span>
    <Button
      v-for="trial in manifest.trials"
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
      <Button label="Back" severity="secondary" text @click="emit('back')" />
      <Button
        label="Create trial"
        :disabled="!trialIdValid"
        :loading="creatingTrial"
        @click="startNewTrial"
      />
    </div>
  </div>
</template>

<style scoped>
.trial-step {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 360px;
}

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
  gap: 4px;
  font-size: 13px;
}
</style>
