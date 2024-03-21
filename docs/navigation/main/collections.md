---
title: Collections
parent: Main Navigation
nav_order: 5
---

# Collections

Pages can also be grouped together by using Jekyll's and Just the Docs's [collections]({% link docs/configuration.md %}#document-collections) feature. In contrast to using [pages with children], pages grouped by collection are grouped by a shared header (the name of the collection) instead of a page.

The `nav_fold` configuration option works for collection-grouped pages. For more information, please refer to the [collections documentation]({% link docs/configuration.md %}#document-collections).

#### Example

The following example sets up two collections, `collection-one` and `collection-two`:

- Any document placed within `_collection-1/` will be grouped under the `Collection One` header by default. Since `nav_fold` is set to `true`, the pages will be folded by default.
- Any document placed within `_collection-2/` will be grouped under the `Collection Two` header by default. Since `nav_fold` is set to `false`, the pages will be expanded by default.

```yaml
_config.yml:
  collections:
    collection-one:
      permalink: "/:collection/:path/"
      output: true
    collection-two:
      permalink: "/:collection/:path/"
      output: true
  just_the_docs:
    collections:
      collection-one:
        name: Collection One
        nav_fold: true
      collection-two:
        name: Collection Two
        nav_fold: false
```
