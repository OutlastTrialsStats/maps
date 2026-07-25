import Ajv, { type ValidateFunction } from 'ajv'
import { SCHEMA_BASE_URL } from '../constants'
import { fetchJson } from './dataSource'
import type { ValidationIssue } from './validation'

/**
 * Ajv-Schema-Validierung im Browser. Bewusst eigenes Modul: Ajv darf nur im
 * lazy geladenen Editor-Chunk landen, nie im Viewer-Bundle.
 */

export type SchemaValidator = (data: unknown) => ValidationIssue[]

const cache = new Map<string, Promise<SchemaValidator>>()

export function getMapSchemaValidator(): Promise<SchemaValidator> {
  return getValidator('map.schema.json')
}

export function getLibrarySchemaValidator(): Promise<SchemaValidator> {
  return getValidator('elements.schema.json')
}

export function getZonesSchemaValidator(): Promise<SchemaValidator> {
  return getValidator('zones.schema.json')
}

/** Lädt und kompiliert ein Schema einmalig; alle Schemas sind self-contained. */
function getValidator(schemaFile: string): Promise<SchemaValidator> {
  const cached = cache.get(schemaFile) ?? createValidator(schemaFile)
  cache.set(schemaFile, cached)
  return cached
}

async function createValidator(schemaFile: string): Promise<SchemaValidator> {
  const schema = await fetchJson<object>(`${SCHEMA_BASE_URL}/${schemaFile}`)
  const ajv = new Ajv({ allErrors: true })
  const validate: ValidateFunction = ajv.compile(schema)
  return (data: unknown): ValidationIssue[] => {
    if (validate(data)) {
      return []
    }
    return (validate.errors ?? []).map((error) => ({
      path: instancePathToDots(error.instancePath),
      message: error.message ?? 'invalid',
    }))
  }
}

/** Ajv-Pfad "/rooms/3/shape/path" → lesbares "rooms[3].shape.path". */
function instancePathToDots(instancePath: string): string {
  return instancePath
    .split('/')
    .filter(Boolean)
    .map((segment) => (/^\d+$/.test(segment) ? `[${segment}]` : `.${segment}`))
    .join('')
    .replace(/^\./, '')
}
