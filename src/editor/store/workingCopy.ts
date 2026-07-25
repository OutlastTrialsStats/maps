import { computed, ref, type Ref } from 'vue'
import { jsonClone } from './jsonClone'

/**
 * Editable working copy of a global data set (elements, zones):
 * `original` is the fetched repo state and the comparison baseline for `dirty`;
 * `working` is mutated in the editor and goes into undo snapshots and autosave.
 */
export function useWorkingCopy<T>(load: () => Promise<T>, errorLabel: string) {
  const original = ref(null) as Ref<T | null>
  const working = ref(null) as Ref<T | null>
  const loadError = ref('')

  const dirty = computed(
    () =>
      original.value !== null &&
      JSON.stringify(working.value) !== JSON.stringify(original.value),
  )

  async function loadOriginal(): Promise<void> {
    if (original.value) {
      return
    }
    try {
      original.value = await load()
      loadError.value = ''
      // A working copy restored from autosave takes precedence over the fetch.
      working.value = working.value ?? jsonClone(original.value)
    } catch (error) {
      loadError.value = `Failed to load the ${errorLabel}: ${String(error)}`
    }
  }

  function restore(snapshot: T | null): void {
    working.value = snapshot
  }

  function markExported(): void {
    original.value = jsonClone(working.value)
  }

  return { working, loadError, dirty, load: loadOriginal, restore, markExported }
}
