---
title: Recursion
parent: Navigation Structure
---

The main navigation for your Just the Docs site is at the left side of the page on large screens, and at the top (behind a tap) on small screens. It can be structured to accommodate a multi-level menu of unlimited depth: pages can always have child pages.

By default, links to all pages appear in the main navigation at the top level, ordered alphabetically by page title. By adding fields to the YAML front matter of individual pages, you can [change their order](#ordering-pages), [exclude pages](#excluding-pages), and [display pages as children ](#pages-with-children) to any depth.

Additional navigation features include [auxiliary links](#auxiliary-links) at the top of the page, and in-page navigation with an automatically-generated [table of contents](#in-page-navigation-with-table-of-contents).

If your site has pages with the same title, you need to avoid confusion when you reference that title on other pages. For the construction of the navigation display to work (and to avoid potential confusion when browsing) your page titles need to satisfy the following requirements:

* Top-level pages cannot have the same title.
* Sibling pages (children of the same parent) cannot have the same title.
* A child cannot have the same title as its parent or any of its ancestors.

You can disambiguate references to parent titles in [several ways](#title-disambiguation). If two potential parents have the same title, but different grandparents, you can use the grandparent titles to identify the intended parent. For deeper navigation structures, you can also use the titles of more remote ancestors.



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
