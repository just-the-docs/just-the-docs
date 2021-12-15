# ZoneTelechargement

ZoneTelechargement node dirty api

## Install

```bash
npm install zone-telechargement
```

## Quick Example

### Search
```js
const ZoneTelechargement = require('zone-telechargement');

ZoneTelechargement.search('star wars')
    .then(results => {
        console.log(results);
    });

// Results
[
    {
        imageUrl:"http://fr.web/pictures/xxx.jpg"
        link:"https://www.zone-telechargement.ws/xxx.html"
        title:"Rogue One: A Star Wars Story"
    },
    ...
]

```

### GetDetails
```js
const ZoneTelechargement = require('zone-telechargement');

ZoneTelechargement.getDetails('https://www.zone-telechargement.ws/xxx.html')
    .then(result => {
        console.log(result);
    });

// Result
[
    {
        detail:'Raw Html'
        links: 
            [
                "http://uptobox.com/xxx", 
                "http://ul.to/xxx",
                "http://1turbobit.net/xxx.html",
                ...
            ]
    },
    ...
]

```

## License

MIT © 2017 [Jimmy Laurent](https://github.com/JimmyLaurent)