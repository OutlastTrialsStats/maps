/** Base URL of all content fetched at runtime (public/data). */
export const DATA_BASE_URL = '/data'
export const MAPS_INDEX_URL = `${DATA_BASE_URL}/maps/index.json`
export const ELEMENT_LIBRARY_URL = `${DATA_BASE_URL}/elements.json`
export const ZONE_LIBRARY_URL = `${DATA_BASE_URL}/zones.json`
export const CONTRIBUTORS_URL = `${DATA_BASE_URL}/contributors.json`
export const SCHEMA_BASE_URL = '/schemas'

/** Repo behind the join link of the contributors section. */
export const GITHUB_REPO_URL = 'https://github.com/OutlastTrialsStats/maps'

/** Embed script of outlasttrialsstats.com defining `<totstats-profile>`. */
export const PROFILE_WIDGET_SRC = 'https://outlasttrialsstats.com/widget/totstats-profile.js'
/** Avatar edge length of the embedded profile card, in px. */
export const PROFILE_WIDGET_SIZE = 64

/** Grid snapping in the editor, in map units (1 unit ≈ 10 cm of game world). */
export const GRID_SNAP_FINE = 2.5
export const GRID_SNAP_DEFAULT = 5

/** Zoom factor, not percent. */
export const ZOOM_MIN = 0.25
export const ZOOM_MAX = 8

/** Fallback for elements without their own `size`, in map units. */
export const ICON_DEFAULT_SIZE = 10

/** ID format of all data IDs (in sync with the `kebabId` pattern of the schemas). */
export const KEBAB_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

/** Host of all game images (element icons are stored as a full URL under it). */
export const GAME_ASSETS_BASE_URL = 'https://outlasttrialsstats.com/game-assets'

/** Icon reference: webp URL under GAME_ASSETS_BASE_URL (in sync with the `icon` pattern in elements.schema.json). */
export const ICON_URL_PATTERN = /^https:\/\/outlasttrialsstats\.com\/game-assets\/[A-Za-z0-9._/-]+\.webp$/

export const EDITOR_AUTOSAVE_KEY = 'outlasttrials-maps:editor-autosave'
/** Payload version of the autosave; older states are discarded (not migratable). */
export const EDITOR_AUTOSAVE_VERSION = 2

export const CURSOR_STORAGE_KEY = 'outlasttrials-maps:custom-cursor'
export const AUTOSAVE_DEBOUNCE_MS = 1000
export const UNDO_STACK_LIMIT = 100

export const VALIDATION_DEBOUNCE_MS = 500

/** Editor grid in map units; lines are only drawn once their pixel spacing is large enough. */
export const EDITOR_GRID_MINOR = 5
export const EDITOR_GRID_MAJOR = 25
export const GRID_MIN_SPACING_PX = 8

/** Keyboard nudge in map units (arrow keys, large with Shift). */
export const NUDGE_STEP = 1
export const NUDGE_STEP_LARGE = 5

/**
 * Rotations are limited to fixed steps (R key and properties select);
 * in sync with the `multipleOf` of the `rotation` field in the map schema.
 */
export const ROTATION_STEP_DEG = 45
export const ROTATION_VALUES = Array.from(
  { length: 360 / ROTATION_STEP_DEG },
  (_, index) => index * ROTATION_STEP_DEG,
)

/** Offset of duplicated objects (Ctrl+D), in map units. */
export const DUPLICATE_OFFSET = 5

/** Hit radius for vertex handles and for switching the active drawing end, in map units. */
export const VERTEX_HIT_RADIUS = 4

/** Touch: a long press opens the viewer context menu (docs/99 P7). */
export const LONG_PRESS_MS = 500
export const LONG_PRESS_MOVE_TOLERANCE_PX = 10

/** Offset of the placement tooltip from the mouse cursor, in pixels. */
export const TOOLTIP_OFFSET_PX = 14

/** Share of the viewport that fit-view uses (the rest is margin). */
export const FIT_VIEW_PADDING_RATIO = 0.9

// Render style (values needed in component logic — pure CSS colors live in the CSS)
export const ROOM_WALL_WIDTH = 2.5
export const SECRET_ROOM_FILL = '#6e6432'
export const DISABLED_ROOM_OPACITY = 0.45
export const FALLBACK_ZONE_FILL = '#4a4a4a'
export const FALLBACK_ZONE_WALLS = '#111111'
export const DEFAULT_LABEL_FONT_SIZE = 8
export const UNKNOWN_ELEMENT_COLOR = '#7f8c8d'
/** Font size of the placeholder initials relative to the icon size. */
export const PLACEHOLDER_FONT_RATIO = 0.45
export const SELECTION_COLOR = '#4da3ff'
/** Gap of the selection ring around icons, in map units. */
export const SELECTION_RING_OFFSET = 2
export const CAMERA_MARKER_SIZE = 8
