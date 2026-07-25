<script setup lang="ts">
import { ref } from 'vue'
import { useCustomCursor } from '../core/interaction/useCustomCursor'

const { cursorEnabled, disableCursor, enableCursor, isTouchDevice } = useCustomCursor()

const animating = ref(false)
const animationType = ref<'sever' | 'restore'>('sever')
const animPos = ref({ x: 0, y: 0 })

const SEVER_DURATION_MS = 1200
const RESTORE_DURATION_MS = 1000
const DROP_COUNT = 5

function dropStyle(index: number) {
  const angle = -30 + Math.random() * 60
  const dist = 30 + Math.random() * 50
  const dx = Math.sin((angle * Math.PI) / 180) * dist
  const dy = Math.cos((angle * Math.PI) / 180) * dist + 20
  return {
    '--drop-x': `${dx}px`,
    '--drop-y': `${animationType.value === 'restore' ? -Math.abs(dy) : dy}px`,
    '--drop-delay': `${index * 0.05}s`,
  }
}

function onClick(event: MouseEvent) {
  if (animating.value) return

  animPos.value = { x: event.clientX, y: event.clientY }
  animating.value = true

  if (cursorEnabled.value) {
    animationType.value = 'sever'
    disableCursor()
    setTimeout(() => {
      animating.value = false
    }, SEVER_DURATION_MS)
  } else {
    animationType.value = 'restore'
    enableCursor()
    setTimeout(() => {
      animating.value = false
    }, RESTORE_DURATION_MS)
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

  <Teleport to="body">
    <div
      v-if="animating"
      class="cursor-anim"
      :class="'cursor-anim--' + animationType"
      :style="{ top: animPos.y + 'px', left: animPos.x + 'px' }"
    >
      <div class="cursor-anim__slash" />
      <div class="cursor-anim__hand" />
      <div class="cursor-anim__stump" />
      <div class="cursor-anim__drops">
        <span v-for="i in DROP_COUNT" :key="i" class="cursor-anim__drop" :style="dropStyle(i)" />
      </div>
    </div>
  </Teleport>
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

<!-- Unscoped: the teleported content lives outside the component DOM -->
<style>
.cursor-anim {
  position: fixed;
  pointer-events: none;
  z-index: 100000;
}

.cursor-anim--sever .cursor-anim__slash {
  position: absolute;
  width: 80px;
  height: 4px;
  background: var(--danger);
  border-radius: 2px;
  transform: translate(-50%, -50%) rotate(-30deg);
  box-shadow:
    0 0 20px color-mix(in srgb, var(--danger) 80%, transparent),
    0 0 40px color-mix(in srgb, var(--danger) 40%, transparent);
  animation: sever-slash 0.3s ease-out forwards;
}

.cursor-anim--sever .cursor-anim__hand {
  position: absolute;
  width: 48px;
  height: 48px;
  background-image: url('/images/cursor/cursor.webp');
  background-size: contain;
  background-repeat: no-repeat;
  transform-origin: top left;
  animation: sever-hand 1s ease-in forwards;
}

.cursor-anim--sever .cursor-anim__stump {
  position: absolute;
  top: 4px;
  left: -2px;
  width: 8px;
  height: 0;
  background: color-mix(in srgb, var(--danger) 60%, black);
  border-radius: 0 0 4px 4px;
  animation: sever-stump 0.8s 0.2s ease-out forwards;
}

.cursor-anim--sever .cursor-anim__drop {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--danger);
  border-radius: 50%;
  opacity: 0;
  animation: sever-drop 0.6s var(--drop-delay, 0s) ease-out forwards;
}

@keyframes sever-slash {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(-30deg) scaleX(0);
  }
  30% {
    transform: translate(-50%, -50%) rotate(-30deg) scaleX(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(-30deg) scaleX(1.2);
  }
}

@keyframes sever-hand {
  0% {
    opacity: 1;
    transform: translate(-24px, -24px) rotate(0deg);
  }
  20% {
    opacity: 1;
    transform: translate(-10px, -30px) rotate(15deg);
  }
  100% {
    opacity: 0;
    transform: translate(40px, 120px) rotate(90deg);
    filter: brightness(0.6);
  }
}

@keyframes sever-stump {
  0% {
    height: 0;
    opacity: 0.9;
  }
  60% {
    height: 20px;
    opacity: 0.7;
  }
  100% {
    height: 30px;
    opacity: 0;
  }
}

@keyframes sever-drop {
  0% {
    opacity: 0.9;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--drop-x), var(--drop-y)) scale(0.5);
  }
}

.cursor-anim--restore .cursor-anim__slash {
  position: absolute;
  width: 60px;
  height: 3px;
  background: var(--success);
  border-radius: 2px;
  transform: translate(-50%, -50%) rotate(-30deg);
  box-shadow:
    0 0 16px color-mix(in srgb, var(--success) 80%, transparent),
    0 0 32px color-mix(in srgb, var(--success) 30%, transparent);
  animation: restore-flash 0.4s ease-out forwards;
}

.cursor-anim--restore .cursor-anim__hand {
  position: absolute;
  width: 48px;
  height: 48px;
  background-image: url('/images/cursor/cursor.webp');
  background-size: contain;
  background-repeat: no-repeat;
  transform-origin: top left;
  animation: restore-hand 0.8s ease-out forwards;
}

.cursor-anim--restore .cursor-anim__stump {
  display: none;
}

.cursor-anim--restore .cursor-anim__drop {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--success);
  border-radius: 50%;
  opacity: 0;
  animation: restore-drop 0.5s var(--drop-delay, 0s) ease-out forwards;
}

@keyframes restore-flash {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(-30deg) scale(0.5);
  }
  40% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(-30deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(-30deg) scale(1.3);
  }
}

@keyframes restore-hand {
  0% {
    opacity: 0;
    transform: translate(40px, 100px) rotate(80deg);
    filter: brightness(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(0px, -10px) rotate(-5deg);
    filter: brightness(1.3);
  }
  100% {
    opacity: 0;
    transform: translate(-24px, -24px) rotate(0deg);
    filter: brightness(1);
  }
}

@keyframes restore-drop {
  0% {
    opacity: 0.9;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--drop-x), var(--drop-y)) scale(0.5);
  }
}
</style>
