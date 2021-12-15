# sernum [![Build Status](https://travis-ci.org/taoyuan/sernum.svg?branch=master)](https://travis-ci.org/taoyuan/sernum)

> Reads the machine's serial number. Supports Linux, Mac (OS X), Windows, and FreeBSD.


## Install

```bash
$ npm install sernum
```

And/or install globally for a `sernum` shell command:

```bash
$ [sudo] npm install -g sernum
```

## Usage

The serial number value is retrieved from the system asynchronously and return with a promise.

```js
const sernum = require('sernum');
sernum().then(val => console.log(val));
```

To prefix the system command with `sudo` use the `sudo` method:

```js
sernum.sudo().then(val => console.log(val));
```

For the CLI command it's just

```sh
$ sernum
ABC123DEF456
```

## Creds

* [serial-number](https://github.com/es128/serial-number)

## License

MIT © [Yuan Tao](https://github.com/taoyuan)
