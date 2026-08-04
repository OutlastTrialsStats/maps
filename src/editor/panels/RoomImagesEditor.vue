<script setup lang="ts">
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { ref, toRef } from 'vue'
import { useEditorStore } from '../store/editorStore'
import { useRoomImages } from './useRoomImages'

const props = defineProps<{ roomId: string }>()
const store = useEditorStore()

const newSrc = ref('')
const {
  images,
  addImages,
  setSrc,
  removeImage,
  toggleCamera,
  setCamera,
  previewUrl,
  hasFailed,
  markFailed,
} = useRoomImages(toRef(props, 'roomId'))

function addFromInput(): void {
  addImages(newSrc.value)
  newSrc.value = ''
}

function isPicking(index: number): boolean {
  return store.cameraPick?.roomId === props.roomId && store.cameraPick.imageIndex === index
}
</script>

<template>
  <fieldset class="images panel-fieldset">
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
      <img
        v-if="!hasFailed(image.src)"
        :src="previewUrl(image.src)"
        :alt="image.src"
        class="preview"
        loading="lazy"
        @error="markFailed(image.src)"
      />
      <p v-else class="hint">Image not found.</p>
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
      <Textarea
        v-model="newSrc"
        auto-resize
        rows="1"
        class="src-input"
        placeholder="img/room-name-1.jpg or https://… (one per line)"
        @keydown.enter.ctrl="addFromInput"
      />
      <Button
        label="Add"
        size="small"
        severity="secondary"
        :disabled="!newSrc.trim()"
        @click="addFromInput"
      />
    </div>
    <p class="hint">
      Image files are added to the repository in the pull request; external links work right away and
      are replaced before merging.
    </p>
  </fieldset>
</template>

<style scoped>
.images {
  gap: 8px;
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

.preview {
  width: 100%;
  max-height: 96px;
  object-fit: cover;
  border-radius: 6px;
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
