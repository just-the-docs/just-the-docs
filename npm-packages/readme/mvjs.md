<h3>
  <img align="center" src="assets/mvjs_logo.png" alt="mvjs logo" width="120" />
</h3>

<p>
  Easily move files and directories around your JavaScript project.
</p>

# mvjs &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/fabiomcosta/mvjs/blob/master/LICENSE) [![npm version](https://badge.fury.io/js/%40fabiomcosta%2Fmvjs.svg)](https://badge.fury.io/js/%40fabiomcosta%2Fmvjs)

Easily move files and directories around your JavaScript project.

## The problem

Moving JavaScript modules inside a project is generally a tedious task.
After you move it using `mv`, you have to update their references on the
other modules inside your project.

`mvjs` moves the module and also updates all its references on the other modules
making the task of moving modules much simpler, similarly to using `mv`.

It does this by running a codemod on all JavaScript modules inside the project
(with the help of `jscodeshift`) and smartly updating `import` declarations and
`require` calls.

For non-js module files, a regular expression runs on their content, replacing
any string that looks like a path and matches any of the moved files will be
properly replaced. This gives extra piece of mind when moving `.scss` and other
file extensions that can potentially import one of the moved files.

## Features

* Supports and updates `import _ from '...'`, `import('...')` and `require('...')`
* Updates files using JavaScript, [TypeScript](https://www.typescriptlang.org/) or [Flow](https://flow.org/)
* Does its best to also update non-js files
* Moves files or directories
* Same api and simplicity of the `mv` command
* Shows easy to understand errors when unexpected things happen
* Uses `DEBUG` environment variable to show extra dbug information. Ex: `DEBUB=* mvjs ./a.js ./b.js`

## Install

```
npm install -g @fabiomcosta/mvjs
```

This makes `mvjs` available globally.

## CLI Usage

```text
$ mvjs --help
mvjs - moves a JavaScript module and updates all import references in the project.

Options:
  --version         Show version number                                                                        [boolean]
  --parser          jscodeshift's parser option.
                    See https://github.com/facebook/jscodeshift#parser                        [string] [default: "flow"]
  --ignore-pattern  Pattern of files that won't have their file references updated                              [string]
  --help            Show help                                                                                  [boolean]

Examples:
  cli.js ./a.js ./b.js                                          Moves "a.js" to "b.js" and updates the other modules
                                                                importing "a.js" to now import "b.js".
  cli.js --recast.quote='double' ./a.js ./b.js                  Recast options can be changed by using
                                                                --recast.optionName notation.
                                                                In this example the codemoded files are going to have
                                                                double quotes for all strings.
                                                                See https://github.com/benjamn/recast/blob/master/lib/op
                                                                tions.ts
  cli.js --ignore-pattern='*.d.ts'                              Ignore patterns with the familiar gitignore syntax
  --ignore-pattern='*.js.flow' ./a.js ./b.js                    defined at https://git-scm.com/docs/gitignore
                                                                Multiple patterns can be ignored by providing multiple
                                                                options.
```

## Example

Consider the following folder structure for a project:

```
root/
│   package.json
└── src/
    ├── common/
    │   └── config.js
    └── client/
        │   paths-client.js
        └── files-client.js
```

And the following file content for `./src/client/paths-client.js`:

```js
import files from './files-client';
// or const files = require('./files-client');
```

Let's move the `./src/client/files-client.js` module inside the `./src/common/` folder:

```
mvjs ./src/client/files-client.js ./src/common/files.js
```

This will make sure that all files that had a reference to this module are also
going to be properly updated, which means that `paths-client.js` will be updated to:

```js
import files from '../common/files';
// or const files = require('../common/files');
```

## API Usage

move (and ONLY move) modules:

```js
import {move} from '@fabiomcosta/mvjs';

(async () => {
  await move({
    sourcePaths: ['./foo.js', './bar.mjs'],
    targePath: './baz'
  });
})();
```

codemod the import statements from the current project modules:

```js
import {transform} from '@fabiomcosta/mvjs';

(async () => {
  await transform({
    sourcePaths: ['./foo.js', './bar.mjs'],
    targePath: './baz',
    parser: 'flow', // optional
    recastOptions: {quotes: 'single'} // optional
  });
})();
```

## TODO

- [x] move .jsx, .mjs, .es, .es6
- [x] move multiple sources to a directory
- [x] move a directory to another directory
- [x] move *any* file extension (keep updating the references only from .js, .jsx, .mjs, .es, .es6 files)
- [x] Update references on other types of files, like CSS, SASS, LESS etc.
- [ ] Optionaly rename imported default
- [ ] Add option to allow other function calls to be replaced
