# sata-wooordhunt

API Library for [http://wooordhunt.ru/](http://wooordhunt.ru/).

# How to use

```js
import wooordhunt from 'sata-wooordhunt';

// fetch only phrases
wooordhunt('cat', ['phrases'])
    .then(result => {
        console.log(result.word);
        console.log(result.phrases);
    });

// fetch everything
wooordhunt('cat')
    .then(result => {
        console.log(result.word);
        console.log(result.examples);
        console.log(result.phrases);
    });
```