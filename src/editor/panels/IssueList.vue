<script setup lang="ts">
import type { ValidationIssue } from '../../core/model/validation'

defineProps<{ issues: ValidationIssue[] }>()
</script>

<template>
  <ul class="issue-list">
    <li v-for="(issue, index) in issues" :key="index">
      <code v-if="issue.path">{{ issue.path }}</code>
      {{ issue.message }}
    </li>
  </ul>
</template>

<style scoped>
.issue-list {
  max-height: 260px;
  overflow-y: auto;
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
}

.issue-list code {
  color: var(--warning);
}
</style>
