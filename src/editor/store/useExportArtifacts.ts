import { computed } from 'vue'
import {
  collectLibraryIssues,
  collectZoneLibraryIssues,
  type ValidationIssue,
} from '../../core/model/validation'
import { loadSchemaValidation, validateForExport } from './documentIO'
import { useEditorStore } from './editorStore'
import { useLibraryStore } from './libraryStore'
import { useZonesStore } from './zonesStore'

/** Eine exportierbare Datei des PR-Workflows inkl. Zielpfad im Repo. */
export interface ExportArtifact {
  filename: string
  repoPath: string
  data: unknown
  /** Setzt die jeweilige Dirty-Basis zurück (Download oder Copy zählt als Export). */
  onExported: () => void
}

function prefixIssues(filename: string, issues: ValidationIssue[]): ValidationIssue[] {
  return issues.map((issue) => ({
    ...issue,
    path: issue.path ? `${filename}: ${issue.path}` : filename,
  }))
}

/**
 * Export-Artefakte: map.json immer; elements.json/zones.json nur, wenn die
 * globalen Arbeitskopien vom Repo-Stand abweichen. Export ist gesperrt,
 * solange irgendein Artefakt Validierungsfehler hat.
 */
export function useExportArtifacts() {
  const store = useEditorStore()
  const libraryStore = useLibraryStore()
  const zonesStore = useZonesStore()

  const artifacts = computed<ExportArtifact[]>(() => {
    const doc = store.document
    if (!doc) {
      return []
    }
    const list: ExportArtifact[] = [
      {
        filename: 'map.json',
        repoPath: `public/data/maps/${doc.id}/map.json`,
        data: doc,
        onExported: () => {
          store.dirty = false
        },
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
    if (!doc) {
      return []
    }
    const issues = prefixIssues(
      'map.json',
      await validateForExport(doc, libraryStore.library, zonesStore.zoneLibrary),
    )
    const schemaValidation = await loadSchemaValidation()
    if (libraryStore.dirty && libraryStore.library) {
      const validate = await schemaValidation.getLibrarySchemaValidator()
      const schemaIssues = validate(libraryStore.library)
      issues.push(
        ...prefixIssues(
          'elements.json',
          schemaIssues.length > 0 ? schemaIssues : collectLibraryIssues(libraryStore.library),
        ),
      )
    }
    if (zonesStore.dirty && zonesStore.zoneLibrary) {
      const validate = await schemaValidation.getZonesSchemaValidator()
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
