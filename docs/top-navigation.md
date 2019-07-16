---
layout: default
title: Top Navigation Menu
nav_order: 6
---

# Top Navigation Menu
{: .no_toc }

Just the Docs supports a top navigation menu. This type of menu is very useful for adding pages that has a different structure than a standard Just the Docs page such as a landing page, a contact page or links to external pages (GitHub, social network pages, etc.).

This feature is not enabled by default. To enable it set the `top_navigation_enabled` flag in `_config.yml`:

```yaml
# Enable or disable top navigation panel
top_navigation_enabled: true
```

This will add an empty menu that will only include the project title. To add menu items create a `top_navigation.yml` file under `/data/top_navigation.yml` with the following structure:

```yaml
left_items:
  - name: <Menu Item Name>
    link: /link/to/item/
    external_link: <true/false>

right_items:
  - name: <Menu Item Name>
    link: https://link/to/item
    image: /link/to/local/resource.png
    tooltip: <tooltip to show when hovering above item>
```

Let's explain the difference between `left_items` and `right_items`:

The items in `left_items` are the standard menu items. They are displayed as text which comes from the `name` attribute. For each item you should define the link it points to and also mention whether it's an external link or not. For external links an additional small "external link" icon will be displayed next to the text.

The items in `right_items` are displayed in the right side of the top navigation menu and are displayed as images containing links to external resources. These can include links to GitHub, Twitter, Facebook, etc. For each item you should define the link it points to, the image that will be displayed (please notice the image size is set to 28px) and the tooltip that will be displayed when hovering above the item.

Here is a full example of a `top_navigation.yml` file:

```yaml
left_items:
  - name: Docs
    link: /docs/
    external_link: false
  - name: Contact
    link: /contact/
    external_link: false
  - name: GitHub
    link: https://github.com/pmarsceill/just-the-docs
    external_link: true

right_items:
  - name: Twitter
    link: https://twitter.com/pmarsceill
    image: /link/to/local/resource/twitter-logo.png
    tooltip: Me on Twitter
  - name: GitHub
    link: https://github.com/pmarsceill/just-the-docs
    image: /link/to/local/resource/github-logo.png
    tooltip: Just The Docs on GitHub
```

In addition you can add your project's logo to the top navigation menu by setting `logo_source` and `logo_width` parameters:

```yaml
# Project logo - relevant only if top_navigation_enabled is true
logo_source: /resources/logo.png

# Project logo width - relevant only if top_navigation_enabled is true
logo_width: 180
```

`logo_source` is the path to the logo image and `logo_width` sets the logo width in the navigation menu. If one of them is missing the logo won't be shown and the project's name will appear instead.
