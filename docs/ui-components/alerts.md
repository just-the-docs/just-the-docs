---
title: Alerts
parent: UI Components
nav_order: 7
---

# Alerts
{: .no_toc }

{: .ALERT }
> *This feature has not yet been released!*

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Markdown does not include support for alerts. However, GitHub has implemented five kinds of alerts: `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, and `CAUTION`. The [GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) state:

> Alerts are a Markdown extension based on the blockquote syntax that you can use to emphasize critical information. On GitHub, they are displayed with distinctive colors and icons to indicate the significance of the content.
>
> Use alerts only when they are crucial for user success and limit them to one or two per article to prevent overloading the reader. Additionally, you should avoid placing alerts consecutively. Alerts cannot be nested within other elements.
>
> To add an alert, use a special blockquote line specifying the alert type, followed by the alert information in a standard blockquote. Five types of alerts are available: ...

Just the Docs has now implemented the same kinds of alerts as GitHub, and renders them with similar styling.
You can also use a further kind, called `ALERT`, intended for alerts whose content doesn't match the predefined kinds (`ALERT` treats the first paragraph of the alert content as the heading, and uses a neutral color).

{: .NOTE }
> Use of the predefined alerts does *not* require any configuration.

You can easily [customize](#customization) the headings and colors of the predefined alerts, and add new kinds.

The Just the Docs syntax for alerts is illustrated below. It uses a Markdown extension supported by Kramdown ([*block IALs*](https://kramdown.gettalong.org/quickref.html#block-attributes)) together with the usual blockquote syntax.[^GFM]
You should put the block IAL on a line by itself directly before (or directly after) the alert content, and separate the block IAL from other content by a blank line.

[^GFM]: The Kramdown parser for GFM (GitHub-Flavored Markdown) does not recognize the GitHub alerts syntax.

You can use the following button to see the colors used for the predefined alerts with the `dark` color scheme. (The accessibility of the colors has not yet been reviewed.)

<button class="btn js-toggle-dark-mode">Preview dark color scheme</button>

<script>
const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

jtd.addEvent(toggleDarkMode, 'click', function(){
  if (jtd.getTheme() === 'dark') {
    jtd.setTheme('light');
    toggleDarkMode.textContent = 'Preview dark color scheme';
  } else {
    jtd.setTheme('dark');
    toggleDarkMode.textContent = 'Return to the light side';
  }
});
</script>

## Single-paragraph alerts

{: .lh-0 }
```markdown
{: .NOTE }
> Useful information that users should know, even when skimming content.

{: .TIP }
> Helpful advice for doing things better or more easily.

{: .IMPORTANT }
> Key information users need to know to achieve their goal.

{: .WARNING }
> Urgent info that needs immediate user attention to avoid problems.

{: .CAUTION }
> Advises about risks or negative outcomes of certain actions.

{: .ALERT }
> v0.10.x
>
> Alerts are a new feature of Just the Docs
```

(The ASCII symbols currently displayed in the predefined alerts are to be replaced by SVG icons.)

{: .NOTE }
> Useful information that users should know, even when skimming content.

{: .TIP }
> Helpful advice for doing things better or more easily.

{: .IMPORTANT }
> Key information users need to know to achieve their goal.

{: .WARNING }
> Urgent info that needs immediate user attention to avoid problems.

{: .CAUTION }
> Advises about risks or negative outcomes of certain actions.

{: .ALERT }
> v0.10.x
>
> Alerts are a new feature of Just the Docs

For compatibility with the syntax for callouts, a single paragaph doesn't need to be enclosed in a blockquote:

{: .lh-0 }
```markdown
{: .NOTE }
Useful information that users should know, even when skimming content.
```

{: .NOTE }
Useful information that users should know, even when skimming content.


## An alert with no content

{: .lh-0 }
```markdown
{: .NOTE }
>
```

{: .NOTE }
>

## Multi-paragraph alerts

{: .lh-0 }
```markdown
{: .TIP }
> A paragraph
>
> Another paragraph
>
> The last paragraph

*Some ordinary paragraphs...*

{: .ALERT }
> The alert heading
>
> The first content paragraph
>
> The last content paragraph
```

{: .TIP }
> A paragraph
>
> Another paragraph
>
> The last paragraph

*Some ordinary paragraphs...*

{: .ALERT }
> The alert heading
>
> The first content paragraph
>
> The last content paragraph

## Nested alerts

{: .lh-0 }
```markdown
{: .IMPORTANT }
> You can nest alerts!
>
> {: .CAUTION }
> > Nesting might cause confusion
```

{: .IMPORTANT }
> You can nest alerts!
>
> {: .CAUTION }
> > Nesting might cause confusion

## Customization

You can easily customize the headings and colors of the predefined alerts, and add new kinds of alerts. For example, add the following SCSS to the file `_sass/custom/custom.scss` to define several shades of a `pink` color, and call the `alert` mixin with a shade of pink that gives acceptable contrast with the current color-scheme: 

{: .lh-0 }
```scss
$pink-000: #f77ef1;
$pink-100: #f967f1;
$pink-200: #e94ee1;
$pink-300: #dd2cd4;

$a-new-color: $pink-200; // default/light color-scheme

@if $color-scheme == dark {
  $a-new-color: $pink-000;
}

@include alert(NEW, $a-new-color, "🆕");
```

You can use any valid HTML classname as the name of the alert. Classnames are case-sensitive, and all classnames used internally by Just the Docs are lowercase; using uppercase classnames for alerts helps to avoid clashes between style rules.

Note that you can choose the alert colors for each color scheme independently.

{: .lh-0 }
```markdown
{: .NEW }
> This is how a new alert might look
```

{: .NEW }
> This is how a new alert might look

If you replace `NEW` above by one of the predefined alert names, the predefined alert is overridden.

----
