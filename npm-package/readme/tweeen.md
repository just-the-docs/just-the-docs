# Primitive tween function

Allows to «animate» number values with given duration

## Usage

```es6
import tween from 'tweeen';

const stop = tween(1, 100, (value) => {
  console.log(value);
}, {
  duration: 1000,
});
```

## Params

Signature of tween function

```ts
type TweenParams {
  duration?: number;
  easing?: (t: number) => number;
  fps?: number;
  end?: Function;
};

function tween(
  from: number,
  to: number,
  cb: (value: number) => void,
  params?: TweenParams,
);
```

### List of params

- `duration` — duration in ms, defaults to `300`
- `easing` — simple easing function that takes one argument — time (from 0 to 1). Defaults to `linear`. You can use functions from [eases](https://www.npmjs.com/package/eases) or similar package
- `fps` — defaults to `60`
- `end` — animation end callback
