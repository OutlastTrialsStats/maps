/** JSON deep copy — unlike structuredClone safe for reactive proxies; the data is plain JSON. */
export function jsonClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}
