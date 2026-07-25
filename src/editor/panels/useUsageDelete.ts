import { ref, type Ref } from 'vue'
import type { UsageEntry } from '../store/useUsageLookup'

/**
 * Dialog-Zustand für "Löschen mit Nutzungsprüfung" (Elemente, Zonen):
 * öffnet den UsageDeleteDialog und lädt die Nutzung über alle Maps nach.
 */
export function useUsageDelete<T>(collect: (target: T) => Promise<UsageEntry[]>) {
  const showDeleteDialog = ref(false)
  const deleteTarget = ref<T | null>(null) as Ref<T | null>
  const usage = ref<UsageEntry[]>([])
  const usageLoading = ref(false)

  async function openDelete(target: T): Promise<void> {
    deleteTarget.value = target
    usage.value = []
    usageLoading.value = true
    showDeleteDialog.value = true
    try {
      usage.value = await collect(target)
    } finally {
      usageLoading.value = false
    }
  }

  return { showDeleteDialog, deleteTarget, usage, usageLoading, openDelete }
}
