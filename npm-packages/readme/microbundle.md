<p>
  <img src="https://i.imgur.com/LMEgZMh.gif" width="597" alt="microbundle">
</p>
<h1>
	Microbundle
	<a href="https://www.npmjs.org/package/microbundle"><img src="https://img.shields.io/npm/v/microbundle.svg?style=flat" alt="npm"></a> <a href="https://travis-ci.org/developit/microbundle"><img src="https://travis-ci.org/developit/microbundle.svg?branch=master" alt="travis"></a>
</h1>
<p>The <strong>zero-configuration</strong> bundler for <em>tiny modules</em>, powered by <a href="https://github.com/rollup/rollup">Rollup</a>.</p>

---

<p>
  <strong>Guide → </strong>
  <a href="#setup">Setup</a> ✯
  <a href="#formats">Formats</a> ✯
  <a href="#modern">Modern Mode</a> ✯
  <a href="#usage">Usage &amp; Configuration</a> ✯
  <a href="#options">All Options</a>
</p>

---

## ✨ Features <a name="features"></a>

- **One dependency** to bundle your library using only a `package.json`
- Support for ESnext & async/await _(via [Babel] & [async-to-promises])_
- Produces tiny, optimized code for all inputs
- Supports multiple entry modules _(`cli.js` + `index.js`, etc)_
- Creates multiple output formats for each entry _(<abbr title="CommonJS (node)">CJS</abbr>, <abbr title="Universal Module Definition">UMD</abbr> & <abbr title="ECMAScript Modules">ESM</abbr>)_
- 0 configuration TypeScript support
- Built-in Terser compression & gzipped bundle size tracking

## 🔧 Installation & Setup <a name="setup"></a> <a name="installation"></a>

1️⃣ **Install** by running: `npm i -D microbundle`

2️⃣ **Set up** your `package.json`:

```jsonc
{
  "name": "foo",                      // your package name
  "type": "module",
  "source": "src/foo.js",             // your source code
  "exports": {
    "require": "./dist/foo.cjs",      // used for require() in Node 12+
    "default": "./dist/foo.modern.js" // where to generate the modern bundle (see below)
  },
  "main": "./dist/foo.cjs",           // where to generate the CommonJS bundle
  "module": "./dist/foo.module.js",   // where to generate the ESM bundle
  "unpkg": "./dist/foo.umd.js",       // where to generate the UMD bundle (also aliased as "umd:main")
  "scripts": {
    "build": "microbundle",           // compiles "source" to "main"/"module"/"unpkg"
    "dev": "microbundle watch"        // re-build when source files change
  }
}
```

3️⃣ **Try it out** by running `npm run build`.

## 💽 Output Formats <a name="formats"></a>

Microbundle produces <code title="ECMAScript Modules (import / export)">esm</code>, <code title="CommonJS (Node-style module.exports)">cjs</code>, <code title="Universal Module Definition (works everywhere)">umd</code> bundles with your code compiled to syntax that works pretty much everywhere.
While it's possible to customize the browser or Node versions you wish to support using a [browserslist configuration](https://github.com/browserslist/browserslist#browserslist-), the default setting is optimal and strongly recommended.

## 🤖 Modern Mode <a name="modern"></a>

In addition to the above formats, Microbundle also outputs a `modern` bundle specially designed to work in _all modern browsers_.
This bundle preserves most modern JS features when compiling your code, but ensures the result runs in 95% of web browsers without needing to be transpiled.
Specifically, it uses Babel's ["bugfixes" mode](https://babeljs.io/blog/2020/03/16/7.9.0#babelpreset-envs-bugfixes-option-11083httpsgithubcombabelbabelpull11083)
(previously known as [preset-modules](https://github.com/babel/preset-modules)) to target the set of browsers that support `<script type="module">` - that allows syntax like async/await, tagged templates, arrow functions, destructured and rest parameters, etc.
The result is generally smaller and faster to execute than the plain `esm` bundle.

Take the following source code for example:

```js
// Our source, "src/make-dom.js":
export default async function makeDom(tag, props, children) {
	let el = document.createElement(tag);
	el.append(...(await children));
	return Object.assign(el, props);
}
```

Compiling the above using Microbundle produces the following `modern` and `esm` bundles:

<table>
<thead><tr>
  <th align="left"><code>make-dom.modern.js</code> <sup>(117b)</sup></th>
  <th align="left"><code>make-dom.module.js</code> <sup>(194b)</sup></th>
</tr></thead>
<tbody><tr valign="top"><td>

```js
export default async function (e, t, a) {
	let n = document.createElement(e);
	n.append(...(await a));
	return Object.assign(n, t);
}
```

</td><td>

```js
export default function (e, t, r) {
	try {
		var n = document.createElement(e);
		return Promise.resolve(r).then(function (e) {
			return n.append.apply(n, e), Object.assign(n, t);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
```

</td></tbody></table>

**This is enabled by default.** All you have to do is add an `"exports"` field to your `package.json`:

```jsonc
{
	"main": "./dist/foo.umd.js", // legacy UMD output (for Node & CDN use)
	"module": "./dist/foo.module.js", // legacy ES Modules output (for bundlers)
	"exports": "./dist/foo.modern.js", // modern ES2017 output
	"scripts": {
		"build": "microbundle src/foo.js"
	}
}
```

The `"exports"` field can also be an object for packages with multiple entry modules:

```jsonc
{
	"name": "foo",
	"exports": {
		".": "./dist/foo.modern.js", // import "foo" (the default)
		"./lite": "./dist/lite.modern.js", // import "foo/lite"
		"./full": "./dist/full.modern.js" // import "foo/full"
	},
	"scripts": {
		"build": "microbundle src/*.js" // build foo.js, lite.js and full.js
	}
}
```

## 📦 Usage & Configuration <a name="usage"></a>

Microbundle includes two commands - `build` (the default) and `watch`.
Neither require any options, but you can tailor things to suit your needs a bit if you like.

- **`microbundle`** – bundles your code once and exits. (alias: `microbundle build`)
- **`microbundle watch`** – bundles your code, then re-bundles when files change.

> ℹ️ Microbundle automatically determines which dependencies to inline into bundles based on your `package.json`.
>
> Read more about [How Microbundle decides which dependencies to bundle](https://github.com/developit/microbundle/wiki/How-Microbundle-decides-which-dependencies-to-bundle), including some example configurations.

### Specifying filenames in package.json

Unless overridden via the command line, microbundle uses the `source` property in your `package.json` to determine which of your JavaScript files to start bundling from (your "entry module").
The filenames and paths for generated bundles in each format are defined by the `main`, `umd:main`, `module` and `exports` properties in your `package.json`.

```jsonc
{
  "source": "src/index.js",            // input
  "main": "dist/foo.js",               // CommonJS output bundle
  "umd:main": "dist/foo.umd.js",       // UMD output bundle
  "module": "dist/foo.m.js",           // ES Modules output bundle 
  "exports": {
    "require": "./dist/foo.js",        // CommonJS output bundle
    "default": "./dist/foo.modern.js", // Modern ES Modules output bundle
  },
  "types": "dist/foo.d.ts"             // TypeScript typings directory
}
```

When deciding which bundle to use, Node.js 12+ and webpack 5+ will prefer the `exports` property, while older Node.js releases use the `main` property, and other bundlers prefer the `module` field.
For more information about the meaning of the different properties, refer to the [Node.js documentation](https://nodejs.org/api/packages.html#packages_package_entry_points).

For UMD builds, microbundle will use a camelCase version of the `name` field in your `package.json` as export name.
Alternatively, this can be explicitly by adding an `"amdName"` key in your `package.json`, or passing the `--name` command line argument.

### Usage with `{"type":"module"}` in `package.json`

Node.js 12.16+ adds a new "ES Module package", which can be enabled by adding `{"type":"module"}` to your package.json.
This property [changes the default source type](https://nodejs.org/api/packages.html#packages_determining_module_system) of `.js` files to be ES Modules instead of CommonJS.
When using `{"type":"module"}`, the file extension for CommonJS bundles generated by Microbundle must be changed to `.cjs`:

```jsonc
{
  "type": "module",
  "module": "dist/foo.js",  // ES Module bundle
  "main": "dist/foo.cjs",   // CommonJS bundle
}
```

### Additional Configuration Options

Config also can be overridded by the [`publishConfig`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#publishconfig) property in your `package.json`.

```jsonc
{
  "main": "src/index.ts",          // this would be used in the dev environment (e.g. Jest)
  "publishConfig": {
    "source": "src/index.js",      // input
    "main": "dist/my-library.js",  // output
  },
  "scripts": {
    "build": "microbundle"
  }
}
```

### Building a single bundle with fixed output name

By default Microbundle outputs multiple bundles, one bundle per format. A single bundle with a fixed output name can be built like this:

```bash
microbundle -i lib/main.js -o dist/bundle.js --no-pkg-main -f umd
```

### Using with TypeScript

Just point the input to a `.ts` file through either the cli or the `source` key in your `package.json` and you’re done.

Microbundle will generally respect your TypeScript config defined in a `tsconfig.json` file with notable exceptions being the "[target](https://www.typescriptlang.org/tsconfig#target)" and "[module](https://www.typescriptlang.org/tsconfig#module)" settings. To ensure your TypeScript configuration matches the configuration that Microbundle uses internally it's strongly recommended that you set `"module": "ESNext"` and `"target": "ESNext"` in your `tsconfig.json`.

To ensure Microbundle does not process extraneous files, by default it only includes your entry point. If you want to include other files for compilation, such as ambient declarations, make sure to add either "[files](https://www.typescriptlang.org/tsconfig#files)" or "[include](https://www.typescriptlang.org/tsconfig#include)" into your `tsconfig.json`.

If you're using TypeScript with CSS Modules, you will want to set `"include": ["node_modules/microbundle/index.d.ts"]` in your `tsconfig.json` to tell TypeScript how to handle your CSS Module imports.

### CSS and CSS Modules

Importing CSS files is supported via `import "./foo.css"`. By default, generated CSS output is written to disk. The `--css inline` command line option will inline generated CSS into your bundles as a string, returning the CSS string from the import:

```js
// with the default external CSS:
import './foo.css'; // generates a minified .css file in the output directory

// with `microbundle --css inline`:
import css from './foo.css';
console.log(css); // the generated minified stylesheet
```

**CSS Modules:** CSS files with names ending in `.module.css` are treated as a [CSS Modules](https://github.com/css-modules/css-modules).
To instead treat imported `.css` files as modules, run Microbundle with `--css-modules true`. To disable CSS Modules for your project, pass `--no-css-modules` or `--css-modules false`.

The default scope name for CSS Modules is`_[name]__[local]__[hash:base64:5]` in watch mode, and `_[hash:base64:5]` for production builds.
This can be customized by passing the command line argument `--css-modules "[name]_[hash:base64:7]"`, using [these fields and naming conventions](https://github.com/webpack/loader-utils#interpolatename).

| flag  | import                         |   is css module?   |
| ----- | ------------------------------ | :----------------: |
| null  | import './my-file.css';        |        :x:         |
| null  | import './my-file.module.css'; | :white_check_mark: |
| false | import './my-file.css';        |        :x:         |
| false | import './my-file.module.css'; |        :x:         |
| true  | import './my-file.css';        | :white_check_mark: |
| true  | import './my-file.module.css'; | :white_check_mark: |

### Building Module Workers

Microbundle is able to detect and bundle Module Workers when generating bundles in the
`es`, `umd` and `modern` formats. To use this feature, instantiate your Web Worker as follows:

```js
worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
// or simply:
worker = new Worker('./worker.js', { type: 'module' });
```

... then add the `--workers` flag to your build command:

```bash
microbundle --workers
```

For more information see
[@surma/rollup-plugin-off-main-thread](https://github.com/surma/rollup-plugin-off-main-thread#config).

### Mangling Properties

To achieve the smallest possible bundle size, libraries often wish to rename internal object properties or class members to smaller names - transforming `this._internalIdValue` to `this._i`. Microbundle doesn't do this by default, however it can be enabled by creating a `mangle.json` file (or a `"mangle"` property in your package.json). Within that file, you can specify a regular expression pattern to control which properties should be mangled. For example: to mangle all property names beginning an underscore:

```jsonc
{
	"mangle": {
		"regex": "^_"
	}
}
```

It's also possible to configure repeatable short names for each mangled property, so that every build of your library has the same output. **See the wiki for a [complete guide to property mangling in Microbundle](https://github.com/developit/microbundle/wiki/mangle.json).**

### Defining build-time constants

The `--define` option can be used to inject or replace build-time constants when bundling. In addition to injecting string or number constants, prefixing the define name with `@` allows injecting JavaScript expressions.

| Build command                                | Source code            | Output                  |
| -------------------------------------------- | ---------------------- | ----------------------- |
| `microbundle --define VERSION=2`             | `console.log(VERSION)` | `console.log(2)`        |
| `microbundle --define API_KEY='abc123'`      | `console.log(API_KEY)` | `console.log("abc123")` |
| `microbundle --define @assign=Object.assign` | `assign(a, b)`         | `Object.assign(a, b)`   |

### All CLI Options <a name="options"></a>

```
Usage
	$ microbundle <command> [options]

Available Commands
	build    Build once and exit
	watch    Rebuilds on any change

For more info, run any command with the `--help` flag
	$ microbundle build --help
	$ microbundle watch --help

Options
	-v, --version      Displays current version
	-i, --entry        Entry module(s)
	-o, --output       Directory to place build files into
	-f, --format       Only build specified formats (any of modern,esm,cjs,umd or iife) (default modern,esm,cjs,umd)
	-w, --watch        Rebuilds on any change  (default false)
	--pkg-main         Outputs files analog to package.json main entries  (default true)
	--target           Specify your target environment (node or web)  (default web)
	--external         Specify external dependencies, or 'none' (default peerDependencies and dependencies in package.json)
	--globals          Specify globals dependencies, or 'none'
	--define           Replace constants with hard-coded values (use @key=exp to replace an expression)
	--alias            Map imports to different modules
	--compress         Compress output using Terser
	--strict           Enforce undefined global context and add "use strict"
	--name             Specify name exposed in UMD and IIFE builds
	--cwd              Use an alternative working directory  (default .)
	--sourcemap        Generate source map  (default true)
	--raw              Show raw byte size  (default false)
	--jsx              A custom JSX pragma like React.createElement (default: h)
	--jsxImportSource  Declares the module specifier to be used for importing jsx factory functions
	--tsconfig         Specify the path to a custom tsconfig.json
	--generateTypes    Whether or not to generate types, if `types` or `typings` is set in `package.json` then it will default to be `true`
	--css              Where to output CSS: "inline" or "external" (default: "external")
	--css-modules      Configures .css to be treated as modules (default: null)
	--workers          Bundle module workers - see https://git.io/J3oSF  (default false)
	-h, --help         Displays this message

Examples
	$ microbundle build --globals react=React,jquery=$
	$ microbundle build --define API_KEY=1234
	$ microbundle build --alias react=preact/compat
	$ microbundle watch --no-sourcemap # don't generate sourcemaps
	$ microbundle build --tsconfig tsconfig.build.json
```

## 🛣 Roadmap

Here's what's coming up for Microbundle:

- [ ] [Multiple separate inputs->outputs](https://github.com/developit/microbundle/issues/50)
- [x] [TypeScript support](https://github.com/developit/microbundle/issues/5)
- [x] [Flowtype support](https://github.com/developit/microbundle/issues/5#issuecomment-351075881)

## 🔨 Built with Microbundle

- [Preact](https://github.com/preactjs/preact) Fast 3kB React alternative with the same modern API. Components & Virtual DOM.
- [Stockroom](https://github.com/developit/stockroom) Offload your store management to a worker easily.
- [Microenvi](https://github.com/fwilkerson/microenvi) Bundle, serve, and hot reload with one command.
- [Theme UI](https://github.com/system-ui/theme-ui) Build consistent, themeable React apps based on constraint-based design principles.
- [react-recomponent](https://github.com/philipp-spiess/react-recomponent) Reason-style reducer components for React using ES6 classes.
- [brazilian-utils](https://github.com/brazilian-utils/brazilian-utils) Utils library for specific Brazilian businesses.
- [react-hooks-lib](https://github.com/beizhedenglong/react-hooks-lib) A set of reusable react hooks.
- [mdx-deck-live-code](https://github.com/JReinhold/mdx-deck-live-code) A library for [mdx-deck](https://github.com/jxnblk/mdx-deck) to do live React and JS coding directly in slides.
- [react-router-ext](https://github.com/ri7nz/react-router-ext) An Extended [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) with simple usage.
- [routex.js](https://github.com/alexhoma/routex.js) A dynamic routing library for Next.js.
- [hooked-form](https://github.com/JoviDeCroock/hooked-form) A lightweight form-management library for React.
- [goober](https://github.com/cristianbote/goober) Less than 1KB css-in-js alternative with a familiar API.
- [react-model](https://github.com/byte-fe/react-model) The next generation state management library for React
- [Teaful](https://github.com/teafuljs/teaful) Tiny, easy and powerful (P)React state management


## 🥂 License

[MIT](https://oss.ninja/mit/developit/)

[rollup]: https://github.com/rollup/rollup
[babel]: https://babeljs.io/
[async-to-promises]: https://github.com/rpetrich/babel-plugin-transform-async-to-promises
