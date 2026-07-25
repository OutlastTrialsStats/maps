<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useHorizontalWheelScroll } from '../core/interaction/useHorizontalWheelScroll'
import { loadMapsIndex } from '../core/model/dataSource'
import type { MapRegistryEntry } from '../core/model/types'
import ContributorsSection from './ContributorsSection.vue'
import HeroBanner from './HeroBanner.vue'
import MapCard from './MapCard.vue'
import SiteFooter from './SiteFooter.vue'

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
    <div class="backdrop" aria-hidden="true">
      <img
        class="backdrop-img"
        src="/images/bgd_home.webp"
        alt=""
        loading="eager"
        fetchpriority="high"
      />
      <div class="backdrop-overlay" />
    </div>
    <RouterLink to="/editor" class="editor-link">
      <i class="pi pi-pencil" />
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

.backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.backdrop-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.backdrop-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(13, 14, 18, 0.2) 0%,
    rgba(13, 14, 18, 0.6) 40%,
    var(--bg-page) 75%
  );
}

.editor-link {
  position: absolute;
  top: 20px;
  right: 24px;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
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

.overview {
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px;
}

.hero {
  padding: clamp(2rem, 8vw, 5rem) 0 clamp(2rem, 6vw, 3.5rem);
}

.error {
  color: var(--danger);
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
