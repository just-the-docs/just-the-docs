---
layout: default
parent: Programming
title: Coding Standards and Style
---

# Coding Standards and Style

**Purpose**

Encourage consistent and effective coding practices in the team, arising out of specific cases where different conventions of developers caused
us to waste time.

**Scope**

Covers principles of our coding standards, then branches out to specific language pages.

## Principles

  - We use auto-formatters in place of coding standards in every case
    possible.
  - Follow conventions. For projects that do not currently follow our
    standards (open source, or new projects shared with other dev teams)
    but follows a different one, stick with that project's conventions
    unless we make a conscious decision to refactor the whole thing.
    Don't mix conventions.
  - Make life easier for your team mates and future self by being
    consistent and thoughtful of what someone unfamiliar would think.
    The goal is your code should be obvious and easy to understand for a
    new programmer. Stick to conventions, and use comments to explain
    the story of your code, and why things are done a particular way.
  - Choose abstractions and tools based on real problems, not the
    reverse.

## Literature

We are influenced by the following writing.

  - [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
  - [12 factor App Methodology](https://12factor.net/)
  - [Trunk based development](https://trunkbaseddevelopment.com/)
  - [Agile Manifesto](https://agilemanifesto.org/)
  - [Clean Code](https://www.oreilly.com/library/view/clean-code/9780136083238/)

## Names

This section refers to the names of variables, database columns,
classes, and any other case where a name is chosen in code.

Variables should hint what their data types are: in one glimpse I should
be able to tell if a variable is e.g. a Boolean, string, etc.

Consider the book [Clean Code](https://www.oreilly.com/library/view/clean-code/9780136083238/) on
this topic and on writing short functions.

  - Names should indicate *what* a function does in *business domain
    language* (see "Ubiquitous Language" in Domain Driven Design).
  - Name length should be proportional to the variable's scope size. `x`
    is ok in a one liner, but not a global.
  - When an industry jargon (domain language) term is available, use
    that.
  - ClassNames - Classes should use an upper camel case string of nouns.
  - CONSTANT\_NAMES - Constants should be uppercase with underscores.

## Files

  - Filenames should be lowercase with dashes (NOT SPACES) to separate
    words *except* for Python, which uses underscores in place of
    dashes.
  - The purpose, and contents of any file should be as obvious as
    possible by its filename and location. **Throw in an example**
  - Avoid repeated or unnecessary code, except where doing so is much
    more clear. Keep in mind less code is actually easier to understand,
    all other things being equal. So, it bears repeating, use the
    minimum amount of code in declarative domain language. Using the
    wrong abstraction can be worse than repeated code.

## Locality

  - Components don't know about each other.
  - Simplify/minimize interfaces and consider Bounded contexts (DDD).
  - Use pure functions where practical, and avoid side effects and
    global state.
  - Modules should be responsible for a specific task or set of RELATED
    tasks.
  - Modules should communicate through easily testable interfaces. A
    huge hierarchy of objects shouldn't be required to test a single
    method, because the method should only take arguments it actually
    uses (not a big tree which happens to contain those)

## Error Handling

  - Error messags must be uniquly identifiable so the root cause in code
    can be traced. They should contain unique text.

  - 500) Errors should be sent to administrators when on production (or
         Sentry)

  - When we are in an invalid state, it's better to throw an exception
    and avoid corrupting data or causing more confusing downstream
    issues. Catch errors early and loudly.

  - Use HTTP Error codes correctly.
    <https://developer.mozilla.org/en-US/docs/Web/HTTP/Status> . For
    example, for an unauthorized error, return 401, not 400 or 500.

## Comments

  - Do not comment what is obvious from the code. "\# Increment the
    variable." is not a good comment.
  - Do Document the rationale "why", the reason behind an implementation
    choice.
  - Use TODO comments to indicate your intent for future work.
  - Comment beside anything that's unintutive or unexpected to another
    reader.
  - Do not leave actual code commented out unless you have a good
    reason. If you do have one, document that reason as a comment as
    well.

## Minimize Code

  - Use less code. Avoid repetition.
  - Reuse functions.
  - Find the best abstraction. ie) Functional Programming for dealing
    with collections (advanced primitives). Inheritance for dealing with
    the relationships of real world objects.

## No tabs

We are a Python shop, and so observance of
[PEP 8](https://www.python.org/dev/peps/pep-0008/) leads us to use 4
spaces for indentation.

We carry this convention to other languages when possible, but some will
use a different number of spaces. **We never use the tab character.**

### Docker

Use [Docker](devops/DOCKER/) for any web application project (and
other projects where applicable). It should be possible to bring up a
new environment by only the following for any of our projects.

    git clone <repo>
    cd <project folder>
    cp docker-compose.override.yml.dev.template docker-compose.override.yml
    docker-compose up

TODO
{: .label .label-yellow }

Write a dotfiles script that does all the following with
`getproject <project slug>`.

And browsing to [localhost](http://localhost)

Of course, to see anything meaningful you may need to restore a database
to your `db` container.

## Code Quality

Tested tricks for having good code you like to work on in the long term.

>   - Assume you’ll still be working on any project 10 years from now,
>     and cultivate a culture with a long-term viewpoint. We hire for
>     this trait and use code reviews as well as weekly developer
>     training workshops to improve maintainability together. This seems
>     expensive but has paid enormous dividends in reduced technical
>     debt. Reviewers have fresh eyes and can see what’s missing more
>     easily than the original developer. These discussions form an
>     evolving standard and reinforce a culture of quality and
>     continuous learning.
>   - Decouple core business logic from framework-specific code and
>     views. Code that is close to the presentation layer will be forced
>     by front-end libraries, web browsers and marketing needs to evolve
>     quickly.
>   - Auto-formatters. We prefer code standards which have an
>     auto-formatter because it lets makes our code perfectly consistent
>     at a syntax level with zero effort.
>   - Document rationale. Comments should answer “why” code was written
>     a certain way. The code itself should document “what” it is.
>   - Use “TODO” comments to document future intent of the code.
>   - Code reviews - for learning and establishing standards. The code
>     reviews become a living history of the project’s standards. While
>     standards should be documented in one place concisely, it’s in the
>     code reviews that all the small subtleties will be discovered. The
>     reviewer can ask the question “would I like reading this code and
>     having to modify it myself?” since they have fresh eyes. They can
>     see what’s missing more easily than the original developer. These
>     discussions lead to an evolving standard, and a culture of quality
>     and continuous learning.
>   - Declarative Style - Anything you do a lot of should be
>     *declarative style* to the extent possible (as opposed to
>     imperative style), meaning define what you want and not the order
>     it is created.
>   - Do not leave old files with filenames like "base\_old" in the
>     tree. Just delete the old one, commit to refactor, and communiate
>     the change to your team.

Consistency and quality can be further improved by proactively managing
technical debt. While we do avoid needless technical debt, it can be
taken on strategically. For example, prototyping a solution can be a
cheap way to get information and save cost overall, as long as you don’t
neglect to refactor or rewrite the prototype if you decide to keep the
code.

## Coding Standards for Specific Languages

Check out the individual pages for [HTML/CSS](HTML_CSS.md),
[Javascript](JAVASCRIPT.md), and [Python](PYTHON.md) for more
specific coding standards.
