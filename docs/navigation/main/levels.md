---
title: Page Levels
parent: Main Navigation
nav_order: 3
---

# Page Levels

Sometimes you will want to create a page with many children. First, it is recommended that you store related pages together in a directory. For example, in these docs, we keep all of the written documentation pages in the `./docs` directory, and each of the sections in subdirectories like `./docs/ui-components` and `./docs/utilities`. This gives us an organization like this:

{: .lh-0 }
```
┌─ ...
├─ (Jekyll files)
├─ docs
    ├─ configuration.md
    ├─ ui-components
        ├─ index.md (parent page)
        ├─ buttons.md
        ├─ callouts.md
        ├─ code
            ├─ index.md (parent page)
            └─ line-numbers.md
        ├─ labels.md
        ├─ tables.md
        └─ typography.md
    ├─ ...
    └─ MIGRATION.md
├─ index.md (home page)
├─ (Jekyll files)
└─ ...
```

## Example: page with no parents
{: .text-delta }

```yaml
---
title: UI Components
nav_order: 3
---
```

Here we're setting up the UI Components landing page that is available at URL `/docs/ui-components`, which is ordered second in the main navigation.

The navigation links for all pages with children come with an expander. When you click the expander, the display of the children is toggled, so you can expand or collapse all the children displays, regardless of which page is currently active.

## Child Pages

On child pages, simply set the `parent` front matter to the parent page's `title`, and set a navigation order (relative to pages having the same parent).

### Example: creating a child page
{: .text-delta }

```yaml
---
title: Buttons
parent: UI Components
nav_order: 2
---
```

The Buttons page appears as a child of UI Components and appears second in the UI Components pages.

{: .new-title }
> New (v0.10.0)
>
> The `has_children` field is now redundant (and ignored, except when significant for backwards compatibility).

## Multi-level Child Pages

Child pages can themselves have children, to any number of levels.

### Example: pages with (recursive) children
{: .text-delta }

```yaml
---
title: Main Navigation
parent: Navigation
nav_order: 1
---
```

```yaml
---
title: Ancestry
parent: Main Navigation
nav_order: 4
---
```

```yaml
---
title: X
parent: Ancestry
---
```

```yaml
---
title: Y
parent: Ancestry
---
```

This creates the following navigation structure:

{: .lh-0 }
```
┌─ ...
├─ ...
├─ Navigation
    ├─ ...
    ├─ Main Navigation
        ├─ ...
        ├─ Ancestry
            ├─ X
            └─ Y
        ├─ ...
        └─ ...
    ├─ ...
    └─ ...
├─ ...
└─ ...
```
