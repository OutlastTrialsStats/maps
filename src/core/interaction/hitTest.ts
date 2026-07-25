export type EntityKind = 'room' | 'placement' | 'route'

export interface HitTarget {
  kind: EntityKind
  id: string
}

const ENTITY_KINDS: readonly string[] = ['room', 'placement', 'route']

/**
 * Ermittelt das getroffene Karten-Objekt per Event-Delegation: Die
 * Render-Komponenten markieren ihre Wurzel-Gruppe mit `data-entity-kind`
 * und `data-entity-id` und bleiben selbst event-frei.
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
