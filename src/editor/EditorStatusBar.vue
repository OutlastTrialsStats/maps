<script setup lang="ts">
import Popover from 'primevue/popover'
import { computed, ref } from 'vue'
import { GRID_SNAP_DEFAULT, GRID_SNAP_FINE } from '../core/constants'
import type { Vec2 } from '../core/model/types'
import type { ValidationIssue } from '../core/model/validation'
import IssueList from './panels/IssueList.vue'
import { useEditorStore } from './store/editorStore'

const props = defineProps<{
  cursor: Vec2 | null
  zoom: number
  fineGrid: boolean
  /** null = no document loaded (hide the status). */
  issues: ValidationIssue[] | null
}>()

const store = useEditorStore()
const issuePopover = ref<InstanceType<typeof Popover> | null>(null)

const cursorText = computed(() =>
  props.cursor ? `${props.cursor[0].toFixed(1)}, ${props.cursor[1].toFixed(1)}` : '—',
)
const zoomText = computed(() => `${Math.round(props.zoom * 100)}%`)
const gridText = computed(() =>
  props.fineGrid ? `${GRID_SNAP_FINE} (fine)` : `${GRID_SNAP_DEFAULT}`,
)
const saveText = computed(() => {
  if (store.autosaveError) {
    return store.autosaveError
  }
  if (store.lastAutosaveAt) {
    return `Autosaved ${store.lastAutosaveAt.toLocaleTimeString()}`
  }
  return store.dirty ? 'Unsaved changes' : ''
})
const issueCount = computed(() => props.issues?.length ?? 0)
</script>

<template>
  <div class="statusbar">
    <span class="cell data">Cursor: {{ cursorText }}</span>
    <span class="cell data">Zoom: {{ zoomText }}</span>
    <span class="cell data">Grid: {{ gridText }}</span>
    <span v-if="store.toolHint" class="cell hint">{{ store.toolHint }}</span>
    <span class="cell push-right" :class="{ error: store.autosaveError }">{{ saveText }}</span>
    <span v-if="props.issues !== null && issueCount === 0" class="cell valid">✓ Valid</span>
    <button
      v-else-if="props.issues !== null"
      v-tooltip.top="'Show issues'"
      class="cell issue-button error"
      type="button"
      @click="issuePopover?.toggle($event)"
    >
      {{ issueCount }} issue(s)
    </button>
    <Popover ref="issuePopover" class="issue-popover">
      <IssueList :issues="props.issues ?? []" />
    </Popover>
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

.issue-button {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: underline dotted;
}
</style>
