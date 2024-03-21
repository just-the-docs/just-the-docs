---
title: Ordering Pages
parent: Main Navigation
nav_order: 1
---

# Ordering Pages

To specify a page order, you can use the `nav_order` parameter in your pages' YAML front matter.

#### Example

```yaml
---
title: Customization
nav_order: 4
---
```

The parameter values determine the order of the top-level pages, and of child pages with the same parent. You can reuse the same parameter values (e.g., integers starting from 1) for the child pages of different parents.

The parameter values can be numbers (integers, floats) and/or strings. When you omit `nav_order` parameters, they default to the titles of the pages, which are ordered alphabetically. Pages with numerical `nav_order` parameters always come before those with strings or default `nav_order` parameters. If you want to make the page order independent of the page titles, you can set explicit `nav_order` parameters on all pages.

By default, all Capital letters come before all lowercase letters; you can add `nav_sort: case_insensitive` in the configuration file to ignore the case.[^case-insensitive] Enclosing strings in quotation marks is optional.

----

[^case-insensitive]: *Note for users of previous versions of Just the Docs:* The option `nav_sort: case_insensitive` previously affected the ordering of numerical `nav_order` parameters: e.g., `10` came before `2`. Also, all pages with explicit `nav_order` parameters previously came before all pages with default parameters. Both were potentially confusing, and they have now been eliminated. 
