<script setup lang="ts">
import Button from 'primevue/button'
import Select from 'primevue/select'
import { computed } from 'vue'
import { parseOpenPath } from '../../core/model/roomPath'
import type { InnerLine, InnerLineStyle } from '../../core/model/types'
import { INNER_LINE_STYLE_OPTIONS } from '../innerLineStyles'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ roomId: string }>()
const store = useEditorStore()

const lines = computed(
  () => store.document?.rooms.find((room) => room.id === props.roomId)?.innerLines ?? [],
)

function pointCount(line: InnerLine): string {
  const points = parseOpenPath(line.path)
  return points ? `${points.length} points` : 'not parsable'
}

function mutateLines(mutate: (list: InnerLine[]) => void): void {
  store.commitOn('room', props.roomId, (room) => {
    const list = room.innerLines ?? []
    mutate(list)
    if (list.length === 0) {
      delete room.innerLines
    } else {
      room.innerLines = list
    }
  })
}

function setStyle(index: number, style: InnerLineStyle): void {
  mutateLines((list) => {
    list[index].style = style
  })
}

function removeLine(index: number): void {
  mutateLines((list) => list.splice(index, 1))
}
</script>

<template>
  <div class="inner-lines">
    <span class="field-label">Inner lines</span>
    <p v-if="lines.length === 0" class="hint">
      None — pick the room tool's “Inner lines” mode and draw inside the room.
    </p>
    <div v-for="(line, index) in lines" :key="index" class="line-row">
      <span class="line-name">#{{ index + 1 }}</span>
      <Select
        :model-value="line.style"
        :options="INNER_LINE_STYLE_OPTIONS"
        option-label="label"
        option-value="value"
        size="small"
        class="style-select"
        @update:model-value="setStyle(index, $event)"
      />
      <span class="line-meta">{{ pointCount(line) }}</span>
      <Button
        v-tooltip.left="'Remove inner line'"
        icon="pi pi-trash"
        aria-label="Remove inner line"
        size="small"
        text
        severity="danger"
        @click="removeLine(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.inner-lines {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hint {
  margin: 0;
  font-size: 12px;
  color: var(--text-faint);
}

.line-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.line-name {
  min-width: 24px;
  font-size: 12px;
  color: var(--text-muted);
}

.style-select {
  flex: 1;
  min-width: 0;
}

.line-meta {
  font-size: 11px;
  color: var(--text-faint);
  white-space: nowrap;
}
</style>
