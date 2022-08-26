# Changelog

All notable changes to this project are documented in this file.

*Note:* the project underwent a maintenance shift in the creation of v0.4.0.

## Head

### Changes

- Added: docs load mermaid.js by default by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/935
- Fixed: table of contents on search docs by @robinpokorny in https://github.com/just-the-docs/just-the-docs/pull/940
- Deleted: unused script directory by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/937

## v0.4.0.rc1

### We're back!

Hi all! The Just the Docs team is excited to have our first release in over two years! This release is jam-packed with features and bugfixes that have been requested by the community since 2020. They include:

- The new callouts component
- Allowing pages and collections to coexist on the navigation pane
- New styling: dark syntax highlighting, support for jekyll-asciidoc, word-wrapping instead of overflow for various elements
- More customization: external nav links, custom nav footers, favicon includes, search color and placeholder configuration, mermaid.js support, and nav sorting
- Over 20 bugfixes! Big ones include fixing the `rake` command, using `relative_url`, and search input color
- More documentation, especially on using custom includes.
- Updating core dependencies to stable Ruby versions
- A WIP [template repository](https://github.com/just-the-docs/just-the-docs-template) that allows you to setup your own repository using Just the Docs and GitHub Pages with one click - give it a shot! More documentation, etc. is on the way!

We want your feedback! Are these changes helpful? Are our docs easy to understand? Should new features like `mermaid` be opt-in or opt-out? Please [open an issue](https://github.com/just-the-docs/just-the-docs/issues) or [start a discussion](https://github.com/just-the-docs/just-the-docs/discussions) and let us know!

### Trying out `v0.4.0.rc1`

Due to the massive scope of these changes, we're releasing `v0.4.0.rc1` as a **release candidate** for the theme, with `v0.4.0` coming soon. We want your help in testing the theme! As of now, the gem on RubyGems and the repository are updated to `v0.4.0.rc1` - if your version of Just the Docs is not pinned, you'll see the changes the next time you build / run `bundle install` (if you don't use a `Gemfile.lock`) or `bundle update just-the-docs` (if you do).

To use this RC explicitly as a remote theme:

```yml
remote_theme: just-the-docs/just-the-docs@v0.4.0.rc1
```

To use this RC explicitly as a gem-based theme, pin the version in your `Gemfile` and re-run `bundle install`:

```Ruby
gem "just-the-docs", "0.4.0.rc1"
```

### Staying on `v0.3.3`

If you're not ready to make the switch, that's alright! If your version of just-the-docs is pinned to `v0.3.3` (i.e. by a `Gemfile.lock` or in `remote_theme`, then there's nothing you need to do.

If you have not pinned your theme version, you should either:

1. pin your gem version in your `Gemfile`, like so
```Ruby
gem "just-the-docs", "0.3.3"
```
2. freeze the `remote_theme`, like so
```yml
remote_theme: just-the-docs/just-the-docs@v0.3.3
```

**Warning**: Use of branches for closed PRs (e.g., https://github.com/just-the-docs/just-the-docs/pull/466, https://github.com/just-the-docs/just-the-docs/pull/578) is now deprecated, as those branches have been (directly or indirectly) merged, and they will be deleted after the release of `v0.4.0.rc1`.

### Maintenance

Internally, our maintainer team has expanded: [Patrick Marsceill](https://github.com/pmarsceill), the original maintainer, has stepped down from an active role after almost 4 years! We're very thankful for the work that he's done to create and maintain one of the most popular Jekyll themes. Please join us in giving him thanks!

The new core team currently consists of @mattxwang, @pdmosses, @skullface, @dougaitken, and @max06. Over the past six months, we've been triaging and merging in PRs, as well as contributing our own fixes. We'll continue to address open issues, merge in PRs from the community, and plan out the future of Just the Docs. If you'd like to contribute, now is a great time!

### Roadmap

In the short-term, we're committed to tidying up everything for a `v0.4.0` release. This involves fixing bugs reported from the community in this release, as well as continually merging in minor PRs.

We're also scoping out medium and long-term projects, and want to keep you in the loop. These include:

- upgrading to Jekyll 4, and stopping support for Jekyll 3
- improved accessibility - issues [#566](https://github.com/just-the-docs/just-the-docs/issues/566), [#870](https://github.com/just-the-docs/just-the-docs/issues/870)
- internationalization (i18n) - issue [#59](https://github.com/just-the-docs/just-the-docs/issues/59)
- recursive/multi-level navigation - PR [#462](https://github.com/just-the-docs/just-the-docs/pull/462)
- toggleable dark mode - issue [#234](https://github.com/just-the-docs/just-the-docs/issues/234)

as well as DX improvements like better regression tests, CI, and tooling. If you're interested in any of these, please join us [on GitHub](https://github.com/just-the-docs/just-the-docs) - any contribution (raising an issue, writing docs, or submitting a PR) is welcome!

### Features

* Added: Combination by @pdmosses in https://github.com/just-the-docs/just-the-docs/pull/578
  - Added: dark highlighting in https://github.com/just-the-docs/just-the-docs/pull/463
  - Added: pages and collections in https://github.com/just-the-docs/just-the-docs/pull/448
  - Added: callouts in https://github.com/just-the-docs/just-the-docs/pull/466
  - Fixed: breadcrumb behaviour … by @AdityaTiwari2102 in https://github.com/just-the-docs/just-the-docs/pull/477
  - Fixed: prevent rake command corrupting search data in https://github.com/just-the-docs/just-the-docs/pull/495 (also listed below)
  - Fixed: nested lists in https://github.com/just-the-docs/just-the-docs/pull/496
  - Fixed: set color for search input in https://github.com/just-the-docs/just-the-docs/pull/498 (also listed below)
  - Fixed: sites with no child pages (no PR)
  - Fixed: TOC/breadcrumbs for multiple collections in https://github.com/just-the-docs/just-the-docs/pull/494
  - Added: collection configuration option `nav_fold` (no PR)
  - Fixed: indentation and color for folded collection navigation (no PR)
  - Fixed: scroll navigation to show the link to the current page in https://github.com/just-the-docs/just-the-docs/pull/639
  - Fixed: Replace all uses of `absolute_url` by `relative_url`, by @svrooij in https://github.com/just-the-docs/just-the-docs/pull/544
* Added: custom favicon `_includes` by @burner1024 in https://github.com/just-the-docs/just-the-docs/pull/364
* Added: set color for search input by @pdmosses in https://github.com/just-the-docs/just-the-docs/pull/498
* Added: search placeholder configuration by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/613
* Added: 'child_nav_order' front matter to be able to sort navigation pages in reverse by @jmertic in https://github.com/just-the-docs/just-the-docs/pull/726
* Added: `nav_footer_custom` include by @nathanjessen in https://github.com/just-the-docs/just-the-docs/pull/474
* Added: style fixes for jekyll-asciidoc by @alyssais in https://github.com/just-the-docs/just-the-docs/pull/829
* Added: mermaid.js support by @nascosto in https://github.com/just-the-docs/just-the-docs/pull/857
* Added: support for external navigation links by @SPGoding in https://github.com/just-the-docs/just-the-docs/pull/876
* Added: refactor `mermaid` config to use `mermaid_config.js` include, only require `mermaid.version` in `_config.yml` by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/909
* Fixed: prepend `site.collections_dir` if exists by @alexsegura in https://github.com/just-the-docs/just-the-docs/pull/519
* Fixed: nested task lists (#517) by @pdmosses in https://github.com/just-the-docs/just-the-docs/pull/855
* Fixed: suppress Liquid processing in CSS comments by @pdmosses in https://github.com/just-the-docs/just-the-docs/pull/686
* Fixed: prevent rake command from corrupting search data by @pdmosses in https://github.com/just-the-docs/just-the-docs/pull/495
* Fixed: anchor heading links should be visible on focus by @jacobhq in https://github.com/just-the-docs/just-the-docs/pull/846
* Fixed: add `overflow-x: auto` to `figure.highlight` by @iridazzle in https://github.com/just-the-docs/just-the-docs/pull/727
* Fixed: add `overflow-wrap: word-break` to `body` by @iridazzle in https://github.com/just-the-docs/just-the-docs/pull/889
* Fixed: vertical alignment for consecutive labels by @Eisverygoodletter in https://github.com/just-the-docs/just-the-docs/pull/893
* Fixed: allow links to wrap by @pdmosses in https://github.com/just-the-docs/just-the-docs/pull/905
* Fixed: nav scroll feature and absolute/relative URLs by @pdmosses in https://github.com/just-the-docs/just-the-docs/pull/898

### Documentation

* Added: docs on how to break an `ol` by @pdmosses in https://github.com/just-the-docs/just-the-docs/pull/856
* Added: docs for custom includes by @nathanjessen in https://github.com/just-the-docs/just-the-docs/pull/806
* Added: document caveat about variable dependencies by @waldyrious in https://github.com/just-the-docs/just-the-docs/pull/555
* Added: docs on how to use `custom_head` to add a custom favicon by @UnclassedPenguin in https://github.com/just-the-docs/just-the-docs/pull/814
* Fixed: `ol` on `index.md` by @pmarsceill in https://github.com/just-the-docs/just-the-docs/pull/778
* Fixed: image link in Markdown kitchen sink by @JeffGuKang in https://github.com/just-the-docs/just-the-docs/pull/221
* Fixed: images in Markdown kitchen sink by @dougaitken in https://github.com/just-the-docs/just-the-docs/pull/782
* Fixed: clearer label of link to Jekyll quickstart by @waldyrious in https://github.com/just-the-docs/just-the-docs/pull/549
* Fixed: remove extra spaces in component docs by @MichelleBlanchette in https://github.com/just-the-docs/just-the-docs/pull/554
* Fixed: double "your" typo in `index.md` by @sehilyi in https://github.com/just-the-docs/just-the-docs/pull/499
* Fixed: "you" -> "your" typo in `index.md` by @nathanjessen in https://github.com/just-the-docs/just-the-docs/pull/473
* Fixed: spacing in toc example by @henryiii in https://github.com/just-the-docs/just-the-docs/pull/835
* Fixed: typo in `README` on `_config.yml` by @ivanskodje in https://github.com/just-the-docs/just-the-docs/pull/891
* Fixed: missing code fence in navigation structure docs by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/906

### Maintenance

* Added: VScode devcontainer by @max06 in https://github.com/just-the-docs/just-the-docs/pull/783
* Added: `webrick` to `Gemfile` by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/799
* Added: 'This site is powered by Netlify.' to the footer by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/797
* Updated: new repo path by @pmarsceill in https://github.com/just-the-docs/just-the-docs/pull/775
* Updated: rename `master` -> `main` by @pmarsceill in https://github.com/just-the-docs/just-the-docs/pull/776
* Updated: README by @pmarsceill in https://github.com/just-the-docs/just-the-docs/pull/777
* Updated: Code of Conduct to Contributor Covenant v2.1 by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/790
* Updated: CI files, Ruby & Node Versions by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/820
* Updated: Stylelint to v14, extend SCSS plugins, remove primer-* configs, resolve issues by @mattxwang in https://github.com/just-the-docs/just-the-docs/pull/821

### Dependencies
* Upgrade to GitHub-native Dependabot by @dependabot-preview in https://github.com/just-the-docs/just-the-docs/pull/627
* [Security] Bump y18n from 3.2.1 to 3.2.2 by @dependabot-preview in https://github.com/just-the-docs/just-the-docs/pull/606
* [Security] Bump hosted-git-info from 2.7.1 to 2.8.9 by @dependabot-preview in https://github.com/just-the-docs/just-the-docs/pull/641
* [Security] Bump lodash from 4.17.19 to 4.17.21 by @dependabot-preview in https://github.com/just-the-docs/just-the-docs/pull/640
* [Security] Bump ini from 1.3.5 to 1.3.8 by @dependabot-preview in https://github.com/just-the-docs/just-the-docs/pull/511
* Bump path-parse from 1.0.6 to 1.0.7 by @dependabot in https://github.com/just-the-docs/just-the-docs/pull/699
* Bump ajv from 6.10.0 to 6.12.6 by @dependabot in https://github.com/just-the-docs/just-the-docs/pull/766
* Bump prettier from 2.1.2 to 2.5.1 by @dependabot in https://github.com/just-the-docs/just-the-docs/pull/787
* Bump prettier from 2.5.1 to 2.6.2 by @dependabot in https://github.com/just-the-docs/just-the-docs/pull/809
* Bump prettier from 2.6.2 to 2.7.1 by @dependabot in https://github.com/just-the-docs/just-the-docs/pull/864

### New Contributors
* @alexsegura made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/519
* @burner1024 made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/364
* @JeffGuKang made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/221
* @dougaitken made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/782
* @max06 made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/783
* @sehilyi made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/499
* @nathanjessen made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/473
* @waldyrious made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/549
* @MichelleBlanchette made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/554
* @henryiii made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/835
* @jmertic made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/726
* @jacobhq made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/846
* @UnclassedPenguin made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/814
* @alyssais made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/829
* @nascosto made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/857
* @SPGoding made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/876
* @iridazzle made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/727
* @ivanskodje made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/891
* @Eisverygoodletter made their first contribution in https://github.com/just-the-docs/just-the-docs/pull/893

**Full Changelog**: https://github.com/just-the-docs/just-the-docs/compare/v0.3.3...v0.4.0.rc1

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
