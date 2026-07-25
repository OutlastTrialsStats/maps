import type { Visibility } from './types'

/**
 * Zentrale Sichtbarkeitsregel für Räume, Platzierungen und Routen —
 * wird von Viewer und Editor-Vorschau gemeinsam genutzt (docs/06 §5).
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
