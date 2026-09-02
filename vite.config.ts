import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json' with { type: 'json' }
import { seoPlugin } from './scripts/vite-plugin-seo.ts'

export default defineConfig({
  plugins: [
    vue({
      template: { compilerOptions: { isCustomElement: (tag) => tag === 'totstats-profile' } },
    }),
    seoPlugin(),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
})
