import type { Contributor, Contributors } from './types'

type ContributorIndex = ReadonlyMap<string, Contributor>

/** Lookup table author name → contributor (link to `meta.authors`). */
export function buildContributorIndex(contributors: Contributors | null): ContributorIndex {
  return new Map((contributors?.contributors ?? []).map((entry) => [entry.name, entry]))
}
