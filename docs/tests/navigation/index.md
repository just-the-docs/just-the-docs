---
layout: default
title: Navigation
parent: Tests
---

# Navigation

## Parent page disambiguation

- [Page A](grandparent/a/) has a child [page with title C](grandparent/ca/), and a grandchild [page with title D](grandparent/dca/).
- [Page B](grandparent/b/) has a child [page with title C](grandparent/cb/), and a grandchild [page with title D](grandparent/dcb/).
- The grandchild pages specify their parent and grandparent pages, so there is no ambiguity.

## Page exclusion

- An [untitled page](exclude/untitled/) is excluded from the navigation.
- An excluded [top level page](exclude/excluded/), [child page](exclude/excluded-child/), or [grandchild page](exclude/excluded-grandchild/) does not appear.
- A non-excluded [top level page](exclude/non-excluded/) appears; and a non-excluded [child page](exclude/non-excluded-child/) or [grandchild page](exclude/non-excluded-grandchild/) appears if its parent appears.
- A non-excluded child page or grandchild page does not appear if its parent is excluded.

## Page order

- [Default](order/default/), using `title` instead of `nav_order` fields.
- [Strings](order/strings/), lexicographically ordered, possibly case-insensitively.
- [Integers](order/integers/), numerically ordered.
- [Floats](order/floats/), numerically ordered.
- [Mixture](order/mixture/), with numbers before strings.
