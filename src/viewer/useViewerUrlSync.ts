import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useViewerStore } from './store/viewerStore'

/**
 * Mirrors trial, floor and room selection into the URL query (deep links, docs/01 V9).
 * The query is applied once after the map has loaded, from then on only written.
 */
export function useViewerUrlSync(): void {
  const route = useRoute()
  const router = useRouter()
  const viewer = useViewerStore()

  function applyQuery(): void {
    const { trial, floor, room } = route.query
    if (typeof trial === 'string' && viewer.trials.some((entry) => entry.id === trial)) {
      viewer.activeTrialId = trial
    }
    const floorIndex = typeof floor === 'string' ? Number(floor) : NaN
    if (viewer.map?.floors.some((entry) => entry.index === floorIndex)) {
      viewer.activeFloor = floorIndex
    }
    if (typeof room === 'string' && viewer.map?.rooms.some((entry) => entry.id === room)) {
      viewer.selectedRoomId = room
    }
  }

  watch(
    () => viewer.map,
    (map) => {
      if (map) {
        applyQuery()
      }
    },
  )

  watch(
    [() => viewer.activeTrialId, () => viewer.activeFloor, () => viewer.selectedRoomId],
    ([trial, floor, room]) => {
      if (!viewer.map) {
        return
      }
      router.replace({
        query: { trial, floor: String(floor), ...(room ? { room } : {}) },
      })
    },
  )
}
