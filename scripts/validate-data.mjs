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
import {
  CONTRIBUTORS_PATH,
  ELEMENT_LIBRARY_PATH,
  MAPS_INDEX_PATH,
  ZONE_LIBRARY_PATH,
  mapManifestPath,
  trialDocumentPath,
  trialsDirPath,
} from '../src/core/model/dataPaths.ts'
import {
  collectContributorIssues,
  collectLibraryIssues,
  collectManifestIssues,
  collectMapsIndexIssues,
  collectTrialLogicIssues,
  collectZoneLibraryIssues,
} from '../src/core/model/validation.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (relPath) => JSON.parse(readFileSync(join(root, relPath), 'utf8'))

// Image limits from docs/05 §3.3.
const SCREENSHOT_MAX_BYTES = 500 * 1024
const SCREENSHOT_WARN_BYTES = 300 * 1024
const SCREENSHOT_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const ajv = new Ajv({ allErrors: true })
// All $refs are schema-local, so plain per-file compilation is enough.
const validators = Object.fromEntries(
  ['maps-index', 'map', 'trial', 'elements', 'zones', 'contributors'].map((name) => [
    name,
    ajv.compile(readJson(`public/schemas/${name}.schema.json`)),
  ]),
)

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

function validateSchema(relPath, validate, data) {
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

const libraryPath = `public/data/${ELEMENT_LIBRARY_PATH}`
const library = readJson(libraryPath)
if (validateSchema(libraryPath, validators.elements, library)) {
  reportIssues(libraryPath, collectLibraryIssues(library))
}

const zonesPath = `public/data/${ZONE_LIBRARY_PATH}`
const zones = readJson(zonesPath)
if (validateSchema(zonesPath, validators.zones, zones)) {
  reportIssues(zonesPath, collectZoneLibraryIssues(zones))
}

const mapsIndexPath = `public/data/${MAPS_INDEX_PATH}`
const mapsIndex = readJson(mapsIndexPath)
validateSchema(mapsIndexPath, validators['maps-index'], mapsIndex)
reportIssues(mapsIndexPath, collectMapsIndexIssues(mapsIndex))

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
  if (!validateSchema(relPath, validators.map, manifest)) {
    continue
  }
  if (manifest.id !== entry.id) {
    errors.push(`${relPath}: map id "${manifest.id}" does not match registry id "${entry.id}"`)
  }
  authorsByMapId.set(entry.id, manifest.meta.authors)
  reportIssues(relPath, collectManifestIssues(manifest))
  validatedManifests += 1

  const trialsDir = `public/data/${trialsDirPath(entry.id)}`
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
    if (!validateSchema(trialPath, validators.trial, trialDoc)) {
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

const contributorsPath = `public/data/${CONTRIBUTORS_PATH}`
const contributors = readJson(contributorsPath)
if (validateSchema(contributorsPath, validators.contributors, contributors)) {
  const knownMapIds = new Set(mapsIndex.maps.map((entry) => entry.id))
  reportIssues(contributorsPath, collectContributorIssues(contributors, authorsByMapId, knownMapIds))
  // Missing profiles do not block a PR — they show the maintainer what is still open.
  const credited = new Set(contributors.contributors.map((entry) => entry.name))
  for (const [mapId, authors] of authorsByMapId) {
    for (const author of authors) {
      if (!credited.has(author)) {
        warnings.push(
          `${contributorsPath}: "${author}" (map "${mapId}") has no entry — the start page shows no profile link`,
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
