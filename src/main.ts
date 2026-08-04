import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import '@fontsource-variable/inter'
import '@fontsource/special-elite'
import '@fontsource/courier-prime'
import '@fontsource/courier-prime/700.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import { router } from './router'
import { MurkoffPreset } from './theme/preset'
import './theme/tokens.css'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MurkoffPreset,
    options: { darkModeSelector: '.dark' },
  },
})
app.use(ToastService)
app.directive('tooltip', Tooltip)

router.isReady().then(() => app.mount('#app'))
