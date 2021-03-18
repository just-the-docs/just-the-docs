## Configuration

### Whitelisting

Don't want to require authentication for every part of your site? Fine! Add a whitelist to your Jekyll's **config.yml** file:

```yaml
jekyll_auth:
  whitelist:
    - drafts?
```

`jekyll_auth.whitelist` takes an array of regular expressions as strings. The default auth behavior checks (and blocks) against root (`/`). Any path defined in the whitelist won't require authentication on your site.

What if you want to go the other way, and unauthenticate the entire site *except* for certain portions? You can define some regex magic for that:

```yaml
jekyll_auth:
  whitelist:
    - "^((?!draft).)*$"
```

There is also a more [extensive article containing installation instructions for Jekyll-Auth](http://fabian-kostadinov.github.io/2014/11/13/installation-of-jekyll-auth/) and a second one on [how to find your GitHub team ID](http://fabian-kostadinov.github.io/2015/01/16/how-to-find-a-github-team-id/).

### Requiring SSL

If [you've got SSL set up](https://devcenter.heroku.com/articles/ssl-endpoint), simply add the following your your `_config.yml` file to ensure SSL is enforced.

```yaml
jekyll_auth:
  ssl: true
```

### Using a custom 404

Just like GitHub Pages, Jekyll Auth will honor a custom 404 page, if it's generated as `/404.html` in the built site.
