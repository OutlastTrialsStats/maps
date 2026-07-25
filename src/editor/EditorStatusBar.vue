<script setup lang="ts">
import { computed } from 'vue'
import type { Vec2 } from '../core/model/types'
import { useEditorStore } from './store/editorStore'

const props = defineProps<{
  cursor: Vec2 | null
  zoom: number
  /** null = no document loaded (hide the status). */
  issueCount: number | null
}>()

const store = useEditorStore()

const cursorText = computed(() =>
  props.cursor ? `${props.cursor[0].toFixed(1)}, ${props.cursor[1].toFixed(1)}` : '—',
)
const zoomText = computed(() => `${Math.round(props.zoom * 100)}%`)
const saveText = computed(() => {
  if (store.autosaveError) {
    return store.autosaveError
  }
  if (store.lastAutosaveAt) {
    return `Autosaved ${store.lastAutosaveAt.toLocaleTimeString()}`
  }
  return store.dirty ? 'Unsaved changes' : ''
})
</script>

<template>
  <div class="statusbar">
    <span class="cell data">Cursor: {{ cursorText }}</span>
    <span class="cell data">Zoom: {{ zoomText }}</span>
    <span v-if="store.toolHint" class="cell hint">{{ store.toolHint }}</span>
    <span class="cell push-right" :class="{ error: store.autosaveError }">{{ saveText }}</span>
    <span
      v-if="props.issueCount !== null"
      class="cell"
      :class="props.issueCount === 0 ? 'valid' : 'error'"
    >
      {{ props.issueCount === 0 ? '✓ Valid' : `${props.issueCount} issue(s)` }}
    </span>
  </div>
</template>

<style scoped>
.statusbar {
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 4px 12px;
  border-top: 1px solid var(--border-default);
  background: var(--surface-panel);
  font-size: 12px;
  color: var(--text-muted);
}

.cell {
  white-space: nowrap;
}

.data {
  font-family: var(--font-data);
  font-variant-numeric: tabular-nums;
}

.push-right {
  margin-left: auto;
}

.error {
  color: var(--danger);
}

.valid {
  color: var(--success);
}
</style>
