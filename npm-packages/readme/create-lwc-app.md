# create-lwc-app

A tool for setting up your Lightning Web Components projects.

[![Github Workflow](https://github.com/muenzpraeger/create-lwc-app/workflows/create-lwc-app%20build/badge.svg?branch=main)](https://github.com/muenzpraeger/create-lwc-app/actions)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

[![Version](https://img.shields.io/npm/v/create-lwc-app.svg)](https://npmjs.org/package/create-lwc-app) [![Downloads/week](https://img.shields.io/npm/dw/create-lwc-app.svg)](https://npmjs.org/package/create-lwc-app) create-lwc-app

[![Version](https://img.shields.io/npm/v/lwc-services.svg)](https://npmjs.org/package/lwc-services) [![Downloads/week](https://img.shields.io/npm/dw/lwc-services.svg)](https://npmjs.org/package/lwc-services) lwc-services

[![Version](https://img.shields.io/npm/v/lwc-webpack-plugin.svg)](https://npmjs.org/package/lwc-webpack-plugin) [![Downloads/week](https://img.shields.io/npm/dw/lwc-webpack-plugin.svg)](https://npmjs.org/package/lwc-webpack-plugin) lwc-webpack-plugin

[![Version](https://img.shields.io/npm/v/rollup-plugin-lwc-typescript.svg)](https://npmjs.org/package/rollup-plugin-lwc-typescript) [![Downloads/week](https://img.shields.io/npm/dw/rollup-plugin-lwc-typescript.svg)](https://npmjs.org/package/rollup-plugin-lwc-typescript) rollup-plugin-lwc-typescript

## 🔥🔥 Information for migrating from lwc-services 1.x to 2.x or higher 🔥🔥

The new v2 release 🎉 of `create-lwc-app` / `lwc-services` brought some breaking changes. Please read [here in the wiki](https://github.com/muenzpraeger/create-lwc-app/wiki/Migration-info-v1-to-v2) what as changed, and how to adept the changes.

If you migrate to 3.0.0, please note that this ships out-of-the-box with Webpack 5 and requires node 14 or higher.

## 🚀 Quick Start

To get up and running execute the following command in a shell/terminal:

```
npx create-lwc-app your-app-name
```

> To run this you must have Node.js 10+ installed with at least npm 5.2+. You should be familiar with either npm or yarn. The npx tool is a package runner that installs with npm 5.2+.

This will run an npx installation of [create-lwc-app](./packages/create-lwc-app), guide you through the short setup, and then create a new Lightning Web Components project for you.

Then run `yarn watch` (or `npm run watch` depending on what you chose during the npx installation). **Done!**

## 🎁 Live App

If you want to see Lightning Web Components in action check out [https://recipes.lwc.dev](https://recipes.lwc.dev).

## So what's this tool about?

Technically it's a toolchain that gives you a quickstart experience for developing with Lightning web components. This project consists of two packages:

-   [create-lwc-app](./packages/create-lwc-app)
-   [lwc-services](./packages/lwc-services)

It is focused on providing a quick and customizable onboarding experience when you want to develop with Lightning Web Components. If you want to develop Lightning Web Components on the Salesforce Platform you likely want to use [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli) instead.

If you haven't heard about Lightning Web Components - it's a new framework, introduced by [Salesforce](https://www.salesforce.com/), based on the Web Components specifications. Read more about it in the [official documentation](https://lwc.dev).

## create-lwc-app

### Standard vs. Advanced mode

When you run `npx create-lwc-app your-app` the wizard will ask you if you want to run in simple mode (default).

With that mode you mostly have to define name, app type (standard or PWA) etc. When you go for the "advanced" mode you can (or have to) select all the different options.

These are the default values that are automatically set when you run "simple" mode:

-   App type: standard
-   Package manager: npm
-   Bundler: Webpack
-   Language: JavaScript
-   Express API server: no

If you want else you've to go with the advanced mode.

### Silent mode

By using new CLI parameters you can skip the whole wizard experience.

-   `--yes` - mandatory flag for running the silent installation process
-   `-t | --t` - set the app type. Values are `standard` | `pwa` | `electron`, default is `standard`
-   `-o | --o` - set the options (if you want to override the defaults). Values are `rollup|yarn|express|typescript`

Examples:

```
npx create-lwc-app my-cool-app
npx create-lwc-app my-other-app --yes -t pwa -o typescript
```

## lwc-services

`create-lwc-app` is meant to be a one-stop-shop solution. The created project contains everything you need to get started. It adds the dev dependency `lwc-services`. Find below the list of all the things that are bundled with it. When you create a project with `create-lwc-app` a number of predefined scripts also get added to your `package.json`.

### Configuration

If you want to override certain behavior of `lwc-services` you can place an `lwc-services.config.js` file into the root of your app directory. Checkout [the example file](./packages/lwc-services/example/lwc-services.config.js) for possible configuration parameters and values.

### Commands

-   [`lwc-services build`](#lwc-services-build)
-   [`lwc-services sniff`](#lwc-services-sniff)
-   [`lwc-services test`](#lwc-services-test)
-   [`lwc-services watch`](#lwc-services-watch)

#### `lwc-services build`

Creates a new build

```
USAGE
  $ lwc-services build

OPTIONS
  -b, --bundler=webpack          [default: webpack] defines the to be used bundler (webpack|rollup)
  -d, --destination=destination  [default: ./dist] defines the directory where the build is stored
  -m, --mode=mode                [default: development] defines the mode for the build (production|development)
  -n, --noclear                  setting this will not re-create the build dir
  -w, --webpack=webpack          location of custom webpack configuration file, which will be merged into the default config
  --webpack-plugin-override      comma separated values containing names of webpack plugins you want to override

EXAMPLES
  lwc-services build
  lwc-services build -d ./public --noclear
```

#### `lwc-services sniff`

Exports configuration information. It's not a full "eject" out of this tool. Yet.

```
USAGE
  $ lwc-services sniff

OPTIONS
  -d, --directory=directory  (required) exports configuration files to the given directory
  -w, --webpack=webpack      location of custom webpack configuration file
  --webpack-plugin-override  comma separated values containing names of webpack plugins you want to override

EXAMPLE
  lwc-services sniff -d somedirectory
```

#### `lwc-services test`

Runs tests for Lightning Web Components

```

Runs Jest tests for Lightning Web Components

USAGE
  $ lwc-services test:unit

OPTIONS
  -c, --coverage                 collects a coverage report
  -d, --debug                    runs tests in debug mode (https://jestjs.io/docs/en/troubleshooting)
  -p, --passthrough=passthrough  subsequent command line args are passed through (https://jestjs.io/docs/en/cli)
  -r, --runInBand                runs tests serially (slower, but often needed when running on CI systems)
  -w, --watch                    runs in watch mode and re-runs tests on file changes

EXAMPLES
  lwc-services test:unit
  lwc-services test:unit --coverage
  lwc-services test:unit -w
```

#### `lwc-services watch`

Runs a Lightning Web Components project in watch mode

```
USAGE
  $ lwc-services watch

OPTIONS
  -b, --bundler=webpack       [default: webpack] defines the to be used bundler (webpack|rollup)
  -i, --host=host             [default: localhost] sets the hostname/IP address
  -m, --mode=mode             [default: development] defines the mode for the build (production|development)
  -o, --open                  opens the site in the default browser
  -p, --port=port             [default: 3001] configures the port of the application
  -w, --webpack=webpack       location of custom webpack configuration file, which will be merged into the default config
  --webpack-plugin-override   comma separated values containing names of webpack plugins you want to override

EXAMPLES
  lwc-services watch
  lwc-services watch -p 3998 -i 192.168.178.12 -m production
```

## 🖖 Contribution

If you have great ideas on how to extend this tool - feel free to open new issues, and then PR something in. ;-)

Please read [the contribution guideline](./CONTRIBUTION.md) for that. Thanks!
