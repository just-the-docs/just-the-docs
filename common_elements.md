---
layout: default
title: Common Elements
description: SCDS Do More with Digital Scholarship workshop series
nav_order: 100
---

# Kitchen Sink
{: .no_toc }

Below are a bunch of common elements and their source code. Click the copy button at the top right of a codeblock to copy it to your clipboard.

More general markdown elements can be found [here](kitchen_sink_DELETE).

Remember to delete this page before publishing.

***
<!-- -------------------------------------------------- -->

# Table of Contents
<div class="code-example" markdown="1">

<details markdown="block">
  <summary>
    Table of Contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

````md
<details markdown="block">
  <summary>
    Table of Contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>
````

{: .note }
> You can only have one table of contents per page.

</div>

***
<!-- -------------------------------------------------- -->

# Question and Answers
<div class="code-example" markdown="1">

This is a simpler way to ask a question with an answer.
<details>
    <summary> See Answer. </summary> 
    <blockquote>
        Your answer goes here. <br>
        Multiple lines.
    </blockquote>
</details>

```md
This is a simpler way to ask a question with an answer.                         <!-- Question Text -->
<details>
    <summary> See Answer </summary>            
    <blockquote>
        Your answer goes here. <br>                                             <!-- Answer Text -->
        Multiple lines.
    </blockquote>
</details>
```
<br>

{: .new-title }
> Exercise 1
> 
> This is a fancier way to display questions.
> 
> You can also have multiple lines.
>
> <details>
>   <summary> See Answer </summary>
>   <div markdown="1">
>   {: .note-title }
> > Answer
> > 
> > You can put your solution here
> >
> > Multi line solutions
>   </div>
> </details>

```md
{: .new-title }
> Exercise 1                                           <!-- This is where you edit the title -->
> 
> This is some really long question.                   <!-- Question Text -->
> 
> So long you might need a second line.                <!-- Optional Additional Text -->
>
> <details>
>   <summary> See Answer </summary>
>   <div markdown="1">
>   {: .note-title }                                   
> > Answer
> > 
> > You can put your solution here                     <!-- Answer Text -->
> >
> > Multi line solutions                               <!-- Optional Additional Text -->
>   </div>
> </details>
```

</div>

***
<!-- -------------------------------------------------- -->

# Navigation Buttons

{: .note }
> If you're going from a page in root folder into a page in lessons folder, use `lessons/pageName` as your location.
>
> Likewise, if you're going from a page in lessons folder to a page in root folder, use `../pageName` as your location.
>
> Don't include the file extension.

<div class="code-example" markdown="1">

<div style="display: flex;">
<div style="flex-grow: 1;" markdown="1">
[🡨 Previous](){: .btn .btn-outline} 
</div>

<div markdown="1">
[Next 🡪](){: .btn .btn-outline}
</div>
</div>

```md
<div style="display: flex;">
<div style="flex-grow: 1;" markdown="1">
[🡨 Previous](previousPage){: .btn .btn-outline} <!-- Change the "Previous" (the title of button) and "previousPage" (filename location) -->
</div>

<div markdown="1">
[Next 🡪](nextPage){: .btn .btn-outline} <!-- Change the "Next" (the title of button) and "nextPage" (filename location) -->
</div>
</div>
```

</div>

***
<!-- -------------------------------------------------- -->

# Input Output Code Blocks
<div class="code-example" markdown="1">

{: .label }
Input
```python
a = 3
b = 4

c = sqrt(a^2 + b^2)
print(c)
```

{: .label .label-green }
Output
```
5
```

---

````md
{: .label }
Input
```python
a = 3
b = 4

c = sqrt(a^2 + b^2)
print(c)
```

{: .label .label-green }
Output
```
5
```
````

</div>

***
<!-- -------------------------------------------------- -->

# PDF Viewer
<div class="code-example" markdown="1">

<embed src="assets/docs/examplePDF.pdf" style="border:none;" width="100%" height="466px">

---

````md
<embed src="assets/docs/examplePDF.pdf" style="border:none;" width="100%" height="466px">
````

</div>

***
<!-- -------------------------------------------------- -->
