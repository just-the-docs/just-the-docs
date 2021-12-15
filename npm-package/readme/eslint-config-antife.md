# eslint-config-antife

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]

[npm-image]: http://img.shields.io/npm/v/eslint-config-antife.svg?style=flat-square
[npm-url]: http://npmjs.org/package/eslint-config-antife
[travis-image]: https://img.shields.io/travis/ant-ife/eslint-config-antife.svg?style=flat-square
[travis-url]: https://travis-ci.org/ant-ife/eslint-config-antife
[coveralls-image]: https://img.shields.io/coveralls/ant-ife/eslint-config-antife.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/ant-ife/eslint-config-antife?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

Eslint config for Ant international FE team

## Usage

require `eslint@6`

### For general project

```bash
$ npm i eslint --save-dev
$ npm i eslint-config-antife eslint-plugin-intl-mobile --save-dev
```

Add `.eslintrc.js` in your root directory.

```javascript
module.exports = {
  extends: 'antife',
}
```

### For Vue.js project

```bash
$ npm i eslint --save-dev
$ npm i eslint-config-antife eslint-plugin-intl-mobile --save-dev
$ npm i eslint-plugin-vue --save-dev
```

Add `.eslintrc.js` in your root directory.

```javascript
module.exports = {
  extends: [
    'antife',
    'plugin:vue/recommended',
  ],
  rules: {
    // "vue/attributes-order": 0,
  }
};
```

vue rules, please refer to https://eslint.vuejs.org/rules/

## License

The MIT License (MIT)
