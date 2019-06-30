---
layout: default
title: Customization
nav_order: 7
---

# Customization
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Color schemes
{: .d-inline-block }

New
{: .label .label-green }

Just the Docs supports two color schemes: light (default), and dark.

To enable a color scheme, set the `color_scheme` parameter in your site's `_config.yml` file:

#### Example
{: .no_toc }

```yaml
# Color scheme currently only supports "dark" or nil (default)
color_scheme: "dark"
```
<button class="btn js-toggle-dark-mode">Preview dark color scheme</button>

<script>
const toggleDarkMode = document.querySelector('.js-toggle-dark-mode')
const cssFile = document.querySelector('[rel="stylesheet"]')
const originalCssRef = cssFile.getAttribute('href')
const darkModeCssRef = originalCssRef.replace('just-the-docs.css', 'dark-mode-preview.css')

addEvent(toggleDarkMode, 'click', function(){
  if (cssFile.getAttribute('href') === originalCssRef) {
    cssFile.setAttribute('href', darkModeCssRef)
  } else {
    cssFile.setAttribute('href', originalCssRef)
  }
})
</script>

## Specific visual customization

To customize your site’s aesthetic, open `_sass/custom/custom.scss` in your editor to see if there is a variable that you can override. Most styles like fonts, colors, spacing, etc. are derived from these variables. To override a specific variable, uncomment its line and change its value.

For example, to change the link color from the purple default to blue, open `_sass/custom/custom.css` and find the `$link-color` variable on line `50`. Uncomment it, and change its value to our `$blue-000` variable, or another shade of your choosing.

#### Example
{: .no_toc }

```scss
// ...
//
// $body-text-color: $grey-dk-100;
// $body-heading-color: $grey-dk-300;
$link-color: $blue-000;
//
// ...
```

_Note:_ Editing the variables directly in `_sass/support/variables.scss` is not recommended and can cause other dependencies to fail.

## Create pages with a different structure

Just the Docs is all about creating documentation pages. However to create a complete website you usually need pages that have a different structure like a landing page, an about page, etc. For that purpose Just the Docs provides a "clean" page layout where you can create your own structure. This layout is called `generic-page`. To create page with this layout simply set the `layout` attribute in the YAML front matter to `generic-page`:

```yaml
---
title: My Beautiful Landing Page
layout: generic-page
nav_exclude: true
---
```

If you want this page to be excluded from the documentation pages set `nav_exclude` to `true`.

You can use this feature in conjunction with [top navigation menu]({{ site.baseurl }}{% link docs/top-navigation.md %}) to add links to these pages from the top navigation menu.
