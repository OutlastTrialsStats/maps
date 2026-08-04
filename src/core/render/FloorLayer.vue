<script setup lang="ts">
import { computed } from 'vue'
import type { ElementIndex } from '../model/elementIndex'
import type { TrialDocument, Zone } from '../model/types'
import CalloutMarker from './CalloutMarker.vue'
import PlacementMarker from './PlacementMarker.vue'
import RoomShape from './RoomShape.vue'
import RoutePath from './RoutePath.vue'
import ShapeOutline from './ShapeOutline.vue'

const props = defineProps<{
  trial: TrialDocument
  floor: number
  elementIndex: ElementIndex
  zones: ReadonlyMap<string, Zone>
  selectedIds?: ReadonlySet<string>
  hiddenCategories?: ReadonlySet<string>
  /** Editor: routes and shapes get an invisible wide hit stroke along their outline. */
  interactive?: boolean
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
const shapes = computed(() => visible(props.trial.shapes))
/** Drawn after all placements so callouts never disappear behind a neighbour. */
const markedPlacements = computed(() => placements.value.filter((placement) => placement.marker))
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
    <ShapeOutline
      v-for="shape in shapes"
      :key="shape.id"
      :shape="shape"
      :selected="selectedIds?.has(shape.id)"
      :hit-area="interactive"
    />
    <RoutePath
      v-for="route in routes"
      :key="route.id"
      :route="route"
      :selected="selectedIds?.has(route.id)"
      :hit-area="interactive"
    />
    <PlacementMarker
      v-for="placement in placements"
      :key="placement.id"
      :placement="placement"
      :element="elementIndex.get(placement.element)"
      :selected="selectedIds?.has(placement.id)"
    />
    <CalloutMarker
      v-for="placement in markedPlacements"
      :key="`marker-${placement.id}`"
      :marker="placement.marker!"
      :pos="placement.pos"
    />
  </g>
</template>
