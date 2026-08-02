<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { VALIDATION_DEBOUNCE_MS, ZOOM_BUTTON_FACTOR } from '../core/constants'
import { isUiOwnedTarget } from '../core/interaction/eventTargets'
import type { Vec2 } from '../core/model/types'
import {
  collectManifestIssues,
  collectTrialLogicIssues,
  type ValidationIssue,
} from '../core/model/validation'
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
import ShortcutHelpDialog from './panels/ShortcutHelpDialog.vue'
import StartDialog from './panels/StartDialog.vue'
import ToolbarSeparator from './ToolbarSeparator.vue'
import ZoomControls from './ZoomControls.vue'
import { useEditorStore } from './store/editorStore'
import { useLibraryStore } from './store/libraryStore'
import { useZonesStore } from './store/zonesStore'

const editor = useEditorStore()
const libraryStore = useLibraryStore()
const zonesStore = useZonesStore()

const cursor = ref<Vec2 | null>(null)
const zoom = ref(1)
const fineGrid = ref(false)
const canvasRef = ref<InstanceType<typeof EditorCanvas> | null>(null)
const showImportDialog = ref(false)
const showExportDialog = ref(false)
const showMapSettings = ref(false)
const showLibraryDialog = ref(false)
const showShortcutHelp = ref(false)

const needsDocumentHint = computed(() => ({
  value: 'Load or create a map first',
  disabled: Boolean(editor.document),
}))

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
      validationIssues.value = [
        ...(editor.manifest ? collectManifestIssues(editor.manifest) : []),
        ...collectTrialLogicIssues(doc, libraryStore.library, zonesStore.zoneLibrary),
      ]
    }, VALIDATION_DEBOUNCE_MS)
  },
  { immediate: true },
)

function onHelpHotkey(event: KeyboardEvent): void {
  if (event.key === '?' && !isUiOwnedTarget(event.target)) {
    showShortcutHelp.value = !showShortcutHelp.value
  }
}

const showOpenConfirm = ref(false)

function requestOpenOther(): void {
  if (editor.dirty) {
    showOpenConfirm.value = true
  } else {
    editor.closeWorkspace()
  }
}

function confirmOpenOther(): void {
  showOpenConfirm.value = false
  editor.closeWorkspace()
}

function onBeforeUnload(event: BeforeUnloadEvent): void {
  if (editor.dirty) {
    event.preventDefault()
  }
}

onMounted(() => {
  libraryStore.load()
  zonesStore.load()
  window.addEventListener('keydown', onHelpHotkey)
  window.addEventListener('beforeunload', onBeforeUnload)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onHelpHotkey)
  window.removeEventListener('beforeunload', onBeforeUnload)
})
</script>

<template>
  <div class="editor">
    <EditorToolbar>
      <template #io>
        <ToolbarSeparator />
        <span v-tooltip.bottom="needsDocumentHint">
          <Button
            label="Open…"
            size="small"
            severity="secondary"
            :disabled="!editor.document"
            @click="requestOpenOther"
          />
        </span>
        <span v-tooltip.bottom="needsDocumentHint">
          <Button
            label="Map settings"
            size="small"
            severity="secondary"
            :disabled="!editor.document"
            @click="showMapSettings = true"
          />
        </span>
        <span v-tooltip.bottom="needsDocumentHint">
          <Button
            label="Library"
            size="small"
            severity="secondary"
            :disabled="!editor.document"
            @click="showLibraryDialog = true"
          />
        </span>
        <ToolbarSeparator />
        <Button
          label="Import"
          size="small"
          severity="secondary"
          @click="showImportDialog = true"
        />
        <span v-tooltip.bottom="needsDocumentHint">
          <Button
            label="Export"
            size="small"
            :disabled="!editor.document"
            @click="showExportDialog = true"
          />
        </span>
        <ToolbarSeparator />
        <Button
          v-tooltip.bottom="'Keyboard shortcuts (?)'"
          icon="pi pi-question-circle"
          aria-label="Keyboard shortcuts"
          size="small"
          text
          severity="secondary"
          @click="showShortcutHelp = true"
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
        <EditorCanvas
          ref="canvasRef"
          @cursor-move="cursor = $event"
          @zoom-change="zoom = $event"
          @fine-grid-change="fineGrid = $event"
        />
        <ControlsLegend
          v-if="editor.document"
          class="canvas-legend"
          :hints="[
            { icon: 'left', label: 'Use tool' },
            { icon: 'wheel', label: 'Scroll to zoom' },
            { icon: 'wheel', label: 'Hold to pan' },
          ]"
        />
        <ZoomControls
          v-if="editor.document"
          class="canvas-zoom"
          @zoom-in="canvasRef?.zoomBy(ZOOM_BUTTON_FACTOR)"
          @zoom-out="canvasRef?.zoomBy(1 / ZOOM_BUTTON_FACTOR)"
          @fit="canvasRef?.fitToDocument()"
        />
      </div>
      <aside class="side-panel properties">
        <PropertiesPanel />
      </aside>
    </div>
    <EditorStatusBar
      :cursor="cursor"
      :zoom="zoom"
      :fine-grid="fineGrid"
      :issues="editor.document ? validationIssues : null"
    />
    <StartDialog @import="showImportDialog = true" />
    <ShortcutHelpDialog v-model:visible="showShortcutHelp" />
    <Dialog v-model:visible="showOpenConfirm" modal header="Unsaved changes">
      <p class="confirm-text">
        The current trial has unsaved changes. It stays in the browser autosave and can be
        continued from the start dialog — export it first to keep a file.
      </p>
      <div class="confirm-actions">
        <Button label="Cancel" severity="secondary" text @click="showOpenConfirm = false" />
        <Button label="Switch map" @click="confirmOpenOther" />
      </div>
    </Dialog>
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

.canvas-zoom {
  position: absolute;
  bottom: 12px;
  right: 12px;
}

.error {
  margin: 8px 16px;
  color: var(--danger);
}

.confirm-text {
  margin: 0 0 16px;
  max-width: 420px;
  font-size: 13px;
  color: var(--text-muted);
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
