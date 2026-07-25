export type EntityKind = 'room' | 'placement' | 'route'

export interface HitTarget {
  kind: EntityKind
  id: string
}

const ENTITY_KINDS: readonly string[] = ['room', 'placement', 'route']

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
  if (!kind || !id || !ENTITY_KINDS.includes(kind)) {
    return null
  }
  return { kind: kind as EntityKind, id }
}
