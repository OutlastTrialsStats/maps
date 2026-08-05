const ENTITY_KINDS = ['room', 'placement', 'route', 'shape'] as const

export type EntityKind = (typeof ENTITY_KINDS)[number]

export interface HitTarget {
  kind: EntityKind
  id: string
}

/**
 * Determines the hit map object via event delegation: the render components
 * mark their root group with `data-entity-kind` and `data-entity-id` and stay
 * free of event handlers themselves.
 */
export function hitFromEventTarget(target: EventTarget | null): HitTarget | null {
  if (!(target instanceof Element)) {
    return null
  }
  const entityEl = target.closest('[data-entity-kind]')
  if (!entityEl) {
    return null
  }
  const kind = entityEl.getAttribute('data-entity-kind')
  const id = entityEl.getAttribute('data-entity-id')
  const kinds: readonly string[] = ENTITY_KINDS
  if (!kind || !id || !kinds.includes(kind)) {
    return null
  }
  return { kind: kind as EntityKind, id }
}
