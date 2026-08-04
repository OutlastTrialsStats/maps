<script setup lang="ts">
import Button from 'primevue/button'
import ContextMenu from 'primevue/contextmenu'
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { HitTarget } from '../core/interaction/hitTest'
import type { Floor } from '../core/model/types'
import ControlsLegend from '../core/ui/ControlsLegend.vue'
import PageBackdrop from './PageBackdrop.vue'
import ViewerCanvas from './ViewerCanvas.vue'
import ViewerPanel from './panels/ViewerPanel.vue'
import { useViewerStore } from './store/viewerStore'
import { useViewerUrlSync } from './useViewerUrlSync'

const route = useRoute()
const router = useRouter()
const viewer = useViewerStore()
useViewerUrlSync()

watch(
  () => String(route.params.mapId),
  (mapId) => {
    const { trial, floor, room } = route.query
    void viewer.loadMap(mapId, {
      trialId: typeof trial === 'string' ? trial : undefined,
      floor: typeof floor === 'string' ? Number(floor) : undefined,
      roomId: typeof room === 'string' ? room : undefined,
    })
  },
  { immediate: true },
)

const menu = ref<InstanceType<typeof ContextMenu> | null>(null)
const menuItems = ref<MenuItem[]>([])

function openMenu(hit: HitTarget | null, event: MouseEvent): void {
  const items = buildMenuItems(hit)
  if (items.length === 0) {
    return
  }
  menuItems.value = items
  menu.value?.show(event)
}

function buildMenuItems(hit: HitTarget | null): MenuItem[] {
  const deselect: MenuItem = {
    label: 'Deselect room',
    icon: 'pi pi-times',
    command: () => (viewer.selectedRoomId = null),
  }
  if (hit?.kind === 'room') {
    return [
      {
        label: 'See room info in panel',
        icon: 'pi pi-info-circle',
        command: () => {
          viewer.selectedRoomId = hit.id
          viewer.panelOpen = true
        },
      },
      ...(viewer.selectedRoomId ? [deselect] : []),
    ]
  }
  if (hit?.kind === 'placement') {
    const target = stairsTargetFloor(hit.id)
    if (target) {
      return [
        {
          label: `Go to ${target.name}`,
          icon: target.index > viewer.activeFloor ? 'pi pi-arrow-up' : 'pi pi-arrow-down',
          command: () => (viewer.activeFloor = target.index),
        },
      ]
    }
  }
  return viewer.selectedRoomId ? [deselect] : []
}

function stairsTargetFloor(placementId: string): Floor | null {
  const placement = viewer.trial?.placements.find((entry) => entry.id === placementId)
  const target = placement?.props?.targetFloor
  if (typeof target !== 'number' || target === viewer.activeFloor) {
    return null
  }
  return viewer.trial?.floors.find((floor) => floor.index === target) ?? null
}

const title = computed(() => viewer.manifest?.meta.name ?? String(route.params.mapId))
</script>

<template>
  <div class="viewer">
    <PageBackdrop v-if="viewer.backgroundUrl" :src="viewer.backgroundUrl" overlay="flat" />
    <div class="canvas-wrap">
      <ViewerCanvas @open-menu="openMenu" />
      <p v-if="viewer.loading" class="status">Loading {{ title }}…</p>
      <p v-else-if="viewer.loadError" class="status error" role="alert">
        Failed to load this map: {{ viewer.loadError }}
      </p>
      <div class="top-controls">
        <Button
          :icon="viewer.panelOpen ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'"
          size="small"
          severity="secondary"
          aria-label="Toggle panel"
          @click="viewer.panelOpen = !viewer.panelOpen"
        />
        <Button
          icon="pi pi-times"
          size="small"
          severity="secondary"
          aria-label="Close viewer"
          @click="router.push('/')"
        />
      </div>
      <ControlsLegend
        class="legend"
        :hints="[
          { icon: 'left', label: 'Drag to pan' },
          { icon: 'wheel', label: 'Scroll to zoom' },
          { icon: 'right', label: 'Room info' },
        ]"
      />
    </div>
    <aside v-if="viewer.panelOpen" class="side-panel">
      <ViewerPanel />
    </aside>
    <ContextMenu ref="menu" :model="menuItems" />
  </div>
</template>

<style scoped>
.viewer {
  display: flex;
  height: 100vh;
}

.canvas-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
}

/* Canvas transparent so the map background image behind it stays visible. */
.canvas-wrap :deep(.map-canvas) {
  background: transparent;
}

.status {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 6px 14px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--glass-bg);
  backdrop-filter: blur(18px);
}

.top-controls {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}

.legend {
  position: absolute;
  bottom: 12px;
  left: 12px;
}

.side-panel {
  width: 280px;
  flex-shrink: 0;
  overflow-y: auto;
  padding: 16px;
  background: var(--surface-panel);
  border-left: 1px solid var(--border-default);
}
</style>
