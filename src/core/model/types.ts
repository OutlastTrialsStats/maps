/**
 * Central data model types — single source of truth.
 * Must stay in sync with the JSON schemas under `public/schemas/`
 * (see docs/02-datenmodell.md and docs/06-code-richtlinien.md).
 */

/** Point or size in map units, [x, y] or [w, h]. */
export type Vec2 = [number, number]

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
  /** Link to the maps: identical to the entry in their `meta.authors`. */
  name: string
  /** Profile UUID on outlasttrialsstats.com — the `<totstats-profile>` card renders from it. */
  profileId: string
  /** Profile on outlasttrialsstats.com (the schema enforces the domain). */
  profileUrl: string
  /** Map IDs from the registry the person contributed to. */
  maps: string[]
}

// ---------------------------------------------------------------------------
// Map definition — public/data/maps/<mapId>/map.json
// ---------------------------------------------------------------------------

export interface MapDefinition {
  $schema?: string
  id: string
  meta: MapMeta
  trials: Trial[]
  floors: Floor[]
  filters: FilterDefinition[]
  rooms: Room[]
  placements: Placement[]
  routes: RouteLine[]
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

/**
 * Without any entry: visible in all trials. `trials` is an allowlist,
 * `hiddenInTrials` the alternative to it — never both at once.
 */
export interface Visibility {
  trials?: string[]
  hiddenInTrials?: string[]
}

export interface CameraInfo {
  pos: Vec2
  /** Facing in degrees. */
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
  innerLines?: InnerLine[]
  label?: RoomLabel
  flags?: RoomFlag[]
  visibility?: Visibility
  info?: RoomInfo
}

// ---------------------------------------------------------------------------
// Element placements
// ---------------------------------------------------------------------------

/** Element-specific extra data, declared by the `propsSchema` of the element. */
export type PlacementProps = Record<string, unknown>

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
  visibility?: Visibility
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
  visibility?: Visibility
  path: string
  style: RouteLineStyle
}

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

/** Closed set of parametric vector building blocks (docs/02 §4). */
export type StructuralKind = 'door' | 'double-door' | 'obstacle' | 'spawn-room' | 'stairs'

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
   * Full https URL of a webp icon under the game assets host
   * (`ICON_URL_PATTERN`). Optional — without an icon the placeholder
   * rendering applies (color circle + initials); `render` elements
   * draw the icon centered in the shape (e.g. spawn room).
   */
  icon?: string
  /** Accent/fallback color: tooltip border, legend, placeholder rendering. */
  color: string
  /** Default size in map units. */
  size?: number
  anchor?: ElementAnchor
  description?: string
  propsSchema?: Record<string, PropFieldSchema>
  /** Vector rendering instead of an icon (doors, stairs, spawn rooms …). */
  render?: StructuralRender
}
