# CSS COLORGUARD CHANGELOG

## 2016-04-30 - 1.2.0

- Added `allowEquivalentNotation` option

## 2016-03-15 - 1.1.1

- Upgraded pipetteur to `2.0.0` (thanks to @davidtheclark)

## 2016-03-11 - 1.1.0

- Added `firstColor` & `secondColor` to generated warnings, enabling easier
  warning consumption (thanks to @davidtheclark)

## 2015-09-23 - 1.0.1

- Added a CHANGELOG per PostCSS guidelines for plugins
- Switched the license to MIT, since npm didn't like Apache 2.0 as a license field

## 2015-09-23 - 1.0.0

- Switched to PostCSS from reworkcss
- Changed the output format to use postcss notification api
- Exposes self as a postcss plugin
- `inspect` is now `process` in order to match PostCSS style
- Test suite changed to @substack's tape
- Supports sourcemap inputs via PostCSS api
