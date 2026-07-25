import type { Floor, Trial } from './types'

export function defaultTrialId(trials: Trial[]): string | null {
  return (trials.find((trial) => trial.default) ?? trials[0])?.id ?? null
}

export function initialFloorIndex(floors: Floor[]): number {
  return floors.some((floor) => floor.index === 0) ? 0 : (floors[0]?.index ?? 0)
}
