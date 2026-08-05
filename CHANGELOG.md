# Changelog

## [0.4.0](https://github.com/OutlastTrialsStats/maps/compare/v0.3.0...v0.4.0) (2026-08-05)


### Features

* **editor:** accept external links as room screenshots ([#31](https://github.com/OutlastTrialsStats/maps/issues/31)) ([7cbc306](https://github.com/OutlastTrialsStats/maps/commit/7cbc306e9d104071a76653753864ff483e0b1d31))
* **editor:** add room merging functionality with Ctrl+M shortcut ([#30](https://github.com/OutlastTrialsStats/maps/issues/30)) ([dc22fb2](https://github.com/OutlastTrialsStats/maps/commit/dc22fb2a3933f643234bcc900bf7a11bec299079))
* **editor:** add support for shape drawing ([#29](https://github.com/OutlastTrialsStats/maps/issues/29)) ([0513856](https://github.com/OutlastTrialsStats/maps/commit/05138564e5649437bc98e50ffe4be7af9c71a2ae))
* ensure app mounts after router readiness ([#28](https://github.com/OutlastTrialsStats/maps/issues/28)) ([ecdec09](https://github.com/OutlastTrialsStats/maps/commit/ecdec090b52e57b66594d5d94267b075fb721006))


### Bug Fixes

* **editor:** keep element rows stable on hover ([#32](https://github.com/OutlastTrialsStats/maps/issues/32)) ([6ec195b](https://github.com/OutlastTrialsStats/maps/commit/6ec195b5cc7af5887d7c918d78604642a3e780b9))


### Continuous Integration

* bump marocchino/sticky-pull-request-comment from 2 to 3 ([#35](https://github.com/OutlastTrialsStats/maps/issues/35)) ([4ec4657](https://github.com/OutlastTrialsStats/maps/commit/4ec46576f0f622d4b761e170aa65535865deb699))
* switch releases to release-please ([#33](https://github.com/OutlastTrialsStats/maps/issues/33)) ([4230f10](https://github.com/OutlastTrialsStats/maps/commit/4230f10a7eaf3da695546d8d558997f797f0ee56))
* update GitHub Actions dependencies to latest versions ([35342dc](https://github.com/OutlastTrialsStats/maps/commit/35342dc0bdc7b6cf0bbabb4d5dc02d7eff82fa45))
* update GitHub Actions dependencies to latest versions ([4e7f24e](https://github.com/OutlastTrialsStats/maps/commit/4e7f24eac72d755661a765df13689f14911cf900))
* update release config ([#36](https://github.com/OutlastTrialsStats/maps/issues/36)) ([13ebfde](https://github.com/OutlastTrialsStats/maps/commit/13ebfde7630f210bda94aa8ca0790166543b51fa))

## [0.3.0] - 2026-08-04

- chore: Cleanup Code (3044db2)
- ci: add preview workflow and refactor deployment logic for GitHub Pages (36a999a)
- chore(deps-dev): bump vue-tsc in the pnpm-patches group (0c97958)
- ci: bump pnpm/action-setup from 4 to 6.0.9 (176110e)
- fix(editor): scale handle hit radius with the zoom level (3ab0baf)
- build(vite): use import attribute for package.json in vite.config (a8fe547)
- feat(editor): improve UX — feedback, data-loss protection, marquee, camera picker, editability (653f7d3)
- docs: update CONTRIBUTING.md, README.md, and PR template (5a3939c)

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
