plug-dj-login
=============

Log in to Plug.dj and get an auth cookie

## Usage

```js
var plugLogin = require('plug-dj-login')

var creds = {
    username: 'twitter-username'
  , password: 'twitter-password'
}

plugLogin(creds, function(err, cookie) {
  console.log(cookie.name, cookie.value);
})

```

## Installation

    npm install plug-dj-login

## License

MIT
