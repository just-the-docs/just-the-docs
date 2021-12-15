# domify

Turn HTML into DOM elements x-browser.

## Usage

Works out of the box in the browser:

```js
var domify = require('domify');

document.addEventListener('DOMContentLoaded', function() {
  var el = domify('<p>Hello <em>there</em></p>');
  document.body.appendChild(el);
});
```

You can also run it in *node* and *iojs*. Just pass a custom implementation of `document`:

```js
var jsdom = require('jsdom').jsdom();

domify('<p>Hello <em>there</em></p>', jsdom.defaultView.document);
```

## Running tests

```
$ npm test
```

## License

MIT
