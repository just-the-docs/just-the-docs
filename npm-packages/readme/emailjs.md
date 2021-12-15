# emailjs [![Test Status](https://github.com/eleith/emailjs/workflows/.github/workflows/test.yml/badge.svg)](https://github.com/eleith/emailjs/actions?query=workflow%3A.github%2Fworkflows%2Ftest.yml) [![Lint Status](https://github.com/eleith/emailjs/workflows/.github/workflows/lint.yml/badge.svg)](https://github.com/eleith/emailjs/actions?query=workflow%3A.github%2Fworkflows%2Flint.yml)

send emails, html and attachments (files, streams and strings) from node.js to any smtp server

## INSTALLING

    npm install emailjs

## FEATURES

- works with SSL and TLS smtp servers
- supports smtp authentication ('PLAIN', 'LOGIN', 'CRAM-MD5', 'XOAUTH2')
- emails are queued and the queue is sent asynchronously
- supports sending html emails and emails with multiple attachments (MIME)
- attachments can be added as strings, streams or file paths
- supports utf-8 headers and body
- built-in type declarations
- automatically handles [greylisting](http://projects.puremagic.com/greylisting/whitepaper.html)

## REQUIRES

- auth access to an SMTP Server
- if your service (ex: gmail) uses two-step authentication, use an application specific password

## EXAMPLE USAGE - text only emails

```js
import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp.your-email.com',
	ssl: true,
});

// send the message and get a callback with an error or details of the message that was sent
client.send(
	{
		text: 'i hope this works',
		from: 'you <username@your-email.com>',
		to: 'someone <someone@your-email.com>, another <another@your-email.com>',
		cc: 'else <else@your-email.com>',
		subject: 'testing emailjs',
	},
	(err, message) => {
		console.log(err || message);
	}
);
```

## EXAMPLE USAGE - using async/await

```js
// assuming top-level await for brevity
import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp.your-email.com',
	ssl: true,
});

try {
	const message = await client.sendAsync({
		text: 'i hope this works',
		from: 'you <username@your-email.com>',
		to: 'someone <someone@your-email.com>, another <another@your-email.com>',
		cc: 'else <else@your-email.com>',
		subject: 'testing emailjs',
	});
	console.log(message);
} catch (err) {
	console.error(err);
}
```

## EXAMPLE USAGE - html emails and attachments

```js
import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp.your-email.com',
	ssl: true,
});

const message = {
	text: 'i hope this works',
	from: 'you <username@your-email.com>',
	to: 'someone <someone@your-email.com>, another <another@your-email.com>',
	cc: 'else <else@your-email.com>',
	subject: 'testing emailjs',
	attachment: [
		{ data: '<html>i <i>hope</i> this works!</html>', alternative: true },
		{ path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
	],
};

// send the message and get a callback with an error or details of the message that was sent
client.send(message, function (err, message) {
	console.log(err || message);
});

// you can continue to send more messages with successive calls to 'client.send',
// they will be queued on the same smtp connection

// or instead of using the built-in client you can create an instance of 'smtp.SMTPConnection'
```

## EXAMPLE USAGE - sending through outlook

```js
import { SMTPClient, Message } from 'emailjs';

const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp-mail.outlook.com',
	tls: {
		ciphers: 'SSLv3',
	},
});

const message = new Message({
	text: 'i hope this works',
	from: 'you <username@outlook.com>',
	to: 'someone <someone@your-email.com>, another <another@your-email.com>',
	cc: 'else <else@your-email.com>',
	subject: 'testing emailjs',
	attachment: [
		{ data: '<html>i <i>hope</i> this works!</html>', alternative: true },
		{ path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
	],
});

// send the message and get a callback with an error or details of the message that was sent
client.send(message, (err, message) => {
	console.log(err || message);
});
```

## EXAMPLE USAGE - attaching and embedding an image

```js
import { SMTPClient, Message } from 'emailjs';

const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp-mail.outlook.com',
	tls: {
		ciphers: 'SSLv3',
	},
});

const message = new Message({
	text: 'i hope this works',
	from: 'you <username@outlook.com>',
	to: 'someone <someone@your-email.com>, another <another@your-email.com>',
	cc: 'else <else@your-email.com>',
	subject: 'testing emailjs',
	attachment: [
		{
			data:
				'<html>i <i>hope</i> this works! here is an image: <img src="cid:my-image" width="100" height ="50"> </html>',
		},
		{ path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
		{
			path: 'path/to/image.jpg',
			type: 'image/jpg',
			headers: { 'Content-ID': '<my-image>' },
		},
	],
});

// send the message and get a callback with an error or details of the message that was sent
client.send(message, (err, message) => {
	console.log(err || message);
});
```

# API

## new SMTPClient(options)

```js
// options is an object with the following recognized schema:
const options = {
	user, // username for logging into smtp
	password, // password for logging into smtp
	host, // smtp host (defaults to 'localhost')
	port, // smtp port (defaults to 25 for unencrypted, 465 for `ssl`, and 587 for `tls`)
	ssl, // boolean or object (if true or object, ssl connection will be made)
	tls, // boolean or object (if true or object, starttls will be initiated)
	timeout, // max number of milliseconds to wait for smtp responses (defaults to 5000)
	domain, // domain to greet smtp with (defaults to os.hostname)
	authentication, // array of preferred authentication methods ('PLAIN', 'LOGIN', 'CRAM-MD5', 'XOAUTH2')
	logger, // override the built-in logger (useful for e.g. Azure Function Apps, where console.log doesn't work)
};
// ssl/tls objects are an abbreviated form of [`tls.connect`](https://nodejs.org/dist/latest-v14.x/docs/api/tls.html#tls_tls_connect_options_callback)'s options
// the missing items are: `port`, `host`, `path`, `socket`, `timeout` and `secureContext`
// NOTE: `host` is trimmed before being used to establish a connection;
// however, the original untrimmed value will still be visible in configuration.
```

## SMTPClient#send(message, callback)

```js
// message can be a smtp.Message (as returned by email.message.create)
// or an object identical to the first argument accepted by email.message.create

// callback will be executed with (err, message)
// either when message is sent or an error has occurred
```

## new Message(headers)

```js
// headers is an object with the following recognized schema:
const headers = {
	from, // sender of the format (address or name <address> or "name" <address>)
	to, // recipients (same format as above), multiple recipients are separated by a comma
	cc, // carbon copied recipients (same format as above)
	bcc, // blind carbon copied recipients (same format as above)
	text, // text of the email
	subject, // string subject of the email
	attachment, // one attachment or array of attachments
};
// the `from` field is required.
// at least one `to`, `cc`, or `bcc` header is also required.
// you can also add whatever other headers you want.
```

## Message#attach(options)

Can be called multiple times, each adding a new attachment.

```js
// options is an object with the following recognized schema:
const options = {
	// one of these fields is required
	path, // string to where the file is located
	data, // string of the data you want to attach
	stream, // binary stream that will provide attachment data (make sure it is in the paused state)
	// better performance for binary streams is achieved if buffer.length % (76*6) == 0
	// current max size of buffer must be no larger than Message.BUFFERSIZE

	// optionally these fields are also accepted
	type, // string of the file mime type
	name, // name to give the file as perceived by the recipient
	charset, // charset to encode attatchment in
	method, // method to send attachment as (used by calendar invites)
	alternative, // if true, will be attached inline as an alternative (also defaults type='text/html')
	inline, // if true, will be attached inline
	encoded, // set this to true if the data is already base64 encoded, (avoid this if possible)
	headers, // object containing header=>value pairs for inclusion in this attachment's header
	related, // an array of attachments that you want to be related to the parent attachment
};
```

## Message#checkValidity()

Synchronously validate that a Message is properly formed.

```js
const message = new Message(options);
const { isValid, validationError } = message.checkValidity();
if (isValid) {
	// ...
} else {
	// first error encountered
	console.error(validationError);
}
```

## new SMTPConnection(options={})

```js
// options is an object with the following recognized schema:
const options = {
	user, // username for logging into smtp
	password, // password for logging into smtp
	host, // smtp host (defaults to 'localhost')
	port, // smtp port (defaults to 25 for unencrypted, 465 for `ssl`, and 587 for `tls`)
	ssl, // boolean or object (if true or object, ssl connection will be made)
	tls, // boolean or object (if true or object, starttls will be initiated)
	timeout, // max number of milliseconds to wait for smtp responses (defaults to 5000)
	domain, // domain to greet smtp with (defaults to os.hostname)
	authentication, // array of preferred authentication methods ('PLAIN', 'LOGIN', 'CRAM-MD5', 'XOAUTH2')
	logger, // override the built-in logger (useful for e.g. Azure Function Apps, where console.log doesn't work)
};
// ssl/tls objects are an abbreviated form of [`tls.connect`](https://nodejs.org/dist/latest-v14.x/docs/api/tls.html#tls_tls_connect_options_callback)'s options
// the missing items are: `port`, `host`, `path`, `socket`, `timeout` and `secureContext`
// NOTE: `host` is trimmed before being used to establish a connection;
// however, the original untrimmed value will still be visible in configuration.
```

To target a Message Transfer Agent (MTA), omit all options.

## SMTPConnection#authentication

associative array of currently supported SMTP authentication mechanisms

## Authors

eleith
zackschuster

## Testing

    npm install -d
    npm test

## Contributions

issues and pull requests are welcome
