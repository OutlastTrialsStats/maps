<script setup lang="ts">
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import type { RoomImage } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'

const props = defineProps<{ roomId: string }>()
const store = useEditorStore()

const newSrc = ref('')
const images = computed(
  () => store.document?.rooms.find((room) => room.id === props.roomId)?.info?.images ?? [],
)

function mutateImages(mutate: (list: RoomImage[]) => void, coalesce?: string): void {
  store.commit(
    (doc) => {
      const room = doc.rooms.find((entry) => entry.id === props.roomId)
      if (!room) {
        return
      }
      const info = room.info ?? {}
      const list = info.images ?? []
      mutate(list)
      if (list.length === 0) {
        delete info.images
      } else {
        info.images = list
      }
      if (Object.keys(info).length === 0) {
        delete room.info
      } else {
        room.info = info
      }
    },
    coalesce ? { coalesce: `${props.roomId}:${coalesce}` } : undefined,
  )
}

function addImage(): void {
  const src = newSrc.value.trim()
  if (!src) {
    return
  }
  mutateImages((list) => list.push({ src }))
  newSrc.value = ''
}

function setSrc(index: number, raw: string): void {
  const src = raw.trim()
  if (!src) {
    return
  }
  mutateImages((list) => {
    list[index].src = src
  })
}

function toggleCamera(index: number, enabled: boolean): void {
  mutateImages((list) => {
    if (enabled) {
      list[index].camera = { pos: [0, 0], rotation: 0 }
    } else {
      delete list[index].camera
    }
  })
}

function setCamera(index: number, patch: { x?: number; y?: number; rotation?: number }): void {
  const field = patch.x !== undefined ? 'x' : patch.y !== undefined ? 'y' : 'rotation'
  mutateImages((list) => {
    const camera = list[index].camera
    if (!camera) {
      return
    }
    camera.pos = [patch.x ?? camera.pos[0], patch.y ?? camera.pos[1]]
    camera.rotation = patch.rotation ?? camera.rotation
  }, `img${index}-camera-${field}`)
}

function removeImage(index: number): void {
  mutateImages((list) => list.splice(index, 1))
}

function isPicking(index: number): boolean {
  return store.cameraPick?.roomId === props.roomId && store.cameraPick.imageIndex === index
}
</script>

<template>
  <fieldset class="images">
    <legend>Screenshots</legend>
    <div v-for="(image, index) in images" :key="index" class="image-row">
      <div class="src-row">
        <InputText
          :model-value="image.src"
          size="small"
          class="src-input"
          @change="setSrc(index, ($event.target as HTMLInputElement).value)"
        />
        <Button
          v-tooltip.left="'Remove screenshot'"
          icon="pi pi-trash"
          aria-label="Remove screenshot"
          size="small"
          severity="danger"
          text
          @click="removeImage(index)"
        />
      </div>
      <div class="camera-row">
        <label class="camera-toggle">
          <Checkbox
            :model-value="Boolean(image.camera)"
            binary
            @update:model-value="toggleCamera(index, $event as boolean)"
          />
          <span>Camera marker</span>
        </label>
        <Button
          v-tooltip.left="'Place camera — click the map for the position, drag for the direction'"
          icon="pi pi-camera"
          aria-label="Place camera on map"
          size="small"
          text
          :severity="isPicking(index) ? 'primary' : 'secondary'"
          @click="store.armCameraPick(props.roomId, index)"
        />
      </div>
      <div v-if="image.camera" class="camera-fields">
        <InputNumber
          :model-value="image.camera.pos[0]"
          size="small"
          placeholder="X"
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setCamera(index, { x: $event ?? 0 })"
        />
        <InputNumber
          :model-value="image.camera.pos[1]"
          size="small"
          placeholder="Y"
          :use-grouping="false"
          :max-fraction-digits="1"
          @update:model-value="setCamera(index, { y: $event ?? 0 })"
        />
        <InputNumber
          :model-value="image.camera.rotation"
          size="small"
          placeholder="Angle"
          :use-grouping="false"
          suffix="°"
          @update:model-value="setCamera(index, { rotation: $event ?? 0 })"
        />
      </div>
    </div>
    <div class="add-row">
      <InputText
        v-model.trim="newSrc"
        size="small"
        class="src-input"
        placeholder="img/room-name-1.jpg"
        @keydown.enter="addImage"
      />
      <Button label="Add" size="small" severity="secondary" :disabled="!newSrc" @click="addImage" />
    </div>
    <p class="hint">Image files are added to the repository in the pull request.</p>
  </fieldset>
</template>

<style scoped>
.images {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--border-default);
  border-radius: 4px;
  padding: 8px;
}

.images legend {
  font-size: 12px;
  color: var(--text-muted);
  padding: 0 4px;
}

.image-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border-subtle);
}

.src-row,
.add-row {
  display: flex;
  gap: 4px;
  align-items: center;
}

.src-input {
  flex: 1;
  min-width: 0;
}

.camera-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.camera-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.camera-fields {
  display: flex;
  gap: 4px;
}

.hint {
  margin: 0;
  font-size: 11px;
  color: var(--text-faint);
}
</style>
