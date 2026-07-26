<script setup lang="ts">
import Button from 'primevue/button'
import Select from 'primevue/select'
import { computed } from 'vue'
import type { InnerLineStyle } from '../core/model/types'
import { useEditorStore } from './store/editorStore'
import type { RoomToolMode, ToolId } from './tools/toolTypes'

const store = useEditorStore()

const tools: Array<{ id: ToolId; label: string; hotkey: string }> = [
  { id: 'select', label: 'Select', hotkey: '1' },
  { id: 'room', label: 'Room', hotkey: '2' },
  { id: 'placement', label: 'Element', hotkey: '3' },
  { id: 'route', label: 'Route', hotkey: '4' },
]

const roomModes: Array<{ id: RoomToolMode; label: string }> = [
  { id: 'polygon', label: 'Polygon' },
  { id: 'rect', label: 'Rectangle' },
  { id: 'innerline', label: 'Inner lines' },
]

const innerLineStyles: Array<{ label: string; value: InnerLineStyle }> = [
  { label: 'Wall', value: 'wall' },
  { label: 'Object', value: 'object' },
  { label: 'Object (dark)', value: 'objectDark' },
  { label: 'Dashed', value: 'dashed' },
]

const floorOptions = computed(() =>
  store.floors.map((floor) => ({ label: floor.name, value: floor.index })),
)

const trialOptions = computed(() =>
  store.trials.map((trial) => ({ label: trial.name, value: trial.id })),
)
</script>

<template>
  <div class="toolbar">
    <div class="group">
      <Button
        v-for="tool in tools"
        :key="tool.id"
        v-tooltip.bottom="`Hotkey: ${tool.hotkey}`"
        :label="tool.label"
        size="small"
        :severity="store.activeTool === tool.id ? 'primary' : 'secondary'"
        @click="store.activeTool = tool.id"
      />
    </div>
    <div v-if="store.activeTool === 'room'" class="group">
      <Button
        v-for="mode in roomModes"
        :key="mode.id"
        :label="mode.label"
        size="small"
        text
        :severity="store.roomToolMode === mode.id ? 'primary' : 'secondary'"
        @click="store.roomToolMode = mode.id"
      />
      <Button
        v-if="store.roomToolMode === 'polygon'"
        v-tooltip.bottom="'Orthogonal drawing — hold Alt to invert temporarily'"
        label="90°"
        size="small"
        :severity="store.roomOrthoSnap ? 'primary' : 'secondary'"
        @click="store.roomOrthoSnap = !store.roomOrthoSnap"
      />
      <Select
        v-if="store.roomToolMode === 'innerline'"
        v-model="store.innerLineStyle"
        :options="innerLineStyles"
        option-label="label"
        option-value="value"
        size="small"
      />
    </div>
    <div class="group">
      <label class="field-label" for="floor-select">Floor</label>
      <Select
        v-model="store.activeFloor"
        input-id="floor-select"
        :options="floorOptions"
        option-label="label"
        option-value="value"
        size="small"
        class="floor-select"
      />
      <label class="field-label" for="trial-select">Editing for</label>
      <Select
        v-model="store.trialContext"
        input-id="trial-select"
        :options="trialOptions"
        option-label="label"
        option-value="value"
        size="small"
        class="trial-select"
      />
    </div>
    <div class="group push-right">
      <Button
        label="Undo"
        size="small"
        severity="secondary"
        :disabled="!store.canUndo"
        @click="store.undo()"
      />
      <Button
        label="Redo"
        size="small"
        severity="secondary"
        :disabled="!store.canRedo"
        @click="store.redo()"
      />
      <slot name="io" />
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--border-default);
  background: var(--surface-panel);
}

.group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.push-right {
  margin-left: auto;
}

.field-label {
  font-size: 12px;
  color: var(--text-muted);
}

.floor-select,
.trial-select {
  min-width: 140px;
}
</style>
