---
title: Recursion
parent: Navigation Structure
---
# Recursion

When different pages with children have the same title, references to parents have to be disambiguated by adding `grand_parent` or `ancestor` fields. 

The navigation hierarchy provided by Just the Docs was originally limited to three levels, and disambiguation using `grand_parent` was sufficient.
The following pages test disambiguation using `ancestor` fields. 

Some descendants of both [Page X](X/) and [Page Y](Y/) have the same title, so references to those descendants as `parent` always require disambiguation.

- [X](X/) is a second-level page
- [S](XS/) is the only child of [X](X/). The reference to [X](X/) is unambiguous.
- [T](XT/) is the only child of [S](XS/). Its `parent` is disambiguated by its `grand_parent`.
- [U](XU/) is the only child of [T](XT/). Its `parent` is disambiguated by its `ancestor`.
- [Y](Y/) is a sibling of [X](X/).
- [S](YS/) is the only child of [Y](Y/). The reference to [Y](Y/) is unambiguous.
- [T](YT/) is the only child of [S](YS/). Its `parent` is disambiguated by its `ancestor`
- [U](YU/) is the only child of [T](YT/). Its `parent` is disambiguated by its `ancestor`.
