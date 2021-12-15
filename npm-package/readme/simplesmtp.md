# simplesmtp

## DEPRECATION NOTICE

This module is deprecated. For SMTP servers use [smtp-server](https://github.com/andris9/smtp-server), for SMTP clients use [smtp-connection](https://www.npmjs.org/package/smtp-connection). Alternatively, for full featured SMTP server applications, you should use [Haraka](https://www.npmjs.org/package/Haraka).

--------

Simplesmtp is a module written for Node v0.6 and slightly updated for Node v0.8. It does not use Node v0.10 streams and probably is going to have a rocky future with Node v0.12. I do not have time to keep it up to date, the thing probably needs a major rewrite for Node v0.12.

Should be fine though for integration testing purposes.

## Info

This is a module to easily create custom SMTP servers and clients - use SMTP as a first class protocol in Node.JS!

[![Build Status](https://secure.travis-ci.org/andris9/simplesmtp.png)](http://travis-ci.org/andris9/simplesmtp)
[![NPM version](https://badge.fury.io/js/simplesmtp.png)](http://badge.fury.io/js/simplesmtp)

## Version warning!

If you are using node v0.6, then the last usable version of **simplesmtp** is v0.2.7

Current version of simplesmtp is fully supported for Node v0.8+

ˇ## SMTP Server

## Simple SMTP server

For a simple inbound only, no authentication SMTP server you can use

    simplesmtp.createSimpleServer([options], requestListener).listen(port);

Example

    simplesmtp.createSimpleServer({SMTPBanner:"My Server"}, function(req){
        req.pipe(process.stdout);
        req.accept();
    }).listen(port);

Properties

  * **req.from** - From address
  * **req.to** - an array of To addresses
  * **req.host** - hostname reported by the client
  * **req.remodeAddress** - client IP address

Methods

  * **req.accept** *([id])* - Accept the message with the selected ID
  * **req.reject** *([message])* - Reject the message with the selected message
  * **req.pipe** *(stream)* - Pipe the incoming data to a writable stream

Events

  * **'data'** *(chunk)* - A chunk (Buffer) of the message.
  * **'end'** - The message has been transferred


## Advanced SMTP server

### Usage

Create a new SMTP server instance with

    var smtp = simplesmtp.createServer([options]);

And start listening on selected port

    smtp.listen(25, [function(err){}]);

SMTP options can include the following:

  * **name** - the hostname of the server, will be used for informational messages
  * **debug** - if set to true, print out messages about the connection
  * **timeout** - client timeout in milliseconds, defaults to 60 000 (60 sec.)
  * **secureConnection** - start a server on secure connection
  * **SMTPBanner** - greeting banner that is sent to the client on connection
  * **requireAuthentication** - if set to true, require that the client must authenticate itself
  * **enableAuthentication** - if set to true, client may authenticate itself but don't have to (as opposed to `requireAuthentication` that explicitly requires clients to authenticate themselves)
  * **maxSize** - maximum size of an e-mail in bytes (currently informational only)
  * **credentials** - TLS credentials (`{key:'', cert:'', ca:['']}`) for the server
  * **authMethods** - allowed authentication methods, defaults to `["PLAIN", "LOGIN"]`
  * **disableEHLO** - if set to true, support HELO command only
  * **ignoreTLS** - if set to true, allow client do not use STARTTLS
  * **disableDNSValidation** - if set, do not validate sender domains
  * **disableSTARTTLS** - if set, do not use STARTTLS

### Example

    var simplesmtp = require("simplesmtp"),
        fs = require("fs");

    var smtp = simplesmtp.createServer();
    smtp.listen(25);

    smtp.on("startData", function(connection){
        console.log("Message from:", connection.from);
        console.log("Message to:", connection.to);
        connection.saveStream = fs.createWriteStream("/tmp/message.txt");
    });

    smtp.on("data", function(connection, chunk){
        connection.saveStream.write(chunk);
    });

    smtp.on("dataReady", function(connection, callback){
        connection.saveStream.end();
        console.log("Incoming message saved to /tmp/message.txt");
        callback(null, "ABC1"); // ABC1 is the queue id to be advertised to the client
        // callback(new Error("Rejected as spam!")); // reported back to the client
    });

### Events

  * **startData** *(connection)* - DATA stream is opened by the client (`connection` is an object with `from`, `to`, `host` and `remoteAddress` properties)
  * **data** *(connection, chunk)* - e-mail data chunk is passed from the client
  * **dataReady** *(connection, callback)* - client is finished passing e-mail data, `callback` returns the queue id to the client
  * **authorizeUser** *(connection, username, password, callback)* - will be emitted if `requireAuthentication` option is set to true. `callback` has two parameters *(err, success)* where `success` is Boolean and should be true, if user is authenticated successfully
  * **validateSender** *(connection, email, callback)* - will be emitted if `validateSender` listener is set up
  * **validateRecipient** *(connection, email, callback)* - will be emitted it `validataRecipients` listener is set up
  * **close** *(connection)* - emitted when the connection to client is closed

## SMTP Client

### Usage

SMTP client can be created with `simplesmtp.connect(port[,host][, options])`
where

  * **port** is the port to connect to
  * **host** is the hostname to connect to (defaults to "localhost")
  * **options** is an optional options object (see below)

### Connection options

The following connection options can be used with `simplesmtp.connect`:

  * **secureConnection** - use SSL
  * **name** - the name of the client server
  * **auth** - authentication object `{user:"...", pass:"..."}` or `{XOAuthToken:"base64data"}`
  * **ignoreTLS** - ignore server support for STARTTLS
  * **tls** - optional options object for `tls.connect`, also applies to STARTTLS. For example `rejectUnauthorized` is set to `false` by default. You can override this option by setting `tls: {rejectUnauthorized: true}`
  * **debug** - output client and server messages to console
  * **logFile** - optional filename where communication with remote server has to be logged
  * **instanceId** - unique instance id for debugging (will be output console with the messages)
  * **localAddress** - local interface to bind to for network connections (needs Node.js >= 0.11.3 for working with tls)
  * **greetingTimeout** (defaults to 10000) - Time to wait in ms until greeting message is received from the server
  * **connectionTimeout** (system default if not set) - Time to wait in ms until the socket is opened to the server
  * **socketTimeout** (defaults to 1 hour) - Time of inactivity until the connection is closed
  * **rejectUnathorized** (defaults to false) - if set to true accepts only valid server certificates. You can override this option with the `tls` option, this is just a shorthand
  * **dsn** - An object with methods `success`, `failure` and `delay`. If any of these are set to true, DSN will be used
  * **enableDotEscaping** set to true if you want to escape dots at the begining of each line. Defaults to false.

### Connection events

Once a connection is set up the following events can be listened to:

  * **'idle'** - the connection to the SMTP server has been successfully set up and the client is waiting for an envelope
  * **'message'** - the envelope is passed successfully to the server and a message stream can be started
  * **'ready'** `(success)` - the message was sent
  * **'rcptFailed'** `(addresses)` - not all recipients were accepted (invalid addresses are included as an array)
  * **'error'** `(err, stage)` - An error occurred. The connection is closed and an 'end' event is emitted shortly. Second argument indicates on which SMTP session stage an error occured.
  * **'end'** - connection to the client is closed

### Sending an envelope

When an `'idle'` event is emitted, an envelope object can be sent to the server.
This includes a string `from` and an array of strings `to` property.

Envelope can be sent with `client.useEnvelope(envelope)`

    // run only once as 'idle' is emitted again after message delivery
    client.once("idle", function(){
        client.useEnvelope({
            from: "me@example.com",
            to: ["receiver1@example.com", "receiver2@example.com"]
        });
    });

The `to` part of the envelope includes **all** recipients from `To:`, `Cc:` and `Bcc:` fields.

If setting the envelope up fails, an error is emitted. If only some (not all)
recipients are not accepted, the mail can still be sent but an `rcptFailed`
event is emitted.

    client.on("rcptFailed", function(addresses){
        console.log("The following addresses were rejected: ", addresses);
    });

If the envelope is set up correctly a `'message'` event is emitted.

### Sending a message

When `'message'` event is emitted, it is possible to send mail. To do this
you can pipe directly a message source (for example an .eml file) to the client
or alternatively you can send the message with `client.write` calls (you also
need to call `client.end()` once the message is completed.

If you are piping a stream to the client, do not leave the `'end'` event out,
this is needed to complete the message sequence by the client.

    client.on("message", function(){
        fs.createReadStream("test.eml").pipe(client);
    });

Once the message is delivered a `'ready'` event is emitted. The event has an
parameter which indicates if the message was transmitted( (true) or not (false)
and another which includes the last received data from the server.

    client.on("ready", function(success, response){
        if(success){
            console.log("The message was transmitted successfully with "+response);
        }
    });

### XOAUTH

**simplesmtp** supports [XOAUTH2 and XOAUTH](https://developers.google.com/google-apps/gmail/oauth_protocol) authentication.

#### XOAUTH2

To use this feature you can set `XOAuth2` param as an `auth` option

    var mailOptions = {
        ...,
        auth:{
            XOAuth2: {
                user: "example.user@gmail.com",
                clientId: "8819981768.apps.googleusercontent.com",
                clientSecret: "{client_secret}",
                refreshToken: "1/xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI",
                accessToken: "vF9dft4qmTc2Nvb3RlckBhdHRhdmlzdGEuY29tCg==",
                timeout: 3600
            }
        }
    }

`accessToken` and `timeout` values are optional. If login fails a new access token is generated automatically.

#### XOAUTH

To use this feature you can set `XOAuthToken` param as an `auth` option

    var mailOptions = {
        ...,
        auth:{
            XOAuthToken: "R0VUIGh0dHBzOi8vbWFpbC5nb29...."
        }
    }

Alternatively it is also possible to use XOAuthToken generators (supported by Nodemailer) - this
needs to be an object with a mandatory method `generate` that takes a callback function for
generating a XOAUTH token string. This is better for generating tokens only when needed -
there is no need to calculate unique token for every e-mail request, since a lot of these
might share the same connection and thus the cleint needs not to re-authenticate itself
with another token.

    var XOGen = {
        token: "abc",
        generate: function(callback){
            if(1 != 1){
                return callback(new Error("Tokens can't be generated in strange environments"));
            }
            callback(null, new Buffer(this.token, "utf-8").toString("base64"));
        }
    }

    var mailOptions = {
        ...,
        auth:{
            XOAuthToken: XOGen
        }
    }

### Error types

Emitted errors include the reason for failing in the `name` property

  * **UnknowAuthError** - the client tried to authenticate but the method was not supported
  * **AuthError** - the username/password used were rejected
  * **TLSError** - STARTTLS failed
  * **SenderError** - the sender e-mail address was rejected
  * **RecipientError** - all recipients were rejected (if only some of the recipients are rejected, a `'rcptFailed'` event is raised instead

There's also an additional property in the error object called `data` that includes
the last response received from the server (if available for the current error type).

### About reusing the connection

You can reuse the same connection several times but you can't send a mail
through the same connection concurrently. So if you catch and `'idle'` event
lock the connection to a message process and unlock after `'ready'`.

On `'error'` events you should reschedule the message and on `'end'` events
you should recreate the connection.

### Closing the client

By default the client tries to keep the connection up. If you want to close it,
run `client.quit()` - this sends a `QUIT` command to the server and closes the
connection

    client.quit();

## SMTP Client Connection pool

**simplesmtp** has the option for connection pooling if you want to reuse a bulk
of connections.

### Usage

Create a connection pool of SMTP clients with

    simplesmtp.createClientPool(port[,host][, options])

where

  * **port** is the port to connect to
  * **host** is the hostname to connect to (defaults to "localhost")
  * **options** is an optional options object (see below)

### Connection options

The following connection options can be used with `simplesmtp.connect`:

  * **secureConnection** - use SSL
  * **name** - the name of the client server
  * **auth** - authentication object `{user:"...", pass:"..."}` or  `{XOAuthToken:"base64data"}`
  * **ignoreTLS** - ignore server support for STARTTLS
  * **debug** - output client and server messages to console
  * **logFile** - optional filename where communication with remote server has to be logged
  * **maxConnections** - how many connections to keep in the pool (defaults to 5)
  * **localAddress** - local interface to bind to for network connections (needs Node.js >= 0.11.3 for working with tls)
  * **maxMessages** - limit the count of messages to send through a single connection (no limit by default)

### Send an e-mail

E-mails can be sent through the pool with

    pool.sendMail(mail[, callback])

where

  * **mail** is a [MailComposer](https://github.com/andris9/mailcomposer) compatible object
  * **callback** `(error, responseObj)` - is the callback function to run after the message is delivered or an error occured. `responseObj` may include `failedRecipients` which is an array with e-mail addresses that were rejected and `message` which is the last response from the server.

### Errors

In addition to SMTP client errors another error name is used

  * **DeliveryError** - used if the message was not accepted by the SMTP server

## License

**MIT**

