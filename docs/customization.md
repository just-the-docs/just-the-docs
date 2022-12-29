---
layout: default
title: Customization
nav_order: 6
---

# Customization
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Color schemes (theme)
{: .d-inline-block }

New
{: .label .label-green }

Just the Docs supports two static color schemes (theme) out of the box: light and dark. In addition, it allows for an automatic mode that switches based on the user's [preferred color scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) (a feature of most browsers).

```yaml
color_scheme: auto 
```
- `nil` is the default value and use the `default` color scheme.
- `"auto"` is use the user's system light/dark selection. This will enable automatic switching between ligth mode and dark mode based on the user's [preferred color scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) (a feature of most browsers).
- `"light"` is use the light color scheme. This will force the color scheme.
- `"dark"` is use the dark color scheme. This will force the color scheme.


### Switch color scheme button

This button will appear in the top navbar (the last button on the right, in the `aux-nav-list`). It is possible to enable, disable or show it only on selected pages, its enabling is independent of whether the color scheme is saved in local storage.

```yaml
enable_switch_color_scheme: true # true # false or "selected_pages". Show the switch color scheme button on the top navbar.
```

{: .note }
To enable it on selected pages, it must be added to the header of the page:

```md
---
layout: default
title: Home
enable_switch_color_scheme: true
---
```

### Custom order of the switch color scheme button

Just the Docs supports to edit the rotation carousel of the color scheme by:
```yaml
switch_color_scheme_available: ["light", "dark", "auto"] # the default is ["auto", "light", "dark"]
```

### Enable or disable `localstorage`

Since not all sites require local storage of the theme, and since local storage of the theme requires the use of a `<script>` in the `<head>` that blocks the loading of the rest of the HTML to avoid FART it can be disabled:

```yaml
enable_localstorage_color_scheme: true # or false 
``` 

{: .note }
`enable_localstorage_color_scheme` *must* be enabled for changes of color scheme (theme) to persist across pages and sessions.

### Define a custom scheme

You can add custom schemes.
If you want to add a scheme named `foo` (can be any name) just add a file `_sass/color_schemes/foo.scss` (replace `foo` by your scheme name)
where you override theme variables to change colors, fonts, spacing, etc.

{: .note }
Since the default color scheme is `light`, your custom scheme is implicitly based on the variable settings used by the `light` scheme.

If you want your custom scheme to be based on the `dark` scheme, you need to start your file with the following line:

```scss
@import "./color_schemes/dark";
```

You can define custom schemes based on other custom schemes in the same way.

Available variables are listed in the [\_variables.scss](https://github.com/just-the-docs/just-the-docs/tree/main/_sass/support/_variables.scss) file.

For example, to change the link color from the purple default to blue, include the following inside your scheme file:

#### Example
{: .no_toc }

```scss
$link-color: $blue-000;
```

Keep in mind that changing a variable will not automatically change the value of other variables that depend on it.
For example, the default link color (`$link-color`) is set to `$purple-000`. However, redefining `$purple-000` in a custom color scheme will not automatically change `$link-color` to match it.
Instead, each variable that relies on previously-cascaded values must be manually reimplemented by copying the dependent rules from `_variables.scss` — in this case, rewriting `$link-color: $purple-000;`.

{: .note }
Editing the variables directly in `_sass/support/variables.scss` is not recommended and can cause other dependencies to fail.
Please use scheme files.

### Use a custom scheme

To use the custom color scheme, only set the `color_scheme` parameter in your site's `_config.yml` file:

```yaml
color_scheme: foo
```

### Add a custom scheme to the switch theme button

Just the Docs, after create a new theme, supports to add a theme rotation carousel in 3 step:
1. Just add a file `assets/css/just-the-docs-read.scss` (replace `read` by your scheme name)
with the following content:

```
{% raw %}---
---
{% include css/just-the-docs.scss.liquid color_scheme="read" %}{% endraw %}
```

{:style="counter-reset:none"}
1. Just add a file `_sass/color_schemes/read.scss` (replace `read` by your scheme name) 
1. Just add its name in `switch_theme_available_colour_scheme` (replace `read` by your scheme name):

```yaml
switch_color_scheme_available: ["auto", "light", "dark", "read"] # add read theme 
```

{:style="counter-reset:none"}
1. Jut put into `_includes/icons/custom.html` a custom icon for the scheme (the correct size is 24x24):

```html
<!-- Feather. MIT License: https://github.com/twbs/icons/blob/main/LICENSE.md -->
<symbol id="svg-read" viewBox="0 0 24 24" pointer-events="all">
  <title>Selected read safe colour scheme</title>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
  </svg>
</symbol>
```

### Switchable theme scheme

If you want to be able to change the scheme dynamically, for example via javascript, via the following javascript (replace `foo` by your scheme name).

```js
jtd.setTheme("foo")
```

The scheme name supported are: `auto`, `light`, `dark`, `default`

## Override and completely custom styles

For styles that aren't defined as variables, you may want to modify specific CSS classes.
Additionally, you may want to add completely custom CSS specific to your content.
To do this, put your styles in the file `_sass/custom/custom.scss`.
This will allow for all overrides to be kept in a single file, and for any upstream changes to still be applied.

For example, if you'd like to add your own styles for printing a page, you could add the following styles.

#### Example
{: .no_toc }

```scss
// Print-only styles.
@media print {
  .side-bar,
  .page-header {
    display: none;
  }
  .main-content {
    max-width: auto;
    margin: 1em;
  }
}
```

## Override includes

You can customize the theme by overriding any of the custom [Jekyll includes](https://jekyllrb.com/docs/includes/) files that it provides.

To do this, create an `_includes` directory and make a copy of the specific file you wish to modify. The content in this file will override the theme defaults. You can learn more about this process in the Jekyll docs for [Overriding theme defaults](https://jekyllrb.com/docs/themes/#overriding-theme-defaults).

Just the Docs provides the following custom includes files:

### Custom TOC Heading

`_includes/toc_heading_custom.html`

If the page has any child pages, and `has_toc` is not set to `false`, this content appears as a heading above the [auto-generating list of child pages]({{ site.baseurl }}{% link docs/navigation-structure.md %}#auto-generating-table-of-contents) after the page's content.

#### Example
{: .no_toc }

To change the default TOC heading to "Contents", create `_includes/toc_heading_custom.html` and add:
```html
<h2 class="text-delta">Contents</h2>
```

The (optional) `text-delta` class makes the heading appear as **Contents**{:.text-delta} .

### Custom Footer

`_includes/footer_custom.html`

This content appears at the bottom of every page's main content. More info for this include can be found in the [Configuration - Footer content]({{ site.baseurl }}{% link docs/configuration.md %}#footer-content).

### Custom Head

`_includes/head_custom.html`

Any HTML added to this file will be inserted before the closing `<head>` tag. This might include additional `<meta>`, `<link>`, or `<script>` tags.

The `<head>` tag automatically includes a link to an existing favicon if you set `favicon_ico` to the corresponding path in your configuration, or if the path to the favicon is `/favicon.ico`.

### Custom Header

`_includes/header_custom.html`

Content added to this file appears at the top of every page's main content between the site search and auxiliary links if they are enabled. If `search_enabled` were set to false and `aux_links` were removed, the content of `header_custom.html` would occupy the space at the top of every page.

### Custom Nav Footer

`_includes/nav_footer_custom.html`

Any content added to this file will appear at the bottom left of the page below the site's navigation. By default an attribution to Just the Docs is displayed which reads, `This site uses Just the Docs, a documentation theme for Jekyll.`.

### Custom Search Placeholder

`_includes/search_placeholder_custom.html`

Content added to this file will replace the default placeholder text in the search bar (and its `aria-label`), after stripping HTML and leading/trailing whitespace. By default, the content of the include is:

{% raw %}

```liquid
Search {{site.title}}
```

{% endraw %}

Override this file to render a custom placeholder. One common use-case is internationalization; for example,

{% raw %}

```liquid
Chercher notre site
```

{% endraw %}

would make the placeholder text "Chercher notre site". [Liquid code](https://jekyllrb.com/docs/liquid/) (including [Jekyll variables](https://jekyllrb.com/docs/variables/)) is also supported.
