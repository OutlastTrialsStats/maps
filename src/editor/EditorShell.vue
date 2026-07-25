<script setup lang="ts">
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { onMounted, ref, watch } from 'vue'
import { VALIDATION_DEBOUNCE_MS } from '../core/constants'
import type { Vec2 } from '../core/model/types'
import { collectMapLogicIssues, type ValidationIssue } from '../core/model/validation'
import ControlsLegend from '../core/ui/ControlsLegend.vue'
import EditorCanvas from './EditorCanvas.vue'
import EditorStatusBar from './EditorStatusBar.vue'
import EditorToolbar from './EditorToolbar.vue'
import ExportDialog from './panels/ExportDialog.vue'
import ImportDialog from './panels/ImportDialog.vue'
import LibraryDialog from './panels/LibraryDialog.vue'
import MapSettingsDialog from './panels/MapSettingsDialog.vue'
import PalettePanel from './panels/PalettePanel.vue'
import PropertiesPanel from './panels/PropertiesPanel.vue'
import StartDialog from './panels/StartDialog.vue'
import ToolbarSeparator from './ToolbarSeparator.vue'
import { useEditorStore } from './store/editorStore'
import { useLibraryStore } from './store/libraryStore'
import { useZonesStore } from './store/zonesStore'

const editor = useEditorStore()
const libraryStore = useLibraryStore()
const zonesStore = useZonesStore()

const cursor = ref<Vec2 | null>(null)
const zoom = ref(1)
const showImportDialog = ref(false)
const showExportDialog = ref(false)
const showMapSettings = ref(false)
const showLibraryDialog = ref(false)

const validationIssues = ref<ValidationIssue[]>([])
let validationTimer: number | undefined

// `revision` instead of a deep watcher: the 100+ KB document is never traversed.
watch(
  [() => editor.document, () => editor.revision, () => libraryStore.library, () => zonesStore.zoneLibrary],
  ([doc]) => {
    window.clearTimeout(validationTimer)
    if (!doc) {
      validationIssues.value = []
      return
    }
    validationTimer = window.setTimeout(() => {
      validationIssues.value = collectMapLogicIssues(doc, libraryStore.library, zonesStore.zoneLibrary)
    }, VALIDATION_DEBOUNCE_MS)
  },
  { immediate: true },
)

onMounted(() => {
  libraryStore.load()
  zonesStore.load()
})
</script>

<template>
  <div class="editor">
    <EditorToolbar>
      <template #io>
        <ToolbarSeparator />
        <Button
          label="Map settings"
          size="small"
          severity="secondary"
          :disabled="!editor.document"
          @click="showMapSettings = true"
        />
        <Button
          label="Library"
          size="small"
          severity="secondary"
          :disabled="!editor.document"
          @click="showLibraryDialog = true"
        />
        <ToolbarSeparator />
        <Button
          label="Import"
          size="small"
          severity="secondary"
          @click="showImportDialog = true"
        />
        <Button
          label="Export"
          size="small"
          :disabled="!editor.document"
          @click="showExportDialog = true"
        />
      </template>
    </EditorToolbar>
    <p v-if="libraryStore.loadError" class="error" role="alert">{{ libraryStore.loadError }}</p>
    <p v-if="zonesStore.loadError" class="error" role="alert">{{ zonesStore.loadError }}</p>
    <div class="editor-main">
      <aside class="side-panel palette">
        <PalettePanel />
      </aside>
      <div class="canvas-wrap">
        <EditorCanvas @cursor-move="cursor = $event" @zoom-change="zoom = $event" />
        <ControlsLegend
          v-if="editor.document"
          class="canvas-legend"
          :hints="[
            { icon: 'left', label: 'Use tool' },
            { icon: 'wheel', label: 'Scroll to zoom' },
            { icon: 'wheel', label: 'Hold to pan' },
          ]"
        />
      </div>
      <aside class="side-panel properties">
        <PropertiesPanel />
      </aside>
    </div>
    <EditorStatusBar
      :cursor="cursor"
      :zoom="zoom"
      :issue-count="editor.document ? validationIssues.length : null"
    />
    <StartDialog @import="showImportDialog = true" />
    <ImportDialog v-model:visible="showImportDialog" />
    <ExportDialog v-model:visible="showExportDialog" />
    <MapSettingsDialog v-model:visible="showMapSettings" />
    <LibraryDialog v-model:visible="showLibraryDialog" />
    <Toast position="bottom-right" />
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.editor-main {
  display: flex;
  flex: 1;
  min-height: 0;
}

.side-panel {
  width: 240px;
  flex-shrink: 0;
  overflow-y: auto;
  background: var(--surface-panel);
  padding: 8px;
}

.palette {
  border-right: 1px solid var(--border-default);
}

.properties {
  width: 280px;
  border-left: 1px solid var(--border-default);
}

.canvas-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
}

.canvas-legend {
  position: absolute;
  bottom: 12px;
  left: 12px;
}

.error {
  margin: 8px 16px;
  color: var(--danger);
}
</style>
