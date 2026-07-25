<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useEditorStore } from '../store/editorStore'

const store = useEditorStore()

function setName(raw: string): void {
  const name = raw.trim()
  if (!name) {
    return
  }
  store.commit((doc) => {
    doc.meta.name = name
  })
}
</script>

<template>
  <div v-if="store.document" class="map-meta">
    <h3>Map: {{ store.document.id }}</h3>
    <div class="field">
      <label class="field-label" for="map-name">Name</label>
      <InputText
        id="map-name"
        :model-value="store.document.meta.name"
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

h3 {
  margin: 0;
  font-size: 14px;
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
