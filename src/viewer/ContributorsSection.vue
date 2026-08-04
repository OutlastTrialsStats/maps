<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GITHUB_REPO_URL } from '../core/constants'
import { loadContributors } from '../core/model/dataSource'
import type { Contributor, MapRegistryEntry } from '../core/model/types'
import ContributorCard from './ContributorCard.vue'

defineProps<{ maps: MapRegistryEntry[] }>()

const contributors = ref<Contributor[]>([])
const loadError = ref('')

onMounted(async () => {
  try {
    contributors.value = (await loadContributors()).contributors
  } catch (error) {
    loadError.value = `Failed to load the contributors: ${String(error)}`
  }
})
</script>

<template>
  <section class="contributors">
    <h2>Contributors</h2>
    <p v-if="loadError" class="error" role="alert">{{ loadError }}</p>
    <ul v-else class="grid">
      <ContributorCard
        v-for="contributor in contributors"
        :key="contributor.name"
        :contributor="contributor"
        :maps="maps"
      />
    </ul>
    <a :href="GITHUB_REPO_URL" target="_blank" rel="noopener" class="join-link">
      <i class="pi pi-github" aria-hidden="true" />
      Become a contributor
    </a>
  </section>
</template>

<style scoped>
.contributors {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
}

h2 {
  margin: 0 0 16px;
  font-family: var(--font-brand);
  font-size: 1.5rem;
  color: var(--text-primary);
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.grid > * {
  flex: 0 1 260px;
}

.join-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  background: var(--glass-bg);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.join-link:hover {
  color: var(--text-primary);
  background: var(--surface-active);
  border-color: var(--border-hover);
}
</style>
