---
title: Configuration
nav_order: 2
---

# Configuration
{: .no_toc }

Just the Docs has some specific configuration parameters that can be defined in your Jekyll site's \_config.yml file.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

View this site's [\_config.yml](https://github.com/just-the-docs/just-the-docs/tree/main/_config.yml) file as an example.

## Site logo

```yaml
# Set a path/url to a logo that will be displayed instead of the title
logo: "/assets/images/just-the-docs.png"
```

## Site favicon

```yaml
# Set a path/url to a favicon that will be displayed by the browser
favicon_ico: "/assets/images/favicon.ico"
```

If the path to your favicon is `/favicon.ico`, you can leave `favicon_ico` unset.

## Search

```yaml
# Enable or disable the site search
# Supports true (default) or false
search_enabled: true

search:
  # Split pages into sections that can be searched individually
  # Supports 1 - 6, default: 2
  heading_level: 2
  # Maximum amount of previews per search result
  # Default: 3
  previews: 3
  # Maximum amount of words to display before a matched word in the preview
  # Default: 5
  preview_words_before: 5
  # Maximum amount of words to display after a matched word in the preview
  # Default: 10
  preview_words_after: 10
  # Set the search token separator
  # Default: /[\s\-/]+/
  # Example: enable support for hyphenated search words
  tokenizer_separator: /[\s/]+/
  # Display the relative url in search results
  # Supports true (default) or false
  rel_url: true
  # Enable or disable the search button that appears in the bottom right corner of every page
  # Supports true or false (default)
  button: false
  # Focus the search input by pressing `ctrl + focus_shortcut_key` (or `cmd + focus_shortcut_key` on macOS)
  focus_shortcut_key: 'k'
```

## Mermaid Diagrams
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

The minimum configuration requires the key for `version` ([from jsDelivr](https://cdn.jsdelivr.net/npm/mermaid/)) in `_config.yml`:

```yaml
mermaid:
  # Version of mermaid library
  # Pick an available version from https://cdn.jsdelivr.net/npm/mermaid/
  version: "9.1.3"
```

Provide a `path` instead of a `version` key to load the mermaid library from a local file.

See [the Code documentation]({% link docs/ui-components/code/index.md %}#mermaid-diagram-code-blocks) for more configuration options and information.

## Aux links

```yaml
# Aux links for the upper right navigation
aux_links:
  "Just the Docs on GitHub":
    - "//github.com/just-the-docs/just-the-docs"

# Makes Aux links open in a new tab. Default is false
aux_links_new_tab: false
```

## Navigation sidebar

```yaml
# Enable or disable the side/mobile menu globally
# Nav menu can also be selectively enabled or disabled using page variables or the minimal layout
nav_enabled: true
```

## Table of Contents side/top panel

```yaml
# Enable or disable the Table of Contents (ToC) side/top panel
toc_enabled: true # or false
toc:
  # Minimum heading level to include in the ToC. Default: 2
  min_heading_level: 2
  # Maximum heading level to include in the ToC. Default: 6
  max_heading_level: 6
  # Display the ToC as an ordered list (true) or unordered list (false)
  ordered: false # or true
  # Display the ToC as a single level list. Supports true or false (default)
  flat_toc: false # or true
  # Highlight the current section(s) in view in the ToC (requires JavaScript)
  highlight_active: true # or false
  highlight:
    # Highlight all sections in view under [offset] (true), or only the first section under [offset] when the previous heading is out of view (false)
    in_view: true # or false
    # Pixel offset from the top of the viewport to determine when a section is considered "in view". Remove to set as middle of the viewport.
    offset: 60
  # Display the ToC sidebar as a floating panel (default: float) or as a clipped side panel (side) on small desktops and tablets
  # tip: setting 'float' allows double-clicking the sidebar opener button to scroll up
  style: "float" # 'float' or 'side', additionally add any custom CSS classes to the panel, separated by spaces
  # Title of the side/top panel, appear above the ToC, top banner on mobile and in accessibility text
  title: "Table of Contents"
  # Back to top button in the ToC panel. Default: true
  back_to_top: true # or false
  # back_to_top_text: "Back to top"
  # Display "Edit this page on GitHub" link in the ToC panel (requires configuring gh_edit_link). Default: false
  gh_edit_link: false # or true
  # Accessibility text for the skip link to the ToC panel (requires JavaScript, optional, default: "Skip to the Table of Contents")
  # skip_label: "Skip to the Table of Contents"
  # Shortcut key to quick open the ToC panel (requires JavaScript, optional, default: t). Remove to disable keyboard shortcut.
  # Uncomment one or multiple modifier key options below to set a key combination for opening the ToC panel
  shortcut:
    key: "t" # or any other key you prefer, remove this option to set 't' as the default
    # ctrl_meta: false # or true => press and hold Ctrl on Windows/Linux or Command on macOS + key to open the ToC panel
    # alt: false # or true => press and hold Alt on Windows/Linux or Option on macOS + key to open the ToC panel
    # shift: false # or true => press and hold Shift + key to open the ToC panel
  # Feel free to add extra jekyll-toc settings, see _includes/vendor/toc.html
```

Because of the large shift in layout, the Table of Contents (ToC) side/top panel is opt-out per page or layout. Once enabled in `_config.yml`, this feature will be on site-wide, and you need to set the `toc_enabled` property individually if you wish to hide the ToC panel for a page or layout. Likewise, to use the ToC panel for just one page, you have to enable the feature site-wide.

Disabling the ToC panel site-wide, then setting `toc_enabled: true` on a page or layout is not allowed. If you don't like this behaviour, you may want to use [In-Page Navigation]({% link docs/navigation/in-page.md %}) instead, which can be used on a per-page basis.

Omitting a heading from the ToC can be done by adding the `{:.no_toc}` class to that heading.

To change the width of the ToC sidebar, you can set the `$toc-width` SCSS variable.

See [Layout]({% link docs/layout/layout.md %}) and [In-Page Navigation]({% link docs/navigation/in-page.md %}) for examples on disabling the panel on a page or hiding headings from the panel, and [Customization - Custom Side/Top Panel]({% link docs/customization.md %}#custom-sidetop-panel) for information on replacing the ToC panel with a custom side panel.

## Heading anchor links

```yaml
# Heading anchor links appear on hover over h1-h6 tags in page content
# allowing users to deep link to a particular heading on a page.
#
# Supports true (default) or false
heading_anchors: true
```

## External navigation links
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

External links can be added to the navigation through the `nav_external_links` option.
See [Navigation Structure]({% link docs/navigation/main/external.md %}) for more details.

## Footer content

```yaml
# Footer content
# appears at the bottom of every page's main content
# Note: The footer_content option is deprecated and will be removed in a future major release. Please use `_includes/footer_custom.html` for more robust
markup / liquid-based content.
footer_content: "Copyright &copy; 2017-2020 Patrick Marsceill. Distributed by an <a href=\"https://github.com/just-the-docs/just-the-docs/tree/main/LICENSE.txt\">MIT license.</a>"

# Footer last edited timestamp
last_edit_timestamp: true # show or hide edit time - page must have `last_modified_date` defined in the frontmatter
last_edit_time_format: "%b %e %Y at %I:%M %p" # uses ruby's time format: https://ruby-doc.org/stdlib-2.7.0/libdoc/time/rdoc/Time.html

# Footer "Edit this page on GitHub" link text
gh_edit_link: true # show or hide edit this page link
gh_edit_link_text: "Edit this page on GitHub."
gh_edit_repository: "https://github.com/just-the-docs/just-the-docs" # the github URL for your repo
gh_edit_branch: "main" # the branch that your docs is served from
# gh_edit_source: docs # the source that your files originate from
gh_edit_view_mode: "tree" # "tree" or "edit" if you want the user to jump into the editor immediately
```

_note: `footer_content` is deprecated, but still supported. For a better experience we have moved this into an include called `_includes/footer_custom.html` which will allow for robust markup / liquid-based content._

- the "page last modified" data will only display if a page has a key called `last_modified_date`, formatted in some readable date format
- `last_edit_time_format` uses Ruby's DateTime formatter; for examples and information, please refer to the [official Ruby docs on `strftime` formatting](https://docs.ruby-lang.org/en/master/strftime_formatting_rdoc.html)
- `gh_edit_repository` is the URL of the project's GitHub repository
- `gh_edit_branch` is the branch that the docs site is served from; defaults to `main`
- `gh_edit_source` is the source directory that your project files are stored in (should be the same as [site.source](https://jekyllrb.com/docs/configuration/options/))
- `gh_edit_view_mode` is `"tree"` by default, which brings the user to the github page; switch to `"edit"` to bring the user directly into editing mode

## Color scheme

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

See [Customization]({% link docs/customization.md %}) for more information.

## Callouts
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

To use this feature, you need to configure a `color` and (optionally) `title` for each kind of callout you want to use, e.g.:

```yaml
callouts:
  warning:
    title: Warning
    color: red
```

This uses the color `$red-000` for the background of the callout, and `$red-300` for the title and box decoration.[^dark] You can then style a paragraph as a `warning` callout like this:

```markdown
{: .warning }
A paragraph...
```

[^dark]:
    If you use the `dark` color scheme, this callout uses `$red-300` for the background, and `$red-000` for the title.

The colors `grey-lt`, `grey-dk`, `purple`, `blue`, `green`, `yellow`, and `red` are predefined; to use a custom color, you need to define its `000` and `300` levels in your SCSS files. For example, to use `pink`, add the following to your `_sass/custom/setup.scss` file:

```scss
$pink-000: #f77ef1;
$pink-100: #f967f1;
$pink-200: #e94ee1;
$pink-300: #dd2cd4;
```

You can override the default `opacity` of the background for a particular callout, e.g.:

```yaml
callouts:
  custom:
    color: pink
    opacity: 0.3
```

You can change the default opacity (`0.2`) for all callouts, e.g.:

```yaml
callouts_opacity: 0.3
```

You can also adjust the overall level of callouts.
The value of `callouts_level` is either `quiet` or `loud`;
`loud` increases the saturation and lightness of the backgrounds.
The default level is `quiet` when using the `light` or custom color schemes,
and `loud` when using the `dark color scheme.`

See [Callouts]({% link docs/ui-components/callouts.md %}) for more information.

## Google Analytics

{: .warning }
> [Google Analytics 4 will replace Universal Analytics](https://support.google.com/analytics/answer/11583528). On **July 1, 2023**, standard Universal Analytics properties will stop processing new hits. The earlier you migrate, the more historical data and insights you will have in Google Analytics 4.

Universal Analytics (UA) and Google Analytics 4 (GA4) properties are supported.

```yaml
# Google Analytics Tracking (optional)
# Supports a CSV of tracking ID strings (eg. "UA-1234567-89,G-1AB234CDE5")
ga_tracking: UA-2709176-10
ga_tracking_anonymize_ip: true # Use GDPR compliant Google Analytics settings (true/nil by default)
```

### Multiple IDs
{: .d-inline-block .no_toc }

New (v0.4.0)
{: .label .label-green }

This theme supports multiple comma-separated tracking IDs. This helps seamlessly transition UA properties to GA4 properties by tracking both for a while.

```yaml
ga_tracking: "UA-1234567-89,G-1AB234CDE5"
```

## Document collections

By default, the navigation and search include normal [pages](https://jekyllrb.com/docs/pages/).
You can also use [Jekyll collections](https://jekyllrb.com/docs/collections/) which group documents semantically together.

{: .warning }
> Collection folders always start with an underscore (`_`), e.g. `_tests`. You won't see your collections if you omit the prefix.

For example, put all your test files in the `_tests` folder and create the `tests` collection:

```yaml
# Define Jekyll collections
collections:
  # Define a collection named "tests", its documents reside in the "_tests" directory
  tests:
    permalink: "/:collection/:path/"
    output: true

just_the_docs:
  # Define which collections are used in just-the-docs
  collections:
    # Reference the "tests" collection
    tests:
      # Give the collection a name
      name: Tests
      # Exclude the collection from the navigation
      # Supports true or false (default)
      # nav_exclude: true
      # Fold the collection in the navigation
      # Supports true or false (default)
      # nav_fold: true  # note: this option is new in v0.4
      # Exclude the collection from the search
      # Supports true or false (default)
      # search_exclude: true
```

The navigation for all your normal pages (if any) is displayed before those in collections.

<span>New (v0.4.0)</span>{: .label .label-green }
Including `nav_fold: true` in a collection configuration *folds* that collection:
an expander symbol appears next to the collection name,
and clicking it displays/hides the links to the top-level pages of the collection.[^js-disabled]

[^js-disabled]: <span>New (v0.6.0)</span>{: .label .label-green }
    When JavaScript is disabled in the browser, all folded collections are automatically expanded,
    since clicking expander symbols has no effect.
    (In previous releases, navigation into folded collections required JavaScript to be enabled.)

You can reference multiple collections.
This creates categories in the navigation with the configured names.

```yaml
collections:
  tests:
    permalink: "/:collection/:path/"
    output: true
  tutorials:
    permalink: "/:collection/:path/"
    output: true

just_the_docs:
  collections:
    tests:
      name: Tests
    tutorials:
      name: Tutorials
```

When *all* your pages are in a single collection, its name is not displayed.

The navigation for each collection is a separate name space for page titles: a page in one collection cannot be a child of a page in a different collection, or of a normal page.
