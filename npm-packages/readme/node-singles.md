# Singles

Create easily single instance application with two-way communication channel between master and client instances.

## Install

[![NPM](https://nodei.co/npm/singles.png?downloads=true)](https://nodei.co/npm/singles/)

```js
npm install singles
```

## Usage

```js
var Singles = require('singles');

// create new instance or connect to existing with a specified name
var app = new Singles('example-app');

app.on('error', function(err) {
	// connection error
});

app.on('close', function() {
	// connection closed
});

app.on('message', function(obj) {
	// message received
});

if (app.master) {
	// this is a master instance
	app.on('connection', function(client) {
		// client connected

		// send only to specified client
		client.send({ hello: 'client' });
	});

	// broadcast message to all clients, forever
	setInterval(function() {
		app.send({ time: new Date() });
	}, 1000);
} else {
	// this is a client instance

	app.on('connect', function() {
		app.send({hello: 'master'});
		app.close();
	});
}
```

## API

`Singles` is an EventEmitter

### new Singles(name)

 - `name` is an unique name of the application

### Event: 'connection' (master only)

 - `client` Client connection, instance of `net.Socket`

Emitted when client connects to the master.

### Event: 'listening' (master only)

Emitted when master starts listening for incoming connections.

### Event: 'connect' (client only)

Emitted when client is connected to the master.

### Event: 'error'

 - `error` Error object

Emitted if something goes wrong with the connection.

### Event: 'close'

Emitted when connection closed.

### Event: 'message'

 - `object` Received object

Emitted when received object from other instance.

### Singles#master

`true` if this instance is a master instance.

### Singles#connect()

Try connecting to a master instance

### Singles#createServer()

Create master connection

### Singles#send(object)

Send object to the other instance.
Sending from master instance will broadcast to all connected clients.

### Singles#close()

Close connection.
