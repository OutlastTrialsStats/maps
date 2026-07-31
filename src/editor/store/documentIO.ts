import { EDITOR_AUTOSAVE_KEY, EDITOR_AUTOSAVE_VERSION } from '../../core/constants'
import { loadMapManifest } from '../../core/model/dataSource'
import type {
  ElementLibrary,
  MapManifest,
  Trial,
  TrialDocument,
  ZoneLibrary,
} from '../../core/model/types'
import {
  collectManifestIssues,
  collectTrialLogicIssues,
  type ValidationIssue,
} from '../../core/model/validation'
import { jsonClone } from './jsonClone'

/** Undo/autosave unit of the editor: manifest + trial document + global working copies. */
export interface WorkspaceSnapshot {
  manifest: MapManifest
  document: TrialDocument
  library: ElementLibrary | null
  zones: ZoneLibrary | null
}

export interface AutosavePayload extends WorkspaceSnapshot {
  version: number
  savedAt: string
}

/** "fun-park" → "Fun Park" — prefill for names derived from kebab-case IDs. */
export function titleCaseFromId(id: string): string {
  return id
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/** Manifest skeleton — shared by "new map" and the import fallback. */
function createManifest(id: string, trial: Trial, author?: string): MapManifest {
  return {
    $schema: '../../../schemas/map.schema.json',
    id,
    meta: { name: titleCaseFromId(id), authors: [author?.trim() || 'anonymous'] },
    trials: [trial],
  }
}

/** Registers a trial in the manifest if missing — single owner of the entry shape. */
export function ensureTrialInManifest(manifest: MapManifest, trialId: string, name?: string): void {
  if (!manifest.trials.some((trial) => trial.id === trialId)) {
    manifest.trials.push({ id: trialId, name: name?.trim() || titleCaseFromId(trialId) })
  }
}

export function createEmptyWorkspace(
  id: string,
  author?: string,
): { manifest: MapManifest; document: TrialDocument } {
  const trialId = 'main'
  return {
    manifest: createManifest(id, { id: trialId, name: 'Main Trial', default: true }, author),
    document: createTrialDocument(id, trialId),
  }
}

/**
 * New trial file — empty or as a full copy of an existing trial (the shared
 * base of a map is duplicated per trial).
 */
export function createTrialDocument(
  mapId: string,
  trialId: string,
  source?: TrialDocument,
): TrialDocument {
  return {
    $schema: '../../../../schemas/trial.schema.json',
    mapId,
    trialId,
    floors: source ? jsonClone(source.floors) : [{ index: 0, name: 'First Floor' }],
    filters: source ? jsonClone(source.filters) : [],
    rooms: source ? jsonClone(source.rooms) : [],
    placements: source ? jsonClone(source.placements) : [],
    routes: source ? jsonClone(source.routes) : [],
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
    if (payload.version !== EDITOR_AUTOSAVE_VERSION || !payload.document || !payload.manifest) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

/** Load Ajv only on demand — keeps the editor chunk small. */
export function loadSchemaValidation() {
  return import('../../core/model/schemaValidation')
}

/** Schema + logic validation before the export, per file; both empty = exportable. */
export async function validateForExport(
  manifest: MapManifest,
  document: TrialDocument,
  library: ElementLibrary | null,
  zones: ZoneLibrary | null,
): Promise<{ manifest: ValidationIssue[]; trial: ValidationIssue[] }> {
  const schemaValidation = await loadSchemaValidation()
  const [validateManifest, validateTrial] = await Promise.all([
    schemaValidation.getManifestSchemaValidator(),
    schemaValidation.getTrialSchemaValidator(),
  ])
  const manifestSchemaIssues = validateManifest(manifest)
  const manifestIssues =
    manifestSchemaIssues.length > 0 ? manifestSchemaIssues : collectManifestIssues(manifest)
  const trialSchemaIssues = validateTrial(document)
  const trialIssues =
    trialSchemaIssues.length > 0
      ? trialSchemaIssues
      : collectTrialLogicIssues(document, library, zones)
  return { manifest: manifestIssues, trial: trialIssues }
}

export interface ImportResult {
  workspace?: { manifest: MapManifest; document: TrialDocument }
  issues: ValidationIssue[]
}

/**
 * Imports a single trial file. The matching manifest is fetched from the repo;
 * without one (new map) it is synthesized, an unknown trial is appended.
 */
export async function importDocument(
  text: string,
  library: ElementLibrary | null,
  zones: ZoneLibrary | null,
): Promise<ImportResult> {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch (error) {
    return { issues: [{ path: '', message: `Invalid JSON: ${String(error)}` }] }
  }
  const validateSchema = await (await loadSchemaValidation()).getTrialSchemaValidator()
  const schemaIssues = validateSchema(parsed)
  if (schemaIssues.length > 0) {
    return { issues: schemaIssues }
  }
  const documentData = parsed as TrialDocument
  const logicIssues = collectTrialLogicIssues(documentData, library, zones)
  if (logicIssues.length > 0) {
    return { issues: logicIssues }
  }
  let manifest: MapManifest
  try {
    manifest = await loadMapManifest(documentData.mapId)
  } catch {
    manifest = createManifest(documentData.mapId, {
      id: documentData.trialId,
      name: titleCaseFromId(documentData.trialId),
      default: true,
    })
  }
  ensureTrialInManifest(manifest, documentData.trialId)
  return { workspace: { manifest, document: documentData }, issues: [] }
}

/** Canonical export format: 2 spaces + trailing newline. */
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
