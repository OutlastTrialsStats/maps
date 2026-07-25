import type { ComputedRef } from 'vue'
import type { HitTarget } from '../../core/interaction/hitTest'
import type { Vec2 } from '../../core/model/types'

export type ToolId = 'select' | 'room' | 'placement' | 'route'
export type RoomToolMode = 'polygon' | 'rect' | 'innerline'

/** Pointer event prepared by the canvas in world coordinates (dblclick delivers a MouseEvent). */
export interface CanvasPointerEvent {
  world: Vec2
  snapped: Vec2
  hit: HitTarget | null
  event: MouseEvent
}

/** Declarative tool preview, rendered by ToolOverlayLayer. */
export type ToolOverlay =
  | { kind: 'polyline'; points: Vec2[]; preview: Vec2 | null }
  | { kind: 'rect'; from: Vec2; to: Vec2 }
  | { kind: 'vertices'; origin: Vec2; points: Vec2[]; activeIndex: number | null }
  | { kind: 'ghost'; pos: Vec2; rotation: number; elementId: string }

export interface EditorTool {
  onPointerDown?(event: CanvasPointerEvent): void
  onPointerMove?(event: CanvasPointerEvent): void
  onPointerUp?(event: CanvasPointerEvent): void
  onDblClick?(event: CanvasPointerEvent): void
  /** Returns true when the event was consumed (suppress the browser context menu). */
  onContextMenu?(event: CanvasPointerEvent): boolean
  /** Returns true when the event was consumed (skip the global shortcuts). */
  onKeydown?(event: KeyboardEvent): boolean
  activate?(): void
  deactivate?(): void
  overlay: ComputedRef<ToolOverlay | null>
}
