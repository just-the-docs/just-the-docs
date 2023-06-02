---
layout: default
title: Kitchen Sink
description: SCDS Do More with Digital Scholarship workshop series
nav_order: 99
---

# Common Elements
{: .no_toc }

Below are a bunch of markdown elements and their source code. Click the copy button at the top right of a codeblock to copy it to your clipboard.

More specific common elements seen in lessons can be found [here](common_elements_DELETE).

Remember to delete this page before publishing.

## Table of contents
{: .no_toc .text-delta }
1. TOC
{:toc}

# Headers and Paragraphs
<div class="code-example" markdown="1">

# Header 1
{: .no_toc }
## Header 2
{: .no_toc }
### Header 3
{: .no_toc }
#### Header 4
{: .no_toc }
##### Header 5
{: .no_toc }
###### Header 6
{: .no_toc }
A paragraph.

A new paragraph.

</div>

```md
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
A paragraph.

A new paragraph.
```

***
<!-- -------------------------------------------------- -->

# Emphasis
<div class="code-example" markdown="1">

*Italics*

**Bolded**

***Bolded italics***

~~Strikethrough~~

</div>

```md
*Italics*

**Bolded**

***Bolded italics***

~~Strikethrough~~
```

***
<!-- -------------------------------------------------- -->

# Code Blocks
<div class="code-example" markdown="1">

```python
x = 5
y = 7
print(x + y)
```

</div>

````markdown
```python
x = 5
y = 7
print(x + y)
```
````

***
<!-- -------------------------------------------------- -->

# Labels
<div class="code-example" markdown="1">
Default label 
{: .label }

Blue label 
{: .label .label-blue }

Green label 
{: .label .label-green }

Purple label 
{: .label .label-purple }

Yellow label 
{: .label .label-yellow }

Red label 
{: .label .label-red }
</div>

```md
Default label 
{: .label }
```

```md
Blue label 
{: .label .label-blue }
```

```md
Green label 
{: .label .label-green }
```

```md
Purple label 
{: .label .label-purple }
```

```md
Yellow label 
{: .label .label-yellow }
```

```md
Red label 
{: .label .label-red }
```

***
<!-- -------------------------------------------------- -->

# Callouts

More examples can be found [here](https://just-the-docs.github.io/just-the-docs/docs/ui-components/callouts/). 

By default, this template supports .highlight, .important, .new, .note, and .warning

<div class="code-example" markdown="1">

{: .highlight }
Some text without a title

```md
{: .highlight }
Some text without a title
```
<br>

{: .important }
> Some text
> 
> Multiple lines

```md
{: .important }
> Some text
> 
> Multiple lines
```
<br>

{: .new }
More text

```md
{: .new }
More text
```
<br>

{: .note }
Purple text

```md
{: .note }
Purple text
```
<br>

{: .warning }
Warning!

```md
{: .warning }
Warning!
```
<br>

{: .note-title }
> First line is your title
>
> Rest of your text goes here.

```md
<!-- For a callout with a custom title, add "-title" to the end of the callout name. -->
<!-- .highlight-title, .important-title, .new-title, .note-title, and .warning-title -->
{: .note-title }
> First line is your title
>
> Rest of your text goes here.
```
</div>

***
<!-- -------------------------------------------------- -->

# Lists
<div class="code-example" markdown="1">
1. Item 1
2. Item 2
3. Item 3

```md
1. Item 1
2. Item 2
3. Item 3
```
<br>

- Bulleted point
- Another bullet point
- Woah

```md
- Bulleted point
- Another bullet point
- Woah
```
</div>





***
<!-- -------------------------------------------------- -->

# Drop-down Content
<div class="code-example" markdown="1">
<details>
    <summary> Drop-down without block-quote </summary> 
    Hello, World!
    <br>
    Next line.
</details>

```md
<details>
    <summary> Drop-down without block-quote </summary> 
    Hello, World!
    <br>
    Next line.
</details>
```
<br>

<details>
    <summary> Drop-down with block-quote </summary> 
    <blockquote>
        Hello, World!
        <br>
        Next line.
    </blockquote>
</details>

```md
<details>
    <summary> Drop-down with block-quote </summary> 
    <blockquote>
        Hello, World!
        <br>
        Next line.
    </blockquote>
</details>
</div>
```

</div>
***
<!-- -------------------------------------------------- -->

# Images
<div class="code-example" markdown="1">

## Image from file
![Alternate Text](assets/img/temporaryInstallationGuide.png)

```md
## Image from file
![Alternate Text](assets/img/temporaryInstallationGuide.png)
```

## Image from file resized
<img src="assets/img/temporaryInstallationGuide.png" alt="Alternate Text" width="50%">
<!-- Try and use relative widths (percentages). 100% is the full width of the content area. -->

```md
## Image from file resized
<img src="assets/img/temporaryInstallationGuide.png" alt="Alternate Text" width="50%">
<!-- Try and use relative widths (percentages). 100% is the full width of the content area. -->
```

## Image from link
![Alternate Text](https://picsum.photos/id/237/400)

```md
## Image from link
![Alternate Text](https://picsum.photos/id/237/400)
```

## Image from link resized
<img src="https://picsum.photos/id/237/400" alt="Alternate Text" width="20%">
<!-- Try and use relative widths (percentages). 100% is the full width of the content area. -->

```md
## Image from link resized
<img src="https://picsum.photos/id/237/400" alt="Alternate Text" width="20%">
<!-- Try and use relative widths (percentages). 100% is the full width of the content area. -->
```

</div>

***
<!-- -------------------------------------------------- -->

# Embeds
<iframe width="100%" height="416" allowfullscreen frameborder=0 src="https://echo360.ca/media/a65689c0-c35c-4f33-9c12-f0ac97883f54/public?autoplay=false&automute=false"></iframe>

```md
<iframe width="100%" height="416" allowfullscreen frameborder=0 src="https://echo360.ca/media/a65689c0-c35c-4f33-9c12-f0ac97883f54/public?autoplay=false&automute=false"></iframe>
<!-- Replace src link with your own, or get embed code from your echo360 video. -->
<!-- Use a width of 100% and test out different heights until there's no black bars. Typically 416 works. -->
```
<br>

<iframe width="100%" height="416" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="Me at the zoo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

```md
<iframe width="100%" height="416" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="Me at the zoo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<!-- Get embed code from YouTube. -->
<!-- Use a width of 100% and test out different heights until there's no black bars. Typically 416 works. -->
```