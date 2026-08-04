<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { computed } from 'vue'
import { KEBAB_ID_PATTERN } from '../../core/constants'
import { pointsBounds, shapeToPoints } from '../../core/model/roomPath'
import type { Room, RoomFlag, RoomInfo, TrialDocument, Vec2 } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { useZonesStore } from '../store/zonesStore'
import RoomImagesEditor from './RoomImagesEditor.vue'
import RoomInnerLinesEditor from './RoomInnerLinesEditor.vue'
import RoomWallGapsEditor from './RoomWallGapsEditor.vue'

const props = defineProps<{ room: Room }>()
const store = useEditorStore()
const zonesStore = useZonesStore()

const flagOptions: Array<{ id: RoomFlag; label: string }> = [
  { id: 'secret', label: 'Secret room' },
  { id: 'reel', label: 'Reel room' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'noWalls', label: 'No walls' },
  { id: 'unreachable', label: 'Unreachable' },
]

const zoneOptions = computed(() =>
  zonesStore.zones.map((zone) => ({ label: zone.name, value: zone.id })),
)
const floorOptions = computed(() =>
  store.floors.map((floor) => ({ label: floor.name, value: floor.index })),
)
const flags = computed(() => new Set(props.room.flags ?? []))

/** All changes go through the document object from the store (never through the prop). */
function mutateRoom(mutate: (room: Room, doc: TrialDocument) => void, coalesce?: string): void {
  store.commit(
    (doc) => {
      const room = doc.rooms.find((entry) => entry.id === props.room.id)
      if (room) {
        mutate(room, doc)
      }
    },
    coalesce ? { coalesce: `${props.room.id}:${coalesce}` } : undefined,
  )
}

function renameId(raw: string): void {
  const id = raw.trim()
  if (
    !KEBAB_ID_PATTERN.test(id) ||
    id === props.room.id ||
    store.document?.rooms.some((room) => room.id === id)
  ) {
    return
  }
  const oldId = props.room.id
  mutateRoom((room, doc) => {
    room.id = id
    for (const placement of doc.placements) {
      if (placement.roomId === oldId) {
        placement.roomId = id
      }
    }
  })
  store.setSelection([{ kind: 'room', id }])
}

function setInfo(patch: Partial<RoomInfo>): void {
  mutateRoom((room) => {
    const info: RoomInfo = { ...(room.info ?? {}), ...patch }
    if (!info.title) {
      delete info.title
    }
    if (!info.description) {
      delete info.description
    }
    if (!info.images?.length) {
      delete info.images
    }
    if (Object.keys(info).length === 0) {
      delete room.info
    } else {
      room.info = info
    }
  })
}

function setZone(zone: string): void {
  mutateRoom((room) => {
    room.zone = zone
  })
}

/** Placements assigned to the room move along — the floor mismatch would be a validation error. */
function setFloor(floor: number): void {
  if (floor === props.room.floor) {
    return
  }
  mutateRoom((room, doc) => {
    room.floor = floor
    for (const placement of doc.placements) {
      if (placement.roomId === room.id) {
        placement.floor = floor
      }
    }
  })
  store.activeFloor = floor
}

function toggleFlag(flag: RoomFlag, checked: boolean): void {
  mutateRoom((room) => {
    const next = new Set(room.flags ?? [])
    if (checked) {
      next.add(flag)
    } else {
      next.delete(flag)
    }
    if (next.size === 0) {
      delete room.flags
    } else {
      room.flags = flagOptions.map((option) => option.id).filter((id) => next.has(id))
    }
  })
}

function setLabelText(raw: string): void {
  const text = raw.trim()
  mutateRoom((room) => {
    if (!text) {
      delete room.label
      return
    }
    if (room.label) {
      room.label.text = text
      return
    }
    const points = shapeToPoints(room.shape)
    let pos: Vec2 = [0, 0]
    if (points) {
      const { min, max } = pointsBounds(points)
      pos = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2]
    }
    room.label = { text, pos }
  })
}

function setLabelValue(patch: { pos?: Vec2; fontSize?: number | null }, coalesce: string): void {
  mutateRoom((room) => {
    if (!room.label) {
      return
    }
    if (patch.pos) {
      room.label.pos = patch.pos
    }
    if (patch.fontSize !== undefined) {
      if (patch.fontSize === null) {
        delete room.label.fontSize
      } else {
        room.label.fontSize = patch.fontSize
      }
    }
  }, coalesce)
}
</script>

<template>
  <div class="room-props">
    <h3>Room</h3>
    <label class="field">
      <span class="field-label">ID</span>
      <InputText
        :model-value="room.id"
        size="small"
        @change="renameId(($event.target as HTMLInputElement).value)"
      />
    </label>
    <label class="field">
      <span class="field-label">Title</span>
      <InputText
        :model-value="room.info?.title ?? ''"
        size="small"
        @change="setInfo({ title: ($event.target as HTMLInputElement).value.trim() })"
      />
    </label>
    <label class="field">
      <span class="field-label">Description</span>
      <Textarea
        :model-value="room.info?.description ?? ''"
        auto-resize
        rows="3"
        @change="setInfo({ description: ($event.target as HTMLTextAreaElement).value.trim() })"
      />
    </label>
    <label class="field">
      <span class="field-label">Zone</span>
      <Select
        :model-value="room.zone"
        :options="zoneOptions"
        option-label="label"
        option-value="value"
        size="small"
        @update:model-value="setZone($event)"
      />
    </label>
    <label class="field">
      <span class="field-label">Floor (assigned placements move along)</span>
      <Select
        :model-value="room.floor"
        :options="floorOptions"
        option-label="label"
        option-value="value"
        size="small"
        @update:model-value="setFloor($event)"
      />
    </label>
    <fieldset class="flags">
      <legend>Flags</legend>
      <label v-for="option in flagOptions" :key="option.id" class="flag-row">
        <Checkbox
          :model-value="flags.has(option.id)"
          binary
          @update:model-value="toggleFlag(option.id, $event as boolean)"
        />
        <span>{{ option.label }}</span>
      </label>
    </fieldset>
    <label class="field">
      <span class="field-label">Label text (empty = none)</span>
      <InputText
        :model-value="room.label?.text ?? ''"
        size="small"
        @change="setLabelText(($event.target as HTMLInputElement).value)"
      />
    </label>
    <div v-if="room.label" class="field-row">
      <label class="field">
        <span class="field-label">Label X</span>
        <InputNumber
          :model-value="room.label.pos[0]"
          size="small"
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setLabelValue({ pos: [$event ?? 0, room.label.pos[1]] }, 'label-x')"
        />
      </label>
      <label class="field">
        <span class="field-label">Label Y</span>
        <InputNumber
          :model-value="room.label.pos[1]"
          size="small"
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setLabelValue({ pos: [room.label.pos[0], $event ?? 0] }, 'label-y')"
        />
      </label>
      <label class="field">
        <span class="field-label">Font size</span>
        <InputNumber
          :model-value="room.label.fontSize ?? null"
          size="small"
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setLabelValue({ fontSize: $event }, 'label-size')"
        />
      </label>
    </div>
    <RoomWallGapsEditor :room-id="room.id" />
    <RoomInnerLinesEditor :room-id="room.id" />
    <RoomImagesEditor :room-id="room.id" />
  </div>
</template>

<style scoped>
.room-props {
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

.field-row {
  display: flex;
  gap: 6px;
}

.field-row .field {
  min-width: 0;
}

.flags {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid var(--border-default);
  border-radius: 4px;
  padding: 8px;
}

.flags legend {
  font-size: 12px;
  color: var(--text-muted);
  padding: 0 4px;
}

.flag-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}
</style>
