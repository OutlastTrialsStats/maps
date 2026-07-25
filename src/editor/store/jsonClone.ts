/** JSON-Deep-Copy — anders als structuredClone sicher für Reactive-Proxies; die Daten sind reines JSON. */
export function jsonClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}
