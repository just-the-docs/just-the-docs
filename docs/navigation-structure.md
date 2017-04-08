---
layout: default
title: Navigation Structure
nav_order: 4
---

# Navigation Structure
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Main navigation

The main navigation for your Just the Docs site is on the left side of the page at large screens and on the top (behind a tap) on small screens. The main navigation can be structured to accommodate a multi-level menu system (parent pages with children).

### Top level pages

By default, all pages will appear as top level pages in the main nav.

### Ordering pages

To specify a page order, use the `nav_order` variable in your pages' YAML front matter.

```yaml
---
layout: default
title: Customization
nav_order: 4
---
```

### Pages with children

Sometimes you will want to create a page with many children (a section). To accomplish this you need to a few things. First, it is recommended that you keep pages that are related in a directory together... For example, in these docs, we keep all of the written documentation in the `./docs` directory and each of the sections in subdirectories like `./docs/ui-components` and `./docs/utilities`. This gives is an organization like:

```
+-- ..
|-- (Jekyll files)
|
|-- docs
|   |-- ui-components
|   |   |-- ui-components.md  (parent page)
|   |   |-- buttons.md
|   |   |-- code.md
|   |   |-- labels.md
|   |   |-- tables.md
|   |   +-- typography.md
|   |
|   |-- utilities
|   |   |-- utilities.md (parent page)
|   |   |-- color.md
|   |   |-- layout.md
|   |   |-- responsive-modifiers.md
|   |   +-- typography.md
|   |
|   |-- (other md files, pages with no children)
|   +-- ..
|
|-- (Jekyll files)
+-- ..
```

On the parent pages, add 3 YAML front matter variables:
-  `has_children: true` (tells us that this a parent page)
-  `parent: ` set this to the title of the parent page (in this case, it's this page's title)
-  `permalink: ` set this to the directory that the contains the pages

#### Example
{: .no_toc }

```yaml
layout: default
title: UI Components
nav_order: 2
has_children: true
parent: UI Components
permalink: /ui-components
```

Here we're setting up the UI Components landing page that is available at `/ui-components`, has children and is ordered second in the main nav.

### Child pages

On child pages, simply set the `parent:` YAML front matter to whatever the parent's page title is and set a nav order (this number is now scoped within the section).

#### Example
{: .no_toc }
```yaml
layout: default
title: Buttons
parent: UI Components
nav_order: 2
```

The Buttons page appears a child of UI Components and appears second in the UI Components section.

---

## Breadcrumbs

Breadcrumbs are auto generated based on the parent/child structure and the directory structure for the site. In order for breadcrumbs to work correctly for pages children, the URL structure must be the slugified version of the parent page's title. For example, the page UI Components, must use the `/ui-components` directory to house its descendant pages.

---

## In-page navigation with Table of Contents

To generate a Table of Contents on your docs pages, you can use the `{:toc}` method from Kramdown, immediately after an `<ol>` in markdown. This will automatically generate an ordered list of anchor links to various sections of page based on headings and heading levels. There may be occasions where you're using a heading and you don't want it to show up in the TOC, to skip a particular heading use the `{: .no_toc }` CSS class.

#### Example
{: .no_toc }

```markdown
# Navigation Structure
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
```

This example skips the page name heading (`#`) from the TOC, as well as the heading for the Table of Contents itself (`##`) because it is redundant, followed by the table of contents itself.
