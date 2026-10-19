---
title: Open source contributions
parent: Open source
nav_order: 1
---

# Open source GitHub contributions
{: .no_toc }
Documentation-related contributions to open source GitHub projects.

--------------------------------

> **Context**
> - **Audience:** Maintainers and users of the open source projects I contributed to.
> - **My role:** External contributor who proposed and authored each change via pull request, following each project's existing style guide and review process.
> - **Tools:** Markdown, AsciiDoc, GitHub.
{: .note }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Perses: advertising all supported datasources on the homepage
*[Perses](https://www.cncf.io/projects/perses/) is a [Cloud Native Computing Foundation (CNCF)](https://contribute.cncf.io/) sandbox project: an open specification and tool for building, embedding, and sharing observability dashboards.*

**Problem:** [Issue #4410](https://github.com/perses/perses/issues/4410) on the Perses repo flagged that both the [perses.dev](https://perses.dev/) homepage and the `perses/perses` README still named only the first four datasources Perses supported (Prometheus, Tempo, Loki, Pyroscope), reading as if those were the only options, with no link to the full, dynamically-updated list.

**My contribution:** I opened two companion PRs to close the gap. On the homepage, I kept those four as examples of the observability pillars, explicitly stated that Perses supports other datasources too, and linked to the [Datasources documentation](https://perses.dev/perses/docs/concepts/datasource/) from both the "Observability display" card and the "Visualize your data" section. 

I also scoped a CSS rule (`.grid.cards a` → `.grid.cards.image-grid a`) that was unintentionally centering every link in the feature-card grid, including the new text link, down to just the logo-image grid it was originally written for. On the `perses/perses` README, I made the matching update to the Overview section, noting that Perses supports several technologies per signal and linking to the same Datasources documentation page.

**Impact:** Both merged by maintainer `Nexucis`.

[View the merged website pull request](https://github.com/perses/website/pull/163)

![Perses homepage datasources update](../images/perses_website_PR_screenshot.png)

[View the merged perses/perses README pull request](https://github.com/perses/perses/pull/4591)

![Perses README update](../images/perses_README_PR_screenshot.png)  

## NGINX: documenting config file size limits
*NGINX is one of the most widely used web servers and reverse proxies in production infrastructure, and its documentation is maintained by F5's docs team.*

**Problem:** [Issue #63](https://github.com/nginx/documentation/issues/63) on the NGINX documentation repo flagged that the docs never stated the file size limit for config files added to an NGINX One instance. Users had to discover the constraint by trial and error.

**My contribution:** I drafted the missing limit into the ["Add a file to an instance"](https://docs.nginx.com/nginx-one-console/nginx-configs/one-instance/add-file/) page, and flagged for the reviewing team that the issue's originally proposed location (a different page) wasn't the best fit along with reasoning for why this page was.

**Impact:** Two NGINX maintainers (`y82`, `ADubhlaoich`) approved the change. It also surfaced a documentation-architecture question of whether the note belonged inline or as a reusable include, which the team flagged for follow-up:
> "I recommend adding the note in-line and not as an include. Includes are for reusable content, and this note is used only once."—Travis Martin, NGINX documentation maintainer.

The PR was ultimately **closed as stale rather than merged**, after CLA and internal SME sign-off took longer than the review window. The reviewer engagement and design feedback are the real signal here.

[View the pull request](https://github.com/nginx/documentation/pull/431)

![NGINX config file size limit GitHub PR](../images/nginx_documentation_pr.png)

## Open Sustainable Technology: Grist spreadsheet metadata definitions
*Open Sustainable Technology is a directory and analysis of the open source ecosystem in areas of climate change, sustainable energy, biodiversity, and natural resources.*

**Problem:** Open Sustainable Technology publishes organization and funding data through a public Grist spreadsheet, but the column names weren't self-explanatory. Users couldn't tell what a value's source or calculation meant.

**My contribution:** I authored a 68-line Markdown reference documenting every column's definition, and flagged two ambiguous column names (`organization_projects`, `website`) that didn't reflect what they actually contained.

**Impact:** Merged. The maintainer adopted both renaming suggestions as a follow-up improvement:
> "You made a fantastic contribution that is very helpful... This makes things much clearer."—Tobias Augspurger (`Ly0n`), Open Sustainable Technology maintainer.

[View the merged pull request](https://github.com/protontypes/open-sustainable-technology/pull/1025)

![Metadata definitions GitHub PR](../images/metadata-definitions-pr.png)

## JustServe: AsciiDoc style guide

*JustServe's repository I contributed to housed all JustServe platform documentation.*

**Problem:** The JustServe platform's documentation (built on Zendesk) had no style guide, so formatting and terminology drifted across contributors' AsciiDoc content.

**My contribution:** I authored an AsciiDoc style guide establishing formatting and terminology conventions for the docs team to follow.

**Impact:** Adopted for the project's documentation. The source repository has since been taken down, so a link for the original PR is unavailable.

![AsciiDoc style guide GitHub PR](../images/asciidoc-style-guide-pr.png)
