<p>
  <a href="https://storybook.js.org/">
    <img src="https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png" alt="Storybook" width="400" />
  </a>
</p>

<p>Build bulletproof UI components faster</p>

<br/>

<p>
  <a href="https://circleci.com/gh/storybookjs/storybook">
    <img src="https://circleci.com/gh/storybookjs/storybook.svg?style=shield" alt="Build Status on CircleCI" />
  </a>
  <a href="https://www.codefactor.io/repository/github/storybookjs/storybook">
    <img src="https://www.codefactor.io/repository/github/storybookjs/storybook/badge" alt="CodeFactor" />
  </a>
  <a href="https://snyk.io/test/github/storybookjs/storybook">
    <img src="https://snyk.io/test/github/storybookjs/storybook/badge.svg" alt="Known Vulnerabilities" />
  </a>
  <a href="https://codecov.io/gh/storybookjs/storybook">
    <img src="https://codecov.io/gh/storybookjs/storybook/branch/master/graph/badge.svg" alt="codecov" />
  </a>
  <a href="https://github.com/storybookjs/storybook/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/storybookjs/storybook.svg" alt="License" />
  </a>
  <br/>
  <a href="https://discord.gg/storybook">
    <img src="https://img.shields.io/badge/discord-join-7289DA.svg?logo=discord&longCache=true&style=flat" />
  </a>
  <a href="https://storybook.js.org/community/">
    <img src="https://img.shields.io/badge/community-join-4BC424.svg" alt="Storybook Community" />
  </a>
  <a href="#backers">
    <img src="https://opencollective.com/storybook/backers/badge.svg" alt="Backers on Open Collective" />
  </a>
  <a href="#sponsors">
    <img src="https://opencollective.com/storybook/sponsors/badge.svg" alt="Sponsors on Open Collective" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=storybookjs">
    <img src="https://badgen.net/twitter/follow/storybookjs?icon=twitter&label=%40storybookjs" alt="Official Twitter Handle" />
  </a>
</p>

[Storybook](https://storybook.js.org) is a development environment for UI components.
It allows you to browse a component library, view the different states of each component, and interactively develop and test components. Find out more at https://storybook.js.org.

<center>
  <img src="https://raw.githubusercontent.com/storybookjs/storybook/master/media/storybook-intro.gif" width="100%" />
</center>

<p>
  View README for:<br/>
  <a href="https://github.com/storybookjs/storybook/blob/master/README.md" title="latest"><img alt="latest" src="https://img.shields.io/npm/v/@storybook/core/latest.svg" /></a>
  <a href="https://github.com/storybookjs/storybook/blob/next/README.md" title="next"><img alt="next" src="https://img.shields.io/npm/v/@storybook/core/next.svg" /></a>
</p>

## Table of contents

- 🚀 [Getting Started](#getting-started)
- 📒 [Projects](#projects)
  - 🛠 [Supported Frameworks & Examples](#supported-frameworks)
  - 🚇[ Sub Projects](#sub-projects)
  - 🔗[Addons](#addons)
- 🏅 [Badges & Presentation materials](#badges--presentation-materials)
- 👥 [Community](#community)
- 👏 [Contributing](#contributing)
  - 👨‍💻 [Development scripts](#development-scripts)
  - 💵 [Backers](#backers)
  - 💸 [Sponsors](#sponsors)
- :memo: [License](#license)

## Getting Started

Visit [Storybook's website](https://storybook.js.org) to learn more about Storybook, and to get started.

### Documentation

Documentation can be found [Storybook's docs site](https://storybook.js.org/docs).

### Examples

Here are some featured examples that you can reference to see how Storybook works: <https://storybook.js.org/docs/react/get-started/examples>

Storybook comes with a lot of [addons](https://storybook.js.org/docs/react/configure/storybook-addons) for component design, documentation, testing, interactivity, and so on. Storybook's API makes it possible to configure and extend in various ways. It has even been extended to support React Native, Android, iOS, and Flutter development for mobile.

### Community

For additional help, join us in the [Storybook Discord](https://discord.gg/storybook).

## Projects

### Supported Frameworks

| Framework                                                   | Demo                                                                        |                                                                                                |
| ----------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [React](app/react)                                          | [v6.2.x](https://storybookjs.netlify.com/official-storybook/?path=/story/*) | [![React](https://img.shields.io/npm/dm/@storybook/react.svg)](app/react)                      |
| [Vue](app/vue)                                              | [v6.2.x](https://storybookjs.netlify.com/vue-kitchen-sink/)                 | [![Vue](https://img.shields.io/npm/dm/@storybook/vue.svg)](app/vue)                            |
| [Angular](app/angular)                                      | [v6.2.x](https://storybookjs.netlify.com/angular-cli/)                      | [![Angular](https://img.shields.io/npm/dm/@storybook/angular.svg)](app/angular)                |
| [Web components](app/web-components)                        | [v6.2.x](https://storybookjs.netlify.com/web-components-kitchen-sink/)      | [![Svelte](https://img.shields.io/npm/dm/@storybook/web-components.svg)](app/web-components)   |
| [React Native](https://github.com/storybookjs/react-native) | -                                                                           | [![React Native](https://img.shields.io/npm/dm/@storybook/react-native.svg)](app/react-native) |
| [HTML](app/html)                                            | [v6.2.x](https://storybookjs.netlify.com/html-kitchen-sink/)                | [![HTML](https://img.shields.io/npm/dm/@storybook/html.svg)](app/html)                         |
| [Ember](app/ember)                                          | [v6.2.x](https://storybookjs.netlify.com/ember-cli/)                        | [![Ember](https://img.shields.io/npm/dm/@storybook/ember.svg)](app/ember)                      |
| [Svelte](app/svelte)                                        | [v6.2.x](https://storybookjs.netlify.com/svelte-kitchen-sink/)              | [![Svelte](https://img.shields.io/npm/dm/@storybook/svelte.svg)](app/svelte)                   |
| [Preact](app/preact)                                        | [v6.2.x](https://storybookjs.netlify.com/preact-kitchen-sink/)              | [![Preact](https://img.shields.io/npm/dm/@storybook/preact.svg)](app/preact)                   |
| [Marionette.js](app/marionette)                             | -                                                                           | [![Marionette.js](https://img.shields.io/npm/dm/@storybook/marionette.svg)](app/marionette)    |
| [Mithril](app/mithril)                                      | [v6.2.x](https://storybookjs.netlify.com/mithril-kitchen-sink/)             | [![Mithril](https://img.shields.io/npm/dm/@storybook/mithril.svg)](app/mithril)                |
| [Marko](app/marko)                                          | [v6.2.x](https://storybookjs.netlify.com/marko-cli/)                        | [![Marko](https://img.shields.io/npm/dm/@storybook/marko.svg)](app/marko)                      |
| [Riot](app/riot)                                            | [v6.2.x](https://storybookjs.netlify.com/riot-kitchen-sink/)                | [![Riot](https://img.shields.io/npm/dm/@storybook/riot.svg)](app/riot)                         |
| [Rax](app/rax)                                              | [v6.2.x](https://storybookjs.netlify.com/rax-kitchen-sink/)                 | [![Rax](https://img.shields.io/npm/dm/@storybook/rax.svg)](app/rax)                            |
| [Android, iOS, Flutter](https://github.com/storybookjs/native)                                              | [v6.2.x](https://storybookjs.github.io/native/@storybook/native-flutter-example/index.html)                 | [![Rax](https://img.shields.io/npm/dm/@storybook/native.svg)](https://github.com/storybookjs/native)                            |

### Sub Projects

- [CLI](lib/cli) - Streamlined installation for a variety of app types
- [examples](examples) - Code examples to illustrate different Storybook use cases

### Addons

| Addons                                                                    |                                                                            |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [a11y](addons/a11y/)                                                      | Test components for user accessibility in Storybook                        |
| [actions](addons/actions/)                                                | Log actions as users interact with components in the Storybook UI          |
| [backgrounds](addons/backgrounds/)                                        | Let users choose backgrounds in the Storybook UI                           |
| [cssresources](https://github.com/storybookjs/addon-cssresources)         | Dynamically add/remove css resources to the component iframe               |
| [design assets](https://github.com/storybookjs/addon-design-assets)       | View images, videos, weblinks alongside your story                         |
| [docs](addons/docs/)                                                      | Add high quality documentation to your components                          |
| [events](https://github.com/storybookjs/addon-events)                     | Interactively fire events to components that respond to EventEmitter       |
| [google-analytics](https://github.com/storybookjs/addon-google-analytics) | Reports google analytics on stories                                        |
| [graphql](https://github.com/storybookjs/addon-graphql)                   | Query a GraphQL server within Storybook stories                            |
| [jest](addons/jest/)                                                      | View the results of components' unit tests in Storybook                    |
| [links](addons/links/)                                                    | Create links between stories                                               |
| [query params](https://github.com/storybookjs/addon-queryparams)          | Mock query params                                                          |
| [storyshots](addons/storyshots/)                                          | Snapshot testing for components in Storybook                               |
| [storysource](addons/storysource/)                                        | View the code of your stories within the Storybook UI                      |
| [viewport](addons/viewport/)                                              | Change display sizes and layouts for responsive components using Storybook |

See [Addon / Framework Support Table](https://storybook.js.org/docs/react/api/frameworks-feature-support)

### Deprecated Addons

| Addons                                                                             |                                                           |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------|
| [info](https://github.com/storybookjs/deprecated-addons/tree/master/addons/info)   | Annotate stories with extra component usage information   |
| [notes](https://github.com/storybookjs/deprecated-addons/tree/master/addons/notes) | Annotate Storybook stories with notes                     |
| [contexts](https://storybook.js.org/addons/@storybook/addon-contexts/)             | Addon for driving your components under dynamic contexts  |
| [options](https://www.npmjs.com/package/@storybook/addon-options)                  | Customize the Storybook UI in code                        |
| [knobs](https://github.com/storybookjs/addon-knobs)                                | Interactively edit component prop data in the Storybook UI|

In order to continue improving your experience, we have to eventually deprecate certain addons in favor of new, better tools.

If you're using info/notes, we highly recommend you to migrate to [docs](addons/docs/) instead, and [here is a guide](addons/docs/docs/recipes.md#migrating-from-notesinfo-addons) to help you.

If you're using contexts, we highly recommend you to migrate to [toolbars](https://github.com/storybookjs/storybook/tree/next/addons/toolbars) and [here is a guide](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-addon-contexts) to help you.

## Badges & Presentation materials

We have a badge! Link it to your live Storybook example.

![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)

```md
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](link to site)
```

If you're looking for material to use in your presentation about storybook, like logo's video material and the colors we use etc, you can find all of that at our [brand repo](https://github.com/storybookjs/brand).

## Community

- Tweeting via [@storybookjs](https://twitter.com/storybookjs)
- Blogging at [storybook.js.org](https://storybook.js.org/blog/) and [Medium](https://medium.com/storybookjs)
- Chatting on [Discord](https://discord.gg/storybook)
- Streaming saved at [Youtube](https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg)

## Contributing

We welcome contributions to Storybook!

- 📥 Pull requests and 🌟 Stars are always welcome.
- Read our [contributing guide](CONTRIBUTING.md) to get started,
  or find us on [Discord](https://discord.gg/storybook), we will take the time to guide you

Looking for a first issue to tackle?

- We tag issues with [![Good First Issue](https://img.shields.io/github/issues/storybookjs/storybook/good%20first%20issue.svg)](https://github.com/storybookjs/storybook/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) when we think they are well suited for people who are new to the codebase or OSS in general.
- [Talk to us](https://discord.gg/storybook), we'll find something to suits your skills and learning interest.

### Development scripts

Storybook is organized as a monorepo using [Lerna](https://lerna.js.org/). Useful scripts include:

#### `yarn bootstrap`

> Installs package dependencies and links packages together - using lerna

#### `yarn lint`

> boolean check if code conforms to linting rules - uses remark & eslint

- `yarn lint:js` - will check js
- `yarn lint:md` - will check markdown + code samples
- `yarn lint:js --fix` - will automatically fix js

#### `yarn test`

> boolean check if unit tests all pass - uses jest

- `yarn run test --core --watch` - will run core tests in watch-mode

### Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. \[[Become a sponsor](https://opencollective.com/storybook#sponsor)]

<a href="https://opencollective.com/storybook/sponsor/0/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/1/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/2/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/3/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/4/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/5/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/6/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/7/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/8/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/9/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/10/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/11/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/12/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/13/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/14/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/15/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/16/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/17/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/18/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/19/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/20/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/21/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/22/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/23/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/24/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/25/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/26/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/27/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/28/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/storybook/sponsor/29/website" target="_blank"><img src="https://opencollective.com/storybook/sponsor/29/avatar.svg"></a>

### Backers

Support us with a monthly donation and help us continue our activities. \[[Become a backer](https://opencollective.com/storybook#backer)]

<a href="https://opencollective.com/storybook/backer/0/website" target="_blank"><img src="https://opencollective.com/storybook/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/1/website" target="_blank"><img src="https://opencollective.com/storybook/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/2/website" target="_blank"><img src="https://opencollective.com/storybook/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/3/website" target="_blank"><img src="https://opencollective.com/storybook/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/4/website" target="_blank"><img src="https://opencollective.com/storybook/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/5/website" target="_blank"><img src="https://opencollective.com/storybook/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/6/website" target="_blank"><img src="https://opencollective.com/storybook/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/7/website" target="_blank"><img src="https://opencollective.com/storybook/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/8/website" target="_blank"><img src="https://opencollective.com/storybook/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/9/website" target="_blank"><img src="https://opencollective.com/storybook/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/10/website" target="_blank"><img src="https://opencollective.com/storybook/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/11/website" target="_blank"><img src="https://opencollective.com/storybook/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/12/website" target="_blank"><img src="https://opencollective.com/storybook/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/13/website" target="_blank"><img src="https://opencollective.com/storybook/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/14/website" target="_blank"><img src="https://opencollective.com/storybook/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/15/website" target="_blank"><img src="https://opencollective.com/storybook/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/16/website" target="_blank"><img src="https://opencollective.com/storybook/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/17/website" target="_blank"><img src="https://opencollective.com/storybook/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/18/website" target="_blank"><img src="https://opencollective.com/storybook/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/19/website" target="_blank"><img src="https://opencollective.com/storybook/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/20/website" target="_blank"><img src="https://opencollective.com/storybook/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/21/website" target="_blank"><img src="https://opencollective.com/storybook/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/22/website" target="_blank"><img src="https://opencollective.com/storybook/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/23/website" target="_blank"><img src="https://opencollective.com/storybook/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/24/website" target="_blank"><img src="https://opencollective.com/storybook/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/25/website" target="_blank"><img src="https://opencollective.com/storybook/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/26/website" target="_blank"><img src="https://opencollective.com/storybook/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/27/website" target="_blank"><img src="https://opencollective.com/storybook/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/28/website" target="_blank"><img src="https://opencollective.com/storybook/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/storybook/backer/29/website" target="_blank"><img src="https://opencollective.com/storybook/backer/29/avatar.svg"></a>

## License

[MIT](https://github.com/storybookjs/storybook/blob/master/LICENSE)

-the end-
