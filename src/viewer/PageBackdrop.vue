<script setup lang="ts">
defineProps<{
  src: string
  overlay: 'flat' | 'gradient'
}>()
</script>

<template>
  <div class="backdrop" aria-hidden="true">
    <img class="backdrop-img" :src="src" alt="" loading="eager" fetchpriority="high" />
    <div class="backdrop-overlay" :class="overlay" />
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.backdrop-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.backdrop-overlay {
  position: absolute;
  inset: 0;
}

.flat {
  background: color-mix(in srgb, var(--bg-page) 85%, transparent);
}

.gradient {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--bg-page) 20%, transparent) 0%,
    color-mix(in srgb, var(--bg-page) 60%, transparent) 40%,
    var(--bg-page) 75%
  );
}
</style>
