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

## Color schemes
{: .d-inline-block }

New
{: .label .label-green }

Just the Docs supports two color schemes: light (default), and dark.

To enable a color scheme, set the `color_scheme` parameter in your site's `_config.yml` file:

#### Example
{: .no_toc }

```yaml
# Color scheme supports "light" (default) and "dark"
color_scheme: dark
```

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

## Custom schemes

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

_Note:_ Editing the variables directly in `_sass/support/variables.scss` is not recommended and can cause other dependencies to fail.
Please use scheme files.

### Use a custom scheme

To use the custom color scheme, only set the `color_scheme` parameter in your site's `_config.yml` file:

```yaml
color_scheme: foo
```

### Switchable custom scheme

If you want to be able to change the scheme dynamically, for example via javascript, just add a file `assets/css/just-the-docs-foo.scss` (replace `foo` by your scheme name)
with the following content:

{% raw %}
    ---
    ---
    {% include css/just-the-docs.scss.liquid color_scheme="foo" %}
{% endraw %}

This allows you to switch the scheme via the following javascript.

```js
jtd.setTheme("foo")
```

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
