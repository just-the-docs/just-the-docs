# react-swipeable-views

> A React component for swipeable views.

| Package | Version | Download | Size (kB gzipped) |
|---------|:--------|:---------|:------------------|
| react-swipeable-views | [![npm version](https://img.shields.io/npm/v/react-swipeable-views.svg)](https://www.npmjs.com/package/react-swipeable-views) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views.svg)](https://www.npmjs.com/package/react-swipeable-views) | 5.08 |
| react-swipeable-views-utils | [![npm version](https://img.shields.io/npm/v/react-swipeable-views-utils.svg)](https://www.npmjs.com/package/react-swipeable-views-utils) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views-utils.svg)](https://www.npmjs.com/package/react-swipeable-views-utils) | 3.52 |
| react-swipeable-views-native | [![npm version](https://img.shields.io/npm/v/react-swipeable-views-native.svg)](https://www.npmjs.com/package/react-swipeable-views-native) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views-native.svg)](https://www.npmjs.com/package/react-swipeable-views-native) | ? |

[![Build Status](https://travis-ci.org/oliviertassinari/react-swipeable-views.svg?branch=master)](https://travis-ci.org/oliviertassinari/react-swipeable-views)
[![Dependencies](https://img.shields.io/david/oliviertassinari/react-swipeable-views.svg)](https://david-dm.org/oliviertassinari/react-swipeable-views)
[![DevDependencies](https://img.shields.io/david/dev/oliviertassinari/react-swipeable-views.svg)](https://david-dm.org/oliviertassinari/react-swipeable-views#info=devDependencies&view=list)
[![Donate](https://img.shields.io/badge/$-support-green.svg)](https://www.paypal.me/oliviertassinari/10)
[![TypeScript definitions on DefinitelyTyped](https://img.shields.io/badge/style-.d.ts-green.svg?style=flat&label=DefinitelyTyped)](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-swipeable-views)
[![Coverage Status](https://img.shields.io/codecov/c/github/oliviertassinari/react-swipeable-views/master.svg)](https://codecov.io/gh/oliviertassinari/react-swipeable-views/branch/master)

## Documentation
### Get started
- [Installation](https://react-swipeable-views.com/getting-started/installation/)
- [Usage](https://react-swipeable-views.com/getting-started/usage/)
- [Example projects](https://react-swipeable-views.com/getting-started/example-projects/)
- [Supported projects](https://react-swipeable-views.com/getting-started/example-projects/)
### Component API
- [Component API](https://react-swipeable-views.com/api/api/)
### More
- [Supported projects](https://react-swipeable-views.com/getting-started/example-projects/)
- [Demos](https://react-swipeable-views.com/demos/demos/)

## Installation

### Browser

```sh
npm install --save react-swipeable-views
```

### Native (experimental)

```sh
npm install --save react-swipeable-views-native
```

## The problem solved

Check out the [demos](https://react-swipeable-views.com/demos/demos/) from a mobile device (real or emulated).
It's tiny (<10 kB gzipped), it quickly renders the first slide, then lazy-loads the others.

## Simple example

![usage](/static/usage.gif)

### Browser

```jsx
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

const MyComponent = () => (
  <SwipeableViews>
    <div style={Object.assign({}, styles.slide, styles.slide1)}>
      slide n°1
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide2)}>
      slide n°2
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide3)}>
      slide n°3
    </div>
  </SwipeableViews>
);

export default MyComponent;
```

### Native (experimental)

react-native support is experimental and I have no plan pushing it forward.
I start to think that lower level abstraction to share the implementation between the platforms are more appropriate.
We have two different implementations of the react-swipeable-views API.

```jsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SwipeableViews from 'react-swipeable-views-native';
// There is another version using the scroll component instead of animated.
// I'm unsure which one give the best UX. Please give us some feedback.
// import SwipeableViews from 'react-swipeable-views-native/lib/SwipeableViews.scroll';

const styles = StyleSheet.create({
  slideContainer: {
    height: 100,
  },
  slide: {
    padding: 15,
    height: 100,
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

const MyComponent = () => (
  <SwipeableViews style={styles.slideContainer}>
    <View style={[styles.slide, styles.slide1]}>
      <Text style={styles.text}>
        slide n°1
      </Text>
    </View>
    <View style={[styles.slide, styles.slide2]}>
      <Text style={styles.text}>
        slide n°2
      </Text>
    </View>
    <View style={[styles.slide, styles.slide3]}>
      <Text style={styles.text}>
        slide n°3
      </Text>
    </View>
  </SwipeableViews>
);

export default MyComponent;
```

## Who's using react-swipeable-views?

- [Doctolib](https://github.com/doctolib)
- [mastodon](https://github.com/tootsuite/mastodon)
- [Material-UI](https://github.com/mui-org/material-ui)
- [Tinder](https://tinder.com)
- [Uber](https://www.uber.com)
- Are you using this library? Add your company or project.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/oliviertassinari/react-swipeable-views/blob/master/LICENSE).
