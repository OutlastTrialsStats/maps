<script setup lang="ts">
import { useEditorStore } from '../store/editorStore'
import PlacementProperties from './PlacementProperties.vue'
import RoomProperties from './RoomProperties.vue'
import RouteProperties from './RouteProperties.vue'

const store = useEditorStore()
</script>

<template>
  <div class="properties-panel">
    <RoomProperties v-if="store.selectedRoom" :room="store.selectedRoom" />
    <PlacementProperties
      v-else-if="store.selectedPlacement"
      :placement="store.selectedPlacement"
    />
    <RouteProperties v-else-if="store.selectedRoute" :route="store.selectedRoute" />
    <p v-else-if="store.selection.length > 1" class="hint">
      {{ store.selection.length }} objects selected
    </p>
    <p v-else class="hint">
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

.hint {
  margin: 8px;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
