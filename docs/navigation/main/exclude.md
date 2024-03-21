---
title: Excluding Pages
parent: Main Navigation
nav_order: 2
---

# Excluding Pages

For specific pages that you do not wish to include in the main navigation (e.g., a 404 page or a landing page) set `nav_exclude: true` in the YAML front matter.

#### Example

```yaml
---
layout: default
title: 404
nav_exclude: true
---
```

The `nav_exclude` parameter does not affect the [breadcrumbs]({% link docs/navigation/parents.md %}), nor the [auto-generating list of child pages]({% link docs/navigation/children.md %}), which you can use to access pages excluded from the main navigation. 

Pages with no `title` are automatically excluded from the navigation, except when they are in collections.
