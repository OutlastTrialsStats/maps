# Outlast Trials Maps

Interactive maps for **The Outlast Trials**, plus a web editor to build them. Runs at [maps.outlasttrialsstats.com](https://maps.outlasttrialsstats.com).

Everything on the maps is data, not code. Maps, floors, trials, rooms, zones and placed elements live as plain JSON in `public/data/`, so adding a map or fixing a wrong icon means editing a JSON file, not writing a component. The editor does that part for you in the browser.

In the viewer you pick a map, a trial and a floor, then explore the rooms: descriptions, screenshots, enemy spawns, keys, doors, stairs. Icon categories can be filtered and the current view is shareable as a link.

The editor lets you draw rooms, place elements, set up floors and trials, and export the whole thing as JSON. Your work is autosaved in the browser and there is no account to create. Exported files get submitted as a pull request and go live once reviewed.

## Contributing

Map content goes through the [web editor](https://maps.outlasttrialsstats.com/editor) and a pull request, so you don't need a dev setup for it. [CONTRIBUTING.md](CONTRIBUTING.md) has the full walkthrough, the image rules and how the **Map Contributor** badge works.

## Stack

Vue 3 + Vite + TypeScript (strict), Vue Router, Pinia, PrimeVue 4 with a dark custom theme, SVG rendering with d3-zoom/d3-selection for pan and zoom, Ajv for JSON schema validation. There is no backend; the app is a static build served by nginx in a container.

## Development

Requires Node.js ≥ 24. The package manager is pnpm; `corepack enable` picks up the version pinned in `package.json`.

```bash
pnpm install
pnpm dev            # dev server
pnpm build          # static build into dist/
pnpm preview        # serve the production build locally
pnpm lint           # ESLint
pnpm typecheck      # vue-tsc
pnpm format         # Prettier
pnpm validate:data  # validate public/data against the JSON schemas
```

`pnpm lint` and `pnpm typecheck` have to pass before every pull request. CI also runs `validate:data`.

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
docker compose pull maps
docker compose up -d maps     # published on http://localhost:8080
```

Or build the image yourself: `docker build -t outlasttrials-maps . && docker run --rm -p 8080:80 outlasttrials-maps`.

## Assets and attribution

No game assets are stored in this repository. Element icons are referenced by file name on `outlasttrialsstats.com/game-assets/`, screenshots are captured and provided by contributors. The Outlast Trials is a trademark of Red Barrels. This is an unofficial, non-commercial fan project.
