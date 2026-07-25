import { EDITOR_AUTOSAVE_KEY, EDITOR_AUTOSAVE_VERSION } from '../../core/constants'
import type { ElementLibrary, MapDefinition, ZoneLibrary } from '../../core/model/types'
import { collectMapLogicIssues, type ValidationIssue } from '../../core/model/validation'

/** Undo-/Autosave-Einheit des Editors: Dokument + globale Arbeitskopien. */
export interface WorkspaceSnapshot {
  document: MapDefinition
  library: ElementLibrary | null
  zones: ZoneLibrary | null
}

export interface AutosavePayload extends WorkspaceSnapshot {
  version: number
  savedAt: string
}

/** "fun-park" → "Fun Park" — Vorbelegung für meta.name aus der Map-ID. */
function titleCaseFromId(id: string): string {
  return id
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function createEmptyDocument(id: string, author?: string): MapDefinition {
  return {
    $schema: '../../../schemas/map.schema.json',
    id,
    meta: { name: titleCaseFromId(id), authors: [author?.trim() || 'anonymous'] },
    trials: [{ id: 'main', name: 'Main Trial', default: true }],
    floors: [{ index: 0, name: 'First Floor' }],
    filters: [],
    rooms: [],
    placements: [],
    routes: [],
  }
}

export function saveAutosave(workspace: WorkspaceSnapshot): string | null {
  try {
    const payload: AutosavePayload = {
      version: EDITOR_AUTOSAVE_VERSION,
      savedAt: new Date().toISOString(),
      ...workspace,
    }
    localStorage.setItem(EDITOR_AUTOSAVE_KEY, JSON.stringify(payload))
    return null
  } catch (error) {
    return `Autosave failed: ${String(error)}`
  }
}

export function loadAutosave(): AutosavePayload | null {
  try {
    const raw = localStorage.getItem(EDITOR_AUTOSAVE_KEY)
    if (!raw) {
      return null
    }
    const payload = JSON.parse(raw) as AutosavePayload
    if (payload.version !== EDITOR_AUTOSAVE_VERSION || !payload.document) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

/** Ajv erst bei Bedarf laden — hält den Editor-Chunk klein. */
export function loadSchemaValidation() {
  return import('../../core/model/schemaValidation')
}

/** Schema- + Logik-Validierung vor dem Export; leer = exportierbar. */
export async function validateForExport(
  document: MapDefinition,
  library: ElementLibrary | null,
  zones: ZoneLibrary | null,
): Promise<ValidationIssue[]> {
  const validateSchema = await (await loadSchemaValidation()).getMapSchemaValidator()
  const schemaIssues = validateSchema(document)
  if (schemaIssues.length > 0) {
    return schemaIssues
  }
  return collectMapLogicIssues(document, library, zones)
}

/** Import aus Datei/Zwischenablage: JSON-Parse → Schema → Logikregeln. */
export async function importDocument(
  text: string,
  library: ElementLibrary | null,
  zones: ZoneLibrary | null,
): Promise<{ document?: MapDefinition; issues: ValidationIssue[] }> {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch (error) {
    return { issues: [{ path: '', message: `Invalid JSON: ${String(error)}` }] }
  }
  const validateSchema = await (await loadSchemaValidation()).getMapSchemaValidator()
  const schemaIssues = validateSchema(parsed)
  if (schemaIssues.length > 0) {
    return { issues: schemaIssues }
  }
  const documentData = parsed as MapDefinition
  const logicIssues = collectMapLogicIssues(documentData, library, zones)
  if (logicIssues.length > 0) {
    return { issues: logicIssues }
  }
  return { document: documentData, issues: [] }
}

/** Kanonisches Export-Format: 2 Spaces + abschließender Zeilenumbruch. */
export function serializeJson(data: unknown): string {
  return `${JSON.stringify(data, null, 2)}\n`
}

export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([serializeJson(data)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
