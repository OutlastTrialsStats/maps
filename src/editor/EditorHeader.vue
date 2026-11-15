<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Select from 'primevue/select'
import { computed, ref } from 'vue'
import { LOGO_MARK_URL } from '../core/constants'
import { useEditorStore } from './store/editorStore'
import ToolbarSeparator from './ToolbarSeparator.vue'

const emit = defineEmits<{
  open: []
  import: []
  settings: []
  library: []
  export: []
  help: []
}>()

const store = useEditorStore()
const fileMenu = ref<InstanceType<typeof Menu> | null>(null)

const fileItems = computed<MenuItem[]>(() => [
  {
    label: 'Open another map…',
    icon: 'pi pi-folder-open',
    disabled: !store.document,
    command: () => emit('open'),
  },
  { label: 'Import trial file…', icon: 'pi pi-file-import', command: () => emit('import') },
  { separator: true },
  {
    label: 'Map settings',
    icon: 'pi pi-cog',
    disabled: !store.document,
    command: () => emit('settings'),
  },
  {
    label: 'Elements & zones',
    icon: 'pi pi-book',
    disabled: !store.document,
    command: () => emit('library'),
  },
])
</script>

<template>
  <header class="header">
    <RouterLink v-tooltip.bottom="'Outlast Trials Maps'" :to="{ name: 'overview' }" class="home">
      <img class="home-logo" :src="LOGO_MARK_URL" alt="Outlast Trials Maps" />
    </RouterLink>
    <div v-if="store.document" class="context">
      <span class="map-name">{{ store.manifest?.meta.name }}</span>
      <i class="pi pi-angle-right" aria-hidden="true" />
      <span class="trial-name">{{ store.trialName }}</span>
      <span v-if="store.dirty" v-tooltip.bottom="'Unsaved changes'" class="dirty-dot" />
    </div>
    <span v-else class="map-name">Map Editor</span>

    <label v-if="store.document" class="floor">
      <span class="field-label">Floor</span>
      <Select
        v-model="store.activeFloor"
        :options="store.floorOptions"
        option-label="label"
        option-value="value"
        size="small"
        class="floor-select"
      />
    </label>

    <div class="actions">
      <Button
        v-tooltip.bottom="'Undo (Ctrl+Z)'"
        icon="pi pi-arrow-u-turn-up-left"
        aria-label="Undo"
        size="small"
        text
        severity="secondary"
        :disabled="!store.canUndo"
        @click="store.undo()"
      />
      <Button
        v-tooltip.bottom="'Redo (Ctrl+Y)'"
        icon="pi pi-arrow-u-turn-up-right"
        aria-label="Redo"
        size="small"
        text
        severity="secondary"
        :disabled="!store.canRedo"
        @click="store.redo()"
      />
      <ToolbarSeparator />
      <Button
        label="File"
        icon="pi pi-chevron-down"
        icon-pos="right"
        size="small"
        text
        severity="secondary"
        aria-haspopup="true"
        @click="fileMenu?.toggle($event)"
      />
      <Menu ref="fileMenu" :model="fileItems" popup />
      <Button
        v-tooltip.bottom="store.hintsVisible ? 'Hide hints' : 'Show hints'"
        icon="pi pi-lightbulb"
        aria-label="Hints"
        :aria-pressed="store.hintsVisible"
        size="small"
        text
        :severity="store.hintsVisible ? 'contrast' : 'secondary'"
        @click="store.hintsVisible = !store.hintsVisible"
      />
      <Button
        v-tooltip.bottom="'Keyboard shortcuts (?)'"
        icon="pi pi-question-circle"
        aria-label="Keyboard shortcuts"
        size="small"
        text
        severity="secondary"
        @click="emit('help')"
      />
      <Button
        label="Export"
        icon="pi pi-download"
        size="small"
        :disabled="!store.document"
        @click="emit('export')"
      />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 48px;
  padding: 6px 12px 6px 16px;
  border-bottom: 1px solid var(--border-default);
  background: var(--surface-panel);
}

.home {
  display: inline-flex;
  flex-shrink: 0;
}

.home-logo {
  display: block;
  width: 32px;
  height: 32px;
}

.context {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.context .pi {
  font-size: 12px;
  color: var(--text-faint);
}

.map-name {
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
}

.trial-name {
  overflow: hidden;
  font-family: var(--font-brand);
  font-size: 17px;
  color: var(--text-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dirty-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: var(--radius-pill);
  background: var(--warning);
}

.floor {
  display: flex;
  align-items: center;
  gap: 8px;
}

.floor-select {
  min-width: 150px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}
</style>
