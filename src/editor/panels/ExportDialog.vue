<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import { ref, watch } from 'vue'
import { TOAST_LIFE_MS } from '../../core/constants'
import type { ValidationIssue } from '../../core/model/validation'
import { downloadJson, serializeJson } from '../store/documentIO'
import { useExportArtifacts, type ExportArtifact } from '../store/useExportArtifacts'
import ExportArtifactRow from './ExportArtifactRow.vue'
import IssueList from './IssueList.vue'

const visible = defineModel<boolean>('visible', { required: true })

const toast = useToast()
const { artifacts, validateAll, commitExports } = useExportArtifacts()

const validating = ref(false)
const issues = ref<ValidationIssue[]>([])
/** Frozen while the dialog is open so no row disappears mid-session. */
const sessionArtifacts = ref<ExportArtifact[]>([])
const exported = ref(new Set<string>())

watch(visible, async (open) => {
  if (!open) {
    commitExports(exported.value)
    sessionArtifacts.value = []
    exported.value = new Set()
    return
  }
  sessionArtifacts.value = artifacts.value
  exported.value = new Set()
  validating.value = true
  try {
    issues.value = await validateAll()
  } catch (error) {
    issues.value = [{ path: '', message: `Validation failed: ${String(error)}` }]
  } finally {
    validating.value = false
  }
})

function download(artifact: ExportArtifact): void {
  downloadJson(artifact.filename, artifact.data)
  exported.value.add(artifact.filename)
  toast.add({
    severity: 'success',
    summary: `${artifact.filename} downloaded`,
    detail: `Place it at ${artifact.repoPath} in your pull request.`,
    life: TOAST_LIFE_MS,
  })
}

async function copy(artifact: ExportArtifact): Promise<void> {
  try {
    await navigator.clipboard.writeText(serializeJson(artifact.data))
    exported.value.add(artifact.filename)
    toast.add({
      severity: 'success',
      summary: `${artifact.filename} copied to clipboard`,
      life: TOAST_LIFE_MS,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Copy failed',
      detail: String(error),
      life: TOAST_LIFE_MS,
    })
  }
}
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Export" class="export-dialog">
    <p v-if="validating">Validating…</p>
    <template v-else-if="issues.length > 0">
      <p class="error-intro">Fix these issues before exporting:</p>
      <IssueList :issues="issues" />
    </template>
    <template v-else>
      <p>
        Validation passed. Download each file (or copy its content) and submit everything as one
        pull request — the repository paths are shown per file. Screenshots go into the map's
        <code>img/</code> folder. See <code>docs/05-contribution-workflow.md</code> for details.
      </p>
      <div class="artifact-list">
        <ExportArtifactRow
          v-for="artifact in sessionArtifacts"
          :key="artifact.filename"
          :artifact="artifact"
          :exported="exported.has(artifact.filename)"
          @download="download(artifact)"
          @copy="copy(artifact)"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.export-dialog p {
  max-width: 460px;
}

.error-intro {
  color: var(--danger);
}

p code {
  color: var(--warning);
}

.artifact-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}
</style>
