declare namespace hljs {
  interface Config {
    ignoreUnescapedHTML?: boolean
  }
  function configure(config: Config): void
  function highlightElement(block): void
}
