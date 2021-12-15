[![Travis Build Status](http://img.shields.io/travis/ayhankuru/turkcealtyazi.svg?style=flat-square)](https://travis-ci.org/ayhankuru/turkcealtyazi) [![Circle Build Status](https://img.shields.io/circleci/project/ayhankuru/turkcealtyazi.svg?style=flat-square)](https://circleci.com/gh/ayhankuru/turkcealtyazi) [![Appveyor Build Status](https://img.shields.io/appveyor/ci/ayhankuru/turkcealtyazi.svg?style=flat-square)](https://ci.appveyor.com/project/ayhankuru/turkcealtyazi) [![Build Status](https://img.shields.io/david/ayhankuru/turkcealtyazi.svg?style=flat-square)](https://david-dm.org/ayhankuru/turkcealtyazi) [![io.js supported](https://img.shields.io/badge/io.js-supported-green.svg?style=flat-square)](https://iojs.org)





# turkcealtyazi

turkcealtyazi.org sitesindeki eklenmiş yazıları listelemeye yarayan modul.
 
#Kurulum
```Bash
npm install turkcealtyazi

```
#Kullanım

```js
var turkcealtyazi = require('turkcealtyazi');
```

##Arama

```js
    // imdb id'si ile ulaşılabiliyor.. yada Turkçealtayazı.org sitesindeki id ile
    turkcealtyazi.query('1731998').then(function(data){
			console.log(data);
	}).catch(function(err){
		console.log(err);
	}) 
```




##İndirme

```js
turkcealtyazi.download("http://www.turkcealtyazi.org/sub/526505/silicon-valley.html")
.then(function(url){
	console.log(url)
});

```

##Komut Satırı 

```
$ npm install -g turkcealtyazi 
```

##Kullanım

```
$ turkcealtyazi -t "dizi" -n "game of thrones"

$ turkcealtyazi --type "dizi" --name "game of thrones"

```

