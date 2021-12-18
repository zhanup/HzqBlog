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
