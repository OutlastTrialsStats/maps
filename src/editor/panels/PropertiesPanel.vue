<script setup lang="ts">
import Button from 'primevue/button'
import { computed } from 'vue'
import { useClipboard } from '../tools/useClipboard'
import { useEditorStore } from '../store/editorStore'
import PlacementProperties from './PlacementProperties.vue'
import RoomProperties from './RoomProperties.vue'
import RouteProperties from './RouteProperties.vue'

const store = useEditorStore()
const { canPaste, copyToSystemClipboard, cutToSystemClipboard, pasteFromSystemClipboard } =
  useClipboard()

const hasSelection = computed(() => store.selection.length > 0)

/** Buttons paste without a cursor position — the pointer is not over the canvas. */
function paste(): void {
  void pasteFromSystemClipboard(null)
}
</script>

<template>
  <div class="properties-panel">
    <div v-if="store.document" class="selection-actions">
      <span v-if="store.selection.length > 1" class="selection-count">
        {{ store.selection.length }} objects selected
      </span>
      <Button
        v-tooltip.bottom="'Copy (Ctrl+C)'"
        icon="pi pi-copy"
        size="small"
        text
        severity="secondary"
        :disabled="!hasSelection"
        @click="copyToSystemClipboard()"
      />
      <Button
        v-tooltip.bottom="'Cut (Ctrl+X)'"
        aria-label="Cut"
        size="small"
        text
        severity="secondary"
        :disabled="!hasSelection"
        @click="cutToSystemClipboard()"
      >
        <template #icon>
          <svg class="cut-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
          </svg>
        </template>
      </Button>
      <Button
        v-tooltip.bottom="'Paste (Ctrl+V)'"
        icon="pi pi-clipboard"
        size="small"
        text
        severity="secondary"
        :disabled="!canPaste"
        @click="paste()"
      />
      <Button
        v-tooltip.bottom="'Deselect (Esc)'"
        icon="pi pi-times"
        size="small"
        text
        severity="secondary"
        :disabled="!hasSelection"
        @click="store.clearSelection()"
      />
      <Button
        v-tooltip.bottom="'Delete (Del)'"
        icon="pi pi-trash"
        size="small"
        text
        severity="danger"
        :disabled="!hasSelection"
        @click="store.deleteSelection()"
      />
    </div>
    <RoomProperties v-if="store.selectedRoom" :room="store.selectedRoom" />
    <PlacementProperties v-else-if="store.selectedPlacement" :placement="store.selectedPlacement" />
    <RouteProperties v-else-if="store.selectedRoute" :route="store.selectedRoute" />
    <p v-else-if="store.selection.length === 0" class="hint">
      Nothing selected. Map settings, elements and zones are managed via the toolbar.
    </p>
  </div>
</template>

<style scoped>
.properties-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.selection-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 4px 8px 0;
}

.selection-count {
  margin-right: auto;
  font-size: 12px;
  color: var(--text-muted);
}

.hint {
  margin: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

/* primeicons has no scissors glyph, hence the inline SVG. */
.cut-icon {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}
</style>
