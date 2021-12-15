# Winston Remote

Stream your [winston](https://github.com/flatiron/winston) logs to a remote winston server.

## Install

Available via [npm](https://www.npmjs.org/)

```bash
npm install winston-remote
```

## Usage

Set up your remote winston server:

```javascript
var winston = require('winston');
var winstonRemote = require('winston-remote').Server;

var winstonServer = winstonRemote.createServer({
    port: 9003
});

winstonServer.listen();

// Set up the winston logger transports
winstonServer.logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({ filename: '/var/log/winston/info.log' })
    ]
});
```

```bash
node server.js

Listening on port 9003
```

Set up your local winston transport that sends the winston logs to the remote server:

```javascript
var winston = require('winston');
var winstonRemoteTransport = require('winston-remote').Transport;

var logger = new (winston.Logger)({
    transports: [
        new (winstonRemoteTransport)({
            host: '192.168.1.100', // Remote server ip
            port: 9003 // Remote server port
        })
    ]
});
```

Afterwards just log as usual:

```javascript
logger.info('foo');
```

and then on your remote server you can check the save logged files:

```bash
cat /var/log/winston/info.log

{"level":"info","message":"foo","timestamp":"2014-05-12T02:56:23.039Z"}
```

With line info:

```
...
new (winstonRemoteTransport)({
    host: '127.0.0.1',
    port: 9003,
    label: 'Client',
    stack: true
})
...
```

```
info: Client::foo at example/log.js:16:8 Object.<anonymous>
```

## License

Released under the MIT License.
