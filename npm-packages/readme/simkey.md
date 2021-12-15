# simkey

A simple key event dispatcher.  Written primarily to help with testing
other modules that deal with key events.


[![NPM](https://nodei.co/npm/simkey.png)](https://nodei.co/npm/simkey/)


[![browser support](https://ci.testling.com/DamonOehlman/simkey.png)](https://ci.testling.com/DamonOehlman/simkey)



## Example Usage

```js
var simkey = require('simkey');
var input = document.createElement('input');

document.body.appendChild(input);

input.addEventListener('keydown', function(evt) {
  console.log('key down: ' + evt.keyCode);
});

input.addEventListener('keyup', function(evt) {
  console.log('key up: ', evt.keyCode);
});

// simulate a keypress on the document body
simkey(input, 65);

// simulate a number of keypress using simkey's partial application
[65, 68]
  .map(simkey(input))
  .map(simkey(input, { type: 'keyup' }));
```

## License(s)

### MIT

Copyright (c) 2015 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
