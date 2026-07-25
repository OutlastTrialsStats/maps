import { computed, ref, type Ref } from 'vue'
import { jsonClone } from './jsonClone'

/**
 * Editierbare Arbeitskopie eines globalen Datenbestands (Elemente, Zonen):
 * `original` ist der gefetchte Repo-Stand und Vergleichsbasis für `dirty`;
 * `working` wird im Editor mutiert und wandert in Undo-Snapshots und Autosave.
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
      // Eine per Autosave restaurierte Arbeitskopie hat Vorrang vor dem Fetch.
      working.value = working.value ?? jsonClone(original.value)
    } catch (error) {
      loadError.value = `Failed to load the ${errorLabel}: ${String(error)}`
    }
  }

  function restore(snapshot: T | null): void {
    working.value = snapshot
  }

  /** Nach dem Export ist der exportierte Stand die neue Vergleichsbasis. */
  function markExported(): void {
    original.value = jsonClone(working.value)
  }

  return { working, loadError, dirty, load: loadOriginal, restore, markExported }
}
