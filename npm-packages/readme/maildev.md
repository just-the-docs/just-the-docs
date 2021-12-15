# MailDev

[![Test](https://github.com/maildev/maildev/actions/workflows/test.yml/badge.svg)](https://github.com/maildev/maildev/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/maildev/maildev/branch/master/graph/badge.svg)](https://codecov.io/gh/maildev/maildev)
[![NPM Version](https://img.shields.io/npm/v/maildev.svg)](https://www.npmjs.com/package/maildev)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**MailDev** is a simple way to test your project's generated emails during development with an easy to use web interface that runs on your machine. Built on top of [Node.js](http://www.nodejs.org).

![MailDev Screenshot](https://github.com/maildev/maildev/blob/gh-pages/images/screenshot-2021-01-03.png?raw=true)

## Install & Run

    $ npm install -g maildev
    $ maildev

If you want to use MailDev with [Docker](https://www.docker.com/), you can use the
[**maildev/maildev** image on Docker Hub](https://hub.docker.com/r/maildev/maildev).
For a guide for usage with Docker,
[checkout the docs](https://github.com/maildev/maildev/blob/master/docs/docker.md).

    $ docker run -p 1080:1080 -p 1025:1025 maildev/maildev

For convenient use with Grunt, try [grunt-maildev](https://github.com/xavierpriour/grunt-maildev).

## Usage

```
Usage: maildev [options]
```

| Options                          | Environment variable       | Description                                                                               |
| -------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| `-s, --smtp <port>`              | `MAILDEV_SMTP_PORT`        | SMTP port to catch emails                                                                 |
| `-w, --web <port>`               | `MAILDEV_WEB_PORT`         | Port to run the Web GUI                                                                   |
| `--mail-directory <path>`        | `MAILDEV_MAIL_DIRECTORY`   | Directory for persisting mails                                                            |
| `--https`                        | `MAILDEV_HTTPS`            | Switch from http to https protocol                                                        |
| `--https-key <file>`             | `MAILDEV_HTTPS_KEY`        | The file path to the ssl private key                                                      |
| `--https-cert <file>`            | `MAILDEV_HTTPS_CERT`       | The file path to the ssl cert file                                                        |
| `--ip <ip address>`              | `MAILDEV_IP`               | IP Address to bind SMTP service to                                                        |
| `--outgoing-host <host>`         | `MAILDEV_OUTGOING_HOST`    | SMTP host for outgoing emails                                                             |
| `--outgoing-port <port>`         | `MAILDEV_OUTGOING_PORT`    | SMTP port for outgoing emails                                                             |
| `--outgoing-user <user>`         | `MAILDEV_OUTGOING_USER`    | SMTP user for outgoing emails                                                             |
| `--outgoing-pass <password>`     | `MAILDEV_OUTGOING_PASS`    | SMTP password for outgoing emails                                                         |
| `--outgoing-secure`              | `MAILDEV_OUTGOING_SECURE`  | Use SMTP SSL for outgoing emails                                                          |
| `--auto-relay [email]`           | `MAILDEV_AUTO_RELAY`       | Use auto-relay mode. Optional relay email address                                         |
| `--auto-relay-rules <file>`      | `MAILDEV_AUTO_RELAY_RULES` | Filter rules for auto relay mode                                                          |
| `--incoming-user <user>`         | `MAILDEV_INCOMING_USER`    | SMTP user for incoming emails                                                             |
| `--incoming-pass <pass>`         | `MAILDEV_INCOMING_PASS`    | SMTP password for incoming emails                                                         |
| `--web-ip <ip address>`          | `MAILDEV_WEB_IP`           | IP Address to bind HTTP service to, defaults to --ip                                      |
| `--web-user <user>`              | `MAILDEV_WEB_USER`         | HTTP user for GUI                                                                         |
| `--web-pass <password>`          | `MAILDEV_WEB_PASS`         | HTTP password for GUI                                                                     |
| `--base-pathname <path>`         | `MAILDEV_BASE_PATHNAME`    | Base path for URLs                                                                        |
| `--disable-web`                  | `MAILDEV_DISABLE_WEB`      | Disable the use of the web interface. Useful for unit testing                             |
| `--hide-extensions <extensions>` | `MAILDEV_HIDE_EXTENSIONS`  | Comma separated list of SMTP extensions to NOT advertise (SMTPUTF8, PIPELINING, 8BITMIME) |
| `-o, --open`                     |                            | Open the Web GUI after startup                                                            |
| `-v, --verbose`                  |                            |                                                                                           |
| `--silent`                       |                            |                                                                                           |

## API

MailDev can be used in your Node.js application. For more info view the
[API docs](https://github.com/maildev/maildev/blob/master/docs/api.md).

```javascript
const MailDev = require("maildev");

const maildev = new MailDev();

maildev.listen();

maildev.on("new", function (email) {
  // We got a new email!
});
```

MailDev also has a **REST API**. For more info
[view the docs](https://github.com/maildev/maildev/blob/master/docs/rest.md).

## Outgoing email

Maildev optionally supports selectively relaying email to an outgoing SMTP server. If you configure outgoing
email with the --outgoing-* options you can click "Relay" on an individual email to relay through MailDev out
to a real SMTP service that will *actually\* send the email to the recipient.

Example:

    $ maildev --outgoing-host smtp.gmail.com \
              --outgoing-secure \
              --outgoing-user 'you@gmail.com' \
              --outgoing-pass '<pass>'

### Auto relay mode

Enabling the auto relay mode will automatically send each email to it's recipient
without the need to click the "Relay" button mentioned above.
The outgoing email options are required to enable this feature.

Optionally you may pass an single email address which Maildev will forward all
emails to instead of the original recipient. For example, using
`--auto-relay you@example.com` will forward all emails to that address
automatically.

Additionally, you can pass a valid json file with additional configuration for
what email addresses you would like to `allow` or `deny`. The last matching
rule in the array will be the rule MailDev will follow.

Example:

    $ maildev --outgoing-host smtp.gmail.com \
              --outgoing-secure \
              --outgoing-user 'you@gmail.com' \
              --outgoing-pass '<pass>' \
              --auto-relay \
              --auto-relay-rules file.json

Rules example file:

```javascript
[
  { allow: "*" },
  { deny: "*@test.com" },
  { allow: "ok@test.com" },
  { deny: "*@utah.com" },
  { allow: "johnny@utah.com" },
];
```

This would allow `angelo@fbi.gov`, `ok@test.com`, `johnny@utah.com`, but deny
`bodhi@test.com`.

## Configure your project

Configure your application to send emails via port `1025` and open `localhost:1080` in your browser.

**Nodemailer (v1.0+)**

```javascript
const transport = nodemailer.createTransport({
  port: 1025,
  ignoreTLS: true,
  // other settings...
});
```

**Django** -- Add `EMAIL_PORT = 1025` in your settings file [[source]](https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-EMAIL_PORT)

**Rails** -- config settings:

```ruby
config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
        address: "localhost",
        port: 1025,
        enable_starttls_auto: false
    }
```

**Drupal** -- Install and configure [SMTP](https://www.drupal.org/project/smtp) module or use a library like [SwiftMailer](http://swiftmailer.org/).

## Features

- Toggle between HTML, plain text views as well as view email headers
- Test responsive emails with resizable preview pane available for various screen sizes
- Ability to receive and view email attachments
- WebSocket integration keeps the interface in sync once emails are received
- Command line interface for configuring SMTP and web interface ports
- Ability to relay email to an upstream SMTP server

## Ideas

If you're using MailDev and you have a great idea, I'd love to hear it. If you're not using MailDev because it lacks a feature, I'd love to hear that too. Add an issue to the repo [here](https://github.com/maildev/maildev/issues/new).

## Contributing

Any help on MailDev would be awesome. There is plenty of room for improvement. Feel free to [create a Pull Request](https://github.com/maildev/maildev/issues/new) from small to big changes.

To run **MailDev** during development:

    npm install
    npm run dev

The "dev" task will run MailDev using nodemon and restart automatically when
changes are detected. On `*.scss` file save, the css will also be recompiled.
Using `test/send.js`, a few test emails will be sent every time the application
restarts.

The project uses the [JavaScript Standard coding style](https://standardjs.com).
To lint your code before submitting your PR, run `npm run lint`.

To run the test suite:

    $ npm test

## [Changelog](https://github.com/maildev/maildev/releases)

## Thanks

**MailDev** is built on using great open source projects including
[Express](http://expressjs.com),
[AngularJS](http://angularjs.org/),
[Font Awesome](http://fontawesome.io/) and two great projects from
[Andris Reinman](https://github.com/andris9):
[smtp-server](https://github.com/nodemailer/smtp-server)
and [mailparser](https://github.com/nodemailer/mailparser).
Many thanks to Andris as his projects are the backbone of this app and to
[MailCatcher](http://mailcatcher.me/) for the inspiration.

Additionally, thanks to all the awesome [contributors](https://github.com/maildev/maildev/graphs/contributors)
to the project.

## License

MIT
