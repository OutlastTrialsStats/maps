import { createRouter, createWebHistory } from 'vue-router'
import MapOverview from './viewer/MapOverview.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'overview', component: MapOverview },
    { path: '/maps/:mapId', name: 'viewer', component: () => import('./viewer/MapViewer.vue') },
    { path: '/editor', name: 'editor', component: () => import('./editor/EditorShell.vue') },
  ],
})
