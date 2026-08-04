<script setup lang="ts">
import Button from 'primevue/button'

defineEmits<{
  zoomIn: []
  zoomOut: []
  fit: []
}>()
</script>

<template>
  <div class="zoom-controls">
    <Button
      v-tooltip.left="'Zoom in'"
      icon="pi pi-plus"
      aria-label="Zoom in"
      size="small"
      text
      severity="secondary"
      @click="$emit('zoomIn')"
    />
    <Button
      v-tooltip.left="'Zoom out'"
      icon="pi pi-minus"
      aria-label="Zoom out"
      size="small"
      text
      severity="secondary"
      @click="$emit('zoomOut')"
    />
    <Button
      v-tooltip.left="'Fit view (F)'"
      icon="pi pi-expand"
      aria-label="Fit view"
      size="small"
      text
      severity="secondary"
      @click="$emit('fit')"
    />
  </div>
</template>

<style scoped>
.zoom-controls {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--glass-bg);
  backdrop-filter: blur(18px);
}
</style>
