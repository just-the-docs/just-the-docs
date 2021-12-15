![d3](http://i.imgur.com/CmObJtH.jpg)

# D3 Leaderboard API Wrapper

[![npm version](https://badge.fury.io/js/diablo-3-leaderboards.svg)](https://badge.fury.io/js/diablo-3-leaderboards)

## Requirements

Get an Access Token from Blizzard [https://dev.battle.net/io-docs](https://dev.battle.net/io-docs)

## Usage

Setup:

    var access_token = 'xxxxxxxxxxxxxxxxxxxxx';
    var locale = 'enUS';

    var D3 = require('d3-leaderboard');
    client = new D3(access_token, locale);

_locale is optional; defaults to enUS_

#### /seasons

This method takes no arguments and a callback function.

    client.seasons(function(error, body){});

#### /season/:id

**id** (required) - The season you are looking to return

    client.season({ id: 5 }, function(error, body){});

#### /season/:id/leaderboard/:leaderboard

**id** (required) - The season you are looking to return

**leaderboard** (required) - The leaderboard type (these can be found in the season/:id response)

    client.season_leaderboard(
      { id: 5, leaderboard: 'achievement-points' },
      function(error, body){
        // whatever
      }
    );

#### /eras

This method takes no arguments and a callback function.

    client.eras(function(error, body){});

#### /era/:id

**id** (required) - The era you are looking to return

    client.era({ id: 5 }, function(error, body){});

#### /era/:id/leaderboard/:leaderboard

**id** (required) - The era you are looking to return

**leaderboard** (required) - The leaderboard type (these can be found in the era/:id response)

    client.era_leaderboard(
      { id: 5, leaderboard: 'rift-barbarian' },
      function(error, body){
        // whatever
      }
    );

## Developers

Tests require an env-vars.js file in **/test** directory with access token field:

    module.exports = {
      'BLIZZARD_ACCESS_TOKEN': 'xxxxxxxxxxxxxxxxxxxxxxx'
    };

Run with `mocha` or `mocha debug test/ -R spec`

## Contributing

1. Fork it ( https://github.com/[my-github-username]/d3-leaderboard-node/fork )
1. Create your feature branch (git checkout -b my-new-feature)
1. Commit your changes (git commit -am 'Add some feature')
1. Push to the branch (git push origin my-new-feature)
1. Create a new Pull Request
