# pinst [![Node.js CI](https://github.com/typicode/pinst/workflows/Node.js%20CI/badge.svg)](https://github.com/typicode/pinst/actions) [![npm](https://img.shields.io/npm/v/pinst.svg)](https://www.npmjs.com/package/pinst)

> `pinst` lets you have `postinstall` hook that runs only in dev 🍺

This can be useful if you want to automatically run commands just after `npm install`, but don't want your package users to be affected.

## Usage

```sh
$ npm install pinst --save-dev
```

```js
// package.json
{
  "scripts": {
    "postinstall": "<some dev only command>",
    "prepublishOnly": "pinst --disable",
    "postpublish": "pinst --enable"
  }
}
```

```sh
$ npm publish
```

_On `prepublishOnly`, `postinstall` will be renamed to `_postinstall` (disabled)_

_On `postpublish`, it will be renamed back to `postinstall` (enabled)_

## CLI

`pinst` accepts the following flags:

```
--enable, -e   Enable postinstall hook
--disable, -d  Disable postinstall hook
--silent, -s
```

## Try it

To test that everything works without actually publishing your package, you can manually run the following commands:

```sh
$ npm run prepublishOnly
$ npm run postpublish
```

## Tips

By inverting commands, you can also use `pinst` to enable `postinstall` for your users only and not yourself.

`pinst` also supports `install` alias.

## License

MIT - [Typicode :cactus:](https://github.com/typicode)
