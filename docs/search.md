---
title: Search
nav_order: 7
---

# Search
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Just the Docs uses [lunr.js](https://lunrjs.com) to add a client-side search interface powered by a JSON index that Jekyll generates.
All search results are shown in an auto-complete style interface (there is no search results page).
By default, all generated HTML pages are indexed using the following data points:

- Page title
- Page content
- Page URL

## Enable search in configuration

In your site's `_config.yml`, enable search:

```yaml
# Enable or disable the site search
# Supports true (default) or false
search_enabled: true
```

### Search granularity

Pages are split into sections that can be searched individually.
The sections are defined by the headings on the page.
Each section is displayed in a separate search result.

```yaml
# Split pages into sections that can be searched individually
# Supports 1 - 6, default: 2
search.heading_level: 2
```

### Search previews

A search result can contain previews that show where the search words are found in the specific section.

```yaml
# Maximum amount of previews per search result
# Default: 3
search.previews: 3

# Maximum amount of words to display before a matched word in the preview
# Default: 5
search.preview_words_before: 5

# Maximum amount of words to display after a matched word in the preview
# Default: 10
search.preview_words_after: 10
```

### Search tokenizer

The default is for hyphens to separate tokens in search terms:
`gem-based` is equivalent to `gem based`, matching either word.
To allow search for hyphenated words:

```yaml
# Set the search token separator
# Default: /[\s\-/]+/
# Example: enable support for hyphenated search words
search.tokenizer_separator: /[\s/]+/
```

### Display URL in search results

```yaml
# Display the relative url in search results
# Supports true (default) or false
search.rel_url: false
```

### Display search button

The search button displays in the bottom right corner of the screen and triggers the search input when clicked.

```yaml
# Enable or disable the search button that appears in the bottom right corner of every page
# Supports true or false (default)
search.button: true
```

### Focus search bar with a keyboard shortcut

Just the Docs supports focusing the search bar input with a keyboard shortcut. After setting the `search.focus_shortcut_key` config item key, users who press <kbd>Ctrl</kbd> + `search.focus_shortcut_key` (or on macOS, <kbd>Command</kbd> + `search.focus_shortcut_key`) will focus the search bar.

Note that this feature is **disabled by default**. `search.focus_shortcut_key` should be a [valid value from `KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key); this involves all ASCII alphanumeric values, as well as modifier keys.

For example,

```yaml
search:
    focus_shortcut_key: 'k'
```

Will make <kbd>Ctrl</kbd> + <kbd>K</kbd> focus the search bar for Windows users (and <kbd>Command</kbd> + <kbd>K</kbd> on macOS).

## Hiding pages from search

Sometimes you might have a page that you don't want to be indexed for the search nor to show up in search results, e.g., a 404 page.
To exclude a page from search, add the `search_exclude: true` parameter to the page's YAML front matter:

{: .no_toc }

```yaml
---
layout: default
title: Page not found
nav_exclude: true
search_exclude: true
---

```

## Generate search index when used as a gem

If you use Just the Docs as a remote theme, you do not need the following steps.

If you use the theme as a gem, you must initialize the search by running this `rake` command that comes with `just-the-docs`:

```bash
$ bundle exec just-the-docs rake search:init
```

This command creates the `assets/js/zzzz-search-data.json` file that Jekyll uses to create your search index.
Alternatively, you can create the file manually with [this content]({{ site.github.repository_url }}/blob/main/assets/js/zzzz-search-data.json).

## Custom content for search index
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

Advanced
{: .label .label-yellow }

By default, the search feature indexes a page's `.content`, `.title`, and *some* headers within the `.content`. Other data (e.g. front matter, files in `_data` and `assets`) is not indexed. Users can customize what is indexed.

{: .warning }
> Customizing search indices is an advanced feature that requires Javascript and Liquid knowledge.

1. When Just the Docs is a local or gem theme, ensure `assets/js/zzzz-search-data.json` is up-to-date with [Generate search index when used as a gem](#generate-search-index-when-used-as-a-gem).
2. Add a new file named `_includes/lunr/custom-data.json`. Insert custom Liquid code that reads your data (e.g. the page object at `include.page`) then generates custom Javascript fields that hold the custom data you want to index. Verify these fields in the generated `assets/js/search-data.json`.
3. Add a new file named `_includes/lunr/custom-index.js`. Insert custom Javascript code that reads your custom Javascript fields and inserts them into the search index. You may want to inspect `assets/js/just-the-docs.js` to better understand the code.

### Example: adding custom `usage` and `examples` fields
{: .text-delta }

This example adds front matter `usage` and `examples` fields to the search index.

`_includes/lunr/custom-data.json` custom code reads the page `usage` and `examples` fields, normalizes the text, and writes the text to custom Javascript `myusage` and `myexamples` fields. Javascript fields are similar yet [not the same as JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#javascript_and_json_differences). `jsonify` will probably work for most scenarios.

{% raw %}
```liquid
{%- capture newline %}
{% endcapture -%}
"myusage": {{ include.page.usage | markdownify | replace:newline,' ' | strip_html | normalize_whitespace | strip | jsonify }},
"myexamples": {{ include.page.examples | markdownify | replace:newline,' ' | strip_html | normalize_whitespace | strip | jsonify }},
```
{% endraw %}

`_includes/lunr/custom-index.js` custom code is inserted into the Javascript loop of `assets/js/just-the-docs.js`. All custom Javascript fields are accessed as fields of `docs[i]` such as `docs[i].myusage`. Finally, append your custom fields on to the already existing `docs[i].content`.

```javascript
const content_to_merge = [docs[i].content, docs[i].myusage, docs[i].myexamples];
docs[i].content = content_to_merge.join(' ');
```
