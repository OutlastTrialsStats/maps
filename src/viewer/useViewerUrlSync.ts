import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useViewerStore } from './store/viewerStore'

/**
 * Spiegelt Trial, Etage und Raum-Auswahl in die URL-Query (Deep-Links, docs/01 V9).
 * Die Query wird einmalig nach dem Laden der Map angewendet, danach nur geschrieben.
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
