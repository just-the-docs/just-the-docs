---
layout: default
title: Utilities
nav_order: 3
---

# Utilities
{:.no_toc}

CSS utility classes come in handy when you to want to override default styles to give create additional whitespace (margins/padding), unexpected shifts in font-size or weight, add color, or to hide (or show) something a specific screen size.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Responsive modifiers

Just the Docs spacing works in conjunction with a variety of modifiers that allow you to target specific screen sizes responsively. Use these in conjunction with spacing and display prexix and suffix classes. For example `prefix-modifier-suffix`

| Modifier  | Screen size   |
|:----------|:-------------------------------------|
| (none)    | All screens until the next modifier  |
| `xs`      | 320px (20rem) and up                 |
| `sm`      | 500px (31.25rem) and up              |
| `md`      | 740px (46.25rem) and up              |
| `lg`      | 1120px (70rem) and up                |
| `xl`      | 1400px (87.5rem) and up              |

## Layout Utilities

### Spacing

These spacers are available to use for margins and padding with responsive utility classes. Combine these prefixes with a screen size and spacing scale to use them responsively.

| Classname prefix | What it does                  |
|:-----------------|:------------------------------|
| `.m-`            | `margin`                      |
| `.mx-`           | `margin-left`, `margin-right` |
| `.my-`           | `margin top`, `margin bottom` |
| `.mt-`           | `margin-top`                  |
| `.mr-`           | `margin-right`                |
| `.mb-`           | `margin-bottom`               |
| `.ml-`           | `margin-left`                 |

| Classname prefix | What it does                    |
|:-----------------|:--------------------------------|
| `.p-`            | `padding`                       |
| `.px-`           | `padding-left`, `padding-right` |
| `.py-`           | `padding top`, `padding bottom` |
| `.pt-`           | `padding-top`                   |
| `.pr-`           | `padding-right`                 |
| `.pb-`           | `padding-bottom`                |
| `.pl-`           | `padding-left`                  |

Spacing values are based on a `1rem = 16px` spacing scale, broken down into these units:

| Spacer/suffix  | Size in rems  | Rem converted to px |
|:---------------|:--------------|:--------------------|
| `1`            | 0.25rem       | 4px                 |
| `2`            | 0.5rem        | 8px                 |
| `3`            | 0.75rem       | 12px                |
| `4`            | 1rem          | 16px                |
| `5`            | 1.5rem        | 24px                |
| `6`            | 2rem          | 32px                |
| `7`            | 2.5rem        | 40px                |
| `8`            | 3rem          | 48px                |

#### Examples
{: .no_toc }

```markdown
In Markdown, use the `{: }` wrapper to apply custom classes:

This paragraph will have a margin bottom of 1rem/16px at large screens.
{: .mb-lg-4 }

This paragraph will have 2rem/32px of padding on the right and left at all screen sizes.
{: .px-6 }

```

### Display

Display classes aid in adapting the layout of the elements on a page:

| Class             |                         |
|:------------------|:------------------------|
| `.d-block`        | `display: block`        |
| `.d-flex`         | `display: flex`         |
| `.d-inline`       | `display: inline`       |
| `.d-inline-block` | `display: inline-block` |
| `.d-none`         | `display: none`         |

Use these classes in conjunction with the responsive modifiers.

#### Examples
{: .no_toc }

```markdown
In Markdown, use the `{: }` wrapper to apply custom classes:

This button will be hidden until medium screen sizes:

[ A button ](#url)
{: .d-none .d-md-inline-block }

These headings will be `inline-block`:

### heading 3
{ .d-inline-block }

### heading 3
{ .d-inline-block }

```

---
## Typography

### Font size

Use the `.fs-1` - `.fs-10` to set an explicit font-size.

| Class   | Small screen size `font-size`  | Large screen size `font-size` |
|:--------|:-------------------------------|:------------------------------|
| `.fs-1` | 9px                            | 10px                          |
| `.fs-2` | 11px                           | 12px                          |
| `.fs-3` | 12px                           | 14px                          |
| `.fs-4` | 14px                           | 16px                          |
| `.fs-5` | 16px                           | 18px                          |
| `.fs-6` | 18px                           | 24px                          |
| `.fs-7` | 24px                           | 32px                          |
| `.fs-8` | 32px                           | 38px                          |
| `.fs-9` | 38px                           | 42px                          |
| `.fs-10`| 42px                           | 48px                          |

<div class="code-example" markdown="1">
Font size 1
{: .fs-1 }
Font size 2
{: .fs-2 }
Font size 3
{: .fs-3 }
Font size 4
{: .fs-4 }
Font size 5
{: .fs-5 }
Font size 6
{: .fs-6 }
Font size 7
{: .fs-7 }
Font size 8
{: .fs-8 }
Font size 9
{: .fs-9 }
Font size 10
{: .fs-10 }
</div>
```markdown
In Markdown, use the `{: }` wrapper to apply custom classes:

Font size 1
{: .fs-1 }
Font size 2
{: .fs-2 }
Font size 3
{: .fs-3 }
Font size 4
{: .fs-4 }
Font size 5
{: .fs-5 }
Font size 6
{: .fs-6 }
Font size 7
{: .fs-7 }
Font size 8
{: .fs-8 }
Font size 9
{: .fs-9 }
Font size 10
{: .fs-10 }
```

### Font weight

Use the `.fw-300` - `.fw-700` to set an explicit font-size.

<div class="code-example" markdown="1">
Font weight 300
{: .fw-300 }
Font weight 400
{: .fw-400 }
Font weight 500
{: .fw-500 }
Font weight 700
{: .fw-700 }
</div>
```markdown
In Markdown, use the `{: }` wrapper to apply custom classes:

Font weight 300
{: .fw-300 }
Font weight 400
{: .fw-400 }
Font weight 500
{: .fw-500 }
Font weight 700
{: .fw-700 }
```

### Line height

Use the `lh-` classes to explicitly apply line height to text.

| Class         | `line-height` value  | Notes                         |
|:--------------|:---------------------|:------------------------------|
| `.lh-0`       | 0                    |                               |
| `.lh-tight`   | 1.1                  | Default for headings          |
| `.lh-default` | 1.4                  | Default for body (paragraphs) |



<div class="code-example" markdown="1">
No Line height  
No Line height
{: .lh-0 }

Tight line height  
Tight line height
{: .lh-tight }

Default line height  
Default line height
{: .fh-default }
</div>
```markdown
In Markdown, use the `{: }` wrapper to apply custom classes:

No Line height  
No Line height
{: .lh-0 }

Tight line height  
Tight line height
{: .lh-tight }

Default line height  
Default line height
{: .fh-default }
```
---
## Color
### Font color
### Background color
