# gitlab-ci-lint



Gitlab-ci cli to lint .gitlab-ci.yml files

## Usage

### Install
```Shell
npm install -g gitlab-ci-lint
```

### CLI
```
  Usage: gitlab-ci-lint [options] <file>

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -u, --url [URL]       Use alternative Gitlab URL
    -t, --token [TOKEN]   Provide Gitlab personal access token, when it's needed
```

#### examples
* `.gitlab-ci.yml` is in the current directory
```
gitlab-ci-lint
```

* Alternative file
```
gitlab-ci-lint <filename>
```

* Alternative Gitlab URL
```
gitlab-ci-lint --url https://git.my.corp
```

* With Gitlab personal access token
```
gitlab-ci-lint --token token-string-here123
```

### API
* with `filename` param
```
const gitlabCILint = require('gitlab-ci-lint')

gitlabCILint.lintFile('.gitlab-ci.yml')
  .then((result) => console.log(result))
```
* with `filename`, `baseURL` and `token` params, accordingly
```
const gitlabCILint = require('gitlab-ci-lint')

gitlabCILint.lintFile('.gitlab-ci.yml', 'https://git.my.corp', 'token-string-here123')
  .then((result) => console.log(result))
```
