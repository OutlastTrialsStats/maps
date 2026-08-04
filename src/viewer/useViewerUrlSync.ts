import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useViewerStore } from './store/viewerStore'

/** Mirrors trial, floor and room selection into the URL query; `loadMap` applies the initial query. */
export function useViewerUrlSync(): void {
  const router = useRouter()
  const viewer = useViewerStore()

  watch(
    [() => viewer.activeTrialId, () => viewer.activeFloor, () => viewer.selectedRoomId],
    ([trial, floor, room]) => {
      if (!viewer.trial) {
        return
      }
      router.replace({
        query: { trial, floor: String(floor), ...(room ? { room } : {}) },
      })
    },
  )
}
