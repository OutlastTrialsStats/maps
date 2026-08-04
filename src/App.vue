<script setup lang="ts">
import { RouterView } from 'vue-router'
import CustomCursorOverlay from './core/ui/CustomCursorOverlay.vue'
</script>

<template>
  <CustomCursorOverlay />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
