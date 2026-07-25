import type { Visibility } from './types'

/**
 * Central visibility rule for rooms, placements and routes —
 * shared by the viewer and the editor preview (docs/06 §5).
 */
export function isVisibleInTrial(visibility: Visibility | undefined, trialId: string): boolean {
  if (visibility?.trials) {
    return visibility.trials.includes(trialId)
  }
  if (visibility?.hiddenInTrials) {
    return !visibility.hiddenInTrials.includes(trialId)
  }
  return true
}
