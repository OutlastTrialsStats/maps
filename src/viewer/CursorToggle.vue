<script setup lang="ts">
import { ref } from 'vue'
import { useCustomCursor } from '../core/interaction/useCustomCursor'
import CursorSeverAnimation from './CursorSeverAnimation.vue'

const { cursorEnabled, disableCursor, enableCursor, isTouchDevice } = useCustomCursor()

const anim = ref<{ type: 'sever' | 'restore'; x: number; y: number } | null>(null)

function onClick(event: MouseEvent) {
  if (anim.value) {
    return
  }
  const type = cursorEnabled.value ? 'sever' : 'restore'
  anim.value = { type, x: event.clientX, y: event.clientY }
  if (type === 'sever') {
    disableCursor()
  } else {
    enableCursor()
  }
}
</script>

<template>
  <button
    v-if="!isTouchDevice"
    class="cursor-toggle"
    :class="{ 'cursor-toggle--severed': !cursorEnabled }"
    aria-label="Toggle hand cursor"
    @click="onClick"
  >
    <img src="/images/cursor/cursor_grab.webp" alt="" width="22" height="22" draggable="false" />
  </button>

  <CursorSeverAnimation
    v-if="anim"
    :type="anim.type"
    :x="anim.x"
    :y="anim.y"
    @done="anim = null"
  />
</template>

<style scoped>
.cursor-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border-default);
  border-radius: 6px;
  padding: 4px 6px;
  user-select: none;
  transition:
    border-color 0.3s ease,
    transform 0.2s ease;
}

.cursor-toggle:hover {
  border-color: color-mix(in srgb, var(--danger) 30%, transparent);
  transform: scale(1.15);
}

.cursor-toggle:active {
  transform: scale(0.95);
}

.cursor-toggle--severed {
  border-color: color-mix(in srgb, var(--danger) 15%, transparent);
}

.cursor-toggle--severed:hover {
  border-color: color-mix(in srgb, var(--success) 30%, transparent);
}
</style>
