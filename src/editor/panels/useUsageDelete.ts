import { ref, type Ref } from 'vue'
import type { UsageEntry } from '../store/useUsageLookup'

/**
 * Dialog state for "delete with usage check" (elements, zones):
 * opens the UsageDeleteDialog and loads the usage across all maps.
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
