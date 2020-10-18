---
layout: default
title: Navigation
parent: Tests Home
---

# Navigation

## Parent page disambiguation

- [Page A](grandparent/a.html) has a child [page with title C](grandparent/ca.html), and a grandchild [page with title D](grandparent/dca.html).
- [Page B](grandparent/b.html) has a child [page with title C](grandparent/cb.html), and a grandchild [page with title D](grandparent/dcb.html).
- The grandchild pages specify their parent and grandparent pages, so there is no ambiguity.

## Page exclusion

- An [untitled page](exclude/untitled.html) is excluded from the navigation.
- An excluded [top level page](exclude/excluded.html), [child page](exclude/excluded-child.html), or [grandchild page](exclude/excluded-grandchild.html) does not appear.
- A non-excluded [top level page](exclude/non-excluded.html) appears; and a non-excluded [child page](exclude/non-excluded-child.html) or [grandchild page](exclude/non-excluded-grandchild.html) appears if its parent appears.
- A non-excluded child page or grandchild page does not appear if its parent is excluded.

## Page order

- [Default](order/default), using `title` instead of `nav_order` fields.
- [Strings](order/strings), lexicographically ordered, possibly case-insensitively.
- [Integers](order/integers), numerically ordered.
- [Floats](order/floats), numerically ordered.
- [Mixture](order/mixture), with numbers before strings.
