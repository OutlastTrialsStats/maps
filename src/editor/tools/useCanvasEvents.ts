import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import { GRID_SNAP_DEFAULT, GRID_SNAP_FINE } from '../../core/constants'
import { isEditableTarget } from '../../core/interaction/eventTargets'
import { hitFromEventTarget } from '../../core/interaction/hitTest'
import { snapToGrid } from '../../core/interaction/snapping'
import { screenToWorld, type ViewTransform } from '../../core/interaction/viewTransform'
import type { Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import type { CanvasPointerEvent, EditorTool, ToolId, ToolOverlay } from './toolTypes'

const TOOL_HOTKEYS: Record<string, ToolId> = {
  '1': 'select',
  '2': 'room',
  '3': 'placement',
  '4': 'route',
}

/**
 * Translates raw pointer/keyboard events into tool calls: coordinates in world
 * units, grid snapping (Ctrl = fine grid), hit testing and the global shortcuts
 * (undo/redo, tool selection, escape).
 */
export function useCanvasEvents(options: {
  svgRef: Readonly<Ref<SVGSVGElement | null>>
  transform: Readonly<Ref<ViewTransform>>
  isSpacePanning: Readonly<Ref<boolean>>
  tools: Partial<Record<ToolId, EditorTool>>
}) {
  const store = useEditorStore()
  const cursorWorld = ref<Vec2 | null>(null)

  const activeTool = computed(() => options.tools[store.activeTool])
  const overlay = computed<ToolOverlay | null>(() => activeTool.value?.overlay.value ?? null)

  watch(
    () => store.activeTool,
    (next, previous) => {
      options.tools[previous]?.deactivate?.()
      options.tools[next]?.activate?.()
    },
  )

  function makeEvent(event: MouseEvent): CanvasPointerEvent | null {
    const svg = options.svgRef.value
    if (!svg) {
      return null
    }
    const rect = svg.getBoundingClientRect()
    const world = screenToWorld(
      [event.clientX - rect.left, event.clientY - rect.top],
      options.transform.value,
    )
    const snapped = snapToGrid(world, event.ctrlKey ? GRID_SNAP_FINE : GRID_SNAP_DEFAULT)
    return { world, snapped, hit: hitFromEventTarget(event.target), event }
  }

  function onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || options.isSpacePanning.value) {
      return
    }
    const canvasEvent = makeEvent(event)
    if (!canvasEvent) {
      return
    }
    options.svgRef.value?.setPointerCapture(event.pointerId)
    activeTool.value?.onPointerDown?.(canvasEvent)
  }

  function onPointerMove(event: PointerEvent): void {
    const canvasEvent = makeEvent(event)
    if (!canvasEvent) {
      return
    }
    cursorWorld.value = canvasEvent.world
    activeTool.value?.onPointerMove?.(canvasEvent)
  }

  function onPointerUp(event: PointerEvent): void {
    if (event.button !== 0) {
      return
    }
    const canvasEvent = makeEvent(event)
    if (!canvasEvent) {
      return
    }
    activeTool.value?.onPointerUp?.(canvasEvent)
  }

  function onPointerLeave(): void {
    cursorWorld.value = null
  }

  function onDblClick(event: MouseEvent): void {
    const canvasEvent = makeEvent(event)
    if (canvasEvent) {
      activeTool.value?.onDblClick?.(canvasEvent)
    }
  }

  function onContextMenu(event: MouseEvent): void {
    const canvasEvent = makeEvent(event)
    if (canvasEvent && activeTool.value?.onContextMenu?.(canvasEvent)) {
      event.preventDefault()
    }
  }

  function onWindowKeydown(event: KeyboardEvent): void {
    if (isEditableTarget(event.target)) {
      return
    }
    if (activeTool.value?.onKeydown?.(event)) {
      event.preventDefault()
      return
    }
    const ctrl = event.ctrlKey || event.metaKey
    const key = event.key.toLowerCase()
    if (ctrl && key === 'z' && !event.shiftKey) {
      store.undo()
      event.preventDefault()
      return
    }
    if (ctrl && (key === 'y' || (key === 'z' && event.shiftKey))) {
      store.redo()
      event.preventDefault()
      return
    }
    const toolId = TOOL_HOTKEYS[event.key]
    if (toolId && !ctrl) {
      store.activeTool = toolId
      return
    }
    if (event.key === 'Escape') {
      store.setSelection([])
    }
  }

  onMounted(() => window.addEventListener('keydown', onWindowKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onWindowKeydown))

  return {
    cursorWorld,
    overlay,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onDblClick,
    onContextMenu,
  }
}
