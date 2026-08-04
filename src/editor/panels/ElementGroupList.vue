<script setup lang="ts">
import type { ElementDefinition } from '../../core/model/types'
import type { ElementGroup } from '../store/libraryStore'
import PaletteElementButton from './PaletteElementButton.vue'

defineProps<{
  groups: ElementGroup[]
  activeId?: string | null
}>()

const emit = defineEmits<{
  pick: [elementId: string]
  edit: [elementId: string]
  remove: [element: ElementDefinition]
}>()
</script>

<template>
  <div v-for="group in groups" :key="group.id" class="group">
    <p class="group-name">{{ group.name }}</p>
    <PaletteElementButton
      v-for="element in group.elements"
      :key="element.id"
      :element="element"
      :active="activeId === element.id"
      @pick="emit('pick', element.id)"
      @edit="emit('edit', element.id)"
      @remove="emit('remove', element)"
    />
  </div>
</template>

<style scoped>
.group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.group-name {
  margin: 4px 0 2px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-faint);
}
</style>
