# Jekyll Auth

*A simple way to use GitHub OAuth to serve a protected Jekyll site to your GitHub organization*

[![Gem Version](https://badge.fury.io/rb/jekyll-auth.png)](http://badge.fury.io/rb/jekyll-auth) [![Build Status](https://travis-ci.org/benbalter/jekyll-auth.png?branch=master)](https://travis-ci.org/benbalter/jekyll-auth) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## The problem

[Jekyll](http://github.com/mojombo/jekyll) and [GitHub Pages](http://pages.github.com) are awesome, right? Static site, lightning fast, everything versioned in Git. What else could you ask for?

But what if you only want to share that site with a select number of people? Before, you were SOL. Now, simply host the site on a free, [Heroku](http://heroku.com) Dyno, and whenever someone tries to access it, it will Oauth them against GitHub, and make sure they're a member of your Organization. Pretty cool, huh?

## Requirements

1. A GitHub account (one per user)
2. A GitHub Organization (of which members will have access to the Jekyll site)
3. A GitHub Application (you can [register one](https://github.com/settings/applications/new) for free)
4. A Heroku account (you can technically use this elsewhere, but the instructions are for Heroku)

## Under the hood

Every time you push to Heroku, we take advantage of the fact that Heroku automatically runs the `rake assets:precompile` command (normally used for Rails sites) to build our Jekyll site and store it statically, just like GitHub pages would.

Anytime a request comes in for a page, we run it through [Sinatra](http://www.sinatrarb.com/) (using the `_site` folder as the static file folder, just as `public` would be normally), and authenticate it using [sinatra\_auth\_github](https://github.com/atmos/sinatra_auth_github).

If they're in the org, they get the page. Otherwise, all they ever get is [the bouncer](http://octodex.github.com/bouncer/).

## Further reading

* [Configuring](configuring.md)
* [Getting started](getting-started.md)
* [Running locally](running-locally.md)
* [Troubleshooting](troubleshooting.md)
