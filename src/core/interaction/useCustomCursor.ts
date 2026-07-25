import { ref, watch } from 'vue'
import { CURSOR_STORAGE_KEY } from '../constants'

// Touch-/Coarse-Pointer-Geräte haben keinen echten Zeiger, dem das Overlay
// folgen könnte — das Feature ist dort komplett deaktiviert.
const isTouchDevice =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(pointer: coarse)').matches

function readStorage(): boolean {
  try {
    const stored = localStorage.getItem(CURSOR_STORAGE_KEY)
    return stored === null ? true : stored === 'true'
  } catch {
    return true
  }
}

const cursorEnabled = ref(isTouchDevice ? false : readStorage())

function syncHtmlClass(enabled: boolean) {
  document.documentElement.classList.toggle('custom-cursor-active', enabled)
}

if (typeof document !== 'undefined') {
  syncHtmlClass(cursorEnabled.value)
}

watch(cursorEnabled, (enabled) => {
  syncHtmlClass(enabled)
  try {
    localStorage.setItem(CURSOR_STORAGE_KEY, String(enabled))
  } catch {
    // localStorage voll oder nicht verfügbar — Zustand gilt dann nur für die Sitzung
  }
})

export function useCustomCursor() {
  function disableCursor() {
    cursorEnabled.value = false
  }

  function enableCursor() {
    if (isTouchDevice) return
    cursorEnabled.value = true
  }

  return {
    cursorEnabled,
    disableCursor,
    enableCursor,
    isTouchDevice,
  }
}
