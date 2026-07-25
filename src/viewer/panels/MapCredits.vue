<script setup lang="ts">
import { useViewerStore } from '../store/viewerStore'

const viewer = useViewerStore()
</script>

<template>
  <section v-if="viewer.credits.length > 0">
    <h2>Credits</h2>
    <ul class="credit-list">
      <li v-for="credit in viewer.credits" :key="credit.name">
        <a
          v-if="credit.profileUrl"
          :href="credit.profileUrl"
          target="_blank"
          rel="noopener"
          class="credit-link"
        >
          {{ credit.name }}
          <i class="pi pi-external-link" aria-hidden="true" />
        </a>
        <span v-else>{{ credit.name }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 8px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.credit-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--text-body);
  list-style: none;
}

.credit-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-body);
  text-decoration: none;
  transition: color 0.2s ease;
}

.credit-link:hover {
  color: var(--accent-hover);
}

.credit-link .pi {
  font-size: 0.7rem;
  color: var(--text-faint);
}
</style>
