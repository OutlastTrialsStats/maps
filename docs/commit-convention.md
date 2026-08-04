# Commit Convention

This repository uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages
on `main` drive the release: [release-please](https://github.com/googleapis/release-please) reads
them to determine the next version and to generate `CHANGELOG.md`.

**Who needs to follow this:** maintainers, and anyone submitting code changes from a local git
checkout. Contributors who only edit map JSON through the GitHub web UI do **not** — see
[Contributor commits](#contributor-commits).

## Format

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

```
feat(editor): add marquee selection to the select tool
fix(viewer): keep the room tooltip inside the viewport
feat(data)!: switch trial file layout to one file per trial
```

## Types

| Type       | Version bump | Changelog                |
| ---------- | ------------ | ------------------------ |
| `feat`     | minor        | Features                 |
| `fix`      | patch        | Bug Fixes                |
| `perf`     | patch        | Performance Improvements |
| `refactor` | patch        | Code Refactoring         |
| `chore`    | patch        | Miscellaneous Chores     |
| `deps`     | patch        | Dependencies             |
| `docs`     | patch        | Documentation            |
| `ci`       | patch        | Continuous Integration   |
| `style`    | none         | hidden                   |

Release-please opens (or updates) the release PR as soon as at least one commit since the last
tag lands in a non-hidden changelog section. Hidden types (`style`, `test`, `build`, `revert`)
are valid but neither appear in the changelog nor trigger a release on their own — they ride
along with the next one. Triggering only means the release PR exists; nothing is released until
a maintainer merges it.

A `!` before the colon or a `BREAKING CHANGE:` footer bumps the **major** version, regardless of
type.

## Dependabot

Dependabot uses these types automatically: `deps` for runtime dependencies (they are part of the
shipped bundle, so they warrant a release), `chore` for dev-only dependencies and `ci` for GitHub
Actions (they only affect tooling and workflows).

## Contributor commits

Map-data pull requests are usually committed through the GitHub web UI with a free-form message
like "Fix key position in Holding Cells" — that is fine and expected; release-please simply
ignores commits that do not follow the convention. So that such changes still trigger a release
and show up in the changelog, the maintainer merges these PRs with **squash** and a conventional
title, e.g. `fix(data): correct key position in Police Station trial 1`.

## Release flow (maintainers)

Every push to `main` runs release-please, which maintains a **release PR** collecting all
releasable commits since the last tag. Merging that PR is the release: it bumps `package.json`,
updates `CHANGELOG.md`, tags `vX.Y.Z`, creates the GitHub release and deploys the build to
GitHub Pages. Nothing goes live before a maintainer merges the release PR.
