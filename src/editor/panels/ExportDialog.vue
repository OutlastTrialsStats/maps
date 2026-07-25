<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import { ref, watch } from 'vue'
import type { ValidationIssue } from '../../core/model/validation'
import { downloadJson, serializeJson } from '../store/documentIO'
import { useExportArtifacts, type ExportArtifact } from '../store/useExportArtifacts'
import ExportArtifactRow from './ExportArtifactRow.vue'
import IssueList from './IssueList.vue'

const visible = defineModel<boolean>('visible', { required: true })

const toast = useToast()
const { artifacts, validateAll } = useExportArtifacts()

const validating = ref(false)
const issues = ref<ValidationIssue[]>([])

watch(visible, async (open) => {
  if (!open) {
    return
  }
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
  artifact.onExported()
  toast.add({
    severity: 'success',
    summary: `${artifact.filename} downloaded`,
    detail: `Place it at ${artifact.repoPath} in your pull request.`,
    life: 5000,
  })
}

async function copy(artifact: ExportArtifact): Promise<void> {
  try {
    await navigator.clipboard.writeText(serializeJson(artifact.data))
    artifact.onExported()
    toast.add({
      severity: 'success',
      summary: `${artifact.filename} copied to clipboard`,
      life: 4000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Copy failed',
      detail: String(error),
      life: 6000,
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
          v-for="artifact in artifacts"
          :key="artifact.filename"
          :artifact="artifact"
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
