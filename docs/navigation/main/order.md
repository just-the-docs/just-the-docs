---
title: Ordering Pages
parent: Main Navigation
nav_order: 1
---

# Ordering Pages

To specify a page order, you can use the `nav_order` parameter in the front matter of the pages.

## Example: using `nav_order`
{: .text-delta }

```yaml
---
title: Customization
nav_order: 6
---
```

The parameter values determine the order of the top-level pages, and of child pages with the same parent. You can reuse the same parameter values (e.g., integers starting from 1) for the child pages of different parents.

The parameter values can be numbers (integers, floats[^floats]) and/or strings. When you omit `nav_order` parameters, they default to the titles of the pages, which are ordered alphabetically. Pages with numerical `nav_order` parameters always come before those with strings or default `nav_order` parameters. If you want to make the page order independent of the page titles, you can set explicit `nav_order` parameters on all pages.

{: .warning }
The order of pages with equal `nav_order` parameters is unstable: it may change with each build.

By default, all Capital letters come before all lowercase letters; you can add `nav_sort: case_insensitive` in the configuration file to ignore the case.[^case-insensitive]

Enclosing strings in quotation marks in front matter is optional, unless they contain "`[`", "`]`", "`{`", "`}`", "`,`", "`: `", or "` #`". Boolean, integer, and float values are treated as strings when enclosed in quotation marks.

----

[^floats]: Jekyll treats each integer *N* as equal to the corresponding float *N.0*.

[^case-insensitive]: *Note for users of previous versions of Just the Docs:* The option `nav_sort: case_insensitive` previously affected the ordering of numerical `nav_order` parameters: e.g., `10` came before `2`. Also, all pages with explicit `nav_order` parameters previously came before all pages with default parameters. Both were potentially confusing, and they have now been eliminated.
