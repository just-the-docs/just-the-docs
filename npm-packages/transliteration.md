---
layout: default
npm_package_name: transliteration
npm_package_version: v2.2.0
npm_package_last_updated_on: Latest version published 1 year ago
npm_package_description: Unicode to ACSII transliteration / slugify module for node.js, browser, Web Worker, ReactNative and CLI.
github_link: https://github.com/dzcpy/transliteration
repo_name: transliteration
npm_link: https://www.npmjs.com/package/transliteration
install_command: npm install transliteration
popularity_dependents: 1.63K
popularity_github_stars: 475
popularity_forks: 47
popularity_badge: Medium
maintenance_open_issues: 11
maintenance_open_prs: 2
maintenance_latest_release: 1 year ago
maintenance_last_commit: 2 months ago
maintenance_badge: Inactive
community_readme: Available
community_code_of_conduct: Unavailable
community_funding: Unavailable
community_contributors.md: Unavailable
community_badge: Active
basic_node_compatibility: Greater/=6.0.0
basic_age: 7 years
basic_versions: 75
basic_dist_tags: 1
basic_maintainers: 1
basic_dependencies: 1 Direct
basic_install_size: 1.54 MB
basic_files: 22
downloads: 136221
contributors: 20
nav_exclude: true
---

{{ page.npm_package_version }}
# {{ page.npm_package_name }}
{: .no_toc }

{{ page.npm_package_description }}
{: .fs-6 .fw-300 }

```
{{ page.install_command}}
```
{{ page.page_last_updated }}

[View npm package →]({{ page.npm_link }}){: .btn }{% if page.github_link contains "github" %}
[Open in GitHub →]({{ page.github_link }}){: .btn .btn-purple }
{% else %}
{% endif %}

---

| Popularity                   | Maintenance                  | Community                   | Readme File                 |
|:-----------------------------|:-----------------------------|:----------------------------|:----------------------------|
| {{ page.popularity_badge }}  | {{ page.maintenance_badge }} | {{ page.community_badge }}  | {{ page.community_readme }} |


---

## Basic details

|                          |                              | 
|:-------------------------|:-----------------------------|
| Age                      | {{ page.basic_age }}         |
| Dependencies             | {{ page.basic_dependencies }}|
| Dist Tags                | {{ page.basic_dist_tags }}   |
| Install size             | {{ page.basic_install_size }}|
| No. of maintainers       | {{ page.basic_maintainers }} |
| No. of files             | {{ page.basic_files }}       |
| Versions                 | {{ page.basic_versions }}    |
| Compatible with node.js  | {{ page.basic_node_js }}     |

The npm package "{{page.npm_package_name}}" contains more than one default latest tag. This means that different tags, such as next for future releases or stable for stable releases, may be available for this package.

---

## Popularity

|                              |                                        | 
|:-----------------------------|:---------------------------------------|
| Dependents                   | {{ page.popularity_dependents }}       |
| GitHub stars                 | {{ page.popularity_github_stars }}     |
| Forks                        | {{ page.popularity_forks }}            |
| Contributors                 | {{ page.contributors }}     |
| Downloads                    | {{ page.downloads }}                   |

The npm package "{{ page.npm_package_name }}" has seen {{ page.downloads }} downloads in the last week. As a result, we rated "{{ page.npm_package_name }}" package's popularity as {{ page.popularity_badge }}.

From this project's GitHub repository, we discovered that the npm package "{{ page.npm_package_name }}" has been starred {{ page.popularity_github_stars }} times and that {{ page.popularity_github_stars }} other projects in the ecosystem are dependent on it.

Downloads are derived as moving averages from previous 12 months, removing weekends and data items that are known to be missing.

---

## Maintenance 

|                              |                                        | 
|:-----------------------------|:---------------------------------------|
| Open Issues                  | {{ page.maintenance_open_issues }}     |
| Open PRs                     | {{ page.maintenance_open_prs }}        |
| Latest release               | {{ page.maintenance_latest_release }}  |
| Last commit                  | {{ page.maintenance_last_commit }}     |

Based on how frequent npm versions are published, repository engagement, and other data points, the maintenance status of "{{ page.npm_package_name }}" npm package has been assessed to be {{ page.maintenance_badge }}.

{% if page.maintenance_latest_release contains "month" or page.maintenance_latest_release contains "day" or page.maintenance_latest_release contains "hour" or page.maintenance_latest_release contains "minute" %}
With at least one new version released in the last 12 months, we discovered that "{{ page.npm_package_name }}" npm package has a favourable release cadence.
{% else %}
An important project maintenance signal to consider for "{{ page.npm_package_name }}" npm package is that it hasn't seen any new versions released to npm in the past 12 months. This could be considered as a discontinued project, or one that receives low attention from its maintainers.
{% endif %}

{% if page.maintenance_last_commit contains "day" or page.maintenance_last_commit contains "hour" or page.maintenance_last_commit contains "minute" or page.maintenance_last_commit contains "1 month ago" %}
We discovered that {{ page.npm_package_name }}'s GitHub repository had at least one pull request or commit or a change in an issue's status that the community has interacted with, which is a good indicator for ongoing project maintenance.
{% else %}
For {{ page.npm_package_name }}'s GitHub repository, we noticed no pull request activity or a change in an issue's status in the last month.
{% endif %}

---

## Community

|                              |                                        | 
|:-----------------------------|:---------------------------------------|
| Readme.md                    | {{ page.community_readme }}            |
| Code of conduct              | {{ page.community_code_of_conduct }}   |
| Funding                      | {{ page.community_funding }}           |
| Contributing.md              | {{ page.community_contributing_md }}   |
| Contributors                 | {{ page.contributors }}                |

{% if page.contributors == 0 %}
{{ page.contributors }} people contributed to the "{{ page.npm_package_name }}" npm package. This could mean that the community is {{ page.community_badge }}.
{% elsif page.contributors > 0 and page.contributors < 10 %}
Only {{ page.contributors }} people have contributed to the "{{ page.npm_package_name }}" npm package. This could mean that the community is {{ page.community_badge }}.
{% elsif page.contributors >= 10 and page.contributors < 100 %}
With {{ page.contributors }} people contributing to "{{ page.npm_package_name }}" npm package's GitHub repository, this might indicate a vibrant and welcoming community.
{% else %}
With {{ page.contributors }} open source contributors working on "{{ page.npm_package_name }}" npm package's repository, it could mean that there's a positive and healthy external contribution signal for this project.
{% endif %}

---

{% unless page.repo_name == nil %}
## Readme for {{ page.npm_package_name }}
{% include_relative readme/{{ page.repo_name }}.md %}
{% endunless %}

---

## Freqently Asked Questions

### What is {{ page.npm_package_name }}?
{{ page.npm_package_description }}. Visit Roviret to get all the information about [{{ page.npm_package_name }} npm package](https://roviret.com/npm-package/), including basic information, its popularity, community information, and details about its maintenance.

### Is {{ page.npm_package_name }} popular?
Since {{ page.npm_package_name }} has {{ page.popularity_github_stars }} stars and {{ page.popularity_forks }} forks in its Github repository, we've classified this npm package as <b>{{ page.popularity_badge }}</b>.

### Does {{ page.npm_package_name }} have an active community?
The {{ page.npm_package_name }} has {{ page.contributors }} contributors with the last release being {{ page.maintenance_latest_release }}. Due to these data points, we've marked this npm package as <b>{{ page.community_badge }}</b>. 

### Is {{ page.npm_package_name }} npm package maintained?
The previous commit on {{ page.npm_package_name }} was on {{ page.maintenance_last_commit }}. It has {{ page.maintenance_open_issues }} open issues and {{ page.maintenance_open_prs }} open pull requests. As such, we think maintenance for {{ page.npm_package_name }} package is <b>{{ page.maintenance_badge }}</b>. 
---
