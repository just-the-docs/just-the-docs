---
title: Main Navigation
parent: Navigation
nav_order: 1
---

# Main Navigation

The main navigation for your Just the Docs site is at the left side of the page on large screens, and at the top (behind a tap) on small screens.

You need to specify the `title` of each page in its front matter. Page titles are independent of file names and directory structure. The navigation uses the title of the page as an anchor for links to the page.

By default, links to all pages appear in the main navigation at the top level, ordered alphabetically by their titles. By adding further fields to the front matter of individual pages, you can [change their order]({% link docs/navigation/main/order.md %}), [exclude pages]({% link docs/navigation/main/exclude.md %}), and change their [parent pages]({% link docs/navigation/main/levels.md %}).

{: .new-title }
> New (v0.10.0)
>
> The main navigation can be structured as a multi-level menu of unlimited depth:
> pages can always have child pages.

For the construction of the navigation display to work (and to avoid potential confusion when browsing) ***the page titles on your site need to satisfy the following requirements:***

* Top-level pages must have different titles.
* Pages with the same parent must have different titles.
* The title of each page must be different from the titles of all its child pages, and from the titles of their child pages, etc.

{: .new-title }
> New (v0.10.0)
>
> If *all* the pages of your site have different titles, you need only to specify the `title` of each page, and the `parent` title of each lower-level page.[^1]

[^1]: Previous versions of Just the Docs restricted the navigation to three levels. You also needed to specify `has_children: true` on all parent pages, and a `grand_parent` title on all grandchild pages. The `has_children` parameter is now redundant, and the `grand_parent` parameter can usually be omitted.

If your site has pages with the same title, you need to avoid confusion when you reference that title as `parent` on other pages. When the pages with the same title have different `parent` pages, you can distinguish between them using the `grand_parent` parameter.

{: .new-title }
> New (v0.10.0)
>
> For deeper navigation structures, you can specify the title of a grandparent or higher level page as an `ancestor` title.

----
