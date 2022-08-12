---
layout: default
title: Callouts
parent: UI Components
nav_order: 7
---

# Callouts

Markdown does not include support for callouts. However, you can style text as a callout using a Markdown extension supported by kramdown: [*block IALs*](https://kramdown.gettalong.org/quickref.html#block-attributes). 

Common kinds of callouts include `admonition`, `attention`, `caution`, `danger`, `error`, `hint`, `important`, `note`, `tip`, and `warning`.

When you have [configured]({{ site.baseurl }}{% link docs/configuration.md %}#callouts) the  `color` and (optional) `title` for a callout, you can apply it to a paragraph, or to a block quote with several paragraphs, as illustrated below.[^postfix]

[^postfix]:
    You can put the callout markup either before or after its content.

#### An untitled callout
{: .no_toc }

```markdown
{: .highlight }
A paragraph
```

#### A single paragraph callout
{: .no_toc }

```markdown
{: .note }
A paragraph
```

```markdown
{: .note-title }
> My note title
>
> A paragraph with a custom title callout
```

#### A multi-paragraph callout
{: .no_toc }

```markdown
{: .important }
> A paragraph
>
> Another paragraph
>
> The last paragraph
```

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

#### An indented callout
{: .no_toc }

```markdown
> {: .hint }
  A paragraph
```

#### Indented multi-paragraph callouts
{: .no_toc }

```markdown
> {: .attention }
> > A paragraph
> >
> > Another paragraph
> >
> > The last paragraph
```

#### Nested callouts
{: .no_toc }

```markdown
{: .important }
> {: .warning }
> A paragraph
```

#### Opaque background
{: .no_toc }

```markdown
{: .important }
> {: .opaque }
> <div markdown="block">
> {: .warning }
> A paragraph
> </div>
```
