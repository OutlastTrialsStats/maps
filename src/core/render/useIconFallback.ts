import { computed, ref, watch } from 'vue'

/** Icon-Ladefehler-Zustand eines Markers; setzt sich bei URL-Wechsel zurück. */
export function useIconFallback(iconUrl: () => string | undefined) {
  const iconFailed = ref(false)
  watch(iconUrl, () => {
    iconFailed.value = false
  })
  const showIcon = computed(() => Boolean(iconUrl()) && !iconFailed.value)
  const onIconError = () => {
    iconFailed.value = true
  }
  return { showIcon, onIconError }
}
