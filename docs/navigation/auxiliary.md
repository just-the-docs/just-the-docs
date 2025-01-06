---
title: Auxiliary Links
parent: Navigation
nav_order: 2
---

# Auxiliary Links

You can add a list of auxiliary links to your site, shown at the top right on all pages. You do this by including the `aux_links` [configuration option]({% link docs/configuration.md %}#aux-links) in your site's `_config.yml` file.

## Example Auxiliary Link
{: .text-delta }

This website has an auxiliary link: "Just the Docs on GitHub". It is rendered with the following code:

```yaml
aux_links:
  Just the Docs on GitHub:
    - https://github.com/just-the-docs/just-the-docs
```
