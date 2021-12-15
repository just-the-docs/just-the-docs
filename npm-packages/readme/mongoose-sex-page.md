# ﻿![mongoose-sex-page](art/logo.gif)

# mongoose-sex-page [![Build Status](https://img.shields.io/travis/dtboy1995/mongoose-sex-page/master.svg)](https://travis-ci.org/dtboy1995/mongoose-sex-page)

:fire: a api friendly mongoose pagination tool

# install
```
npm install --save mongoose-sex-page
```

# usage

```javascript
const Dummy = mongoose.model('Dummy', DummySchema)
const P  = require('mongoose-sex-page')
```

- ### simple

```javascript
P(Dummy)
  .page(1)
  .size(20)
  .exec()
  .then((result) => {

  })
```

- ### complex

```javascript
P(Dummy)
  .find({dummy: dummy})
  .page(1)
  .size(20)
  .display(8)
  .simple(true)
  .exec()
  .then((result) => {

  })
```

- ### config

```javascript
P().config({
  page_name: 'page',
  size_name: 'size',
  size: 20,
  display: 10,
  // only return records
  light: true
})
```

- ### convenient

```javascript
// for such a request /users?size=20&page=1 /news?size=20&page=1
P().config({
  page_name: 'page',
  size_name: 'size',
  size: 20
})
// then
P(Dummy)
  .find({dummy: dummy})
  .inject(req.query)
  .exec()
  .then((result) => {

  })
```

# result sample
``` json
{
  "page": 1,
  "size": 5,
  "total": 100,
  "records": [{
    "name": "Test1",
    "age": 1
  }, {
    "name": "Test2",
    "age": 2
  }, {
    "name": "Test3",
    "age": 3
  }, {
    "name": "Test4",
    "age": 4
  }, {
    "name": "Test5",
    "age": 5
  }],
  "pages": 20,
  "display": [1, 2, 3, 4, 5, 6]
}
```

# test
> npm test
