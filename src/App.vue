<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useCustomCursor } from './core/interaction/useCustomCursor'

const { cursorEnabled } = useCustomCursor()
const cursorEl = ref<HTMLElement>()
const isPressed = ref(false)

/** Offset so the fingertip of the hand image sits on the mouse position. */
const CURSOR_HOTSPOT_OFFSET_PX = 2

let rafId: number | null = null
let cursorX = 0
let cursorY = 0

// Pointer instead of mouse events: while panning, d3-zoom suppresses
// mousemove/mouseup via stopImmediatePropagation, but not pointer events.
function onPointerMove(event: PointerEvent) {
  cursorX = event.clientX - CURSOR_HOTSPOT_OFFSET_PX
  cursorY = event.clientY - CURSOR_HOTSPOT_OFFSET_PX
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      if (cursorEl.value) {
        cursorEl.value.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      }
      rafId = null
    })
  }
}

// Left mouse button only: on a right-click the native context menu swallows
// the pointerup, which would leave the pressed pose stuck.
function onPointerDown(event: PointerEvent) {
  if (event.button === 0) {
    isPressed.value = true
  }
}

function releasePressed() {
  isPressed.value = false
}

onMounted(() => {
  // Preload the pressed variant so the first click does not flicker
  new Image().src = '/images/cursor/cursor_pressed.webp'

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointerup', releasePressed)
  window.addEventListener('blur', releasePressed)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointerup', releasePressed)
  window.removeEventListener('blur', releasePressed)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    v-show="cursorEnabled"
    ref="cursorEl"
    class="custom-cursor"
    :class="{ 'custom-cursor--active': isPressed }"
  />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  background-image: url('/images/cursor/cursor.webp');
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
}

.custom-cursor--active {
  background-image: url('/images/cursor/cursor_pressed.webp');
}
</style>
