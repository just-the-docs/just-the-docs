# Angular File Saver

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> Angular File Saver is an AngularJS service that leverages
[FileSaver.js](https://github.com/eligrey/FileSaver.js/) and
[Blob.js](https://github.com/eligrey/Blob.js/) to implement the HTML5 W3C
saveAs() interface in browsers that do not natively support it

## Dependencies
- [Angular](https://github.com/angular/angular.js)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
- [Blob.js](https://github.com/eligrey/Blob.js/)

File `dist/angular-file-saver.bundle.js` contains all required dependencies and
grants access to both `Blob.js` and `FileSaver.js` polyfills via `Blob` and
`SaveAs` services.

## Installation

```sh
# Using bower:
$ bower install angular-file-saver

# Using npm:
$ npm install angular-file-saver
```

## Basic usage
- Include `ngFileSaver` module into your project;
- Pass both `FileSaver` and `Blob` services as dependencies;
- Create a [Blob object](https://developer.mozilla.org/en/docs/Web/API/Blob) by
passing an array with data as the first argument and an object with set of options
as the second one: `new Blob(['text'], { type: 'text/plain;charset=utf-8' })`;
- Invoke `FileSaver.saveAs` with the following arguments:
  - `data` **Blob**: a Blob instance;
  - `filename` **String**: a custom filename (an extension is optional);
  - `disableAutoBOM` **Boolean**: (optional) Disable automatically provided Unicode text encoding hints;

[Demo](http://alferov.github.io/angular-file-saver/#demo)

## API
### `FileSaver`
A core Angular factory.
#### `#saveAs(data, filename[, disableAutoBOM])`
Immediately starts saving a file

#### Parameters
- **Blob** `data`: a Blob instance;
- **String** `filename`: a custom filename (an extension is optional);
- **Boolean** `disableAutoBOM` : (optional) Disable automatically provided Unicode text encoding hints;

### `Blob(blobParts[, options]))`
An Angular factory that returns a [Blob instance](https://developer.mozilla.org/en/docs/Web/API/Blob).

### `SaveAs(data, filename[, disableAutoBOM])`
An Angular factory that returns a [FileSaver.js polyfill](https://github.com/eligrey/FileSaver.js/#syntax).

## Example
**JS**
```js
function ExampleCtrl(FileSaver, Blob) {
  var vm = this;

  vm.val = {
    text: 'Hey ho lets go!'
  };

  vm.download = function(text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(data, 'text.txt');
  };
}

angular
  .module('fileSaverExample', ['ngFileSaver'])
  .controller('ExampleCtrl', ['FileSaver', 'Blob', ExampleCtrl]);
```

**HTML**
```html
<div class="wrapper" ng-controller="ExampleCtrl as vm">
  <textarea
    ng-model="vm.val.text"
    name="textarea" rows="5" cols="20">
      Hey ho let's go!
  </textarea>
  <a href="" class="btn btn-dark btn-small" ng-click="vm.download(vm.val.text)">
    Download
  </a>
</div>
```

## License
MIT © [Philipp Alferov](https://github.com/alferov)

[npm-url]: https://npmjs.org/package/angular-file-saver
[npm-image]: https://img.shields.io/npm/v/angular-file-saver.svg?style=flat-square

[travis-url]: https://travis-ci.org/alferov/angular-file-saver
[travis-image]: https://img.shields.io/travis/alferov/angular-file-saver.svg?style=flat-square

[depstat-url]: https://david-dm.org/alferov/angular-file-saver
[depstat-image]: https://david-dm.org/alferov/angular-file-saver.svg?style=flat-square
