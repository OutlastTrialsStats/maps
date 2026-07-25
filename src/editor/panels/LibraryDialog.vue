<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import Tabs from 'primevue/tabs'
import ElementsManager from './ElementsManager.vue'
import ZonesManager from './ZonesManager.vue'

const visible = defineModel<boolean>('visible', { required: true })
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Library (global)">
    <Tabs value="elements" class="tabs">
      <TabList>
        <Tab value="elements">Elements</Tab>
        <Tab value="zones">Zones</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="elements"><ElementsManager /></TabPanel>
        <TabPanel value="zones"><ZonesManager /></TabPanel>
      </TabPanels>
    </Tabs>
  </Dialog>
</template>

<style scoped>
.tabs {
  width: min(560px, 80vw);
}
</style>
