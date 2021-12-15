[![Build Status](https://travis-ci.org/mamal72/axel-downloader.svg?branch=master)](https://travis-ci.org/mamal72/axel-downloader)
[![Coverage Status](https://coveralls.io/repos/github/mamal72/axel-downloader/badge.svg)](https://coveralls.io/github/mamal72/axel-downloader)
[![license](https://img.shields.io/github/license/mamal72/axel-downloader.svg)](https://github.com/mamal72/axel-downloader/blob/master/LICENSE)

# axel-downloader

A node.js wrapper around [axel downloader](https://github.com/eribertomota/axel).


## Installation

- Install [Axel](https://github.com/eribertomota/axel).

<details>
<summary>macOS</summary>

```bash
brew install axel
```

</details>

<details>
<summary>Ubuntu</summary>

```bash
sudo apt install axel
```

</details>

- Install `axel-downloader` from `npm`:

```bash
yarn add axel-downloader
# or
npm i axel-downloader -S
```


## Usage

```js
import { Download } from 'axel-downloader';

const url = 'http://somewhere-something.xyz/some-file.abc';
const downloadPath = '/home/username/Downloads'; // OPTIONAL
const options = {
  connections: 32,
  maxSpeed: 6000, // KB
  userAgent: 'Axel Bot',
  headers: [{
    key: 'token',
    value: 'n0tS0f3'
  }]
}; // OPTIONAL

const download = new Download(url, downloadPath, options);
download.on('start', () => {
  console.log('Download Started!');
});
download.on('progress', data => {
  console.log('Progress', data);
});
download.on('error', err => {
  console.log('Error', err);
});
download.on('connection-finished', data => {
  console.log('Connection Finished', data);
});
download.on('finish', () => {
  console.log('Download Finished!');
});
download.on('stop', () => {
  console.log('Download Stopped!');
});
download.start();
```

`Download` class inherits from EventEmitter. You can listen on it for `start`, `progress`, `error`, `connection-finished`, `finish`, `stop` events.

*More details will be added.*


## Tests

```bash
yarn test
# or
npm test
```


## Ideas || Issues

Just create an issue and describe it. I'll check it ASAP!


## Contribution

You can fork the repository, improve or fix some part of it and then send the pull requests back if you want to see them here. I really appreciate that. :heart:

Remember to write a few tests if you can. :wrench:


## License

> Licensed under the [MIT License](https://github.com/mamal72/axel-downloader/blob/master/LICENSE).