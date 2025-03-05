---
title: Collections
parent: Main Navigation
nav_order: 5
---

# Collections

By default, the navigation includes only [normal pages](https://jekyllrb.com/docs/pages/).
However, you can configure Just the Docs to include also pages from [Jekyll collections](https://jekyllrb.com/docs/collections/).

{: .note }
> You store collection pages in directories that start with an underscore (`_`), e.g., `_tests`. You won't see your `tests` collection pages in the navigation if you store them in a `tests` directory![^1]

[^1]: You can optionally specify a directory to store all your collections. For example, if you specify `collections_dir: my_collections` in `_config.yml`, you should then store the pages of the `tests` collection in the `my_collections/_tests` directory.

## Example: defining custom collections
{: .text-delta }

To define a Jekyll `tests` collection named `Tests` in your main navigation, store its pages in the `_tests` directory, and add the following to `_config.yml`:

```yaml
collections:
  tests:
    output: true

just_the_docs:
  collections:
    tests:
      name: Tests
```

Together with the `name` to be used for a collection in the navigation, you can configure the following options:

* `nav_exclude: true` to exclude the entire collection from the main navigation
* `nav_fold: true` to fold the collection, instead of showing links to all its top-level pages[^2]
* `search_exclude: true` to exclude all the collection pages from search results

[^2]:
    When JavaScript is disabled in the browser, all folded collections are automatically expanded,
    since clicking expander symbols has no effect.

The main navigation for all your normal pages (if any) is displayed before those in collections. When *all* your pages are in a single collection, its name is not displayed.

## Example: multiple collections
{: .text-delta }

You can configure multiple collections. This creates categories in the main navigation with the configured names.

```yaml
collections:
  tests:
    output: true
  tutorials:
    output: true

just_the_docs:
  collections:
    tests:
      name: Tests
      search_exclude: true
    tutorials:
      name: Tutorials
      nav_fold: true
```

The navigation for each collection is a separate name space for page titles: a page in one collection cannot be the `parent` of a page in a different collection, nor of a normal page.

----
