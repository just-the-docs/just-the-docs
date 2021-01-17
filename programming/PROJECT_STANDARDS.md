---
layout: default
parent: Programming
title: Code Project Structure
---

# Code Project Structure

**Purpose**

To describe the minimum requirements and expected structure of technical projects at Countable.

**Scope**

Covers project requirements, processes, automation, and structure.

## Project Requirements

ALL projects **MUST**:

  - Have a README.md file with all information and/or links required for
    a new person to run the project locally, and any special
    requirements for deploying to production.
  - Be Dockerized, using docker-compose.yml.
  - Not reference the production URL in code. Save this in the
    docker-compose.override.yml for the specific ENV.
  - Not save secrets in code. Save these in the specific
    docker-compose.override.yml for the specific ENV.

ALL projects **SHOULD**:

  - Use PORT 80 to access via the browser, and to access APIs. This way
    we never have to think about what port things are on in different
    environments.
  - Use our standard stack choices.
  - Automatically run tests, stage the `develop` branch for anyone to
    look at, and automatically deploy the project to production from the
    `master` branch.

## Automation

Never block the developer. We own our tools, not the other way around.

The core principle of Countable's code projects is they automate
everything other than the core domain problems the developer is working
on. The developer should never have to take an extra manual step to
start up a project, deploy, debug, or restart in order to apply changes.

Any extra steps that interrupt development flow should be automated. For
example:

  - Linters should auto-fix issues, and only issue warnings in the case
    of issues that can't be auto-fixed.
  - Minimize startup time. It should only take a few seconds or less to
    start up a project after the first installation.
  - Migrations should be run automatically on startup, not require a
    manual step.

## Project Structure

We use the monorepo pattern, meaning all files required to run the
project (other than secrets and private data) go in a single GIT
repository, structured as:

    project-slug/
      web/
        Dockerfile
        app1/
        app2/
        app3/
        manage.py
      frontend/
        Dockerfile
        package.json
        src/
      nginx/
        Dockerfile
        nginx.conf
      static/
      docker-compose.yml

[Example here](https://github.com/countable-web/countable-modern-django)

The front-end Dockerfile should run a development server, but for
production should just build static files, into the /static folder which
is served by nginx.

## Front End Development

(draft, rfc)

Front-end development is exciting, but also a challenge. This is due to
the fact that there are so many tools available for so many different
things, and this side of the world moves fast. Main considerations:

1.  Browser compability - Does the website look good on Chrome? Firefox?
    Ipad? Galaxy? iPhone?
2.  Device compatibility (Responsive Design) - On monitors that are not
    1080p? 10 inch laptops at 1280 x 720?
3.  Automation

Nowadays, you don't necessarily need to CODE for this, since there are
tools like Babel, Normalize.css, Autoprefixer which help make this
happen.

On larger sites with an accessibility budget:

4.  WAI-ARIA (Web Accessibility Initiative)

*TL;DR*: Your website needs to work on the browsers that the client
needs them to work in. Countable's website should be a flawless
experience in ALL platforms.

**Tools**

Tooling for different areas can be in any of the following status:

  - Unspecified - Use whatever you want as long as it's well supported.
  - Recommendation - We recommend using a specific tool, but developer
    expertise or another reason could override this.
  - Standard - You should only deviate from this tooling choice for a
    specific reason.

**CSS**

  - We prefer [SASS](https://sass-lang.com/)
  - Use a CSS reset.

**HTML**

  - Always populate the TITLE and META DESCRIPTION tags with a
    description of what's on the page, as they're critical SEO signals.

**Front End Framework**

  - We currently recommend Vue.js for new projects.
  - RiotJS is acceptable for lightweight situations with no bundler
    (NPM) available.
  - We use Parcel.js as a bundler.
  - Several older projects use jQuery, Angular and other frameworks.
