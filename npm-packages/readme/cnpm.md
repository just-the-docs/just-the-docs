cnpm
=======

[![NPM Version](https://img.shields.io/npm/v/cnpm.svg?style=flat-square)](https://npmjs.com/package/cnpm)
[![NPM Download](https://img.shields.io/npm/dm/cnpm.svg?style=flat-square)](https://npmjs.com/package/cnpm)
[![NPM Quality](http://npm.packagequality.com/shield/cnpm.svg?style=flat-square)](http://packagequality.com/#?package=cnpm)
[![GitHub Actions CI](https://github.com/cnpm/cnpm/actions/workflows/nodejs.yml/badge.svg?style=flat-square)](https://github.com/cnpm/cnpm/actions/workflows/nodejs.yml)

![logo](https://raw.github.com/cnpm/cnpmjs.org/master/logo.png)

cnpm: npm client for [cnpmjs.org](https://cnpmjs.org)


## Requirements

|        | Minimum | Recommended |
|--------|---------|-------------|
| NodeJS | 10.0.0  | stable      |

## Install

```bash
$ npm install cnpm -g
```

If you're in China, maybe you should install it from our [China mirror](https://registry.npmmirror.com):

```bash
$ npm install cnpm -g --registry=https://registry.npmmirror.com
```

## Usage

Support all commands just like `npm`.

### Sync packages from `npm`

```bash
$ cnpm sync [moduleName]
```

### Open package document or git web url

```bash
$ cnpm doc [name]
$ cnpm doc -g [name] # open git web url directly
```

## Build your own private registry npm cli

```bash
$ npm install cnpm -g

# then alias it
$ alias mynpm='cnpm --registry=https://registry.npm.example.com \
  --registryweb=https://npm.example.com \
  --userconfig=$HOME/.mynpmrc'
```

## Install with original npm cli

cnpm using [npminstall](https://github.com/cnpm/npminstall) by default.
If you don't like symlink mode for `node_modules`, you can change the installer to original npm.
But you will lose the fastest install speed.

```bash
$ cnpm i --by=npm react-native
```

## License

[MIT](LICENSE.txt)

## Contributors

[![](https://badges.implements.io/api/contributors?org=cnpm&repo=cnpm&width=1250&size=96&padding=6)](https://github.com/cnpm/cnpm/graphs/contributors)
