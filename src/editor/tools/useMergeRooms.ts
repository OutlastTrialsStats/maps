import { useToast } from 'primevue/usetoast'
import { computed, type ComputedRef } from 'vue'
import { TOAST_LIFE_MS } from '../../core/constants'
import { mergeRoomGeometry, type RoomMergeFailure } from '../../core/model/roomMerge'
import { applyRoomGeometry } from '../../core/model/roomScale'
import type { Room } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'

const FAILURE_MESSAGES: Record<RoomMergeFailure, string> = {
  'different-floors': 'The rooms are on different floors — move one of them over first.',
  'unsupported-path': 'A room outline or inner line uses path commands the editor cannot read.',
  disjoint: 'The rooms have to overlap or share a wall.',
  'corner-touch': 'The rooms only meet in a corner, which cannot become a single outline.',
  hole: 'The merged rooms would enclose a courtyard, and a room outline cannot have holes.',
  degenerate: 'The merged outline would collapse.',
}

interface MergeRooms {
  canMerge: ComputedRef<boolean>
  mergeSelection(): void
}

/** Merging keeps the room that was selected first and removes the other one. */
export function useMergeRooms(): MergeRooms {
  const store = useEditorStore()
  const toast = useToast()

  const selectedRooms = computed<Room[]>(() => {
    const doc = store.document
    if (!doc || store.selection.length !== 2) {
      return []
    }
    const rooms = store.selection.flatMap((target) => {
      const room =
        target.kind === 'room' ? doc.rooms.find((entry) => entry.id === target.id) : undefined
      return room ? [room] : []
    })
    return rooms.length === 2 ? rooms : []
  })

  const canMerge = computed(() => selectedRooms.value.length === 2)

  function mergeSelection(): void {
    const [survivor, absorbed] = selectedRooms.value
    if (!survivor || !absorbed) {
      return
    }
    const result = mergeRoomGeometry(survivor, absorbed)
    if (!result.ok) {
      toast.add({
        severity: 'warn',
        summary: 'Rooms not merged',
        detail: FAILURE_MESSAGES[result.reason],
        life: TOAST_LIFE_MS,
      })
      return
    }
    store.commitOn('room', survivor.id, (room, doc) => {
      applyRoomGeometry(room, result.geometry)
      doc.rooms = doc.rooms.filter((entry) => entry.id !== absorbed.id)
      for (const placement of doc.placements) {
        if (placement.roomId === absorbed.id) {
          placement.roomId = survivor.id
        }
      }
      store.setSelection([{ kind: 'room', id: survivor.id }])
    })
  }

  return { canMerge, mergeSelection }
}
