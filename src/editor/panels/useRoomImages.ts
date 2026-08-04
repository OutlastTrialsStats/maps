import { computed, ref, type Ref } from 'vue'
import { roomImageUrl } from '../../core/model/dataSource'
import type { RoomImage } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'

/** Screenshot list of a room: store mutations plus the load state of the previews. */
export function useRoomImages(roomId: Readonly<Ref<string>>) {
  const store = useEditorStore()
  const failedSources = ref(new Set<string>())

  const images = computed(
    () => store.document?.rooms.find((room) => room.id === roomId.value)?.info?.images ?? [],
  )

  function mutateImages(mutate: (list: RoomImage[]) => void, coalesce?: string): void {
    store.commitOn(
      'room',
      roomId.value,
      (room) => {
        const info = room.info ?? {}
        const list = info.images ?? []
        mutate(list)
        if (list.length === 0) {
          delete info.images
        } else {
          info.images = list
        }
        if (Object.keys(info).length === 0) {
          delete room.info
        } else {
          room.info = info
        }
      },
      coalesce ? { coalesce } : undefined,
    )
  }

  /** Several sources pasted at once become one undo step. */
  function addImages(raw: string): void {
    const sources = raw.split(/\s+/).filter(Boolean)
    if (sources.length === 0) {
      return
    }
    mutateImages((list) => list.push(...sources.map((src) => ({ src }))))
  }

  function setSrc(index: number, raw: string): void {
    const src = raw.trim()
    if (!src) {
      return
    }
    mutateImages((list) => {
      list[index].src = src
    })
  }

  function removeImage(index: number): void {
    mutateImages((list) => list.splice(index, 1))
  }

  function toggleCamera(index: number, enabled: boolean): void {
    mutateImages((list) => {
      if (enabled) {
        list[index].camera = { pos: [0, 0], rotation: 0 }
      } else {
        delete list[index].camera
      }
    })
  }

  function setCamera(index: number, patch: { x?: number; y?: number; rotation?: number }): void {
    const field = patch.x !== undefined ? 'x' : patch.y !== undefined ? 'y' : 'rotation'
    mutateImages((list) => {
      const camera = list[index].camera
      if (!camera) {
        return
      }
      camera.pos = [patch.x ?? camera.pos[0], patch.y ?? camera.pos[1]]
      camera.rotation = patch.rotation ?? camera.rotation
    }, `img${index}-camera-${field}`)
  }

  function previewUrl(src: string): string {
    return store.document ? roomImageUrl(store.document.mapId, src) : src
  }

  return {
    images,
    addImages,
    setSrc,
    removeImage,
    toggleCamera,
    setCamera,
    previewUrl,
    hasFailed: (src: string) => failedSources.value.has(src),
    markFailed: (src: string) => failedSources.value.add(src),
  }
}
