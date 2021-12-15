# Pokémon Damage Calculator

![Test Status](https://github.com/smogon/damage-calc/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/@smogon/calc.svg)](https://www.npmjs.com/package/@smogon/calc)&nbsp;

Damage calculator for all generations of Pokémon battling.

If you are currently looking at [smogon/damage-calc][0] and not
a fork, this is the official repository for the Pokémon Showdown! damage calculator:
https://calc.pokemonshowdown.com.

This repository houses both the package implementing the core damage formula mechanics in each
generation ([`@smogon/calc`][1]) as well as [logic and markup for the official UI][2].

## `@smogon/calc`

The `@smogon/calc` package powers the UI, providing a programmatic interface for computing damage
ranges. This subpackage contains code that will run on both the server or browser and can be used
as a building block for alternative UIs or applications.

### Installation

```sh
$ npm install @smogon/calc
```

Alternatively, as [detailed below](#browser), if you are using `@smogon/calc` in the browser and want
a convenient way to get started, simply depend on a transpiled and minified version via [unpkg][5]:

```html
<script src="https://unpkg.com/@smogon/calc/dist/data/production.min.js"></script>
<script src="https://unpkg.com/@smogon/calc"></script>
```

*In this example, the `@smogon/calc/data` code is included as well to fulfill the calc's data
layer requirement. Alternatively, a more fully-featured data layer such as [`@pkmn/data`][9] may
be used instead, see below.*

### Usage

`@smogon/calc` exports all of the data types required to perform a calculation. The `calculate`
methods require:

- a `Generation` that contains information about which damage formula mechanics to apply and where
  all of the data about the generation can be found.
- attacker and defender `Pokemon` (note: only relevant attributes are required, everything else
  should have sensible defaults). The `Pokemon` constructor also requires a `Generation` to provide
  the Pokémon's data for the generation.
- the `Move` being used by the attacker (which also requires a `Generation` argument to scope the
  move data to the particular generation).
- (optionally) a `Field` object containing information about the state of each `Side`.

`calculate` returns a `Result` object that contains methods for fetching damage rolls, ranges,
descriptions, recoil/drain information, etc.

```ts
import {calculate, Generations, Pokemon, Move} from '@smogon/calc';

const gen = Generations.get(5); // alternatively: const gen = 5;
const result = calculate(
  gen,
  new Pokemon(gen, 'Gengar', {
    item: 'Choice Specs',
    nature: 'Timid',
    evs: {spa: 252},
    boosts: {spa: 1},
  }),
  new Pokemon(gen, 'Chansey', {
    item: 'Eviolite',
    nature: 'Calm',
    evs: {hp: 252, spd: 252},
  }),
  new Move(gen, 'Focus Blast')
);
```

`@smogon/calc` comes packaged with all of the data required for damage calculation - by default, it
exposes this via its `Generations` object from `@smogon/calc/data`. As a shortcut, the `Generation`
argument required by `calculate`, `Pokemon`, `Move` can instead simply be the generation *number*
(eg. `5`), and it will handle getting that generations `Generation` object behind the scenes from
the data layer it ships with.

**The data in `calc/data` must be kept in sync with Pokémon Showdown. If there is an issue with the
calc's data, please fix it in the simulator first.** In general, you should probably not be
making manual edits to any of the data files, and in the future, they are likely to be generated
programmatically.

In some advanced use cases, you may wish to use a different data layer with the calculator. The
`@smogon/calc/adaptable` entry point can be used with any data layer that implements the calc's
`Generations` interface. This interface is a subset of [`@pkmn/data`][9]'s `Generations` interface,
so `@pkmn/data` (which contains all competitively relevant data from Pokémon Showdown) can be used
with the adaptable entry point for applications which want to avoid having two separate sets of the
same data shipped to users.

```ts
import {Generations} from '@pkmn/data';
import {calculate, Pokemon, Move, Field} from '@smogon/calc/adaptable';

const gen = Generations.get(1);
const result = calculate(
  new Pokemon(gen, 'Gengar'),
  new Pokemon(gen. 'Vulpix'),
  new Move(gen, 'Surf'),
  new Field({defenderSide: {isLightScreen: true}})
);
```

### Browser

The recommended way of using `@smogon/calc` in a web browser is to **configure your bundler**
([Webpack][6], [Rollup][7], [Parcel][8], etc) to minimize it and package it with the rest of your
application. If you do not use a bundler, a convenience `production.min.js` is included in the
package. You simply need to depend on `./node_modules/@smogon/calc/production.min.js` in a `script`
tag (which is what the unpkg shortcut above is doing), after which **`calc` will be
accessible as a global.** You must also have a `Generations` implementation provided, you can either
depend on the calculator's data layer by depending on
`./node_modules/@smogon/calc/data/production.min.js` (or `@smogon/calc/data` via unpkg), or you can
use an alternative data layer such as [`@pkmn/data`][9]. You must load your data layer
**before** loading the calc:

```html
<script src="./node_modules/@smogon/calc/data/production.min.js"></script>
<script src="./node_modules/@smogon/calc/production.min.js"></script>
```

## UI

The [UI layer][2] is currently is written in vanilla JavaScript and HTML. To view the UI locally you
first must install dependencies by running `npm install` at the top level and without `calc/`. This
should create a `node_modules/` folder under both the root directory and under `calc/`:

```sh
$ npm install
$ cd calc && npm install
```

Next, run `node build` from the root directory of your clone of this repository. This should
run `npm run compile` in the `calc/` subdirectory to compile the `@smogon/calc` package from
TypeScript to JavaScript that can be run in the browser, and then compile the 'templated' HTML
and copy everything into the top-level `dist/` folder. To then view the UI, open `dist/index.html` -
simply double-clicking on the file from your operating system's file manager UI should open it in
your default browser.

```sh
$ node build
$ open dist/index.html # open works on macOS, simply double-clicking the file on Windows/macOS works
```

**If you make changes to anything in `calc/`, you must run `node build` from the top level to
compile the files and copy them into `dist/` again. If you make changes to the HTML or JavaScript in
`src/`you must run `node build view` before the changes will become visible in your browser**
(`node build` also works, but it is slower, as it will compile `calc/` as well, which is
unnecessary if you did not make any changes to that directory).

Before opening up a Pull Request, please ensure `npm test` passes:

```sh
$ npm test
```

### Import

This repository also houses an internal package under `import/` which is used for populating the
Pokémon sets data (as well as data about random battle options) used by the UI. Before making
changes here you must run `npm install` from under the `import/` directory to install its
dependencies as they are not installed by default. [`TASKS.md`][4] contains more information on
how to programmatically update sets.

## Credits

This project was created by Honko and is primarily maintained by Austin.

- Gens 1-6 were originally implemented by Honko.
- The Omega Ruby / Alpha Sapphire update was done by gamut-was-taken and Austin.
- The Gen 7 update was done by Austin.
- The Gen 8 update was done by Austin and Kris.
- Some CSS styling was contributed by Zarel to match the Pokémon Showdown! theme.

Many other contributors have added features or contributed bug fixes, please see the
[full list of contributors](https://github.com/smogon/damage-calc/graphs/contributors).

## License

This package is distributed under the terms of the [MIT License][3].

  [0]: https://github.com/smogon/damage-calc
  [1]: https://github.com/smogon/damage-calc/tree/master/calc
  [2]: https://github.com/smogon/damage-calc/tree/master/src
  [3]: https://github.com/smogon/damage-calc/blob/master/LICENSE
  [4]: https://github.com/smogon/damage-calc/blob/master/TASKS.md
  [5]: https://unpkg.com/
  [6]: https://webpack.js.org/
  [7]: https://rollupjs.org/
  [8]: https://parceljs.org/
  [9]: https://github.com/pkmn/ps/blob/master/data
