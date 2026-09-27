<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useHorizontalWheelScroll } from '../core/interaction/useHorizontalWheelScroll'
import { loadMapsIndex } from '../core/model/dataSource'
import type { MapRegistryEntry } from '../core/model/types'
import ContributorsSection from './ContributorsSection.vue'
import HeroBanner from './HeroBanner.vue'
import MapCard from './MapCard.vue'
import MapsHeading from './MapsHeading.vue'
import PageBackdrop from './PageBackdrop.vue'
import SiteFooter from './SiteFooter.vue'

// A component prop is not rewritten by Vite's asset pipeline, hence the explicit base.
const backdropSrc = `${import.meta.env.BASE_URL}images/bdg_home.png`

const maps = ref<MapRegistryEntry[]>([])
const loadError = ref('')
const cardsEl = ref<HTMLElement | null>(null)
const { onWheel } = useHorizontalWheelScroll(cardsEl)

const orderedMaps = computed(() =>
  [...maps.value].sort((a, b) => Number(b.enabled) - Number(a.enabled)),
)

onMounted(async () => {
  try {
    maps.value = (await loadMapsIndex()).maps
  } catch (error) {
    loadError.value = `Failed to load the map registry: ${String(error)}`
  }
})
</script>

<template>
  <div class="page">
    <PageBackdrop :src="backdropSrc" overlay="gradient" />
    <main class="overview">
      <section class="hero">
        <HeroBanner
          title="Outlast Trials Maps"
          subtitle="Interactive Outlast Trials Maps"
          stamp="Beta"
        />
      </section>
      <MapsHeading :maps="maps" />
      <p v-if="loadError" class="error" role="alert">{{ loadError }}</p>
      <div ref="cardsEl" class="cards wide-row" @wheel="onWheel">
        <MapCard v-for="map in orderedMaps" :key="map.id" :map="map" />
      </div>
      <ContributorsSection class="wide-row" :maps="maps" />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.overview {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 16px 24px 24px;
}

.hero {
  padding: clamp(0.5rem, 3vh, 2rem) 0 clamp(0.75rem, 2.5vh, 1.5rem);
}

.wide-row {
  /* Wider than the content column so a cropped poster on the right invites scrolling. */
  --wide-row-width: max(100%, min(1280px, 100vw - 48px));
  width: var(--wide-row-width);
  margin-inline: calc((100% - var(--wide-row-width)) / 2);
}

.cards {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  /* Room for the hover lift of the cards, otherwise the scroll container clips the effect. */
  padding-block: 12px;
  scrollbar-width: thin;
  scrollbar-color: var(--surface-active) transparent;
}

.cards > * {
  flex: 0 0 clamp(130px, (100vh - 510px) * 548 / 728, 260px);
}
</style>
