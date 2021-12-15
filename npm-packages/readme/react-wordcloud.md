# ☁️ react-wordcloud

Simple React + D3 wordcloud component with powerful features. Uses the [`d3-cloud`](https://github.com/jasondavies/d3-cloud) layout.

![image](/public/wordcloud.png)

## Install

```sh
npm install react-wordcloud
```

Note that `react-wordcloud` requires `react^16.13.0` as a peer dependency.

## Use

### Simple

```js
import React from 'react';
import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const words = [
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
]

function SimpleWordcloud() {
  return <ReactWordcloud words={words} />
}
```

By default, `ReactWordcloud` is configured with animated tooltips enabled and requires CSS for styling. Tippy provides base styling in the resources above or you can create your own.

### Kitchen Sink

An example showing various features (callbacks, options, size).

```js
const callbacks = {
  getWordColor: word => word.value > 50 ? "blue" : "red",
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
}
const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
};
const size = [600, 400];
const words = [...];

function MyWordcloud() {
  return (
    <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={words}
    />
  );
}
```

## Examples

View all documented examples and gallery of `react-wordcloud` applications at https://react-wordcloud.netlify.com/.

You can also run the examples locally:

```sh
git clone git@github.com:chrisrzhou/react-wordcloud

cd react-wordcloud
npm install && npm run docs
```

### No props

[![Edit react-wordcloud-simple](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bgov9)

### Responsive

[![Edit react-wordcloud-simple](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/55sb8)

### Configurable Options

[![Edit react-wordcloud-interactive](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/fnk8w)

### Callbacks

[![Edit react-wordcloud-interactive](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4lecp)

## Wordcloud Generator

Create wordclouds using this wordcloud generator: https://wordcloud-generator.netlify.com/

Features supported:

- Edit and Upload text inputs
- Various NLP features (stopwords, ngrams)
- Wordcloud configurations
- Export/save/share wordclouds

## Contributing

The code is written in `typescript`, linted with `xo`, and built with `microbundle`. Examples and documentations are built with `docz`.

Feel free to contribute by submitting a pull request.
