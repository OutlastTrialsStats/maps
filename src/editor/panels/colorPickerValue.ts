/** PrimeVue ColorPicker works on 6-digit hex without "#"; expands 3-digit and drops the alpha byte. */
export function toPickerHex(color: string): string {
  const hex = color.slice(1)
  return hex.length === 3 ? [...hex].map((digit) => digit + digit).join('') : hex.slice(0, 6)
}

/** Keeps the alpha byte of an 8-digit `previous` color, which the picker cannot edit. */
export function fromPickerHex(value: string, previous?: string): string {
  const alpha = previous?.length === 9 ? previous.slice(7) : ''
  return `#${value}${alpha}`
}
