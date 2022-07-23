# Changelog

All notable changes to this project are documented in this file.

*Note:* the project underwent a maintenance shift in the creation of v0.4.0.

## Head

Major work in progress. Please see #779 for a v0.4.0 release candidate.

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
