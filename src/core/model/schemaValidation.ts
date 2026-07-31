import Ajv, { type ValidateFunction } from 'ajv'
import { SCHEMA_BASE_URL } from '../constants'
import { fetchJson } from './dataSource'
import type { ValidationIssue } from './validation'

/**
 * Ajv schema validation in the browser. Deliberately its own module: Ajv may
 * only end up in the lazily loaded editor chunk, never in the viewer bundle.
 */

export type SchemaValidator = (data: unknown) => ValidationIssue[]

const cache = new Map<string, Promise<SchemaValidator>>()

export function getManifestSchemaValidator(): Promise<SchemaValidator> {
  return getValidator('map.schema.json')
}

export function getTrialSchemaValidator(): Promise<SchemaValidator> {
  return getValidator('trial.schema.json')
}

export function getLibrarySchemaValidator(): Promise<SchemaValidator> {
  return getValidator('elements.schema.json')
}

export function getZonesSchemaValidator(): Promise<SchemaValidator> {
  return getValidator('zones.schema.json')
}

/** Loads and compiles a schema once; all schemas are self-contained. */
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

/** Ajv path "/rooms/3/shape/path" → readable "rooms[3].shape.path". */
function instancePathToDots(instancePath: string): string {
  return instancePath
    .split('/')
    .filter(Boolean)
    .map((segment) => (/^\d+$/.test(segment) ? `[${segment}]` : `.${segment}`))
    .join('')
    .replace(/^\./, '')
}
