import { ref, watch, type Ref } from 'vue'
import { VALIDATION_DEBOUNCE_MS } from '../../core/constants'
import {
  collectManifestIssues,
  collectTrialLogicIssues,
  type ValidationIssue,
} from '../../core/model/validation'
import { useEditorStore } from './editorStore'
import { useLibraryStore } from './libraryStore'
import { useZonesStore } from './zonesStore'

/** Debounced validation of the open workspace, shown in the status bar. */
export function useValidationIssues(): Ref<ValidationIssue[]> {
  const editor = useEditorStore()
  const libraryStore = useLibraryStore()
  const zonesStore = useZonesStore()
  const issues = ref<ValidationIssue[]>([])
  let timer: number | undefined

  // `revision` instead of a deep watcher: the 100+ KB document is never traversed.
  watch(
    [
      () => editor.document,
      () => editor.revision,
      () => libraryStore.library,
      () => zonesStore.zoneLibrary,
    ],
    ([doc]) => {
      window.clearTimeout(timer)
      if (!doc) {
        issues.value = []
        return
      }
      timer = window.setTimeout(() => {
        issues.value = [
          ...(editor.manifest ? collectManifestIssues(editor.manifest) : []),
          ...collectTrialLogicIssues(doc, libraryStore.library, zonesStore.zoneLibrary),
        ]
      }, VALIDATION_DEBOUNCE_MS)
    },
    { immediate: true },
  )

  return issues
}
