import type { Contributor, Contributors } from './types'

export type ContributorIndex = ReadonlyMap<string, Contributor>

/** Nachschlagetabelle Autorenname → Contributor (Verknüpfung zu `meta.authors`). */
export function buildContributorIndex(contributors: Contributors | null): ContributorIndex {
  return new Map((contributors?.contributors ?? []).map((entry) => [entry.name, entry]))
}
