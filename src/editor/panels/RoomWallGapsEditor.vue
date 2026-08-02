<script setup lang="ts">
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import { computed } from 'vue'
import { WALL_GAP_MIN_LENGTH } from '../../core/constants'
import { shapeToPoints } from '../../core/model/roomPath'
import type { WallGap } from '../../core/model/types'
import { edgeLength, edgeSegments } from '../../core/model/wallGaps'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ roomId: string }>()
const store = useEditorStore()

const room = computed(() => store.document?.rooms.find((entry) => entry.id === props.roomId))
const gaps = computed(() => room.value?.wallGaps ?? [])

/** Length of every outline edge — the upper bound of `start + length`. */
const edgeLengths = computed(() => {
  const points = room.value ? shapeToPoints(room.value.shape) : null
  return points ? edgeSegments(points).map(edgeLength) : []
})

function mutateGaps(mutate: (list: WallGap[]) => void, coalesce?: string): void {
  store.commit(
    (doc) => {
      const target = doc.rooms.find((entry) => entry.id === props.roomId)
      if (!target) {
        return
      }
      const list = target.wallGaps ?? []
      mutate(list)
      if (list.length === 0) {
        delete target.wallGaps
      } else {
        target.wallGaps = list
      }
    },
    coalesce ? { coalesce: `${props.roomId}:${coalesce}` } : undefined,
  )
}

function maxLength(gap: WallGap): number {
  const available = edgeLengths.value[gap.edge] ?? gap.start + gap.length
  return Math.max(WALL_GAP_MIN_LENGTH, available - gap.start)
}

function setEdge(index: number, value: number | null): void {
  const edges = edgeLengths.value.length
  const edge = Math.min(Math.max(value ?? 0, 0), edges > 0 ? edges - 1 : 0)
  mutateGaps((list) => {
    list[index].edge = edge
  }, `gap${index}-edge`)
}

function setStart(index: number, value: number | null): void {
  mutateGaps((list) => {
    const gap = list[index]
    const available = edgeLengths.value[gap.edge] ?? gap.start + gap.length
    gap.start = Math.min(Math.max(value ?? 0, 0), Math.max(0, available - WALL_GAP_MIN_LENGTH))
    gap.length = Math.min(gap.length, Math.max(WALL_GAP_MIN_LENGTH, available - gap.start))
  }, `gap${index}-start`)
}

function setLength(index: number, value: number | null): void {
  mutateGaps((list) => {
    const gap = list[index]
    gap.length = Math.min(Math.max(value ?? 0, WALL_GAP_MIN_LENGTH), maxLength(gap))
  }, `gap${index}-length`)
}

function removeGap(index: number): void {
  mutateGaps((list) => list.splice(index, 1))
}
</script>

<template>
  <div class="wall-gaps">
    <span class="field-label">Wall gaps</span>
    <p v-if="gaps.length === 0" class="hint">
      None — pick the room tool's “Wall gap” mode and click an edge.
    </p>
    <div v-for="(gap, index) in gaps" :key="index" class="gap-row">
      <label class="field">
        <span class="field-label">Edge</span>
        <InputNumber
          :model-value="gap.edge"
          size="small"
          fluid
          :use-grouping="false"
          :min="0"
          :max="Math.max(0, edgeLengths.length - 1)"
          @update:model-value="setEdge(index, $event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Start</span>
        <InputNumber
          :model-value="gap.start"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          :min="0"
          @update:model-value="setStart(index, $event)"
        />
      </label>
      <label class="field">
        <span class="field-label">Length</span>
        <InputNumber
          :model-value="gap.length"
          size="small"
          fluid
          :use-grouping="false"
          :max-fraction-digits="1"
          :min="WALL_GAP_MIN_LENGTH"
          @update:model-value="setLength(index, $event)"
        />
      </label>
      <Button
        v-tooltip.left="'Remove wall gap'"
        icon="pi pi-trash"
        aria-label="Remove wall gap"
        size="small"
        text
        severity="danger"
        @click="removeGap(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.wall-gaps {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 12px;
  color: var(--text-muted);
}

.hint {
  margin: 0;
  font-size: 12px;
  color: var(--text-faint);
}

.gap-row {
  display: flex;
  align-items: flex-end;
  gap: 6px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1 1 0;
  min-width: 0;
}
</style>
