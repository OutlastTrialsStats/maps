# Outlast Trials Maps

Interactive map viewer and web editor for **The Outlast Trials** — a fully static, JSON-driven take on the concept behind outlast.fex.dev, built on its own data set. Live at [maps.outlasttrialsstats.com](https://maps.outlasttrialsstats.com).

Where the original hardcodes every room and icon as a React component, this project describes everything as data: maps, floors, trials, rooms, zones and placed elements all live in plain JSON under `public/data/`. That makes the content editable by anyone — in the browser, without writing code.

- **Viewer** — pick a map, a trial and a floor; explore rooms with descriptions, screenshots, enemy spawns, keys, doors and stairs; filter icon categories; share deep links.
- **Editor** — draw rooms, place elements, define floors and trials, and export the result as JSON. Autosaved in your browser, no account needed.
- **Community** — exported files are submitted as GitHub pull requests against the JSON data and go live after review.

## Contributing

Map content is contributed through the [web editor](https://maps.outlasttrialsstats.com/editor) and a pull request — no development setup required. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full walkthrough, image rules, and how the **Map Contributor** badge works.

## Stack

Vue 3 + Vite + TypeScript (strict), Vue Router, Pinia, PrimeVue 4 with a dark custom theme, native SVG rendering with d3-zoom/d3-selection, and Ajv for JSON schema validation. No backend — the app ships as a static build served by nginx via Docker.

## Development

Requires Node.js ≥ 24.

```bash
npm install
npm run dev            # dev server
npm run build          # static build into dist/
npm run preview        # serve the production build locally
npm run lint           # ESLint
npm run typecheck      # vue-tsc
npm run format         # Prettier
npm run validate:data  # validate public/data against the JSON schemas
```

`npm run lint` and `npm run typecheck` must pass before every pull request; CI additionally runs `validate:data`.

## Project structure

```
public/data/       map registry, map definitions, global element and zone libraries
public/schemas/    JSON schemas for every data file
src/core/          data model, validation, SVG render engine, pan/zoom, shared UI
src/viewer/        viewer routes, panels and store
src/editor/        editor routes, tools, panels and store (lazy-loaded)
scripts/           data validation used by CI
```

`core/` never imports from `viewer/` or `editor/`, and those two never import from each other.

## Deployment

```bash
docker compose up -d --build   # nginx serving dist/ on port 8080
```

## Assets and attribution

No game assets are stored in this repository. Element icons are referenced as URLs on `outlasttrialsstats.com/game-assets/`; screenshots are captured and provided by contributors. The Outlast Trials is a trademark of Red Barrels — this is an unofficial, non-commercial fan project.
