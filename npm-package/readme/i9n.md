i9n
===

i9n, aka i18nization, is a library that allows one to ruin text by replacing all
internal characters with a number denoting how many characters were replaced.

As an example, the above paragraph has been i9n'd:

i1n, a1a i9n, i0s a-1a l5y t2t a4s o1e t0o r2n t2t b0y r7g a1l
i6l c8s w2h a-1a n4r d6g h1w m2y c8s w2e r6d.

Which is obviously much more readable, as it saves you time from having to read
all of those pesky middle characters.

usage
-----

Simply require i9n and you're ready to ruin some text. Literally:

```js
const i9n = require('i9n');

let ruinedText = i9n.ruin('this text is far too slow to read and write.');

console.log(ruinedText);
// t2s t2t i0s f1r t1o s2w t0o r2d a1d w3e.
```

If you only want to see one word that has been made more efficient, you can use
the i9n function by itself:

```js
const i9n = require('i9n');

console.log(i9n.i9n('internationalization'));
// i18n
```

Go have some fun! Err, rather, G0o h2e s2e f1n!
