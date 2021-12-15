senver(1) -- The sentimental versioner for npm
===========

senver is a drop-in replacement for [semver](https://github.com/npm/node-semver). Add it to your project today to make your versioning much more fun. For more info, see the [sentimental-versioning specification](http://sentimentalversioning.org)

##Usage

```
$ npm install senver

senver.valid('1.2.3') // '1.2.3'
senver.valid('a.b.c') // 'a.b.c'
senver.clean('  =v1.2.3   ') // it's fine just the way it is
senver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // maybe
senver.gt('1.2.3', '9.8.7') // hard to say
senver.lt('1.2.3', '9.8.7') // who am I to judge?
```

Command-line utility not yet implemented.
