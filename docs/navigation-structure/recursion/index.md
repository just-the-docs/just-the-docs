---
title: Recursion
parent: Navigation Structure
---
# Recursion

When different pages with children have the same title, references to parents have to be disambiguated by adding `grand_parent` or `ancestor` fields. 

The navigation hierarchy provided by Just the Docs was originally limited to three levels, and disambiguation using `grand_parent` was sufficient.
The following pages test disambiguation using `ancestor` fields. 

Some descendants of both [Page X](x/) and [Page Y](y/) have the same title, so references to those descendants as `parent` always require disambiguation.

- [X](x/) is a second-level page
- [S](xs/) is the only child of [X](x/). The reference to [X](x/) is unambiguous.
- [T](xt/) is the only child of [S](xs/). Its `parent` is disambiguated by its `grand_parent`.
- [U](xu/) is the only child of [T](xt/). Its `parent` is disambiguated by its `ancestor`.
- [Y](y/) is a sibling of [X](x/).
- [S](ys/) is the only child of [Y](y/). The reference to [Y](y/) is unambiguous.
- [T](yt/) is the only child of [S](ys/). Its `parent` is disambiguated by its `ancestor`
- [U](yu/) is the only child of [T](yt/). Its `parent` is disambiguated by its `ancestor`.
