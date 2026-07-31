import { onMounted, ref } from 'vue'
import { PROFILE_WIDGET_SRC } from '../core/constants'

const state = ref<'loading' | 'ready' | 'failed'>('loading')
let requested = false

export function useProfileWidget() {
  onMounted(() => {
    if (requested) return
    requested = true
    const script = document.createElement('script')
    script.src = PROFILE_WIDGET_SRC
    script.async = true
    script.addEventListener('load', () => (state.value = 'ready'))
    script.addEventListener('error', () => (state.value = 'failed'))
    document.head.append(script)
  })

  return { state }
}
