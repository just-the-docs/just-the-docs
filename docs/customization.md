---
layout: default
title: Customization
nav_order: 5
---

# Customization
{:.no_toc}

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Visual customization

To customize your site’s aesthetic, open `_sass/custom/custom.scss` in your editor to see if there is a variable that you can override. Most styles like fonts, colors, spacing, etc.. are derived from these variables. To override a specific variable, uncomment out it’s line and change it’s value.

For example, to change the link color from the purple default to blue, open `_sass/custom/custom.css` and find the link color variable on line `44`. Uncomment it out, and change it's value to our `$blue-000` variable, or another shade of your choosing.

```scss
// ...
//
// $body-text-color: $grey-dk-100;
// $body-heading-color: $grey-dk-300;
$link-color: $blue-000;
//
// ...
```

_Note:_ Editing the variables directly in `_sass/support/variables.scss` is not recommended and can cause other dependancies to fail.

---

## Themes
{: .d-inline-block :}

Coming soon
{: .label .label-yellow :}

Hard at work on a dark theme, and more.
