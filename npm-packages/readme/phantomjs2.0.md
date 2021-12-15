An NPM wrapper for [PhantomJS](http://phantomjs.org/) *version 2*, headless webkit with JS API.

NOTE: phantomjs v2.x is currently under heavy development.   Releases should be considered unstable.

This is a fork from [zeevl/phantomjs2](https://github.com/zeevl/phantomjs2) which beautifully installs phantomjs2 v2.0.0 on OSX.


Building and Installing
-----------------------

```shell
npm install phantomjs2.0
```

Or grab the source and

```shell
node ./install.js
```

**\*\*\*Note to Ubuntu users:**

You will need to install the following packages:

```shell
Ubuntu 14.04:
sudo apt-get install libicu52 libjpeg8 libfontconfig libwebp5

Ubuntu 15.04:
sudo apt-get install libicu52 libjpeg8 libfontconfig1 libwebp5 libssl1.0.0
```

The package has been set up to fetch and run PhantomJS using the pre-built binaries.

Thanks goes out to [Gary Zhu](https://github.com/sproffer) for providing the [CentOS7 binary](http://garyzhu.net/notes/phantomjs-centos7.tar) and [bprodoehl](https://github.com/bprodoehl/phantomjs/releases) for the [Ubuntu and OSX binaries](https://github.com/bprodoehl/phantomjs/releases).

Running
-------

```shell
bin/phantomjs [phantom arguments]
```

And npm will install a link to the binary in `node_modules/.bin` as
it is wont to do.

Running via node
----------------

The package exports a `path` string that contains the path to the
phantomjs binary/executable.

Below is an example of using this package via node.

```javascript
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

var childArgs = [
  path.join(__dirname, 'phantomjs-script.js'),
  'some other argument (passed to phantomjs script)'
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  // handle results
})

```

Versioning
----------

The major and minor number tracks the version of PhantomJS that will be
installed. The patch number is incremented when there is either an installer
update or a patch build of the phantom binary.

A Note on PhantomJS
-------------------

PhantomJS is not a library for NodeJS.  It's a separate environment and code
written for node is unlikely to be compatible.  In particular PhantomJS does
not expose a Common JS package loader.

This is an _NPM wrapper_ and can be used to conveniently make Phantom available
It is not a Node JS wrapper.

I have had reasonable experiences writing standalone Phantom scripts which I
then drive from within a node program by spawning phantom in a child process.

Read the PhantomJS FAQ for more details: http://phantomjs.org/faq.html


Troubleshooting
---------------

##### Installation fails with `Error: read ECONNRESET` or `Error: connect ETIMEDOUT`

This error means that something went wront with your internet connection, and the installer
was not able to download the PhantomJS binary for your platform. Please try again.

##### I tried again, but I get `ECONNRESET` or `ETIMEDOUT` consistently.

Do you live in China, or a country with an authoritarian government? We've seen problems where
the GFW or local ISP blocks bitbucket, preventing the installer from downloading the binary.

Try visiting the [the download page](http://cdn.bitbucket.org/ariya/phantomjs/downloads) manually.
If that page is blocked, you can try using a different CDN with the `PHANTOMJS_CDNURL`
env variable described above.

##### I am behind a corporate proxy that uses self-signed SSL certificates to intercept encrypted traffic.

You can tell NPM and the PhantomJS installer to skip validation of ssl keys with NPM's
[strict-ssl](https://www.npmjs.org/doc/misc/npm-config.html#strict-ssl) setting:

```
npm set strict-ssl false
```

WARNING: Turning off `strict-ssl` leaves you vulnerable to attackers reading
your encrypted traffic, so run this at your own risk!

##### I tried everything, but my network is b0rked. What do I do?

If you install PhantomJS manually, and put it on PATH, the installer will try to
use the manually-installed binaries.


Contributing
------------

Questions, comments, bug reports, and pull requests are all welcome.  Submit them at
[the project on GitHub](https://github.com/laughingman/phantomjs2.0/).

Bug reports that include steps-to-reproduce (including code) are the
best. Even better, make them in the form of pull requests.

Authors (original)
------------------

[Dan Pupius](https://github.com/dpup)
([personal website](http://pupius.co.uk)), supported by
[The Obvious Corporation](http://obvious.com/).

Originally ported to phantomjs2 by [zeevl](https://github.com/zeevl)

License
-------

Copyright 2012 [The Obvious Corporation](http://obvious.com/).

Licensed under the Apache License, Version 2.0.
See the top-level file `LICENSE.txt` and
(http://www.apache.org/licenses/LICENSE-2.0).
