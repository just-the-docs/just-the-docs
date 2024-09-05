---
title: External Links
parent: Main Navigation
nav_order: 6
---

# External Links

To add external links to the navigation, add them to the `nav_external_links` [configuration]({% link docs/configuration.md %}) option in your site's `_config.yml` file.
External links will appear in the navigation after the links to ordinary pages, but before any collections.

## Example: external links
{: .text-delta }

```yaml
# External navigation links
nav_external_links:
  - title: Just the Docs on GitHub
    url: https://github.com/just-the-docs/just-the-docs
    hide_icon: false # set to true to hide the external link icon - defaults to false
    opens_in_new_tab: false # set to true to open this link in a new tab - defaults to false
```

## Opening external links in a new tab

The external links are decorated by an icon, which distinguishes them from internal links.
You can suppress the icon by setting `hide_icon: true`.

By default, external links are not opened in a new tab. However, this can be enabled by:

1. setting `opens_in_new_tab: true` in the link's configuration object
2. setting the configuration option `nav_external_links_new_tab: true` in `_config.yml`

When they conflict, `opens_in_new_tab` takes precedence.
