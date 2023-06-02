---
title: CHANGELOG
layout: default
---

# CHANGELOG

All notable user-facing changes to this project are documented in this file.

{: .highlight }
The project underwent a major maintenance shift in March 2022.

## HEAD

{: .note }
This website is built from the `HEAD` of the `main` branch of the theme repository.

{: .warning }
This website includes docs for some new features that are not available in `v0.5.0`!

Code changes to `main` that are *not* in the latest release:

- Fixed: liquid variable leakage in navigation components by [@pdmosses] in [#1243]
- Fixed: ARIA roles and labels to search, header, logo, mobile menu button, and main content by [@joelhawksley] in [#1259]

Docs changes in `main` that are *not* in the latest release:

- N/A

[@joelhawksley]: https://github.com/joelhawksley

[#1243]: https://github.com/just-the-docs/just-the-docs/pull/1243
[#1259]: https://github.com/just-the-docs/just-the-docs/pull/1259

The theme docs website has a new canonical URL: <https://just-the-docs.com>. We've also retroactively published the theme docs website for version `v0.3.3` at <https://v0-3-3-docs.just-the-docs.com/>.

## Release v0.5.1

Hi all, this is a very small minor patch release that has two small behavioral bugfixes: fixing a regression introduced in `v0.5.0` on Safari versions `<16.4` (broken media query), and the copy code button providing incorrect feedback in insecure browser contexts. This should be a smooth upgrade with no breaking changes.

As always, we'd love your feedback. [Open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) for bug reports, feature requests, and any other feedback. Thanks for continuing to use Just the Docs!

### Using Release `v0.5.1`

Users who have not pinned the theme version will be **automatically upgraded to `v0.5.1` the next time they build their site**.

To use this release explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.5.1
```

To use this version explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.5.1"
```

To use and pin a previous version of the theme, replace the `0.5.1` with the desired release tag.

### Bugfixes


- Fixed: disable copy code button in insecure contexts [@rmoff] in [#1226]
- Fixed: context-based media feature not supported by Safari `<16.4` by [@mattxwang] in [#1240]

### Documentation

- Added: document copy code button requiring secure context by [@rmoff] in [#1225]
- Fixed: typo ("them" → "theme") in MIGRATION.md by [@waldyrious] in [#1219]
- Fixed: `font-weight` typo (Utilities > Typography) by [@mattxwang] in [#1229]
- Fixed: `just the docs` typo in migration guide by [@mattxwang] in [#1230]

### New Contributors
- [@rmoff] made their first contribution in [#1225]

[#1219]: https://github.com/just-the-docs/just-the-docs/pull/1219
[#1225]: https://github.com/just-the-docs/just-the-docs/pull/1225
[#1226]: https://github.com/just-the-docs/just-the-docs/pull/1226
[#1229]: https://github.com/just-the-docs/just-the-docs/pull/1229
[#1230]: https://github.com/just-the-docs/just-the-docs/pull/1230
[#1240]: https://github.com/just-the-docs/just-the-docs/pull/1240

[@rmoff]: https://github.com/rmoff

## Release v0.5.0

Hope your April is going well! This new release of Just the Docs is relatively minor. It has one **breaking change**: we've reverted the import order of `setup.scss` to be *before* color schemes. In addition, we include two requested fixes: color contrast issues with `::selection` and using Just the Docs with mermaid versions `>=10`.

We've marked this as a minor version bump due to the breaking change. In the next section, we briefly outline what migration steps should be. Users who did not migrate to `v0.4.2` or who do not have a custom `setup.scss` are guaranteed no breaking changes.

As always, we'd love your feedback. [Open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) for bug reports, feature requests, and any other feedback. Thanks for continuing to use Just the Docs!

### Migrating to `v0.5.0`

**Migration**: users with a custom `setup.scss` cannot rely on variables or functions defined in `color_scheme`. This reverts to the behaviour in `v0.4.1`. Users should instead move those variables or functions to the `color_scheme` files themselves.

For more, refer to the [migration guide](https://just-the-docs.com/MIGRATION/).

### Using Release `v0.5.0`

Users who have not pinned the theme version will be **automatically upgraded to `v0.5.0` the next time they build their site**.

To use this release explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.5.0
```

To use this version explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.5.0"
```

To use and pin a previous version of the theme, replace the `0.5.0` with the desired release tag.

### Bugfixes

- **Reverted (breaking)**: "Fix import order for `setup.scss` (#1184)" by [@mattxwang] in [#1209]
- Fixed: color contrast issues with `::selection` (reverting to browser defaults) [@mattxwang] in [#1208]
- Fixed: mermaid `v10`, bundle all mermaid code in component by [@mattxwang] in [#1190]
- Removed: unused images (`just-the-docs.png`, `search.svg`) by [@mattxwang] in [#1107]
- Removed: `CODE_OF_CONDUCT`, `docker-compose`, and `Dockerfile` files from site by [@mattxwang] in [#1187]

**Full Changelog**: [https://github.com/just-the-docs/just-the-docs/compare/v0.4.2...v0.5.0](https://github.com/just-the-docs/just-the-docs/compare/v0.4.2...v0.5.0)

[#1107]: https://github.com/just-the-docs/just-the-docs/pull/1107
[#1187]: https://github.com/just-the-docs/just-the-docs/pull/1187
[#1190]: https://github.com/just-the-docs/just-the-docs/pull/1190
[#1208]: https://github.com/just-the-docs/just-the-docs/pull/1208
[#1209]: https://github.com/just-the-docs/just-the-docs/pull/1209

## Release v0.4.2

Hello! We're back again with another small release. Like `v0.4.1`, this release is a [semver patch](https://semver.org/): it only includes bugfixes, and is fully backwards-compatible.

The big highlight of this theme is fixing our light scheme code highlighting contrast issues; this was one of our most-requested features! This change is fully backwards-compatible; users can [opt-in to our old highlighting theme](https://just-the-docs.com/docs/customization/#deprecated-legacy_light) by using `legacy_light` instead of `light`.

As always, we'd love your feedback. [Open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) for bug reports, feature requests, and any other feedback. Thanks for continuing to use Just the Docs!

### Using Release `v0.4.2`

Users who have not pinned the theme version will be **automatically upgraded to `v0.4.2` the next time they build their site**.

To use this release explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.2
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.4.2"
```

To use and pin a previous version of the theme, replace the `0.4.2` with the desired release tag.

### Bugfixes

- Fixed: light scheme code highlighting contrast issues; updated to use Atom's One Light colors, consolidate theme variables by [@mattxwang] in [#1166]
- Fixed: duplicate import of `color_schemes` by [@mattxwang] in [#1173]
- Fixed: import order for `setup.scss` by [@mattxwang] in [#1184]
- Removed: unused dark syntax themes by [@mattxwang] in [#1192]

### Documentation

- Added: docs for using mermaid with AsciiDoc by [@flyx] in [#1182]

**Full Changelog**: [https://github.com/just-the-docs/just-the-docs/compare/v0.4.1...v0.4.2](https://github.com/just-the-docs/just-the-docs/compare/v0.4.1...v0.4.2)

[#1166]: https://github.com/just-the-docs/just-the-docs/pull/1166
[#1173]: https://github.com/just-the-docs/just-the-docs/pull/1173
[#1182]: https://github.com/just-the-docs/just-the-docs/pull/1182
[#1184]: https://github.com/just-the-docs/just-the-docs/pull/1184
[#1192]: https://github.com/just-the-docs/just-the-docs/pull/1192

## Release v0.4.1

Hello! We hope you've been enjoying the new `v0.4.0`; we appreciate all the feedback we've gotten already! As promised, future releases will be small with simple steps to upgrade. This is one of them! `v0.4.1` is a [semver patch](https://semver.org/): it only includes bugfixes, and is fully backwards-compatible.

As always, we'd love your feedback. [Open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) for bug reports, feature requests, and any other feedback. Thanks for continuing to use Just the Docs!

### Using Release `v0.4.1`

Users who have not pinned the theme version will be **automatically upgraded to `v0.4.1` the next time they build their site**.

To use this release explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.1
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.4.1"
```

To use and pin a previous version of the theme, replace the `0.4.1` with the desired release tag.

### Bugfixes

- Fixed: allow later versions of `bundler` by [@mattxwang] in [#1165]
- Fixed: AsciiDoc code block styling by [@flyx] in [#1168]
- Fixed: main content negative margin for viewports in `[$md, $nav-width + $content-width]` by [@Dima-369] in [#1177]
- Removed: unused `OneDarkJekyll` files by [@mattxwang] in [#1167]

### Documentation

- Fixed: re-add `jekyll-github-metadata` to docs site by [@mattxwang] in [#1108]

### New Contributors

- [@flyx] made their first contribution in [#1168]
- [@Dima-369] made their first contribution in [#1177]

[#1108]: https://github.com/just-the-docs/just-the-docs/pull/1108
[#1165]: https://github.com/just-the-docs/just-the-docs/pull/1165
[#1167]: https://github.com/just-the-docs/just-the-docs/pull/1167
[#1168]: https://github.com/just-the-docs/just-the-docs/pull/1168
[#1177]: https://github.com/just-the-docs/just-the-docs/pull/1177

[@flyx]: https://github.com/flyx
[@Dima-369]: https://github.com/Dima-369

**Full Changelog**: [https://github.com/just-the-docs/just-the-docs/compare/v0.4.0...v0.4.1](https://github.com/just-the-docs/just-the-docs/compare/v0.4.0...v0.4.1)

## Release v0.4.0

We're so excited to release Just the Docs `v0.4.0`. This release has been almost a year in the making - after our new maintenance team has taken over the project, we've added two years of backlogged features and bugfixes to modernize the theme. This CHANGELOG will summarize some of the key changes, discuss migrations strategies, and outline broad future plans for this theme.

### Brief Overview - Highlighted Changes

`v0.4.0` contains many new features and bugfixes. We enumerate all of them in further sections in this changelog; however, we'd like to call out some of the most-requested changes:

- better support for dark theme: dark highlighting, search input color
- [callouts](https://just-the-docs.com/docs/ui-components/callouts/), a new design component to highlight content
- [configuring mermaid.js](https://just-the-docs.com/docs/ui-components/code/#mermaid-diagram-code-blocks), a markdown-native diagram visualization library
- [copy code button](https://just-the-docs.com/docs/ui-components/code/#copy-button) for code snippets
- [external navigation links](https://just-the-docs.com/docs/navigation-structure/#external-navigation-links)
- major improvements to nav generation efficiency and robustness
- minor improvements to built-in accessibility (SVG icons, nav titles, skip to main content)
- [modularized site components](https://just-the-docs.com/docs/customization/#custom-layouts-and-includes) (advanced feature)
- [new custom includes](https://just-the-docs.com/docs/customization/#override-includes): table of contents heading, navigation panel footer, search placeholder, lunr search indices
- bugfixes involving WEBrick and Ruby 3, Liquid processing in CSS comments, nested task lists, relative URLs, scroll navigation, corrupted search data from rake, breadcrumbs, and more!
- more documentation for [custom includes](https://just-the-docs.com/docs/customization/#override-includes), this changelog, and the [migration guide](https://just-the-docs.com/MIGRATION/)

*After usage instructions and the roadmap, we enumerate all changes from `v0.3.3`.*

### Using Release `v0.4.0`

Unlike pre-releases, `v0.4.0` is a new semver minor release for the theme. That means that users who have not pinned the theme version will be **automatically upgraded to `v0.4.0` the next time they build their site**.

To use this release explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.0
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.4.0"
```

If you would prefer to not upgrade, you can enforce that explicitly:

1. pin your gem version in your `Gemfile`, like so
```ruby
gem "just-the-docs", "0.3.3"
```
2. freeze the `remote_theme`, like so
```yml
remote_theme: just-the-docs/just-the-docs@v0.3.3
```

### Migration Guide and Strategies

We've developed a new [migration guide](https://just-the-docs.com/MIGRATION/) for users to migrate from version `v0.3.3` to `v0.4.0`. It outlines major changes in project maintenance (e.g. new repository link, team) as well as breaking changes that may break your site (and potential solutions). We suggest that all users refer to the guide before manually upgrading their site.

**For the vast majority of users, we do not anticipate that this will be a breaking change.** The major touch points are surrounding new includes, navigation (ordering, pages, and collections), the favicon, and a shift to relative URLs. However, users who heavily customize the theme (primarily by overriding includes) will likely have to make minor changes.

Given the length of features added in this release, users may want to incrementally upgrade through the pre-releases. To follow this approach, read this changelog from `v0.4.0.rc1` to `v0.4.0.rc5`; this breaks down the release into small chunks, each of which should be easier to upgrade. `v0.4.0.rc5` is identical to this release.

For support with migrating to `v0.4.0`, [open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) and let us know!

### Roadmap (What's Next?)

Moving forward, we plan to release more frequently with smaller, bite-sized changes. This should make it easier for users to upgrade in the future!

Broadly, many features are still on the radar. We anticipate the rest of `v0.4.x` to be bugfixes surrounding this new release.

For version `v0.5`, our roadmap includes:

- a theme toggle (light/dark mode), with automatic theme switching based on browser preferences
- better GDPR compliance for analytics
- multi-level/recursive navigation (unlimited hierarchy of child pages)

In future versions, we also plan on:

- adding better dark theme defaults
- adding better internationalization support
- exploring offline PDF generation
- improving accessibility within the theme
- improving search functionality
- refactoring and improving the robustness of our codebase

Have ideas for what's next, or want to get involved? [Open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) and let us know! We're looking for more contributors and maintainers to help us develop the theme.

### New Features

- Added: Combination by [@pdmosses] in [#578]
  - Added: dark highlighting in [#463]
  - Added: pages and collections in [#448]
  - Added: callouts in [#466]
  - Fixed: breadcrumb behaviour … by [@AdityaTiwari2102] in [#477]
  - Fixed: prevent rake command corrupting search data in [#495] (also listed below)
  - Fixed: nested lists in [#496]
  - Fixed: set color for search input in [#498] (also listed below)
  - Fixed: sites with no child pages (no PR)
  - Fixed: TOC/breadcrumbs for multiple collections in [#494]
  - Added: collection configuration option `nav_fold` (no PR)
  - Fixed: indentation and color for folded collection navigation (no PR)
  - Fixed: scroll navigation to show the link to the current page in [#639]
  - Fixed: Replace all uses of `absolute_url` by `relative_url`, by [@svrooij] in [#544]
- Added: custom favicon `_includes` by [@burner1024] in [#364]
- Added: set color for search input by [@pdmosses] in [#498]
- Added: search placeholder configuration by [@mattxwang] in [#613]
- Added: 'child_nav_order' front matter to be able to sort navigation pages in reverse by [@jmertic] in [#726]
- Added: `nav_footer_custom` include by [@nathanjessen] in [#474]
- Added: style fixes for jekyll-asciidoc by [@alyssais] in [#829]
- Added: mermaid.js support by [@nascosto] in [#857]
- Added: support for external navigation links by [@SPGoding] in [#876]
- Added: refactor `mermaid` config to use `mermaid_config.js` include, only require `mermaid.version` in `_config.yml` by [@mattxwang] in [#909]
- Added: accessible titles to nested page nav toggle by [@JPrevost] in [#950]
- Added: better title styling for AsciiDoc examples by [@alyssais] in [#944]
- Added: docs for custom search placeholder by [@mattxwang] in [#939]
- Added: provide ability to skip to main content by [@JPrevost] in [#949]
- Added: styling for `<blockquote>` by [@mattxwang] in [#965]
- Added: custom include for TOC heading by [@pdmosses] in [#980]
- Added: experimental nav optimization for simple cases by [@pdmosses] in [#992]
- Added: support multiple Google Analytics tracking IDs, document UA -> GA4 switch by [@MichelleBlanchette] in [#1029]
- Added: copy code button to code snippets by [@simonebortolin] in [#945]
- Added: restore simple configuration of `favicon.ico` via `site.static_files` by [@pdmosses] in [#1095]
- Added: modularize site components by [@mattxwang] in [#1058]
- Added: includes for custom `lunr` Liquid and JS code by [@diablodale] in [#1068]
- Added: new `_sass/custom/setup.scss` for variable definition by [@mattxwang] in [#1135]
- Added: configuration key to load a local version of mermaid by [@fabrik42] in [#1153]

### Bugfixes

- Fixed: prepend `site.collections_dir` if exists by [@alexsegura] in [#519]
- Fixed: nested task lists (#517) by [@pdmosses] in [#855]
- Fixed: suppress Liquid processing in CSS comments by [@pdmosses] in [#686]
- Fixed: prevent rake command from corrupting search data by [@pdmosses] in [#495]
- Fixed: anchor heading links should be visible on focus by [@jacobhq] in [#846]
- Fixed: add `overflow-x: auto` to `figure.highlight` by [@iridazzle] in [#727]
- Fixed: add `overflow-wrap: word-break` to `body` by [@iridazzle] in [#889]
- Fixed: vertical alignment for consecutive labels by [@Eisverygoodletter] in [#893]
- Fixed: allow links to wrap by [@pdmosses] in [#905]
- Fixed: nav scroll feature and absolute/relative URLs by [@pdmosses] in [#898]
- Fixed: exclude `vendor/` in Jekyll config by [@manuelhenke] in [#941]
- Fixed: improve build time of navigation panel by [@pdmosses] in [#956]
- Fixed: spacing issue when search is disabled by [@henryiii] in [#960]
- Fixed: active grandchild link class by [@pdmosses] in [#962]
- Fixed: HTML validation issues (W3C validator) by [@mattxwang] in [#964]
- Fixed: link styling now uses `text-decoration` values by [@mattxwang] in [#967]
- Fixed: cleaning up Jekyll excludes by [@pdmosses] in [#985]
- Fixed: docs, narrow styling for code highlighting with line numbers by [@pdmosses] in [#974]
- Fixed: default syntax highlighting in custom color schemes [@pdmosses] in [#986]
- Fixed: incorrect disambiguation in generated TOCs by [@pdmosses] in [#999]
- Fixed: duplicated external links in collections by [@pdmosses] in [#1001]
- Fixed: import order of `custom.scss`; puts at end by [@deseo] in [#1010]
- Fixed: top-level active link styling by [@pdmosses] in [#1015]
- Fixed: external links for sites with no pages by [@pdmosses] in [#1021]
- Fixed: duplicate `title` if `jekyll-seo-tag` not in users's plugins by [@Tom-Brouwer] in [#1040]
- Fixed: removes (duplicate) `favicon.html`, shifts content to `head_custom.html` by [@mattxwang] in [#1027]
- Fixed: add `reversed`, deprecate `desc` for nav `child_nav_order` by [@jmertic] in [#1061]
- Fixed: `child.child_nav_order` to `node.child_nav_order` by [@mattxwang] in [#1065]
- Fixed: remove all uses of `/` as SASS division by [@mattxwang] in [#1074]
    - note: this was originally merged as [#1074] with a bug; it was reverted in [#1076], and then reimplemented in [#1077]
- Fixed: skip nav collection generation when site has no pages by [@pdmosses] in [#1092]
- Fixed: standardize SCSS with `declaration-block-no-redundant-longhand-properties` by [@simonebortolin] in [#1102]
- Fixed: incorrect `padding` property value pair in `labels.scss` by [@SConaway] in [#1104]
- Fixed: various bugs with copy code button by [@simonebortolin] in [#1096]
- Fixed: replace inline styling for `<svg>` icons by [@captn3m0] in [#1110]
- Fixed: incorrect `padding` property value pair in `search.scss` by [@kevinlin1] in [#1123]
- Fixed: minor spacing and comment nits by [@EricFromCanada] in [#1128]
- Fixed: exclude images from being bundled with gem by [@m-r-mccormick] in [#1142]
- Fixed: dark theme code block background, line number colors by [@m-r-mccormick] in [#1124]
- Fixed: copy code button interaction with kramdown line numbers by [@mattxwang] in [#1143]

### Maintenance

- Added: VScode devcontainer by [@max06] in [#783]
- Added: `webrick` to `Gemfile` by [@mattxwang] in [#799]
- Added: 'This site is powered by Netlify.' to the footer by [@mattxwang] in [#797]
- Updated: new repo path by [@pmarsceill] in [#775]
- Updated: rename `master` -> `main` by [@pmarsceill] in [#776]
- Updated: README by [@pmarsceill] in [#777]
- Updated: Code of Conduct to Contributor Covenant v2.1 by [@mattxwang] in [#790]
- Updated: CI files, Ruby & Node Versions by [@mattxwang] in [#820]
- Updated: Stylelint to v14, extend SCSS plugins, remove primer-* configs, resolve issues by [@mattxwang] in [#821]
- Deleted: unused script directory by [@mattxwang] in [#937]
- Vendor: update `jekyll-anchor-headings`, `lunr.js` by [@mattxwang] in [#1071]

### Documentation

- Added: docs on how to break an `ol` by [@pdmosses] in [#856]
- Added: docs for custom includes by [@nathanjessen] in [#806]
- Added: document caveat about variable dependencies by [@waldyrious] in [#555]
- Added: docs on how to use `custom_head` to add a custom favicon by [@UnclassedPenguin] in [#814]
- Added: docs load mermaid.js by default by [@mattxwang] in [#935]
- Added: warning about mandatory `_`-prefix for collections by [@max06] in [#1091]
- Added:  migration guide by [@pdmosses] in [#1059]
- Added: label new features introduced in `v0.4` by [@mattxwang] in [#1138]
- Fixed: `ol` on `index.md` by [@pmarsceill] in [#778]
- Fixed: image link in Markdown kitchen sink by [@JeffGuKang] in [#221]
- Fixed: images in Markdown kitchen sink by [@dougaitken] in [#782]
- Fixed: clearer label of link to Jekyll quickstart by [@waldyrious] in [#549]
- Fixed: remove extra spaces in component docs by [@MichelleBlanchette] in [#554]
- Fixed: double "your" typo in `index.md` by [@sehilyi] in [#499]
- Fixed: "you" -> "your" typo in `index.md` by [@nathanjessen] in [#473]
- Fixed: spacing in toc example by [@henryiii] in [#835]
- Fixed: typo in `README` on `_config.yml` by [@ivanskodje] in [#891]
- Fixed: missing code fence in navigation structure docs by [@mattxwang] in [#906]
- Fixed: table of contents on search docs by [@robinpokorny] in [#940]
- Fixed: broken docs link (custom footer) by [@olgarithms] in [#951]
- Fixed: clarify version docs by [@pdmosses] in [#955]
- Fixed: typo in changelog links [@koppor] in [#1000]
- Fixed: two bugs in "Customization" (custom favicon, new annotation) by [@mattxwang] in [#1090]
- Fixed: "View Typography Utilities" link by [@agabrys] in [#1130]
- Fixed: broken relative page links by [@mattxwang] in [#1106]
- Fixed: clarify steps to add custom `lunr` index code by [@diablodale] in [#1139]
- Updated: homepage (focus: new features, conciseness, deduplication) by [@pdmosses] in [#1018]
- Updated: README (focus: new features, conciseness, deduplication) by [@pdmosses] in [#1019]
- Updated: `README` demo video by [@codewithfan] in [#1097]

### New Contributors

- [@AdityaTiwari2102] made their first contribution in [#477]
- [@svrooij] made their first contribution in [#544]
- [@alexsegura] made their first contribution in [#519]
- [@burner1024] made their first contribution in [#364]
- [@JeffGuKang] made their first contribution in [#221]
- [@dougaitken] made their first contribution in [#782]
- [@max06] made their first contribution in [#783]
- [@sehilyi] made their first contribution in [#499]
- [@nathanjessen] made their first contribution in [#473]
- [@waldyrious] made their first contribution in [#549]
- [@MichelleBlanchette] made their first contribution in [#554]
- [@henryiii] made their first contribution in [#835]
- [@jmertic] made their first contribution in [#726]
- [@jacobhq] made their first contribution in [#846]
- [@UnclassedPenguin] made their first contribution in [#814]
- [@alyssais] made their first contribution in [#829]
- [@nascosto] made their first contribution in [#857]
- [@SPGoding] made their first contribution in [#876]
- [@iridazzle] made their first contribution in [#727]
- [@ivanskodje] made their first contribution in [#891]
- [@Eisverygoodletter] made their first contribution in [#893]
- [@robinpokorny] made their first contribution in [#940]
- [@olgarithms] made their first contribution in [#951]
- [@manuelhenke] made their first contribution in [#941]
- [@JPrevost] made their first contribution in [#950]
- [@koppor] made their first contribution in [#1000]
- [@deseo] made their first contribution in [#1010]
- [@Tom-Brouwer] made their first contribution in [#1040]
- [@simonebortolin] made their first contribution in [#945]
- [@SConaway] made their first contribution in [#1104]
- [@captn3m0] made their first contribution in [#1110]
- [@kevinlin1] made their first contribution in [#1123]
- [@codewithfan] made their first contribution in [#1097]
- [@agabrys] made their first contribution in [#1130]
- [@diablodale] made their first contribution in [#1068]
- [@m-r-mccormick] made their first contribution in [#1142]
- [@fabrik42] made their first contribution in [#1153]

## Pre-release v0.4.0.rc5

Hi everyone, we're so excited to finally release `v0.4.0`! For posterity's sake, we're going to release `v0.4.0.rc5` and then immediately re-release it as `v0.4.0`; this should make it more clear what changes were introduced in the lead up to the minor release.

This RC does not introduce any major user-facing features. It adds more customizability for custom SCSS variables (fixing a bug with callout introduction order), `lunr` indexing, and loading `mermaid` locally. In addition, it fixes bugs introduced in `.rc4`: incorrect CSS, inconsistencies with code block backgrounds in dark theme, and the copy code button. It also adds a migration guide for users coming from `v0.3.3`.

### Trying out pre-release `v0.4.0.rc5`

Simlar to the prior release, `v0.4.0.rc5` is a **release candidate** for the theme (i.e., a pre-release) with release `v0.4.0` following immediately after. While we don't anticipate many users using this RC, it is still possible to opt-in.

To use this RC explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.0.rc5
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.4.0.rc5"
```

By default, **users will not be upgraded to `0.4.0.rc5`**. To enforce that explicitly, either:

1. pin your gem version in your `Gemfile`, like so
```ruby
gem "just-the-docs", "0.3.3"
```
2. freeze the `remote_theme`, like so
```yml
remote_theme: just-the-docs/just-the-docs@v0.3.3
```

### New Features

- Added: includes for custom `lunr` Liquid and JS code by [@diablodale] in [#1068]
- Added: new `_sass/custom/setup.scss` for variable definition by [@mattxwang] in [#1135]
- Added: configuration key to load a local version of mermaid by [@fabrik42] in [#1153]

### Bugfixes and Maintenance

- Fixed: incorrect `padding` property value pair in `search.scss` by [@kevinlin1] in [#1123]
- Fixed: minor spacing and comment nits by [@EricFromCanada] in [#1128]
- Fixed: exclude images from being bundled with gem by [@m-r-mccormick] in [#1142]
- Fixed: dark theme code block background, line number colors by [@m-r-mccormick] in [#1124]
- Fixed: copy code button interaction with kramdown line numbers by [@mattxwang] in [#1143]

### Docs

- Docs: add a migration guide by [@pdmosses] in [#1059]
- Docs: update `README` demo video by [@codewithfan] in [#1097]
- Docs: update "View Typography Utilities" link by [@agabrys] in [#1130]
- Docs: fix broken relative page links by [@mattxwang] in [#1106]
- Docs: clarify steps to add custom `lunr` index code by [@diablodale] in [#1139]
- Docs: label new features introduced in `v0.4` by [@mattxwang] in [#1138]

### New Contributors

- [@kevinlin1] made their first contribution in [#1123]
- [@codewithfan] made their first contribution in [#1097]
- [@agabrys] made their first contribution in [#1130]
- [@diablodale] made their first contribution in [#1068]
- [@m-r-mccormick] made their first contribution in [#1142]
- [@fabrik42] made their first contribution in [#1153]

[#1059]: https://github.com/just-the-docs/just-the-docs/pull/1059
[#1068]: https://github.com/just-the-docs/just-the-docs/pull/1068
[#1097]: https://github.com/just-the-docs/just-the-docs/pull/1097
[#1106]: https://github.com/just-the-docs/just-the-docs/pull/1106
[#1123]: https://github.com/just-the-docs/just-the-docs/pull/1123
[#1124]: https://github.com/just-the-docs/just-the-docs/pull/1124
[#1128]: https://github.com/just-the-docs/just-the-docs/pull/1128
[#1130]: https://github.com/just-the-docs/just-the-docs/pull/1130
[#1135]: https://github.com/just-the-docs/just-the-docs/pull/1135
[#1138]: https://github.com/just-the-docs/just-the-docs/pull/1138
[#1139]: https://github.com/just-the-docs/just-the-docs/pull/1139
[#1142]: https://github.com/just-the-docs/just-the-docs/pull/1142
[#1143]: https://github.com/just-the-docs/just-the-docs/pull/1143
[#1153]: https://github.com/just-the-docs/just-the-docs/pull/1153

[@agabrys]: https://github.com/agabrys
[@codewithfan]: https://github.com/codewithfan
[@diablodale]: https://github.com/diablodale
[@fabrik42]: https://github.com/fabrik42
[@kevinlin1]: https://github.com/kevinlin1
[@EricFromCanada]: https://github.com/EricFromCanada
[@m-r-mccormick]: https://github.com/m-r-mccormick

## Pre-release v0.4.0.rc4

Happy new year! We're celebrating with another pre-release, with features that should help theme users better adapt to changes moving forward. **We aim to re-release this as `v0.4.0`, with only few changes**.

Notable new additions include:

- modular site components, which split up the site into smaller reusable components; advanced theme users can then remix layouts quickly without duplication
- a "copy code" button to code blocks
- fixing bugs in generated TOCs and navigation from previous prereleases
- various cleanups of CSS and HTML markup

The roadmap to `v0.4.0` is small. We are only looking to:

- finish a migration guide, so users can easily upgrade from `v0.3.3` to `v0.4.0`
- fix one last bug relating to callouts and custom colors
- fix any new bugs introduced by this pre-release

Have any questions, thoughts, or concerns? We'd love to hear from you! Please [open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) and let us know!

### Trying out pre-release `v0.4.0.rc4`

Simlar to the prior release, `v0.4.0.rc4` is a **release candidate** for the theme (i.e., a pre-release) with release `v0.4.0` coming soon. We want your help in testing the changes! As of now, the gem on RubyGems and the repository are updated to `v0.4.0.rc4`.

To use this RC explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.0.rc4
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.4.0.rc4"
```

By default, **users will not be upgraded to `0.4.0.rc4`**. To enforce that explicitly, either:

1. pin your gem version in your `Gemfile`, like so
```ruby
gem "just-the-docs", "0.3.3"
```
2. freeze the `remote_theme`, like so
```yml
remote_theme: just-the-docs/just-the-docs@v0.3.3
```

### New Features

- Added: support multiple Google Analytics tracking IDs, document UA -> GA4 switch by [@MichelleBlanchette] in [#1029]
- Added: copy code button to code snippets by [@simonebortolin] in [#945]
- Added: restore simple configuration of `favicon.ico` via `site.static_files` by [@pdmosses] in [#1095]
- Added: modularize site components by [@mattxwang] in [#1058]

### Bugfixes and Maintenance

- Fixed: incorrect disambiguation in generated TOCs by [@pdmosses] in [#999]
- Fixed: duplicated external links in collections by [@pdmosses] in [#1001]
- Fixed: import order of `custom.scss`; puts at end by [@deseo] in [#1010]
- Fixed: top-level active link styling by [@pdmosses] in [#1015]
- Fixed: external links for sites with no pages by [@pdmosses] in [#1021]
- Fixed: duplicate `title` if `jekyll-seo-tag` not in users's plugins by [@Tom-Brouwer] in [#1040]
- Fixed: removes (duplicate) `favicon.html`, shifts content to `head_custom.html` by [@mattxwang] in [#1027]
- Fixed: add `reversed`, deprecate `desc` for nav `child_nav_order` by [@jmertic] in [#1061]
- Fixed: `child.child_nav_order` to `node.child_nav_order` by [@mattxwang] in [#1065]
- Fixed: remove all uses of `/` as SASS division by [@mattxwang] in [#1074]
    - note: this was originally merged as [#1074] with a bug; it was reverted in [#1076], and then reimplemented in [#1077]
- Fixed: skip nav collection generation when site has no pages by [@pdmosses] in [#1092]
- Fixed: standardize SCSS with `declaration-block-no-redundant-longhand-properties` by [@simonebortolin] in [#1102]
- Fixed: incorrect `padding` property value pair in `labels.scss` by [@SConaway] in [#1104]
- Fixed: various bugs with copy code button by [@simonebortolin] in [#1096]
- Fixed: replace inline styling for `<svg>` icons by [@captn3m0] in [#1110]
- Vendor: update `jekyll-anchor-headings`, `lunr.js` by [@mattxwang] in [#1071]

### Docs

- Docs: fix typo in changelog links [@koppor] in [#1000]
- Docs: update homepage (focus: new features, conciseness, deduplication) by [@pdmosses] in [#1018]
- Docs: update README (focus: new features, conciseness, deduplication) by [@pdmosses] in [#1019]
- Docs: fix two bugs in "Customization" (custom favicon, new annotation) by [@mattxwang] in [#1090]
- Docs: Add warning about mandatory `_`-prefix for collections by [@max06] in [#1091]
- Docs: remove Google Analytics on main site by [@mattxwang] in [#1113]

### New Contributors

- [@koppor] made their first contribution in [#1000]
- [@deseo] made their first contribution in [#1010]
- [@Tom-Brouwer] made their first contribution in [#1040]
- [@simonebortolin] made their first contribution in [#945]
- [@SConaway] made their first contribution in [#1104]
- [@captn3m0] made their first contribution in [#1110]

**Full Changelog**: https://github.com/just-the-docs/just-the-docs/compare/v0.4.0.rc3...v0.4.0.rc4

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
[#1058]: https://github.com/just-the-docs/just-the-docs/pull/1058
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
[#1096]: https://github.com/just-the-docs/just-the-docs/pull/1096
[#1102]: https://github.com/just-the-docs/just-the-docs/pull/1102
[#1104]: https://github.com/just-the-docs/just-the-docs/pull/1104
[#1110]: https://github.com/just-the-docs/just-the-docs/pull/1110
[#1113]: https://github.com/just-the-docs/just-the-docs/pull/1113

[@captn3m0]: https://github.com/captn3m0
[@deseo]: https://github.com/deseo
[@koppor]: https://github.com/koppor
[@MichelleBlanchette]: https://github.com/MichelleBlanchette
[@simonebortolin]: https://github.com/simonebortolin
[@SConaway]: https://github.com/SConaway
[@Tom-Brouwer]: https://github.com/Tom-Brouwer

## Pre-release v0.4.0.rc3

Hi there! This is (actually) hopefully the last prerelease before `v0.4.0`; in particular, if we find that this prerelease is stable, we'll re-release it as `v0.4.0`.

In general, this is a more mature pre-release; there are few new features. However, we'll highlight [@pdmosses]'s work in [#992] to better optimize nav generation for large sites (ex 100+ pages). We don't expect this to affect most users; however, **it is technically a breaking change**, and we suggest testing your site before upgrading to this prerelease.

We want your feedback! Please [open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) and let us know!

As soon as we get stable test results from major downstream users, we'll push out a `v0.4.0` ASAP - closing out almost 2 years of backlogged work!

### Trying out pre-release `v0.4.0.rc3`

Simlar to the prior release, `v0.4.0.rc3` is a **release candidate** for the theme (i.e., a pre-release) with release `v0.4.0` coming soon. We want your help in testing the changes! As of now, the gem on RubyGems and the repository are updated to `v0.4.0.rc3`.

To use this RC explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.0.rc3
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.4.0.rc3"
```

By default, **users will not be upgraded to `0.4.0.rc3`**. To enforce that explicitly, either:

1. pin your gem version in your `Gemfile`, like so
```ruby
gem "just-the-docs", "0.3.3"
```
2. freeze the `remote_theme`, like so
```yml
remote_theme: just-the-docs/just-the-docs@v0.3.3
```

### Features

Broadly, this prerelease is feature-light!

- Added: styling for `<blockquote>` by [@mattxwang] in [#965]
- Added: custom include for TOC heading by [@pdmosses] in [#980]

### Bugfixes and Experimental Features

*Note*: experimental nav optimization may be unstable. Please give us feedback!

- Added: experimental nav optimization for simple cases by [@pdmosses] in [#992]
- Fixed: spacing issue when search is disabled by [@henryiii] in [#960]
- Fixed: active grandchild link class by [@pdmosses] in [#962]
- Fixed: HTML validation issues (W3C validator) by [@mattxwang] in [#964]
- Fixed: link styling now uses `text-decoration` values by [@mattxwang] in [#967]
- Fixed: cleaning up Jekyll excludes by [@pdmosses] in [#985]
- Fixed: docs, narrow styling for code highlighting with line numbers by [@pdmosses] in [#974]
- Fixed: default syntax highlighting in custom color schemes [@pdmosses] in [#986]

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

[@henryiii]: https://github.com/henryiii

**Full Changelog**: https://github.com/just-the-docs/just-the-docs/compare/v0.4.0.rc2...v0.4.0.rc3

## Pre-release v0.4.0.rc2

{: .warning }
This website includes docs for some new features that are not available in `v0.4.0.rc1` and `v0.3.3`!

Hey there! This is likely the last pre-release before releasing `v0.4.0`, which we plan on doing soon (i.e. before the end of the month) - very exciting! Some new additions to highlight:

- significant improvement on build time of navigation panel by [@pdmosses]
  - this is big: for a community member with over 300 pages, we shortened the build time from 3 minutes to 30 seconds!
- improved accessibility features led by [@JPrevost]
- more docs!

The intention of this release candidate is to gather even more feedback on a potential `v0.4.0`. As it stands, we have not encountered any breaking changes with early adopters of `v0.4.0.rc1`. If you encounter any - for either of our pre-releases - please let us know!

### Trying out pre-release `v0.4.0.rc2`

Simlar to the prior release, `v0.4.0.rc2` is a **release candidate** for the theme (i.e., a pre-release) with release `v0.4.0` coming soon. We want your help in testing the changes! As of now, the gem on RubyGems and the repository are updated to `v0.4.0.rc2`.

To use this RC explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.0.rc2
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.4.0.rc2"
```

By default, **users will not be upgraded to `0.4.0.rc2`**. To enforce that explicitly, either:

1. pin your gem version in your `Gemfile`, like so
```ruby
gem "just-the-docs", "0.3.3"
```
2. freeze the `remote_theme`, like so
```yml
remote_theme: just-the-docs/just-the-docs@v0.3.3
```

### Features

- Added: accessible titles to nested page nav toggle by [@JPrevost] in [#950]
- Added: better title styling for AsciiDoc examples by [@alyssais] in [#944]
- Added: docs for custom search placeholder by [@mattxwang] in [#939]
- Added: provide ability to skip to main content by [@JPrevost] in [#949]
- Fixed: exclude `vendor/` in Jekyll config by [@manuelhenke] in [#941]
- Fixed: improve build time of navigation panel by [@pdmosses] in [#956]

[#950]: https://github.com/just-the-docs/just-the-docs/pull/950
[#944]: https://github.com/just-the-docs/just-the-docs/pull/944
[#939]: https://github.com/just-the-docs/just-the-docs/pull/939
[#949]: https://github.com/just-the-docs/just-the-docs/pull/949
[#941]: https://github.com/just-the-docs/just-the-docs/pull/941
[#956]: https://github.com/just-the-docs/just-the-docs/pull/956

[@alyssais]: https://github.com/alyssais

### Documentation and Maintenance

- Added: docs load mermaid.js by default by [@mattxwang] in [#935]
- Fixed: table of contents on search docs by [@robinpokorny] in [#940]
- Fixed: broken docs link (custom footer) by [@olgarithms] in [#951]
- Fixed: clarify version docs by [@pdmosses] in [#955]
- Deleted: unused script directory by [@mattxwang] in [#937]

[#935]: https://github.com/just-the-docs/just-the-docs/pull/935
[#940]: https://github.com/just-the-docs/just-the-docs/pull/940
[#951]: https://github.com/just-the-docs/just-the-docs/pull/951
[#955]: https://github.com/just-the-docs/just-the-docs/pull/955
[#937]: https://github.com/just-the-docs/just-the-docs/pull/937

### New Contributors

* [@robinpokorny] made their first contribution in [#940]
* [@olgarithms] made their first contribution in [#951]
* [@manuelhenke] made their first contribution in [#941]
* [@JPrevost] made their first contribution in [#950]

[@robinpokorny]: https://github.com/robinpokorny
[@olgarithms]: https://github.com/olgarithms
[@manuelhenke]: https://github.com/manuelhenke
[@JPrevost]: https://github.com/JPrevost

## Pre-release v0.4.0.rc1

### We're back!

Hi all! The Just the Docs team is excited to have our first pre-release in over two years! It is jam-packed with features and bugfixes that have been requested by the community since 2020. They include:

- The new callouts component
- Allowing pages and collections to coexist on the navigation pane
- New styling: dark syntax highlighting, support for jekyll-asciidoc, word-wrapping instead of overflow for various elements
- More customization: external nav links, custom nav footers, favicon includes, search color and placeholder configuration, mermaid.js support, and nav sorting
- Over 20 bugfixes! Big ones include fixing the `rake` command, using `relative_url`, and search input color
- More documentation, especially on using custom includes
- Updating core dependencies to stable Ruby versions
- A WIP [template repository](https://github.com/just-the-docs/just-the-docs-template) that allows you to setup your own repository using Just the Docs and GitHub Pages with one click - give it a shot! More documentation, etc. is on the way!

We want your feedback! Are these changes helpful? Are our docs easy to understand? Should new features like `mermaid` be opt-in or opt-out? Please [open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) and let us know!

### Trying out pre-release `v0.4.0.rc1`

Due to the massive scope of these changes, we're making `v0.4.0.rc1` avaialble as a **release candidate** for the theme (i.e., a pre-release) with release `v0.4.0` coming soon. We want your help in testing the changes! As of now, the gem on RubyGems and the repository are updated to `v0.4.0.rc1`.

To use this RC explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.0.rc1
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install` or `bundle update just-the-docs`:

```ruby
gem "just-the-docs", "0.4.0.rc1"
```

### Staying on `v0.3.3`

If you're not ready to make the switch, that's alright! If your version of just-the-docs is pinned to `v0.3.3` (i.e. by a `Gemfile.lock` or in `remote_theme`, then there's nothing you need to do.

If you have not pinned your theme version, you should either:

1. pin your gem version in your `Gemfile`, like so
```ruby
gem "just-the-docs", "0.3.3"
```
2. freeze the `remote_theme`, like so
```yml
remote_theme: just-the-docs/just-the-docs@v0.3.3
```

{: .warning }
Use of branches for closed PRs (e.g., [#466], [#578]) is now deprecated, as those branches have been (directly or indirectly) merged, and they may be deleted after the pre-release of `v0.4.0.rc1`.

### Maintenance

Internally, our maintainer team has expanded: [Patrick Marsceill][@pmarsceill], the original maintainer, has stepped down from an active role after almost 4 years! We're very thankful for the work that he's done to create and maintain one of the most popular Jekyll themes. Please join us in giving him thanks!

The new core team currently consists of [@mattxwang], [@pdmosses], [@skullface], [@dougaitken], and [@max06]. Over the past six months, we've been triaging and merging in PRs, as well as contributing our own fixes. We'll continue to address open issues, merge in PRs from the community, and plan out the future of Just the Docs. If you'd like to contribute, now is a great time!

[@mattxwang]: https://github.com/mattxwang
[@pdmosses]: https://github.com/pdmosses
[@skullface]: https://github.com/skullface
[@dougaitken]: https://github.com/dougaitken
[@max06]: https://github.com/max06

### Roadmap

In the short-term, we're committed to tidying up everything for a `v0.4.0` release. This involves fixing bugs reported from the community in this pre-release, as well as continually merging in minor PRs.

We're also scoping out medium and long-term projects, and want to keep you in the loop. These include:

- upgrading to Jekyll 4, and stopping support for Jekyll 3
- versioned docs - issue [#728]
- improved accessibility - issues [#566], [#870]
- internationalization (i18n) - issue [#59]
- recursive/multi-level navigation - PR [#462]
- toggleable dark mode - issue [#234]

as well as DX improvements like better regression tests, CI, and tooling. If you're interested in any of these, please join us [on GitHub](https://github.com/just-the-docs/just-the-docs) - any contribution (raising an issue, writing docs, or submitting a PR) is welcome!

[#728]: https://github.com/just-the-docs/just-the-docs/issues/728
[#566]: https://github.com/just-the-docs/just-the-docs/issues/566
[#870]: https://github.com/just-the-docs/just-the-docs/issues/870
[#59]: https://github.com/just-the-docs/just-the-docs/issues/59
[#462]: https://github.com/just-the-docs/just-the-docs/pull/462
[#234]: https://github.com/just-the-docs/just-the-docs/issues/234

### Features

* Added: Combination by [@pdmosses] in [#578]
  - Added: dark highlighting in [#463]
  - Added: pages and collections in [#448]
  - Added: callouts in [#466]
  - Fixed: breadcrumb behaviour … by [@AdityaTiwari2102] in [#477]
  - Fixed: prevent rake command corrupting search data in [#495] (also listed below)
  - Fixed: nested lists in [#496]
  - Fixed: set color for search input in [#498] (also listed below)
  - Fixed: sites with no child pages (no PR)
  - Fixed: TOC/breadcrumbs for multiple collections in [#494]
  - Added: collection configuration option `nav_fold` (no PR)
  - Fixed: indentation and color for folded collection navigation (no PR)
  - Fixed: scroll navigation to show the link to the current page in [#639]
  - Fixed: Replace all uses of `absolute_url` by `relative_url`, by [@svrooij] in [#544]
* Added: custom favicon `_includes` by [@burner1024] in [#364]
* Added: set color for search input by [@pdmosses] in [#498]
* Added: search placeholder configuration by [@mattxwang] in [#613]
* Added: 'child_nav_order' front matter to be able to sort navigation pages in reverse by [@jmertic] in [#726]
* Added: `nav_footer_custom` include by [@nathanjessen] in [#474]
* Added: style fixes for jekyll-asciidoc by [@alyssais] in [#829]
* Added: mermaid.js support by [@nascosto] in [#857]
* Added: support for external navigation links by [@SPGoding] in [#876]
* Added: refactor `mermaid` config to use `mermaid_config.js` include, only require `mermaid.version` in `_config.yml` by [@mattxwang] in [#909]
* Fixed: prepend `site.collections_dir` if exists by [@alexsegura] in [#519]
* Fixed: nested task lists (#517) by [@pdmosses] in [#855]
* Fixed: suppress Liquid processing in CSS comments by [@pdmosses] in [#686]
* Fixed: prevent rake command from corrupting search data by [@pdmosses] in [#495]
* Fixed: anchor heading links should be visible on focus by [@jacobhq] in [#846]
* Fixed: add `overflow-x: auto` to `figure.highlight` by [@iridazzle] in [#727]
* Fixed: add `overflow-wrap: word-break` to `body` by [@iridazzle] in [#889]
* Fixed: vertical alignment for consecutive labels by [@Eisverygoodletter] in [#893]
* Fixed: allow links to wrap by [@pdmosses] in [#905]
* Fixed: nav scroll feature and absolute/relative URLs by [@pdmosses] in [#898]

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

### Documentation

* Added: docs on how to break an `ol` by [@pdmosses] in [#856]
* Added: docs for custom includes by [@nathanjessen] in [#806]
* Added: document caveat about variable dependencies by [@waldyrious] in [#555]
* Added: docs on how to use `custom_head` to add a custom favicon by [@UnclassedPenguin] in [#814]
* Fixed: `ol` on `index.md` by [@pmarsceill] in [#778]
* Fixed: image link in Markdown kitchen sink by [@JeffGuKang] in [#221]
* Fixed: images in Markdown kitchen sink by [@dougaitken] in [#782]
* Fixed: clearer label of link to Jekyll quickstart by [@waldyrious] in [#549]
* Fixed: remove extra spaces in component docs by [@MichelleBlanchette] in [#554]
* Fixed: double "your" typo in `index.md` by [@sehilyi] in [#499]
* Fixed: "you" -> "your" typo in `index.md` by [@nathanjessen] in [#473]
* Fixed: spacing in toc example by [@henryiii] in [#835]
* Fixed: typo in `README` on `_config.yml` by [@ivanskodje] in [#891]
* Fixed: missing code fence in navigation structure docs by [@mattxwang] in [#906]

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

### Maintenance

* Added: VScode devcontainer by [@max06] in [#783]
* Added: `webrick` to `Gemfile` by [@mattxwang] in [#799]
* Added: 'This site is powered by Netlify.' to the footer by [@mattxwang] in [#797]
* Updated: new repo path by [@pmarsceill] in [#775]
* Updated: rename `master` -> `main` by [@pmarsceill] in [#776]
* Updated: README by [@pmarsceill] in [#777]
* Updated: Code of Conduct to Contributor Covenant v2.1 by [@mattxwang] in [#790]
* Updated: CI files, Ruby & Node Versions by [@mattxwang] in [#820]
* Updated: Stylelint to v14, extend SCSS plugins, remove primer-* configs, resolve issues by [@mattxwang] in [#821]

[#783]: https://github.com/just-the-docs/just-the-docs/pull/783
[#799]: https://github.com/just-the-docs/just-the-docs/pull/799
[#797]: https://github.com/just-the-docs/just-the-docs/pull/797
[#775]: https://github.com/just-the-docs/just-the-docs/pull/775
[#776]: https://github.com/just-the-docs/just-the-docs/pull/776
[#777]: https://github.com/just-the-docs/just-the-docs/pull/777
[#790]: https://github.com/just-the-docs/just-the-docs/pull/790
[#820]: https://github.com/just-the-docs/just-the-docs/pull/820
[#821]: https://github.com/just-the-docs/just-the-docs/pull/821

### Dependencies

* Upgrade to GitHub-native Dependabot by @dependabot-preview in [#627]
* [Security] Bump y18n from 3.2.1 to 3.2.2 by @dependabot-preview in [#606]
* [Security] Bump hosted-git-info from 2.7.1 to 2.8.9 by @dependabot-preview in [#641]
* [Security] Bump lodash from 4.17.19 to 4.17.21 by @dependabot-preview in [#640]
* [Security] Bump ini from 1.3.5 to 1.3.8 by @dependabot-preview in [#511]
* Bump path-parse from 1.0.6 to 1.0.7 by @dependabot in [#699]
* Bump ajv from 6.10.0 to 6.12.6 by @dependabot in [#766]
* Bump prettier from 2.1.2 to 2.5.1 by @dependabot in [#787]
* Bump prettier from 2.5.1 to 2.6.2 by @dependabot in [#809]
* Bump prettier from 2.6.2 to 2.7.1 by @dependabot in [#864]

[#627]: https://github.com/just-the-docs/just-the-docs/pull/627
[#606]: https://github.com/just-the-docs/just-the-docs/pull/606
[#641]: https://github.com/just-the-docs/just-the-docs/pull/641
[#640]: https://github.com/just-the-docs/just-the-docs/pull/640
[#511]: https://github.com/just-the-docs/just-the-docs/pull/511
[#699]: https://github.com/just-the-docs/just-the-docs/pull/699
[#766]: https://github.com/just-the-docs/just-the-docs/pull/766
[#787]: https://github.com/just-the-docs/just-the-docs/pull/787
[#809]: https://github.com/just-the-docs/just-the-docs/pull/809
[#864]: https://github.com/just-the-docs/just-the-docs/pull/864

### New Contributors

* [@AdityaTiwari2102] made their first contribution in [#477]
* [@svrooij] made their first contribution in [#544]
* [@alexsegura] made their first contribution in [#519]
* [@burner1024] made their first contribution in [#364]
* [@JeffGuKang] made their first contribution in [#221]
* [@dougaitken] made their first contribution in [#782]
* [@max06] made their first contribution in [#783]
* [@sehilyi] made their first contribution in [#499]
* [@nathanjessen] made their first contribution in [#473]
* [@waldyrious] made their first contribution in [#549]
* [@MichelleBlanchette] made their first contribution in [#554]
* [@henryiii] made their first contribution in [#835]
* [@jmertic] made their first contribution in [#726]
* [@jacobhq] made their first contribution in [#846]
* [@UnclassedPenguin] made their first contribution in [#814]
* [@alyssais] made their first contribution in [#829]
* [@nascosto] made their first contribution in [#857]
* [@SPGoding] made their first contribution in [#876]
* [@iridazzle] made their first contribution in [#727]
* [@ivanskodje] made their first contribution in [#891]
* [@Eisverygoodletter] made their first contribution in [#893]

[@AdityaTiwari2102]: https://github.com/AdityaTiwari2102
[@svrooij]: https://github.com/svrooij
[@alexsegura]: https://github.com/alexsegura
[@burner1024]: https://github.com/burner1024
[@JeffGuKang]: https://github.com/JeffGuKang
[@dougaitken]: https://github.com/dougaitken
[@max06]: https://github.com/max06
[@sehilyi]: https://github.com/sehilyi
[@nathanjessen]: https://github.com/nathanjessen
[@waldyrious]: https://github.com/waldyrious
[@MichelleBlanchette]: https://github.com/MichelleBlanchette
[@henryiii]: https://github.com/henryiii
[@jmertic]: https://github.com/jmertic
[@jacobhq]: https://github.com/jacobhq
[@UnclassedPenguin]: https://github.com/UnclassedPenguin
[@alyssais]: https://github.com/alyssais
[@nascosto]: https://github.com/nascosto
[@SPGoding]: https://github.com/SPGoding
[@iridazzle]: https://github.com/iridazzle
[@ivanskodje]: https://github.com/ivanskodje
[@Eisverygoodletter]: https://github.com/Eisverygoodletter

**Full Changelog**: https://github.com/just-the-docs/just-the-docs/compare/v0.3.3...v0.4.0.rc1

[@pmarsceill]: https://github.com/pmarsceill

## v0.3.3

### 🚀 Features

- Add custom header and footer include files @CodeSandwich (#334)

### 🐛 Bug Fixes

- Limit the effect of `nav_exclude` to the main navigation @pdmosses (#443)
- Update normalize.scss @pdmosses (#444)
- Update code.scss @pdmosses (#445)
- Fix list alignment @pdmosses (#446)

### 🧰 Maintenance

- Bump stylelint-config-primer from 9.0.0 to 9.2.1 @dependabot-preview (#451)
- Bump stylelint from 13.6.1 to 13.7.2 @dependabot-preview (#440)
- Bump @primer/css from 15.1.0 to 15.2.0 @dependabot-preview (#436)
- Bump prettier from 2.1.1 to 2.1.2 @dependabot-preview (#429)

## v0.3.2

### Changes

- Safe page sorting @pdmosses (#411)
- v0.3.2 @pmarsceill (#388)

### 🚀 Features

- make font-sizes sass variables so they can be changed @pdebruic (#361)
- run the site locally inside docker container @fogfish (#398)
- Feature/doc collections @SgtSilvio (#379)
- Adjust dl layout @pdmosses (#401)

### 🐛 Bug Fixes

- Add site.gh_edit_source to "Edit this page on GitHub" link @mrfleap (#418)
- Inhibit text-transform for code in h4 @pdmosses (#404)
- Fix native font stack precedence issue on Windows systems. @hvianna (#331)
- Support for the linenos option on highlighted code @pdmosses (#375)
- Update anchor_headings.html @pdmosses (#399)
- Fix https @marksie1988 (#359)

### 🧰 Maintenance

- Bump prettier from 2.0.5 to 2.1.1 @dependabot-preview (#427)
- Bump prettier from 2.0.5 to 2.1.1 @dependabot-preview (#419)
- [Security] Bump lodash from 4.17.15 to 4.17.19 @dependabot-preview (#389)
- Bump @primer/css from 14.4.0 to 15.1.0 @dependabot-preview (#402)
- Bump lodash from 4.17.15 to 4.17.19 @dependabot (#384)
- Bump @primer/css from 14.4.0 to 15.0.0 @dependabot-preview (#371)


## v0.3.1

### Changes

### 🐛 Bug Fixes

- Improve accessibility by adding label to Anchor links. @mscoutermarsh (#376)

### 🧰 Maintenance

- Remove collapsible TOC on nav doc @pmarsceill (#368)
- Pdmosses collapsible toc @pmarsceill (#367)


## v0.3.0

### Changes

- v0.2.9 @pmarsceill (#306)

### 🚀 Features

- Add print styles @pmarsceill (#362)
- Navigation improvements and search sections @SgtSilvio (#352)

### 🐛 Bug Fixes

- Remove constraint with jekyll 4.1.0 @PierrickMartos (#348)

### 🧰 Maintenance

- Bump version numbers @pmarsceill (#360)
- Bump stylelint from 13.3.3 to 13.6.1 @dependabot-preview (#343)
- Bump stylelint-config-prettier from 8.0.1 to 8.0.2 @dependabot-preview (#349)


## v0.2.9

### Bug fixes
- Horizontal Alignment #103 @pmarsceill
- Code snippet in headers do not inherit font size #140 @pmarsceill
- Fix duplicated title and description tags #294 @iefserge
- Update nav.html for handling nav_exclude #282 @blawqchain
- Fix duplicate entries in nav.html and default.html #239 @KasparEtter
- Don't show pages with no title (e.g. redirects in nav) https://github.com/pmarsceill/just-the-docs/pull/295/commits/672de29f2e332a9350af7237e4fb6693c848989e @SgtSilvio
- [SEARCH RAKE] Fix search generator #319 @RoiArthurB

### Enhancements
- Improvement/custom themes #186 @SgtSilvio
- feat: adds "edit this page" and "page last modified" to footer #217 @malsf21
- feat: adds option to open aux links in new tab #229 @malsf21
- Default nav order #236 @pdmosses
- Enable IP anonymization in Google Analytics (GDPR) #250 @r-brown

closes #240 #308 #266 #140 #103

## v0.2.8

### Bugfixes
- bugfix in search.rake #218 @tiaitsch85

### Dependency and security updates:

- Update jekyll requirement from ~> 3.8.5 to >= 3.8.5, < 4.1.0 #197 @dependabot-preview
- Update rake requirement from ~> 12.3.1 to >= 12.3.1, < 13.1.0 #227 @dependabot-preview
- Bump stylelint-config-primer from 8.0.0 to 9.0.0 #247 @dependabot-preview
- Update bundler requirement from ~> 2.0.1 to ~> 2.1.4 #268 @dependabot-preview
- Bump @primer/css from 12.7.0 to 14.3.0 #296 @dependabot-preview

### Operations

- Update CI to test multiple versions of Jekyll
- Update CI to check the rake command that builds the search file

fixes #291 #256 #293 #177

## v0.2.7

### Bugs fixed
- Anchor headings are now displayed on hover, not only on heading hover
- Deduplicated anchor heading svg
- If last page of `site.html_pages` was excluded from search, search json breaks
- Config variable should be `blanklines` not `blank_lines` for html compression
- `list-style-none` does not hide bullets on `ul`

### Enhancements
- Summary for child pages appears in generated TOC
- Site logo configuration supported replacing title text with image
- Allow custom CSS overrides (new scss partial at the end of the cascade) separate from variable overrides.
- Configuration around search strings added to allow search for hyphenated words

### Maintenance
- Update docs to suggest using index.md as section page filename
- Bump @primer/css from 12.6.0 to 12.7.0
- Bump mixin-deep from 1.3.1 to 1.3.2
- Bump stylelint-config-primer from 7.0.1 to 8.0.0

### PR included
- #98 by @stefanoborini Introduces the possibility for a summary in the table of contents
- #141 by @ghabs Fix trailing comma bug in search-data.json
- #153 by @jacobherrington Change button copy on theme preview
- #181 by @m3nu Recommend using index.md as parent page for sections
- #183 by @SgtSilvio Improve heading anchors
- #187 by @SgtSilvio Improvement/site logo
- #200 Bump mixin-deep from 1.3.1 to 1.3.2
- #203 by @pdmosses Search config
- #205 by @pdmosses Fix blank_lines var to blanklines in config.yml
- #206 by @iamcarrico Allow for custom overrides by the user
- #208 Bump @primer/css from 12.6.0 to 12.7.0
- #213 Bump mixin-deep from 1.3.1 to 1.3.2
- #214 Bump stylelint-config-primer from 7.0.1 to 8.0.0
- #215 Bump @primer/css from 12.6.0 to 12.7.0

## v0.2.6

### Bugs fixed
- Google Analytics tag has been updated #162
- ~BaseURL has been modified #109~ Reverted -- seems the existing implementation worked
- Titles can now wrap fixes #106

### Enhancements
- Search now displays content preview #135
- Custom footer content added #179
- Now using GitHub Actions for CI #170

### Maintenance
- lunrjs upgraded #135
- Nav generation is optimized #159
- Stylelint upgrade #143
- Stylelint config primer upgrade #149
- Lodash upgrade #160

### PR included
~#109 by @daviddarnes - Fix baseurl link~ Reverted
#135 by @SgtSilvio - Upgrades lunr.js, improves search UI, adds heading anchors
#152 by @yavorg - Improves syntax highlighting for js readablity
#159 by @julienduchesne - Optimizes nav generation
#162 by @nergmada - Modifies the google analytics code to match the new tags used by GA


## v0.2.5

### Bugs fixed

- Duplicate title tag when Jekyll SEO Plugin gem is used #125 #126

### Enhancements

- Favicon support added #118

### Maintenance
- Bump stylelint-config-primer from 6.0.0 to 7.0.0  #123
- Bump @primer/css from 12.2.3 to 12.3.1 #129
- Add workflow to publish to GPR
- Fix workflow to publish to Ruby Gems

## v0.2.4

### Bugs

- #102 Remove unnecessary console.log() @JoeNyland
- #97 Import custom Sass variable overrides before default variables are defined @montchr and @ptvandi

### Additions
- #117 Add links to docs for setting up GH pages locally @gnarea
- #95 Add SEO and 'lang' param for `_config` @gebeto

## v0.2.3

### Enhancements
- Adds ability to use Google Analytics tracking by @pmarsceill

### Bug fixes
- Fixes 404 error for "/assets/js//search-data.json" by @stephenedmondson
- Fixes #80 Single quotes in the string were unescaped and ruby attempted variable substitution of amp within it (which failed) by @novelistparty
- Fixes bug that would only show 2 or more search results (not one) by @ilivewithian
- Fixes a typo on the layout example by @woernfl
- Fixes #78 Page scroll position too far down on load by @pmarsceill
- Fixds ability to nest ul in ol without breaking style or counters

### Dependency updates
- Bumps stylelint dependency from 9.9.0 to 9.10.1

## v0.2.2

- Bumps stylelint-config-primer to 3.0.1 #44
- Bumps bundler req to 2.0.1 #61
- Adds custom 404 page
- Excludes package-lock.json from jekyll build #47
- Fixes keyboard scrolling / focus #48
- Adds ARIA roles to navigation elements
- Adds support for optional page description metadata (if present in yaml front matter)
- Addresses some issues with search in #46
- Option to hide TOC on parent pages if turned off in page's YAML front matter #30
- Option to suppress an item from being indexed by search if present in page's YAML front matter #32

## v0.2.1

This update fixes security vulnerablities in the lodash sub-dependency and bumps other dev dependencies to their latest version.

## v0.2.0

Adds:
- Dark mode via `color_scheme` parameter
- Ability to exclude a page from the main nav with `nav_exclude` parameter closes #21
- Ability for create children of children pages (3 nav levels) closes #25

Changes:
- Permalink structure for tiered navigation has been updated
- Some colors have been updated for consistency / accessibility

## v0.1.6

### Added

- Support for task list styles #19
- Configuration docs
- Configuration option to enable / disable search
- Normalize.scss dependency pulled into project #16 #

### Fixed

- Layout bug in navigation #17

## v0.1.5

Major changes:

- Fixed bug where the rake task would fail when the assets/js directory didn't exist

## v0.1.4

Major changes:
- Adds Rake as a runtime dependency
- Definition list styled
- Sidebar and support cleaned up for smaller screen support
- Updated some stale docs

## v0.1.3

Major changes:
- Fix path problems, typos, and general clean-up for OSS.

## v0.1.2

Fix paths when deployed to gh-pages

## v0.1.1

Major updates:
- Adds search to mobile nav
- Pulls footer to bottom of the page on mobile (not hidden in nav)

Minor updates:
- Cleans up h1 typography spacing
