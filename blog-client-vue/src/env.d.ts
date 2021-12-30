/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'macy'

declare namespace hljs {
  interface Config {
    ignoreUnescapedHTML?: boolean
  }
  function configure(config: Config): void
  function highlightElement(block): void
}

declare namespace tocbot {
  interface Options {
    tocSelector: string
    contentSelector: string
    headingSelector: string
    ignoreSelector?: string
    hasInnerContainers?: boolean
    headingsOffset?: number
    scrollSmoothOffset?: number
  }
  function init(options: Options): void
  function destroy(): void
}

interface ImportMetaEnv {
  readonly VITE_LOCAL_URL: string
  readonly VITE_AXIOS_BASE_URL: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
