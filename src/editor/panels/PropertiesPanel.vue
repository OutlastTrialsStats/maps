<script setup lang="ts">
import Button from 'primevue/button'
import { useEditorStore } from '../store/editorStore'
import PlacementProperties from './PlacementProperties.vue'
import RoomProperties from './RoomProperties.vue'
import RouteProperties from './RouteProperties.vue'

const store = useEditorStore()
</script>

<template>
  <div class="properties-panel">
    <div v-if="store.selection.length > 0" class="selection-actions">
      <span v-if="store.selection.length > 1" class="selection-count">
        {{ store.selection.length }} objects selected
      </span>
      <Button
        v-tooltip.bottom="'Deselect (Esc)'"
        icon="pi pi-times"
        size="small"
        text
        severity="secondary"
        @click="store.clearSelection()"
      />
      <Button
        v-tooltip.bottom="'Delete (Del)'"
        icon="pi pi-trash"
        size="small"
        text
        severity="danger"
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
</style>
