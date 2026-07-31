<script setup lang="ts">
import Button from 'primevue/button'
import ColorPicker from 'primevue/colorpicker'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { computed, ref, watch } from 'vue'
import { ICON_FILE_PATTERN, UNKNOWN_ELEMENT_COLOR } from '../../core/constants'
import { elementIconUrl, toIconFileName } from '../../core/model/dataSource'
import type { ElementAnchor, ElementDefinition } from '../../core/model/types'
import { useEditorStore } from '../store/editorStore'
import { slugify } from '../store/ids'
import { useLibraryStore } from '../store/libraryStore'

const visible = defineModel<boolean>('visible', { required: true })

const props = defineProps<{
  /** Set = edit mode for this element of the global library. */
  elementId?: string
}>()

const emit = defineEmits<{ saved: [elementId: string] }>()

const store = useEditorStore()
const libraryStore = useLibraryStore()

const name = ref('')
const category = ref<string | null>(null)
/** Hex without "#" (ColorPicker format). */
const color = ref(UNKNOWN_ELEMENT_COLOR.slice(1))
const description = ref('')
/** Bare file name without extension; the host and `.webp` are added when rendering. */
const iconFile = ref('')
const size = ref<number | null>(null)
const anchor = ref<ElementAnchor | null>(null)

const editing = computed<ElementDefinition | undefined>(() =>
  props.elementId
    ? libraryStore.elements.find((element) => element.id === props.elementId)
    : undefined,
)

/** In edit mode the ID stays fixed — a rename would break references of other maps. */
const id = computed(() => editing.value?.id ?? slugify(name.value))

const idTaken = computed(
  () => !editing.value && libraryStore.elements.some((element) => element.id === id.value),
)
const iconValid = computed(() => iconFile.value === '' || ICON_FILE_PATTERN.test(iconFile.value))
const iconPreview = computed(() => (iconValid.value ? elementIconUrl(iconFile.value) : undefined))
const valid = computed(
  () => id.value !== '' && !idTaken.value && category.value !== null && iconValid.value,
)

const categoryOptions = computed(() =>
  libraryStore.categories.map((entry) => ({ label: entry.name, value: entry.id })),
)
const anchorOptions: Array<{ label: string; value: ElementAnchor | null }> = [
  { label: '(default: center)', value: null },
  { label: 'center', value: 'center' },
  { label: 'topleft', value: 'topleft' },
]

watch(visible, (open) => {
  if (!open) {
    return
  }
  const element = editing.value
  name.value = element?.name ?? ''
  category.value = element?.category ?? null
  color.value = (element?.color ?? UNKNOWN_ELEMENT_COLOR).slice(1)
  description.value = element?.description ?? ''
  iconFile.value = element?.icon ?? ''
  size.value = element?.size ?? null
  anchor.value = element?.anchor ?? null
})

/** Convenience: a pasted full asset URL is reduced to the file name instead of being rejected. */
watch(iconFile, (value) => {
  iconFile.value = toIconFileName(value)
})

/** Merge scalar fields; `render`/`propsSchema` stay untouched (hand-edited only). */
function applyTo(element: ElementDefinition): void {
  element.name = name.value.trim() || element.name
  element.category = category.value ?? element.category
  element.color = `#${color.value.toLowerCase()}`
  const trimmedDescription = description.value.trim()
  if (trimmedDescription) {
    element.description = trimmedDescription
  } else {
    delete element.description
  }
  if (iconFile.value) {
    element.icon = iconFile.value
  } else {
    delete element.icon
  }
  if (size.value !== null && size.value > 0) {
    element.size = size.value
  } else {
    delete element.size
  }
  if (anchor.value) {
    element.anchor = anchor.value
  } else {
    delete element.anchor
  }
}

function save(): void {
  if (!valid.value || !category.value) {
    return
  }
  const elementId = id.value
  store.commitLibrary((library) => {
    const existing = library.elements.find((element) => element.id === elementId)
    if (existing) {
      applyTo(existing)
      return
    }
    const element: ElementDefinition = { id: elementId, name: '', category: '', color: '' }
    applyTo(element)
    library.elements.push(element)
  })
  visible.value = false
  emit('saved', elementId)
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="editing ? `Edit element: ${editing.id}` : 'New element'"
  >
    <div class="form">
      <label class="field">
        <span class="field-label">Name</span>
        <InputText v-model="name" size="small" placeholder="e.g. Generator" />
        <small v-if="id && idTaken" class="field-error">ID "{{ id }}" already exists.</small>
        <small v-else-if="!editing && id" class="field-hint">ID: {{ id }}</small>
      </label>
      <label class="field">
        <span class="field-label">Category</span>
        <Select
          v-model="category"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          size="small"
        />
      </label>
      <label class="field">
        <span class="field-label">Color</span>
        <ColorPicker v-model="color" />
      </label>
      <label class="field">
        <span class="field-label">Tooltip description</span>
        <Textarea v-model="description" auto-resize rows="2" />
      </label>
      <label class="field">
        <span class="field-label">Icon file name (game-assets, without .webp — empty = placeholder)</span>
        <InputText v-model.trim="iconFile" size="small" placeholder="objectif_key" />
        <small v-if="!iconValid" class="field-error">
          Only a bare file name is allowed (no path, no .webp).
        </small>
        <img v-if="iconPreview" :src="iconPreview" alt="" class="icon-preview" />
      </label>
      <div class="field-row">
        <label class="field">
          <span class="field-label">Size (map units)</span>
          <InputNumber
            v-model="size"
            size="small"
            :use-grouping="false"
            :max-fraction-digits="1"
            :min="0"
          />
        </label>
        <label class="field">
          <span class="field-label">Anchor</span>
          <Select
            v-model="anchor"
            :options="anchorOptions"
            option-label="label"
            option-value="value"
            size="small"
          />
        </label>
      </div>
      <div class="actions">
        <Button label="Cancel" severity="secondary" text @click="visible = false" />
        <Button :label="editing ? 'Save' : 'Create'" :disabled="!valid" @click="save" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 340px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field-row {
  display: flex;
  gap: 8px;
}

.field-row .field {
  flex: 1;
  min-width: 0;
}

.field-label {
  font-size: 12px;
  color: var(--text-muted);
}

.field-hint {
  font-size: 11px;
  color: var(--text-faint);
}

.field-error {
  font-size: 11px;
  color: var(--danger);
}

.icon-preview {
  width: 32px;
  height: 32px;
  margin-top: 4px;
  object-fit: contain;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
