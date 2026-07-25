<script setup lang="ts">
import CursorToggle from './CursorToggle.vue'

const appVersion = __APP_VERSION__
</script>

<template>
  <footer class="footer">
    <nav class="footer-links" aria-label="Footer">
      <a
        href="https://outlasttrialsstats.com/impressum"
        target="_blank"
        rel="noopener"
        class="footer-link"
      >
        Impressum
      </a>
      <a
        href="https://outlasttrialsstats.com/datenschutz"
        target="_blank"
        rel="noopener"
        class="footer-link"
      >
        Datenschutzerklärung
      </a>
    </nav>
    <a href="https://outlasttrialsstats.com" target="_blank" rel="noopener" class="footer-credit">
      by outlasttrialsstats.com
    </a>
    <span class="footer-version">v{{ appVersion }}</span>
    <CursorToggle />
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid var(--border-subtle);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 24px;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--accent-hover);
}

.footer-credit {
  font-size: 0.8rem;
  color: var(--text-faint);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-credit:hover {
  color: var(--accent-hover);
}

.footer-version {
  font-size: 0.75rem;
  color: var(--text-faint);
}
</style>
