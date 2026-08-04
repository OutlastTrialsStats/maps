import { computed, type Ref } from 'vue'
import { ICON_FILE_PATTERN } from '../../core/constants'
import { elementIconUrl } from '../../core/model/dataSource'

export const ICON_FILE_ERROR = 'Only a bare file name is allowed (no path, no .webp).'

/** Validity and preview URL of a bare game-assets icon file name. */
export function useIconField(icon: Readonly<Ref<string | null | undefined>>) {
  const valid = computed(() => !icon.value || ICON_FILE_PATTERN.test(icon.value))
  const previewUrl = computed(() =>
    valid.value && icon.value ? elementIconUrl(icon.value) : undefined,
  )
  return { valid, previewUrl }
}
