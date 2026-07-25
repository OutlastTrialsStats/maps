<script setup lang="ts">
import { computed } from 'vue'
import type { ElementDefinition, Placement } from '../model/types'
import PlacementIcon from './PlacementIcon.vue'
import StructuralMarker from './StructuralMarker.vue'

const props = defineProps<{
  placement: Placement
  element?: ElementDefinition
  selected?: boolean
}>()

const structural = computed(() => (props.element?.render ? props.element : undefined))
</script>

<template>
  <StructuralMarker
    v-if="structural"
    :placement="placement"
    :element="structural"
    :selected="selected"
  />
  <PlacementIcon v-else :placement="placement" :element="element" :selected="selected" />
</template>
