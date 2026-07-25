<script setup lang="ts">
import Button from 'primevue/button'
import type { ExportArtifact } from '../store/useExportArtifacts'

defineProps<{ artifact: ExportArtifact }>()

const emit = defineEmits<{ download: []; copy: [] }>()
</script>

<template>
  <div class="artifact-row">
    <div class="info">
      <span class="filename">{{ artifact.filename }}</span>
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
  font-size: 13px;
  font-weight: 600;
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
