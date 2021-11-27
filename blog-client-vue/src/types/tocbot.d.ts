interface Options {
  tocSelector: string
  contentSelector: string
  headingSelector: string
  ignoreSelector?: string
  hasInnerContainers?: boolean
  headingsOffset?: number
  scrollSmoothOffset?: number
}

declare namespace tocbot {
  function init(options: Options): void
  function destroy(): void
}
