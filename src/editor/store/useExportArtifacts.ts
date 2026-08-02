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

const MANIFEST_FILENAME = 'map.json'
const LIBRARY_FILENAME = 'elements.json'
const ZONES_FILENAME = 'zones.json'

/** One exportable file of the PR workflow including its target path in the repo. */
export interface ExportArtifact {
  filename: string
  repoPath: string
  data: unknown
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
    const list: ExportArtifact[] = [
      {
        filename: MANIFEST_FILENAME,
        repoPath: `public/data/${mapManifestPath(manifest.id)}`,
        data: manifest,
      },
      {
        filename: `${doc.trialId}.json`,
        repoPath: `public/data/${trialDocumentPath(manifest.id, doc.trialId)}`,
        data: doc,
      },
    ]
    if (libraryStore.dirty && libraryStore.library) {
      list.push({
        filename: LIBRARY_FILENAME,
        repoPath: `public/data/${LIBRARY_FILENAME}`,
        data: libraryStore.library,
      })
    }
    if (zonesStore.dirty && zonesStore.zoneLibrary) {
      list.push({
        filename: ZONES_FILENAME,
        repoPath: `public/data/${ZONES_FILENAME}`,
        data: zonesStore.zoneLibrary,
      })
    }
    return list
  })

  /**
   * Resets the dirty baselines of the files that actually left the editor.
   * Runs once when the export dialog closes — resetting per click would drop
   * the row out of `artifacts` mid-session.
   */
  function commitExports(exported: ReadonlySet<string>): void {
    const doc = store.document
    if (!doc) {
      return
    }
    // Manifest and trial file share one dirty flag — it may only clear once both are out.
    if (exported.has(MANIFEST_FILENAME) && exported.has(`${doc.trialId}.json`)) {
      store.dirty = false
    }
    if (exported.has(LIBRARY_FILENAME)) {
      libraryStore.markExported()
    }
    if (exported.has(ZONES_FILENAME)) {
      zonesStore.markExported()
    }
  }

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
      ...prefixIssues(MANIFEST_FILENAME, result.manifest),
      ...prefixIssues(`${doc.trialId}.json`, result.trial),
    ]
    if (libraryValidator && libraryStore.library) {
      const validate = await libraryValidator
      const schemaIssues = validate(libraryStore.library)
      issues.push(
        ...prefixIssues(
          LIBRARY_FILENAME,
          schemaIssues.length > 0 ? schemaIssues : collectLibraryIssues(libraryStore.library),
        ),
      )
    }
    if (zonesValidator && zonesStore.zoneLibrary) {
      const validate = await zonesValidator
      const schemaIssues = validate(zonesStore.zoneLibrary)
      issues.push(
        ...prefixIssues(
          ZONES_FILENAME,
          schemaIssues.length > 0
            ? schemaIssues
            : collectZoneLibraryIssues(zonesStore.zoneLibrary),
        ),
      )
    }
    return issues
  }

  return { artifacts, validateAll, commitExports }
}
