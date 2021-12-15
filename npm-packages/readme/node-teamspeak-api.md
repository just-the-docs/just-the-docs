# Node TeamSpeak Api

**node-teamspeak-api** is a library which allows you to connect to any TeamSpeak 3 server using ServerQuery-API.

The ServerQuery-specification is available [here](http://media.teamspeak.com/ts3_literature/TeamSpeak%203%20Server%20Query%20Manual.pdf).

## Install

`npm install node-teamspeak-api`

## Usage

```javascript

var TeamSpeak = require('node-teamspeak-api');

// Default IP: 'localhost'
// Default port: 10011

var tsClient = new TeamSpeak('localhot', 10011);
```

```javascript
//Adding options
var options = ['away', 'times']; // or for only one options = 'away'

tsClient.send('clientlist', options, function(err, resp, req) {
    console.log(resp.data);
});

//Adding params
var params = {
    client_login_name: "server_admin",
    client_login_password: "server_password"
};

tsClient.send('login', params, function(err, resp, req) {
    console.log(resp.data);
});

//Using both
var options = ['count'],
    params = {
        limit: 3
    };

tsClient.send('clientdblist', params, options, function(err, resp, req) {
    console.log(resp.data);
});
```

```javascript
//Callback data
tsClient.send('clientlist', function(err, resp, req) {});
```

```javascript
//Error
{
    status: 'error',
    message: 'Error Message',
    error_id: 12
}
```

```javascript
// Response
{
    status: 'ok',
    data: {}, // some data
    raw: "raw resp"
}
```

```javascript
// Request
{
    cmd: 'clientlist',
    options: ['away'],
    params: {},
    raw: 'clientlist -away'
}
```

### API usage

#### Using ServerQuery commands

[List of commands](http://media.teamspeak.com/ts3_literature/TeamSpeak%203%20Server%20Query%20Manual.pdf)

```javascript

// List client on server

tsClient.api.login({
    client_login_name: "server_admin",
    client_login_password: "server_password"
}, function(err, resp, req) {
    tsClient.api.use({
        sid: 1
    }, function(err, resp, req) {
        tsClient.api.clientlist(function(err, resp, req) {
            console.log(resp.data);
        });
    });
});
```

#### Using ServerQuery commands via send function

```javascript
tsClient.send('login', {
    client_login_name: "server_admin",
    client_login_password: "server_password"
}, function(err, resp, req) {
    tsClient.send('use', {
        sid: 1
    }, function(err, resp, req) {
        tsClient.send('clientlist', function(err, resp, req) {
            console.log(resp.data);
        });
    });
});
```

#### Using event listener rather than a callback

```javascript
tsClient.on('clientlist', function(err, resp) {
    console.log(resp.data)
});

tsClient.api.login({
    client_login_name: "server_admin",
    client_login_password: "server_password"
}, function(err, resp, req) {

    tsClient.api.use({
        sid: 1
    }, function(err, resp, req) {

        tsClient.api.clientlist(); // Don't set a callback and use tsClient.on function
    });
});
```

### Subscribe/Unsubscribe to events

```javascript
//Subscribe to all
tsClient.on('notify', function(eventName, resp) {
    console.log(eventName, resp.data);
});

//Subscribe to a specific event
tsClient.on('notify.cliententerview', function(eventName, resp) {
    console.log(resp.data);
});

tsClient.api.login({
    client_login_name: "server_admin",
    client_login_password: "server_password"
}, function(err, resp, req) {
    tsClient.api.use({
        sid: 1
    }, function(err, resp, req) {
        tsClient.subscribe({
            event: 'server'
        });
    });
});
```

```javascript
//Unsubscribe to all
tsClient.unsubscribe();
```

## Extra functions

```javascript
//Connect/Reconnect to server
tsClient.connect();
```

```javascript
//Disconnect from server
tsClient.disconnect();
```

```javascript
//Get pending command
var prending = tsClient.pending();
```

```javascript
//CLear queue
tsClient.clear_pending();
```

## Infos

Every TeamSpeak client is an event emitter. You can subscribe to some of the socket event (`connect`, `close`, `error`)