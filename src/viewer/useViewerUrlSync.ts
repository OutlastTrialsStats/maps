import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useViewerStore } from './store/viewerStore'

/**
 * Mirrors trial, floor and room selection into the URL query (deep links).
 * `?trial=` is already honoured by `loadMap` (MapViewer passes it as the initial
 * trial); floor and room are applied here once per map load, from then on the
 * query is only written.
 */
export function useViewerUrlSync(): void {
  const route = useRoute()
  const router = useRouter()
  const viewer = useViewerStore()

  function applyQuery(): void {
    const { floor, room } = route.query
    const floorIndex = typeof floor === 'string' ? Number(floor) : NaN
    if (viewer.trial?.floors.some((entry) => entry.index === floorIndex)) {
      viewer.activeFloor = floorIndex
    }
    if (typeof room === 'string' && viewer.trial?.rooms.some((entry) => entry.id === room)) {
      viewer.selectedRoomId = room
    }
  }

  // Fires once per map load; trial switches within a map keep the same mapId.
  watch(
    () => viewer.trial?.mapId,
    (mapId) => {
      if (mapId) {
        applyQuery()
      }
    },
  )

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
