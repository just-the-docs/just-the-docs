jsgit
=====

A command-line git client powered by js-git and node.js

## Install

```sh
> npm install -g jsgit
```

## Usage

```sh
> jsgit

  Usage: jsgit [options] [command]

  Commands:

    ls-remote <url>        List remote refs
    fetch <url>            Clone or fetch updates from remote
    log                    Show local history
    export <target>        Export tree at HEAD as real files to target
    help [cmd]             display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

> jsgit fetch

  Usage: jsgit-fetch [options] [--] <url> [<dir>]

  Options:

    -h, --help              output usage information
    --ref <branch/tag/ref>  checkout to specefic branch, tag, or ref
    --depth <num>           do a shallow clone with num commits deep
    -q                      Be quiet; don't show progress

```

## Examples

```sh
> jsgit fetch git://github.com/creationix/conquest.git
Cloning git://github.com/creationix/conquest.git to conquest.git..
Counting objects: 79, done.
Compressing objects: 100% (47/47), done.
Total 79 (delta 27), reused 78 (delta 26)
Receiving objects: 100% (79/79)   
Done.

> cd conquest.git/
> jsgit log --tree

commit 39a63c86fed320e06c84af7cf311c38f4395ff00
Author: Tim Caswell <tim@creationix.com>
Date:   Mon May 27 2013 23:00:53 GMT-0500 (CDT)

    Add circle icon for web store

 d18604c02d4df748cf06acb6abaf2064bd104296 /
 38f211d3325f524b74ef076c3569a57b92dbda57 /.gitignore
 461a5bdb83746a7e3f8449bc009574b92f6e6dd0 /README.markdown
 8a48e7ace978047bfff982a4e2aca2f502acaa71 /appinfo.json
 b3f8efa73bfac690b386a7f92c9d54eb6b40f359 /art/
 bfb6fa0366ea59ca843dc9d3844aaf7643263bb4 /art/blue-city.png
 be214fdaf6198c06a9e3466b0809aa000833677b /art/brown-city.png
 d617c591eb9ed1f54c3c2f05104a7892b724e7b7 /art/green-city.png
 b68f6e5ddf596b547e384cd835d41363878c7328 /art/orange-city.png
 95aa7ef53aed85e7a5ad01057b6c596b31a5a3c3 /art/purple-city.png
 cdb284aaf2b4cdc36c18bee25029fd0d1f8fffeb /art/red-city.png
 d06cb71c7089788493146cbd14b8abe87a14e48f /art/sprites.png
 66efaa250e2f00e4292958d268004e7b9e62ec72 /art/style.css
 18c9b8b91046d12cfe5fd781482fcb4ede51c472 /art/yellow-city.png
 8b017f72578016c876de8e95265af2657b6a400c /background.js
 28555e7055d7fa6184865bd3bab090621cf14cc5 /client.js
 ad157cf510e280ccfb7af63955c5a9eb5a4dfd53 /icons/
...
```

## Debugging

If something goes wrong, file an issue.  If the issue has to do with command-line option parsing, file it here, but it it's an issue with actual features (like a failed clone), file it against the main [js-git][] repo.

Please include what version of node you're using, what OS, and debug trace output by using the `TRACE=1` prefix.

```js
> TRACE=1 jsgit fetch git://github.com/creationix/conquest.git
```

[js-git]: https://github.com/creationix/js-git/issues
