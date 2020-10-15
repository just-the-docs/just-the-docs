---
title: Exclusion
parent: Navigation
---

# Exclusion

Pages excluded from the main navigation can have parents and children. Navigation to and between excluded pages can be supported by the auto-generating list of child pages inserted at the bottom of each page, and by links to parents in the breadcrumbs at the top of each page.

The following tests cover all combinations of excluded and included pages for the top level, child pages, and grandchild pages. The last binary digit in a page title indicates whether the page is included (1) or excluded (0); preceding digits refer to its parent and grandparent.

## Included in main navigation

- [Z 1](1/)
- [Z 11](11/)
- [Z 111](111/)

## Included only in child navigation

- [Z 110](110/)
- [Z 10](10/)
- [Z 101](101/)
- [Z 100](100/)
- [Z 01](01/)
- [Z 011](011/)
- [Z 010](010/)
- [Z 00](00/)
- [Z 001](001/)
- [Z 000](000/)

## Not included in main or child navigation

- [Z 0](0/)
- [Excluded](excluded/)
- [Untitled](untitled/)
