<script setup lang="ts">
import CursorToggle from './CursorToggle.vue'

const appVersion = __APP_VERSION__
</script>

<template>
  <footer class="footer">
    <nav class="footer-links footer-zone footer-zone--left" aria-label="Footer">
      <a
        href="https://outlasttrialsstats.com/impressum"
        target="_blank"
        rel="noopener"
        class="footer-link"
      >
        Impressum
      </a>
      <span class="footer-sep" aria-hidden="true">·</span>
      <a
        href="https://outlasttrialsstats.com/datenschutz"
        target="_blank"
        rel="noopener"
        class="footer-link"
      >
        Datenschutzerklärung
      </a>
    </nav>
    <a
      href="https://outlasttrialsstats.com"
      target="_blank"
      rel="noopener"
      class="footer-credit footer-zone footer-zone--center"
    >
      by outlasttrialsstats.com
    </a>
    <div class="footer-zone footer-zone--right">
      <span class="footer-version">v{{ appVersion }}</span>
      <CursorToggle />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 8px 16px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-subtle);
}

.footer-zone {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 16px;
}

.footer-zone--left {
  justify-content: flex-start;
}

.footer-zone--center {
  justify-content: center;
}

.footer-zone--right {
  justify-content: flex-end;
}

.footer-sep {
  color: var(--text-faint);
  font-size: 0.75rem;
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
