---
layout: default
title: Search
nav_order: 7
---

# Search

Just the docs uses [lunr.js](http://lunrjs.com) to add a client-side search interface powered by a JSON index that Jekyll generates. All search results are shown in an auto-complete style interface (there is no search results page). By default, all generated html pages are indexed  using the following data points:

- Page title
- Page content
- Page URL

## Set up search

### 1. Generate search index

Before you can use search, you must initialize the feature by running this
rake command that comes with the `just-the-docs`

```bash
$ bundle exec just-the-docs rake search:init
```

This command creates the `search-data.json` file that Jekyll uses to create
your search index. Alternatively, you can create the file manually in the
`assets/js/` of your Jekyll site with this content:

```{% raw %}
---
---
{
  {% for page in site.html_pages %}"{{ forloop.index0 }}": {
    "id": "{{ forloop.index0 }}",
    "title": "{{ page.title | xml_escape }}",
    "content": "{{ page.content | markdownify | strip_html | xml_escape | remove: 'Table of contents' | remove: page.title | strip_newlines | replace: '\', ' '}}",
    "url": "{{ page.url | absolute_url | xml_escape }}",
    "relUrl": "{{ page.url | xml_escape }}"
  }{% if forloop.last %}{% else %},
  {% endif %}{% endfor %}
}{% endraw %}
```

_Note: If you don't run this rake command or create this file manually, search will not work (or it will use the search index data from this docs site, not your site's content)._

### 2. Enable search in configuration

In your site's `_config.yml` enable search:

```yml
# Enable or disable the site search
search_enabled: true
```
