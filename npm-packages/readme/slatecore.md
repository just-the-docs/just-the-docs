# Slate Core

This repository is part of the _Slate Framework_. _Slate_ is a responsive, modern web framework written in Sass. It is packed full of features to help you build the most awesome things for the web. This is _Slate Core_, the heart and soul of the framework. This is meant to be used in your own asset pipeline, along with [Slate Config](https://github.com/HashandSalt/slateconfig).

### Quick Start

Assuming you have an existing project with an asset pipeline (Gulp, Grunt, Ruby, Laravel, .Net Core etc):

```sh
$ cd your/project/folder
$ yarn add slatecore -D
```
Include Slate in your project:

```
@import 'slate';
```
However, this will leave you stuck at the default settings. You should take [Slate Config](https://github.com/HashandSalt/slateconfig) from its [repo](https://github.com/HashandSalt/slateconfig) and import that instead. It includes Slate as well as the configs.

```
@import 'slate/slate-engine';
```
### Don't have an asset pipeline?

If you need a way to compile your project, we have that covered too. _Slate Engine_ is a build tool based on Laravel Mix, NPM scripts, and bash. It also has Slate ready wired up, and ready to rock. You can get this [here](https://github.com/HashandSalt/slateengine).

For full documentation, visit www.slateengine.com.

_Slate_ was made with ♥ by [Hash&Salt](https://www.hashandsalt.com).
