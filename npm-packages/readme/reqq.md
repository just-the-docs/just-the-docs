# Reqq

This just shows off some cool HAR stuff (Hot API Reloading)

To see it in action, open the `test/index.html` page in your browser and start
`test/server.js`. Then restart `test/server.js` a bunch of times and look at
your brower live update!

# API

## `reqq.createServer() -> http.Server`

Creates the server for updating the client.

## `reqq.createAPI(host: String) -> reqq.API`

## `reqq.API.get(path: String, callback[JSON])`

## `reqq.API.post(path: String, body: JSON, callback[JSON])`

# Example

```js
// server.js

let express = require('express')
let reqq = require('reqq')

reqq.createServer()

let app = express()

// ...
```

```js
// client.jsx

let React = require('react')
let reqq = require('reqq')

let API = reqq.createAPI('http://localhost:3000')

let Hello = React.createClass({
  getInitialState () {
    return { x: null }
  },
  componentDidMount () {
    API.get('/x', response => this.setState({ x: response.x }))
  },
  componentWillUnmount () {
    // MAKE SURE YOU DISCONNECT ON UNMOUNT
    API.disconnect()
  },
  render () {
    <div>x: {this.state.x}</div>
  }
})
```
