import { computed, ref } from 'vue'
import type { ElementDefinition } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { useUsageLookup } from '../store/useUsageLookup'
import { useUsageDelete } from './useUsageDelete'

/**
 * Element-CRUD für Palette und Library-Dialog: Create/Edit über den
 * ElementDialog, Löschen mit Nutzungsprüfung und Kaskade auf die
 * Platzierungen der offenen Map (atomar undo-bar via commitWorkspace).
 */
export function useElementCrud() {
  const store = useEditorStore()
  const { collectElementUsage } = useUsageLookup()

  const showElementDialog = ref(false)
  const editElementId = ref<string | undefined>(undefined)
  const { showDeleteDialog, deleteTarget, usage, usageLoading, openDelete } =
    useUsageDelete<ElementDefinition>((element) => collectElementUsage(element.id))

  const cascadeCount = computed(
    () => usage.value.find((entry) => entry.isOpenDocument)?.count ?? 0,
  )
  const cascadeHint = computed(() =>
    cascadeCount.value > 0
      ? `${cascadeCount.value} placement(s) in the open map will be deleted as well.`
      : undefined,
  )

  function openCreate(): void {
    editElementId.value = undefined
    showElementDialog.value = true
  }

  function openEdit(elementId: string): void {
    editElementId.value = elementId
    showElementDialog.value = true
  }

  function confirmDelete(): void {
    const target = deleteTarget.value
    if (!target) {
      return
    }
    store.commitWorkspace(({ doc, library }) => {
      library.elements = library.elements.filter((element) => element.id !== target.id)
      doc.placements = doc.placements.filter((placement) => placement.element !== target.id)
    })
    const remainingIds = new Set(store.document?.placements.map((placement) => placement.id) ?? [])
    store.setSelection(
      store.selection.filter((entry) => entry.kind !== 'placement' || remainingIds.has(entry.id)),
    )
    if (store.activeElementId === target.id) {
      store.activeElementId = null
    }
  }

  return {
    showElementDialog,
    editElementId,
    showDeleteDialog,
    deleteTarget,
    usage,
    usageLoading,
    cascadeHint,
    openCreate,
    openEdit,
    openDelete,
    confirmDelete,
  }
}
