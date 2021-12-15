# Teamcraft simulator
[![CircleCI](https://circleci.com/gh/ffxiv-teamcraft/simulator.svg?style=svg)](https://circleci.com/gh/ffxiv-teamcraft/simulator)
[![codecov](https://codecov.io/gh/ffxiv-teamcraft/simulator/branch/master/graph/badge.svg)](https://codecov.io/gh/ffxiv-teamcraft/simulator)
[![npm version](https://badge.fury.io/js/@ffxiv-teamcraft/simulator.svg)](https://www.npmjs.com/package/@ffxiv-teamcraft/simulator)
[![GitHub issues](https://img.shields.io/github/issues/ffxiv-teamcraft/simulator.svg)](https://github.com/ffxiv-teamcraft/simulator/issues)
[![GitHub stars](https://img.shields.io/github/stars/ffxiv-teamcraft/simulator.svg)](https://github.com/ffxiv-teamcraft/simulator/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ffxiv-teamcraft/simulator/master/LICENSE)

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

Teamcraft simulator is a simulation library for FINAL FANTASY XIV.

## Installation

Install through npm:
```bash 
npm install --save @ffxiv-teamcraft/simulator
```

## Get started

```ts
const simulation = new Simulation(recipe, [new RapidSynthesis(), new RapidSynthesis()], crafterStats);
const result = simulation.run();
const reliabilityReport = simulation.getReliabilityReport();
```

## Documentation

Everything is detailed on the [documentation website](https://ffxiv-teamcraft.github.io/simulator/).


## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM
* Install local dev dependencies: `npm install` while current directory is this repo

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
