/**
 * Central data model types — single source of truth.
 * Must stay in sync with the JSON schemas under `public/schemas/`.
 */

/** Point or size in map units, [x, y] or [w, h]. */
export type Vec2 = [number, number]

/** Axis-aligned bounding box in world or shape-local coordinates. */
export interface Bounds {
  min: Vec2
  max: Vec2
}

// ---------------------------------------------------------------------------
// Map registry — public/data/maps/index.json
// ---------------------------------------------------------------------------

export interface MapsIndex {
  $schema?: string
  maps: MapRegistryEntry[]
}

export interface MapRegistryEntry {
  id: string
  name: string
  background?: string
  card?: string
  /** Progress 0–100 for the tile in the overview. */
  progress: number
  /** `false` → "Coming in the future" banner, not clickable. */
  enabled: boolean
}

// ---------------------------------------------------------------------------
// Contributors — public/data/contributors.json
// ---------------------------------------------------------------------------

export interface Contributors {
  $schema?: string
  contributors: Contributor[]
}

export interface Contributor {
  name: string
  profileId: string
  profileUrl: string
  maps: string[]
}

// ---------------------------------------------------------------------------
// Map manifest — public/data/maps/<mapId>/map.json
// ---------------------------------------------------------------------------

/** Map-level identity; the content lives in one self-contained file per trial. */
export interface MapManifest {
  $schema?: string
  id: string
  meta: MapMeta
  trials: Trial[]
}

// ---------------------------------------------------------------------------
// Trial document — public/data/maps/<mapId>/trials/<trialId>.json
// ---------------------------------------------------------------------------

/**
 * Complete content of one trial. Trials sharing rooms duplicate them —
 * there is no base/overlay merging and no per-object visibility.
 */
export interface TrialDocument {
  $schema?: string
  mapId: string
  trialId: string
  floors: Floor[]
  filters: FilterDefinition[]
  rooms: Room[]
  placements: Placement[]
  routes: RouteLine[]
  shapes: MapShape[]
}

export interface MapMeta {
  name: string
  authors: string[]
}

export interface Trial {
  id: string
  name: string
  /** Exactly one trial per map is the default when the viewer opens. */
  default?: boolean
}

export interface Floor {
  index: number
  name: string
}

export interface FilterDefinition {
  id: string
  name: string
  categories: string[]
  default?: boolean
}

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

/**
 * Room shape relative to the anchor `origin`: either a relative SVG path
 * (implicit "M 0 0" at the origin) or a plain rectangle [w, h].
 */
export type RoomShape = { origin: Vec2 } & ({ path: string } | { rect: Vec2 })

export type InnerLineStyle = 'wall' | 'object' | 'objectDark' | 'dashed'

export interface InnerLine {
  path: string
  style: InnerLineStyle
}

export interface RoomLabel {
  text: string
  /** Position relative to the origin of the room. */
  pos: Vec2
  fontSize?: number
}

export type RoomFlag = 'secret' | 'reel' | 'disabled' | 'noWalls' | 'unreachable'

/** Interruption of the outer wall along one edge of the room outline (entrances, passages). */
export interface WallGap {
  /** Edge index (0 = point 0 → point 1); the closing edge is the last one. */
  edge: number
  /** Distance from the edge start, in map units. */
  start: number
  length: number
}

export interface CameraInfo {
  pos: Vec2
  rotation: number
}

export interface RoomImage {
  src: string
  camera?: CameraInfo
}

export interface RoomInfo {
  title?: string
  description?: string
  images?: RoomImage[]
}

export interface Room {
  id: string
  floor: number
  /** Reference to a zone of the global zone library (zones.json). */
  zone: string
  shape: RoomShape
  /** Sections without a wall; ignored when the flag `noWalls` is set. */
  wallGaps?: WallGap[]
  innerLines?: InnerLine[]
  label?: RoomLabel
  flags?: RoomFlag[]
  info?: RoomInfo
}

// ---------------------------------------------------------------------------
// Element placements
// ---------------------------------------------------------------------------

/** Element-specific extra data, declared by the `propsSchema` of the element. */
export type PlacementProps = Record<string, unknown>

/**
 * Callout on a placement: dot on the element, leader line, diamond badge with
 * either a number or a game-asset icon (bare file name, like `ElementDefinition.icon`).
 */
export type CalloutMarker = {
  /** Badge center relative to the placement position; never rotates with it. */
  offset: Vec2
  /** Dot, ring and inner diamond; default `MARKER_COLOR`. */
  color?: string
  /** Leader line only; defaults to `color`. */
  lineColor?: string
  lineDashed?: boolean
} & ({ label: number } | { icon: string })

export interface Placement {
  id: string
  /** Reference to the central element library. */
  element: string
  floor: number
  pos: Vec2
  /** Rotation in degrees, only fixed 45° steps (in sync with the schema `multipleOf`). */
  rotation?: number
  /**
   * Structural elements only: [length, thickness] overrides the `render`
   * defaults; `spawn-room` has fixed dimensions and ignores the field.
   */
  size?: Vec2
  roomId?: string
  marker?: CalloutMarker
  props?: PlacementProps
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

export type RouteLineStyle = 'route'

export interface RouteLine {
  id: string
  name: string
  floor: number
  path: string
  style: RouteLineStyle
}

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

/**
 * Free-standing decorative outline (tables, scaffolding …) — neither a room
 * nor a library element, never filled. Variants: circle (`pos` = center),
 * rectangle (`pos` = center, rotation in 45° steps in sync with the schema
 * `multipleOf`) or an open absolute path.
 */
export type MapShapeGeometry =
  | { pos: Vec2; radius: number }
  | { pos: Vec2; size: Vec2; rotation?: number }
  | { path: string }

export type MapShape = {
  id: string
  floor: number
  /** Stroke overrides — `SHAPE_DEFAULT_*` constants apply and are not stored. */
  color?: string
  strokeWidth?: number
  dashed?: boolean
} & MapShapeGeometry

// ---------------------------------------------------------------------------
// Zone library — public/data/zones.json (global across all maps)
// ---------------------------------------------------------------------------

export interface ZoneLibrary {
  $schema?: string
  zones: Zone[]
}

export interface Zone {
  id: string
  name: string
  fill: string
  walls: string
}

// ---------------------------------------------------------------------------
// Element library — public/data/elements.json
// ---------------------------------------------------------------------------

export interface ElementLibrary {
  $schema?: string
  categories: ElementCategory[]
  elements: ElementDefinition[]
}

export interface ElementCategory {
  id: string
  name: string
}

export type ElementAnchor = 'center' | 'topleft'

export type PropFieldType = 'string' | 'string[]' | 'number' | 'boolean' | 'enum'

export interface PropFieldSchema {
  type: PropFieldType
  label: string
  /** Only for `type: 'enum'`. */
  values?: string[]
}

/** Closed set of parametric vector building blocks. */
export type StructuralKind =
  | 'door'
  | 'double-door'
  | 'barricaded-door'
  | 'window'
  | 'crawl-passage'
  | 'obstacle'
  | 'spawn-room'
  | 'stairs'

export interface StructuralRender {
  kind: StructuralKind
  /** Default length along the main axis, in map units. */
  length: number
  /** Default thickness across the main axis; for `spawn-room` the depth. */
  thickness: number
}

export interface ElementDefinition {
  id: string
  name: string
  category: string
  /**
   * Bare webp file name under `GAME_ASSETS_BASE_URL`, without path and
   * extension (`ICON_FILE_PATTERN`); resolve via `elementIconUrl()`.
   * Optional — without an icon the placeholder rendering applies
   * (color circle + initials); `render` elements draw the icon
   * centered in the shape (e.g. spawn room).
   */
  icon?: string
  /**
   * Accent/fallback color: tooltip border, legend, placeholder rendering — and
   * the body fill of every structural shape except `spawn-room` (neutral floor).
   */
  color: string
  /** Default size in map units. */
  size?: number
  anchor?: ElementAnchor
  description?: string
  propsSchema?: Record<string, PropFieldSchema>
  /** Vector rendering instead of an icon (doors, stairs, spawn rooms …). */
  render?: StructuralRender
}
