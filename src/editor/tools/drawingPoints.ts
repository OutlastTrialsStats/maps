import type { Vec2 } from '../../core/model/types'
import type { DrawEnd } from './toolTypes'

/** Shared shape of the in-progress polygon/inner-line drawing state. */
export interface DrawingPoints {
  points: Vec2[]
  activeEnd: DrawEnd
  redoPoints: Vec2[]
}

export function activeAnchor(state: DrawingPoints): Vec2 {
  return state.activeEnd === 'head' ? state.points[0] : state.points[state.points.length - 1]
}

export function oppositeEndpoint(state: DrawingPoints): Vec2 {
  return state.activeEnd === 'head' ? state.points[state.points.length - 1] : state.points[0]
}

export function addPoint(state: DrawingPoints, point: Vec2): void {
  if (state.activeEnd === 'head') {
    state.points.unshift(point)
  } else {
    state.points.push(point)
  }
  state.redoPoints = []
}

export function undoPoint(state: DrawingPoints): boolean {
  const removed = state.activeEnd === 'head' ? state.points.shift() : state.points.pop()
  if (removed) {
    state.redoPoints.push(removed)
  }
  return state.points.length > 0
}

export function redoPoint(state: DrawingPoints): void {
  const point = state.redoPoints.pop()
  if (!point) {
    return
  }
  if (state.activeEnd === 'head') {
    state.points.unshift(point)
  } else {
    state.points.push(point)
  }
}

/** Redo entries always belong to the current end, so switching clears them. */
export function switchEnd(state: DrawingPoints): void {
  state.activeEnd = state.activeEnd === 'head' ? 'tail' : 'head'
  state.redoPoints = []
}
