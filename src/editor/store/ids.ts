/** "Vault Window" → "vault-window"; Ergebnis erfüllt KEBAB_ID_PATTERN. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Hängt bei Kollision einen Zähler an ("new-zone", "new-zone-2", …). */
export function uniqueSlug(base: string, taken: ReadonlySet<string>): string {
  let id = base
  for (let suffix = 2; taken.has(id); suffix += 1) {
    id = `${base}-${suffix}`
  }
  return id
}
