---
title: Callouts
parent: UI Components
nav_order: 7
---

# Callouts
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

Markdown does not include support for callouts. However, you can style text as a callout using a Markdown extension supported by kramdown: [*block IALs*](https://kramdown.gettalong.org/quickref.html#block-attributes).

Common kinds of callouts include `highlight`, `important`, `new`, `note`, and `warning`.

{: .warning }
These callout names are *not* pre-defined by the theme: you need to define your own names.

When you have [configured]({% link docs/configuration.md %}#callouts) the  `color` and (optional) `title` for a callout, you can apply it to a paragraph, or to a block quote with several paragraphs, as illustrated below.[^postfix]

[^postfix]:
    You can put the callout markup either before or after its content.

## An untitled callout
{: .no_toc .text-delta }

```markdown
{: .highlight }
A paragraph
```

{: .highlight }
A paragraph


## A single paragraph callout
{: .no_toc .text-delta }

```markdown
{: .josh }
A paragraph
```

{: .josh }
A paragraph

```markdown
{: .note-title }
> My note title
>
> A paragraph with a custom title callout
```

{: .josh-title }
> My note title
>
> A paragraph with a custom title callout

## A single paragraph callout
{: .no_toc .text-delta }

```markdown
{: .warren }
A paragraph
```

{: .warren }
A paragraph

```markdown
{: .warren-title }
> My note title
>
> A paragraph with a custom title callout
```

{: .warren-title }
> My note title
>
> A paragraph with a custom title callout

## A multi-paragraph callout
{: .no_toc .text-delta }

```markdown
{: .important }
> A paragraph
>
> Another paragraph
>
> The last paragraph
```

{: .important }
> A paragraph
>
> Another paragraph
>
> The last paragraph

```markdown
{: .important-title }
> My important title
>
> A paragraph
>
> Another paragraph
>
> The last paragraph
```

{: .important-title }
> My important title
>
> A paragraph
>
> Another paragraph
>
> The last paragraph

## An indented callout
{: .no_toc .text-delta }

```markdown
> {: .highlight }
  A paragraph
```

> {: .highlight }
  A paragraph

## Indented multi-paragraph callouts
{: .no_toc .text-delta }

```markdown
> {: .josh }
> > A paragraph
> >
> > Another paragraph
> >
> > The last paragraph
```

> {: .new }
> > A paragraph
> >
> > Another paragraph
> >
> > The last paragraph


## Nested callouts
{: .no_toc .text-delta }

```markdown
{: .important }
> {: .highlight }
> A paragraph
```

{: .important }
> {: .highlight }
> A paragraph

## Opaque background
{: .no_toc .text-delta }

```markdown
{: .important }
> {: .opaque }
> <div markdown="block">
> {: .highlight }
> A paragraph
> </div>
```

{: .important }
> {: .opaque }
> <div markdown="block">
> {: .highlight }
> A paragraph
> </div>
