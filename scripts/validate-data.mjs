/**
 * Validiert alle JSON-Daten unter public/data/ gegen die Schemas unter
 * public/schemas/ plus die Logikregeln aus docs/02-datenmodell.md §5.
 * Die Logikregeln leben genau einmal in src/core/model/validation.ts und
 * werden hier per nativem Node-Type-Stripping importiert (Node >= 23.6).
 * Läuft lokal (pnpm validate:data) und in der CI.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv'
import {
  checkUniqueIds,
  collectContributorIssues,
  collectLibraryIssues,
  collectMapLogicIssues,
  collectZoneLibraryIssues,
} from '../src/core/model/validation.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (relPath) => JSON.parse(readFileSync(join(root, relPath), 'utf8'))

// Bild-Limits aus docs/05 §3.3.
const SCREENSHOT_MAX_BYTES = 500 * 1024
const SCREENSHOT_WARN_BYTES = 300 * 1024
const SCREENSHOT_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const SCHEMA_IDS = {
  mapsIndex: 'https://maps.outlasttrialsstats.com/schemas/maps-index.schema.json',
  map: 'https://maps.outlasttrialsstats.com/schemas/map.schema.json',
  elements: 'https://maps.outlasttrialsstats.com/schemas/elements.schema.json',
  zones: 'https://maps.outlasttrialsstats.com/schemas/zones.schema.json',
  contributors: 'https://maps.outlasttrialsstats.com/schemas/contributors.schema.json',
}

const ajv = new Ajv({ allErrors: true })
ajv.addSchema(readJson('public/schemas/maps-index.schema.json'))
ajv.addSchema(readJson('public/schemas/map.schema.json'))
ajv.addSchema(readJson('public/schemas/elements.schema.json'))
ajv.addSchema(readJson('public/schemas/zones.schema.json'))
ajv.addSchema(readJson('public/schemas/contributors.schema.json'))

const errors = []
const warnings = []

function checkScreenshot(relPath) {
  const fullPath = join(root, relPath)
  if (!existsSync(fullPath)) {
    errors.push(`${relPath}: referenced screenshot file is missing`)
    return
  }
  if (!SCREENSHOT_EXTENSIONS.has(extname(relPath).toLowerCase())) {
    errors.push(`${relPath}: screenshots must be jpg, png or webp`)
    return
  }
  const { size } = statSync(fullPath)
  if (size > SCREENSHOT_MAX_BYTES) {
    errors.push(`${relPath}: ${Math.round(size / 1024)} KB exceeds the 500 KB screenshot limit`)
  } else if (size > SCREENSHOT_WARN_BYTES) {
    warnings.push(`${relPath}: ${Math.round(size / 1024)} KB — consider compressing below 300 KB`)
  }
}

function validateSchema(relPath, schemaId, data) {
  const validate = ajv.getSchema(schemaId)
  if (!validate(data)) {
    for (const err of validate.errors) {
      errors.push(`${relPath}${err.instancePath}: ${err.message}`)
    }
    return false
  }
  return true
}

function reportIssues(relPath, issues) {
  for (const issue of issues) {
    errors.push(`${relPath}: ${issue.path ? `${issue.path}: ` : ''}${issue.message}`)
  }
}

const library = readJson('public/data/elements.json')
if (validateSchema('public/data/elements.json', SCHEMA_IDS.elements, library)) {
  reportIssues('public/data/elements.json', collectLibraryIssues(library))
}

const zones = readJson('public/data/zones.json')
if (validateSchema('public/data/zones.json', SCHEMA_IDS.zones, zones)) {
  reportIssues('public/data/zones.json', collectZoneLibraryIssues(zones))
}

const mapsIndex = readJson('public/data/maps/index.json')
validateSchema('public/data/maps/index.json', SCHEMA_IDS.mapsIndex, mapsIndex)
{
  const indexIssues = []
  checkUniqueIds(
    indexIssues,
    'maps',
    'map',
    mapsIndex.maps.map((entry) => entry.id),
  )
  reportIssues('public/data/maps/index.json', indexIssues)
}

let validatedMaps = 0
/** Autoren je Map — Grundlage für den Abgleich mit contributors.json. */
const authorsByMapId = new Map()
for (const entry of mapsIndex.maps) {
  const relPath = `public/data/maps/${entry.id}/map.json`
  if (!existsSync(join(root, relPath))) {
    if (entry.enabled) {
      errors.push(`${relPath}: missing map.json for enabled map "${entry.id}"`)
    }
    continue
  }
  const map = readJson(relPath)
  if (validateSchema(relPath, SCHEMA_IDS.map, map)) {
    if (map.id !== entry.id) {
      errors.push(`${relPath}: map id "${map.id}" does not match registry id "${entry.id}"`)
    }
    authorsByMapId.set(entry.id, map.meta.authors)
    reportIssues(relPath, collectMapLogicIssues(map, library, zones))
    for (const room of map.rooms) {
      for (const image of room.info?.images ?? []) {
        checkScreenshot(`public/data/maps/${entry.id}/${image.src}`)
      }
    }
  }
  validatedMaps += 1
}

const contributors = readJson('public/data/contributors.json')
if (validateSchema('public/data/contributors.json', SCHEMA_IDS.contributors, contributors)) {
  const knownMapIds = new Set(mapsIndex.maps.map((entry) => entry.id))
  reportIssues(
    'public/data/contributors.json',
    collectContributorIssues(contributors, authorsByMapId, knownMapIds),
  )
  // Fehlende Profile blockieren keinen PR — sie zeigen dem Maintainer offene Nachträge.
  const credited = new Set(contributors.contributors.map((entry) => entry.name))
  for (const [mapId, authors] of authorsByMapId) {
    for (const author of authors) {
      if (!credited.has(author)) {
        warnings.push(
          `public/data/contributors.json: "${author}" (map "${mapId}") has no entry — the start page shows no profile link`,
        )
      }
    }
  }
}

if (warnings.length > 0) {
  console.warn(`${warnings.length} warning(s):`)
  for (const message of warnings) {
    console.warn(`  - ${message}`)
  }
}
if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`)
  for (const message of errors) {
    console.error(`  - ${message}`)
  }
  process.exit(1)
}
console.log(
  `Validation OK: elements.json, zones.json, contributors.json, maps/index.json, ${validatedMaps} map file(s).`,
)
