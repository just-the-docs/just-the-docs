# jest-environment-jsdom-fourteen

## Deprecated - use `jest-environment-jsdom@26` instead.

[Jest](https://jestjs.io) by default uses [JSDOM](https://github.com/jsdom/jsdom) 11 to support Node 6. This package uses JSDOM 14, which supports Node >= 8, and does not support Node 6 ([and will therefore not be used in Jest any time soon](https://github.com/kentcdodds/dom-testing-library/issues/115#issuecomment-428314737)).

If you need a newer JSDOM than the one that ships with Jest, install this package using `npm install --save-dev jest-environment-jsdom-fourteen` or `yarn add jest-environment-jsdom-fourteen --dev`, and edit your Jest config like so:

```json
{
  "testEnvironment": "jest-environment-jsdom-fourteen"
}
```

If you would like to use JSDOM 13, see https://github.com/theneva/jest-environment-jsdom-thirteen.
