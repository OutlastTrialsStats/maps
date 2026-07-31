<script setup lang="ts">
import { computed } from 'vue'
import type { ElementIndex } from '../model/elementIndex'
import type { TrialDocument, Zone } from '../model/types'
import PlacementMarker from './PlacementMarker.vue'
import RoomShape from './RoomShape.vue'
import RoutePath from './RoutePath.vue'

const props = defineProps<{
  trial: TrialDocument
  floor: number
  elementIndex: ElementIndex
  zones: ReadonlyMap<string, Zone>
  selectedIds?: ReadonlySet<string>
  hiddenCategories?: ReadonlySet<string>
}>()

function visible<T extends { floor: number }>(items: T[]): T[] {
  return items.filter((item) => item.floor === props.floor)
}

const rooms = computed(() => visible(props.trial.rooms))
const placements = computed(() =>
  visible(props.trial.placements).filter((placement) => {
    const category = props.elementIndex.get(placement.element)?.category
    return !category || !props.hiddenCategories?.has(category)
  }),
)
const routes = computed(() => visible(props.trial.routes))
</script>

<template>
  <g>
    <RoomShape
      v-for="room in rooms"
      :key="room.id"
      :room="room"
      :zone="zones.get(room.zone)"
      :selected="selectedIds?.has(room.id)"
    />
    <RoutePath
      v-for="route in routes"
      :key="route.id"
      :route="route"
      :selected="selectedIds?.has(route.id)"
    />
    <PlacementMarker
      v-for="placement in placements"
      :key="placement.id"
      :placement="placement"
      :element="elementIndex.get(placement.element)"
      :selected="selectedIds?.has(placement.id)"
    />
  </g>
</template>
