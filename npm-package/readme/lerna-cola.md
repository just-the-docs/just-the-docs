

> **Archived / Deprecated**
>
> I no longer need to use this project as the awesome team Zeit give me everything I need with their `now dev` tool and cloud platform. So happy to sunset this project as maintaining this type of project is super hard work. 😀

---

# Lerna Cola 🥤

Superpowers for your [Lerna](https://lernajs.io/) monorepos.

Clean, build, develop, and deploy your packages utilising a rich plugin ecosystem.

## TOC

- [Introduction](#introduction)
- [Requirements](#requirements)
- [(Not Really) Requirements](#not-really-requirements)
- [Getting Started](#getting-started)
- [Sample Application](#sample-application)
- [Video Walkthrough](#video-walkthrough)
- [Configuration](#configuration)
  - [Example Configuration](#example-configuration)
  - [Configuration Schema](#configuration-schema)
- [CLI Commands](#cli-commands)
  - [clean](#clean)
  - [build](#build)
  - [develop](#develop)
  - [deploy](#deploy)
- [Plugins](#plugins)
  - [Core Plugins](#core-plugins)
    - [`plugin-clean-build`](#plugin-clean-build)
    - [`plugin-develop-server`](#plugin-develop-server)
    - [`plugin-script`](#plugin-script)
  - [Official Plugins](#official-plugins)
    - [`@lerna-cola/plugin-build-babel`](#lerna-cola-plugin-build-babel)
    - [`@lerna-cola/plugin-build-flow`](#lerna-cola-plugin-build-flow)
    - [`@lerna-cola/plugin-deploy-now`](#lerna-cola-plugin-deploy-now)
  - [3rd Party Plugins](#3rd-party-plugins)
- [Plugin Development](#plugin-development)
  - [Clean Plugin](#clean-plugin)
  - [Build Plugin](#build-plugin)
  - [Develop Plugin](#develop-plugin)
  - [Deploy Plugin](#deploy-plugin)
  - [Schemas](#schemas)
    - [`Package` Schema](#package-schema)
    - [`Config` Schema](#package-schema)

## Introduction

[Lerna](https://lernajs.io/) makes it crazy easy to manage cross package dependencies and provides sane methods to version them. It takes away the fear of creating and maintaining a wide set of packages, allowing us to fully embrace the module ethos by creating packages with isolated responsibilities.

Lerna Cola wants to build on top of these core principles by providing the following additional features:

- Easily **enrich your packages** with a **compilation/transpilation/bundling** step (babel/flow/typescript/reasonml/webpack/parcel/etc/etc/etc).
- Take away the fear of building a wide set of **microservices/lambda packages** by providing a **rich development service** that handles **hot/auto reloading** of your packages. This allows for a **fluid development experience** reminiscent of old school single package/repository based development.
- **Deploy** your packages with a simple command to a **cloud provider** of your choice.

You access the features via one of the 4 CLI commands that Lerna Cola provides: [`clean`](#clean), [`build`](#build), [`develop`](#develop), and [`deploy`](#deploy).

The commands utilise a rich plugin eco-system, allowing for 3rd party contributions.

Lift your build, development and deployment to the root of your monorepo, keep your packages clean, and utilise the full benefits of a monorepo structure.

## Requirements

- **Node >= 8**

  Version 8 was LTS at the time of writing this so a decision was made to run with it.

## (Not Really) Requirements

- **[Lerna](https://lernajs.io/)**

  To tell you the truth, we don't strictly require that you use Lerna. You could very well use straight up Yarn workspaces or any other monorepo enabling tool, but in our opinion you would be missing out on some very cool features that Lerna provides.

## Getting started

**First, you need to install the cli**

```bash
yarn add @lerna-cola/cli -DW
```

_or, via NPM_:

```bash
npm i @lerna-cola/cli -D
```

**Secondly, you'll need a `lerna-cola.js` [configuration](#configuration) file**

You'll need to reference the [Configuration](#configuration) on how to do this.

**Lastly, fire up the lern-cola CLI**

You can run the help to see the help commands

```bash
yarn lerna-cola help
```

_or, via NPX_

```
npx lerna-cola help
```

## Sample Application

We definitely recommend that you read the all of the documentation first in order to gain a better understanding of Lerna Cola, however, we want to highlight early on that a sample application is maintained here:

- https://github.com/ctrlplusb/lerna-cola-sample

This provides a great way for you to quickly clone and run a non-trivial project in order to assess the benefits that Lerna Cola could bring to your monorepos.

## Video Walkthrough

> Coming soon

## Configuration

To use Lerna Cola you will need to create a configuration file named either `lerna-cola.json` or `lerna-cola.js` within the root of your monorepo.

> Note: When creating a `.js` file ensure that you export the configuration object via `module.exports`.

### Example Configuration

Before we describe the configuration schema, it may be helpful to review a "typical" configuration:

```javascript
module.exports = {
  packages: {
    // The following two packages are microservices where we are using the babel
    // plugin to transpile them to support our current node version, and the
    // server develop plugin which will take care of executing and restarting
    // our microservices for any changes up their dependency trees.

    'microservice-one': {
      buildPlugin: '@lerna-cola/plugin-build-babel',
      developPlugin: 'plugin-develop-server',
    },

    'microservice-two': {
      buildPlugin: '@lerna-cola/plugin-build-babel',
      developPlugin: 'plugin-develop-server',
    },

    // The following package is a "Create React App" package which comes with
    // it's own build and develop (start) scripts. We will therefore use the
    // Lerna Cola script plugin to delegate to the CRA scripts.

    'my-ui': {
      buildPlugin: {
        name: 'plugin-script',
        options: {
          scriptName: 'build',
        },
      },
      developPlugin: {
        name: 'plugin-script',
        options: {
          scriptName: 'start',
        },
      },
    },
  },
}
```

Within this example we are providing a Lerna Cola configuration for 3 of our packages within our monorepo. We need not provide a configuration for every package within our monorepo; only the ones that we wish to execute Lerna Cola plugins against. Lerna Cola will still be aware of the other packages within our repo, for example providing hot reloading on our servers/apps when a change occurs on our shared utils package.

In our example we have two microservices that will be Babel transpiled by the [`build`](#build) command, and will be treated as server process (with execution and hot reloading) by the [`develop`](#develop) command. The third package configuration utilities a special [Create React App](https://TODO) plugin that contains configuration for both the [`build`](#build) and [`develop`](#develop) commands.

This is a very basic example, however, it is illustrative of how quickly you can provide a centralised and coordinated configuration for your monorepo packages. Plugins can of course be customised via options. We recommend you read the [plugin](#plugins) docs for detailed information on them.

### Configuration Schema

The configuration is an Object/JSON structure that supports the following schema:

- `commandHooks` (_Object_, **optional**)

  A set of hooks to allow you to execute a function pre/post each command. You can specify a set of hooks for each of the commands:

  - clean
  - build
  - develop
  - deploy

  Each of them support the following configuration _Object_:

  - `pre`: (_Function_, **optional**)

    Runs prior to the specifed command. Can return a `Promise`, which will be waited on to resolve before proceeding.

  - `post`: (_Function_, **optional**)

    Runs after to the specifed command completes/fails. Can return a `Promise`, which will be waited on to resolve before proceeding.

  Example:

  ```javascript
  // lerna-cola.js
  module.exports = {
    commandHooks: {
      build: {
        pre: () => Promise.resolve(),
        post: () => Promise.resolve(),
      },
    },
  }
  ```

- `packages` (_Object_, **_optional_**)

  An object where each key is the name of a package within your repository (matching the name of the package within the package's `package.json` file). The value against each key is considered a package configuration object, supporting the following schema:

  - `buildPlugin` (_string_ || _Object_, **optional**)

    The plugin to use when building the package. Please see the [Plugins](#plugins) documentation for more information.

  - `developPlugin` (_string_ || _Object_, **optional**)

    The plugin to use when developing the package. Please see the [Plugins](#plugins) documentation for more information.

  - `deployPlugin` (_string_ || _Object_, **optional**)

    The plugin to use when deploying the package. Please see the [Plugins](#plugins) documentation for more information.

  - `srcDir` (_string_, **optional**, **default**: 'src')

    The directory within your package containing the source.

  - `entryFile` (_string_, **optional**, **default**: 'index.js')

    The file within your `srcDir` that should be considered the "entry" file for your package.

  - `outputDir` (_string_, **optional**, **default**: 'build')

    The directory which should be targetted for build output by the build plugins. Also used by the clean plugin to know which directory should be removed.

  - `disableSrcWatching` (_boolean_, **optional**, **default**: false)

    Use this to disable watching of the source when running the develop command. This can be useful if you don't care about tracking changes for a specific package within your repository, or you have a seperate process that will already track source changes for the respective package (e.g. the `start` script within a Create React App project).

- `packageSources` (_Array&lt;string&gt;_, **_optional_**, **default**: _see below_)

  An array of globs, paths where your packages are contained. By default it uses the same configuration as Lerna, i.e.:

  ```json
    "packageSources": [
      "packages/*"
    ]
  ```

## CLI Commands

Below is an brief description of each command that the CLI provides. You can request for help via the CLI for all of the commands like so:

```bash
lerna-cola help
```

Or for an individual command like so:

```bash
lerna-cola build help
```

When executing commands all of the environment variables that are currently available (i.e. `process.env`) will be passed into the respective processes that are spawned for each package.

### clean

Clean the output from the the [`build`](#build) command.

By default the [`plugin-clean-build`](#plugin-clean-build) plugin is used, however, you can customise this within your [configuration](#configuration).

### build

Take advantage of one of the wide array of plugins to babel/flow/typescript/reasonml/etc/etc/etc transpile/build your packages with the ability to easily share and manage configuration at the root of your monorepo.

When executed it will run all of the configured plugins for all of your packages that have a `buildPlugin` configured within the `lerna-cola.json` [configuration](#configuration) file. The package build order is based upon on a topological sort against the dependency tree of your packages within the monorepo (i.e. they build in the correct order).

### develop

Run a full auto-reloading development environment in which any changes to one package cascade through your package dependency tree. No more need to manually rebuild/restart servers during development allow for a blazingly hot development experience.

All of your packages will be watched (even the ones without any explicit configuration within your [configuration](#configuration)), with any changes being propagated through the dependency tree subsequently executing any "develop" plugins that are configured against your projects.

> Note: If you provide a "build" plugin against on your packages, but no explicit "develop" plugin, then the system will automatically execute the "build" plugin when handling changes.

All of the logs/output from your packages will be "merged" and printed within the console window where you ran the `develop` command. The console output contains a uniquely colored column to the left allowing you to easily identify the output for each respective package.

### deploy

Deploy your apps with a simple one line command to a cloud provider supported by the plugin system.

When executing this command your packages will be built in topological sort order (based on their dependency tree between each other) and then will subsequently be deployed via their configured plugins.

## Plugins

Lerna Cola is powered by a powerful plugin system that allows the build, develop, and deploy commands to support a multitude of targets. It is very easy to build your own plugin should you desire to so - please see the ["Plugin Development"](#plugin-development) section for more information.

Plugins are split by "core" plugins, which are bundled with the main `@lerna-cola/cli` package, and "package" plugins which could either be official Lerna Cola packages, 3rd party packages, or private packages of your own making.

You define plugins against each of your package configurations within your Lerna Cola [configuration](#configuration).

Plugins allow two forms of assignment.

**Form 1 - specify the plugin by name**

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-package': {
      buildPlugin: '@lerna-cola/plugin-build-babel',
    },
  },
}
```

**Form 2 - provide options to the plugin**

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-package': {
      buildPlugin: {
        name: '@lerna-cola/plugin-build-babel',
        options: {
          config: {
            presets: ['babel-preset-env'],
          },
        },
      },
    },
  },
}
```

You can pass down any arbitrary set of options, which will be made available to the respective plugin. Please refer to the documentation for each plugin in terms of what options it supports.

### Core Plugins

Below are the "core" plugins which will be immediately available when you add Lerna Cola to your repository.

#### `plugin-clean-build`

A [clean](#clean) command plugin.

This plugin will be automatically assigned to any package with a `buildPlugin` defined.

When executed it will remove the output directory targetted by your respective build plugin.

#### `plugin-develop-server`

A [develop](#develop) command plugin.

#### `plugin-script`

This is a special plugin that can be configured against any of your plugins for a package. i.e. `cleanPlugin`, `buildPlugin`, `developPlugin`, and `deployPlugin`.

It allows you to delegate to a script defined within the `package.json` of your targetted package.

This can be especially useful for packages that come with their own sets of scripts (e.g. A Create React App package).

**Options**

This plugin supports the following options:

- `scriptName` (_string_, **required**)

  The name of the script to run within your target package.

- `runForEveryChange` (_boolean_, **default**: false)

  Only used when assigned against the `developPlugin`. Setting this value to `true` will ensure that the your script will be executed any time a change is registered within your packages' source or against one of its dependencies. If your script spawns a long run child process (for example a Create React App server), then an existing running instance will be destroyed before the script is ran again.

**Example**

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-create-react-app': {
      buildPlugin: {
        name: 'script',
        options: {
          scriptName: 'build',
        },
      },
    },
  },
}
```

### Official Plugins

#### `@lerna-cola/plugin-build-babel`

A [build](#build) command plugin.

This plugin will transpile your package's `srcDir` (see the [configuration](#configuration)) using [Babel](https://babeljs.io), outputing the results into your packages `outputDir` (see the [configuration](#configuration)).

By default it will use a `.babelrc` found within your packages root directory, and if one is not found then it will look for a `.babelrc` within the root of your monorepo. You can alternatively provide a babel configuration via the plugin's options.

**Options**

This plugin supports the following options:

- `config` (_string_ || _Object_, **optional**)

  The [babel configuration](https://babeljs.io/docs/en/api.md) to use for the transpilation.

  This can be one of two things:

  - The name of a package where the main export is a babel configuration object.
  - An object containing the babel configuration.

  > Note: Lerna Cola ships a simple babel config package which you could use. It is called `@lerna-cola/babel-config`

We highly recommend that you enable sourcemaps output within your configuration to aid debugging.

**Example**

Specifying an inline config:

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-lib': {
      buildPlugin: {
        name: '@lerna-cola/plugin-build-babel',
        options: {
          config: {
            presets: ['babel-preset-env'],
          },
        },
      },
    },
  },
}
```

Specifying a package containing the configuration:

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-lib': {
      buildPlugin: {
        name: '@lerna-cola/plugin-build-babel',
        options: {
          config: 'my-babel-config-package',
        },
      },
    },
  },
}
```

#### `@lerna-cola/plugin-build-flow`

A [build](#build) command plugin.

This plugin will transpile your package's `srcDir` (see the [configuration](#configuration)), stripping your source of any flow annotations, and outputing the result (along with \*.flow) files into your package's `outputDir` (see the [configuration](#configuration)).

**Options**

This plugin supports the following options:

- `inputs` (_Array&lt;string&gt;_ , **optional**, **default**: _see below_)

  An array of glob strings which should be used to match the files that will be processed.

  Defaults to the following:

  ```json
  ["**/*.js", "!__tests__", "!test.js"]
  ```

**Example**

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-lib': {
      buildPlugin: '@lerna-cola/plugin-build-flow',
    },
  },
}
```

#### `@lerna-cola/plugin-deploy-now`

A [deploy](#deploy) command plugin.

This plugin allows your package to be deployed to Zeit's [now](https://zeit.co/now) cloud service.

For this plugin to work you need to have installed the `now` CLI, i.e.:

```bash
npm i -g now
```

You also need to ensure that you have logged into your `now` account:

```bash
now login
```

**Options**

This plugin supports the following options:

- `settings` (_Object_, **optional**)

  Any [settings](https://zeit.co/docs/features/configuration#settings) officially supported by now.

  We highly recommend you set the `alias` setting.

  Some defaults are automatically applied by the plugin, but you can override them:

  ```javascript
  {
    forwardNpm: true,
    public: false
  }
  ```

- `disableRemovePrevious` (_boolean_, **optional**, **default**: false)

  If you provide an `alias` within the `settings` option then this plugin will by default remove any previous deployments that were deployed against the target alias. This avoids any unnecessary build up of old deployments, which can become tedious to manage.

  Set this to `true` to prevent the removal of prior deployments of an alias target.

- `deployTimeoutMins` (_number_, **optional**, **default**: 15)

  The number of minutes to wait before timing out the deployment, subsequently stopping the deployment process with a failure indicated.

- `passThroughEnvVars` (_Array&lt;string&gt;_ , **optional**)

  An array of strings, describing which environment variables (currently available on your `process.env`) should be passed into the now deployment.

  e.g.

  ```javascript
  // lerna-cola.js
  module.exports = {
    packages: {
      'my-app': {
        deployPlugin: {
          name: '@lerna-cola/plugin-deploy-now',
          options: {
            alias: 'my-app.com',
            passThroughEnvVars: ['MY_DB_USERNAME', 'MY_DB_PASSWORD'],
          },
        },
      },
    },
  }
  ```

**Example**

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-app': {
      buildPlugin: {
        name: '@lerna-cola/plugin-deploy-now',
        options: {
          settings: {
            alias: 'my-app.com',
            sfo1: {
              sfo1: {
                min: 1,
                max: 5,
              },
            },
          },
        },
      },
    },
  },
}
```

#### `@lerna-cola/plugin-build-typescript`

> Coming soon

#### `@lerna-cola/plugin-build-reasonml`

> Coming soon

#### `@lerna-cola/plugin-build-parcel`

> Coming soon

#### `@lerna-cola/plugin-build-rollup`

> Coming soon

### 3rd Party Plugins

Hopefully we will have some soon. 🤞

Please submit a PR to add yours here.

## Plugin Development

Developing plugins is very easy. You can create a plugin to support one or more of the 4 commands that Lerna Cola provides.

To create a plugin simply create new package where the "main" on its package.json file points to the plugin module.

Your newly created package can adopt the behaviour of any of the plugin types as long as provides implementation for the interface specified for each plugin type. For example below is a template for a plugin package that supports all the command types (clean/build/develop/deploy):

```javascript
// my-plugin.js
module.exports = {
  name: 'my-plugin',
  clean: (pkg, options, args) => Promise.resolve('todo'),
  build: (pkg, options, args) => Promise.resolve('todo'),
  develop: (pkg, options, args) => Promise.resolve('todo'),
  deploy: (pkg, options, args) => Promise.resolve('todo'),
}
```

Looking at the above, you can see that a plugin is really just a simple object, containing functions that map to the command names. Each of the functions will receive a set of useful arguments, which will be described below, and need to return a `Promise` in order to indicate when they have completed.

When running a command, the associated plugins will get executed for each package that they are configured against. The plugin functions will receive as an argument an object describing the package that it is running against, as well as the specific options that were defined when assigning the plugin to the package within the Lerna Cola [configuration](#configuration) file.

Lets review the arguments that are provided to each of the plugin functions:

- `pkg` (_Package_)

  The package for which the plugin command is getting executed against. This contains lots of really useful information about the package, such as it's dependency tree, src and build output paths etc. Please see the [Package Schema](#package-schema) for a full breakdown of what is available.

- `options` (_Object_)

  Any options that were configured within the `lerna-cola.js` [configuration](#configuration) file will be provided here.

  For example:

  ```javascript
  // lerna-cola.js
  module.exports = {
    packages: {
      'my-lib': {
        buildPlugin: {
          name: '@lerna-cola/plugin-build-babel',
          // 👇 this stuff here
          options: {
            config: 'my-babel-config-package',
          },
        },
      },
    },
  }
  ```

- `args` (_Object_)

  This will contain any other useful utils/data. Mostly plugin specific. Please read the docs for each plugin below.

### Clean Plugin

Requires the following interface be satisfied:

```javascript
module.exports = {
  name: 'my-plugin',
  clean: (pkg, options, args) => Promise.resolve('todo'),
}
```

### Build Plugin

Requires the following interface be satisfied:

```javascript
module.exports = {
  name: 'my-plugin',
  build: (pkg, options, args) => Promise.resolve('todo'),
}
```

### Develop Plugin

Requires the following interface be satisfied:

```javascript
module.exports = {
  name: 'my-plugin',
  develop: (pkg, options, args) => Promise.resolve('todo'),
}
```

A special note on the develop plugin; it gets executed via the development service and will be run multiple times. Specifically the plugin will be run under the following conditions:

- When the development service first starts
- Any time a change is detected within the src directory of the package it is configured against
- Any time one of the packages within the monorepo that it depends on changes.

This allows you to know when to do restarting etc, and what type of behaviour you would like to implement for each scenario.

The `args` parameter is also well used by the develop plugin. It will contain the following items:

- `runType` (_string_)

  It will contain one of the following values:

  - 'FIRST_RUN'

    Indicates that this is the first time the develop plugin is being executed during by the development service.

  - 'SELF_CHANGED'

    Indicates that a file within the src directory of the package it is configured against changed.

  - 'DEPENDENCY_CHANGED'

    Indicates that a package that it depends upon within the monorepo changed.

- `changedDependency`

  This will contain the [Package](#package-scheam) meta object describing the dependency that changed when the `runType` is "DEPENDENCY_CHANGED".

### Deploy Plugin

Requires the following interface be satisfied:

```javascript
module.exports = {
  name: 'my-plugin',
  develop: (pkg, options, args) => Promise.resolve('todo'),
}
```

### Schemas

Below are schemas of the arguments that are provided to your plugins.

#### `Package` Schema

The holy grail of information for your plugins. The object contains the following:

- `name` (_string_)

  The name of the package.

- `config` (_Object_)

  The configuration that is being used (taken from the `lerna-cola.js` file with defaults applied) for it.

- `color` (`chalk` package function)

  The `chalk` function representing the color we will use to uniquely identify console output for the package.

- `dependants` (_Array&lt;string&gt;_)

  The names of the other packages within the monorepo that have a direct dependency on this package.

- `dependencies` (_Array&lt;string&gt;_)

  The names of the other packages within the monorepo that this package has a direct dependency on.

- `allDependants` (_Array&lt;string&gt;_)

  The names of the ALL other packages within the monorepo that directly, or indirectly (via dependency tree), depend on this package.

- `devDependencies` (_Array&lt;string&gt;_)

  The names of the other packages within the monorepo that this package has a direct devDependency on.

- `packageJson` (_Object_)

  The package.json for this package.

- `paths` (_Object_)

  A set of paths for this package. Containing the following paths:

  - `monoRepoRoot` (_string_)

    The path to the root of the monorepo that this package belongs to.

  - `monoRepoRootNodeModules` (_string_)

    The path to the node_modules dir contained within the root of the monorepo that this package belongs to.

  - `packageBuildOutput` (_string_)

    The path to which build output should be emitted.

  - `packageEntryFile` (_string_)

    The source entry file for this package.

  - `packageJson` (_string_)

    The path to the package.json file for the package.

  - `packageNodeModules` (_string_)

    The path to the node_modules file for the package.

  - `packageRoot` (_string_)

    The path to the root dir of the package.

  - `packageSrc` (_string_)

    The path to the src dir of the package.

#### `Config` Schema

> TODO
