---
title: Migration and Upgrading
layout: default
---

# Migrating and Upgrading

Summary
:   A site that uses `just-the-docs` (as a theme or as a remote theme) automatically
    switches to a new release, unless it is pinned to a previous version.

    This migration guide draws attention to:

    - changes that might break your site,
    - features added in the latest release, and
    - features that have become deprecated (and are likely to be removed in a future release).

This document contains instructions on how to migrate and upgrade Just the Docs sites from every minor or major version bump, starting from `v0.3.3` to `v0.4.0`.

## Pinning the Theme Version
{: .no_toc }

Users who have not pinned the theme version will be **automatically upgraded to the latest version the next time they build their site**.

To use a specific release explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.10.0 # replace 0.10.0 with your desired version
```

To use a specific version explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.10.0" # replace 0.10.0 with your desired version
```

{: .warning }
> If your configuration states `remote_theme: just-the-docs/just-the-docs`, your
> website is built using the current `main` branch of the theme, which may include
> changes made after the latest release; see the [CHANGELOG].
>
> If your configuration states `theme: just_the_docs` and your `Gemfile` specifies
> `gem "just-the-docs"`, your website is always built using the latest release.

{: .note }
> If you have cloned/forked and customised the theme repo,
> and pull the changes of a new release to your clone,
> you may need to resolve merge conflicts.


## Table of Contents
{: .no_toc }

<details open markdown="block">
  <summary>
    All migration versions (click to expand/collapse)
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

{::options toc_levels="2..4" /}

[CHANGELOG]: {% link CHANGELOG.md %}

## v0.10.x - v0.11.0

### POTENTIALLY-BREAKING CHANGES in v0.11.0

There are some minor potentially-breaking changes for users in version `v0.11.0`. **They do not affect the vast majority of users**. They concern:

1. the removal of the `OneLightJekyll` and `OneDarkJekyll` syntax highlighting themes
  - **explicit migration only necessary if users have custom code that imports these themes**
2. the removal of the deprecated `legacy_light` color scheme
  - **explicit migration only necessary if users have `theme: legacy_light` in their `_config.yml`**
3. minor changes to the behaviour of `.site-footer` (the "nav footer", "This site uses Just the Docs...") within the sidebar
  - **explicit migration necessary if**:
    1. **users have a custom `_includes/components/sidebar.html` and/or `_includes/components/footer.html`**
    2. **users have custom code or logic that relies on `.site-footer` outside of `_includes/nav_footer_custom.html`**

Additionally, the theme makes style changes that are "non-breaking" (in that they do not stop code from compiling, or core functional behavior) but do significantly affect some components. These are briefly documented in case users would like to revert them, though we discourage this.

#### Removal of OneLightJekyll and OneDarkJekyll syntax highlighters

The `OneLightJekyll` and `OneDarkJekyll` syntax highlighting themes (designed for rouge, using pygments-compatible stylesheets) have been removed in favour of the new `github-light` and `github-dark` syntax highlighting themes, which meet WCAG 2.1 AA color contrast guidelines.

Migration is only needed if users have custom code that uses `_sass/vendor/OneDarkJekyll` and `_sass/vendor/OneLightJekyll` (e.g. if a custom theme imports from these folders).

We encourage users to migrate to the new, higher-contrast syntax themes.

To migrate:

- to switch to the new themes,
  - replace `_sass/vendor/OneDarkJekyll/syntax.scss` with `_sass/vendor/accessible-pygments/github-dark.scss`
  - replace `_sass/vendor/OneLightJekyll/syntax.scss` with `_sass/vendor/accessible-pygments/github-light.scss`
- to keep the old themes, pull the relevant folders from [release v0.10.2](https://github.com/just-the-docs/just-the-docs/releases/tag/v0.10.2)  (not recommended)

#### Removal of deprecated `legacy_light` color scheme

The `legacy_light` color scheme, first deprecated in `v0.4.0`, has now been removed.

Migration is only needed if users have `theme: legacy_light` in their `_config.yml`.

We encourage users to migrate to the new scheme.

To migrate:

- to switch to the new scheme, change `theme: legacy_light` to `theme: light`
- to use the old scheme, pull the `_sass/color_schemes/legacy_light.scss` file from [release v0.10.2](https://github.com/just-the-docs/just-the-docs/releases/tag/v0.10.2) (not recommended)

#### Updated site footer behavior

The nav footer (`.site-footer`, "This site uses Just the Docs...") has been updated to fix several different accessibility issues (incorrect tab order on the `sm`/mobile viewport, duplicate `contentinfo` ARIA roles). In most cases, this causes no visual changes to the site. A side effect is that half of this footer's markup now lives in `_includes/components/footer.html`.

Migration is only needed if:

- users have a custom `_includes/components/sidebar.html` or `_includes/components/footer.html`
- users have custom code for the site footer *outside* of using `nav_footer_custom.html` (relatively uncommon)

To migrate, users should:

1. first, check if they have a custom `_includes/components/sidebar.html` or `_includes/components/footer.html`. If so, they should port over:
  - for `footer.html`: [#1754](https://github.com/just-the-docs/just-the-docs/pull/1754) and [#1755](https://github.com/just-the-docs/just-the-docs/pull/1755)
  - for `sidebar.html`: [#1751](https://github.com/just-the-docs/just-the-docs/pull/1751) and [#1754](https://github.com/just-the-docs/just-the-docs/pull/1754)
2. whether or not the previous step required a change, they should now inspect the nav footer in both the `sm` and `md` viewport. If adjustments are necessary, we recommend editing `nav_footer_custom.html`

### STYLE CHANGES in v0.11.0

This version changes the *styling* of many different components in Just the Docs to better meet accessibility standards (more specifically, [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/)). We strongly encourage all users to follow these accessibility standards. However, these style changes may inadvertently clash with other customizations that users have made.

This list includes a brief description of each style change. To revert, we recommend users to override the change with [custom styles]({{site.baseurl}}/docs/customization/#override-and-completely-custom-styles) or [custom variables]({{site.baseurl}}/docs/customization/#override-and-define-new-variables) (rather than replacing theme `_scss` files), which will future-proof their site from future changes.

- changed `btn-blue`, `btn-green`, `label-green`, and `label-red` to have stronger color contrast in [#1750](https://github.com/just-the-docs/just-the-docs/pull/1750)
- changed callout styling to have stronger color contrast in [#1748](https://github.com/just-the-docs/just-the-docs/pull/1748)
  - this change removes the tinted background color and makes the outline stronger; additionally, it now ignores `opacity`
  - to revert this change, users will need to edit `_includes/css/callouts.scss.liquid` (instead of custom variables/styles)
  - note: callouts still have fundamental accessibility issues. We are currently working on a different solution and will likely deprecate their styling in a future release.
- changed `$link-color` to have stronger dark-theme color contrast in [#1752](https://github.com/just-the-docs/just-the-docs/pull/1752)
- changed `.nav-list-link`'s `:hover` and `:active` to have stronger color contrast in [#1753](https://github.com/just-the-docs/just-the-docs/pull/1753)
- changed `site.footer_content` and the `footer_custom` include to have stronger color contrast in [#1755](https://github.com/just-the-docs/just-the-docs/pull/1755)

Additionally, see the breaking changes section for details on new syntax highlighting themes.

## v0.9.x - v0.10.0

There are no potentially-breaking changes in v0.10.0.

## v0.8.x - v0.9.0

There are no potentially-breaking changes in v0.9.0.

## v0.7.x - v0.8.0

There are no potentially-breaking changes in v0.8.0.

## v0.6.x - v0.7.0

### POTENTIALLY-BREAKING CHANGES in v0.7.0

There are some *very minor* potentially-breaking changes for users in version `v0.7.0`. **They do not affect the vast majority of users**; however, this may affect users of (undocumented) internal theme structure. They concern:

1. the movement of `_includes/nav.html`, which has moved to `_includes/components/nav.html`
  - **explicit migration only necessary if users have overridden `_includes/nav.html`**
2. the addition of `<script>` tags with `id`s `jtd-nav-activation` and `jtd-head-nav-stylesheet`
  - **explicit migration only necessary if users have existing elements with those IDs**

#### Moved Include

Version `v0.7.0` has moved (and changed the contents of) `_includes/nav.html`; it is now in `_includes/components/nav.html`. This means that user overrides for the component will *no longer be loaded*, reverting to the Just the Docs default.

Users who have overridden this `_includes` should:

1. copy in the new upstream `_includes/components/nav.html` into their site
2. port over any changes from their custom `_includes/nav.html`

No other changes are necessary.

#### New Script IDs

Version `v0.7.0` adds the `id`s `jtd-nav-activation` and `jtd-head-nav-stylesheet` to some existing script tags. This will cause errors for users that have their own custom components with those IDs.

Users who have elements with those `id`s should rename their elements to avoid a collision.

## v0.5.x - v0.6.0

### POTENTIALLY-BREAKING CHANGES in v0.6.0

There are some *very minor* potentially-breaking changes for users in version `v0.6.0`. **They do not affect the vast majority of users**; however, this may affect users of (undocumented) internal theme structure. They concern:

1. the addition of new `_includes/favicon.html`, `_includes/head_nav.html`, and `_includes/css/activation.scss.liquid`
  - **explicit migration only necessary if users have defined a custom file with the same name**
2. removing `id="main-content-wrap` from wrapper `div` elements in default layouts
  - **explicit migration only necessary if users have written code that depends on `#main-content-wrap`**
3. loading the new `$color-scheme` variable (from the light scheme by default)
  - **explicit migration only necessary if users have overridden the base light theme**
4. caching the favicon for the entire site
  - **explicit migration only necessary if users have different favicons for different pages**

#### New Includes

Version `v0.6.0` introduces three new `_includes` files:

- `_includes/favicon.html`, which now contains logic previously in `_includes/head.html`: loading `favicon.ico` if no favicon is specified
- `_includes/head_nav.html`, which generates CSS used for the new efficient navigation implementation
- `_includes/css/activation.scss.liquid`, which is used by `head_nav` for navigation implementation

If users have existing `_includes` files with this name, they should be renamed (and imported with their new name) prior to upgrading to `0.6.0`. No other change is necessary.

#### Removed `#main-content-wrap`

In `_layouts/default.html` and `_layouts/minimal.html`, the `id="main-content-wrap"` has been removed from the wrapper div (in part due to a bug with multiple `id`s on one element). Internally, our theme *does not use* these `id`s; for most users, this does not require any action.

However, code that relies on this `id` must be changed. Each of the related elements still has the unique class `.main-content-wrap`, and can be selected with this class. For example, in CSS:

```css
/* OLD */
#main-content-wrap { /* ... */ }

/* NEW */
.main-content-wrap { /* ... */ }
```

Or in JS:

```js
// OLD
document.getElementById("main-content-wrap");

// NEW
document.getElementsByClassName("main-content-wrap")[0];
```

#### New `$color-scheme` variable

The theme now properly sets the `color-scheme` property. To do so, the new `$color-scheme` SCSS variable has been created. The variable has been added to the default `light` scheme, which is *always* loaded by Just the Docs.

Migration is only needed if:

- the packaged `light` scheme has been *overridden* (this is *not* the same as using a custom scheme)
- or, the scheme logic to always load `light` has been changed

(neither of these behaviours are recommended by Just the Docs)

In either of these cases, users should add a `$color-scheme` SCSS variable to their active scheme with the appropriate value (see: [MDN docs on `color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)).

```scss
$color-scheme: light !default;
```

#### Cached favicon

Version `v0.6.0` adds a new `_include` that caches the favicon for the entire site. This significantly improves page build times for large sites.

However, some users may load different favicons for each page (and/or dynamically change the first favicon load). In this case, they should override the logic in `_includes/favicon.html` by **replacing** it with an empty file (this is *different* from deleting it). No further migration is necessary.

## v0.4.x - v0.5.0

### POTENTIALLY-BREAKING CHANGES in v0.5.0

There is one potentially-breaking change for users migrating from `v0.4.2` to `v0.5.0` concerning `setup.scss`. To provide context:

1. `setup.scss` was introduced in `v0.4.0`
2. in `v0.4.0` and `v0.4.1`, `setup.scss` was imported *before* color scheme SCSS code
3. in `v0.4.2`, we adjusted the order to import `setup.scss` *after* color scheme SCSS code
4. in `v0.5.0`, we have reverted the previous change: `setup.scss` is now again imported *before* color scheme SCSS code

This does not affect most users. Users who did not migrate to `v0.4.2` or who do not have a custom `setup.scss` are guaranteed no breaking changes.

Explicit migration steps are only needed if:

1. a custom `setup.scss` has been defined,
2. **and** the `setup.scss` depends on variables or functions defined in color scheme SCSS code; this change was only possible on `v0.4.2`

For those users, we suggest moving those variables and functions to each relevant color scheme.
## v0.3.3 … v0.4.x

### REPOSITORY CHANGES

#### Just the Docs

The theme repo is now at <https://github.com/just-the-docs/just-the-docs>.
The name of its default branch is now `main`.

The theme docs website is now published at <https://just-the-docs.github.io/just-the-docs>. We've also retroactively published the theme docs website for version `v0.3.3` at <https://v0-3-3-docs.just-the-docs.com/>.

GitHub provides access to previous versions of the theme repo.
You can browse [previous versions of the theme docs website] on the [Internet Archive].

[previous versions of the theme docs website]: https://web.archive.org/web/20220000000000*/https://just-the-docs.github.io/just-the-docs
[Internet Archive]: https://web.archive.org/

The [README] page on the theme repo repeats much of the information from the [home page],
formatted for browsing on GitHub.
It also explains how to install the theme as a Ruby Gem, without creating a new site.

[README]: https://github.com/just-the-docs/just-the-docs/blob/main/README.md
[home page]: https://just-the-docs.com

#### Deploy previews

When a PR builds successfully, Netlify provides a preview of how the theme docs website will look if the PR is merged.
You can find links to the preview near the bottom of the Conversation tab of the PR.

#### Just the Docs Template

The template at <https://github.com/just-the-docs/just-the-docs-template>
creates a repo with the minimal source files for a Just the Docs website.
After configuring the relevant parameters, you can build and serve the website
both locally and on GitHub Pages – using either Jekyll 3 or Jekyll 4!

#### Just the Docs Tests

The tests website at <https://just-the-docs.github.io/just-the-docs-tests>
consists mainly of regression tests for bug fixes and new features.

The test source files at <https://github.com/just-the-docs/just-the-docs-tests>
illustrate the use of many Markdown and Jekyll features,
including some that are not included in the theme docs.

For example, see how to add support for rendering TeX/LaTeX [math formulas] with KaTeX and MathJax.

[math formulas]: https://just-the-docs.github.io/just-the-docs-tests/components/math/index/

### POTENTIALLY-BREAKING CHANGES in v0.4.0

If switching to a new release of the theme breaks your website,
check that you don't have any files in the `_includes`, `_layouts`, and `_sass`
directories with the same names as files provided by the theme.

If your repo has a customised copy of `_layouts/default.html` from a previous release,
try removing it, or replace it by a fresh copy of the theme file.

{: .warning }
The following changes made in v0.4.0 *might* break or adversely affect your website
when you next rebuild it, unless you have pinned it!

#### New includes and SCSS

Version 0.4.0 introduces many new `_includes` files. If you already have an existing include with the same name as a new addition, you will need to migrate or update that include. The new files are (relative to the `_includes` folder):

- `mermaid_config.js`
- `nav_footer_custom`
- `search_placeholder_custom`
- `toc_heading_custom`
- the entire `components/` folder:
  - `aux_nav`, `breadcrumbs`, `children_nav`, `footer`, `header`, `mermaid`, `search_footer`, `search_header`, `sidebar`
- the entire `icons/` folder
  - `code_copy`, `document`, `expand`, `external_link`, `icons`, `link`, `menu`, `search`
- the entire `lunr/` folder
  - `custom-data.json`, `custom-index.js`

We have removed some code in `_sass/vendor` and added a new file at `_sass/custom/setup.scss`.

#### favicons

The file `_includes/favicon.html` is now ignored by the theme.
If you're using it, your website's favicon is no longer displayed by browsers.

To fix: Move the content of `_includes/favicon.html` to `_includes/head_custom.html`.

#### Custom callout colors

The file `_sass/custom/custom.scss` is now imported last: _after_ the configuration of callouts.
If you've defined custom color variables for callouts in `_sass/custom/custom.scss`
(and used them when configuring your callouts in `_config.yml`)
you will not be able to rebuild your website.

To fix: Move custom color variables for callouts in `_sass/custom/custom.scss` to `_sass/custom/variables.scss`.

#### Pages and collections

Links to ordinary pages now appear in the navigation on sites that use collections.
You might want the navigation of your site to consist entirely of collections.

To fix: Add the front matter `nav_exclude: true` to pages that the navigation should not display.

#### Relative URLs

All generated URLs are now relative.
This is a bug fix, and unlikely to break any site.

Relative links to pages within a website support deployment to different servers.

#### Navigation order

The order in which the navigation panel lists pages has been simplified.
All pages with `nav_order` values now come before all pages that are ordered by `title`.

If your website has a group of *sibling* pages where some siblings have `nav_order`
string values, and others are ordered by numerical `title` values,
the former now come before the latter.

To fix: Add numerical `nav_order` values to the pages with numerical `title` values.

### DEPRECATIONS

{: .warning }
The following features are deprecated, and to be removed in a future release.

#### Jekyll 3

You can still use Jekyll 3 (3.8.5 or later) to build websites using v0.4.0 of the theme.
However, future releases of the theme may require the use of Jekyll 4.

You can already use Jekyll 4 to build your website *locally*.
It should look exactly the same as when built with Jekyll 3.[^Jekyll4]

[^Jekyll4]:
    Jekyll 4 depends on more recent versions of other gems than Jekyll 3,
    and the differences between those versions may affect the files of your built site.

To use Jekyll 4 when building your website *on GitHub Pages*, you need to run GitHub Actions.
The simplest way of setting that up in a new repo is to create the repo using the Just the Docs template.
To start running Jekyll 4 to build an existing repo on GitHub Pages,
you can create a new repo with the template, then copy its `.github/workflows` directory,
and update your repo settings to use Actions.

#### Footer content configuration

Currently, if your configuration sets `footer_content` to some text,
the theme displays that text at the bottom of the main section of each page.

The file `_includes/footer_custom.html` provides a more general way of customizing
not only the text but also the markup for the page footer area.

You can replicate the current display of `TEXT` in the footer using the following markup:

```html
<p class="text-small text-grey-dk-100 mb-0">TEXT</p>
```

### THEME WEBSITE CHANGES

The website now uses *callouts*[^callouts] to draw attention to important information.

[^callouts]:
    The theme website configuration defines the callout titles and colors used there.
    Websites that use the theme have to configure their own callout titles and colors.

The theme uses [semantic versioning].
A normal version number takes the form X.Y.Z,
where X is the major version, Y is the minor version, and Z is the patch version.
The theme uses version X.Y.Z.rcN for pre-release N of version X.Y.Z.
When referring to version numbers on GitHub, we usually prefix them by 'v'.

[semantic versioning]: https://semver.org

Major version zero (0.Y.Z) is for initial development, where anything *may* change at any time.
In practice, we increment the patch version Z for bug fixes and backwards compatible changes;
we increment the minor version Y for changes that could break websites using the theme
without pinning it to a specific version.

The label `NEW` in the theme website indicates a feature that has been changed or added
since the release of the previous *minor* version.
For example, after the release of v0.4.Z, the theme website should label `NEW` all features that
we have changed or added since v0.3.0 – not just since v0.3.3.
When we release v0.5.0, we will remove all those labels, and add labels on features since v0.4.0.

The theme docs website is not itself versioned.
It changes incrementally, independently of theme releases.

#### Home page

The theme home page now focuses on the simplest ways of using the theme.
It also notes the different behaviour of `theme` and `remote_theme` in connection
with interim versions of the theme, such as pre-releases.

#### CHANGELOG

The CHANGELOG page lists the changes made in all previous releases and pre-releases of new versions of the theme gem.

It also lists changes made to the `main` branch of the theme since the latest release or pre-release.

For changes since v0.3.3, the log usually references the merged PR that made the change and its author.

### NON-BREAKING CHANGES (OUTLINE ONLY)

#### Accessibility

- Skip to main content: the first keyboard-navigatable item is now a link to skip over the sidebar and header to the main content of the page. PR: [#949].
- Aria-labels: improved `aria-label`s have been added to various site elements. PRs: [#950], ...
- Other general improvements: gradual changes have improved tab focusability, contrast, and semantic elements. More work still to come. PRs: [#498], [#846]

#### Configuration

- Mermaid support: first-class support for [Mermaid](https://mermaid.js.org/) - a JavaScript-based diagram and charting tool supported by GitHub - has been added to the theme. **This feature is opt-in.** See the new doc subsections in [Configuration]({% link docs/configuration.md %}#mermaid-diagrams) and [Code]({% link docs/ui-components/code/index.md %}#mermaid-diagram-code-blocks) for more.
- Multiple Google Analytics tags are now supported. PR: [#1029]

#### Customization

- all user-facing text is now customizable; previously, several elements (ex search placeholder) were hardwired into the theme. Now, users can blend custom includes and layouts to internationalize their sites.
- we've clarified the role of `custom.scss` to be imported last; to allow users to define custom or override variables, we've added a new file `setup.scss`. PR: [#1135]

#### Custom Includes

We've added several custom `_includes` to provide users with more customization options for different site elements. We've also added a section to [Configuration]({% link docs/customization.md %}#override-includes) to outline these.

All of these are opt-in by default; however, **these may be breaking if you have existing `_includes` with the same name**.

Each item is listed with the relevant file and PR.

- TOC heading: `toc_heading_custom.html`, PR: [#980]
- Navigation panel footer: `nav_footer_custom.html`, PR: [#474]
- Search placeholder: `search_placeholder_custom.html`, PR: [#613]
- Modular site components: `components/` and `icons/`, PR: [#1058]
- Custom search indices: `lunr/`, PR: [#1068]

In a future (version 1) release, we may rename the custom include files.

#### Modular Components

We've broken up the default layout (`_layouts/default.html`) into multiple reusable components. This should have no impact on most users; however, it should make it easier to implement custom layouts.

For more, see [Custom layouts and includes]({% link docs/customization.md %}#custom-layouts-and-includes). PR: [#1058].

#### Navigation

- Collections: nav panel shows links to ordinary pages before collections
- Collection folding; part of "Combination". PR: [#578]
- Scrolling to show link to selected page. PR: [#639]
- External nav links are now supported. PR: [#876]
- Child nav order: sort navigation pages with `child_nav_order`. PR: [#726]
- Order when mixing different ways of specifying nav order

#### Search

In addition to customizing the search placeholder, we've also added the ability to provide custom content to the search index. for more, see [Custom content for search index]({% link docs/search.md %}#custom-content-for-search-index). PR: [#1068].

#### Styling

- Code copying: code blocks now allow users to easily copy their contents. PR: [#945]
- Blockquote: shows vertical bar on left. PR: [#965]
- Links wrap. PR: [#905]
- Callouts: a new component similar to alerts or banners. See [UI Components - Callouts]({% link docs/ui-components/callouts.md %}). PR: [#466]

----

[#856]: https://github.com/just-the-docs/just-the-docs/pull/856
[#806]: https://github.com/just-the-docs/just-the-docs/pull/806
[#555]: https://github.com/just-the-docs/just-the-docs/pull/555
[#814]: https://github.com/just-the-docs/just-the-docs/pull/814
[#778]: https://github.com/just-the-docs/just-the-docs/pull/778
[#221]: https://github.com/just-the-docs/just-the-docs/pull/221
[#782]: https://github.com/just-the-docs/just-the-docs/pull/782
[#549]: https://github.com/just-the-docs/just-the-docs/pull/549
[#554]: https://github.com/just-the-docs/just-the-docs/pull/554
[#499]: https://github.com/just-the-docs/just-the-docs/pull/499
[#473]: https://github.com/just-the-docs/just-the-docs/pull/473
[#835]: https://github.com/just-the-docs/just-the-docs/pull/835
[#891]: https://github.com/just-the-docs/just-the-docs/pull/891
[#906]: https://github.com/just-the-docs/just-the-docs/pull/906

[#578]: https://github.com/just-the-docs/just-the-docs/pull/578
[#463]: https://github.com/just-the-docs/just-the-docs/pull/463
[#448]: https://github.com/just-the-docs/just-the-docs/pull/448
[#466]: https://github.com/just-the-docs/just-the-docs/pull/466
[#477]: https://github.com/just-the-docs/just-the-docs/pull/477
[#495]: https://github.com/just-the-docs/just-the-docs/pull/495
[#496]: https://github.com/just-the-docs/just-the-docs/pull/496
[#498]: https://github.com/just-the-docs/just-the-docs/pull/498
[#494]: https://github.com/just-the-docs/just-the-docs/pull/494
[#639]: https://github.com/just-the-docs/just-the-docs/pull/639
[#544]: https://github.com/just-the-docs/just-the-docs/pull/544
[#364]: https://github.com/just-the-docs/just-the-docs/pull/364
[#498]: https://github.com/just-the-docs/just-the-docs/pull/498
[#613]: https://github.com/just-the-docs/just-the-docs/pull/613
[#726]: https://github.com/just-the-docs/just-the-docs/pull/726
[#474]: https://github.com/just-the-docs/just-the-docs/pull/474
[#829]: https://github.com/just-the-docs/just-the-docs/pull/829
[#857]: https://github.com/just-the-docs/just-the-docs/pull/857
[#876]: https://github.com/just-the-docs/just-the-docs/pull/876
[#909]: https://github.com/just-the-docs/just-the-docs/pull/909
[#519]: https://github.com/just-the-docs/just-the-docs/pull/519
[#855]: https://github.com/just-the-docs/just-the-docs/pull/855
[#686]: https://github.com/just-the-docs/just-the-docs/pull/686
[#495]: https://github.com/just-the-docs/just-the-docs/pull/495
[#846]: https://github.com/just-the-docs/just-the-docs/pull/846
[#727]: https://github.com/just-the-docs/just-the-docs/pull/727
[#889]: https://github.com/just-the-docs/just-the-docs/pull/889
[#893]: https://github.com/just-the-docs/just-the-docs/pull/893
[#905]: https://github.com/just-the-docs/just-the-docs/pull/905
[#898]: https://github.com/just-the-docs/just-the-docs/pull/898

[#950]: https://github.com/just-the-docs/just-the-docs/pull/950
[#944]: https://github.com/just-the-docs/just-the-docs/pull/944
[#939]: https://github.com/just-the-docs/just-the-docs/pull/939
[#949]: https://github.com/just-the-docs/just-the-docs/pull/949
[#941]: https://github.com/just-the-docs/just-the-docs/pull/941
[#956]: https://github.com/just-the-docs/just-the-docs/pull/956
[#935]: https://github.com/just-the-docs/just-the-docs/pull/935
[#940]: https://github.com/just-the-docs/just-the-docs/pull/940
[#951]: https://github.com/just-the-docs/just-the-docs/pull/951
[#955]: https://github.com/just-the-docs/just-the-docs/pull/955
[#937]: https://github.com/just-the-docs/just-the-docs/pull/937

[#965]: https://github.com/just-the-docs/just-the-docs/pull/965
[#960]: https://github.com/just-the-docs/just-the-docs/pull/960
[#962]: https://github.com/just-the-docs/just-the-docs/pull/962
[#964]: https://github.com/just-the-docs/just-the-docs/pull/964
[#967]: https://github.com/just-the-docs/just-the-docs/pull/967
[#974]: https://github.com/just-the-docs/just-the-docs/pull/974
[#980]: https://github.com/just-the-docs/just-the-docs/pull/980
[#985]: https://github.com/just-the-docs/just-the-docs/pull/985
[#986]: https://github.com/just-the-docs/just-the-docs/pull/986
[#992]: https://github.com/just-the-docs/just-the-docs/pull/992

[#945]: https://github.com/just-the-docs/just-the-docs/pull/945
[#999]: https://github.com/just-the-docs/just-the-docs/pull/999
[#1000]: https://github.com/just-the-docs/just-the-docs/pull/1000
[#1001]: https://github.com/just-the-docs/just-the-docs/pull/1001
[#1010]: https://github.com/just-the-docs/just-the-docs/pull/1010
[#1015]: https://github.com/just-the-docs/just-the-docs/pull/1015
[#1018]: https://github.com/just-the-docs/just-the-docs/pull/1018
[#1019]: https://github.com/just-the-docs/just-the-docs/pull/1019
[#1021]: https://github.com/just-the-docs/just-the-docs/pull/1021
[#1027]: https://github.com/just-the-docs/just-the-docs/pull/1027
[#1029]: https://github.com/just-the-docs/just-the-docs/pull/1029
[#1040]: https://github.com/just-the-docs/just-the-docs/pull/1040
[#1061]: https://github.com/just-the-docs/just-the-docs/pull/1061
[#1065]: https://github.com/just-the-docs/just-the-docs/pull/1065
[#1071]: https://github.com/just-the-docs/just-the-docs/pull/1071
[#1074]: https://github.com/just-the-docs/just-the-docs/pull/1074
[#1076]: https://github.com/just-the-docs/just-the-docs/pull/1076
[#1077]: https://github.com/just-the-docs/just-the-docs/pull/1077
[#1090]: https://github.com/just-the-docs/just-the-docs/pull/1090
[#1091]: https://github.com/just-the-docs/just-the-docs/pull/1091
[#1092]: https://github.com/just-the-docs/just-the-docs/pull/1092
[#1095]: https://github.com/just-the-docs/just-the-docs/pull/1095

[#1068]: https://github.com/just-the-docs/just-the-docs/pull/1068
[#1135]: https://github.com/just-the-docs/just-the-docs/pull/1135
