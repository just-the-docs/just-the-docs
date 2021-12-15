# Osu Beatmap Parser, Difficulty and Performance Calculator

A soon to be full fledged system to allow parsing of beatmaps in .osu (or JSON built in), difficulty and performance calculations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 8.3.0+

### Installing

In your project add the dependency

```javascript
npm i osu-bpdpc
```

and require inside your javascript file

```javascript
const BPDPC = require('osu-bpdpc');
```

or for specific elements using selective require

```javascript
const {Beatmap} = require('osu-bpdpc');
```

### Example

```javascript
const {Beatmap, Osu: {DifficultyCalculator, PerformanceCalculator}} = require('osu-bpdpc')
const request = require('request-promise-native')

request.get('https://osu.ppy.sh/osu/1262832').then(osu => {
  let beatmap = Beatmap.fromOsu(osu)
  let score = {
    maxcombo: 476,
    count50: 0,
    count100: 3,
    count300: 337,
    countMiss: 0,
    countKatu: 2,
    countGeki: 71,
    perfect: 1,
    mods: 88,
    pp: 725.814
  }
  let diffCalc = DifficultyCalculator.use(beatmap).setMods(score.mods).calculate()
  let perfCalc = PerformanceCalculator.use(diffCalc).calculate(score)
  console.log(perfCalc.totalPerformance)
})
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
