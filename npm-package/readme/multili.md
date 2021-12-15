# multili

[![Unix Build status](https://img.shields.io/travis/MoOx/multili/master.svg?branch=master&label=unix%20build)](https://travis-ci.org/MoOx/multili)
[![Code Coverage](https://img.shields.io/coveralls/MoOx/multili/master.svg)](https://coveralls.io/github/MoOx/multili)
[![Version](https://img.shields.io/npm/v/multili.svg)](https://github.com/MoOx/multili/blob/master/CHANGELOG.md)

[![Repo on GitHub](https://img.shields.io/badge/repo-GitHub-3D76C2.svg)](https://github.com/MoOx/multili)
[![Repo on GitLab](https://img.shields.io/badge/repo-GitLab-6C488A.svg)](https://gitlab.com/MoOx/multili)
[![Repo on BitBucket](https://img.shields.io/badge/repo-BitBucket-1F5081.svg)](https://bitbucket.org/MoOx/multili)

> Function to remove indentation in multi-lines template literals (string) based on the shortest indented line.

## Installation

```console
$ npm install multili
```

## Usage

```js
import multili from "multili"

multili(
  `
      This is a
        multi-lines
          string
  `
)

// Will produce
/*
This is a
  multi-lines
    string
*/

multili(`
  This is a
  multi-lines
    string
`)

// Will produce
/*
This is a
multi-lines
  string
*/


multili(`
      This is a
  multi-lines
    string
`)

// Will produce
/*
    This is a
multi-lines
  string
*/
```

You can also pass an array of lines instead of a string; in this case, the return value will also be an array.

```js
multili([
  "        This is a",
  "          milti-line",
  "            string",
])

// Will produce
/*
[
  "This is a",
  "  milti-line",
  "    string",
]
*/
```

---

## CONTRIBUTING

* ⇄ Pull/Merge requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull/Merge requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)
