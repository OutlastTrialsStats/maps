<script setup lang="ts">
import MultiSelect from 'primevue/multiselect'
import { computed } from 'vue'
import type { Trial, Visibility } from '../../core/model/types'

const props = defineProps<{
  modelValue: Visibility | undefined
  trials: Trial[]
}>()

const emit = defineEmits<{ 'update:modelValue': [value: Visibility | undefined] }>()

const visibleIds = computed<string[]>(() => {
  const all = props.trials.map((trial) => trial.id)
  if (props.modelValue?.trials) {
    const listed = new Set(props.modelValue.trials)
    return all.filter((id) => listed.has(id))
  }
  if (props.modelValue?.hiddenInTrials) {
    const hidden = new Set(props.modelValue.hiddenInTrials)
    return all.filter((id) => !hidden.has(id))
  }
  return all
})

function update(selected: string[]): void {
  // An empty selection is invalid (schema: minItems 1) — ignore the input.
  if (selected.length === 0) {
    return
  }
  const chosen = new Set(selected)
  if (chosen.size === props.trials.length) {
    emit('update:modelValue', undefined)
    return
  }
  const ordered = props.trials.map((trial) => trial.id)
  // Keep the existing form (allowlist/denylist) — avoids diff noise.
  if (props.modelValue?.hiddenInTrials) {
    emit('update:modelValue', { hiddenInTrials: ordered.filter((id) => !chosen.has(id)) })
    return
  }
  emit('update:modelValue', { trials: ordered.filter((id) => chosen.has(id)) })
}
</script>

<template>
  <label class="visibility">
    <span class="field-label">Visible in trials</span>
    <MultiSelect
      :model-value="visibleIds"
      :options="trials"
      option-label="name"
      option-value="id"
      display="chip"
      size="small"
      :show-toggle-all="false"
      @update:model-value="update($event as string[])"
    />
  </label>
</template>

<style scoped>
.visibility {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field-label {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
