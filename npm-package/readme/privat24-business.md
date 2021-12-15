# privat24-business

`privat24-business` is a simple application for accessing your account statements from [Privat24 online-banking for business clients](http://cb.pb.ua).
It use an open Privat24 API and allow you to easily manage your statements without any restrictions.

![Screenshot](screenshot.png)

## Installing:

You need to install [node.js](http://nodejs.org) first. Once you have it, install `privat24-business` with command:

    npm install p24b -g

This will install application globally so that it may be run from the command line.

## Usage:

    p24b [options]

Once successfully started, the application will be available on the host computer at `http://127.0.0.1:8081`
and your default browser will start with this url.

### Available options

* `--port=` Application server port (default: `8081`)
* `--no-browser` Don't open browser, just start application server
* `--p24:host=` Privat24 API hostname (default: `"client-bank.privatbank.ua"`)
* `--p24:port=` Privat24 API port (default: `443`)

## License

[MIT license](LICENSE)
