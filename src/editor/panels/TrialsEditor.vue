<script setup lang="ts">
import { useEditorStore } from '../store/editorStore'

const store = useEditorStore()
</script>

<template>
  <fieldset class="trials">
    <legend>Trials</legend>
    <div v-for="trial in store.trials" :key="trial.id" class="row">
      <span class="name">{{ trial.name }}</span>
      <span v-if="trial.default" class="default-tag">default</span>
      <span v-if="trial.id === store.document?.trialId" class="default-tag">editing</span>
    </div>
    <p class="hint">
      Trials are maintained by hand in map.json; each trial's content lives in
      trials/&lt;trial-id&gt;.json.
    </p>
  </fieldset>
</template>

<style scoped>
.trials {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid var(--border-default);
  border-radius: 4px;
  padding: 8px;
}

.trials legend {
  font-size: 12px;
  color: var(--text-muted);
  padding: 0 4px;
}

.row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.default-tag {
  font-size: 11px;
  color: var(--text-faint);
  border: 1px solid var(--border-default);
  border-radius: 3px;
  padding: 0 4px;
}

.hint {
  margin: 0;
  font-size: 11px;
  color: var(--text-faint);
}
</style>
