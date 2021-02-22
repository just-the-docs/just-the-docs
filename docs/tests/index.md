---
layout: default
title: Tests
has_children: true
nav_order: 100
---

# Tests

 The main documentation pages of this theme illustrate the use of many of its features, which to some extent tests their implementation. The pages linked below provide further test cases for particular features, and may be useful for regression testing when developing new features.
 
The default configuration does not include the test pages. To include them when testing locally, use:

```
bundle exec jekyll serve --config _config.yml,_config_dev.yml,_config_test.yml
```
