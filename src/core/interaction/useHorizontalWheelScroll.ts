import type { Ref } from 'vue'

/** Übersetzt Mausrad-Scrollen in horizontales Container-Scrollen; ohne Überlauf scrollt die Seite normal weiter. */
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
