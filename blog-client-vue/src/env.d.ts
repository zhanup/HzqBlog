/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'macy'

interface ImportMetaEnv {
  readonly VITE_LOCAL_URL: string
  readonly VITE_AXIOS_BASE_URL: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
