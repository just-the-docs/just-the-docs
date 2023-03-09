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

### deprecated: `legacy_light`
{: .d-inline-block .no_toc }

New (v0.5.0)
{: .label .label-green }


In Just the Docs version `0.5.0`, we changed the default syntax highlighting theme for the `light` color scheme to have higher contrast. Users who are want to use the old highlighting need to explicitly opt-in with the deprecated `legacy_light` color scheme. In a future major release of Just the Docs, we will remove this color scheme.

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

## Override and define new variables
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

To define new SCSS variables, functions, or override existing theme variables, place SCSS code in `_sass/custom/setup.scss`. This should *not* be used for defining custom styles (see the next section).

This is most commonly-used to define [custom callout colors]({% link docs/configuration.md %}#callouts). For example,

```scss
// _sass/custom/setup.scss
$pink-000: #f77ef1;
$pink-100: #f967f1;
$pink-200: #e94ee1;
$pink-300: #dd2cd4;
```

In particular: this file is imported *after* the theme's variables and functions are defined, but *before* any CSS classes are emitted.

## Override and completely custom styles

For styles that aren't defined as SCSS variables, you may want to modify specific CSS classes.
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
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

`_includes/toc_heading_custom.html`

If the page has any child pages, and `has_toc` is not set to `false`, this content appears as a heading above the [auto-generating list of child pages]({% link docs/navigation-structure.md %}#auto-generating-table-of-contents) after the page's content.

#### Example
{: .no_toc }

To change the default TOC heading to "Contents", create `_includes/toc_heading_custom.html` and add:
```html
<h2 class="text-delta">Contents</h2>
```

The (optional) `text-delta` class makes the heading appear as **Contents**{:.text-delta} .

### Custom Footer

`_includes/footer_custom.html`

This content appears at the bottom of every page's main content. More info for this include can be found in the [Configuration - Footer content]({% link docs/configuration.md %}#footer-content).

### Custom Head

`_includes/head_custom.html`

Any HTML added to this file will be inserted before the closing `<head>` tag. This might include additional `<meta>`, `<link>`, or `<script>` tags.

The `<head>` tag automatically includes a link to an existing favicon if you set `favicon_ico` to the corresponding path in your configuration, or if the path to the favicon is `/favicon.ico`.

### Custom Header

`_includes/header_custom.html`

Content added to this file appears at the top of every page's main content between the site search and auxiliary links if they are enabled. If `search_enabled` were set to false and `aux_links` were removed, the content of `header_custom.html` would occupy the space at the top of every page.

### Custom Nav Footer
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

`_includes/nav_footer_custom.html`

Any content added to this file will appear at the bottom left of the page below the site's navigation. By default an attribution to Just the Docs is displayed which reads, `This site uses Just the Docs, a documentation theme for Jekyll.`.

### Custom Search Placeholder
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

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

## Custom layouts and includes
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

Advanced
{: .label .label-yellow }

Just the Docs uses Jekyll's powerful [layouts](https://jekyllrb.com/docs/layouts/) and [includes](https://jekyllrb.com/docs/includes/) features to generate and compose various elements of the site. Jekyll users and developers can extend or replace existing layouts and includes to customize the entire site layout.

### Default layout and includable components

The `default` layout is inherited by most of the "out-of-the-box" pages provided by Just the Docs. It composes various re-usable components of the site, including the sidebar, navbar, footer, breadcrumbs, and various imports. Most users who create new pages or layouts will inherit from `default`.

Here is a simplified code example of what it looks like:

{% raw %}

```liquid
<!-- a simplified version of _layouts/default.html -->
<html>
{% include head.html %}
<body>
  {% include icons/icons.html %}
  {% include components/sidebar.html %}
  {% include components/header.html %}
  {% include components/breadcrumbs.html %}

  {% if site.heading_anchors != false %}
    {% include vendor/anchor_headings.html html=content ... %}
  {% else %}
    {{ content }}
  {% endif %}

  {% if page.has_children == true and page.has_toc != false %}
    {% include components/children_nav.html %}
  {% endif %}

  {% include components/footer.html %}

  {% if site.search_enabled != false %}
    {% include components/search_footer.html %}
  {% endif %}

  {% if site.mermaid %}
    {% include components/mermaid.html %}
  {% endif %}
</body>
</html>
```

{% endraw %}

#### Component summary
{: .no_toc }

{: .warning }
Defining a new `_includes` with the same name as any of these components will significantly change the existing layout. Please proceed with caution when adjusting them.

To briefly summarize each component:

- `_includes/head.html` is the entire `<head>` tag for the site; this imports stylesheets, various JavaScript files (ex: analytics, mermaid, search, and Just the Docs code), and SEO / meta information.
- `_includes/icons/icons.html` imports all SVG icons that are used throughout the site. Some, such as those relating to search or code snippet copying, are only loaded when those features are enabled.
- `_includes/components/sidebar.html` renders the sidebar, containing the site header, navigation links, external links, collections, and nav footer.
- `_includes/components/header.html` renders the navigation header, containing the search bar, custom header, and aux links
- `_includes/components/breadcrumbs.html` renders the breadcrumbs feature
- `vendor/anchor_headings.html` is a local copy of Vladimir Jimenez's [jekyll-anchor-headings](https://github.com/allejo/jekyll-anchor-headings) snippet
- `_includes/components/children_nav.html` renders a list of nav links to child pages on parent pages
- `_includes/components/footer.html` renders the bottom-of-page footer
- `_includes/components/search_footer.html` renders DOM elements that are necessary for the search bar to work
- `_includes/components/mermaid.html` initializes mermaid if the feature is enabled

Each of these components can be overridden individually using the same process described in the [Override includes](#override-includes) section. In particular, the granularity of components should allow users to replace certain components (such as the sidebar) without having to adjust the rest of the code.

Future versions may subdivide components further; we guarantee that we will only place them in folders (ex `components/`, `icons/`, or a new `js/`) to avoid top-level namespace collisions.

### Alternative layouts and example (`minimal`)

Users can develop custom layouts that compose, omit, or add components differently. We provide one first-class example titled `minimal`, inspired by Kevin Lin's work in [just-the-class](https://github.com/kevinlin1/just-the-class). This `minimal` layout does not render the sidebar, header, or search. To see an example, visit the [minimal layout test]({{site.baseurl}}/docs/minimal-test/) page.

Here is a simplified code example of what it looks like:

{% raw %}

```liquid
<!-- a simplified version of _layouts/minimal.html -->
<html>
{% include head.html %}
<body>
  {% include icons/icons.html %}
  {% comment %} Bandaid fix for breadcrumbs here! {% endcomment %}
  {% include components/breadcrumbs.html %}

  {% if site.heading_anchors != false %}
    {% include vendor/anchor_headings.html html=content ... %}
  {% else %}
    {{ content }}
  {% endif %}

  {% if page.has_children == true and page.has_toc != false %}
    {% include components/children_nav.html %}
  {% endif %}

  {% include components/footer.html %}

  {% if site.mermaid %}
    {% include components/mermaid.html %}
  {% endif %}
</body>
</html>
```

{% endraw %}

This layout is packaged in Just the Docs. Users can indicate this alternative layout in page front matter:

{% raw %}

```
---
layout: minimal
title: Minimal layout test
---
```

{% endraw %}

Similarly, users and developers can create other alternative layouts using Just the Docs' reusable includable components.

### Default layout and inheritance chain

Under the hood,

- `default` and `minimal` inherit from the `table_wrappers` layout, which wraps all HTML `<table>` tags with a `div .table-wrapper`
- `table_wrappers` inherits from `vendor/compress`, which is a local copy of Anatol Broder's [jekyll-compress-html](https://github.com/penibelst/jekyll-compress-html) Jekyll plugin

Note that as of now, `minimal` and `default` have no inheritance relationship.

### Overridden default Jekyll layouts

By default, Jekyll (and its default theme `minima`) provide the `about`, `home`, `page`, and `post` layouts. In Just the Docs, we override all of these layouts with the `default` layout. Each of those layouts is simply:

{% raw %}

```
---
layout: default
---

{{ content }}
```

{% endraw %}
