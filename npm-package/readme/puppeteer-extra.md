# puppeteer-extra

This is the monorepo for [`puppeteer-extra`](./packages/puppeteer-extra), a modular plugin framework for [`puppeteer`](https://github.com/GoogleChrome/puppeteer). :-)

🌟 **For the main documentation, please head over to the [`puppeteer-extra`](./packages/puppeteer-extra) package.**

In case you're interested in the available plugins, check out the [packages folder](./packages/).

## Monorepo

<details>
 <summary><strong>Contributing</strong></summary>

### Contributing

PRs and new plugins are welcome! The plugin API for `puppeteer-extra` is clean and fun to use. Have a look the [`PuppeteerExtraPlugin`](./packages/puppeteer-extra-plugin) base class documentation to get going and check out the [existing plugins](./packages/) (minimal example is the [anonymize-ua](./packages/puppeteer-extra-plugin-anonymize-ua/index.js) plugin) for reference.

We use a [monorepo](https://github.com/berstend/puppeteer-extra) powered by [Lerna](https://github.com/lerna/lerna#--use-workspaces) (and yarn workspaces), [ava](https://github.com/avajs/ava) for testing, the [standard](https://standardjs.com/) style for linting and [JSDoc](http://usejsdoc.org/about-getting-started.html) heavily to auto-generate markdown [documentation](https://github.com/documentationjs/documentation) based on code. :-)

</details>

<details>
 <summary><strong>Lerna</strong></summary>

### Lerna

This monorepo is powered by [Lerna](https://github.com/lerna/lerna) and yarn workspaces.

#### Initial setup

```bash
# Install deps
yarn

# Bootstrap the packages in the current Lerna repo.
# Installs all of their dependencies and links any cross-dependencies.
yarn bootstrap

# Build all TypeScript sources
yarn build
```

#### Development flow

```bash
# Install debug in all packages
yarn lerna add debug

# Install fs-extra to puppeteer-extra-plugin-user-data-dir
yarn lerna add fs-extra --scope=puppeteer-extra-plugin-user-data-dir

# Remove dependency
# https://github.com/lerna/lerna/issues/833
yarn lerna exec --concurrency 1 'yarn remove fs-extra; echo 0'

# Run test in all packages
yarn test

# Update JSDoc based documentation in markdown files
yarn docs

# Upgrade project wide deps like puppeteer
# (We keep the devDependency version blurry)
rm -rf node_modules
rm -rf yarn.lock
yarn
yarn lerna bootstrap

# Update deps within packages (interactive)
yarn lernaupdate

# If in doubt :-(
yarn lerna exec "rm -f yarn.lock; rm -rf node_modules; echo 0"
rm -f yarn.lock &&  rm -rf node_modules && yarn cache clean


# Test a local monorepo package in an outside folder as it would've been installed from the registry
# Change PACKAGE_DIR to the path of this monorepo and PACKAGE to the package you wish to install
PACKAGE=puppeteer-extra PACKAGE_DIR=/Users/foo/puppeteer-extra/packages && yarn remove $(echo $PACKAGE); true && rm -f $(pwd)/$(echo $PACKAGE)-latest.tgz && yarn --cwd $(echo $PACKAGE_DIR)/$(echo $PACKAGE) pack --filename $(pwd)/$(echo $PACKAGE)-latest.tgz && YARN_CACHE_FOLDER=/tmp/yarn yarn add file:$(pwd)/$(echo $PACKAGE)-latest.tgz && rm -rf /tmp/yarn
```

#### Publishing

```bash
# make sure you're signed into npm before publishing
# yarn publishing is broken so lerna uses npm
npm whoami

# ensure everything is up2date and peachy
yarn
yarn bootstrap
yarn lerna link
yarn build
yarn test

# Phew, let's publish these packages!
# - Will publish all changed packages
# - Will ask for new pkg version per package
# - Will updated inter-package dependency versions automatically
yarn lerna publish

# Fix new dependency version symlinks
yarn bootstrap && yarn lerna link
```

</details>

<br>
<p>
  <img src="https://i.imgur.com/EuqiF5F.png"  height="240"  />
</p>
