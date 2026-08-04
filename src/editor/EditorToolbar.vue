<script setup lang="ts">
import Button from 'primevue/button'
import Select from 'primevue/select'
import { INNER_LINE_STYLE_OPTIONS } from './innerLineStyles'
import { useEditorStore } from './store/editorStore'
import type { RoomToolMode, ToolId } from './tools/toolTypes'

const store = useEditorStore()

const tools: Array<{ id: ToolId; label: string; icon: string; hotkey: string }> = [
  { id: 'select', label: 'Select', icon: 'pi pi-arrow-up-left', hotkey: '1' },
  { id: 'room', label: 'Room', icon: 'pi pi-home', hotkey: '2' },
  { id: 'placement', label: 'Element', icon: 'pi pi-map-marker', hotkey: '3' },
  { id: 'route', label: 'Route', icon: 'pi pi-directions', hotkey: '4' },
]

const roomModes: Array<{ id: RoomToolMode; label: string; icon: string; hint: string }> = [
  {
    id: 'polygon',
    label: 'Polygon',
    icon: 'pi pi-share-alt',
    hint: 'Polygon — click the far end to close',
  },
  { id: 'rect', label: 'Rectangle', icon: 'pi pi-stop', hint: 'Rectangle — two clicks' },
  {
    id: 'innerline',
    label: 'Inner lines',
    icon: 'pi pi-pen-line',
    hint: 'Inner lines — decorative lines inside a room',
  },
  {
    id: 'wallgap',
    label: 'Wall gap',
    icon: 'pi pi-minus-circle',
    hint: 'Wall gaps — cut openings into the outer wall',
  },
]
</script>

<template>
  <div class="toolbar">
    <div class="group">
      <Button
        v-for="tool in tools"
        :key="tool.id"
        v-tooltip.bottom="`${tool.label} (${tool.hotkey})`"
        :icon="tool.icon"
        :aria-label="tool.label"
        size="small"
        :severity="store.activeTool === tool.id ? 'primary' : 'secondary'"
        @click="store.activeTool = tool.id"
      />
    </div>
    <div v-if="store.activeTool === 'room'" class="group">
      <Button
        v-for="mode in roomModes"
        :key="mode.id"
        v-tooltip.bottom="mode.hint"
        :icon="mode.icon"
        :aria-label="mode.label"
        size="small"
        text
        :severity="store.roomToolMode === mode.id ? 'primary' : 'secondary'"
        @click="store.roomToolMode = mode.id"
      />
      <Button
        v-if="store.roomToolMode === 'polygon'"
        v-tooltip.bottom="'Orthogonal drawing — off by default, hold Alt to invert temporarily'"
        label="90°"
        size="small"
        :severity="store.roomOrthoSnap ? 'primary' : 'secondary'"
        @click="store.roomOrthoSnap = !store.roomOrthoSnap"
      />
      <Select
        v-if="store.roomToolMode === 'innerline'"
        v-model="store.innerLineStyle"
        :options="INNER_LINE_STYLE_OPTIONS"
        option-label="label"
        option-value="value"
        size="small"
        aria-label="Inner line style"
      />
    </div>
    <div class="group">
      <label class="field-label" for="floor-select">Floor</label>
      <Select
        v-model="store.activeFloor"
        input-id="floor-select"
        :options="store.floorOptions"
        option-label="label"
        option-value="value"
        size="small"
        class="floor-select"
      />
      <span class="field-label">Trial</span>
      <span class="trial-name">{{ store.trialName }}</span>
    </div>
    <div class="group push-right">
      <Button
        v-tooltip.bottom="'Undo (Ctrl+Z)'"
        icon="pi pi-arrow-u-turn-up-left"
        aria-label="Undo"
        size="small"
        severity="secondary"
        :disabled="!store.canUndo"
        @click="store.undo()"
      />
      <Button
        v-tooltip.bottom="'Redo (Ctrl+Y)'"
        icon="pi pi-arrow-u-turn-up-right"
        aria-label="Redo"
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

.floor-select {
  min-width: 140px;
}

.trial-name {
  font-size: 13px;
  font-weight: 600;
}
</style>
