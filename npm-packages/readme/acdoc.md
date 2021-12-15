# ACdoc

`ACdoc`, or Accountibility Document Block, is a simple tool designed to be tied to a git pre commit hook to automatically update some information about the files you have added to the git commit. `ACdoc` can also be ran in any git folder or sub-folder and manualy invoke the same results. This is all designed to give teams and organizations better accountibility over their code. By keeping some simple fields up to date in a docblock at the top of all your code files, you will gain an important view over every bit of work done.

the ACdoc docblock looks someting like this:
```
/*
* Created by: 			Ryan Flynn
* Created Date: 		Wed, 04 Apr 2018 03:49:43 GMT
* Date last edited:		Wed, 04 Apr 2018 04:25:12 GMT
* Edited last by:		Ryan Flynn
* Contributors: 		Ryan Flynn, Adam Link
*/
```
It would be best to tie this into your IDE or code generators to keep formatting consistant, but will have no issues filling in the data so long as the keys exist. `ACdoc` will find these keys and keep contributors, edited last by, and date last edited up to date.

`ACdoc` supports both editing existinc AC Blocks, and also creating AC Blocks if the file doesnt already have it.
It is worth nothing, `ACdoc` will consider the person running `ACdoc` the creator of the file. This should be fine in most cases.

### Install
```
npm install -g acdoc
```
or
```
yarn global add acdoc
```

### CLI Usage

`ACdoc` requires no arguments, just run it and go. It automatically looks at `git` staged files and only makes changes to files known to be compatible with `ACdoc`. Right now the script looks for JS, JSX, Python, and SH files.

### Pre-Commit Usage

Want to run this as a pre-commit hook? Are you using Node.JS? (It's safe to say you are) Here is a quick rundown on getting started with `ACdoc` and pre-commit hooks.


```
npm install --save-dev acdoc pre-commit
```
or
```
yarn add -D acdoc pre-commit
```

Then modify in and around the scripts object in `package.json`
```
...
	"scripts": {
	  ...
	  "acdoc": "node ./node_modules/acdoc/bin/acdoc.js"
	},
	"pre-commit": [
	  "acdoc"
	],
...
```

More information about `pre-commit` can be found at [NPMJS: Pre-Commit](https://www.npmjs.com/package/pre-commit)
