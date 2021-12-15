[![@nuxtjs/storybook](https://storybook.nuxtjs.org/preview.png)](https://storybook.nuxtjs.org)

# @nuxtjs/storybook

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Storybook](https://storybook.js.org/) integration with [NuxtJS](https://nuxtjs.org)

- [✨ &nbsp;Release Notes](https://storybook.nuxtjs.org/releases)
- [📖 &nbsp;Documentation](https://storybook.nuxtjs.org)

## Features

- Zero configuration
- Nuxt webpack configuration
- Nuxt plugins support
- Story discovery from nuxt modules
- Nuxt components support
- Storybook Generate
- Hot reload support
- Nuxt server middlewares

[📖 &nbsp;Read more](https://storybook.nuxtjs.org)

## Quick Setup

1. Add `@nuxtjs/storybook` dependency to your project:

```bash
#using yarn
yarn add --dev @nuxtjs/storybook
# using npm
npm install --save-dev @nuxtjs/storybook
```


> If you are using <b>Nuxt < 2.14.0</b>, you need to <a href="https://github.com/nuxt/nuxt.js/tree/v2.13.3/packages/babel-preset-app#example-2-use-core-js3">use `core-js@3`</a> 

2. Add `.nuxt-storybook` and `storybook-static` to your `.gitignore`:

```bash{}[.gitignore]
.nuxt-storybook
storybook-static
```

3. Start adding [stories](https://storybook.nuxtjs.org/getting-started/usage)

## Configure

Then, add `storybook` section in `nuxt.config.js`:

```js[nuxt.config.js]
export default {
  storybook: {
    // Options
  }
}
```

See [module options](https://storybook.nuxtjs.org/api/options).

## Run
Now you can use `nuxt storybook` to start:
```
# Using yarn
yarn nuxt storybook

# Using npm
npx nuxt storybook
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Start storybook server using `yarn dev`

## License

[MIT License](./LICENSE)

Copyright (c)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/storybook/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/storybook

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/storybook.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/storybook

[github-actions-ci-src]: https://github.com/nuxt-community/storybook/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/storybook/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/storybook.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/storybook

[license-src]: https://img.shields.io/npm/l/@nuxtjs/storybook.svg
[license-href]: https://npmjs.com/package/@nuxtjs/storybook
