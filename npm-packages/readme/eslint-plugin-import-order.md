# eslint-plugin-import-order

[![version](https://img.shields.io/npm/v/eslint-plugin-import-order.svg)](http://npm.im/eslint-plugin-import-order)

ESLint plugin to enforce the order of import/require statements.

# Deprecation notice

This plugin is no longer maintained, as its sole feature has been integrated and improved upon in [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import), which does even more cool stuff. The corresponding rule is available under the name [`order`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs%2Frules%2Forder.md).


## Install

```
$ npm install --save-dev eslint eslint-plugin-import-order
```


## Usage

Configure it in `package.json`.

```json
{
	"name": "my-awesome-project",
	"eslintConfig": {
		"env": {
			"es6": true
		},
		"parserOptions": {
			"ecmaVersion": 6,
			"sourceType": "module"
		},
		"plugins": [
			"import-order"
		],
		"rules": {
			"import-order/import-order": 2
		}
	}
}
```


## Rules

- [import-order](docs/rules/import-order.md) - Enforce a convention in module import order.

## Recommended configuration

This plugin exports a [`recommended` configuration](index.js#L8) that enforces good practices.

To enable this configuration use the `extends` property in your `package.json`.

```json
{
	"name": "my-awesome-project",
	"eslintConfig": {
		"extends": "plugin:import-order/recommended",
		"plugins": [
			"import-order"
		]
	}
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

**Note**: This configuration will also enable the correct [parser options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options) and [environment](http://eslint.org/docs/user-guide/configuring#specifying-environments).
