import { defineStore } from 'pinia'
import { computed } from 'vue'
import { loadElementLibrary } from '../../core/model/dataSource'
import { buildElementIndex } from '../../core/model/elementIndex'
import type { ElementDefinition, ElementLibrary } from '../../core/model/types'
import { useWorkingCopy } from './workingCopy'

export interface ElementGroup {
  id: string
  name: string
  elements: ElementDefinition[]
}

/** Palette/manager view: elements by category, empty groups are dropped. */
export function groupElementsByCategory(
  library: ElementLibrary | null,
  matches: (element: ElementDefinition) => boolean = () => true,
): ElementGroup[] {
  return (library?.categories ?? [])
    .map((category) => ({
      id: category.id,
      name: category.name,
      elements: (library?.elements ?? []).filter(
        (element) => element.category === category.id && matches(element),
      ),
    }))
    .filter((group) => group.elements.length > 0)
}

export const useLibraryStore = defineStore('library', () => {
  const copy = useWorkingCopy(loadElementLibrary, 'element library')

  const categories = computed(() => copy.working.value?.categories ?? [])
  const elements = computed(() => copy.working.value?.elements ?? [])
  const elementIndex = computed(() => buildElementIndex(copy.working.value))

  return {
    library: copy.working,
    loadError: copy.loadError,
    dirty: copy.dirty,
    categories,
    elements,
    elementIndex,
    load: copy.load,
    restore: copy.restore,
    markExported: copy.markExported,
  }
})
