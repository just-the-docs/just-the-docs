---
title: MIGRATION v0.3.3 … v0.4.x (DRAFT)
layout: default
---

# Just the Docs User Website Migration Guide v0.3.3 … v0.4.x

Summary
:   A site that uses `just-the-docs` (as a theme or as a remote them) automatically
    switches to a new release, unless it is pinned to a previous version.
    
    This migration guide draws attention to:
    
    - changes that might break your site,
    - features added in the latest release, and 
    - features that have become deprecated (and are likely to be removed in a future release).

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

{::options toc_levels="2..4" /}

{: .warning }
> If your configuration states `remote_theme: just-the-docs/just-the-docs`, your
> website is built using the current `main` branch of the theme, which may include
> changes made after the latest release; see the [CHANGELOG].
>
> If your configuration states `theme: just the docs` and your `Gemfile` specifies
> `gem "just-the-docs"`, your website is always built using the latest release.

{: .note }
> If you have cloned/forked and customised the theme repo,
> and pull the changes of a new release to your clone,
> you may need to resolve merge conflicts.

[CHANGELOG]: {{ site.baseurl }}{% link CHANGELOG.md %}

## REPOSITORY CHANGES

### Just the Docs

The theme repo is now at <https://github.com/just-the-docs/just-the-docs>.
The name of its default branch is now `main`.

The theme docs website is now published at <https://just-the-docs.github.io/just-the-docs>.

GitHub provides access to previous versions of the theme repo.
You can browse previous versions of the theme docs  website on the [Internet Archive].

[Internet Archive]: https://web.archive.org/

The README page on the theme repo repeats much of the information from the home page,
formatted for browsing on GitHub.
It also explains how to install the theme as a Ruby Gem, without creating a new site.

### Deploy previews

When a PR builds successfully, Netlify provides a preview of how the theme docs website will look if the PR is merged.
You can find links to the preview near the bottom of the Conversation tab.

### Just the Docs Template

The template at <https://github.com/just-the-docs/just-the-docs-template> 
creates a repo with the minimal source files for a Just the Docs website.
After configuring the relevant parameters, you can build and serve the website
both locally and on GitHub Pages – using either Jekyll 3 or Jekyll 4!

### Just the Docs Tests

The tests website at <https://just-the-docs.github.io/just-the-docs-tests>
consists mainly of regression tests for bug fixes and new features.

The test source files at <https://github.com/just-the-docs/just-the-docs-tests>
illustrate the use of many Markdown and Jekyll features,
including some that are not included in the theme docs.

For example, see how to add support for rendering TeX/LaTeX [math formulas] with KaTeX and MathJax.

[math formulas]: https://just-the-docs.github.io/just-the-docs-tests/components/math/index/

## POTENTIALLY-BREAKING CHANGES in v0.4.0

If switching to a new release of the theme breaks your website,
check that you don't have any files in the `_includes`, `_layouts`, and `_sass`
directories with the same names as files provided by the theme.

If your repo has a customised copy of `_layouts/default.html` from a previous release,
try removing it, or replace it by a fresh copy of the theme file.

{: .warning }
The following changes made in v0.4.0 *might* break or adversely affect your website!

### favicons

The file `_includes/favicon.html` is now ignored by the theme.

To fix: move the content of `_includes/favicon.html` to `_includes/head_custom.html`.

### Custom callout colors

The file `_sass/custom/custom.scss` is now imported _after_ the configuration of callouts.

To fix: move custom color variables for callouts in `_sass/custom/custom.scss` to `_sass/custom/variables.scss`.

### Pages and collections

Links to ordinary pages now appear in the navigation also on sites that use collections.

To fix: add front matter `nav_exclude: true` to pages that are not to be shown in the navigation.

### Relative URLs

All generated URLs are now relative.

Relative links to pages within a website support deployment to different servers.

### Navigation order

The order in which pages are listed in the navigation panel has been simplified.
All pages with `nav_order` values now come before all pages that are ordered by `title`,
with number-ordered pages preceding those string-ordered pages ordered by the same variable.

If your website has a group of *sibling* pages where some siblings have `nav_order`
string values and others are ordered by numerical `title` values,
you can obtain the previous order by adding `nav_order` values to the latter pages.

## DEPRECATIONS

{: .warning }
The following features are deprecated, and to be removed in a future release.

### Jekyll v3

You can still use Jekyll 3 (v3.8.5 or later) to build websites using v0.4.0 of the theme.
However, some future release of the theme will use Jekyll 4 features;
to take advantage of that release, you will need to stop using Jekyll 3 for Just the Docs websites.

You can already use Jekyll 4 to build your website locally.
The only difference that you should notice is that the build is much quicker.
The appearance of your website shouldn't change,

To use Jekyll 4 when building your website on GitHub Pages, you need to run GitHub Actions.
The simplest way of setting that up in a new repo is to create the repo using the Just the Docs template.
To start running Jekyll 4 to build an existing repo on GitHub Pages,
you can create a new repo with the template, then copy its `.github/workflows` directory,
and update your repo settings to use Actions.

### Footer content configuration

Currently, if your configuration sets `footer_content` to some text,
the theme displays that text at the bottom of the main section of each page.

The file `_includes/footer_custom.html` provides a more general way of customizing
not only the text but also the markup for the page footer area.

You can replicate the current display of `TEXT` in the footer using the following markup:

```html
<p class="text-small text-grey-dk-100 mb-0">TEXT</p>
```

## THEME WEBSITE CHANGES

The website now uses *callouts*[^callouts] to draw attention to important information.

[^callouts]:
    The theme website configuration defines the callout titles and colors used there.
    Websites that use the theme have to configure their own callout titles and colors.

The label `NEW` in the theme docs indicates something that has changed or been added
since the release of the previous *minor* version.[^minor]
(The theme docs website is not versioned.)

[^minor]:
    With semantic versioning, the minor version number of `v0.y.z` is `y`.
    The major version number `0` indicates that the theme is still in the initial development phase,
    where features may change also between 'patches'.

### Home page

The theme home page now focuses on the simplest ways of using the theme.
It also notes the different behaviour of `theme` and `remote_theme` in connection
with interim versions of the theme, such as pre-releases.

### CHANGELOG

The CHANGELOG page lists the changes made in all previous releases and pre-releases of new versions of the theme gem.

It also lists changes made to the `main` branch of the theme since the latest release or pre-release.

For changes since v0.3.3, the log usually references the merged PR that made the change and its author.

## NON-BREAKING CHANGES (OUTLINE ONLY)

Brief descriptions of the following changes are to be added below.

### Accessibility

- Skip to main content
- Aria-labels

### Configuration

- Mermaid support

### Customization

- all generated text
- custom color variables
- custom.scss imported last

### Custom Includes

- TOC heading
- Footer
- Head and favicon
- Header
- Navigation panel footer
- Search placeholder

### Navigation

- Collections: nav panel shows links to ordinary pages before collections
- Collection folding
- Scrolling to show link to selected page
- External nav links
- Child nav order
- Order when mixing different ways of specifying nav order
- Generated links now relative

### Styling

- Code highlighting: dark mode changed to ...
- Block quote: shows vertical bar on left
- Links wrap
- Callouts

----
