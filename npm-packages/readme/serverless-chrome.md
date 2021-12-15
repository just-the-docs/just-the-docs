# serverless-chrome

Serverless Chrome contains everything you need to get started running headless
Chrome on AWS Lambda (possibly Azure and GCP Functions soon).

The aim of this project is to provide the scaffolding for using Headless Chrome
during a serverless function invocation. Serverless Chrome takes care of
building and bundling the Chrome binaries and making sure Chrome is running when
your serverless function executes. In addition, this project also provides a few
example services for common patterns (e.g. taking a screenshot of a page,
printing to PDF, some scraping, etc.)

Why? Because it's neat. It also opens up interesting possibilities for using the
[Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/tot/)
(and tools like [Chromeless](https://github.com/graphcool/chromeless) or
[Puppeteer](https://github.com/GoogleChrome/puppeteer)) in serverless
architectures and doing testing/CI, web-scraping, pre-rendering, etc.

[![CircleCI](https://img.shields.io/circleci/project/github/adieuadieu/serverless-chrome/master.svg?style=flat-square)](https://circleci.com/gh/adieuadieu/serverless-chrome)
[![David](https://img.shields.io/david/adieuadieu/serverless-chrome.svg?style=flat-square)]()
[![David](https://img.shields.io/david/dev/adieuadieu/serverless-chrome.svg?style=flat-square)]()
[![GitHub release](https://img.shields.io/github/release/adieuadieu/serverless-chrome.svg?style=flat-square)](https://github.com/adieuadieu/serverless-chrome)

## Contents

1. [Quick Start](#quick-start)
1. [The Project](#the-project)
1. [Examples](#examples)
1. [Documentation & Resources](#documentation--resources)
   1. [Building Headless Chrome/Chromium](#building-headless-chromechromium)
1. [Testing](#testing)
1. [Articles & Tutorials](#articles--tutorials)
1. [Troubleshooting](#troubleshooting)
1. [Roadmap](#roadmap)
1. [Projects & Companies using serverless-chrome](#projects--companies-using-serverless-chrome)
1. [Change log](#change-log)
1. [Contributing](#contributing)
1. [Prior Art](#prior-art)
1. [License](#license)

## Quick Start

"Bla bla bla! I just want to start coding!" No problem:

Using AWS Lambda, the quickest way to get started is with the
[Serverless-framework](https://serverless.com/) CLI.

First, install `serverless` globally (`npm install -g serverless`) and then:

```bash
serverless create -u https://github.com/adieuadieu/serverless-chrome/tree/master/examples/serverless-framework/aws
```

Then, you must configure your AWS credentials either by defining
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environmental variables, or
using an AWS profile. You can read more about this on the
[Serverless Credentials Guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

In short, either:

```bash
export AWS_PROFILE=<your-profile-name>
```

or

```bash
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
```

Then, to deploy the service and all of its functions:

```bash
npm run deploy
```

Further details are available in the
[Serverless Lambda example](examples/serverless-framework/aws).

## The Project

This project contains:

* **[@serverless-chrome/lambda](packages/lambda)** NPM package<br/> A standalone
  module for AWS Lambda which bundles and launches Headless Chrome with support
  for local development. For use with—but not limited to—tools like
  [Apex](https://github.com/apex/apex),
  [Claudia.js](https://github.com/claudiajs/claudia),
  [SAM Local](https://github.com/awslabs/aws-sam-local), or
  [Serverless](https://serverless.com/).
* **[serverless-plugin-chrome](packages/serverless-plugin)** NPM package<br/> A
  plugin for [Serverless-framework](https://serverless.com/) services which
  takes care of everything for you. You just write the code to drive Chrome.
* **[Example functions](examples/)**
  * [Serverless-framework](https://serverless.com/) AWS Lambda Node.js functions
    using `serverless-plugin-chrome`
* **[Build Automation](docs/automation.md) &
  [CI/CD](.circleci/config.yml)**<br/> Build and release tooling shell scripts
  and Dockerfile for automating the build/release of headless Chrome for
  serverless environments (AWS Lambda).

## Examples

A collection of example functions for different providers and frameworks.

### Serverless-framework

* [Serverless-framework](examples/serverless-framework/aws) Some simple
  functions for the [Serverless-framework](https://serverless.com/) on AWS
  Lambda. It includes the following example functions:

  * Print to PDF
  * Capture Screenshot
  * Page-load Request Logger

## Documentation & Resources

### Building Headless Chrome/Chromium

* Automated, regularly prebuilt binaries can be found on the
  [Releases](https://github.com/adieuadieu/serverless-chrome/releases) page 😎
* [adieuadieu/headless-chromium-for-aws-lambda](https://hub.docker.com/r/adieuadieu/headless-chromium-for-aws-lambda/)
  Docker image
* [Documentation on building your own binaries](/docs/chrome.md)
* [Medium article on how to do build from scratch](https://medium.com/@marco.luethy/running-headless-chrome-on-aws-lambda-fa82ad33a9eb).
  This was the origin of this project.

## Testing

Test with `npm test`. Each package also contains it's own integration tests
which can be run with `npm run test:integration`.

## Articles & Tutorials

A collection of articles and tutorials written by others on using serverless-chrome

* [AWS DevOps Blog — UI Testing at Scale with AWS Lambda](https://aws.amazon.com/blogs/devops/ui-testing-at-scale-with-aws-lambda/)
* [Running puppeteer and headless chrome on AWS lambda with Serverless](https://nadeeshacabral.com/writing/2018/running-puppeteer-and-headless-chrome-on-aws-lambda-with-serverless)
* [Will it blend? Or how to run Google Chrome in AWS Lambda](https://medium.freecodecamp.org/will-it-blend-or-how-to-run-google-chrome-in-aws-lambda-2c960fee8b74)
* [Running Selenium and Headless Chrome on AWS Lambda](https://medium.com/clog/running-selenium-and-headless-chrome-on-aws-lambda-fb350458e4df)
* [AWS Lambda上のheadless chromeをPythonで動かす](https://qiita.com/nabehide/items/754eb7b7e9fff9a1047d)
* [AWS Lambda上でpuppeteerを動かして、スクレイピングする](https://qiita.com/chimame/items/04c9b45d8467cf32892f)
* [serverless-chrome で日本語を表示できるようにする](http://fd0.hatenablog.jp/entry/2017/09/10/223042)

## Troubleshooting

<details id="troubleshooting-1">
  <summary>Can't get Selenium / ChromeDriver to work</summary>
  Make sure that the versions of serverless-chrome, chromedriver, and Selenium are compatible. More details in [#133](https://github.com/adieuadieu/serverless-chrome/issues/133#issuecomment-382743975).
</details>

## Roadmap

_1.1_

1. Support for Google Cloud Functions
1. Example for Apex
1. Example for Claudia.js

_1.2_

1. DOM manipulation and scraping example handler

_Future_

1. Support for Azure Functions
1. Headless Firefox

## Projects & Companies using serverless-chrome

Tell us about your project on the
[Wiki](https://github.com/adieuadieu/serverless-chrome/wiki/Projects-&-Companies-Using-serverless-chrome)!

## Change log

See the [CHANGELOG](CHANGELOG.md)

## Contributing

OMG. Yes. Plz, [halp meeee](/CONTRIBUTING.md).

## Prior Art

This project was inspired in various ways by the following projects:

* [PhantomJS](http://phantomjs.org/)
* [wkhtmltopdf](https://github.com/wkhtmltopdf/wkhtmltopdf)
* [node-webkitgtk](https://github.com/kapouer/node-webkitgtk)
* [electron-pdf](https://github.com/Janpot/electron-pdf)

## License

**serverless-chrome** © [Marco Lüthy](https://github.com/adieuadieu). Released under the [MIT](./LICENSE) license.<br>
Authored and maintained by Marco Lüthy with help from [contributors](https://github.com/adieuadieu/serverless-chrome/contributors).

> [github.com/adieuadieu](https://github.com/adieuadieu) · GitHub [@adieuadieu](https://github.com/adieuadieu) · Twitter [@adieuadieu](https://twitter.com/adieuadieu) · Medium [@marco.luethy](https://medium.com/@marco.luethy)
