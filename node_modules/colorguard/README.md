[![Build Status](https://travis-ci.org/SlexAxton/css-colorguard.svg?branch=master)](https://travis-ci.org/SlexAxton/css-colorguard)

# CSS Colorguard

Every CSS project starts out with good intentions, but inevitably, one too many people eye-dropper
colors into nooks and crannies that you never knew existed. CSS Colorguard helps you maintain the
color set that you want, and warns you when colors you've added are too similar to ones that already
exist. Naturally, it's all configurable to your tastes.

## How it works

Colorguard uses the [CIEDE2000](http://en.wikipedia.org/wiki/Color_difference#CIEDE2000) algorithm to determine
the similarity of each of the colors in your CSS file. This algorithm is quite complex, but is used
in the broadcasting community as the best approximation of human ability to discern differences in
color. RGB on the other hand, is pretty bad at representing differences in color purely based on the
numerical difference of the hex values.

Luckily, [someone else already implemented CIEDE2000](https://github.com/markusn/color-diff), so I
didn't have to. Tight. Cause this thing is mathy as hell.

![http://f.cl.ly/items/061h1y0x0G2X2e2t1q1f/Screen%20Shot%202014-07-03%20at%205.55.17%20PM.png](http://f.cl.ly/items/061h1y0x0G2X2e2t1q1f/Screen%20Shot%202014-07-03%20at%205.55.17%20PM.png)

### Alpha Transparency

Currently, alpha transparency is just stripped from the colors. So `rgb(0, 0, 0)` exactly matches
`rgba(0,0,0,0.5)`. This is usually fine unless someone is alphatransparency-happy and uses it for
darkening and lightening colors too often. It could probably be its own check in the future that
there aren't too many different alpha transparencies of the same color. This is not currently a
thing though.

## API

### `colorguard.process(css, [options]).then(function(result) {})`

#### options

##### ignore

Type: `array`

Specify hex codes of colors that you would like to ignore completely.
Use with caution.

##### threshold

Type: `number`
Default: `3`

`0` through `100`. Lower values are more precise; the default is `3` but that's
mostly personal opinion.

##### whitelist

Type: `array`

Pass an array of color pairs to ignore:

```js
[['#000000', '#010101']]
```

##### allowEquivalentNotation

Type: `boolean`
Default: `false`

By default, colorguard will complain if identical colors are represented with different notations.
For example, `#000`, `#000000`, `rgba(0, 0, 0, 0), and `black`. If you want to permit these
equivalent notations, set this option to `true`.

### `postcss([ colorguard(opts) ])`

CSS Colorguard can be consumed as a PostCSS plugin. See the
[documentation](https://github.com/postcss/postcss#usage) for examples for
your environment.

### Build Time

CSS Colorguard can be used in conjunction with other javascript build systems, such as:

* [gulp-colorguard](https://github.com/pgilad/gulp-colorguard)
* [broccoli-colorguard](https://github.com/SlexAxton/broccoli-colorguard)
* [grunt-colorguard](https://github.com/elliottwilliams/grunt-colorguard)

### CLI

CSS Colorguard also ships with a CLI app. To see the available options, just run:

```bash
$ colorguard --help
```

## Install

With npm, to get the command do:

```bash
npm install -g colorguard
```

To get the library & PostCSS plugin, do:

```bash
npm install colorguard
```

## Thanks

* [Stripe](https://stripe.com/) - They let me build this at work
* [@markusn](https://github.com/markusn) - Best CIEDE2000 implementation ever

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
