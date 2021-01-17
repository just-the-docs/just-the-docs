---
layout: default
parent: DevOps
title: Stack Choices
---

# Stack Choices

**Purpose**

We don't want to support every stack, so we chose the best for most cases and want to pass on the benefits of a superior stack to our clients, rather than them making an uninformed choice.

**Scope**

Covers guiding principles for stack choices and the specifics for backend and frontend.

## Guiding Principles for Stack Choices

TLDR, read [this](http://boringtechnology.club/)

Our stack selection is based on the following (descending importance):

1.  Popularity, growth, longevity and community support.
2.  Power, generality, flexiblity and interoperability.
3.  Open Source, inclusive community.
4.  Ease of use, readability, simplicity.
5.  Performance.

## Back End

We've found the following back end stack to be very good on these
metrics.

  - Python - 3rd most loved language, and is the most wanted. \[1\]
  - Node.js - 4 most loved language, 2nd most wanted. \[1\]
  - Django / Flask / Express
  - Unix (Ubuntu Linux for servers)
  - PostgreSQL - 2nd most loved database \[1\]
  - Redis - most loved database \[1\]
  - Docker

\[1\] [Stack overflow dev survey](https://insights.stackoverflow.com/survey/2018/?utm_source=Iterable&utm_medium=email&utm_campaign=dev-survey-2018-promotion)

Python in particular is a very strong general purpose stack choice. 

With "software eating the world", Python's been the condiment of choice, and is appearing in many niche industries. 

This lets us synergize with other projects of our clients', as well as staff and expertise within the same lingua franca.

![python popularity](https://zgab33vy595fw5zq-zippykid.netdna-ssl.com/wp-content/uploads/2017/09/growth_major_languages-1-1024x878.png)

Avoid language-specific environment dependencies that can be met by built in functions or by Docker. 

i.e., you don't need virtualenv, pyenv, grunt, gulp.

### Follow 12 factor principles

These are progressive principles for making your application predictable and scalable.

[12factor](https://12factor.net/)

## Front End

We have a lot less prescription on the front end, and choices are based on developer skill. 

However, we observe guidelines:

  - Bias towards fewer dependencies. What's the simplest set of dependencies that will work?
  - Bias towards small, specific purpose dependencies over frameworks. React, Preact and Riot is better than Angular in this way, for example.
  - Ensure depemdencies have healthy community support and/or are small enough to fork if support wavers. Ideally both.

These tables capture our current thoughts on the outlook for front end dependencies in our projects.

#### JS Frameworks

| Technology    | Ideal    |
| ------------- | -------- |
| jQuery | avoid, slowly migrate to native dom |
| React  | avoid, prefer preact or Vue |
| Angular | avoid, continue in existing usage |
| Riot   | preferred for Django projects |
| Vue    | preferred for SPA projects |

#### CSS

| Technology    | Current | Ideal    |
| ------------- | ------- | -------- |
| postCSS       | may use for complex css needs |
| CSS vars / scopes | may use for simple projects |
| SCSS          | preferred |
| other preprocessors (less/ stylus) | avoid, migrate away |
