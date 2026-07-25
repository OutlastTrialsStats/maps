<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { computed } from 'vue'
import { isDeleteBlocked, type UsageEntry } from '../store/useUsageLookup'

const visible = defineModel<boolean>('visible', { required: true })

const props = defineProps<{
  header: string
  targetLabel: string
  usage: UsageEntry[]
  loading: boolean
  /** Additional block from the caller (e.g. a zone used by rooms of the open map). */
  blocked?: boolean
  blockedHint?: string
  /** Warning shown before deleting (e.g. cascade onto placements of the open map). */
  cascadeHint?: string
}>()

const emit = defineEmits<{ confirm: [] }>()

const foreignBlocked = computed(() => isDeleteBlocked(props.usage))
const canDelete = computed(() => !props.loading && !foreignBlocked.value && !props.blocked)

function confirm(): void {
  emit('confirm')
  visible.value = false
}
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="header">
    <div class="content">
      <p>
        Delete <strong>{{ targetLabel }}</strong
        >?
      </p>
      <p v-if="loading" class="hint">Checking usage in all maps…</p>
      <template v-else>
        <table v-if="usage.length > 0" class="usage">
          <thead>
            <tr>
              <th>Map</th>
              <th class="count">Used</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in usage" :key="entry.mapId">
              <td>{{ entry.mapName }}{{ entry.isOpenDocument ? ' (open)' : '' }}</td>
              <td class="count">{{ entry.count }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="hint">Not used by any map.</p>
        <p v-if="foreignBlocked" class="error" role="alert">
          Blocked: other maps still use this entry. Remove those usages first (separate PR).
        </p>
        <p v-else-if="blocked" class="error" role="alert">{{ blockedHint }}</p>
        <p v-else-if="cascadeHint" class="warning">{{ cascadeHint }}</p>
      </template>
      <div class="actions">
        <Button label="Cancel" severity="secondary" text @click="visible = false" />
        <Button label="Delete" severity="danger" :disabled="!canDelete" @click="confirm" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 340px;
  font-size: 13px;
}

.usage {
  border-collapse: collapse;
  width: 100%;
}

.usage th,
.usage td {
  border-bottom: 1px solid var(--border-default);
  padding: 4px 6px;
  text-align: left;
  font-size: 12px;
}

.usage .count {
  text-align: right;
}

.hint {
  color: var(--text-muted);
}

.warning {
  color: var(--warning);
}

.error {
  color: var(--danger);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
