import type { DefineComponent } from 'vue'

declare module 'vue' {
  interface GlobalComponents {
    'totstats-profile': DefineComponent<{ profileId: string; size?: number }>
  }
}
