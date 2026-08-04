import type { CameraInfo, Room } from './types'

/** Cameras of the room's images, shown only while its floor is the active one. */
export function roomCameras(room: Room | null | undefined, activeFloor: number): CameraInfo[] {
  if (!room || room.floor !== activeFloor) {
    return []
  }
  return (room.info?.images ?? []).flatMap((image) => (image.camera ? [image.camera] : []))
}
