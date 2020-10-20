---
title: Separation
parent: Navigation
---

# Separation

The following tests check that `ancestor` titles cannot match a prefix or suffix of a potential ancestor page title.

- [`First Last`](first-last/)
  - [`First`](first/)
    - [`First Child`](first-child/)
      - [`First Grandchild`](first-grandchild/) should not appear in the navigation, because its `parent` and `ancestor` fields are inconsistent:
        ```yaml
        parent: First Child
        ancestor: Last
        ```
  - [`Last`](last/)
    - [`Last Child`](last-child/)
      - [`Last Grandchild`](last-grandchild/) should not appear in the navigation, because its `parent` and `ancestor` fields are inconsistent:
        ```yaml
        parent: Last Child
        ancestor: First
        ```

[`First^Last`](first-last-with-caret/) is an obsolete test. Changing the `parent` fields of [`First`](first/) and [`Last`](last/) to `First^Last` showed that when a special character such as `^` was used as a title separator in the implementation of ancestor-checks, that character would need to be avoided in titles. The implementation now uses a newline as a title separator.
