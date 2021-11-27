interface Config {
  ignoreUnescapedHTML?: boolean
}

declare namespace hljs {
  function configure(config: Config): void
  function highlightElement(block): void
}
