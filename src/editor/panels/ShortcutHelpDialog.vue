<script setup lang="ts">
import Dialog from 'primevue/dialog'

const visible = defineModel<boolean>('visible', { required: true })

const groups: Array<{ title: string; entries: Array<{ keys: string[]; action: string }> }> = [
  {
    title: 'Tools',
    entries: [
      { keys: ['1'], action: 'Select tool' },
      { keys: ['2'], action: 'Room tool' },
      { keys: ['3'], action: 'Element tool' },
      { keys: ['4'], action: 'Route tool' },
    ],
  },
  {
    title: 'View',
    entries: [
      { keys: ['Space', 'Drag'], action: 'Pan (also middle or right mouse button)' },
      { keys: ['Wheel'], action: 'Zoom at cursor' },
      { keys: ['Shift', 'Wheel'], action: 'Pan left / right' },
      { keys: ['Alt', 'Wheel'], action: 'Pan up / down' },
      { keys: ['←↑→↓'], action: 'Pan view (empty selection; Shift: faster)' },
      { keys: ['PgUp', 'PgDn'], action: 'Floor up / down' },
      { keys: ['F'], action: 'Fit view to map' },
      { keys: ['Ctrl'], action: 'Fine grid (2.5 instead of 5 units)' },
    ],
  },
  {
    title: 'Selection',
    entries: [
      { keys: ['Shift', 'Click'], action: 'Add to / remove from selection' },
      { keys: ['←↑→↓'], action: 'Nudge selection by 1 unit (Shift: 5)' },
      { keys: ['Ctrl', 'D'], action: 'Duplicate' },
      { keys: ['Del'], action: 'Delete selection' },
      { keys: ['Esc'], action: 'Deselect / cancel drawing' },
      { keys: ['Double-click'], action: 'Edit room corner points' },
    ],
  },
  {
    title: 'Drawing (room / route)',
    entries: [
      { keys: ['Enter'], action: 'Finish drawing (also double-click)' },
      { keys: ['Tab'], action: 'Switch active drawing end' },
      { keys: ['Backspace'], action: 'Remove last point' },
      { keys: ['Alt'], action: 'Invert 90° snapping temporarily' },
      { keys: ['Alt', 'Click'], action: 'Delete corner point / wall gap' },
    ],
  },
  {
    title: 'Element tool',
    entries: [
      { keys: ['R'], action: 'Rotate by 45° (also right-click)' },
      { keys: ['Shift', 'Click'], action: 'Place and keep placing' },
    ],
  },
  {
    title: 'Clipboard & history',
    entries: [
      { keys: ['Ctrl', 'C'], action: 'Copy' },
      { keys: ['Ctrl', 'X'], action: 'Cut' },
      { keys: ['Ctrl', 'V'], action: 'Paste at cursor' },
      { keys: ['Ctrl', 'Z'], action: 'Undo' },
      { keys: ['Ctrl', 'Y'], action: 'Redo (also Ctrl+Shift+Z)' },
    ],
  },
]
</script>

<template>
  <Dialog v-model:visible="visible" header="Keyboard shortcuts" modal :style="{ width: '640px' }">
    <div class="columns">
      <section v-for="group in groups" :key="group.title" class="group">
        <h3>{{ group.title }}</h3>
        <ul>
          <li v-for="entry in group.entries" :key="entry.action">
            <span class="keys">
              <template v-for="(key, index) in entry.keys" :key="key">
                <span v-if="index > 0" class="plus">+</span>
                <kbd>{{ key }}</kbd>
              </template>
            </span>
            <span class="action">{{ entry.action }}</span>
          </li>
        </ul>
      </section>
    </div>
  </Dialog>
</template>

<style scoped>
.columns {
  columns: 2;
  column-gap: 24px;
}

.group {
  break-inside: avoid;
  margin-bottom: 16px;
}

h3 {
  margin: 0 0 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-faint);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 13px;
}

.keys {
  flex-shrink: 0;
  min-width: 96px;
  white-space: nowrap;
}

kbd {
  padding: 1px 5px;
  border: 1px solid var(--border-default);
  border-bottom-width: 2px;
  border-radius: 4px;
  background: var(--surface-panel);
  font-family: var(--font-data);
  font-size: 11px;
}

.plus {
  margin: 0 2px;
  color: var(--text-faint);
}

.action {
  color: var(--text-muted);
}
</style>
