# Changelog

## [0.2.1] - 2026-08-02

- chore(deps-dev): bump vite from 8.1.5 to 8.2.0 (585b545)
- ci: bump actions/upload-pages-artifact from 4 to 5 (d82600f)
- ci: bump actions/deploy-pages from 4 to 5 (cd5db83)
- ci: bump actions/configure-pages from 5 to 6 (85e3841)
- chore: remove Docker-based deployment and migrate to GitHub Pages with updated release workflow (60c3c94)
- feat: add room scaling, clipboard, and resize tools with enhanced support for room geometry adjustments and object duplication (0677fc8)
- feat: enhance export workflow with per-file tracking, "Exported" indicators, and session-based artifacts (d8866be)

## [0.2.0] - 2026-07-31

- chore: simplify packageManager field in package.json (1139b52)
- feat: replace NumberMarkers with CalloutMarkers, add support for icons, colors, and dashed lines (ed32c93)
- feat: add room wall gaps, new door/window elements and number markers (4cea942)
- feat: simplify icon handling by switching to bare file names, add enhanced UI feedback for tools (cf426d7)
- feat: remove migrate visibility logic and add remove element options and deselect elements (f9c5ad4)
- feat: integrate `<totstats-profile>` widget and refine contributors display (d0f1663)
- ci: bump docker/login-action from 3 to 4.5.2 (c53e7a2)
- ci: bump docker/metadata-action from 5 to 6 (576098e)
- ci: bump docker/setup-buildx-action from 3 to 4 (23d8217)

## [0.1.3] - 2026-07-26

- feat: improve polygon drawing with active-end switching, undo/redo, and orthogonal snapping (600f053)

## [0.1.2] - 2026-07-25

- docs: translate code comments from German to English (24f1933)
- chore: replace npm with pnpmn (b7f1a03)
- docs: update CONTRIBUTING guide for clarity and streamlined instructions (fe23347)
- chore: remove docker-compose configuration (7203d46)
- docs: rewrite README for clarity and improved structure (046df0a)

## [0.1.1] - 2026-07-25

- feature: add release workflow and Docker-based deployment (4fcbdd0)
- chore(deps-dev): bump brace-expansion from 5.0.7 to 5.0.8 (c3e4ecd)
- ci: bump actions/setup-node from 4 to 7 (289725c)
- chore(deps-dev): bump eslint from 10.7.0 to 10.8.0 (b462aa7)
- ci: bump actions/checkout from 4 to 7 (51079a4)
- feature: init project (f46c95b)