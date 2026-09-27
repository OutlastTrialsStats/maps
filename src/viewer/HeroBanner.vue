<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  stamp?: string
}>()
</script>

<template>
  <div class="hero-banner">
    <div class="banner">
      <img
        class="banner-img"
        src="/images/blackveil_medium.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchpriority="high"
      />
      <div class="banner-overlay">
        <h1 class="banner-title">{{ title }}</h1>
        <p v-if="subtitle" class="banner-subtitle">{{ subtitle }}</p>
      </div>
      <span v-if="stamp" class="banner-stamp">{{ stamp }}</span>
    </div>
  </div>
</template>

<style scoped>
.hero-banner {
  display: flex;
  justify-content: center;
}

.banner {
  position: relative;
  width: clamp(280px, min(60vw, 64vh), 600px);
  max-width: 100%;
}

.banner-img {
  display: block;
  width: 100%;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1.5rem;
}

.banner-title {
  margin: 0;
  font-family: var(--font-brand);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-primary);
  text-shadow: 1px 1px 4px var(--text-shadow-color);
}

.banner-subtitle {
  margin: 0.5rem 0 0;
  max-width: 60ch;
  font-family: var(--font-data);
  font-size: clamp(0.85rem, 2.1vw, 1.15rem);
  line-height: 1.5;
  color: var(--text-body);
  text-wrap: balance;
  text-shadow: 1px 1px 4px var(--text-shadow-color);
}

.banner-stamp {
  position: absolute;
  top: 4%;
  right: 1%;
  padding: 0.1em 0.5em;
  font-family: var(--font-brand);
  font-size: clamp(0.8rem, 1.8vw, 1.05rem);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  border: 2px solid currentColor;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 35%, transparent);
  background: color-mix(in srgb, var(--bg-page) 55%, transparent);
  transform: rotate(8deg);
  opacity: 0.9;
  pointer-events: none;
}
</style>
