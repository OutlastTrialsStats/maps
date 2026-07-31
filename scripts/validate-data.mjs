/**
 * Validates all JSON data under public/data/ against the schemas under
 * public/schemas/ plus the logic rules from docs/02-datenmodell.md §5.
 * The logic rules live exactly once in src/core/model/validation.ts and are
 * imported here via native Node type stripping (Node >= 23.6).
 * Runs locally (pnpm validate:data) and in CI.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv'
import { mapManifestPath, trialDocumentPath } from '../src/core/model/dataPaths.ts'
import {
  checkUniqueIds,
  collectContributorIssues,
  collectLibraryIssues,
  collectManifestIssues,
  collectTrialLogicIssues,
  collectZoneLibraryIssues,
} from '../src/core/model/validation.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (relPath) => JSON.parse(readFileSync(join(root, relPath), 'utf8'))

// Image limits from docs/05 §3.3.
const SCREENSHOT_MAX_BYTES = 500 * 1024
const SCREENSHOT_WARN_BYTES = 300 * 1024
const SCREENSHOT_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const SCHEMA_IDS = {
  mapsIndex: 'https://maps.outlasttrialsstats.com/schemas/maps-index.schema.json',
  map: 'https://maps.outlasttrialsstats.com/schemas/map.schema.json',
  trial: 'https://maps.outlasttrialsstats.com/schemas/trial.schema.json',
  elements: 'https://maps.outlasttrialsstats.com/schemas/elements.schema.json',
  zones: 'https://maps.outlasttrialsstats.com/schemas/zones.schema.json',
  contributors: 'https://maps.outlasttrialsstats.com/schemas/contributors.schema.json',
}

const ajv = new Ajv({ allErrors: true })
ajv.addSchema(readJson('public/schemas/maps-index.schema.json'))
ajv.addSchema(readJson('public/schemas/map.schema.json'))
ajv.addSchema(readJson('public/schemas/trial.schema.json'))
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

let validatedManifests = 0
let validatedTrials = 0
/** Authors per map — the basis for reconciling with contributors.json. */
const authorsByMapId = new Map()
/** Screenshots shared by several trial files are only checked/reported once. */
const checkedScreenshots = new Set()
for (const entry of mapsIndex.maps) {
  const relPath = `public/data/${mapManifestPath(entry.id)}`
  if (!existsSync(join(root, relPath))) {
    if (entry.enabled) {
      errors.push(`${relPath}: missing map.json for enabled map "${entry.id}"`)
    }
    continue
  }
  const manifest = readJson(relPath)
  if (!validateSchema(relPath, SCHEMA_IDS.map, manifest)) {
    continue
  }
  if (manifest.id !== entry.id) {
    errors.push(`${relPath}: map id "${manifest.id}" does not match registry id "${entry.id}"`)
  }
  authorsByMapId.set(entry.id, manifest.meta.authors)
  reportIssues(relPath, collectManifestIssues(manifest))
  validatedManifests += 1

  const trialsDir = dirname(`public/data/${trialDocumentPath(entry.id, 'x')}`)
  const manifestTrialIds = new Set(manifest.trials.map((trial) => trial.id))
  for (const trial of manifest.trials) {
    const trialPath = `public/data/${trialDocumentPath(entry.id, trial.id)}`
    if (!existsSync(join(root, trialPath))) {
      if (entry.enabled) {
        errors.push(`${trialPath}: missing trial file for trial "${trial.id}" of enabled map "${entry.id}"`)
      }
      continue
    }
    const trialDoc = readJson(trialPath)
    if (!validateSchema(trialPath, SCHEMA_IDS.trial, trialDoc)) {
      continue
    }
    if (trialDoc.mapId !== entry.id) {
      errors.push(`${trialPath}: mapId "${trialDoc.mapId}" does not match map "${entry.id}"`)
    }
    if (trialDoc.trialId !== trial.id) {
      errors.push(`${trialPath}: trialId "${trialDoc.trialId}" does not match file name "${trial.id}.json"`)
    }
    reportIssues(trialPath, collectTrialLogicIssues(trialDoc, library, zones))
    for (const room of trialDoc.rooms) {
      for (const image of room.info?.images ?? []) {
        const screenshotPath = `public/data/maps/${entry.id}/${image.src}`
        if (!checkedScreenshots.has(screenshotPath)) {
          checkedScreenshots.add(screenshotPath)
          checkScreenshot(screenshotPath)
        }
      }
    }
    validatedTrials += 1
  }

  // Orphan trial files would be deployed but are unreachable via the manifest.
  if (existsSync(join(root, trialsDir))) {
    for (const file of readdirSync(join(root, trialsDir))) {
      if (file.endsWith('.json') && !manifestTrialIds.has(file.slice(0, -'.json'.length))) {
        errors.push(`${trialsDir}/${file}: trial file is not listed in the manifest`)
      }
    }
  }
}

const contributors = readJson('public/data/contributors.json')
if (validateSchema('public/data/contributors.json', SCHEMA_IDS.contributors, contributors)) {
  const knownMapIds = new Set(mapsIndex.maps.map((entry) => entry.id))
  reportIssues(
    'public/data/contributors.json',
    collectContributorIssues(contributors, authorsByMapId, knownMapIds),
  )
  // Missing profiles do not block a PR — they show the maintainer what is still open.
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
  `Validation OK: elements.json, zones.json, contributors.json, maps/index.json, ${validatedManifests} manifest(s), ${validatedTrials} trial file(s).`,
)
