<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useHorizontalWheelScroll } from '../core/interaction/useHorizontalWheelScroll'
import { gameAssetUrl, loadMapsIndex } from '../core/model/dataSource'
import type { MapRegistryEntry } from '../core/model/types'
import ContributorsSection from './ContributorsSection.vue'
import HeroBanner from './HeroBanner.vue'
import MapCard from './MapCard.vue'
import PageBackdrop from './PageBackdrop.vue'
import SiteFooter from './SiteFooter.vue'

// A component prop is not rewritten by Vite's asset pipeline, hence the explicit base.
const backdropSrc = `${import.meta.env.BASE_URL}images/bdg_home.png`

const maps = ref<MapRegistryEntry[]>([])
const loadError = ref('')
const cardsEl = ref<HTMLElement | null>(null)
const { onWheel } = useHorizontalWheelScroll(cardsEl)

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
    <RouterLink to="/editor" class="editor-link">
      <img :src="gameAssetUrl('tag_rename.webp')" alt="" class="editor-link-icon" />
      Map editor
    </RouterLink>
    <main class="overview">
      <section class="hero">
        <HeroBanner
          title="Outlast Trials Maps"
          subtitle="Interactive Outlast Trials Maps"
        />
      </section>
      <p v-if="loadError" class="error" role="alert">{{ loadError }}</p>
      <div ref="cardsEl" class="cards" @wheel="onWheel">
        <MapCard v-for="map in maps" :key="map.id" :map="map" />
      </div>
      <ContributorsSection :maps="maps" />
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

.editor-link {
  position: absolute;
  top: 20px;
  right: 24px;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  background: var(--glass-bg);
  backdrop-filter: blur(18px);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.editor-link:hover {
  background: var(--surface-active);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.editor-link-icon {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.overview {
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px;
}

.hero {
  padding: clamp(1.25rem, 5vw, 3rem) 0 clamp(1.25rem, 4vw, 2rem);
}

.cards {
  /* Wider than the content column so a cropped poster on the right invites scrolling. */
  --slider-width: max(100%, min(1280px, 100vw - 48px));
  display: flex;
  gap: 16px;
  width: var(--slider-width);
  margin-inline: calc((100% - var(--slider-width)) / 2);
  overflow-x: auto;
  /* Room for the hover lift of the cards, otherwise the scroll container clips the effect. */
  padding-block: 12px;
  scrollbar-width: thin;
  scrollbar-color: var(--surface-active) transparent;
}

.cards > * {
  flex: 0 0 220px;
}
</style>
