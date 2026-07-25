<script setup lang="ts">
import { gameAssetUrl } from '../model/dataSource'

type MouseIcon = 'left' | 'right' | 'wheel'

defineProps<{
  hints: { icon: MouseIcon; label: string }[]
}>()

// Game assets are never bundled, they are loaded from GAME_ASSETS_BASE_URL (docs/99 P1).
const ICON_SRC: Record<MouseIcon, string> = {
  left: gameAssetUrl('MouseIconLeftClick.webp'),
  right: gameAssetUrl('MouseIconRightClick.webp'),
  wheel: gameAssetUrl('MouseWheelIcon.webp'),
}
</script>

<template>
  <ul class="legend">
    <li v-for="hint in hints" :key="hint.label">
      <img class="icon" :src="ICON_SRC[hint.icon]" alt="" />
      <span>{{ hint.label }}</span>
    </li>
  </ul>
</template>

<style scoped>
.legend {
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 4px 12px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--glass-bg);
  backdrop-filter: blur(18px);
  list-style: none;
  font-size: 12px;
  color: var(--text-muted);
}

li {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  height: 22px;
  width: auto;
}
</style>
