# `getRandomValues` for React Native

A small implementation of `getRandomValues` for React Native.

## Installation

```sh
# RN >= 0.6
npm install --save react-native-get-random-values
cd ios
pod install
```

```sh
# RN <0.6
npm install --save react-native-get-random-values
react-native link react-native-get-random-values
```

## Usage

This library works as a polyfill for the global `crypto.getRandomValues`.

```javascript
// Add this line to your `index.js`
import 'react-native-get-random-values'
```

## API

### `crypto.getRandomValues(typedArray)`

The `crypto.getRandomValues()` method lets you get cryptographically strong random values. The array given as the parameter is filled with random numbers (random in its cryptographic meaning).

To guarantee enough performance, implementations are not using a truly random number generator, but they are using a pseudo-random number generator *seeded* with a value with enough entropy. The PRNG used differs from one implementation to the other but is suitable for cryptographic usages. Implementations are also required to use a seed with enough entropy, like a system-level entropy source.

- `typedArray` - Is an integer-based TypedArray, that is an `Int8Array`, a `Uint8Array`, an `Int16Array`, a `Uint16Array`, an `Int32Array`, or a `Uint32Array`. All elements in the array are going to be overridden with random numbers.

Returns the typed array that was passed in.
