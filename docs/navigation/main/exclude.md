---
title: Excluding Pages
parent: Main Navigation
nav_order: 2
---

# Excluding Pages

For specific pages that you do not wish to include in the main navigation (e.g., a 404 page or a landing page) set `nav_exclude: true` in their front matter.

## Example: using `nav_exclude`
{: .text-delta }

```yaml
---
layout: default
title: 404
nav_exclude: true
permalink: /404
---
```

The `nav_exclude` parameter does not affect the [breadcrumbs]({% link docs/navigation/parents.md %}), nor the [lists of child pages]({% link docs/navigation/children.md %}), which you can use to access pages excluded from the main navigation.

Pages with no `title` are automatically excluded from the main navigation, except when they are in collections (where Jekyll provides default titles based on file names).

Child pages are automatically excluded from the main navigation when their parent page is excluded.

{: .warning }
It is currently possible to exclude all the child pages of a page from the main navigation by setting `has_children: false` in its front matter. However, the `has_children` parameter may be ignored altogether in a future release, so it is better to use the `nav_exclude` parameter on each child page.
