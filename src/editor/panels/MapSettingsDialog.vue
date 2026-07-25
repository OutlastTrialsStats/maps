<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import Tabs from 'primevue/tabs'
import FiltersEditor from './FiltersEditor.vue'
import FloorsEditor from './FloorsEditor.vue'
import MapMetaForm from './MapMetaForm.vue'
import TrialsEditor from './TrialsEditor.vue'

const visible = defineModel<boolean>('visible', { required: true })
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Map settings">
    <Tabs value="general" class="tabs">
      <TabList>
        <Tab value="general">General</Tab>
        <Tab value="floors">Floors</Tab>
        <Tab value="filters">Filters</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="general">
          <div class="general">
            <MapMetaForm />
            <TrialsEditor />
          </div>
        </TabPanel>
        <TabPanel value="floors"><FloorsEditor /></TabPanel>
        <TabPanel value="filters"><FiltersEditor /></TabPanel>
      </TabPanels>
    </Tabs>
  </Dialog>
</template>

<style scoped>
.tabs {
  width: min(560px, 80vw);
}

.general {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
