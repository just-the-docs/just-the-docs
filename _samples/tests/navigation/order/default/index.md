---
layout: default
title: Default
parent: Tests for order
nav_order: 1
has_children: true
---

# Default Order

When `nav_order` fields are omitted, the pages are ordered alphabetically by their titles.

By default, all Capital letters come before all lowercase letters; you can add `nav_sort: case_insensitive` in the configuration file to ignore the case).

Digits precede letters, and numeric titles are ordered lexicographically: `10` precedes `2` (in contrast to explicit numeric `nav_order` values).
