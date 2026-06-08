---
title: In-Page Navigation
parent: Navigation
nav_order: 5
sidebar_toc: true
---

# In-Page Navigation
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

To support in-page navigation, you can generate a *Table of Contents* (TOC) with links to headings, like the one shown above, as well as a link to the top of the page.

## Sidebar Table of Contents

If you want the page's Table of Contents to appear in the **left navigation sidebar** (instead of only in the page content),
enable the `sidebar_toc` option. This will clone the generated `#markdown-toc` list into the sidebar.

To enable site-wide, add to `_config.yml`:

```yml
sidebar_toc: true
```

To enable on a single page, add to the page front matter:

```yml
sidebar_toc: true
```

To hide the in-page TOC after cloning it into the sidebar:

```yml
sidebar_toc_hide: true
```

If you have multiple TOCs and want to ensure we use a specific one, wrap it:

```markdown
<div class="js-page-toc" markdown="block">
1. TOC
{:toc}
</div>
```

## Generating Table of Contents

To generate a *Table of Contents* in a page, you use Kramdown's `{:toc}` method, immediately after the start of a list. This will automatically generate a list of anchor links to various sections of the page, based on headings and heading levels.

{: .note }
`{:toc}` can be used only once on each page.

You **must** have a list immediately preceding the table of contents. The type of list determines the style of your table of contents.

For an *ordered* table of contents, use the following markdown code:

```md
1. TOC
{:toc}
```

The `{:toc}` line *must* follow the `1. TOC` line, which begins a list.

For an *unordered* table of contents, instead use the following markdown code:

```
- TOC
{:toc}
```

## Omitting Heading from Table of Contents

If you want to omit a particular heading from the TOC, follow it immediately by `{: .no_toc }` (possibly together with other CSS class names).

```markdown
# In-Page Navigation
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}
```

This example omits the top-level heading (`In-Page Navigation`) from the TOC, as well as the heading for the *Table of Contents* itself.

## Collapsible Table of Contents (with `<details>` and `<summary>`)

You can make the Table of Contents collapsible using the `<details>` and `<summary>` elements, as in the following example.

```markdown
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
```

The attribute `open` (which expands the Table of Contents by default) and the styling (here with `text-delta`) are optional.

## Back to Top {#back-to-top-doc}

{: .warning }
The default id for a section with heading "Back to Top" is `"back-to-top"`.
To avoid invalid HTML, sites that set the `back_to_top` configuration variable
should override the default id for such sections. The Markdown source file for
the current page uses `## Back to Top {#back-to-top-doc}`.

You can add a link from the bottom of each page to its top. You do this by including the `back_to_top` configuration option in your site's `_config.yml` file, together with `back_to_top_text` for the anchor link.

### Example
{: .no_toc }

```yaml
back_to_top: true
back_to_top_text: "Back to top"
```

{: .warning }
Back-to-top links currently appear only when *other* configuration options require footer generation!
