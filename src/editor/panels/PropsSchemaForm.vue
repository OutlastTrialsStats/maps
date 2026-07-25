<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed } from 'vue'
import type { PlacementProps, PropFieldSchema } from '../../core/model/types'

const props = defineProps<{
  schema: Record<string, PropFieldSchema>
  modelValue: PlacementProps | undefined
}>()

const emit = defineEmits<{ 'update:modelValue': [value: PlacementProps | undefined] }>()

const fields = computed(() => Object.entries(props.schema))

function stringValue(key: string): string {
  const value = props.modelValue?.[key]
  return typeof value === 'string' ? value : ''
}

function numberValue(key: string): number | null {
  const value = props.modelValue?.[key]
  return typeof value === 'number' ? value : null
}

function boolValue(key: string): boolean {
  return props.modelValue?.[key] === true
}

function listValue(key: string): string {
  const value = props.modelValue?.[key]
  return Array.isArray(value) ? value.join(', ') : ''
}

function setField(key: string, value: unknown): void {
  const next: PlacementProps = { ...(props.modelValue ?? {}) }
  const isEmpty =
    value === undefined ||
    value === null ||
    value === '' ||
    value === false ||
    (Array.isArray(value) && value.length === 0)
  if (isEmpty) {
    delete next[key]
  } else {
    next[key] = value
  }
  emit('update:modelValue', Object.keys(next).length > 0 ? next : undefined)
}

function setList(key: string, raw: string): void {
  setField(
    key,
    raw
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean),
  )
}
</script>

<template>
  <div class="props-form">
    <label v-for="[key, field] in fields" :key="key" class="field">
      <span class="field-label">{{ field.label }}</span>
      <InputText
        v-if="field.type === 'string'"
        :model-value="stringValue(key)"
        size="small"
        @change="setField(key, ($event.target as HTMLInputElement).value.trim())"
      />
      <InputText
        v-else-if="field.type === 'string[]'"
        :model-value="listValue(key)"
        size="small"
        placeholder="comma, separated"
        @change="setList(key, ($event.target as HTMLInputElement).value)"
      />
      <InputNumber
        v-else-if="field.type === 'number'"
        :model-value="numberValue(key)"
        size="small"
        :use-grouping="false"
        :max-fraction-digits="3"
        @update:model-value="setField(key, $event)"
      />
      <Checkbox
        v-else-if="field.type === 'boolean'"
        :model-value="boolValue(key)"
        binary
        @update:model-value="setField(key, $event as boolean)"
      />
      <Select
        v-else
        :model-value="stringValue(key) || null"
        :options="field.values ?? []"
        size="small"
        show-clear
        @update:model-value="setField(key, $event)"
      />
    </label>
  </div>
</template>

<style scoped>
.props-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field-label {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
