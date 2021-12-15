# subs4free
Search for Greek & English movies' subtitles

[![NPM](https://nodei.co/npm/subs4free.png)](https://www.npmjs.com/package/subs4free)

## Installation
* `npm install subs4free`

## Usage

Get subtitles and movies list by search query

```javascript
const subs4free = require('subs4free')

subs4free.getSubs('cars', function(err, results) {
  console.log(results)
})

/*
{ movies_count: 4,
  subs_count: 24,
  langs: [ 'en', 'el' ],
  movies: 
   [ { id: 'md48bc7ac4d', title: 'Cars 3' },
     { id: 'md5f94634e5', title: 'Cars 2' },
     { id: 'm4ca2388654', title: 'Gifted Hands: The Ben Carson Story' },
     { id: 'm6c3966eb63', title: 'Cars' } ],
  subs: 
   [ { lang: 'en',
       name: 'Cars 3 2017 720p-1080p BluRay X264-AMIABLE',
       uploader: 'MiKiE',
       downloads: '176',
       link: 'http://www.subs4free.com/download-s27033ffda0.html' },
     { lang: 'en',
       name: 'Cars 3 2017 720p-1080p BluRay x264 DTS-HDChina',
       uploader: 'MiKiE',
       downloads: '119',
       link: 'http://www.subs4free.com/download-s51ca3797e6.html' } ...etc
     ]
}
*/
```

Get subtitles list list by movie id

```javascript
const subs4free = require('subs4free')

subs4free.getSubsById('mca769ae54a', function(err, results) {
  console.log(results)
})

/*
{ subs_count: 20,
  langs: [ 'el', 'en' ],
  subs: 
   [ { lang: 'el',
       name: 'Rango 2011 PROPER 1080p BluRay x264-HDEX & VeDeTT & NERDHD',
       uploader: 'punked666',
       downloads: '2972',
       link: 'http://www.subs4free.com/download-s748ec6c440.html' },
     { lang: 'el',
       name: 'Rango 2011 PROPER 720p BluRay x264-HDEX & VeDeTT & WiKi',
       uploader: 'punked666',
       downloads: '5980',
       link: 'http://www.subs4free.com/download-s1bf1bc78b1.html' } ...etc
   ]
}
*/
```

## Packages
* [request](https://github.com/request/request)
* [cheerio](https://github.com/cheeriojs/cheerio)
* [iconv-lite](https://github.com/ashtuchkin/iconv-lite)

## License
This project is licensed under The MIT License (MIT). Which means that you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software. But you always need to state that Mike Kokkolios is the original author of this template.

Project is developed and maintained by [Mike Kokkolios](https://www.linkedin.com/in/michael-kokkolios).
