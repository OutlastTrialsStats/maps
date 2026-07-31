import { computed } from 'vue'
import { mapManifestPath, trialDocumentPath } from '../../core/model/dataPaths'
import {
  collectLibraryIssues,
  collectZoneLibraryIssues,
  type ValidationIssue,
} from '../../core/model/validation'
import { loadSchemaValidation, validateForExport } from './documentIO'
import { useEditorStore } from './editorStore'
import { useLibraryStore } from './libraryStore'
import { useZonesStore } from './zonesStore'

/** One exportable file of the PR workflow including its target path in the repo. */
export interface ExportArtifact {
  filename: string
  repoPath: string
  data: unknown
  /** Resets the respective dirty baseline (download or copy counts as an export). */
  onExported: () => void
}

function prefixIssues(filename: string, issues: ValidationIssue[]): ValidationIssue[] {
  return issues.map((issue) => ({
    ...issue,
    path: issue.path ? `${filename}: ${issue.path}` : filename,
  }))
}

/**
 * Export artifacts: manifest (map.json) and the edited trial file always;
 * elements.json/zones.json only when the global working copies differ from
 * the repo state. Exporting is blocked as long as any artifact has
 * validation errors.
 */
export function useExportArtifacts() {
  const store = useEditorStore()
  const libraryStore = useLibraryStore()
  const zonesStore = useZonesStore()

  const artifacts = computed<ExportArtifact[]>(() => {
    const doc = store.document
    const manifest = store.manifest
    if (!doc || !manifest) {
      return []
    }
    // Both files share one dirty baseline — exporting either one resets it.
    const markExported = (): void => {
      store.dirty = false
    }
    const list: ExportArtifact[] = [
      {
        filename: 'map.json',
        repoPath: `public/data/${mapManifestPath(manifest.id)}`,
        data: manifest,
        onExported: markExported,
      },
      {
        filename: `${doc.trialId}.json`,
        repoPath: `public/data/${trialDocumentPath(manifest.id, doc.trialId)}`,
        data: doc,
        onExported: markExported,
      },
    ]
    if (libraryStore.dirty && libraryStore.library) {
      list.push({
        filename: 'elements.json',
        repoPath: 'public/data/elements.json',
        data: libraryStore.library,
        onExported: () => libraryStore.markExported(),
      })
    }
    if (zonesStore.dirty && zonesStore.zoneLibrary) {
      list.push({
        filename: 'zones.json',
        repoPath: 'public/data/zones.json',
        data: zonesStore.zoneLibrary,
        onExported: () => zonesStore.markExported(),
      })
    }
    return list
  })

  async function validateAll(): Promise<ValidationIssue[]> {
    const doc = store.document
    const manifest = store.manifest
    if (!doc || !manifest) {
      return []
    }
    // Kick off all schema fetches before awaiting — they are cached per file.
    const schemaValidation = await loadSchemaValidation()
    const libraryValidator =
      libraryStore.dirty && libraryStore.library
        ? schemaValidation.getLibrarySchemaValidator()
        : null
    const zonesValidator =
      zonesStore.dirty && zonesStore.zoneLibrary ? schemaValidation.getZonesSchemaValidator() : null
    const result = await validateForExport(manifest, doc, libraryStore.library, zonesStore.zoneLibrary)
    const issues = [
      ...prefixIssues('map.json', result.manifest),
      ...prefixIssues(`${doc.trialId}.json`, result.trial),
    ]
    if (libraryValidator && libraryStore.library) {
      const validate = await libraryValidator
      const schemaIssues = validate(libraryStore.library)
      issues.push(
        ...prefixIssues(
          'elements.json',
          schemaIssues.length > 0 ? schemaIssues : collectLibraryIssues(libraryStore.library),
        ),
      )
    }
    if (zonesValidator && zonesStore.zoneLibrary) {
      const validate = await zonesValidator
      const schemaIssues = validate(zonesStore.zoneLibrary)
      issues.push(
        ...prefixIssues(
          'zones.json',
          schemaIssues.length > 0
            ? schemaIssues
            : collectZoneLibraryIssues(zonesStore.zoneLibrary),
        ),
      )
    }
    return issues
  }

  return { artifacts, validateAll }
}
