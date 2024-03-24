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
> New (Multi-level)
>
> The main navigation can be structured as a multi-level menu of unlimited depth:
> pages can always have child pages.

For the construction of the navigation display to work (and to avoid potential confusion when browsing) the page titles on your site need to satisfy the following requirements:

* Top-level pages cannot have the same title.
* Sibling pages (children of the same parent) cannot have the same title.
* A child cannot have the same title as its parent or any of its ancestors.

{: .new-title }
> New (Multi-level)
>
> If all the pages of your site have different titles, you only need to specify the `title` of each page, and the `parent` title of each lower-level page.[^1]

[^1]: Previous versions of Just the Docs restricted the navigation to three levels. You also needed to specify `has_children: true` on all parent pages, and a `grand_parent` title on all grandchild pages.

If your site has pages with the same title, you need to avoid confusion when you reference that title as `parent` on other pages. When two potential parents have the same title, but different grandparents, you can identify the intended parent using the `grand_parent` title. 

{: .new-title }
> New (Multi-level)
>
> For deeper navigation structures, you can specify the title of a grandparent or higher level page as an `ancestor` title.

----
