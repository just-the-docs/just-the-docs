<p>
  <img src="./assets/img/logo.png" alt="TíoAnime API" />
</p>

  
<p>
 TioAnime API is a content provider of the latest in the world of anime with sub in Spanish and free, in addition to providing different complementary information. Using as a reference the websites tioanime.com and myanimelist.net, to extract the data and information.
</p>

![npm](https://img.shields.io/npm/v/npm?style=flat-square) ![GitHub package.json version](https://img.shields.io/github/package-json/v/carlosfdezb/tioanime?style=flat-square) ![NPM](https://img.shields.io/npm/l/tioanime?style=flat-square)

[![NPM](https://nodei.co/npm/tioanime.png)](https://nodei.co/npm/tioanime/)

## Installation
```
npm install tioanime
```

## 📖 Documentation
Available methods:

- [latestEpisodesAdded](#-latestepisodesadded): Retrieves the last episodes added.
- [latestAnime](#-latestanime): Retrieves a basic list of anime in broadcast status.
- [latestAnimeDetail](#-latestanimedetail): Similar to the previous one with much more data, but more slower.
- [getAnimeInfo](#-getanimeinfoid): Retrieves all available information of the chosen anime.
- [getAnimeRelated](#-getanimerelatedid): Retrieves animes related to the chosen one, such as sequels, prequels, etc.
- [getAnimeEpisodes](#-getanimeepisodesid): Retrieves a list of episodes of the selected anime.
- [getAnimeEpisodeServers](#-getanimeepisodeserversid-episode): Retrieves a list of servers of the selected episode.
- [downloadAnimeEpisode](#-downloadanimeepisodeid-episode): Retrieves a list of download servers of the selected episode.
- [search](#-searchquery): Retrieves a list of anime, from a query entered.
- [searchDetail](#-searchdetailquery): Similar to the previous one with much more data, but more slower.
- [getByGenre](#-getbygenregenre-page): Retrieves a list of anime, from a genre selected.
- [getByGenreDetail](#-getbygenredetailgenre-page): Similar to the previous one with much more data, but more slower.
- [getAnimeExtraInfo](#-getanimeextrainfoid): Retrieves more information of the chosen anime, using myanimelist.net.
- [getAnimeEpisodesTitles](#-getanimeepisodestitlesid): Retrieves a list of episodes names of the chosen anime, using myanimelist.net.
- [getAnimeCharacters](#-getanimecharactersid): Retrieves a list of characters of the chosen anime, using myanimelist.net.


## 🚩 latestEpisodesAdded()
Retrieves the last episodes added.

Example:
```js
const tioanime = require('tioanime');

tioanime.latestEpisodesAdded()
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    id: 'jouran-the-princess-of-snow-and-blood',
    title: 'Jouran: The Princess of Snow and Blood',
    preview: 'https://tioanime.com//uploads/thumbs/3466.jpg',
    episode: 4
  },
  {
    id: 'bishounen-tanteidan',
    title: 'Bishounen Tanteidan',
    preview: 'https://tioanime.com//uploads/thumbs/3501.jpg',
    episode: 2
  },
  ...
]
```

## 🚩 latestAnime()
Retrieves a basic list of anime broadcast. 

Example:
```js
const tioanime = require('tioanime');

tioanime.latestAnime()
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    id: 'mairimashita-irumakun-2nd-season',
    title: 'Mairimashita! Iruma-kun 2nd Season',
    poster: 'https://tioanime.com//uploads/portadas/3505.jpg'
  },
  {
    id: 'cestvs-the-roman-fighter',
    title: 'Cestvs: The Roman Fighter',
    poster: 'https://tioanime.com//uploads/portadas/3504.jpg'
  },
  ...
]
```
  
## 🚩 latestAnimeDetail()
Similar to the previous one `latestAnime()` with much more data, but more slower.

Example:
```js
const tioanime = require('tioanime');

tioanime.latestAnimeDetail()
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    id: 'mairimashita-irumakun-2nd-season',
    malId: 41402,
    title: 'Mairimashita! Iruma-kun 2nd Season',
    poster: 'https://tioanime.com/uploads/portadas/3505.jpg',
    banner: 'https://tioanime.com/uploads/fondos/3505.jpg',
    synopsis: 'Segunda temporada',
    debut: 'En emision',
    type: 'Anime',
    genres: [
      'Demonios',
      'Escolares',
      'Fantasía',
      'Shounen',
      'Sobrenatural'
    ],
    nextEpisode: 2021-04-17,
    episodes: [
      {
        id: 'mairimashita-irumakun-2nd-season',
        poster: 'https://tioanime.com/uploads/thumbs/3505.jpg',
        episode: 1,
        date: 'Hace 4 dias'
      }
    ]
  },
  ...
]
```

## 🚩 getAnimeInfo(id)
Retrieves all available information of the chosen anime. To access the data you must use the `id`

Example:
```js
const tioanime = require('tioanime');

tioanime.getAnimeInfo('wonder-egg-priority')
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    id: 'wonder-egg-priority',
    malId: '43299',
    title: 'Wonder Egg Priority',
    poster: 'https://tioanime.com//uploads/portadas/3452.jpg',
    banner: 'https://tioanime.com//uploads/fondos/3452.jpg',
    synopsis: 'La historia de este anime original comienza cuando la protagonista, una chica de 14 años llamada Ai Ohto, escucha una misteriosa voz mientras camina por la noche en su pueblo natal. Esa voz le otorga un huevo y le indica: “Si deseas cambiar el futuro, solo tienes que elegir ahora. Ahora, cree en ti misma y rompe el huevo”. ',      
    debut: 'Finalizado',
    type: 'TV',
    genres: [ 'Recuentos de la vida' ],
    nextEpisode: null,
    episodes: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  }
]
```

## 🚩 getAnimeRelated(id)
Retrieves animes related to the chosen one, such as sequels, prequels, etc. To access the data you must use the `id`

Example:
```js
const tioanime = require('tioanime');

tioanime.getAnimeRelated('haikyuu-second-season')
  .then((res) => console.log(res));
```

Results:
```json
  [
    {
      id: 'haikyuu',
      title: 'Haikyuu!!',
      poster: 'https://tioanime.com/uploads/portadas/1280.jpg'
    },
    {
      id: 'haikyuu-third-season',
      title: 'Haikyuu!! Third Season',
      poster: 'https://tioanime.com/uploads/portadas/2598.jpg'
    }
  ]
```

## 🚩 getAnimeEpisodes(id)
Retrieves a list of episodes of the selected anime. To access the data you must use the `id`.

Example:
```js
const tioanime = require('tioanime');

tioanime.getAnimeEpisodes('wonder-egg-priority')
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    id: 'wonder-egg-priority',
    poster: 'https://tioanime.com/uploads/thumbs/3452.jpg',
    episode: 12,
    date: 'Hace 21 dias'
  },
  {
    id: 'wonder-egg-priority',
    poster: 'https://tioanime.com/uploads/thumbs/3452.jpg',
    episode: 11,
    date: 'Hace 28 dias'
  },
  {
    id: 'wonder-egg-priority',
    poster: 'https://tioanime.com/uploads/thumbs/3452.jpg',
    episode: 10,
    date: 'Hace 1 mes'
  },
  ...
]
```

## 🚩 getAnimeEpisodeServers(id, episode)
Retrieves a list of servers of the selected episode. To access the servers you must use the `id` and `episode`

Example:
```js
const tioanime = require('tioanime');

tioanime.getAnimeEpisodeServers('wonder-egg-priority', 1)
  .then((res) => console.log(res));
```

Results:
```json
  [
    {
      server: 'Umi',
      url: 'https://v.tioanime.com/gocdn.html#dUhMNVBMS1NzTGdsSVdLRHQyOEZFaUtIaUVZaGg4RW5Fa1crRHRrR2MyT0I5Q0NCd0lWbzJVK09GM0Q0ejFEVlMweVFuUlN3ZGpMWWQ0KzF2ZGhHWFE9PQ=='
    },
    { 
      server: 'Fembed', 
      url: 'https://www.fembed.com/v/7dn0wbg31kj0kne',
    },
    {
      server: 'Mega',
      url: 'https://mega.nz/embed#!fShC3Y4a!AfPyn-8QXi0xdRnfjFv7A7nyK849mdoP6mKdEZ6TUPo'
    },
    ...
  ]
```

## 🚩 downloadAnimeEpisode(id, episode)
Retrieves a list of download servers of the selected episode.. To access the links you must use the `id` and `episode`

Example:
```js
const tioanime = require('tioanime');

tioanime.downloadAnimeEpisode('wonder-egg-priority', 1)
  .then((res) => console.log(res));
```
**Usually returns Mega and Zippyshare links**
Results:
```json
[
  {
    server: 'Mega',
    url: 'https://mega.nz/#!fShC3Y4a!AfPyn-8QXi0xdRnfjFv7A7nyK849mdoP6mKdEZ6TUPo'
  },
  {
    server: 'Zippyshare',
    url: 'https://www55.zippyshare.com/v/WjJs6Uz7/file.html'
  }
]
```

## 🚩 search(query)
Retrieves a list of anime, from a `query` entered.

Example:
```js
const tioanime = require('tioanime');

tioanime.search('neon genesis evangelion')
  .then((res) => console.log(res));
```

Results:
```json
  [
    {
      id: 'neon-genesis-evangelion',
      title:'Neon Genesis Evangelion',
      poster: 'https://tioanime.com/uploads/portadas/460.jpg',
    },
    {
      id: 'neon-genesis-evangelion-the-end-of-evangelion',
      title: 'Neon Genesis Evangelion: The End of Evangelion',
      poster: 'https://tioanime.com/uploads/portadas/1494.jpg',
    },
    {
      id: 'neon-genesis-evangelion-death-and-rebirth',
      title: 'Neon Genesis Evangelion: Death &amp; Rebirth',
      poster: 'https://tioanime.com/uploads/portadas/1493.jpg',
    }
  ] 
```

## 🚩 searchDetail(query)
Similar to the previous one `search()` with much more data, but more slower.

Example:
```js
const tioanime = require('tioanime');

tioanime.searchDetail('neon genesis evangelion')
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    id: 'neon-genesis-evangelion',
    malId: '30',
    title: 'Neon Genesis Evangelion',
    poster: 'https://tioanime.com//uploads/portadas/460.jpg',
    banner: 'https://tioanime.com//uploads/fondos/460.jpg',
    synopsis: 'Seg&uacute;n cuentan los libros de historia, el 13 de Septiembre del 2000, un enorme meteorito choc&oacute; contra la Ant&aacute;rtida, causando el derretimiento del Polo Sur y la consecuente inundaci&oacute;n y destrucci&oacute;n de todas las ciudades costeras. A este evento crucial se lo denomino Segundo Impacto -El primero fue el que destruy&oacute; a los dinosaurios-. La Tierra atraves&oacute; luego de ello un estado de crisis y cat&aacute;strofes naturales y m&aacute;s de mitad de la poblaci&oacute;n humana muri&oacute;. Han pasado 15 a&ntilde;os desde el Segundo Impacto cuando Tokyo-3, es atacada por un misterioso ser org&aacute;nico gigante, sin embargo esto no parece ser una sorpresa para un selecto grupo de gente de una organizaci&oacute;n de la ONU llamada NERV. Ellos se refieren al enemigo como &quot;Tercer &Aacute;ngel&quot; y han 
desarrollado unos enigm&aacute;ticos robots gigantes llamados EVA con una particularidad, solo pueden ser piloteados por j&oacute;venes de 14 a&ntilde;os con caracteristicas 
no del todo claras. ',
    debut: 'Finalizado',
    type: 'TV',
    genres: [
      'Acción',
      'Ciencia Ficción',
      'Demencia',
      'Drama',
      'Mecha',
      'Psicológico'
    ],
    nextEpisode: null,
    episodes: [
      ...
    ]
  },
  {
    id: 'neon-genesis-evangelion-the-end-of-evangelion',
    malId: '32',
    title: 'Neon Genesis Evangelion: The End of Evangelion',
    poster: 'https://tioanime.com//uploads/portadas/1494.jpg',
    banner: 'https://tioanime.com//uploads/fondos/1494.jpg',
    synopsis: 'El final original de Neon Genesis Evangelion mostrado en los dos &uacute;ltimos cap&iacute;tulos de la serie de TV fue criticado un&aacute;nimemente debido a la enorme cantidad de preguntas que dej&oacute; sin resolver. Sin m&aacute;s remedio, GAINAX decidi&oacute; rehacer el final lanzando la pel&iacute;cula The End of Evangelion 
(El Final de Evangelion), que sustituye a los dos &uacute;ltimos episodios de la serie de TV. The End of Evangelion nos narra los acontecimientos ocurridos tras la muerte del &uacute;ltimo &Aacute;ngel, revel&aacute;ndose un plan orquestado desde las sombras para forzar la evoluci&oacute;n de la Humanidad, con un car&aacute;cter cada vez m&aacute;s apocal&iacute;ptico y oscuro mientras avanza la pel&iacute;cula, resolviendo las dudas dejadas de lado en el final original. ',
    debut: 'Finalizado',
    type: 'Película',
    genres: [ 'Ciencia Ficción', 'Demencia', 'Drama', 'Mecha', 'Psicológico' ],
    nextEpisode: null,
    episodes: [ ... ]
  },
  {
    id: 'neon-genesis-evangelion-death-and-rebirth',
    malId: '31',
    title: 'Neon Genesis Evangelion: Death &amp; Rebirth',
    poster: 'https://tioanime.com//uploads/portadas/1493.jpg',
    banner: 'https://tioanime.com//uploads/fondos/1493.jpg',
    synopsis: 'Es la primera pel&iacute;cula de la serie de televisi&oacute;n Neon Genesis Evangelion. Consiste en dos partes: Death y Rebirth, Muerte y Renacimiento respectivamente. La primera parte, Death, consiste de una edici&oacute;n de 60 minutos sobre los primeros 24 episodios del programa de televisi&oacute;n, que incluye varias escenas in&eacute;ditas. La segunda parte, Rebirth, consiste en una historia y animaci&oacute;n completamente nuevas, ubicadas inmediatamente despu&eacute;s del episodio 24. Debido a 
falta de tiempo, esta parte no fue terminada completamente al momento del lanzamiento, y s&oacute;lo los primeros 27 minutos de un total de 40 fueron estrenados. Cuatro meses m&aacute;s tarde, The End of Evangelion, la segunda pel&iacute;cula de Evangelion present&oacute; la animaci&oacute;n completa, que recibi&oacute; el nombre Air (Episodio 25). ',
    debut: 'Finalizado',
    type: 'Película',
    genres: [ 'Ciencia Ficción', 'Drama', 'Mecha', 'Psicológico' ],
    nextEpisode: null,
    episodes: [ ... ]
  }
]
``` 



## 🚩 getByGenre(genre, page)
Retrieves a list of anime, from a genre selected. To access the data you must use the `genre` and `page`

| GENRE | VALUE |
| -----|----- |
| Acción | 0 |
| Aventuras | 1 |
| Carreras | 2 |
| Comedia | 3 |
| Demencia | 4 |
| Demonios | 5 |
| Deportes | 6 |
| Drama | 7 |
| Ecchi | 8 |
| Escolares | 9 |
| Espacial | 10 |
| Fantasía | 11 |
| Harem | 12 |
| Histórico | 13 |
| Infantil | 14 |
| Josei | 15 |
| Juegos | 16 |
| Magia | 17 |
| Mecha | 18 |
| Militar | 19 |
| Misterio | 20 |
| Música | 21 |
| Parodia | 22 |
| Policía | 23 |
| Psicológico | 24 |
| Romance | 25 |
| Samurai | 26 |
| Seinen | 27 |
| Shoujo | 28 |
| Shounen | 29 |
| Sobrenatural | 30 |
| Superpoderes | 31 |
| Suspenso | 32 |
| Terror | 33 |
| Vampiros | 34 |
| Yaoi | 35 |
| Yuri | 36 |

| PAGE LIMIT |
| ---------- |
| none       |

Example:
```js
const tioanime = require('tioanime');

tioanime.getByGenre(0,1)
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    id: 'majutsushi-orphen-hagure-tabi-kimluckhen',
    title: 'Majutsushi Orphen Hagure Tabi: Kimluck-hen',     
    poster: 'https://tioanime.com//uploads/portadas/3461.jpg'
  },
  {
    id: 'log-horizon-entaku-houkai',
    title: 'Log Horizon: Entaku Houkai',
    poster: 'https://tioanime.com//uploads/portadas/3455.jpg'
  },
  {
    id: 'kemono-jihen',
    title: 'Kemono Jihen',
    poster: 'https://tioanime.com//uploads/portadas/3443.jpg'
  },
  {
    id: 'exarm',
    title: 'Ex-Arm',
    poster: 'https://tioanime.com//uploads/portadas/3444.jpg'
  },
  ...
]
```

## 🚩 getByGenreDetail(genre, page)
Similar to the previous one `getByGenre()` with much more data, but more slower. To access the data you must use the `genre` and `page`

| GENRE | VALUE |
| -----|----- |
| Acción | 0 |
| Aventuras | 1 |
| Carreras | 2 |
| Comedia | 3 |
| Demencia | 4 |
| Demonios | 5 |
| Deportes | 6 |
| Drama | 7 |
| Ecchi | 8 |
| Escolares | 9 |
| Espacial | 10 |
| Fantasía | 11 |
| Harem | 12 |
| Histórico | 13 |
| Infantil | 14 |
| Josei | 15 |
| Juegos | 16 |
| Magia | 17 |
| Mecha | 18 |
| Militar | 19 |
| Misterio | 20 |
| Música | 21 |
| Parodia | 22 |
| Policía | 23 |
| Psicológico | 24 |
| Romance | 25 |
| Samurai | 26 |
| Seinen | 27 |
| Shoujo | 28 |
| Shounen | 29 |
| Sobrenatural | 30 |
| Superpoderes | 31 |
| Suspenso | 32 |
| Terror | 33 |
| Vampiros | 34 |
| Yaoi | 35 |
| Yuri | 36 |

| PAGE LIMIT |
| ---------- |
| none       |

Example:
```js
const tioanime = require('tioanime');

tioanime.getByGenreDetail(0,1)
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    id: 'majutsushi-orphen-hagure-tabi-kimluckhen',
    malId: '41573',
    title: 'Majutsushi Orphen Hagure Tabi: Kimluck-hen',
    poster: 'https://tioanime.com//uploads/portadas/3461.jpg',      
    banner: 'https://tioanime.com//uploads/fondos/3461.jpg',        
    synopsis: 'Segunda temporada de Majutsushi Orphen Hagure Tabi ',
    debut: 'Finalizado',
    type: 'TV',
    genres: [
      'Acción',
      'Artes Marciales',
      'Aventuras',
      'Drama',
      'Fantasía',
      'Magia'
    ],
    nextEpisode: null,
    episodes: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  {
    id: 'log-horizon-entaku-houkai',
    malId: '41109',
    title: 'Log Horizon: Entaku Houkai',
    poster: 'https://tioanime.com//uploads/portadas/3455.jpg',
    banner: 'https://tioanime.com//uploads/fondos/3455.jpg',
    synopsis: 'Tercera temporada ',
    debut: 'Finalizado',
    type: 'TV',
    genres: [ 'Acción', 'Aventuras', 'Fantasía', 'Juegos', 'Magia' ],
    nextEpisode: null,
    episodes: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  },
  {
    id: 'kemono-jihen',
    malId: '40908',
    title: 'Kemono Jihen',
    poster: 'https://tioanime.com//uploads/portadas/3443.jpg',
    banner: 'https://tioanime.com//uploads/fondos/3443.jpg',
    synopsis: 'Cuando una serie de cuerpos de animales que se pudren en una sola noche comienza a aparecer en un remoto pueblo de una montaña, Inugami, un detective de Tokio 
que se especializa en el ocultismo, comienza su investigación.Mientras trabaja en el caso, se hace amigo de un chico que trabaja en el campo en vez de asistir a la escuela. Rechazado por sus compañeros y apodado “Dorota-bou” por un yokai que vive en la tierra, ayuda a Inugami a resolver el misterio detrás de las muertes, pero las fuerzas sobrenaturales están presentes allí, y el apodo “Dorota-bou” podría no ser tan equivocado… ',
    debut: 'Finalizado',
    type: 'TV',
    genres: [ 'Acción', 'Demonios', 'Misterio', 'Shounen', 'Sobrenatural' ],
    nextEpisode: null,
    episodes: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  },
  ...
]
```

## 🚩 getAnimeExtraInfo(id)
Retrieves more information of the chosen anime, using myanimelist.net. To access the data you must use the `id`

Example:
```js
const tioanime = require('tioanime');

tioanime.getAnimeExtraInfo('wonder-egg-priority')
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    malId: 43299,
    titleJapanese: 'ワンダーエッグ・プライオリティ',
    title: 'Wonder Egg Priority',
    source: 'Original',
    totalEpisodes: 12,
    status: 'Finished Airing',
    aired: {
      from: '2021-01-13T00:00:00+00:00',
      to: '2021-03-31T00:00:00+00:00',
      string: 'Jan 13, 2021 '
    },
    duration: '23 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    rank: 336,
    popularity: 362,
    members: 393422,
    favorites: 7771,
    premiered: 'Winter 2021',
    broadcast: 'Wednesdays at 01:29 (JST)',
    producers: { names: [Array] },
    licensors: { names: [Array] },
    studios: { names: [Array] },
    genres: [ [Object], [Object], [Object] ],
    openingThemes: [ '"Sudachi no Uta (巣立ちの歌)" by Anemoneria (アネモネリア)' ],
    endingThemes: [ '"Life is Cider (Life is サイダー)" by Anemoneria (アネモネリア)' ],
    trailer: 'https://www.youtube.com/embed/_TpTn3o-_Yk?enablejsapi=1&wmode=opaque&autoplay=1'
  }
]
``` 

## 🚩 getAnimeEpisodesTitles(id)
Retrieves a list of episodes names of the chosen anime, using myanimelist.net. To access the data you must use the `id`

Example:
```js
const tioanime = require('tioanime');

tioanime.getAnimeEpisodesTitles('wonder-egg-priority')
  .then((res) => console.log(res));
```

Results:
```json
[
  { episode: 1, title: 'The Domain of Children', date: '2021-01-13' },
  { episode: 2, title: 'The Terms of Friendship', date: '2021-01-20' },
  { episode: 3, title: 'A Bare Knife', date: '2021-01-27' },
  { episode: 4, title: 'Colorful Girls', date: '2021-02-03' },
  { episode: 5, title: 'The Girl Flautist', date: '2021-02-10' },
  { episode: 6, title: 'Punch Drunk Day', date: '2021-02-17' },
  ...
]
``` 

## 🚩 getAnimeCharacters(id)
Retrieves a list of characters of the chosen anime, using myanimelist.net. To access the data you must use the `id`

Example:
```js
const tioanime = require('tioanime');

tioanime.getAnimeCharacters('wonder-egg-priority')
  .then((res) => console.log(res));
```

Results:
```json
[
  {
    name: 'Aonuma, Neiru',
    image: 'https://cdn.myanimelist.net/images/characters/6/428411.jpg?s=66c9c0b4fe9228061b05fdd6b4391715',
    role: 'Main'
  },
  {
    name: 'Kawai, Rika',
    image: 'https://cdn.myanimelist.net/images/characters/13/428412.jpg?s=a4346710178985088270d6c64ef636c0',
    role: 'Main'
  },
  {
    name: 'Ooto, Ai',
    image: 'https://cdn.myanimelist.net/images/characters/10/431621.jpg?s=12bb4854269ceb6f7350f88166a2ecce',
    role: 'Main'
  },
  {
    name: 'Sawaki, Momoe',
    image: 'https://cdn.myanimelist.net/images/characters/3/428413.jpg?s=e695b2ba5a5ae98aeae00bcf01c2687e',
    role: 'Main'
  },
  ...
]
``` 
---

### **:busts_in_silhouette: Credits**

- [Carlos Fernández](https://github.com/carlosfdezb) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.


---


### **:robot: Author**

_*Carlos Fernández*_

> You can follow me on
[github](https://github.com/carlosfdezb)

---

Copyright © 2021 [TioAnime API](https://github.com/carlosfdezb/tioanime).

<p>
  <a href="http://forthebadge.com/" target="_blank">
    <img src="http://forthebadge.com/images/badges/built-with-love.svg"/>
  </a>
</p>

