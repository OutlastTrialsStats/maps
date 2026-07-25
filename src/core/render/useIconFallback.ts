import { computed, ref, watch } from 'vue'

/** Icon load-failure state of a marker; resets when the URL changes. */
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
