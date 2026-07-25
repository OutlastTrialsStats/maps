<script setup lang="ts">
import { computed } from 'vue'
import type { ElementIndex } from '../model/elementIndex'
import type { MapDefinition, Visibility, Zone } from '../model/types'
import { isVisibleInTrial } from '../model/visibility'
import PlacementMarker from './PlacementMarker.vue'
import RoomShape from './RoomShape.vue'
import RoutePath from './RoutePath.vue'

const props = defineProps<{
  map: MapDefinition
  floor: number
  /** Without an entry everything is rendered (editor without a loaded document). */
  trialId?: string
  elementIndex: ElementIndex
  zones: ReadonlyMap<string, Zone>
  selectedIds?: ReadonlySet<string>
  hiddenCategories?: ReadonlySet<string>
}>()

function visible<T extends { floor: number; visibility?: Visibility }>(items: T[]): T[] {
  return items.filter(
    (item) =>
      item.floor === props.floor &&
      (!props.trialId || isVisibleInTrial(item.visibility, props.trialId)),
  )
}

const rooms = computed(() => visible(props.map.rooms))
const placements = computed(() =>
  visible(props.map.placements).filter((placement) => {
    const category = props.elementIndex.get(placement.element)?.category
    return !category || !props.hiddenCategories?.has(category)
  }),
)
const routes = computed(() => visible(props.map.routes))
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
