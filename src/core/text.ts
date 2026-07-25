export function initialsOf(name: string | undefined): string {
  if (!name) {
    return '?'
  }
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}
