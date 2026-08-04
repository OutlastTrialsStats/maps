<script setup lang="ts">
const props = defineProps<{
  type: 'sever' | 'restore'
  x: number
  y: number
}>()

const emit = defineEmits<{ done: [] }>()

const DROP_COUNT = 5

// Randomized once per mount — the parent re-mounts this component per animation.
const drops = Array.from({ length: DROP_COUNT }, (_, index) => {
  const angle = -30 + Math.random() * 60
  const dist = 30 + Math.random() * 50
  const dx = Math.sin((angle * Math.PI) / 180) * dist
  const dy = Math.cos((angle * Math.PI) / 180) * dist + 20
  return {
    '--drop-x': `${dx}px`,
    '--drop-y': `${props.type === 'restore' ? -Math.abs(dy) : dy}px`,
    '--drop-delay': `${index * 0.05}s`,
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      class="cursor-anim"
      :class="`cursor-anim--${type}`"
      :style="{ top: `${y}px`, left: `${x}px` }"
    >
      <div class="cursor-anim__slash" />
      <!-- The hand runs longest, so its end closes the whole animation. -->
      <div class="cursor-anim__hand" @animationend="emit('done')" />
      <div class="cursor-anim__stump" />
      <span
        v-for="(style, index) in drops"
        :key="index"
        class="cursor-anim__drop"
        :style="style"
      />
    </div>
  </Teleport>
</template>

<!-- Unscoped: the teleported content lives outside the component DOM -->
<style>
.cursor-anim {
  position: fixed;
  pointer-events: none;
  z-index: 100000;
}

.cursor-anim--sever {
  --anim-color: var(--danger);
}

.cursor-anim--restore {
  --anim-color: var(--success);
}

.cursor-anim__slash {
  position: absolute;
  background: var(--anim-color);
  border-radius: 2px;
  transform: translate(-50%, -50%) rotate(-30deg);
}

.cursor-anim--sever .cursor-anim__slash {
  width: 80px;
  height: 4px;
  box-shadow:
    0 0 20px color-mix(in srgb, var(--anim-color) 80%, transparent),
    0 0 40px color-mix(in srgb, var(--anim-color) 40%, transparent);
  animation: sever-slash 0.3s ease-out forwards;
}

.cursor-anim--restore .cursor-anim__slash {
  width: 60px;
  height: 3px;
  box-shadow:
    0 0 16px color-mix(in srgb, var(--anim-color) 80%, transparent),
    0 0 32px color-mix(in srgb, var(--anim-color) 30%, transparent);
  animation: restore-flash 0.4s ease-out forwards;
}

.cursor-anim__hand {
  position: absolute;
  width: 48px;
  height: 48px;
  background-image: url('/images/cursor/cursor.webp');
  background-size: contain;
  background-repeat: no-repeat;
  transform-origin: top left;
}

.cursor-anim--sever .cursor-anim__hand {
  animation: sever-hand 1s ease-in forwards;
}

.cursor-anim--restore .cursor-anim__hand {
  animation: restore-hand 0.8s ease-out forwards;
}

.cursor-anim--sever .cursor-anim__stump {
  position: absolute;
  top: 4px;
  left: -2px;
  width: 8px;
  height: 0;
  background: color-mix(in srgb, var(--anim-color) 60%, black);
  border-radius: 0 0 4px 4px;
  animation: sever-stump 0.8s 0.2s ease-out forwards;
}

.cursor-anim--restore .cursor-anim__stump {
  display: none;
}

.cursor-anim__drop {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--anim-color);
  border-radius: 50%;
  opacity: 0;
}

.cursor-anim--sever .cursor-anim__drop {
  animation: cursor-drop 0.6s var(--drop-delay, 0s) ease-out forwards;
}

.cursor-anim--restore .cursor-anim__drop {
  animation: cursor-drop 0.5s var(--drop-delay, 0s) ease-out forwards;
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

@keyframes cursor-drop {
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
