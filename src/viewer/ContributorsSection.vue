<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
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
  <section class="community">
    <div class="block">
      <h2 class="panel-heading">Contributors</h2>
      <p v-if="loadError" class="error" role="alert">{{ loadError }}</p>
      <ul v-else class="contributor-row">
        <ContributorCard
          v-for="contributor in contributors"
          :key="contributor.name"
          :contributor="contributor"
          :maps="maps"
        />
      </ul>
    </div>
    <div class="block block-invite">
      <h2 class="panel-heading">Add a map</h2>
      <p class="invite">
        Draw a map in the editor and send it in as a pull request. Every contributor gets the
        <strong>Map Contributor</strong> badge on outlasttrialsstats.com.
      </p>
      <div class="actions">
        <RouterLink to="/editor" class="action action-primary">Open the map editor</RouterLink>
        <a :href="GITHUB_REPO_URL" target="_blank" rel="noopener" class="action">
          <i class="pi pi-github" aria-hidden="true" />
          How to contribute
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.community {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
  gap: 20px 40px;
  margin-top: 16px;
}

.block {
  min-width: 0;
}

.block-invite {
  padding-left: 40px;
  border-left: 1px solid var(--border-default);
}

.contributor-row {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0 0 8px;
  overflow-x: auto;
  list-style: none;
  scrollbar-width: thin;
  scrollbar-color: var(--surface-active) transparent;
}

.invite {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-body);
}

.invite strong {
  font-weight: 600;
  color: var(--text-primary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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

.action:hover {
  color: var(--text-primary);
  background: var(--surface-active);
  border-color: var(--border-hover);
}

.action-primary {
  font-weight: 600;
  color: var(--text-primary);
  background: color-mix(in srgb, var(--accent) 22%, var(--glass-bg));
  border-color: color-mix(in srgb, var(--accent) 55%, transparent);
}

.action-primary:hover {
  background: color-mix(in srgb, var(--accent) 34%, var(--glass-bg));
  border-color: var(--accent-hover);
}

@media (max-width: 720px) {
  .community {
    grid-template-columns: minmax(0, 1fr);
  }

  .block-invite {
    padding-left: 0;
    border-left: none;
  }
}
</style>
