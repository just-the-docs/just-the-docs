---
title: CHANGELOG
layout: default
---

# CHANGELOG

All notable user-facing changes to this project are documented in this file.

For information on upgrading to a new version (including resolving breaking changes), see the [Migration and Upgrading Guide](https://just-the-docs.com/MIGRATION).

For more detailed explanations for each release, see [the GitHub Releases page](https://github.com/just-the-docs/just-the-docs/releases).

## HEAD

{: .note }
This website is built from the `HEAD` of the `main` branch of the theme repository.

Code changes to `main` that are *not* in the latest release:

- N/A

Docs changes made since the latest release:

- N/A

## v0.11.0 - 2026-01-01

### Theme

- Fixed: low-contrast syntax highlighting via `accessible-pygments` and harsher backgrounds by [@mattxwang](https://github.com/mattxwang) in [#1749](https://github.com/just-the-docs/just-the-docs/pull/1749)
- Fixed: callout body text color contrast by [@mattxwang](https://github.com/mattxwang) in [#1748](https://github.com/just-the-docs/just-the-docs/pull/1748)
- Fixed: button and label color contrast by [@mattxwang](https://github.com/mattxwang) in [#1750](https://github.com/just-the-docs/just-the-docs/pull/1750)
- Fixed: inability to focus on scrollable code blocks via keyboard navigation by [@mattxwang](https://github.com/mattxwang) in [#1533](https://github.com/just-the-docs/just-the-docs/pull/1533)
- Fixed: `.site-footer` focus order on `sm` (mobile) viewport by [@mattxwang](https://github.com/mattxwang) in [#1751](https://github.com/just-the-docs/just-the-docs/pull/1751)
- Fixed: color contrast between dark mode background and `$link-color` by [@mattxwang](https://github.com/mattxwang) in [#1752](https://github.com/just-the-docs/just-the-docs/pull/1752)
- Fixed: color contrast for selected `.nav-list-link` in light mode by [@mattxwang](https://github.com/mattxwang) in [#1753](https://github.com/just-the-docs/just-the-docs/pull/1753)
- Fixed: sidebar ARIA role (by including navigation) by [@mattxwang](https://github.com/mattxwang) in [#1754](https://github.com/just-the-docs/just-the-docs/pull/1754)
- Fixed: `footer_content`/`footer_custom` color contrast by [@mattxwang](https://github.com/mattxwang) in [#1755](https://github.com/just-the-docs/just-the-docs/pull/1755)

### Documentation

- Added: aXe accessibility tests by [@cycomachead](https://github.com/cycomachead) in [#1756](https://github.com/just-the-docs/just-the-docs/pull/1756)

## v0.10.2 - 2025-12-31

### Theme

- Fixed: `margin-top` and `margin-bottom` for `<hr>` elements in print styles by [@jacksonj04](https://github.com/jacksonj04) in [#1677](https://github.com/just-the-docs/just-the-docs/pull/1677)
- Fixed: sidenav footer (`.site-footer`) color contrast by [@mattxwang](https://github.com/mattxwang) in [#1746](https://github.com/just-the-docs/just-the-docs/pull/1746)
- Fixed: use `aria-expanded` instead of `aria-pressed` for buttons connected to expandable content by [@rianrietveld](https://github.com/rianrietveld) in [#1679](https://github.com/just-the-docs/just-the-docs/pull/1679)
- Fixed: accessibility issues with search bar (color contrast, focus indicator, decorative icons) by [@mattxwang](https://github.com/mattxwang) in [#1747](https://github.com/just-the-docs/just-the-docs/pull/1747)

### Documentation

- Remove non-essential CHANGELOG information by [@mattxwang](https://github.com/mattxwang) in [#1745](https://github.com/just-the-docs/just-the-docs/pull/1745)

## v0.10.1 - 2025-01-06

### Theme

- Fixed: `back_to_top` not displaying when no other footer variables are set by [@mattxwang](https://github.com/mattxwang) in [#1461](https://github.com/just-the-docs/just-the-docs/pull/1461)
- Fixed: auto-generated child navigation (TOC) by [@pdmosses](https://github.com/pdmosses) in [#1590](https://github.com/just-the-docs/just-the-docs/pull/1590)

### Documentation

- Fixed: incorrect docs for example with minimal layout parent, default layout child by [@janbrasna](https://github.com/janbrasna) in [#1540](https://github.com/just-the-docs/just-the-docs/pull/1540)
- Fixed: unclear docs on using in-page table of contents by [@sebjameswml](https://github.com/sebjameswml) in [#1551](https://github.com/just-the-docs/just-the-docs/pull/1551)

## v0.10.0 - 2024-09-09

### Theme

- Added: Allow unlimited multi-level navigation by [@pdmosses](https://github.com/pdmosses) in [#1431](https://github.com/just-the-docs/just-the-docs/pull/1431)

### Documentation

- Added: Allow unlimited multi-level navigation by [@pdmosses](https://github.com/pdmosses) in [#1440](https://github.com/just-the-docs/just-the-docs/pull/1440)
- Added: sitemap (via `jekyll-sitemap` plugin) by [@mattxwang](https://github.com/mattxwang) in [#1530](https://github.com/just-the-docs/just-the-docs/pull/1530)
- Fixed: (non-systemic) accessibility issues flagged by aXe by [@mattxwang](https://github.com/mattxwang) in [#1531](https://github.com/just-the-docs/just-the-docs/pull/1531)

## v0.9.0 - 2024-08-12

### Theme

- Added: `nav_enabled` site, layout, and page-level variable to selectively show or hide the side/mobile menu by [@kevinlin1](https://github.com/kevinlin1) in [#1441](https://github.com/just-the-docs/just-the-docs/pull/1441)
- Added: site-wide search bar and auxiliary links to the `minimal` layout by [@kevinlin1](https://github.com/kevinlin1) in [#1441](https://github.com/just-the-docs/just-the-docs/pull/1441)
- Fixed: protect `search-data.json` file from front matter default for layout by [@mattxwang](https://github.com/mattxwang) in [#1468](https://github.com/just-the-docs/just-the-docs/pull/1468)
- Fixed: Sass mixed declarations by [@bobvandevijver](https://github.com/bobvandevijver) in [#1495](https://github.com/just-the-docs/just-the-docs/pull/1495)
- Fixed: redundant `monospace` in `pre`, `code`, `kbd`, `samp` reset by [@mattxwang](https://github.com/mattxwang) in [#1508](https://github.com/just-the-docs/just-the-docs/pull/1508)

### Documentation

- Docs: Explained the `nav_enabled` variables as an alternative to using the minimal layout [@kevinlin1](https://github.com/kevinlin1) in [#1441](https://github.com/just-the-docs/just-the-docs/pull/1441).

## v0.8.2 - 2024-05-15

### Theme

- Fixed: Protect theme JS file from front matter default for layout by [@pdmosses](https://github.com/pdmosses) in [#1447](https://github.com/just-the-docs/just-the-docs/pull/1447)

## v0.8.1 - 2024-03-06

### Theme

- Fixed: Liquid filter typo in breadcrumb component (`strip` instead of `trim`) by [@Zarthus](https://github.com/Zarthus) in [#1434](https://github.com/just-the-docs/just-the-docs/pull/1434)

### Documentation

- Build docs site using strict mode and `strict_filters` by [@Zarthus](https://github.com/Zarthus) in [#1435](https://github.com/just-the-docs/just-the-docs/pull/1435)

## v0.8.0 - 2024-02-22

### Theme

- Added: configurable keyboard shortcut to focus search input by [@kcromanpl-bajra](https://github.com/kcromanpl-bajra) in [#1411](https://github.com/just-the-docs/just-the-docs/pull/1411)
- Fixed: quicker build by [@pdmosses](https://github.com/pdmosses) in [#1397](https://github.com/just-the-docs/just-the-docs/pull/1397)
- Fixed: incorrect navigation when `.html` omitted from URL by [@pdmosses](https://github.com/pdmosses) in [#1374](https://github.com/just-the-docs/just-the-docs/pull/1374)
- Fixed: incorrect positioning of clickable area for navigation links on Safari by [@mattxwang](https://github.com/mattxwang) in [#1403](https://github.com/just-the-docs/just-the-docs/pull/1403)

### Documentation

- Add documentation to "Navigation Structure" on grouping pages with collections by [@mitchnemirov](https://github.com/mitchnemirov) in [#1390](https://github.com/just-the-docs/just-the-docs/pull/1390)

## v0.7.0 - 2023-10-25

{: .warning }
**Potentially Breaking Changes**: this version contains **potentially breaking changes** for a small set of users. For more information, refer to the [Migrating to v0.7.0 guide](https://just-the-docs.com/migration/#potentially-breaking-changes-in-v070).

### Theme

- Added: configuration options for opening external links in new tab by [@CarbonNeuron](https://github.com/CarbonNeuron) in [#1360](https://github.com/just-the-docs/just-the-docs/pull/1360)
- Fixed: remove href from the navigation link to the current page by [@pdmosses](https://github.com/pdmosses) in [#1356](https://github.com/just-the-docs/just-the-docs/pull/1356)
- Fixed: improve build time by [@pdmosses](https://github.com/pdmosses) in [#1358](https://github.com/just-the-docs/just-the-docs/pull/1358)
- Fixed: erroneous parentheses in `site_nav` conditional by [@mattxwang](https://github.com/mattxwang) in [#1366](https://github.com/just-the-docs/just-the-docs/pull/1366)
- Fixed: navigation scroll to active link regression by [@pdmosses](https://github.com/pdmosses) in [#1367](https://github.com/just-the-docs/just-the-docs/pull/1367)
- Fixed: invalid CSS rules in head elements by [@pdmosses](https://github.com/pdmosses) in [#1368](https://github.com/just-the-docs/just-the-docs/pull/1368)
- Fixed: accidental disabling of forward-declared stylesheets by [@mattxwang](https://github.com/mattxwang) in [#1373](https://github.com/just-the-docs/just-the-docs/pull/1373)

### Documentation:

- Docs: fix typos in `CHANGELOG` and `MIGRATION` by [@thapasusheel](https://github.com/thapasusheel) in [#1377](https://github.com/just-the-docs/just-the-docs/pull/1377)

## v0.6.2 - 2023-09-19

### Theme

- Fixed: Windows emoji font fallback by [@flanakin](https://github.com/flanakin) in [#1337](https://github.com/just-the-docs/just-the-docs/pull/1337)
- Removed: unused `.passive` toggle in navigation by [@pdmosses](https://github.com/pdmosses) in [#1335](https://github.com/just-the-docs/just-the-docs/pull/1335)

### New Contributors

- [@flanakin](https://github.com/flanakin) made their first contribution in [#1337](https://github.com/just-the-docs/just-the-docs/pull/1337)

## v0.6.1 - 2023-08-26

### Theme

- Fixed: JS error for pages excluded from navigation by [@pdmosses](https://github.com/pdmosses) in [#1332](https://github.com/just-the-docs/just-the-docs/pull/1332)

## v0.6.0 - 2023-08-19

{: .warning }
**Potentially Breaking Changes**: this version contains **potentially breaking changes** for a small set of users. For more information, refer to the [Migrating to v0.6.0 guide](https://just-the-docs.com/migration/#potentially-breaking-changes-in-v060).

### Theme

- Added: `$color-scheme` theme variable to specify `color-scheme` for `:root` by [@sigv](https://github.com/sigv) in [#1280](https://github.com/just-the-docs/just-the-docs/pull/1280)
- Fixed: build times for large sites by [@pdmosses](https://github.com/pdmosses) in [#1244](https://github.com/just-the-docs/just-the-docs/pull/1244)
- Fixed: missing closing `</button>` tag in `sidebar.html` by [@mattxwang](https://github.com/mattxwang) in [#1304](https://github.com/just-the-docs/just-the-docs/pull/1304)
- Fixed: removed duplicate `#main-content-wrap` minimal and default layouts by [@mattxwang](https://github.com/mattxwang) in [#1305](https://github.com/just-the-docs/just-the-docs/pull/1305)

### Documentation

- A [footnote]({% link docs/configuration.md %}#fn:js-disabled) in the configuration docs explains how disabling JavaScript affects the display of navigation links when browsing folded collections.
- Invalid HTML has been removed from most documentation examples.

## v0.5.4 - 2023-07-04

### Theme

- Fixed: Mermaid labels inheriting theme `.label` styling by [@mattxwang](https://github.com/mattxwang) in [#1278](https://github.com/just-the-docs/just-the-docs/pull/1278)

## v0.5.3 - 2023-06-17

### Theme

- Fixed: font-size scaling for text-related CSS properties by using `rem` instead of fixed `px` values; deprecate `$root-font-size` by [@mattxwang](https://github.com/mattxwang) in [#1169](https://github.com/just-the-docs/just-the-docs/pull/1169)

## v0.5.2 - 2023-06-07

### Theme

- Fixed: liquid variable leakage in navigation components by [@pdmosses](https://github.com/pdmosses) in [#1243](https://github.com/just-the-docs/just-the-docs/pull/1243)
- Fixed: ARIA roles and labels for search, header, logo, mobile menu button, and main content by [@joelhawksley](https://github.com/joelhawksley) in [#1259](https://github.com/just-the-docs/just-the-docs/pull/1259)
- Fixed: ARIA labels for all anchors with `href="#"`; adds `aria-pressed` information for toggles by [@mattxwang](https://github.com/mattxwang) in [#1262](https://github.com/just-the-docs/just-the-docs/pull/1262)

## v0.5.1 - 2023-04-25

### Theme

- Fixed: disable copy code button in insecure contexts [@rmoff](https://github.com/rmoff) in [#1226](https://github.com/just-the-docs/just-the-docs/pull/1226)
- Fixed: context-based media feature not supported by Safari `<16.4` by [@mattxwang](https://github.com/mattxwang) in [#1240](https://github.com/just-the-docs/just-the-docs/pull/1240)

### Documentation

- Added: document copy code button requiring secure context by [@rmoff](https://github.com/rmoff) in [#1225](https://github.com/just-the-docs/just-the-docs/pull/1225)
- Fixed: typo ("them" → "theme") in MIGRATION.md by [@waldyrious](https://github.com/waldyrious) in [#1219](https://github.com/just-the-docs/just-the-docs/pull/1219)
- Fixed: `font-weight` typo (Utilities > Typography) by [@mattxwang](https://github.com/mattxwang) in [#1229](https://github.com/just-the-docs/just-the-docs/pull/1229)
- Fixed: `just the docs` typo in migration guide by [@mattxwang](https://github.com/mattxwang) in [#1230](https://github.com/just-the-docs/just-the-docs/pull/1230)

## v0.5.0 - 2023-04-12

{: .warning }
**Potentially Breaking Changes**: this version contains **potentially breaking changes** for a small set of users. For more information, refer to the [Migrating to v0.5.0 guide](https://just-the-docs.com/migration/#potentially-breaking-changes-in-v050).

### Theme

- **Reverted (breaking)**: "Fix import order for `setup.scss` (#1184)" by [@mattxwang](https://github.com/mattxwang) in [#1209](https://github.com/just-the-docs/just-the-docs/pull/1209)
- Fixed: color contrast issues with `::selection` (reverting to browser defaults) [@mattxwang](https://github.com/mattxwang) in [#1208](https://github.com/just-the-docs/just-the-docs/pull/1208)
- Fixed: mermaid `v10`, bundle all mermaid code in component by [@mattxwang](https://github.com/mattxwang) in [#1190](https://github.com/just-the-docs/just-the-docs/pull/1190)
- Removed: unused images (`just-the-docs.png`, `search.svg`) by [@mattxwang](https://github.com/mattxwang) in [#1107](https://github.com/just-the-docs/just-the-docs/pull/1107)
- Removed: `CODE_OF_CONDUCT`, `docker-compose`, and `Dockerfile` files from site by [@mattxwang](https://github.com/mattxwang) in [#1187](https://github.com/just-the-docs/just-the-docs/pull/1187)

## v0.4.2 - 2023-03-14

### Theme

- Fixed: light scheme code highlighting contrast issues; updated to use Atom's One Light colors, consolidate theme variables by [@mattxwang](https://github.com/mattxwang) in [#1166](https://github.com/just-the-docs/just-the-docs/pull/1166)
- Fixed: duplicate import of `color_schemes` by [@mattxwang](https://github.com/mattxwang) in [#1173](https://github.com/just-the-docs/just-the-docs/pull/1173)
- Fixed: import order for `setup.scss` by [@mattxwang](https://github.com/mattxwang) in [#1184](https://github.com/just-the-docs/just-the-docs/pull/1184)
- Removed: unused dark syntax themes by [@mattxwang](https://github.com/mattxwang) in [#1192](https://github.com/just-the-docs/just-the-docs/pull/1192)

### Documentation

- Added: docs for using mermaid with AsciiDoc by [@flyx](https://github.com/flyx) in [#1182](https://github.com/just-the-docs/just-the-docs/pull/1182)

## v0.4.1 - 2023-02-23

### Theme

- Fixed: allow later versions of `bundler` by [@mattxwang](https://github.com/mattxwang) in [#1165](https://github.com/just-the-docs/just-the-docs/pull/1165)
- Fixed: AsciiDoc code block styling by [@flyx](https://github.com/flyx) in [#1168](https://github.com/just-the-docs/just-the-docs/pull/1168)
- Fixed: main content negative margin for viewports in `[$md, $nav-width + $content-width]` by [@Dima-369](https://github.com/Dima-369) in [#1177](https://github.com/just-the-docs/just-the-docs/pull/1177)
- Removed: unused `OneDarkJekyll` files by [@mattxwang](https://github.com/mattxwang) in [#1167](https://github.com/just-the-docs/just-the-docs/pull/1167)

### Documentation

- Fixed: re-add `jekyll-github-metadata` to docs site by [@mattxwang](https://github.com/mattxwang) in [#1108](https://github.com/just-the-docs/just-the-docs/pull/1108)

**Full Changelog**: [https://github.com/just-the-docs/just-the-docs/compare/v0.4.0...v0.4.1](https://github.com/just-the-docs/just-the-docs/compare/v0.4.0...v0.4.1)

## v0.4.0 - 2023-02-05

{: .note }
The project underwent a large maintenance shift in 2022; `0.4.0` is the first release from the new team.

{: .note }
This PR combines the last 5 release candidates (from `0.4.0.rc1` to `0.4.0.rc5`).

- Added: Combination by [@pdmosses](https://github.com/pdmosses) in [#578](https://github.com/just-the-docs/just-the-docs/pull/578)
  - Added: dark highlighting in [#463](https://github.com/just-the-docs/just-the-docs/pull/463)
  - Added: pages and collections in [#448](https://github.com/just-the-docs/just-the-docs/pull/448)
  - Added: callouts in [#466](https://github.com/just-the-docs/just-the-docs/pull/466)
  - Fixed: breadcrumb behaviour … by [@AdityaTiwari2102](https://github.com/AdityaTiwari2102) in [#477](https://github.com/just-the-docs/just-the-docs/pull/477)
  - Fixed: prevent rake command corrupting search data in [#495](https://github.com/just-the-docs/just-the-docs/pull/495) (also listed below)
  - Fixed: nested lists in [#496](https://github.com/just-the-docs/just-the-docs/pull/496)
  - Fixed: set color for search input in [#498](https://github.com/just-the-docs/just-the-docs/pull/498) (also listed below)
  - Fixed: sites with no child pages (no PR)
  - Fixed: TOC/breadcrumbs for multiple collections in [#494](https://github.com/just-the-docs/just-the-docs/pull/494)
  - Added: collection configuration option `nav_fold` (no PR)
  - Fixed: indentation and color for folded collection navigation (no PR)
  - Fixed: scroll navigation to show the link to the current page in [#639](https://github.com/just-the-docs/just-the-docs/pull/639)
  - Fixed: Replace all uses of `absolute_url` by `relative_url`, by [@svrooij](https://github.com/svrooij) in [#544](https://github.com/just-the-docs/just-the-docs/pull/544)
- Added: custom favicon `_includes` by [@burner1024](https://github.com/burner1024) in [#364](https://github.com/just-the-docs/just-the-docs/pull/364)
- Added: set color for search input by [@pdmosses](https://github.com/pdmosses) in [#498](https://github.com/just-the-docs/just-the-docs/pull/498)
- Added: search placeholder configuration by [@mattxwang](https://github.com/mattxwang) in [#613](https://github.com/just-the-docs/just-the-docs/pull/613)
- Added: 'child_nav_order' front matter to be able to sort navigation pages in reverse by [@jmertic](https://github.com/jmertic) in [#726](https://github.com/just-the-docs/just-the-docs/pull/726)
- Added: `nav_footer_custom` include by [@nathanjessen](https://github.com/nathanjessen) in [#474](https://github.com/just-the-docs/just-the-docs/pull/474)
- Added: style fixes for jekyll-asciidoc by [@alyssais](https://github.com/alyssais) in [#829](https://github.com/just-the-docs/just-the-docs/pull/829)
- Added: mermaid.js support by [@nascosto](https://github.com/nascosto) in [#857](https://github.com/just-the-docs/just-the-docs/pull/857)
- Added: support for external navigation links by [@SPGoding](https://github.com/SPGoding) in [#876](https://github.com/just-the-docs/just-the-docs/pull/876)
- Added: refactor `mermaid` config to use `mermaid_config.js` include, only require `mermaid.version` in `_config.yml` by [@mattxwang](https://github.com/mattxwang) in [#909](https://github.com/just-the-docs/just-the-docs/pull/909)
- Added: accessible titles to nested page nav toggle by [@JPrevost](https://github.com/JPrevost) in [#950](https://github.com/just-the-docs/just-the-docs/pull/950)
- Added: better title styling for AsciiDoc examples by [@alyssais](https://github.com/alyssais) in [#944](https://github.com/just-the-docs/just-the-docs/pull/944)
- Added: docs for custom search placeholder by [@mattxwang](https://github.com/mattxwang) in [#939](https://github.com/just-the-docs/just-the-docs/pull/939)
- Added: provide ability to skip to main content by [@JPrevost](https://github.com/JPrevost) in [#949](https://github.com/just-the-docs/just-the-docs/pull/949)
- Added: styling for `<blockquote>` by [@mattxwang](https://github.com/mattxwang) in [#965](https://github.com/just-the-docs/just-the-docs/pull/965)
- Added: custom include for TOC heading by [@pdmosses](https://github.com/pdmosses) in [#980](https://github.com/just-the-docs/just-the-docs/pull/980)
- Added: experimental nav optimization for simple cases by [@pdmosses](https://github.com/pdmosses) in [#992](https://github.com/just-the-docs/just-the-docs/pull/992)
- Added: support multiple Google Analytics tracking IDs, document UA to GA4 switch by [@MichelleBlanchette](https://github.com/MichelleBlanchette) in [#1029](https://github.com/just-the-docs/just-the-docs/pull/1029)
- Added: copy code button to code snippets by [@simonebortolin](https://github.com/simonebortolin) in [#945](https://github.com/just-the-docs/just-the-docs/pull/945)
- Added: restore simple configuration of `favicon.ico` via `site.static_files` by [@pdmosses](https://github.com/pdmosses) in [#1095](https://github.com/just-the-docs/just-the-docs/pull/1095)
- Added: modularize site components by [@mattxwang](https://github.com/mattxwang) in [#1058](https://github.com/just-the-docs/just-the-docs/pull/1058)
- Added: includes for custom `lunr` Liquid and JS code by [@diablodale](https://github.com/diablodale) in [#1068](https://github.com/just-the-docs/just-the-docs/pull/1068)
- Added: new `_sass/custom/setup.scss` for variable definition by [@mattxwang](https://github.com/mattxwang) in [#1135](https://github.com/just-the-docs/just-the-docs/pull/1135)
- Added: configuration key to load a local version of mermaid by [@fabrik42](https://github.com/fabrik42) in [#1153](https://github.com/just-the-docs/just-the-docs/pull/1153)
- Fixed: prepend `site.collections_dir` if exists by [@alexsegura](https://github.com/alexsegura) in [#519](https://github.com/just-the-docs/just-the-docs/pull/519)
- Fixed: nested task lists (#517) by [@pdmosses](https://github.com/pdmosses) in [#855](https://github.com/just-the-docs/just-the-docs/pull/855)
- Fixed: suppress Liquid processing in CSS comments by [@pdmosses](https://github.com/pdmosses) in [#686](https://github.com/just-the-docs/just-the-docs/pull/686)
- Fixed: prevent rake command from corrupting search data by [@pdmosses](https://github.com/pdmosses) in [#495](https://github.com/just-the-docs/just-the-docs/pull/495)
- Fixed: anchor heading links should be visible on focus by [@jacobhq](https://github.com/jacobhq) in [#846](https://github.com/just-the-docs/just-the-docs/pull/846)
- Fixed: add `overflow-x: auto` to `figure.highlight` by [@iridazzle](https://github.com/iridazzle) in [#727](https://github.com/just-the-docs/just-the-docs/pull/727)
- Fixed: add `overflow-wrap: word-break` to `body` by [@iridazzle](https://github.com/iridazzle) in [#889](https://github.com/just-the-docs/just-the-docs/pull/889)
- Fixed: vertical alignment for consecutive labels by [@Eisverygoodletter](https://github.com/Eisverygoodletter) in [#893](https://github.com/just-the-docs/just-the-docs/pull/893)
- Fixed: allow links to wrap by [@pdmosses](https://github.com/pdmosses) in [#905](https://github.com/just-the-docs/just-the-docs/pull/905)
- Fixed: nav scroll feature and absolute/relative URLs by [@pdmosses](https://github.com/pdmosses) in [#898](https://github.com/just-the-docs/just-the-docs/pull/898)
- Fixed: exclude `vendor/` in Jekyll config by [@manuelhenke](https://github.com/manuelhenke) in [#941](https://github.com/just-the-docs/just-the-docs/pull/941)
- Fixed: improve build time of navigation panel by [@pdmosses](https://github.com/pdmosses) in [#956](https://github.com/just-the-docs/just-the-docs/pull/956)
- Fixed: spacing issue when search is disabled by [@henryiii](https://github.com/henryiii) in [#960](https://github.com/just-the-docs/just-the-docs/pull/960)
- Fixed: active grandchild link class by [@pdmosses](https://github.com/pdmosses) in [#962](https://github.com/just-the-docs/just-the-docs/pull/962)
- Fixed: HTML validation issues (W3C validator) by [@mattxwang](https://github.com/mattxwang) in [#964](https://github.com/just-the-docs/just-the-docs/pull/964)
- Fixed: link styling now uses `text-decoration` values by [@mattxwang](https://github.com/mattxwang) in [#967](https://github.com/just-the-docs/just-the-docs/pull/967)
- Fixed: cleaning up Jekyll excludes by [@pdmosses](https://github.com/pdmosses) in [#985](https://github.com/just-the-docs/just-the-docs/pull/985)
- Fixed: docs, narrow styling for code highlighting with line numbers by [@pdmosses](https://github.com/pdmosses) in [#974](https://github.com/just-the-docs/just-the-docs/pull/974)
- Fixed: default syntax highlighting in custom color schemes [@pdmosses](https://github.com/pdmosses) in [#986](https://github.com/just-the-docs/just-the-docs/pull/986)
- Fixed: incorrect disambiguation in generated TOCs by [@pdmosses](https://github.com/pdmosses) in [#999](https://github.com/just-the-docs/just-the-docs/pull/999)
- Fixed: duplicated external links in collections by [@pdmosses](https://github.com/pdmosses) in [#1001](https://github.com/just-the-docs/just-the-docs/pull/1001)
- Fixed: import order of `custom.scss`; puts at end by [@deseo](https://github.com/deseo) in [#1010](https://github.com/just-the-docs/just-the-docs/pull/1010)
- Fixed: top-level active link styling by [@pdmosses](https://github.com/pdmosses) in [#1015](https://github.com/just-the-docs/just-the-docs/pull/1015)
- Fixed: external links for sites with no pages by [@pdmosses](https://github.com/pdmosses) in [#1021](https://github.com/just-the-docs/just-the-docs/pull/1021)
- Fixed: duplicate `title` if `jekyll-seo-tag` not in users's plugins by [@Tom-Brouwer](https://github.com/Tom-Brouwer) in [#1040](https://github.com/just-the-docs/just-the-docs/pull/1040)
- Fixed: removes (duplicate) `favicon.html`, shifts content to `head_custom.html` by [@mattxwang](https://github.com/mattxwang) in [#1027](https://github.com/just-the-docs/just-the-docs/pull/1027)
- Fixed: add `reversed`, deprecate `desc` for nav `child_nav_order` by [@jmertic](https://github.com/jmertic) in [#1061](https://github.com/just-the-docs/just-the-docs/pull/1061)
- Fixed: `child.child_nav_order` to `node.child_nav_order` by [@mattxwang](https://github.com/mattxwang) in [#1065](https://github.com/just-the-docs/just-the-docs/pull/1065)
- Fixed: remove all uses of `/` as SASS division by [@mattxwang](https://github.com/mattxwang) in [#1074](https://github.com/just-the-docs/just-the-docs/pull/1074)
    - note: this was originally merged as [#1074](https://github.com/just-the-docs/just-the-docs/pull/1074) with a bug; it was reverted in [#1076](https://github.com/just-the-docs/just-the-docs/pull/1076), and then reimplemented in [#1077](https://github.com/just-the-docs/just-the-docs/pull/1077)
- Fixed: skip nav collection generation when site has no pages by [@pdmosses](https://github.com/pdmosses) in [#1092](https://github.com/just-the-docs/just-the-docs/pull/1092)
- Fixed: standardize SCSS with `declaration-block-no-redundant-longhand-properties` by [@simonebortolin](https://github.com/simonebortolin) in [#1102](https://github.com/just-the-docs/just-the-docs/pull/1102)
- Fixed: incorrect `padding` property value pair in `labels.scss` by [@SConaway](https://github.com/SConaway) in [#1104](https://github.com/just-the-docs/just-the-docs/pull/1104)
- Fixed: various bugs with copy code button by [@simonebortolin](https://github.com/simonebortolin) in [#1096](https://github.com/just-the-docs/just-the-docs/pull/1096)
- Fixed: replace inline styling for `<svg>` icons by [@captn3m0](https://github.com/captn3m0) in [#1110](https://github.com/just-the-docs/just-the-docs/pull/1110)
- Fixed: incorrect `padding` property value pair in `search.scss` by [@kevinlin1](https://github.com/kevinlin1) in [#1123](https://github.com/just-the-docs/just-the-docs/pull/1123)
- Fixed: minor spacing and comment nits by [@EricFromCanada](https://github.com/EricFromCanada) in [#1128](https://github.com/just-the-docs/just-the-docs/pull/1128)
- Fixed: exclude images from being bundled with gem by [@m-r-mccormick](https://github.com/m-r-mccormick) in [#1142](https://github.com/just-the-docs/just-the-docs/pull/1142)
- Fixed: dark theme code block background, line number colors by [@m-r-mccormick](https://github.com/m-r-mccormick) in [#1124](https://github.com/just-the-docs/just-the-docs/pull/1124)
- Fixed: copy code button interaction with kramdown line numbers by [@mattxwang](https://github.com/mattxwang) in [#1143](https://github.com/just-the-docs/just-the-docs/pull/1143)
- Maintenance changes (developer-only)
    - Added: VScode devcontainer by [@max06](https://github.com/max06) in [#783](https://github.com/just-the-docs/just-the-docs/pull/783)
    - Added: `webrick` to `Gemfile` by [@mattxwang](https://github.com/mattxwang) in [#799](https://github.com/just-the-docs/just-the-docs/pull/799)
    - Added: 'This site is powered by Netlify.' to the footer by [@mattxwang](https://github.com/mattxwang) in [#797](https://github.com/just-the-docs/just-the-docs/pull/797)
    - Updated: new repo path by [@pmarsceill](https://github.com/pmarsceill) in [#775](https://github.com/just-the-docs/just-the-docs/pull/775)
    - Updated: rename `master` to `main` by [@pmarsceill](https://github.com/pmarsceill) in [#776](https://github.com/just-the-docs/just-the-docs/pull/776)
    - Updated: README by [@pmarsceill](https://github.com/pmarsceill) in [#777](https://github.com/just-the-docs/just-the-docs/pull/777)
    - Updated: Code of Conduct to Contributor Covenant v2.1 by [@mattxwang](https://github.com/mattxwang) in [#790](https://github.com/just-the-docs/just-the-docs/pull/790)
    - Updated: CI files, Ruby & Node Versions by [@mattxwang](https://github.com/mattxwang) in [#820](https://github.com/just-the-docs/just-the-docs/pull/820)
    - Updated: Stylelint to v14, extend SCSS plugins, remove primer-* configs, resolve issues by [@mattxwang](https://github.com/mattxwang) in [#821](https://github.com/just-the-docs/just-the-docs/pull/821)
    - Deleted: unused script directory by [@mattxwang](https://github.com/mattxwang) in [#937](https://github.com/just-the-docs/just-the-docs/pull/937)
    - Vendor: update `jekyll-anchor-headings`, `lunr.js` by [@mattxwang](https://github.com/mattxwang) in [#1071](https://github.com/just-the-docs/just-the-docs/pull/1071)
- Documentation changes
    - Added: docs on how to break an `ol` by [@pdmosses](https://github.com/pdmosses) in [#856](https://github.com/just-the-docs/just-the-docs/pull/856)
    - Added: docs for custom includes by [@nathanjessen](https://github.com/nathanjessen) in [#806](https://github.com/just-the-docs/just-the-docs/pull/806)
    - Added: document caveat about variable dependencies by [@waldyrious](https://github.com/waldyrious) in [#555](https://github.com/just-the-docs/just-the-docs/pull/555)
    - Added: docs on how to use `custom_head` to add a custom favicon by [@UnclassedPenguin](https://github.com/UnclassedPenguin) in [#814](https://github.com/just-the-docs/just-the-docs/pull/814)
    - Added: docs load mermaid.js by default by [@mattxwang](https://github.com/mattxwang) in [#935](https://github.com/just-the-docs/just-the-docs/pull/935)
    - Added: warning about mandatory `_`-prefix for collections by [@max06](https://github.com/max06) in [#1091](https://github.com/just-the-docs/just-the-docs/pull/1091)
    - Added:  migration guide by [@pdmosses](https://github.com/pdmosses) in [#1059](https://github.com/just-the-docs/just-the-docs/pull/1059)
    - Added: label new features introduced in `v0.4` by [@mattxwang](https://github.com/mattxwang) in [#1138](https://github.com/just-the-docs/just-the-docs/pull/1138)
    - Fixed: `ol` on `index.md` by [@pmarsceill](https://github.com/pmarsceill) in [#778](https://github.com/just-the-docs/just-the-docs/pull/778)
    - Fixed: image link in Markdown kitchen sink by [@JeffGuKang](https://github.com/JeffGuKang) in [#221](https://github.com/just-the-docs/just-the-docs/pull/221)
    - Fixed: images in Markdown kitchen sink by [@dougaitken](https://github.com/dougaitken) in [#782](https://github.com/just-the-docs/just-the-docs/pull/782)
    - Fixed: clearer label of link to Jekyll quickstart by [@waldyrious](https://github.com/waldyrious) in [#549](https://github.com/just-the-docs/just-the-docs/pull/549)
    - Fixed: remove extra spaces in component docs by [@MichelleBlanchette](https://github.com/MichelleBlanchette) in [#554](https://github.com/just-the-docs/just-the-docs/pull/554)
    - Fixed: double "your" typo in `index.md` by [@sehilyi](https://github.com/sehilyi) in [#499](https://github.com/just-the-docs/just-the-docs/pull/499)
    - Fixed: "you" to "your" typo in `index.md` by [@nathanjessen](https://github.com/nathanjessen) in [#473](https://github.com/just-the-docs/just-the-docs/pull/473)
    - Fixed: spacing in toc example by [@henryiii](https://github.com/henryiii) in [#835](https://github.com/just-the-docs/just-the-docs/pull/835)
    - Fixed: typo in `README` on `_config.yml` by [@ivanskodje](https://github.com/ivanskodje) in [#891](https://github.com/just-the-docs/just-the-docs/pull/891)
    - Fixed: missing code fence in navigation structure docs by [@mattxwang](https://github.com/mattxwang) in [#906](https://github.com/just-the-docs/just-the-docs/pull/906)
    - Fixed: table of contents on search docs by [@robinpokorny](https://github.com/robinpokorny) in [#940](https://github.com/just-the-docs/just-the-docs/pull/940)
    - Fixed: broken docs link (custom footer) by [@olgarithms](https://github.com/olgarithms) in [#951](https://github.com/just-the-docs/just-the-docs/pull/951)
    - Fixed: clarify version docs by [@pdmosses](https://github.com/pdmosses) in [#955](https://github.com/just-the-docs/just-the-docs/pull/955)
    - Fixed: typo in changelog links [@koppor](https://github.com/koppor) in [#1000](https://github.com/just-the-docs/just-the-docs/pull/1000)
    - Fixed: two bugs in "Customization" (custom favicon, new annotation) by [@mattxwang](https://github.com/mattxwang) in [#1090](https://github.com/just-the-docs/just-the-docs/pull/1090)
    - Fixed: "View Typography Utilities" link by [@agabrys](https://github.com/agabrys) in [#1130](https://github.com/just-the-docs/just-the-docs/pull/1130)
    - Fixed: broken relative page links by [@mattxwang](https://github.com/mattxwang) in [#1106](https://github.com/just-the-docs/just-the-docs/pull/1106)
    - Fixed: clarify steps to add custom `lunr` index code by [@diablodale](https://github.com/diablodale) in [#1139](https://github.com/just-the-docs/just-the-docs/pull/1139)
    - Updated: homepage (focus: new features, conciseness, deduplication) by [@pdmosses](https://github.com/pdmosses) in [#1018](https://github.com/just-the-docs/just-the-docs/pull/1018)
    - Updated: README (focus: new features, conciseness, deduplication) by [@pdmosses](https://github.com/pdmosses) in [#1019](https://github.com/just-the-docs/just-the-docs/pull/1019)
    - Updated: `README` demo video by [@codewithfan](https://github.com/codewithfan) in [#1097](https://github.com/just-the-docs/just-the-docs/pull/1097)

## v0.4.0.rc5

- Added: includes for custom `lunr` Liquid and JS code by [@diablodale](https://github.com/diablodale) in [#1068](https://github.com/just-the-docs/just-the-docs/pull/1068)
- Added: new `_sass/custom/setup.scss` for variable definition by [@mattxwang](https://github.com/mattxwang) in [#1135](https://github.com/just-the-docs/just-the-docs/pull/1135)
- Added: configuration key to load a local version of mermaid by [@fabrik42](https://github.com/fabrik42) in [#1153](https://github.com/just-the-docs/just-the-docs/pull/1153)
- Fixed: incorrect `padding` property value pair in `search.scss` by [@kevinlin1](https://github.com/kevinlin1) in [#1123](https://github.com/just-the-docs/just-the-docs/pull/1123)
- Fixed: minor spacing and comment nits by [@EricFromCanada](https://github.com/EricFromCanada) in [#1128](https://github.com/just-the-docs/just-the-docs/pull/1128)
- Fixed: exclude images from being bundled with gem by [@m-r-mccormick](https://github.com/m-r-mccormick) in [#1142](https://github.com/just-the-docs/just-the-docs/pull/1142)
- Fixed: dark theme code block background, line number colors by [@m-r-mccormick](https://github.com/m-r-mccormick) in [#1124](https://github.com/just-the-docs/just-the-docs/pull/1124)
- Fixed: copy code button interaction with kramdown line numbers by [@mattxwang](https://github.com/mattxwang) in [#1143](https://github.com/just-the-docs/just-the-docs/pull/1143)
- Docs: add a migration guide by [@pdmosses](https://github.com/pdmosses) in [#1059](https://github.com/just-the-docs/just-the-docs/pull/1059)
- Docs: update `README` demo video by [@codewithfan](https://github.com/codewithfan) in [#1097](https://github.com/just-the-docs/just-the-docs/pull/1097)
- Docs: update "View Typography Utilities" link by [@agabrys](https://github.com/agabrys) in [#1130](https://github.com/just-the-docs/just-the-docs/pull/1130)
- Docs: fix broken relative page links by [@mattxwang](https://github.com/mattxwang) in [#1106](https://github.com/just-the-docs/just-the-docs/pull/1106)
- Docs: clarify steps to add custom `lunr` index code by [@diablodale](https://github.com/diablodale) in [#1139](https://github.com/just-the-docs/just-the-docs/pull/1139)
- Docs: label new features introduced in `v0.4` by [@mattxwang](https://github.com/mattxwang) in [#1138](https://github.com/just-the-docs/just-the-docs/pull/1138)

## v0.4.0.rc4

- Added: support multiple Google Analytics tracking IDs, document UA to GA4 switch by [@MichelleBlanchette](https://github.com/MichelleBlanchette) in [#1029](https://github.com/just-the-docs/just-the-docs/pull/1029)
- Added: copy code button to code snippets by [@simonebortolin](https://github.com/simonebortolin) in [#945](https://github.com/just-the-docs/just-the-docs/pull/945)
- Added: restore simple configuration of `favicon.ico` via `site.static_files` by [@pdmosses](https://github.com/pdmosses) in [#1095](https://github.com/just-the-docs/just-the-docs/pull/1095)
- Added: modularize site components by [@mattxwang](https://github.com/mattxwang) in [#1058](https://github.com/just-the-docs/just-the-docs/pull/1058)
- Fixed: incorrect disambiguation in generated TOCs by [@pdmosses](https://github.com/pdmosses) in [#999](https://github.com/just-the-docs/just-the-docs/pull/999)
- Fixed: duplicated external links in collections by [@pdmosses](https://github.com/pdmosses) in [#1001](https://github.com/just-the-docs/just-the-docs/pull/1001)
- Fixed: import order of `custom.scss`; puts at end by [@deseo](https://github.com/deseo) in [#1010](https://github.com/just-the-docs/just-the-docs/pull/1010)
- Fixed: top-level active link styling by [@pdmosses](https://github.com/pdmosses) in [#1015](https://github.com/just-the-docs/just-the-docs/pull/1015)
- Fixed: external links for sites with no pages by [@pdmosses](https://github.com/pdmosses) in [#1021](https://github.com/just-the-docs/just-the-docs/pull/1021)
- Fixed: duplicate `title` if `jekyll-seo-tag` not in users's plugins by [@Tom-Brouwer](https://github.com/Tom-Brouwer) in [#1040](https://github.com/just-the-docs/just-the-docs/pull/1040)
- Fixed: removes (duplicate) `favicon.html`, shifts content to `head_custom.html` by [@mattxwang](https://github.com/mattxwang) in [#1027](https://github.com/just-the-docs/just-the-docs/pull/1027)
- Fixed: add `reversed`, deprecate `desc` for nav `child_nav_order` by [@jmertic](https://github.com/jmertic) in [#1061](https://github.com/just-the-docs/just-the-docs/pull/1061)
- Fixed: `child.child_nav_order` to `node.child_nav_order` by [@mattxwang](https://github.com/mattxwang) in [#1065](https://github.com/just-the-docs/just-the-docs/pull/1065)
- Fixed: remove all uses of `/` as SASS division by [@mattxwang](https://github.com/mattxwang) in [#1074](https://github.com/just-the-docs/just-the-docs/pull/1074)
    - note: this was originally merged as [#1074](https://github.com/just-the-docs/just-the-docs/pull/1074) with a bug; it was reverted in [#1076](https://github.com/just-the-docs/just-the-docs/pull/1076), and then reimplemented in [#1077](https://github.com/just-the-docs/just-the-docs/pull/1077)
- Fixed: skip nav collection generation when site has no pages by [@pdmosses](https://github.com/pdmosses) in [#1092](https://github.com/just-the-docs/just-the-docs/pull/1092)
- Fixed: standardize SCSS with `declaration-block-no-redundant-longhand-properties` by [@simonebortolin](https://github.com/simonebortolin) in [#1102](https://github.com/just-the-docs/just-the-docs/pull/1102)
- Fixed: incorrect `padding` property value pair in `labels.scss` by [@SConaway](https://github.com/SConaway) in [#1104](https://github.com/just-the-docs/just-the-docs/pull/1104)
- Fixed: various bugs with copy code button by [@simonebortolin](https://github.com/simonebortolin) in [#1096](https://github.com/just-the-docs/just-the-docs/pull/1096)
- Fixed: replace inline styling for `<svg>` icons by [@captn3m0](https://github.com/captn3m0) in [#1110](https://github.com/just-the-docs/just-the-docs/pull/1110)
- Vendor: update `jekyll-anchor-headings`, `lunr.js` by [@mattxwang](https://github.com/mattxwang) in [#1071](https://github.com/just-the-docs/just-the-docs/pull/1071)
- Docs: fix typo in changelog links [@koppor](https://github.com/koppor) in [#1000](https://github.com/just-the-docs/just-the-docs/pull/1000)
- Docs: update homepage (focus: new features, conciseness, deduplication) by [@pdmosses](https://github.com/pdmosses) in [#1018](https://github.com/just-the-docs/just-the-docs/pull/1018)
- Docs: update README (focus: new features, conciseness, deduplication) by [@pdmosses](https://github.com/pdmosses) in [#1019](https://github.com/just-the-docs/just-the-docs/pull/1019)
- Docs: fix two bugs in "Customization" (custom favicon, new annotation) by [@mattxwang](https://github.com/mattxwang) in [#1090](https://github.com/just-the-docs/just-the-docs/pull/1090)
- Docs: Add warning about mandatory `_`-prefix for collections by [@max06](https://github.com/max06) in [#1091](https://github.com/just-the-docs/just-the-docs/pull/1091)
- Docs: remove Google Analytics on main site by [@mattxwang](https://github.com/mattxwang) in [#1113](https://github.com/just-the-docs/just-the-docs/pull/1113)

## v0.4.0.rc3

- Added: styling for `<blockquote>` by [@mattxwang](https://github.com/mattxwang) in [#965](https://github.com/just-the-docs/just-the-docs/pull/965)
- Added: custom include for TOC heading by [@pdmosses](https://github.com/pdmosses) in [#980](https://github.com/just-the-docs/just-the-docs/pull/980)
- Added: experimental nav optimization for simple cases by [@pdmosses](https://github.com/pdmosses) in [#992](https://github.com/just-the-docs/just-the-docs/pull/992)
- Fixed: spacing issue when search is disabled by [@henryiii](https://github.com/henryiii) in [#960](https://github.com/just-the-docs/just-the-docs/pull/960)
- Fixed: active grandchild link class by [@pdmosses](https://github.com/pdmosses) in [#962](https://github.com/just-the-docs/just-the-docs/pull/962)
- Fixed: HTML validation issues (W3C validator) by [@mattxwang](https://github.com/mattxwang) in [#964](https://github.com/just-the-docs/just-the-docs/pull/964)
- Fixed: link styling now uses `text-decoration` values by [@mattxwang](https://github.com/mattxwang) in [#967](https://github.com/just-the-docs/just-the-docs/pull/967)
- Fixed: cleaning up Jekyll excludes by [@pdmosses](https://github.com/pdmosses) in [#985](https://github.com/just-the-docs/just-the-docs/pull/985)
- Fixed: docs, narrow styling for code highlighting with line numbers by [@pdmosses](https://github.com/pdmosses) in [#974](https://github.com/just-the-docs/just-the-docs/pull/974)
- Fixed: default syntax highlighting in custom color schemes [@pdmosses](https://github.com/pdmosses) in [#986](https://github.com/just-the-docs/just-the-docs/pull/986)

## v0.4.0.rc2

- Added: accessible titles to nested page nav toggle by [@JPrevost](https://github.com/JPrevost) in [#950](https://github.com/just-the-docs/just-the-docs/pull/950)
- Added: better title styling for AsciiDoc examples by [@alyssais](https://github.com/alyssais) in [#944](https://github.com/just-the-docs/just-the-docs/pull/944)
- Added: docs for custom search placeholder by [@mattxwang](https://github.com/mattxwang) in [#939](https://github.com/just-the-docs/just-the-docs/pull/939)
- Added: provide ability to skip to main content by [@JPrevost](https://github.com/JPrevost) in [#949](https://github.com/just-the-docs/just-the-docs/pull/949)
- Fixed: exclude `vendor/` in Jekyll config by [@manuelhenke](https://github.com/manuelhenke) in [#941](https://github.com/just-the-docs/just-the-docs/pull/941)
- Fixed: improve build time of navigation panel by [@pdmosses](https://github.com/pdmosses) in [#956](https://github.com/just-the-docs/just-the-docs/pull/956)
- Added: docs load mermaid.js by default by [@mattxwang](https://github.com/mattxwang) in [#935](https://github.com/just-the-docs/just-the-docs/pull/935)
- Fixed: table of contents on search docs by [@robinpokorny](https://github.com/robinpokorny) in [#940](https://github.com/just-the-docs/just-the-docs/pull/940)
- Fixed: broken docs link (custom footer) by [@olgarithms](https://github.com/olgarithms) in [#951](https://github.com/just-the-docs/just-the-docs/pull/951)
- Fixed: clarify version docs by [@pdmosses](https://github.com/pdmosses) in [#955](https://github.com/just-the-docs/just-the-docs/pull/955)
- Deleted: unused script directory by [@mattxwang](https://github.com/mattxwang) in [#937](https://github.com/just-the-docs/just-the-docs/pull/937)

## v0.4.0.rc1

- Added: Combination by [@pdmosses](https://github.com/pdmosses) in [#578](https://github.com/just-the-docs/just-the-docs/pull/578)
  - Added: dark highlighting in [#463](https://github.com/just-the-docs/just-the-docs/pull/463)
  - Added: pages and collections in [#448](https://github.com/just-the-docs/just-the-docs/pull/448)
  - Added: callouts in [#466](https://github.com/just-the-docs/just-the-docs/pull/466)
  - Fixed: breadcrumb behaviour … by [@AdityaTiwari2102](https://github.com/AdityaTiwari2102) in [#477](https://github.com/just-the-docs/just-the-docs/pull/477)
  - Fixed: prevent rake command corrupting search data in [#495](https://github.com/just-the-docs/just-the-docs/pull/495) (also listed below)
  - Fixed: nested lists in [#496](https://github.com/just-the-docs/just-the-docs/pull/496)
  - Fixed: set color for search input in [#498](https://github.com/just-the-docs/just-the-docs/pull/498) (also listed below)
  - Fixed: sites with no child pages (no PR)
  - Fixed: TOC/breadcrumbs for multiple collections in [#494](https://github.com/just-the-docs/just-the-docs/pull/494)
  - Added: collection configuration option `nav_fold` (no PR)
  - Fixed: indentation and color for folded collection navigation (no PR)
  - Fixed: scroll navigation to show the link to the current page in [#639](https://github.com/just-the-docs/just-the-docs/pull/639)
  - Fixed: Replace all uses of `absolute_url` by `relative_url`, by [@svrooij](https://github.com/svrooij) in [#544](https://github.com/just-the-docs/just-the-docs/pull/544)
- Added: custom favicon `_includes` by [@burner1024](https://github.com/burner1024) in [#364](https://github.com/just-the-docs/just-the-docs/pull/364)
- Added: set color for search input by [@pdmosses](https://github.com/pdmosses) in [#498](https://github.com/just-the-docs/just-the-docs/pull/498)
- Added: search placeholder configuration by [@mattxwang](https://github.com/mattxwang) in [#613](https://github.com/just-the-docs/just-the-docs/pull/613)
- Added: 'child_nav_order' front matter to be able to sort navigation pages in reverse by [@jmertic](https://github.com/jmertic) in [#726](https://github.com/just-the-docs/just-the-docs/pull/726)
- Added: `nav_footer_custom` include by [@nathanjessen](https://github.com/nathanjessen) in [#474](https://github.com/just-the-docs/just-the-docs/pull/474)
- Added: style fixes for jekyll-asciidoc by [@alyssais](https://github.com/alyssais) in [#829](https://github.com/just-the-docs/just-the-docs/pull/829)
- Added: mermaid.js support by [@nascosto](https://github.com/nascosto) in [#857](https://github.com/just-the-docs/just-the-docs/pull/857)
- Added: support for external navigation links by [@SPGoding](https://github.com/SPGoding) in [#876](https://github.com/just-the-docs/just-the-docs/pull/876)
- Added: refactor `mermaid` config to use `mermaid_config.js` include, only require `mermaid.version` in `_config.yml` by [@mattxwang](https://github.com/mattxwang) in [#909](https://github.com/just-the-docs/just-the-docs/pull/909)
- Fixed: prepend `site.collections_dir` if exists by [@alexsegura](https://github.com/alexsegura) in [#519](https://github.com/just-the-docs/just-the-docs/pull/519)
- Fixed: nested task lists (#517) by [@pdmosses](https://github.com/pdmosses) in [#855](https://github.com/just-the-docs/just-the-docs/pull/855)
- Fixed: suppress Liquid processing in CSS comments by [@pdmosses](https://github.com/pdmosses) in [#686](https://github.com/just-the-docs/just-the-docs/pull/686)
- Fixed: prevent rake command from corrupting search data by [@pdmosses](https://github.com/pdmosses) in [#495](https://github.com/just-the-docs/just-the-docs/pull/495)
- Fixed: anchor heading links should be visible on focus by [@jacobhq](https://github.com/jacobhq) in [#846](https://github.com/just-the-docs/just-the-docs/pull/846)
- Fixed: add `overflow-x: auto` to `figure.highlight` by [@iridazzle](https://github.com/iridazzle) in [#727](https://github.com/just-the-docs/just-the-docs/pull/727)
- Fixed: add `overflow-wrap: word-break` to `body` by [@iridazzle](https://github.com/iridazzle) in [#889](https://github.com/just-the-docs/just-the-docs/pull/889)
- Fixed: vertical alignment for consecutive labels by [@Eisverygoodletter](https://github.com/Eisverygoodletter) in [#893](https://github.com/just-the-docs/just-the-docs/pull/893)
- Fixed: allow links to wrap by [@pdmosses](https://github.com/pdmosses) in [#905](https://github.com/just-the-docs/just-the-docs/pull/905)
- Fixed: nav scroll feature and absolute/relative URLs by [@pdmosses](https://github.com/pdmosses) in [#898](https://github.com/just-the-docs/just-the-docs/pull/898)
- Documentation changes
    - Added: docs on how to break an `ol` by [@pdmosses](https://github.com/pdmosses) in [#856](https://github.com/just-the-docs/just-the-docs/pull/856)
    - Added: docs for custom includes by [@nathanjessen](https://github.com/nathanjessen) in [#806](https://github.com/just-the-docs/just-the-docs/pull/806)
    - Added: document caveat about variable dependencies by [@waldyrious](https://github.com/waldyrious) in [#555](https://github.com/just-the-docs/just-the-docs/pull/555)
    - Added: docs on how to use `custom_head` to add a custom favicon by [@UnclassedPenguin](https://github.com/UnclassedPenguin) in [#814](https://github.com/just-the-docs/just-the-docs/pull/814)
    - Fixed: `ol` on `index.md` by [@pmarsceill](https://github.com/pmarsceill) in [#778](https://github.com/just-the-docs/just-the-docs/pull/778)
    - Fixed: image link in Markdown kitchen sink by [@JeffGuKang](https://github.com/JeffGuKang) in [#221](https://github.com/just-the-docs/just-the-docs/pull/221)
    - Fixed: images in Markdown kitchen sink by [@dougaitken](https://github.com/dougaitken) in [#782](https://github.com/just-the-docs/just-the-docs/pull/782)
    - Fixed: clearer label of link to Jekyll quickstart by [@waldyrious](https://github.com/waldyrious) in [#549](https://github.com/just-the-docs/just-the-docs/pull/549)
    - Fixed: remove extra spaces in component docs by [@MichelleBlanchette](https://github.com/MichelleBlanchette) in [#554](https://github.com/just-the-docs/just-the-docs/pull/554)
    - Fixed: double "your" typo in `index.md` by [@sehilyi](https://github.com/sehilyi) in [#499](https://github.com/just-the-docs/just-the-docs/pull/499)
    - Fixed: "you" to "your" typo in `index.md` by [@nathanjessen](https://github.com/nathanjessen) in [#473](https://github.com/just-the-docs/just-the-docs/pull/473)
    - Fixed: spacing in toc example by [@henryiii](https://github.com/henryiii) in [#835](https://github.com/just-the-docs/just-the-docs/pull/835)
    - Fixed: typo in `README` on `_config.yml` by [@ivanskodje](https://github.com/ivanskodje) in [#891](https://github.com/just-the-docs/just-the-docs/pull/891)
    - Fixed: missing code fence in navigation structure docs by [@mattxwang](https://github.com/mattxwang) in [#906](https://github.com/just-the-docs/just-the-docs/pull/906)
- Maintenance changes (developer-only)
    - Added: VScode devcontainer by [@max06](https://github.com/max06) in [#783](https://github.com/just-the-docs/just-the-docs/pull/783)
    - Added: `webrick` to `Gemfile` by [@mattxwang](https://github.com/mattxwang) in [#799](https://github.com/just-the-docs/just-the-docs/pull/799)
    - Added: 'This site is powered by Netlify.' to the footer by [@mattxwang](https://github.com/mattxwang) in [#797](https://github.com/just-the-docs/just-the-docs/pull/797)
    - Updated: new repo path by [@pmarsceill](https://github.com/pmarsceill) in [#775](https://github.com/just-the-docs/just-the-docs/pull/775)
    - Updated: rename `master` to `main` by [@pmarsceill](https://github.com/pmarsceill) in [#776](https://github.com/just-the-docs/just-the-docs/pull/776)
    - Updated: README by [@pmarsceill](https://github.com/pmarsceill) in [#777](https://github.com/just-the-docs/just-the-docs/pull/777)
    - Updated: Code of Conduct to Contributor Covenant v2.1 by [@mattxwang](https://github.com/mattxwang) in [#790](https://github.com/just-the-docs/just-the-docs/pull/790)
    - Updated: CI files, Ruby & Node Versions by [@mattxwang](https://github.com/mattxwang) in [#820](https://github.com/just-the-docs/just-the-docs/pull/820)
    - Updated: Stylelint to v14, extend SCSS plugins, remove primer-* configs, resolve issues by [@mattxwang](https://github.com/mattxwang) in [#821](https://github.com/just-the-docs/just-the-docs/pull/821)

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

This update fixes security vulnerabilities in the lodash sub-dependency and bumps other dev dependencies to their latest version.

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
