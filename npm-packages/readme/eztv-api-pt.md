# eztv-api-pt

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][dev-david-image]][dev-david-url]

[travis-url]: https://travis-ci.org/ChrisAlderson/eztv-api-pt
[travis-image]: https://travis-ci.org/ChrisAlderson/eztv-api-pt.svg?branch=master
[coverage-url]: https://coveralls.io/github/ChrisAlderson/eztv-api-pt?branch=master
[coverage-image]: https://coveralls.io/repos/github/ChrisAlderson/eztv-api-pt/badge.svg?branch=master
[david-url]: https://david-dm.org/ChrisAlderson/eztv-api-pt
[david-image]: https://david-dm.org/ChrisAlderson/eztv-api-pt.svg
[dev-david-url]: https://david-dm.org/ChrisAlderson/eztv-api-pt?type=dev
[dev-david-image]: https://david-dm.org/ChrisAlderson/eztv-api-pt/dev-status.svg

An EZTV API wrapper to get data from [eztv.ag](https://eztv.ag/).

## Usage

#### Setup

```
npm install --save eztv-api-pt
```

#### Initialize

```js
const EztvApi = require('eztv-api-pt')

// Create a new instance of the module.
const eztv = new EztvApi({
  baseUrl // The base url of eztv. Defaults to 'https://eztv.ag/'.
})
```

#### Example usage

##### Scraper

To use the web scraper you can use this workflow:

```js
// Get all available shows on eztv.
eztv.getAllShows().then(res => {
  const [ data ] = res
  console.log(data)

  // Get data including latest episodes from eztv.
  return eztv.getShowData(data)

  // Or get all episodes from eztv.
  // return eztv.getShowEpisodes(data)
}).then(res => console.log(res))
  .catch(err => console.error(err))
```

##### API

To use the API of EZTV you can use this method:

```js
// Use the API of EZTV.
eztv.getTorrents({
  page: 1,
  limit: 10, // 10 - 100
  imdb: 5016504 // tt5016503
}).then(res => console.log(res))
  .catch(err => console.error(err))
```

Documentation on the API can be found [here](https://eztv.ag/api/).

## Output

#### getAllShows

```js
[{
    show: '10 O\'Clock Live',
    id: 449,
    slug: '10-o-clock-live'
  }, {
    show: '10 Things I Hate About You',
    id: 308,
    slug: '10-things-i-hate-about-you'
  },
  ...
}]
```

#### getShowData / getShowEpisodes

```js
{ show: '10 O\'Clock Live',
  id: 449,
  slug: 'tt1811399',
  episodes:
   { '1':
      { '1':
         { '480p':
            { url: 'magnet:?xt=urn:btih:LMJXHHNOW33Z3YGXJLCTJZ23WK2D6VO4&dn=10.OClock.Live.S01E01.WS.PDTV.XviD-PVR&tr=udp://tracker.openbittorrent.com:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://exodus.desync.com:6969',
              seeds: 0,
              peers: 0,
              provider: 'EZTV' } },
        ...
      }
    }
}
```

Nested within the `episodes` property there is the `season number`
within the `season number` is the `episode number` and within the
`episode number` are the different `qualities` of the torrent.

#### getTorrents

```js
{
  imdb_id: '5016504',
  torrents_count: 68,
  limit: 10,
  page: 1,
  torrents: [
    {
      id: 369459,
      hash: '1d20121796f6daabdc0ec209167554eed0255692',
      filename: 'Preacher.S02E11.INTERNAL.WEB.H264-STRiFE[eztv].mkv',
      episode_url: 'https://eztv.ag/ep/369459/preacher-s02e11-internal-web-h264-strife/',
      torrent_url: 'https://zoink.ch/torrent/Preacher.S02E11.INTERNAL.WEB.H264-STRiFE[eztv].mkv.torrent',
      magnet_url: 'magnet:?xt=urn:btih:d466f75fd244bf96c02c3995a270da88087d55ae&dn=Preacher.S02E11.INTERNAL.WEB.H264-STRiFE%5Brartv%5D&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce',
      title: 'Preacher S02E11 INTERNAL WEB H264-STRiFE EZTV',
      imdb_id: '5016504',
      season: '2',
      episode: '11',
      small_screenshot: '',
      large_screenshot: '',
      seeds: 19,
      peers: 13,
      date_released_unix: 1503992162,
      size_bytes: '2616073115'
    },
    ...
  ]
}

```

## Testing

You can run tests with the following npm command:

```
 $ npm test
```

# License

MIT License
