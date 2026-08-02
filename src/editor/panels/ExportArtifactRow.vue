<script setup lang="ts">
import Button from 'primevue/button'
import type { ExportArtifact } from '../store/useExportArtifacts'

defineProps<{ artifact: ExportArtifact; exported: boolean }>()

const emit = defineEmits<{ download: []; copy: [] }>()
</script>

<template>
  <div class="artifact-row">
    <div class="info">
      <span class="filename">
        {{ artifact.filename }}
        <span v-if="exported" class="exported"><i class="pi pi-check" /> Exported</span>
      </span>
      <code class="repo-path">{{ artifact.repoPath }}</code>
    </div>
    <div class="buttons">
      <Button
        v-tooltip.top="'Copy JSON to clipboard'"
        icon="pi pi-copy"
        size="small"
        severity="secondary"
        @click="emit('copy')"
      />
      <Button label="Download" size="small" @click="emit('download')" />
    </div>
  </div>
</template>

<style scoped>
.artifact-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid var(--border-default);
  border-radius: 4px;
  padding: 8px 10px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.filename {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}

.exported {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 400;
  color: var(--success);
}

.exported .pi {
  font-size: 10px;
}

.repo-path {
  font-size: 11px;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.buttons {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
</style>
