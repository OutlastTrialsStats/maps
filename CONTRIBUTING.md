# Contributing to Outlast Trials Maps

All map content is plain JSON under `public/data/`. You build and fix maps in the web editor at [maps.outlasttrialsstats.com/editor](https://maps.outlasttrialsstats.com/editor) — no coding, no tools to install. Getting your work in takes a free GitHub account and about five minutes.

**You cannot break anything.** Nothing you submit goes live directly; a maintainer reviews every change first.

---

## Quick version

1. Open the [editor](https://maps.outlasttrialsstats.com/editor), build or fix a map, put your name into **Map properties → Authors**.
2. Click **Export**. Validation runs automatically — fix anything it reports, then click the **copy icon** next to `map.json`.
3. Open the file on GitHub in edit mode, for example
   [`public/data/maps/police-station/map.json`](https://github.com/SuprexDE/outlasttrials-maps/edit/main/public/data/maps/police-station/map.json)
   (same URL pattern for any other map). GitHub creates your own copy of the project automatically — just confirm.
4. Select everything in the text box (<kbd>Ctrl</kbd>+<kbd>A</kbd>), paste your JSON (<kbd>Ctrl</kbd>+<kbd>V</kbd>), click **Commit changes…** → **Propose changes** → **Create pull request**.
5. Fill in the short form, submit. Automatic checks run, a maintainer reviews and merges — then it's live.

Changed elements or zones too? The export dialog lists `elements.json` / `zones.json` as extra rows — repeat steps 3–4 for each, they live at `public/data/elements.json` and `public/data/zones.json`. Screenshots and brand-new maps need a few extra clicks — see below.

---

## Step by step (if you have never used GitHub)

### What is this even doing?

GitHub is where this project's files live. You never get to change them directly — instead you make a copy, change it there, and ask for your change to be pulled in. That request is called a **pull request** (PR). A maintainer looks at it and either merges it or asks you a question. That's the whole idea.

### 1. Create a GitHub account

Go to [github.com](https://github.com) → **Sign up**. It's free, takes a minute. Then come back here.

### 2. Build your map in the editor

Open the [editor](https://maps.outlasttrialsstats.com/editor) and either:

- **start a new map**, or
- **load an existing map** ("Load existing map") to correct it, or
- **import** a `map.json` you worked on earlier.

Your progress is saved in your browser automatically, so you can close the tab and continue later. Put your name into `meta.authors` — the editor asks for it in the start dialog and under **Map properties**. That's what shows up in the map's **Credits** panel.

### 3. Export

Click **Export**. Validation runs first: if something is wrong (an icon pointing at a deleted element, a room without a shape, …) you get a list and the export stays blocked until it's clean.

The dialog then shows **one row per file you changed**, each with the exact path it belongs to in the repository:

| Row             | Belongs to                          | When                         |
| --------------- | ----------------------------------- | ---------------------------- |
| `map.json`      | `public/data/maps/<mapId>/map.json` | always                       |
| `elements.json` | `public/data/elements.json`         | only if you changed elements |
| `zones.json`    | `public/data/zones.json`            | only if you changed zones    |

Each row has a **copy** button (puts the JSON on your clipboard) and a **Download** button. For the next step, copy is the easy path.

### 4. Put the file on GitHub

For an **existing file** (this is the common case — fixing a map, or an updated `elements.json`):

1. Open the file's edit URL in your browser. The pattern is:
   `https://github.com/SuprexDE/outlasttrials-maps/edit/main/` + the path from the export dialog.
   Example: [`.../edit/main/public/data/maps/police-station/map.json`](https://github.com/SuprexDE/outlasttrials-maps/edit/main/public/data/maps/police-station/map.json)
2. GitHub shows a notice that you don't have write access and that it will create a **fork** (your own copy) — confirm it. This replaces the whole "fork the repo first" dance; you don't have to do anything else.
3. Click into the text area, select everything (<kbd>Ctrl</kbd>+<kbd>A</kbd>) and paste your JSON (<kbd>Ctrl</kbd>+<kbd>V</kbd>). Yes, replacing the entire content is correct — the export is the complete file.
4. Click **Commit changes…**. Write one short line describing what you did ("Fix key position in Holding Cells"). Leave the rest at its defaults and confirm.
5. GitHub now offers **Create pull request**. Click it.

For a **new file** (a brand-new map, or screenshots):

- New `map.json`: open `https://github.com/SuprexDE/outlasttrials-maps/new/main/public/data/maps/` and type `<mapId>/map.json` as the filename, then paste.
- Also add your map to `public/data/maps/index.json` — otherwise it won't appear on the start page. Open that file in edit mode and copy an existing entry as a template.
- Screenshots go to `public/data/maps/<mapId>/img/`. Those are images, so paste doesn't work: use **Add file → Upload files** on that folder and drop them in.

### 5. Fill in the pull request

The form is pre-filled with a template asking what changed, which map and trials are affected, and where the screenshots came from. Answer briefly, tick the checklist, submit.

### 6. What happens next

- Automatic checks (CI) validate your files against the schemas within a couple of minutes. If something is red, click the details — it names the file and the problem. You can fix it by editing the file in your pull request; the checks re-run by themselves.
- A maintainer reviews the content (does the layout match the game? are the images yours?) and merges.
- After the merge the site rebuilds and your change is live.

If you get stuck at any point, open an issue and describe where — that's not a bother, it's useful feedback on these instructions.

---

## For developers

Fork, branch, commit, push, open a pull request against `main`. Before pushing:

```bash
npm ci
npm run validate:data   # exactly what CI runs on your data
npm run lint
npm run typecheck
```

Node.js ≥ 24 required.

## Credits and the Map Contributor badge

Your name in `meta.authors` is shown in the map's **Credits** panel in the viewer.

If you want to be linked, add your **outlasttrialsstats.com profile URL** to the pull request (there's a field in the template). A maintainer then adds you to `public/data/contributors.json` — that's what puts you on the start page with avatar, profile link and the maps you worked on — and grants you the **Map Contributor** badge on outlasttrialsstats.com. You never edit `contributors.json` yourself.

## Rules for images

- Screenshots: **jpg, png or webp**, at most **500 KB** each (aim for under 300 KB).
- Element icons are **URLs only** (`https://outlasttrialsstats.com/game-assets/….webp`) — no icon files are stored in this repository.
- Never include extracted game assets (textures, sounds, models).

## Elements and zones are shared

The element library (`public/data/elements.json`) and the zone library (`public/data/zones.json`) are used by **all** maps. You can create, edit and delete entries directly in the editor ("Library" button), and the export dialog offers the changed files automatically. Because a rename or a colour change affects every map, these changes get a closer look in review. Deleting an entry is blocked while another map still uses it.
