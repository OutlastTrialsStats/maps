import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'
import { select, type Selection } from 'd3-selection'
import { zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior } from 'd3-zoom'
import { FIT_VIEW_PADDING_RATIO, ZOOM_MAX, ZOOM_MIN } from '../constants'
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
}

/**
 * Wraps d3-zoom: mouse wheel zoom at the cursor position and pinch are always
 * active, panning via the middle mouse button, a held space bar or (with
 * `dragPan`) directly via the left mouse button.
 */
export function usePanZoom(svgRef: Readonly<Ref<SVGSVGElement | null>>, options?: PanZoomOptions) {
  const transform = ref<ViewTransform>({ x: 0, y: 0, k: 1 })
  const isSpacePanning = ref(false)
  let behavior: ZoomBehavior<SVGSVGElement, unknown> | null = null
  let selection: Selection<SVGSVGElement, unknown, null, undefined> | null = null

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
  const preventMiddleClickScroll = (event: PointerEvent) => {
    if (event.button === 1) {
      event.preventDefault()
    }
  }

  onMounted(() => {
    const svg = svgRef.value
    if (!svg) {
      return
    }
    behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([ZOOM_MIN, ZOOM_MAX])
      .filter((event: Event) => {
        if (event.type === 'wheel' || event.type.startsWith('touch')) {
          return true
        }
        const mouse = event as MouseEvent
        return (
          mouse.button === 1 ||
          (mouse.button === 0 && (options?.dragPan === true || isSpacePanning.value))
        )
      })
      .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
        transform.value = { x: event.transform.x, y: event.transform.y, k: event.transform.k }
      })
    selection = select(svg)
    selection.call(behavior)
    svg.addEventListener('pointerdown', preventMiddleClickScroll)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
  })

  onBeforeUnmount(() => {
    selection?.on('.zoom', null)
    svgRef.value?.removeEventListener('pointerdown', preventMiddleClickScroll)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
  })

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
    resetView,
    zoomBy,
  }
}
