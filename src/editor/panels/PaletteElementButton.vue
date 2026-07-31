<script setup lang="ts">
import Button from 'primevue/button'
import { computed } from 'vue'
import { elementIconUrl } from '../../core/model/dataSource'
import type { ElementDefinition } from '../../core/model/types'
import { centeredRectPath } from '../../core/render/structuralShapes'
import { useIconFallback } from '../../core/render/useIconFallback'

const props = defineProps<{
  element: ElementDefinition
  active?: boolean
}>()

const emit = defineEmits<{ pick: []; edit: []; remove: [] }>()

const iconUrl = computed(() => elementIconUrl(props.element.icon))

const { showIcon, onIconError } = useIconFallback(() => iconUrl.value)

function shapePreviewPath(element: ElementDefinition): string {
  const render = element.render
  return render ? centeredRectPath(render.length, render.thickness) : ''
}
</script>

<template>
  <div class="element-row" :class="{ active }">
    <button type="button" class="element" @click="emit('pick')">
      <img
        v-if="showIcon"
        :src="iconUrl"
        alt=""
        class="icon-preview"
        @error="onIconError"
      />
      <svg v-else-if="element.render" class="shape-preview" viewBox="-11 -6 22 12">
        <path :d="shapePreviewPath(element)" :fill="element.color" />
      </svg>
      <span v-else class="dot" :style="{ background: element.color }" />
      <span class="name">{{ element.name }}</span>
    </button>
    <span class="row-actions">
      <Button
        v-tooltip.left="'Edit element'"
        icon="pi pi-pencil"
        size="small"
        text
        severity="secondary"
        @click.stop="emit('edit')"
      />
      <Button
        v-tooltip.left="'Delete element'"
        icon="pi pi-trash"
        size="small"
        text
        severity="danger"
        @click.stop="emit('remove')"
      />
    </span>
  </div>
</template>

<style scoped>
.element-row {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
}

.element-row:hover {
  background: var(--surface-raised);
}

.element-row.active {
  border-color: var(--color-selection);
  background: var(--color-selection-soft);
}

.element {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  gap: 8px;
  padding: 4px 6px;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}

.icon-preview {
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.shape-preview {
  width: 18px;
  height: 10px;
  flex-shrink: 0;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-actions {
  display: none;
  flex-shrink: 0;
}

.element-row:hover .row-actions {
  display: inline-flex;
}
</style>
