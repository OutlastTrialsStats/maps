import { onBeforeUnmount, ref, watch, type Ref } from 'vue'
import type { Vec2 } from '../model/types'

/** Observed size of an element in CSS pixels ([0, 0] while unknown). */
export function useElementSize(elRef: Readonly<Ref<Element | null>>): Ref<Vec2> {
  const size = ref<Vec2>([0, 0])
  const observer = new ResizeObserver((entries) => {
    const rect = entries[0]?.contentRect
    if (rect) {
      size.value = [rect.width, rect.height]
    }
  })

  watch(
    elRef,
    (el, previous) => {
      if (previous) {
        observer.unobserve(previous)
      }
      if (el) {
        observer.observe(el)
      }
    },
    { immediate: true, flush: 'post' },
  )

  onBeforeUnmount(() => observer.disconnect())

  return size
}
