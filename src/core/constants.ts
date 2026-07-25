/** Basis-URL aller zur Laufzeit gefetchten Inhalte (public/data). */
export const DATA_BASE_URL = '/data'
export const MAPS_INDEX_URL = `${DATA_BASE_URL}/maps/index.json`
export const ELEMENT_LIBRARY_URL = `${DATA_BASE_URL}/elements.json`
export const ZONE_LIBRARY_URL = `${DATA_BASE_URL}/zones.json`
export const CONTRIBUTORS_URL = `${DATA_BASE_URL}/contributors.json`
export const SCHEMA_BASE_URL = '/schemas'

/** Repo für den "Mitmachen"-Hinweis der Contributors-Sektion. */
export const GITHUB_REPO_URL = 'https://github.com/SuprexDE/outlasttrials-maps'

/** Grid-Snapping im Editor in Map-Units (1 Unit ≈ 10 cm Spielwelt). */
export const GRID_SNAP_FINE = 2.5
export const GRID_SNAP_DEFAULT = 5

/** Zoom-Faktor, nicht Prozent. */
export const ZOOM_MIN = 0.25
export const ZOOM_MAX = 8

/** Fallback für Elemente ohne eigene `size`-Angabe, in Map-Units. */
export const ICON_DEFAULT_SIZE = 10

/** ID-Format aller Daten-IDs (synchron zum `kebabId`-Pattern der Schemas). */
export const KEBAB_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

/** Host aller Spiel-Bilder (Element-Icons als volle URL, Contributor-Avatare als Dateiname). */
export const GAME_ASSETS_BASE_URL = 'https://outlasttrialsstats.com/game-assets'

/** Icon-Referenz: webp-URL unter GAME_ASSETS_BASE_URL (synchron zum `icon`-Pattern in elements.schema.json). */
export const ICON_URL_PATTERN = /^https:\/\/outlasttrialsstats\.com\/game-assets\/[A-Za-z0-9._/-]+\.webp$/

export const EDITOR_AUTOSAVE_KEY = 'outlasttrials-maps:editor-autosave'
/** Payload-Version des Autosaves; ältere Stände werden verworfen (nicht migrierbar). */
export const EDITOR_AUTOSAVE_VERSION = 2

export const CURSOR_STORAGE_KEY = 'outlasttrials-maps:custom-cursor'
export const AUTOSAVE_DEBOUNCE_MS = 1000
export const UNDO_STACK_LIMIT = 100

/** Debounce der Live-Validierung in der Editor-Statusleiste. */
export const VALIDATION_DEBOUNCE_MS = 500

/** Editor-Grid in Map-Units; Linien werden erst ab ausreichendem Pixel-Abstand gezeichnet. */
export const EDITOR_GRID_MINOR = 5
export const EDITOR_GRID_MAJOR = 25
export const GRID_MIN_SPACING_PX = 8

/** Tastatur-Nudge in Map-Units (Pfeiltasten, mit Shift groß). */
export const NUDGE_STEP = 1
export const NUDGE_STEP_LARGE = 5

/**
 * Rotationen sind auf feste Schritte begrenzt (R-Taste und Properties-Select);
 * synchron zum `multipleOf` des `rotation`-Felds im map-Schema.
 */
export const ROTATION_STEP_DEG = 45
export const ROTATION_VALUES = Array.from(
  { length: 360 / ROTATION_STEP_DEG },
  (_, index) => index * ROTATION_STEP_DEG,
)

/** Versatz duplizierter Objekte (Strg+D), in Map-Units. */
export const DUPLICATE_OFFSET = 5

/** Trefferradius für Eckpunkt-Handles und Polygon-Schließen, in Map-Units. */
export const VERTEX_HIT_RADIUS = 4

/** Touch: Long-Press öffnet das Viewer-Kontextmenü (docs/99 P7). */
export const LONG_PRESS_MS = 500
export const LONG_PRESS_MOVE_TOLERANCE_PX = 10

/** Versatz des Platzierungs-Tooltips zum Mauszeiger, in Pixeln. */
export const TOOLTIP_OFFSET_PX = 14

/** Anteil des Viewports, den "Ansicht einpassen" nutzt (Rest ist Rand). */
export const FIT_VIEW_PADDING_RATIO = 0.9

// Render-Stil (Werte, die in Komponenten-Logik gebraucht werden — reine CSS-Farben leben im CSS)
export const ROOM_WALL_WIDTH = 2.5
export const SECRET_ROOM_FILL = '#6e6432'
export const DISABLED_ROOM_OPACITY = 0.45
export const FALLBACK_ZONE_FILL = '#4a4a4a'
export const FALLBACK_ZONE_WALLS = '#111111'
export const DEFAULT_LABEL_FONT_SIZE = 8
export const UNKNOWN_ELEMENT_COLOR = '#7f8c8d'
/** Schriftgröße der Platzhalter-Initialen relativ zur Icon-Größe. */
export const PLACEHOLDER_FONT_RATIO = 0.45
export const SELECTION_COLOR = '#4da3ff'
/** Abstand des Auswahlrings um Icons, in Map-Units. */
export const SELECTION_RING_OFFSET = 2
export const CAMERA_MARKER_SIZE = 8
