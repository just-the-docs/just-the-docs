RimWorld Save Editor
=======================

RimWorld save game editor, supports Windows/OSX/Linux

##Features

* Set colonist skill levels
* Set colonist equipped items (apparel and weapons) health and quality
* Set item and art health/quality
* Mortally wound enemy faction pawns
* Mortally wound friendly caravan animals
* Set factions to be at war/peace with the colony/all others

More to come..

##Install

* Download and install the latest [NodeJS]
* Clone the repo
* Follow the [Node Gyp setup guide]
* Run `npm install` from the repo base directory
* Follow the `Usage` instructions below to configure the options
* Run `node app.js`

##Usage:

###Config
Configurations are optional

| Name | Default | Description |
| ------------- | ------------- |  ------------- |
| saveName | `Colony1.rws` | The save file name you wish to edit |
| saveDir | | Directory of the save file, uses game default otherwise |
| modifiedNamePrefix | `Edited` | String to prefix new save with to prevent overwriting, you can set to an empty string (`''`) to overwrite the original save file (not recommended) |
| colonyFaction | `Faction_9` | Colony's faction name | 
| skillLevel | `20` | Skill level to set Colonists to |
| healthLevel | `1000` | Health to set items to |
| qualityLevel | `Legendary` | Quality to set items to | 
| woundHostilePawns | `true` | Incapacitates/kills enemy faction pawns except for Hive faction |
| caravanDisaster | `false` | Sets caravan animals to be a hostile faction, often results in relation penalty |
| upgradeArt | `true` | Upgrade all art pieces to be at designated health and quality |
| upgradePawnSkills | `true` | Set all colonist skills to 20 |
| upgradePawnEquipment | `true` | Upgrade all colony pawn equipment to be at designated health and quality |
| upgradePawnApparel | `true` | Upgrade all colony pawn apparel to be at designated health and quality |
| upgradeItems | `true` | Upgrade all items on ground to designated health and quality |
| setColonyPeace | `false` | Set colony to at peace with all factions |
| setColonyWar | `false` | Set colony to be at war with all factions |
| setWorldPeace | `false` | Set all factions to be at peace with each other |
| setWorldWar | `false` | Set all factions to be at war with each other |

Copy (or rename) the example [config] file in `/config/example.local.js` to `/config/local.js` and edit the settings `saveDir` and `saveName`

## License

The MIT License (MIT)

Copyright (c) 2016 Enzo Martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[config]:config/example.local.js
[Node Gyp setup guide]:https://github.com/TooTallNate/node-gyp#installation
[NodeJS]:https://nodejs.org/
