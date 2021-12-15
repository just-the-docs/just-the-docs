## torrent-indexer [![Test](https://github.com/sayem314/torrent-indexer/workflows/Test/badge.svg)](https://github.com/sayem314/torrent-indexer/actions) [![npm downloads per month](https://img.shields.io/npm/dm/torrent-indexer.svg)](https://www.npmjs.com/package/torrent-indexer) [![npm version](https://img.shields.io/npm/v/torrent-indexer?label=version)](https://www.npmjs.com/package/torrent-indexer)

Finds the best torrents (Movies, Series, Anime, Music and Other stuff) across multiple sources.

## Installation

```bash
$ yarn add torrent-indexer
```

## Usage

Here's a simple example to search for torrents.

```js
const TorrentIndexer = require("torrent-indexer");
const torrentIndexer = new TorrentIndexer();

const torrents = await torrentIndexer.search("rick and morty s04e04");

console.log(results);

/*
[
  {
    fileName: 'Rick.and.Morty.S04E01.1080p.WEBRip.x264-TBS[TGx]',
    seeders: 7900,
    leechers: 3198,
    uploaded: "Nov. 11th '19",
    size: '736.0 MB',
    site: 'https://...',
    resolution: '1080p',
    source: 'webrip',
    codec: 'x264',
    group: 'TBS[TGx]',
    season: 4,
    episode: 1,
    score: 24.281,
    title: 'Rick and Morty',
    sourceName: '1337x'
  },
  {
    fileName: 'Rick and Morty S04E01 720p HDTV x264-W4F [eztv]',
    seeders: 170,
    leechers: 0,
    uploaded: '4 mo',
    size: '500.68 MB',
    link: 'magnet:?xt=urn:btih:...',
    resolution: '720p',
    source: 'hdtv',
    codec: 'x264',
    season: 4,
    episode: 1,
    score: 23.357,
    title: 'Rick and Morty',
    sourceName: 'Eztv'
  },
  ...
]
*/
```

Search method returns array of objects:

| Property   |   Type   | Optional |                                                                                                                                        Description |
| ---------- | :------: | -------: | -------------------------------------------------------------------------------------------------------------------------------------------------: |
| `fileName` | `string` |       No |                                                                          torrent name found in the scraped sites, might be stripped for some sites |
| `seeders`  | `number` |       No |                                                                                                                            total amount of seeders |
| `leechers` | `number` |       No |                                                                                                                        total leechers (0 for eztv) |
| `uploaded` | `string` |       No |                                                                                                             upload dates, non standard date format |
| `link`     | `string` |   Yes/No |                                                                                         contains either downloadable torrent url or magnet address |
| `site`     | `string` |   Yes/No | if magnet or direct link of .torrent cannot be extracted this property will contain specific page address to extract using `.torrent(site)` method |

- One of `link` or `site` will be available. Site value contains webpage address to retrive torrent magnet or hash using `.torrent(.site)` method while link contains either direct downloadable torrent link or magnet.

- There are also optional additional specific property available for specially for media contents.

| Property     |   Type   |          Example |
| ------------ | :------: | ---------------: |
| `resolution` | `string` |          `1080p` |
| `source`     | `string` |         `bluray` |
| `codec`      | `string` |           `x264` |
| `group`      | `string` |          `RARBG` |
| `season`     | `number` |              `4` |
| `episode`    | `number` |              `1` |
| `title`      | `string` | `Rick and Morty` |
| `sourceName` | `string` |          `1337x` |

## Methods

### `.search(query, type, page);`

| Parameters | Required |     Type |               Accepted Values |
| ---------- | :------: | -------: | ----------------------------: |
| `query`    |   Yes    | `string` |   anything, your search query |
| `type`     |    No    | `string` | movie, series, music or anime |
| `page`     |    No    | `number` |                          >= 1 |

### `.torrent(url)`

| Parameters | Required |                                                                     Description |
| ---------- | :------: | ------------------------------------------------------------------------------: |
| `url`      |   Yes    | Using this method you can retrieve magnet or torrent hash from `.site` property |

Example:

```js
await torrentIndexer.torrent(torrents.site);
```

### Donations

If you want to show your appreciation, you can donate me on [ko-fi](https://ko-fi.com/Z8Z5KDA6) or [buy me a coffee](https://www.buymeacoffee.com/sayem). Thanks!

> Made with :heart: & :coffee: by Sayem
