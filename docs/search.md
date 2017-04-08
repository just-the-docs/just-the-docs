---
layout: default
title: Search
nav_order: 6
---

# Search

Just the docs uses [lunr.js](http://lunrjs.com) to add a client-side search interface powered by a JSON index that Jekyll generates. All search results are shown in an auto-complete style interface (there is no search results page). By default, all generated html pages are indexed  using the following data points:

- Page title
- Page content
- Page URL

You can modify this by modifying the forloop in `search-data.json` and the javascript in `just-the-docs.js` on line 30.
