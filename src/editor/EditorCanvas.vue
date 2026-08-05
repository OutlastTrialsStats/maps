<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useElementSize } from '../core/interaction/useElementSize'
import { usePanZoom } from '../core/interaction/usePanZoom'
import { roomCameras } from '../core/model/roomCameras'
import { roomsBounds } from '../core/model/roomPath'
import CameraMarker from '../core/render/CameraMarker.vue'
import FloorLayer from '../core/render/FloorLayer.vue'
import GridLayer from '../core/render/GridLayer.vue'
import MapCanvas from '../core/render/MapCanvas.vue'
import ToolOverlayLayer from './ToolOverlayLayer.vue'
import { useEditorStore } from './store/editorStore'
import { useLibraryStore } from './store/libraryStore'
import { useZonesStore } from './store/zonesStore'
import { useCanvasEvents } from './tools/useCanvasEvents'
import { usePlacementTool } from './tools/usePlacementTool'
import { useRoomTool } from './tools/useRoomTool'
import { useRouteTool } from './tools/useRouteTool'
import { useSelectTool } from './tools/useSelectTool'
import { useShapeTool } from './tools/useShapeTool'

const editor = useEditorStore()
const libraryStore = useLibraryStore()
const zonesStore = useZonesStore()

const canvas = ref<InstanceType<typeof MapCanvas> | null>(null)
const svgEl = computed(() => canvas.value?.svgEl ?? null)
const { transform, isSpacePanning, isPanning, resetView, fitBounds, zoomBy, panBy } = usePanZoom(
  svgEl,
  { rightDragPan: true },
)
const viewport = useElementSize(svgEl)

const tools = {
  select: useSelectTool(),
  room: useRoomTool(),
  placement: usePlacementTool(),
  route: useRouteTool(),
  shape: useShapeTool(),
}

const {
  cursorWorld,
  isFineGrid,
  overlay,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onDblClick,
  onContextMenu,
} = useCanvasEvents({
  svgRef: svgEl,
  transform,
  isSpacePanning,
  tools,
  fitView: fitToDocument,
  panBy,
})

const zoom = computed(() => transform.value.k)
const isDrawTool = computed(() => editor.activeTool !== 'select')

const selectedRoomCameras = computed(() => roomCameras(editor.selectedRoom, editor.activeFloor))

onMounted(() => fitToDocument())
watch(
  () => (editor.document ? `${editor.document.mapId}/${editor.document.trialId}` : null),
  () => fitToDocument(),
  { flush: 'post' },
)

function fitToDocument(): void {
  const doc = editor.document
  if (!doc) {
    return
  }
  const bounds = roomsBounds(doc.rooms)
  if (bounds) {
    fitBounds(bounds)
  } else {
    resetView()
  }
}

defineExpose({ fitToDocument, zoomBy, cursorWorld, zoom, isFineGrid })
</script>

<template>
  <MapCanvas
    ref="canvas"
    :transform="transform"
    :class="{
      panning: isSpacePanning,
      grabbing: isPanning,
      'draw-cursor': isDrawTool && !isSpacePanning && !isPanning,
    }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerLeave"
    @dblclick="onDblClick"
    @contextmenu="onContextMenu"
  >
    <GridLayer :transform="transform" :viewport="viewport" />
    <FloorLayer
      v-if="editor.document"
      :trial="editor.document"
      :floor="editor.activeFloor"
      :element-index="libraryStore.elementIndex"
      :zones="zonesStore.zonesById"
      :selected-ids="editor.selectedIds"
      interactive
    />
    <CameraMarker
      v-for="(camera, index) in selectedRoomCameras"
      :key="`cam-${index}`"
      :camera="camera"
    />
    <ToolOverlayLayer
      :overlay="overlay"
      :element-index="libraryStore.elementIndex"
      :scale="transform.k"
    />
  </MapCanvas>
</template>

<style scoped>
.panning {
  cursor: grab;
}

.draw-cursor {
  cursor: crosshair;
}

.grabbing {
  cursor: grabbing;
}
</style>
