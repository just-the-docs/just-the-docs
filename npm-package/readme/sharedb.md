# ShareDB

  [![NPM Version](https://img.shields.io/npm/v/@teamwork/sharedb.svg)](https://npmjs.org/package/@teamwork/sharedb)
  [![Build Status](https://travis-ci.org/Teamwork/sharedb.svg?branch=master)](https://travis-ci.org/Teamwork/sharedb)
  [![Coverage Status](https://coveralls.io/repos/github/Teamwork/sharedb/badge.svg?branch=master)](https://coveralls.io/github/Teamwork/sharedb?branch=master)

ShareDB is a realtime database backend based on [Operational Transformation
(OT)](https://en.wikipedia.org/wiki/Operational_transformation) of JSON
documents. It is the realtime backend for the [DerbyJS web application
framework](http://derbyjs.com/).

For questions, discussion and announcements, join the [ShareJS mailing
list](https://groups.google.com/forum/?fromgroups#!forum/sharejs) or [check the FAQ](./docs/faq.md).

Please report any bugs you find to the [issue
tracker](https://github.com/teamwork/sharedb/issues).

## Features

- Realtime synchronization of any JSON document
- Concurrent multi-user collaboration
- Realtime synchronization of any ephemeral "presence" data
- Local undo and redo
- Synchronous editing API with asynchronous eventual consistency
- Realtime query subscriptions
- Simple integration with any database - [MongoDB](https://github.com/teamwork/sharedb-mongo), [PostgresQL](https://github.com/share/sharedb-postgres) (experimental)
- Horizontally scalable with [pub/sub integration](#pubsub-adapters)
- Projections to select desired fields from documents and operations
- Middleware for implementing access control and custom extensions
- Ideal for use in browsers or on the server
- Offline change syncing upon reconnection
- In-memory implementations of database and pub/sub for unit testing

### Reconnection

**TLDR**
```javascript
const WebSocket = require('reconnecting-websocket');
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);
```

The native Websocket object that you feed to ShareDB's `Connection` constructor **does not** handle reconnections.

The easiest way is to give it a WebSocket object that does reconnect. There are plenty of example on the web. The most important thing is that the custom reconnecting websocket, must have the same API as the native rfc6455 version.

In the "textarea" example we show this off using a Reconnecting Websocket implementation from [reconnecting-websocket](https://github.com/pladaria/reconnecting-websocket).



## Example apps

[<img src="examples/counter/demo.gif" height="300">
Simple app demonstrating realtime sync](examples/counter)

[<img src="examples/leaderboard/demo.gif" height="436">
Leaderboard app demonstrating live queries](examples/leaderboard)

## Data model

In ShareDB's view of the world, every document has 3 properties:

- **version** - An incrementing number starting at 0
- **type** - An OT type. OT types are defined in
[teamwork/ot-docs](https://github.com/teamwork/ot-docs). Documents
which don't exist implicitly have a type of `null`.
- **data** - The actual data that the document contains. This must be pure
acyclic JSON. Its also type-specific. (JSON type uses raw JSON, text documents
use a string, etc).

ShareDB implicitly has a record for every document you can access. New documents
have version 0, a null type and no data. To use a document, you must first
submit a *create operation*, which will set the document's type and give it
initial data. Then you can submit editing operations on the document (using
OT). Finally you can delete the document with a delete operation. By
default, ShareDB stores all operations forever - nothing is truly deleted.

## User presence synchronization

Presence data represents a user and is automatically synchronized between all clients subscribed to the same document. Its format is defined by the document's [OT Type](https://github.com/teamwork/ot-docs), for example it may contain a user ID and a cursor position in a text document. All clients can modify their own presence data and receive a read-only version of other client's data. Presence data is automatically cleared when a client unsubscribes from the document or disconnects. It is also automatically transformed against applied operations, so that it still makes sense in the context of a modified document, for example a cursor position may be automatically advanced when a user types at the beginning of a text document.

## Server API

### Initialization

First, create a ShareDB server instance:

```js
var ShareDB = require('@teamwork/sharedb');
var share = new ShareDB(options);
```

__Options__

* `options.db` _(instance of `ShareDB.DB`)_
  Store documents and ops with this database adapter. Defaults to `ShareDB.MemoryDB()`.
* `options.pubsub` _(instance of `ShareDB.PubSub`)_
  Notify other ShareDB processes when data changes
  through this pub/sub adapter. Defaults to `ShareDB.MemoryPubSub()`.

#### Database Adapters
* `ShareDB.MemoryDB`, backed by a non-persistent database with no queries
* [`ShareDBMongo`](https://github.com/teamwork/sharedb-mongo), backed by a real Mongo database
  and full query support
* [`ShareDBMingoMemory`](https://github.com/teamwork/sharedb-mingo-memory), backed by
  a non-persistent database supporting most Mongo queries. Useful for faster
  testing of a Mongo-based app.
* [`ShareDBPostgres`](https://github.com/share/sharedb-postgres), backed by PostgresQL. No query support.

#### Pub/Sub Adapters
* `ShareDB.MemoryPubSub` can be used with a single process
* [`ShareDBRedisPubSub`](https://github.com/teamwork/sharedb-redis-pubsub) can be used
  with multiple processes using Redis' pub/sub mechanism

Community Provided Pub/Sub Adapters
* [wsbus](https://github.com/dmapper/sharedb-wsbus-pubsub)

### Listening to WebSocket connections

```js
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');

// 'ws' is a websocket server connection, as passed into
// new (require('ws').Server).on('connection', ...)
var stream = new WebSocketJSONStream(ws);
share.listen(stream);
```

For transports other than WebSockets, expose a duplex
stream that writes and reads JavaScript objects. Then
pass that stream directly into `share.listen`.

### Middlewares

Middlewares let you hook into the ShareDB server pipeline. In
middleware code you can read and also modify objects as they
flow through ShareDB. For example,
[sharedb-access](https://github.com/dmapper/sharedb-access) uses middlewares
to implement access control.

`share.use(action, fn)`
Register a new middleware.

* `action` _(String)_
  One of:
  * `'connect'`: A new client connected to the server.
  * `'op'`: An operation was loaded from the database.
  * `'readSnapshots'`: Snapshot(s) were loaded from the database for a fetch or subscribe of a query or document
  * `'query'`: A query is about to be sent to the database
  * `'submit'`: An operation is about to be submitted to the database
  * `'apply'`: An operation is about to be applied to a snapshot
    before being committed to the database
  * `'commit'`: An operation was applied to a snapshot; The operation
    and new snapshot are about to be written to the database.
  * `'afterSubmit'`: An operation was successfully submitted to
    the database.
  * `'receive'`: Received a message from a client
  * `'reply'`: About to send a non-error reply to a client message
* `fn` _(Function(context, callback))_
  Call this function at the time specified by `action`.
  * `context` will always have the following properties:
    * `action`: The action this middleware is hanlding
    * `agent`: A reference to the server agent handling this client
    * `backend`: A reference to this ShareDB backend instance
  * `context` can also have additional properties, as relevant for the action:
    * `collection`: The collection name being handled
    * `id`: The document id being handled
    * `op`: The op being handled
    * `req`: HTTP request being handled, if provided to `share.listen` (for 'connect')
    * `stream`: The duplex Stream provided to `share.listen` (for 'connect')
    * `query`: The query object being handled (for 'query')
    * `snapshots`: Array of retrieved snapshots (for 'readSnapshots')
    * `data`: Received client message (for 'receive')
    * `request`: Client message being replied to (for 'reply')
    * `reply`: Reply to be sent to the client (for 'reply')

### Projections

ShareDB supports exposing a *projection* of a real collection, with a specified (limited) set of allowed fields. Once configured, the projected collection looks just like a real collection - except documents only have the fields you've requested. Operations (gets, queries, sets, etc) on the fake collection work, but you only see a small portion of the data.

`addProjection(name, collection, fields)`
Configure a projection.

 * `name` The name of the projected collection.
 * `collection` The name of the existing collection.
 * `fields` A map (object) of the allowed fields in documents.
   * Keys are field names.
   * Values should be `true`.

For example, you could make a `users_limited` projection which lets users view each other's names and profile pictures, but not password hashes. You would configure this by calling:

```js
share.addProjection('users_limited', 'users', { name:true, profileUrl:true });
```

Note that only the [JSON0 OT type](https://github.com/ottypes/json0) is supported for projections.

### Logging

By default, ShareDB logs to `console`. This can be overridden if you wish to silence logs, or to log to your own logging driver or alert service.

Methods can be overridden by passing a [`console`-like object](https://developer.mozilla.org/en-US/docs/Web/API/console) to `logger.setMethods`:

```javascript
var ShareDB = require('sharedb');
ShareDB.logger.setMethods({
  info: () => {},                         // Silence info
  warn: () => alerts.warn(arguments),     // Forward warnings to alerting service
  error: () => alerts.critical(arguments) // Remap errors to critical alerts
});
```

ShareDB only supports the following logger methods:

  - `info`
  - `warn`
  - `error`

### Shutdown

`share.close(callback)`
Closes connections to the database and pub/sub adapters.

## Client API

The client API can be used from either Node or a browser. First, get a `ShareDB.Connection` object by connecting to the ShareDB server instance:

From Node:
```js
// `share` should be a ShareDB server instance
var connection = share.connect();
```

To use ShareDB from a browser, use a client bundler like Browserify or Webpack. The following
code connects to the ShareDB server instance over WebSockets:
```js
var ShareDB = require('@teamwork/sharedb/lib/client');
var socket = new WebSocket('ws://localhost:8080');
var connection = new ShareDB.Connection(socket);
```

For transports other than WebSockets, create an object implementing
the WebSocket specification and pass it into the `ShareDB.Connection` constructor.

### Class: `ShareDB.Connection`

`connection.get(collectionName, documentId)`
Get a [`ShareDB.Doc`](#class-sharedbdoc) instance on a given collection and document ID.

`connection.createFetchQuery(collectionName, query, options, callback)`
`connection.createSubscribeQuery(collectionName, query, options, callback)`
Get query results from the server. `createSubscribeQuery` also subscribes to
changes. Returns a [`ShareDB.Query`](#class-sharedbquery) instance.

* `query` _(Object)_
  A descriptor of a database query with structure defined by the database adapter.
* `callback` _(Function)_
  Called with `(err, results)` when server responds, or on error.
* `options.results` _(Array)_
  Prior query results if available, such as from server rendering.
* `options.*`
  All other options are passed through to the database adapter.

`connection.createUndoManager(options)` creates a new `UndoManager`.

* `options.source` if specified, only the operations from that `source` will be undo-able. If `null` or `undefined`, the `source` filter is disabled.
* `options.limit` the max number of operations to keep on the undo stack.
* `options.composeInterval` the max time difference between operations in milliseconds, which still allows the operations to be composed on the undo stack.

`connection.fetchSnapshot(collection, id, version, callback): void;`
Get a read-only snapshot of a document at the requested version.

* `collection` _(String)_
  Collection name of the snapshot
* `id` _(String)_
  ID of the snapshot
* `version` _(number) [optional]_
  The version number of the desired snapshot. If `null`, the latest version is fetched.
* `callback` _(Function)_
  Called with `(error, snapshot)`, where `snapshot` takes the following form:

  ```javascript
  {
    id: string;         // ID of the snapshot
    v: number;          // version number of the snapshot
    type: string;       // the OT type of the snapshot, or null if it doesn't exist or is deleted
    data: any;          // the snapshot
  }
  ```

`connection.fetchSnapshotByTimestamp(collection, id, timestamp, callback): void;`
Get a read-only snapshot of a document at the requested version.

* `collection` _(String)_
  Collection name of the snapshot
* `id` _(String)_
  ID of the snapshot
* `timestamp` _(number) [optional]_
  The timestamp of the desired snapshot. The returned snapshot will be the latest snapshot before the provided timestamp. If `null`, the latest version is fetched.
* `callback` _(Function)_
  Called with `(error, snapshot)`, where `snapshot` takes the following form:

  ```javascript
  {
    id: string;         // ID of the snapshot
    v: number;          // version number of the snapshot
    type: string;       // the OT type of the snapshot, or null if it doesn't exist or is deleted
    data: any;          // the snapshot
  }
  ```

### Class: `ShareDB.Doc`

`doc.type` _(String)_
The [OT type](https://github.com/teamwork/ot-docs) of this document

`doc.id` _(String)_
Unique document ID

`doc.data` _(Object)_
Document contents. Available after document is fetched or subscribed to.

`doc.presence` _(Object)_
Each property under `doc.presence` contains presence data shared by a client subscribed to this document. The property name is an empty string for this client's data and connection IDs for other clients' data.

`doc.fetch(function(err) {...})`
Populate the fields on `doc` with a snapshot of the document from the server.

`doc.subscribe(function(err) {...})`
Populate the fields on `doc` with a snapshot of the document from the server, and
fire events on subsequent changes.

`doc.ingestSnapshot(snapshot, callback)`
Ingest snapshot data. The `snapshot` param must include the fields `v` (doc version), `data`, and `type` (OT type). This method is generally called interally as a result of fetch or subscribe and not directly from user code. However, it may still be called directly from user code to pass data that was transferred to the client external to the client's ShareDB connection, such as snapshot data sent along with server rendering of a webpage.

`doc.destroy()`
Unsubscribe and stop firing events.

`doc.on('load', function() {...})`
The initial snapshot of the document was loaded from the server. Fires at the
same time as callbacks to `fetch` and `subscribe`.

`doc.on('create', function(source) {...})`
The document was created. Technically, this means it has a type. `source` will be `false` for ops received from the server and defaults to `true` for ops generated locally.

`doc.on('before op'), function(op, source) {...})`
An operation is about to be applied to the data. `source` will be `false` for ops received from the server and defaults to `true` for ops generated locally.

`doc.on('op', function(op, source) {...})`
An operation was applied to the data. `source` will be `false` for ops received from the server and defaults to `true` for ops generated locally.

`doc.on('del', function(data, source) {...})`
The document was deleted. Document contents before deletion are passed in as an argument. `source` will be `false` for ops received from the server and defaults to `true` for ops generated locally.

`doc.on('presence', function(srcList, submitted) {...})`
Presence data has changed. `srcList` is an Array of `doc.presence` property names for which values have changed. `submitted` is `true`, if the event is the result of new presence data being submitted by the local or remote user, otherwise it is `false` - eg if the presence data was transformed against an operation or was cleared on unsubscribe, disconnect or roll-back.

`doc.on('error', function(err) {...})`
There was an error fetching the document or applying an operation.

`doc.removeListener(eventName, listener)`
Removes any listener you added with `doc.on`. `eventName` should be one of `'load'`, `'create'`, `'before op'`, `'op'`, `'del'`, or `'error'`. `listener` should be the function you passed in as the second argument to `on`. Note that both `on` and `removeListener` are inherited from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

`doc.create(data[, type][, options][, function(err) {...}])`
Create the document locally and send create operation to the server.
* `data` Initial document contents
* `type` _([OT type](https://github.com/teamwork/ot-docs))_
  Defaults to `'ot-json0'`, for which `data` is an Object
* `options.source` Argument passed to the `'create'` event locally. This is not sent to the server or other clients. Defaults to `true`.

`doc.submitOp(op, [, options][, function(err) {...}])`
Apply operation to document and send it to the server.
`op` structure depends on the document type. See the
[operations for the default `'ot-json0'` type](https://github.com/ottypes/json0#summary-of-operations).
Call this after you've either fetched or subscribed to the document.
* `options.source` Argument passed to the `'op'` event locally. This is not sent to the server or other clients. Defaults to `true`.
* `options.skipNoop` Should processing be skipped entirely, if `op` is a no-op. Defaults to `false`.
* `options.undoable` Should it be possible to undo this operation. Defaults to `false`.
* `options.fixUp` If true, this operation is meant to fix the current invalid state of the snapshot. It also updates UndoManagers accordingly. This feature requires the OT type to implement `compose`.

`doc.submitSnapshot(snapshot[, options][, function(err) {...}])`
Diff the current and the provided snapshots to generate an operation, apply the operation to the document and send it to the server.
`snapshot` structure depends on the document type.
Call this after you've either fetched or subscribed to the document.
* `options.source` Argument passed to the `'op'` event locally. This is not sent to the server or other clients. Defaults to `true`.
* `options.skipNoop` Should processing be skipped entirely, if `op` is a no-op. Defaults to `false`.
* `options.undoable` Should it be possible to undo this operation. Defaults to `false`.
* `options.fixUp` If true, this operation is meant to fix the current invalid state of the snapshot. It also updates UndoManagers accordingly. This feature requires the OT type to implement `compose`.
* `options.diffHint` A hint passed into the `diff`/`diffX` functions defined by the document type.

`doc.del([options][, function(err) {...}])`
Delete the document locally and send delete operation to the server.
Call this after you've either fetched or subscribed to the document.
* `options.source` Argument passed to the `'del'` event locally. This is not sent to the server or other clients. Defaults to `true`.

`doc.whenNothingPending(function(err) {...})`
Invokes the given callback function after

 * all ops submitted via `doc.submitOp` have been sent to the server, and
 * all pending fetch, subscribe, and unsubscribe requests have been resolved.

Note that `whenNothingPending` does NOT wait for pending `model.query()` calls.

`doc.submitPresence(presenceData[, function(err) {...}])`
Set local presence data and publish it for other clients.

`presenceData` structure depends on the document type.
Presence is synchronized only when subscribed to the document.

### Class: `ShareDB.Query`

`query.ready` _(Boolean)_
True if query results are ready and available on `query.results`

`query.results` _(Array)_
Query results, as an array of [`ShareDB.Doc`](#class-sharedbdoc) instances.

`query.extra` _(Type depends on database adapter and query)_
Extra query results that aren't an array of documents. Available for certain database adapters and queries.

`query.on('ready', function() {...}))`
The initial query results were loaded from the server. Fires at the same time as
the callbacks to `createFetchQuery` and `createSubscribeQuery`.

`query.on('error', function(err) {...}))`
There was an error receiving updates to a subscription.

`query.destroy()`
Unsubscribe and stop firing events.

`query.on('changed', function(results) {...}))`
(Only fires on subscription queries) The query results changed. Fires only once
after a sequence of diffs are handled.

`query.on('insert', function(docs, atIndex) {...}))`
(Only fires on subscription queries) A contiguous sequence of documents were added to the query result array.

`query.on('move', function(docs, from, to) {...}))`
(Only fires on subscription queries) A contiguous sequence of documents moved position in the query result array.

`query.on('remove', function(docs, atIndex) {...}))`
(Only fires on subscription queries) A contiguous sequence of documents were removed from the query result array.

`query.on('extra', function() {...}))`
(Only fires on subscription queries) `query.extra` changed.

### Class: `ShareDB.UndoManager`

`undoManager.canUndo()`
Return `true`, if there's an operation on the undo stack that can be undone, otherwise `false`.

`undoManager.undo([options][, function(err) {...}])`
Undo a previously applied undoable or redo operation.
* `options.source` Argument passed to the `'op'` event locally. This is not sent to the server or other clients. Defaults to `true`.

`undoManager.canRedo()`
Return `true`, if there's an operation on the redo stack that can be undone, otherwise `false`.

`undoManager.redo([options][, function(err) {...}])`
Redo a previously applied undo operation.
* `options.source` Argument passed to the `'op'` event locally. This is not sent to the server or other clients. Defaults to `true`.

`undoManager.clear(doc)`
Remove operations from the undo and redo stacks.
* `doc` if specified, only the operations on that doc are removed, otherwise all operations are removed.

`undoManager.destroy()`
Remove all operations from the undo and redo stacks, and stop recording new operations.

### Logging

By default, ShareDB logs to `console`. This can be overridden if you wish to silence logs, or to log to your own logging driver or alert service.

Methods can be overridden by passing a [`console`-like object](https://developer.mozilla.org/en-US/docs/Web/API/console) to `logger.setMethods`

```javascript
var ShareDB = require('sharedb/lib/client');
ShareDB.logger.setMethods({
  info: () => {},                         // Silence info
  warn: () => alerts.warn(arguments),     // Forward warnings to alerting service
  error: () => alerts.critical(arguments) // Remap errors to critical alerts
});
```

ShareDB only supports the following logger methods:

  - `info`
  - `warn`
  - `error`


## Error codes

ShareDB returns errors as plain JavaScript objects with the format:
```
{
  code: 5000,
  message: 'ShareDB internal error'
}
```

Additional fields may be added to the error object for debugging context depending on the error. Common additional fields include `collection`, `id`, and `op`.

### 4000 - Bad request

* 4001 - Unknown error type
* 4002 - Database adapter does not support subscribe
* 4003 - Database adapter not found
* 4004 - Missing op
* 4005 - Op must be an array
* 4006 - Create data in op must be an object
* 4007 - Create op missing type
* 4008 - Unknown type
* 4009 - del value must be true
* 4010 - Missing op, create or del
* 4011 - Invalid src
* 4012 - Invalid seq
* 4013 - Found seq but not src
* 4014 - op.m invalid
* 4015 - Document does not exist
* 4016 - Document already exists
* 4017 - Document was deleted
* 4018 - Document was created remotely
* 4019 - Invalid protocol version
* 4020 - Invalid default type
* 4021 - Invalid client id
* 4022 - Database adapter does not support queries
* 4023 - Cannot project snapshots of this type
* 4024 - Invalid version
* 4025 - Not subscribed to document
* 4026 - Presence data superseded
* 4027 - OT Type does not support `diff` nor `diffX`
* 4028 - OT Type does not support `invert` nor `applyAndInvert`
* 4029 - OT Type does not support presence

### 5000 - Internal error

The `41xx` and `51xx` codes are reserved for use by ShareDB DB adapters, and the `42xx` and `52xx` codes are reserved for use by ShareDB PubSub adapters.

* 5001 - No new ops returned when retrying unsuccessful submit
* 5002 - Missing snapshot
* 5003 - Snapshot and op version don't match
* 5004 - Missing op
* 5005 - Missing document
* 5006 - Version mismatch
* 5007 - Invalid state transition
* 5008 - Missing version in snapshot
* 5009 - Cannot ingest snapshot with null version
* 5010 - No op to send
* 5011 - Commit DB method unimplemented
* 5012 - getSnapshot DB method unimplemented
* 5013 - getOps DB method unimplemented
* 5014 - queryPollDoc DB method unimplemented
* 5015 - _subscribe PubSub method unimplemented
* 5016 - _unsubscribe PubSub method unimplemented
* 5017 - _publish PubSub method unimplemented
* 5018 - Required QueryEmitter listener not assigned
* 5019 - getMilestoneSnapshot MilestoneDB method unimplemented
* 5020 - saveMilestoneSnapshot MilestoneDB method unimplemented
* 5021 - getMilestoneSnapshotAtOrBeforeTime MilestoneDB method unimplemented
* 5022 - getMilestoneSnapshotAtOrAfterTime MilestoneDB method unimplemented
