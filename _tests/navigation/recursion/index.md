---
title: Recursion
parent: Navigation
---
# Recursion

When different pages with children have the same title, references to parents have to be disambiguated by adding `grand_parent`, `ancestor` and/or `section` fields. 

The navigation hierarchy provided by Just the Docs was originally limited to three levels, and disambiguation using `grand_parent` was sufficient. It can be tested in a [3-level hierarchy](../disambiguation). 

The following pages test disambiguation using `ancestor` and/or `section` fields. 

Some of the descendants of both [Page X](x/) and [Page Y](y/) have the same titles, so references to those descendants as `parent` always require disambiguation.

- [X](x/) is the top page of a section with `section_id: x`. Section names can be strings or numbers, and are independent of titles of pages or file names.
- [S](xs/) is the only child of [X](x/). The reference to [X](x/) is unambiguous.
- [T](xt/) is the only child of [S](xs/). Its `parent` is disambiguated by its `section`
- [U](xu/) is the only child of [T](xt/). Its `parent` is disambiguated by either its `section` or its `ancestor`.

- [Y](y/) does not have a section name.
- [S](ys/) is the only child of [Y](y/). The reference to [Y](y/) is unambiguous.
- [T](yt/) is the only child of [S](ys/). Its `parent` is disambiguated by its `ancestor`
- [U](yu/) is the only child of [T](yt/). Its `parent` is disambiguated by its `ancestor`.

## Notes

The [notes](./about) explain the background and implementation of the current proposal for recursive navigation.
