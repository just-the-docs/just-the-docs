node-csstats
==================

A result of procrastinating during a Master's thesis and nostalgic feelings.

Parse a AMX MOD X ```csstats.dat``` file to JS objects.

## Usage

```
var csstats = require('csstats');

csstats.parse('./path/to/csstats.dat', function (entityList) {
  console.log(entityList); // JS object with stats
  console.log(entityList[0].name); // Nick of the top player.
});
```

## Installation

```
npm install csstats
```