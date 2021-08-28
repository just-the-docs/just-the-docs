---
layout: default
title: Home
nav_order: 1
description: "As described in the Scrum Guide, the Scrum Master is responsible for promoting and supporting Scrum. This means helping everyone understand Scrum theory, practices, rules, and values. This provides a structured guide to help better understand the role of the Scrum Master.

It has been organised by a set of Professional Scrum Competencies which each contain a number of focus areas."
permalink: /
---

# Understanding Scrum
{: .fs-9 }

Just the Docs gives your documentation a jumpstart with a responsive Jekyll theme that is easily customizable and hosted on GitHub Pages.
{: .fs-6 .fw-300 }

[Starting Scrum](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [Professional Scrum Competencies](https://github.com/pmarsceill/just-the-docs){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Starting Scrum

### Introducing the Scrum Guide
### Scrum Definition

### Scrum Theory

#### Transparency
#### Inspection
#### Adaptation

---

### Scrum Values

---

### Scrum Team

#### Developers
#### Product Owner
#### Scrum Master

---

### Scrum Events

#### The Sprint
#### Sprint Planning
#### Daily Scrum
#### Sprint Review
#### Sprint Retrospective

---

### Scrum Artifacts

#### Product Backlog
#### Sprint Backlog
#### Increment

---

1. Add Just the Docs to your Jekyll site's `_config.yml` as a [remote theme](https://blog.github.com/2017-11-29-use-any-theme-with-github-pages/)
```yaml
remote_theme: pmarsceill/just-the-docs
```
<small>You must have GitHub Pages enabled on your repo, one or more Markdown files, and a `_config.yml` file. [See an example repository](https://github.com/pmarsceill/jtd-remote)</small>

### Local installation: Use the gem-based theme

1. Install the Ruby Gem
```bash
$ gem install just-the-docs
```
```yaml
# .. or add it to your your Jekyll site’s Gemfile
gem "just-the-docs"
```
2. Add Just the Docs to your Jekyll site’s `_config.yml`
```yaml
theme: "just-the-docs"
```
3. _Optional:_ Initialize search data (creates `search-data.json`)
```bash
$ bundle exec just-the-docs rake search:init
```
3. Run you local Jekyll server
```bash
$ jekyll serve
```
```bash
# .. or if you're using a Gemfile (bundler)
$ bundle exec jekyll serve
```
4. Point your web browser to [http://localhost:4000](http://localhost:4000)

If you're hosting your site on GitHub Pages, [set up GitHub Pages and Jekyll locally](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll) so that you can more easily work in your development environment.

### Configure Just the Docs

- [See configuration options]({{ site.baseurl }}{% link docs/configuration.md %})

---
