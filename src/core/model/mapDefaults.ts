import type { Floor, Trial } from './types'

export function defaultTrialId(trials: Trial[]): string | null {
  return (trials.find((trial) => trial.default) ?? trials[0])?.id ?? null
}

export function initialFloorIndex(floors: Floor[]): number {
  const preferred = floors.find((floor) => floor.default)
  if (preferred) {
    return preferred.index
  }
  return floors.some((floor) => floor.index === 0) ? 0 : (floors[0]?.index ?? 0)
}
