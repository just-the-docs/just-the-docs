---
title: Layout
layout: default
nav_order: 4.5
has_children: true
---

# Layout

You specify the layout for a page in its [front matter]. Just the Docs has a `default` layout with a sidebar, used for almost all pages in the theme docs, and a `minimal` layout that omits the sidebar.
{: .fs-6 .fw-300 }

## The layout concept

See the [Jekyll docs page about layouts] for an explanation of the general idea of layouts and how to specify them.

You can use [Jekyll's front matter defaults] to specify the same layout for many pages.

## The `default` layout

This page uses the default layout.

It is a *responsive* layout: on medium and larger width displays, it displays a sidebar, including a navigation panel; on smaller width displays, the sidebar is automatically hidden under a button.

Each child (and grandchild) page of a top-level page has so-called *breadcrumbs*: links to its parent (and grandparent) pages. It shows the breadcrumbs above the main content of the page.

Each page that has child pages generally has a list of links to those pages (you can suppress it by `has_toc: false` in the front matter). It shows the list as a *table of contents* below the main content.

## The `minimal` layout

A child and grandchild page of this page use the minimal layout. This differs from the default layout by omitting the sidebar---and thereby also the navigation panel. To navigate between pages with the minimal layout, you can use the breadcrumbs and the tables of contents.

## Selectively hiding or showing the sidebar

[Jekyll's front matter defaults] can be used to apply the `minimal` layout for many pages. But there are also other variables that can control the page layout. In `_config.yml`, you can set `nav_enabled: false` to disable the sidebar navigation panel across the entire site. This can then be selectively enabled on a page-by-page basis by assigning the `nav_enabled: true` page [front matter] variable. For instance, this could be used to enable sidebar navigation on a home page while all other pages have sidebar navigation disabled.

```yaml
---
layout: default
title: Home
nav_enabled: true
---

```

## Other layouts

Just the Docs has further layouts: `about`, `home`, `page`, and `post`. Currently, they are all based on the `default` layout. See the [Jekyll docs about inheritance] for how to customize them.

[front matter]: https://jekyllrb.com/docs/front-matter/ "Jekyll docs about front matter"
[Jekyll docs page about layouts]: https://jekyllrb.com/docs/layouts/ "Jekyll docs about layouts"
[Jekyll's front matter defaults]: https://jekyllrb.com/docs/configuration/front-matter-defaults/ "Jekyll docs about front matter defaults"
[Jekyll docs about inheritance]: https://jekyllrb.com/docs/layouts/#inheritance "Jekyll docs about inheritance"
