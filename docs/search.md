---
layout: default
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

Just the Docs uses [lunr.js](http://lunrjs.com) to add a client-side search interface powered by a JSON index that Jekyll generates. All search results are shown in an auto-complete style interface (there is no search results page). By default, all generated HTML pages are indexed using the following data points:

- Page title
- Page content
- Page URL

## Set up search

### Generate search index

Before you can use search, you must initialize the feature by running this `rake` command that comes with `just-the-docs`:

```bash
$ bundle exec just-the-docs rake search:init
```

This command creates the `search-data.json` file that Jekyll uses to create your search index. Alternatively, you can create the file manually in the `assets/js/` directory of your Jekyll site with this content:

```liquid
{% raw %}---
---
{
  {% assign comma = false %}
  {% for page in site.html_pages %}{% if page.search_exclude != true %}{% if comma == true%},{% endif %}"{{ forloop.index0 }}": {
    "title": "{{ page.title | replace: '&amp;', '&' }}",
    "content": "{{ page.content | markdownify | replace: '</h', ' . </h' | replace: '<hr', ' . <hr' | replace: '</p', ' . </p' | replace: '</ul', ' . </ul' | replace: '</tr', ' . </tr' | replace: '</li', ' | </li' | replace: '</td', ' | </td' | strip_html | escape_once | remove: 'Table of contents' | remove: '```'  | remove: '---' | replace: '\', ' ' | replace: ' .  .  . ', ' . ' | replace: ' .  . ', ' . ' | normalize_whitespace }}",
    "url": "{{ page.url | absolute_url }}",
    "relUrl": "{{ page.url }}"
  }{% assign comma = true %}
  {% endif %}{% endfor %}
}{% endraw %}
```

_Note: If you don't run this rake command or create this file manually, search will not work (or it will use the search index data from this docs site, not your site's content)._

### Enable search in configuration

In your site's `_config.yml`, enable search:

```yaml
# Enable or disable the site search
search_enabled: true
```

The default is for hyphens to separate tokens in search terms:
`gem-based` is equivalent to `gem based`, matching either word.
To allow search for hyphenated words:

```yaml
# Set the search token separator
search_tokenizer_separator: /[\s/]+/
```

## Hiding pages from search

Sometimes you might have a page that you don't want to be indexed for the search nor to show up in search results, e.g, a 404 page. To exclude a page from search, add the `search_exclude: true` parameter to the page's YAML front matter:

#### Example
{: .no_toc }

```yaml
---
layout: default
title: Page not found
nav_exclude: true
search_exclude: true
---
```
