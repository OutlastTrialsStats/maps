import {
  CONTRIBUTORS_PATH,
  ELEMENT_LIBRARY_PATH,
  MAPS_INDEX_PATH,
  ZONE_LIBRARY_PATH,
} from './model/dataPaths'

/** Base URL of all content fetched at runtime (public/data); BASE_URL always ends with '/'. */
export const DATA_BASE_URL = `${import.meta.env.BASE_URL}data`
export const MAPS_INDEX_URL = `${DATA_BASE_URL}/${MAPS_INDEX_PATH}`
export const ELEMENT_LIBRARY_URL = `${DATA_BASE_URL}/${ELEMENT_LIBRARY_PATH}`
export const ZONE_LIBRARY_URL = `${DATA_BASE_URL}/${ZONE_LIBRARY_PATH}`
export const CONTRIBUTORS_URL = `${DATA_BASE_URL}/${CONTRIBUTORS_PATH}`
export const SCHEMA_BASE_URL = `${import.meta.env.BASE_URL}schemas`

export const GITHUB_REPO_URL = 'https://github.com/OutlastTrialsStats/maps#contributing'

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
/** Scale step of the +/− zoom buttons. */
export const ZOOM_BUTTON_FACTOR = 1.5

/** Wheel deltas in line mode (Firefox) are converted to px before panning. */
export const WHEEL_LINE_HEIGHT_PX = 16

/** Below this pointer travel (screen px) a right-drag stays a plain right-click. */
export const RIGHT_DRAG_PAN_THRESHOLD_PX = 4

/** Fallback for elements without their own `size`, in map units. */
export const ICON_DEFAULT_SIZE = 10

/** ID format of all data IDs (in sync with the `kebabId` pattern of the schemas). */
export const KEBAB_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

/** Host of all game images (element icons store only the bare file name below it). */
export const GAME_ASSETS_BASE_URL = 'https://outlasttrialsstats.com/game-assets'

/** Extension of every element icon; never part of the stored value. */
export const ICON_FILE_EXTENSION = '.webp'

/** Icon reference: bare file name without extension (in sync with the `icon` pattern in elements.schema.json). */
export const ICON_FILE_PATTERN = /^[A-Za-z0-9_-]+$/

export const EDITOR_AUTOSAVE_KEY = 'outlasttrials-maps:editor-autosave'
/** Payload version of the autosave; older states are discarded (not migratable). */
export const EDITOR_AUTOSAVE_VERSION = 4

export const CURSOR_STORAGE_KEY = 'outlasttrials-maps:custom-cursor'
/** The custom cursor image points slightly left of its top-left corner. */
export const CURSOR_HOTSPOT_OFFSET_PX = 2
export const AUTOSAVE_DEBOUNCE_MS = 1000
export const TOAST_LIFE_MS = 5000
export const UNDO_STACK_LIMIT = 100
/** Commits with the same coalesce key within this window share one undo snapshot. */
export const UNDO_COALESCE_MS = 800

export const VALIDATION_DEBOUNCE_MS = 500

/** Editor grid in map units; lines are only drawn once their pixel spacing is large enough. */
export const EDITOR_GRID_MINOR = 5
export const EDITOR_GRID_MAJOR = 25
export const GRID_MIN_SPACING_PX = 8

/** Keyboard nudge in map units (arrow keys, large with Shift). */
export const NUDGE_STEP = 1
export const NUDGE_STEP_LARGE = 5

/** Direction per arrow key; y grows downwards (screen and world alike). */
export const ARROW_DIRECTIONS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
}

/** Arrow-key view panning (empty selection), in screen px; Shift uses the large step. */
export const VIEW_PAN_STEP_PX = 40
export const VIEW_PAN_STEP_LARGE_PX = 200

/**
 * Rotations are limited to fixed steps (R key and properties select);
 * in sync with the `multipleOf` of the `rotation` field in the map schema.
 */
export const FULL_CIRCLE_DEG = 360
export const HALF_CIRCLE_DEG = 180
export const ROTATION_STEP_DEG = 45
export const ROTATION_VALUES = Array.from(
  { length: FULL_CIRCLE_DEG / ROTATION_STEP_DEG },
  (_, index) => index * ROTATION_STEP_DEG,
)

/** Offset of duplicated objects (Ctrl+D) and of a paste without cursor position, in map units. */
export const DUPLICATE_OFFSET = 5

/** Hit radius of vertex/resize handles in screen px; divided by the zoom for world-space hit tests. */
export const VERTEX_HIT_RADIUS_PX = 8

/** Below this pointer travel (screen px) an empty-canvas drag counts as a click, not a marquee. */
export const MARQUEE_MIN_DRAG_PX = 4

/** Smallest width/height a room can be resized to, in map units (one grid cell). */
export const ROOM_RESIZE_MIN_SIZE = 5

/** Open polylines (routes, inner lines) need at least a start and an end point. */
export const MIN_OPEN_PATH_POINTS = 2
/** A polygon room needs at least a triangle. */
export const MIN_POLYGON_POINTS = 3

/** Wall gaps (openings in a room outline), in map units. */
export const WALL_GAP_DEFAULT_LENGTH = 8
export const WALL_GAP_MIN_LENGTH = 1

/** Touch: a long press opens the viewer context menu. */
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
/** Default outline of free-standing shapes; per-shape overrides are optional. */
export const SHAPE_DEFAULT_COLOR = '#85858c'
export const SHAPE_DEFAULT_STROKE_WIDTH = 1
export const SHAPE_LINE_DASH = '3 2'
export const UNKNOWN_ELEMENT_COLOR = '#7f8c8d'
/** Font size of the placeholder initials relative to the icon size. */
export const PLACEHOLDER_FONT_RATIO = 0.45
export const SELECTION_COLOR = '#4da3ff'
/** Gap of the selection ring around icons, in map units. */
export const SELECTION_RING_OFFSET = 2
export const CAMERA_MARKER_SIZE = 8

// Structural shapes (all in map units, see src/core/render/structuralShapes.ts)
/** How far the barricade plank sticks out beyond both ends of the door. */
export const BARRICADE_OVERHANG = 2
export const BARRICADE_PLANK_THICKNESS = 2
/** Air between the door edge and the plank. */
export const BARRICADE_PLANK_GAP = 0.5
export const BARRICADE_HATCH_SPACING = 2
/** Spacing of the slanted bars of a crawl passage. */
export const CRAWL_BAR_SPACING = 1.6
/** Spacing of the step rungs on stairs. */
export const STAIRS_RUNG_SPACING = 3
/** Spacing of the teeth on obstacles. */
export const OBSTACLE_TOOTH_SPACING = 2.5

// Number marker (dot → leader line → diamond badge with a number)
export const MARKER_COLOR = '#aaaaaa'
export const MARKER_DOT_RADIUS = 1
export const MARKER_LEADER_WIDTH = 0.5
/** Half diagonal of the outer diamond. */
export const MARKER_BADGE_RADIUS = 5
export const MARKER_BADGE_INNER_RADIUS = 3
export const MARKER_FONT_SIZE = 5
/** Icon badge variant: image edge length, fitted into the diamond plate. */
export const MARKER_ICON_SIZE = 5
export const MARKER_LINE_DASH = '3 2'
/** Text baseline below the badge center, so the digits sit centered. */
export const MARKER_TEXT_BASELINE_OFFSET = 1.5
/** Badge position of a freshly created marker, relative to the placement. */
export const MARKER_DEFAULT_OFFSET: [number, number] = [0, -15]
