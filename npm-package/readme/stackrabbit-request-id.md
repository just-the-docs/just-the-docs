# Stackrabbit Request ID [Coming Soon]

[![Circle CI](https://circleci.com/gh/danethurber/stackrabbit-request-id.svg?style=shield)](https://circleci.com/gh/danethurber/stackrabbit-request-id)

Unique Request IDs for stackrabbit messages

## Installation

```
npm install stackrabbit-request-id
```

## Getting Started

```js
const stackrabbit = require('stackrabbit')
const requestId = require('stackrabbit-request-id')

const listener = stackrabbit({
  ...
})

listener.use(requestId())

listener.listen(function * () {
})

listener.connect()
```
