# corcer (corner cercle)

[![typescript](https://badgen.net/badge//typescript/0376c6?icon=npm)](https://www.typescriptlang.org/)
[![ci:status](https://badgen.net/circleci/github/nju33/corcer)](https://circleci.com/gh/nju33/corcer)
[![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--corcer.netlify.com/)
![license:mit](https://badgen.net/github/license/micromatch/micromatch)
[![browsersl.ist](https://badgen.net/badge/browserslist/chrome,edge/ffd539?list=1)](https://browserl.ist/?q=last+1+chrome+version%2C+last+1+edge+version)

## Install

```sh
yarn add corcer
```

## Example

```ts
import Corcer from 'corcer';

const MATRIX = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

let corcer: Corcer<number>;

beforeEach(() => {
  corcer = new Corcer(MATRIX);
});

test('basis', () => {
  expect(corcer.matrix).toMatchObject(MATRIX);
  expect(corcer.crop(4, 2, 6, 4).matrix).toMatchObject([[0, 0], [0, 0]]);

  expect(corcer.search([[0, 0], [0, 0]])).not.toBeUndefined();
  // tslint:disable-next-line:no-non-null-assertion
  expect(corcer.search([[0, 0], [0, 0]])!.ctx!.position).toMatchObject({
    x: 4,
    y: 2,
  });
  expect(corcer.search([[-1, -1], [-1, -1]])).toBeUndefined();

  expect(corcer.getItems()).toMatchObject([1, 0]);
  expect(corcer.getItems({uniq: false})).toMatchObject([
    ...MATRIX[0],
    ...MATRIX[1],
    ...MATRIX[2],
    ...MATRIX[3],
    ...MATRIX[4],
    ...MATRIX[5],
    ...MATRIX[6],
  ]);
  expect(Corcer.uniq([0, 0, 0, 0])).toMatchObject([0]);
  expect(corcer.has(1)).toBeTruthy();

  expect(corcer.crop(4, 2, 6, 4).test([[0, 0], [0, 0]])).toBeTruthy();
  expect(corcer.crop(4, 2, 6, 4).replaceTo(1, corcer).matrix).toMatchObject([
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ]);
});

test('Corcer.transpose', () => {
  expect(Corcer.transpose([[1, 1, 1], [1, 1, 1], [1]])).toMatchObject([
    [1, 1, 1],
    [1, 1],
    [1, 1],
  ]);
});

test('Corcer.flat', () => {
  expect(Corcer.flat([[1, 1, 1], [1, 1, 1], [1]], 0)).toMatchObject([
    [1, 1, 1],
    [1, 1, 1],
    [1, 0, 0],
  ]);
});
```
