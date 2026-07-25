<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
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
  width: clamp(280px, 60vw, 600px);
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
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-primary);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
}

.banner-subtitle {
  margin: 0.35rem 0 0;
  max-width: 60ch;
  font-size: clamp(0.7rem, 1.8vw, 0.95rem);
  line-height: 1.5;
  color: var(--text-body);
  text-wrap: balance;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
}
</style>
