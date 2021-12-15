# youdao-fanyi

[![Build Status](https://travis-ci.org/song940/youdao-fanyi.svg?branch=master)](https://travis-ci.org/song940/youdao-fanyi)

> Simple API for [Youdao Translate](http://fanyi.youdao.com) in JavaScript

[![NPM](https://nodei.co/npm/youdao-fanyi.png?downloads=true&stars=true)](https://nodei.co/npm/youdao-fanyi/)


有道翻译 API 平台已经全面升级，请前往新平台[有道智云](https://ai.youdao.com/?keyfrom=old-openapi)申请及后续使用。

原有的接口仍可以继续使用，对应的 SDK 也会在 1.x 版本继续维护，新版本将在 [next 分支](https://github.com/song940/youdao-fanyi/tree/next) 更新。

## Installation

```bash
~$ [sudo] npm install youdao-fanyi@1 [-g] [--save]
```
## Usage

```bash
~$ youdao-fanyi love

 youdao-fanyi@1.0.5

~ love [lʌv] - 爱

- n. 恋爱；亲爱的；酷爱；喜爱的事物
- vt. 喜欢；热爱；爱慕
- vi. 爱
- n. (Love)人名；(英)洛夫

1. love
   爱 / 爱情 / 爱心
2. Endless Love
   无尽的爱 / 蓝色生死恋 / 不了情
3. puppy love
   早恋 / 青春期恋爱 / 初恋
```

```bash
~$ youdao-fanyi breaking bad

 youdao-fanyi@1.0.5

~ Breaking Bad - 打破坏

- 绝命毒师（电视剧名）

1. Breaking Bad
   绝命毒师 / 超越罪恶 / 制毒师
2. Breaking g Bad
   绝命毒师
3. breaking breaking bad
   绝命毒师

```

## Example

Use defaults app key:

```js
const fanyi = require('youdao-fanyi');

// callback style
fanyi('hello world', (err, res) => {
  if(err) return console.error(err);
  console.log(res);
});

// async/await style works well
(async () => {
  const res = await fanyi('hello world'); // or: Youdao.fanyi('hello world');
  console.log(res);

})();
```

Use your app key:

```javascript
const Youdao = require('youdao-fanyi');

const fanyi = Youdao({
  key: '2001075261',  // Here is your key
  keyfrom: 'LSONGORG' // Here is your keyfrom
});

fanyi('hello world', (err, res) => {
  if(err) return console.error(err);
  console.log(res);
  // { translation: [ '你好，世界' ],
  // basic: { explains: [ '你好世界' ] },
  // query: 'hello world',
  // errorCode: 0,
  // web:
  //  [ { value: [Array], key: 'hello world' },
  //    { value: [Array], key: 'Hello Kitty World' },
  //    { value: [Array], key: 'Hello Cold World' } ] }
});

```

see more usage case in [test](./test/index.js).

## Licence

The MIT License (MIT)

Copyright (c) 2014 [Lsong](https://github.com/song940)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
