# Test Fixtures

These files are used by Just the Docs maintainers to test *the theme itself*. **If you are using Just the Docs as a theme, you should not copy these files over.**

N.B. If a PR adds a new Jekyll plugin, it needs to be added not only in the main `Gemfile`, but also in `fixtures/Gemfile-*`, to avoid (multiple) CI failures. However, plugins already loaded by the `github-pages` gem should not be added to `fixtures/Gemfile-github-pages`.
