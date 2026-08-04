<script setup lang="ts">
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Select from 'primevue/select'
import { computed } from 'vue'
import { mapAssetUrl } from '../../core/model/dataSource'
import { useViewerStore } from '../store/viewerStore'
import MapCredits from './MapCredits.vue'

const viewer = useViewerStore()

const roomInfo = computed(() => viewer.selectedRoom?.info ?? null)

/** Selecting a trial fetches its file — hence a setter instead of a direct v-model. */
const selectedTrialId = computed({
  get: () => viewer.activeTrialId,
  set: (trialId: string) => void viewer.setActiveTrial(trialId),
})

function imageUrl(src: string): string {
  return viewer.manifest ? mapAssetUrl(viewer.manifest.id, src) : src
}
</script>

<template>
  <div class="panel">
    <section>
      <h2 class="panel-heading">Trial</h2>
      <Select
        v-model="selectedTrialId"
        :options="viewer.trials"
        option-label="name"
        option-value="id"
        size="small"
        class="trial-select"
      />
    </section>

    <section>
      <h2 class="panel-heading">Floor</h2>
      <div class="floor-switcher">
        <Button
          icon="pi pi-chevron-up"
          size="small"
          severity="secondary"
          :disabled="!viewer.canFloorUp"
          aria-label="Floor up"
          @click="viewer.stepFloor(1)"
        />
        <span class="floor-name">{{ viewer.activeFloorName }}</span>
        <Button
          icon="pi pi-chevron-down"
          size="small"
          severity="secondary"
          :disabled="!viewer.canFloorDown"
          aria-label="Floor down"
          @click="viewer.stepFloor(-1)"
        />
      </div>
      <ul class="floor-list">
        <li v-for="floor in viewer.floorsTopDown" :key="floor.index">
          <button
            type="button"
            class="floor-entry"
            :class="{ active: floor.index === viewer.activeFloor }"
            @click="viewer.activeFloor = floor.index"
          >
            {{ floor.name }}
          </button>
        </li>
      </ul>
    </section>

    <section v-if="viewer.filters.length > 0">
      <h2 class="panel-heading">Filters</h2>
      <label v-for="filter in viewer.filters" :key="filter.id" class="filter-row">
        <Checkbox
          :model-value="!viewer.disabledFilterIds.has(filter.id)"
          binary
          size="small"
          @update:model-value="viewer.toggleFilter(filter.id)"
        />
        <span>{{ filter.name }}</span>
      </label>
    </section>

    <section v-if="viewer.selectedRoom">
      <h2 class="panel-heading">Room</h2>
      <template v-if="roomInfo">
        <h3 v-if="roomInfo.title" class="room-title">{{ roomInfo.title }}</h3>
        <p v-if="roomInfo.description" class="room-description">{{ roomInfo.description }}</p>
        <img
          v-for="image in roomInfo.images"
          :key="image.src"
          :src="imageUrl(image.src)"
          :alt="roomInfo.title ?? viewer.selectedRoom.id"
          class="room-image"
          loading="lazy"
        />
      </template>
      <p v-else class="room-description">No info available for this room yet.</p>
      <Button
        label="Deselect room"
        size="small"
        severity="secondary"
        @click="viewer.selectedRoomId = null"
      />
    </section>

    <MapCredits />
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.trial-select {
  width: 100%;
}

.floor-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.floor-name {
  flex: 1;
  text-align: center;
  font-weight: 600;
}

.floor-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.floor-entry {
  width: 100%;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: none;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.floor-entry:hover {
  background: var(--surface-hover);
}

.floor-entry.active {
  background: var(--surface-active);
  font-weight: 600;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0;
  cursor: pointer;
}

.room-title {
  margin: 0 0 4px;
  font-size: 16px;
}

.room-description {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--text-body);
}

.room-image {
  width: 100%;
  margin-bottom: 8px;
  border-radius: 6px;
}
</style>
