import type { InnerLineStyle } from '../core/model/types'

export const INNER_LINE_STYLE_OPTIONS: Array<{ label: string; value: InnerLineStyle }> = [
  { label: 'Wall', value: 'wall' },
  { label: 'Object', value: 'object' },
  { label: 'Object (dark)', value: 'objectDark' },
  { label: 'Dashed', value: 'dashed' },
]
