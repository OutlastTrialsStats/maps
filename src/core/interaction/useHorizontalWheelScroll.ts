import type { Ref } from 'vue'

/** Turns mouse wheel scrolling into horizontal container scrolling; without overflow the page keeps scrolling normally. */
export function useHorizontalWheelScroll(elRef: Readonly<Ref<HTMLElement | null>>): {
  onWheel: (event: WheelEvent) => void
} {
  function onWheel(event: WheelEvent): void {
    const el = elRef.value
    if (!el || el.scrollWidth <= el.clientWidth) {
      return
    }
    event.preventDefault()
    el.scrollLeft += event.deltaY + event.deltaX
  }

  return { onWheel }
}
