[![GitHub issues](https://img.shields.io/badge/npm-v1.0.1-lightgrey)](https://github.com/Naveen7892/comic-vine-api.git)  [![install size](https://packagephobia.com/badge?p=@naveen7892/comic-vine-api)](https://packagephobia.com/result?p=@naveen7892/comic-vine-api)

## Communicates with ComicVine API

### Install
> $ npm install @naveen7892/comic-vine-api

### Usage
```
const cv = require("@naveen7892/comic-vine-api");

// Gets recently updated 10 characters
cv.getRecentlyUpdatedCharacters(0, 10, "", "")
.then(response => {
    response.json().then((r) => {
        console.log(r);
    }, (e) => {
        console.log(e)
    });
    // res.send('fofa')
}).catch(err => { 
    console.log(err); 
});

// Gets my favorite hero "Iron Man" details
cv.getCharacterById(1455)
.then(response => {
    response.json().then((r) => {
        console.log(r);
    }, (e) => {
        console.log(e)
    });
    // res.send('fofa')
}).catch(err => { 
    console.log(err); 
});
```