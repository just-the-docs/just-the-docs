# eslint-config-medikoo

## [ESLint](http://eslint.org/docs/developer-guide/shareable-configs) shareable config used in my projets

At current stage it experimentally derives from `eslint:all`.

### Installation

    $ npm install --save-dev eslint eslint-config-medikoo

### Configuration

Add `eslintConfig` to package.json:

Following expresses configuration variant for environment agnostic ES2018+ projects:

```
	"eslintConfig": {
		"extends": "medikoo",
		"root": true
	}
```

For more specific needs, use other config variants:

- `medikoo/es5` - environment agnostic ES5+ projects
- `medikoo/es3` - environment agnostic ES3+ projects
- `medikoo/node` - Node.js v10+ projects
- `medikoo/node/14` - Node.js v14+ projects
- `medikoo/node/8` - Node.js v8+ projects
- `medikoo/node/6` - Node.js v6+ projects
- `medikoo/node/es5` - Node.js ES5+ projects
