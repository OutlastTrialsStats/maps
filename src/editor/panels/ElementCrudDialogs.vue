<script setup lang="ts">
import ElementDialog from './ElementDialog.vue'
import UsageDeleteDialog from './UsageDeleteDialog.vue'
import { useElementCrud } from './useElementCrud'

const emit = defineEmits<{ saved: [elementId: string] }>()

const {
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
} = useElementCrud()

defineExpose({ openCreate, openEdit, openDelete })
</script>

<template>
  <ElementDialog
    v-model:visible="showElementDialog"
    :element-id="editElementId"
    @saved="emit('saved', $event)"
  />
  <UsageDeleteDialog
    v-model:visible="showDeleteDialog"
    header="Delete element"
    :target-label="deleteTarget?.name ?? ''"
    :usage="usage"
    :loading="usageLoading"
    :cascade-hint="cascadeHint"
    @confirm="confirmDelete()"
  />
</template>
