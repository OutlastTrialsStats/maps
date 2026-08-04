import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'
import { select, type Selection } from 'd3-selection'
import { zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior } from 'd3-zoom'
import {
  FIT_VIEW_PADDING_RATIO,
  RIGHT_DRAG_PAN_THRESHOLD_PX,
  WHEEL_LINE_HEIGHT_PX,
  ZOOM_MAX,
  ZOOM_MIN,
} from '../constants'
import type { Vec2 } from '../model/types'
import { isEditableTarget } from './eventTargets'
import type { ViewTransform } from './viewTransform'

export interface WorldBounds {
  min: Vec2
  max: Vec2
}

export interface PanZoomOptions {
  /** Pan with the left mouse button as well — in the editor it stays reserved for the tools. */
  dragPan?: boolean
  /** Pan with the right mouse button; a right-click without movement keeps its own action. */
  rightDragPan?: boolean
}

/**
 * Wraps d3-zoom: mouse wheel zoom at the cursor position and pinch are always
 * active, Shift/Alt + wheel pans instead, and dragging pans via the middle
 * mouse button, a held space bar, the right button (`rightDragPan`) or the
 * left button (`dragPan`).
 */
export function usePanZoom(svgRef: Readonly<Ref<SVGSVGElement | null>>, options?: PanZoomOptions) {
  const transform = ref<ViewTransform>({ x: 0, y: 0, k: 1 })
  const isSpacePanning = ref(false)
  const isPanning = ref(false)
  let behavior: ZoomBehavior<SVGSVGElement, unknown> | null = null
  let selection: Selection<SVGSVGElement, unknown, null, undefined> | null = null
  let rightDragStart: Vec2 | null = null
  let rightDragMoved = false

  const onKeyDown = (event: KeyboardEvent) => {
    if (
      event.code === 'Space' &&
      !isEditableTarget(event.target) &&
      !(event.target instanceof HTMLButtonElement)
    ) {
      isSpacePanning.value = true
      event.preventDefault()
    }
  }
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      isSpacePanning.value = false
    }
  }
  const onWindowBlur = () => {
    isSpacePanning.value = false
  }
  const preventMiddleClickScroll = (event: PointerEvent) => {
    if (event.button === 1) {
      event.preventDefault()
    }
  }

  const onWheelPan = (event: WheelEvent) => {
    if (!event.shiftKey && !event.altKey) {
      return
    }
    // A shifted wheel arrives as deltaX on some platforms.
    const raw = event.deltaX !== 0 ? event.deltaX : event.deltaY
    const pixels = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? raw * WHEEL_LINE_HEIGHT_PX : raw
    panBy(event.shiftKey ? pixels : 0, event.shiftKey ? 0 : pixels)
    event.preventDefault()
  }

  const beginRightDrag = (event: PointerEvent) => {
    if (event.button === 2) {
      rightDragStart = [event.clientX, event.clientY]
      rightDragMoved = false
    }
  }
  const trackRightDrag = (event: PointerEvent) => {
    if (!rightDragStart || rightDragMoved) {
      return
    }
    const travel = Math.hypot(event.clientX - rightDragStart[0], event.clientY - rightDragStart[1])
    rightDragMoved = travel > RIGHT_DRAG_PAN_THRESHOLD_PX
  }
  /** `rightDragMoved` has to survive this: `contextmenu` only fires after the pointer-up. */
  const endRightDrag = () => {
    rightDragStart = null
  }
  /**
   * Capture on window so it runs before the listeners on the canvas itself:
   * a right-drag must neither open the menu nor trigger the tool's own action.
   */
  const suppressContextMenuAfterDrag = (event: MouseEvent) => {
    if (!rightDragMoved) {
      return
    }
    rightDragMoved = false
    event.preventDefault()
    event.stopPropagation()
  }

  onMounted(() => {
    const svg = svgRef.value
    if (!svg) {
      return
    }
    behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([ZOOM_MIN, ZOOM_MAX])
      .filter((event: Event) => {
        if (event.type === 'wheel') {
          const wheel = event as WheelEvent
          return !wheel.shiftKey && !wheel.altKey
        }
        if (event.type.startsWith('touch')) {
          return true
        }
        const mouse = event as MouseEvent
        return (
          mouse.button === 1 ||
          (mouse.button === 2 && options?.rightDragPan === true) ||
          (mouse.button === 0 && (options?.dragPan === true || isSpacePanning.value))
        )
      })
      .on('start', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
        // Only a real drag grabs — wheel zoom and programmatic transforms must not.
        isPanning.value = (event.sourceEvent as Event | null)?.type === 'mousedown'
      })
      .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
        transform.value = { x: event.transform.x, y: event.transform.y, k: event.transform.k }
      })
      .on('end', () => {
        isPanning.value = false
      })
    selection = select(svg)
    selection.call(behavior)
    svg.addEventListener('pointerdown', preventMiddleClickScroll)
    svg.addEventListener('wheel', onWheelPan, { passive: false })
    if (options?.rightDragPan === true) {
      svg.addEventListener('pointerdown', beginRightDrag)
      window.addEventListener('pointermove', trackRightDrag)
      window.addEventListener('pointerup', endRightDrag)
      window.addEventListener('pointercancel', endRightDrag)
      window.addEventListener('contextmenu', suppressContextMenuAfterDrag, true)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onWindowBlur)
  })

  onBeforeUnmount(() => {
    selection?.on('.zoom', null)
    svgRef.value?.removeEventListener('pointerdown', preventMiddleClickScroll)
    svgRef.value?.removeEventListener('wheel', onWheelPan)
    svgRef.value?.removeEventListener('pointerdown', beginRightDrag)
    window.removeEventListener('pointermove', trackRightDrag)
    window.removeEventListener('pointerup', endRightDrag)
    window.removeEventListener('pointercancel', endRightDrag)
    window.removeEventListener('contextmenu', suppressContextMenuAfterDrag, true)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
    window.removeEventListener('blur', onWindowBlur)
  })

  /** Moves the viewport by screen pixels; d3 translates in world units, hence the division by k. */
  function panBy(dx: number, dy: number): void {
    if (behavior && selection) {
      behavior.translateBy(selection, -dx / transform.value.k, -dy / transform.value.k)
    }
  }

  /** Scales around the viewport center; d3 clamps against the scale extent. */
  function zoomBy(factor: number): void {
    if (behavior && selection) {
      behavior.scaleBy(selection, factor)
    }
  }

  /** Fits the view to the given world bounds (without bounds: identity). */
  function resetView(bounds?: WorldBounds): void {
    const svg = svgRef.value
    if (!svg || !behavior || !selection) {
      return
    }
    if (!bounds) {
      selection.call(behavior.transform, zoomIdentity)
      return
    }
    const rect = svg.getBoundingClientRect()
    const width = bounds.max[0] - bounds.min[0]
    const height = bounds.max[1] - bounds.min[1]
    if (rect.width === 0 || rect.height === 0 || width <= 0 || height <= 0) {
      return
    }
    const scale = Math.min(
      Math.max(
        Math.min(rect.width / width, rect.height / height) * FIT_VIEW_PADDING_RATIO,
        ZOOM_MIN,
      ),
      ZOOM_MAX,
    )
    const center: Vec2 = [(bounds.min[0] + bounds.max[0]) / 2, (bounds.min[1] + bounds.max[1]) / 2]
    selection.call(
      behavior.transform,
      zoomIdentity
        .translate(rect.width / 2, rect.height / 2)
        .scale(scale)
        .translate(-center[0], -center[1]),
    )
  }

  return {
    transform: readonly(transform),
    isSpacePanning: readonly(isSpacePanning),
    isPanning: readonly(isPanning),
    resetView,
    zoomBy,
    panBy,
  }
}
