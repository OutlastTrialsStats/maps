/**
 * Zentrale Datenmodell-Typen — Single Source of Truth.
 * Muss inhaltlich synchron bleiben mit den JSON-Schemas unter `public/schemas/`
 * (siehe docs/02-datenmodell.md und docs/06-code-richtlinien.md).
 */

/** Punkt oder Größe in Map-Units, [x, y] bzw. [w, h]. */
export type Vec2 = [number, number]

// ---------------------------------------------------------------------------
// Map-Registry — public/data/maps/index.json
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
  /** Fortschritt 0–100 für die Kachel in der Übersicht. */
  progress: number
  /** `false` → "Coming in the future"-Banner, nicht klickbar. */
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
  /** Verknüpfung zu den Maps: identisch zum Eintrag in deren `meta.authors`. */
  name: string
  /** Profil auf outlasttrialsstats.com (Schema erzwingt die Domain). */
  profileUrl: string
  /** Dateiname unter dem Game-Assets-Host, immer `.webp` (nicht die volle URL). */
  avatar?: string
  /** Map-IDs aus der Registry, an denen die Person mitgearbeitet hat. */
  maps: string[]
}

// ---------------------------------------------------------------------------
// Map-Definition — public/data/maps/<mapId>/map.json
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
  /** Genau ein Trial pro Map ist der Default beim Öffnen des Viewers. */
  default?: boolean
}

export interface Floor {
  index: number
  name: string
}

export interface FilterDefinition {
  id: string
  name: string
  /** Element-Kategorien, die dieser Filter ein-/ausblendet. */
  categories: string[]
  default?: boolean
}

// ---------------------------------------------------------------------------
// Räume
// ---------------------------------------------------------------------------

/**
 * Raumform relativ zum Ankerpunkt `origin`: entweder ein relativer SVG-Pfad
 * (implizites "M 0 0" am origin) oder ein einfaches Rechteck [w, h].
 */
export type RoomShape = { origin: Vec2 } & ({ path: string } | { rect: Vec2 })

export type InnerLineStyle = 'wall' | 'object' | 'objectDark' | 'dashed'

export interface InnerLine {
  path: string
  style: InnerLineStyle
}

export interface RoomLabel {
  text: string
  /** Position relativ zum origin des Raums. */
  pos: Vec2
  fontSize?: number
}

export type RoomFlag = 'secret' | 'reel' | 'disabled' | 'noWalls' | 'unreachable'

/**
 * Ohne Angabe: in allen Trials sichtbar. `trials` ist eine Positivliste,
 * `hiddenInTrials` die Alternative dazu — niemals beide gleichzeitig.
 */
export interface Visibility {
  trials?: string[]
  hiddenInTrials?: string[]
}

export interface CameraInfo {
  pos: Vec2
  /** Blickrichtung in Grad. */
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
  /** Referenz auf eine Zone der globalen Zonen-Bibliothek (zones.json). */
  zone: string
  shape: RoomShape
  innerLines?: InnerLine[]
  label?: RoomLabel
  flags?: RoomFlag[]
  visibility?: Visibility
  info?: RoomInfo
}

// ---------------------------------------------------------------------------
// Element-Platzierungen
// ---------------------------------------------------------------------------

/** Elementspezifische Zusatzdaten, deklariert durch `propsSchema` des Elements. */
export type PlacementProps = Record<string, unknown>

export interface Placement {
  id: string
  /** Referenz auf die zentrale Element-Bibliothek. */
  element: string
  floor: number
  pos: Vec2
  /** Rotation in Grad, nur feste 45°-Schritte (synchron zum Schema-`multipleOf`). */
  rotation?: number
  /**
   * Nur bei Struktur-Elementen: [Länge, Dicke] überschreibt die
   * `render`-Defaults; `spawn-room` hat feste Maße und ignoriert das Feld.
   */
  size?: Vec2
  roomId?: string
  visibility?: Visibility
  props?: PlacementProps
}

// ---------------------------------------------------------------------------
// Routen
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
// Zonen-Bibliothek — public/data/zones.json (global für alle Maps)
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
// Element-Bibliothek — public/data/elements.json
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
  /** Nur bei `type: 'enum'`. */
  values?: string[]
}

/** Geschlossenes Set parametrischer Vektor-Bauelemente (docs/02 §4). */
export type StructuralKind = 'door' | 'double-door' | 'obstacle' | 'spawn-room' | 'stairs'

export interface StructuralRender {
  kind: StructuralKind
  /** Standardlänge entlang der Hauptachse in Map-Units. */
  length: number
  /** Standarddicke quer zur Hauptachse; bei `spawn-room` die Tiefe. */
  thickness: number
}

export interface ElementDefinition {
  id: string
  name: string
  category: string
  /**
   * Volle https-URL eines webp-Icons unter dem Game-Assets-Host
   * (`ICON_URL_PATTERN`). Optional — ohne Icon greift das
   * Platzhalter-Rendering (Farbkreis + Initialen); `render`-Elemente
   * zeichnen das Icon zentriert in der Form (z. B. Spawn-Raum).
   */
  icon?: string
  /** Akzent-/Fallbackfarbe: Tooltip-Rahmen, Legende, Platzhalter-Rendering. */
  color: string
  /** Standardgröße in Map-Units. */
  size?: number
  anchor?: ElementAnchor
  description?: string
  propsSchema?: Record<string, PropFieldSchema>
  /** Vektor-Rendering statt Icon (Türen, Treppen, Spawn-Räume …). */
  render?: StructuralRender
}
