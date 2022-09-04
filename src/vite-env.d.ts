/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_CONFIG_KEY: string
  readonly VITE_CONFIG_HAS_RECORD_SIGN: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}