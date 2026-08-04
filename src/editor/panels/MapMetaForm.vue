<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useEditorStore } from '../store/editorStore'

const store = useEditorStore()

function setName(raw: string): void {
  const name = raw.trim()
  if (!name) {
    return
  }
  store.commitManifest((manifest) => {
    manifest.meta.name = name
  })
}
</script>

<template>
  <div v-if="store.manifest" class="map-meta">
    <h3 class="panel-title">Map: {{ store.manifest.id }}</h3>
    <div class="field">
      <label class="field-label" for="map-name">Name</label>
      <InputText
        id="map-name"
        :model-value="store.manifest.meta.name"
        size="small"
        @change="setName(($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<style scoped>
.map-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
