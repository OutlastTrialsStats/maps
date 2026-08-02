# Contributing to Outlast Trials Maps

All map content is plain JSON under `public/data/`. You build and fix maps in the web editor at
[maps.outlasttrialsstats.com/editor](https://maps.outlasttrialsstats.com/editor), so there is nothing to
install and no code to write. What you need is a free GitHub account and about five minutes. Nothing you
submit goes live directly; a maintainer reviews every change first. Questions at any point? Ask in the
support channel on [our Discord](https://discord.outlasttrialsstats.com/).

## 1. Get a GitHub account

Go to [github.com](https://github.com) and sign up. It's free and takes a minute.

GitHub is where this project's files live. You don't change them directly. Instead you make a copy, change
it there, and ask for your change to be pulled in. That request is called a pull request (PR), and a
maintainer either merges it or asks you a question.

## 2. Build your map in the editor

Open the [editor](https://maps.outlasttrialsstats.com/editor) and either start a new map, load an existing
one to correct it, or import files you exported earlier. Your progress is saved in the browser
automatically, so you can close the tab and continue later.

The start dialog of a new map asks for your name; filling it in is optional. Credits are handled in the
pull request later, a maintainer takes care of them (see the credits section below).

## 3. Export

Click **Export**. Validation runs first, and if something is wrong (an icon pointing at a deleted element,
a room without a shape, …) you get a list and the export stays blocked until it's clean.

The dialog then shows one row per file, each with the exact path it belongs to in the repository:
`map.json` and one file per trial always, plus `elements.json` and `zones.json` if you touched the
libraries. Every row has a copy button that puts the JSON on your clipboard and a Download button. For the
next step, copying is the easier path.

## 4. Put the file on GitHub

For an existing file, which is the common case:

1. Open the file's edit URL in your browser. The pattern is
   `https://github.com/OutlastTrialsStats/maps/edit/main/` plus the path from the export dialog, for
   example
   [`.../edit/main/public/data/maps/police-station/map.json`](https://github.com/OutlastTrialsStats/maps/edit/main/public/data/maps/police-station/map.json).
2. GitHub tells you that you don't have write access and offers to create a fork (your own copy). Confirm
   it. That replaces the whole "fork the repo first" dance, there is nothing else to set up.
3. Click into the text area, select everything (<kbd>Ctrl</kbd>+<kbd>A</kbd>) and paste your JSON
   (<kbd>Ctrl</kbd>+<kbd>V</kbd>). Replacing the entire content is correct, the export is the complete file.
4. Click **Commit changes…** and write one short line describing what you did, for example "Fix key
   position in Holding Cells". Leave the rest at its defaults and confirm.
5. GitHub now offers **Create pull request**. If this was your only file, click it and jump to step 5.

Usually there is more than one file — at least a trial file, maybe the libraries. Those have to go on the
same branch, so don't create the pull request yet. Go to your copy at `github.com/<your username>/maps`,
switch the branch dropdown (top left) from `main` to the branch GitHub just created (usually `patch-1`),
open the next file from the export dialog, click the pencil icon and paste and commit like before. When
all files are in, GitHub shows a **Compare & pull request** button on your copy — click that.

For a brand-new map:

- Create `map.json` via `https://github.com/OutlastTrialsStats/maps/new/main/public/data/maps/` and type
  `<mapId>/map.json` as the filename, then paste and commit. That creates your copy, same as above.
- Add the rest in your copy on that branch, via **Add file → Create new file**: each trial file as
  `<mapId>/trials/<trialId>.json`, exactly as listed in the export dialog.
- Set `"enabled": true` for your map in `public/data/maps/index.json`. All planned maps are already listed
  there and stay hidden on the start page until that flag is flipped.
- Screenshots go to `public/data/maps/<mapId>/img/`. Those are images, so pasting doesn't work: use
  **Add file → Upload files** on that folder and drop them in.

## 5. Open the pull request

The form is pre-filled with a template asking what changed and which map and trials are affected. Answer
briefly, tick the checklist, submit.

Automatic checks validate your files against the schemas within a couple of minutes. If something is red,
click the details, it names the file and the problem. Fix it by editing the file in your pull request and
the checks re-run by themselves. A maintainer then reviews the content (does the layout match the game? are
the images yours?) and merges. Merged changes go live with the next release, which a maintainer publishes
manually.

Stuck somewhere or unsure about anything? Ask in the support channel on
[our Discord](https://discord.outlasttrialsstats.com/) — any time, no question is too small. Opening an
issue here works too.

## Credits and the Map Contributor badge

Credits are managed by the maintainers, you never edit the files for them yourself. Put your name and, if
you want to be linked, your outlasttrialsstats.com profile URL into the pull request — the template has
fields for both. Your name then shows up in the map's Credits panel in the viewer; with a profile URL you
also get your card on the start page (avatar, profile link, the maps you worked on) and the Map Contributor
badge on outlasttrialsstats.com.

## Element icons

Element icons are referenced by file name only (e.g. `objectif_key`); host and `.webp` are added
automatically, the file must exist on `outlasttrialsstats.com/game-assets/`. No icon files are stored in
this repository.

## Elements and zones are shared

The element library (`public/data/elements.json`) and the zone library (`public/data/zones.json`) are used
by all maps. You can create, edit and delete entries directly in the editor via the **Library** button, and
the export dialog offers the changed files automatically. Because a rename or a colour change affects every
map, these changes get a closer look in review. Deleting an entry is blocked while another map still uses
it.
