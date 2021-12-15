# babel-install

![Travis badge](https://travis-ci.org/jameswomack/babel-install.svg?branch=master)


## Declare &amp; install Babel plugins &amp; transforms the easy way

`babel-install` is convenience for folks who are frequently trying out Babel plugins and presets. It installs and saves them to the appropriate place in your .babelrc and package.json file. It warns you when you're installing a module that has already been saved to your .babelrc. It also allows you to pass the module names using shorhand via CLI flags powered by yargs-parser. 

![Screengrabs](http://i.imgur.com/Fe0vzkd.gif)

### Getting started
From the command line
```sh
npm i babel-install -DE
```

If you haven't already, add this to your *~/.zshrc* or *~/.bashrc* and reload your shell. It allows your to run local Node bins as if they were globally installed.
```sh
export PATH=./node_modules/.bin:$PATH
```

#### CLI usage
```sh
babel-install babel-preset-es2015 babel-plugin-transform-async-to-generator babel-plugin-transform-es2015-arrow-functions
# or
babel-install --presets es2015 --plugins transform-async-to-generator transform-es2015-arrow-functions
```

...which results in

.babelrc
```json
{
  "presets": ["es2015"],
  "plugins": ["transform-es2015-arrow-functions", "transform-async-to-generator"]
}
```

package.json
```json
{
  "devDependencies": {
    "babel-preset-es2015": "{some latest version here}",
    "babel-plugin-transform-async-to-generator": "{some latest version here}",
    "babel-plugin-transform-es2015-arrow-functions": "{some latest version here}",
  }
}
```

There are several aliases installed to cover common typos
* `babel-isntall`
* `babelisntall`
* `babelinstall`

I didn't provide an even shorter command ala `bi` to prevent conflicts with other libraries. However, if you'd like a shorter command, [I recommend creating an alias](https://github.com/robbyrussell/oh-my-zsh/blob/master/plugins/common-aliases/common-aliases.plugin.zsh).

You can specify specific versions of Babel modules using both the full and short forms. E.g.
```
babel-install --plugins rewire@v1.0.0-beta-5
# is the same as
babel-install babel-plugin-rewire@v1.0.0-beta-5
```

#### Programmatic Usage
```js
import BabelInstaller from 'babel-install';
BabelInstaller().installAndDeclare(someArrayOfBabelPackageNames, function (installError) {
  return installError ? console.error(installError) : console.info('Install succeeded');
```

### Development

#### Install pre-commit hook
```
npm run install-precommit
```

#### Roadmap
* Evaluating adding a `--transforms` flag that's a special subset of `--plugins`
