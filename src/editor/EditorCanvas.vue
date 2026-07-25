<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useElementSize } from '../core/interaction/useElementSize'
import { usePanZoom } from '../core/interaction/usePanZoom'
import { roomsBounds } from '../core/model/roomPath'
import type { Vec2 } from '../core/model/types'
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

const emit = defineEmits<{
  cursorMove: [pos: Vec2 | null]
  zoomChange: [k: number]
}>()

const editor = useEditorStore()
const libraryStore = useLibraryStore()
const zonesStore = useZonesStore()

const canvas = ref<InstanceType<typeof MapCanvas> | null>(null)
const svgEl = computed(() => canvas.value?.svgEl ?? null)
const { transform, isSpacePanning, resetView } = usePanZoom(svgEl)
const viewport = useElementSize(svgEl)

const tools = {
  select: useSelectTool(),
  room: useRoomTool(),
  placement: usePlacementTool(),
  route: useRouteTool(),
}

const {
  cursorWorld,
  overlay,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onDblClick,
  onContextMenu,
} = useCanvasEvents({ svgRef: svgEl, transform, isSpacePanning, tools })

watch(cursorWorld, (pos) => emit('cursorMove', pos))
watch(
  () => transform.value.k,
  (k) => emit('zoomChange', k),
  { immediate: true },
)

onMounted(() => fitToDocument())
watch(
  () => editor.document?.id,
  () => fitToDocument(),
  { flush: 'post' },
)

function fitToDocument(): void {
  const doc = editor.document
  if (!doc) {
    return
  }
  resetView(roomsBounds(doc.rooms) ?? undefined)
}
</script>

<template>
  <MapCanvas
    ref="canvas"
    :transform="transform"
    :class="{ panning: isSpacePanning }"
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
      :map="editor.document"
      :floor="editor.activeFloor"
      :trial-id="editor.trialContext ?? undefined"
      :element-index="libraryStore.elementIndex"
      :zones="zonesStore.zonesById"
      :selected-ids="editor.selectedIds"
    />
    <ToolOverlayLayer :overlay="overlay" :element-index="libraryStore.elementIndex" />
  </MapCanvas>
</template>

<style scoped>
.panning {
  cursor: grab;
}
</style>
