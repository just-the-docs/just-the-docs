# gitbot

[![Greenkeeper badge](https://badges.greenkeeper.io/Springworks/gitbot.svg)](https://greenkeeper.io/)

Module containing convenience scripts against GitHub

[![Build Status](https://travis-ci.org/Springworks/gitbot.svg?branch=master)](https://travis-ci.org/Springworks/gitbot)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Environment variables

- `GITBOT_GITHUB_TOKEN`: Access token against GitHub which needs to have read/write permissions on that repository

## Usage

Install module globally:

```
npm install -g gitbot
```

```bash
  Usage: gitbot [command]

  Commands:

    merge       merge pull request and delete branch
    help [cmd]  display help for [cmd]

  Options:

    -h, --help  output usage information
```

### merge
Merges pull request and deletes branch.

**Usage**
```
  Usage: gitbot merge [options]

  Options:

    -h, --help                               output usage information
    -O, --owner <owner>                      repository owner
    -R, --repository-name <repository name>  repository name
    -B, --branch-name <branch name>          branch name
```

**Example**

```
$ gitbot merge -O john-doe -R awesome-repo -B feature/awesome-stuff
```

## Contributing
1. Create new branch and commit changes with corresponding tests
2. Make a PR
3. :pray: :clap:

### Notes

This module uses the [semantic-release](https://github.com/semantic-release/semantic-release) automated package publishing. 
Which means that the commit messages are required to look in a certain [way](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md).

To ensure this pattern is enforced, we use [pre-git](https://github.com/bahmutov/pre-git) which installs a `commit-msg` hook.
Please read and understand what the `types` mean and use them properly when committing and contributing.

The `commit-msg` hook needs to know about your installed `node` which means that if you use third party application when committing, like [Tower](http://www.git-tower.com/), that application needs to know your PATH environment.
There are probably a lot of ways to solve this, but one that works is to open the application from the terminal: `open /Applications/Tower.app`.
