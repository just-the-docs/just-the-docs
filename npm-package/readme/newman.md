### Newman v5 has been released. Check the [migration guide](MIGRATION.md#migrating-from-v4-to-v5) and [changelog](https://github.com/postmanlabs/newman/blob/v5.0.0/CHANGELOG.yaml#L1) for more details.

<a href="https://www.postman.com/"><img src="https://assets.getpostman.com/common-share/postman-logo-horizontal-320x132.png" /></a><br />
_Manage all of your organization's APIs in Postman, with the industry's most complete API development environment._

# newman <sub>_the cli companion for postman_</sub> [![Build Status](https://travis-ci.org/postmanlabs/newman.svg?branch=develop)](https://travis-ci.com/postmanlabs/newman) [![codecov](https://codecov.io/gh/postmanlabs/newman/branch/develop/graph/badge.svg)](https://codecov.io/gh/postmanlabs/newman)

Newman is a command-line collection runner for Postman. It allows you to effortlessly run and test a Postman collection directly from the command-line. It is built with extensibility in mind so that you can easily integrate it with your continuous integration servers and build systems.


## Table of contents

1. [Getting Started](#getting-started)
2. [Usage](#usage)
    1. [Using Newman CLI](#using-newman-cli)
    2. [Using Newman as a Library](#using-newman-as-a-library)
    3. [Using Reporters with Newman](#using-reporters-with-newman)
3. [Command Line Options](#command-line-options)
    1. [newman-options](#newman-options)
    2. [newman-run](#newman-run-collection-file-source-options)
    3. [SSL](#ssl)
    4. [Configuring Proxy](#configuring-proxy)
4. [API Reference](#api-reference)
    1. [newman run](#newmanrunoptions-object--callback-function--run-eventemitter)
    2. [Run summary object](#newmanruncallbackerror-object--summary-object)
    3. [Events emitted during a collection run](#newmanrunevents)
5. [Reporters](#reporters)
    1. [Configuring Reporters](#configuring-reporters)
    2. [CLI Reporter](#cli-reporter)
    3. [JSON Reporter](#json-reporter)
    4. [JUnit Reporter](#junitxml-reporter)
    5. [HTML Reporter](#html-reporter)
6. [External Reporters](#external-reporters)
    1. [Using External Reporters](#using-external-reporters)
    2. [Creating Your Own Reporter](#creating-your-own-reporter)
7. [File Uploads](#file-uploads)
8. [Using Newman with the Postman API](#using-newman-with-the-postman-api)
9. [Using Newman in Docker](#using-newman-in-docker)
10. [Using Socks Proxy](#using-socks-proxy)
11. [Migration Guide](#migration-guide)
12. [Compatibility](#compatibility)
13. [Contributing](#contributing)
14. [Community Support](#community-support)
15. [License](#license)


## Getting started

To run Newman, ensure that you have Node.js >= v10. [Install Node.js via package manager](https://nodejs.org/en/download/package-manager/).

### Installation
The easiest way to install Newman is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```console
$ npm install -g newman
```
This installs Newman globally on your system allowing you to run it from anywhere. If you want to install it locally, Just remove the `-g` flag.

#### Using Homebrew
Install Newman globally on your system using Homebrew.
```console
$ brew install newman
```

[back to top](#table-of-contents)

## Usage

### Using Newman CLI
The `newman run` command allows you to specify a collection to be run. You can easily export your Postman
Collection as a json file from the [Postman App](https://www.postman.com/downloads/) and run it using Newman.

```console
$ newman run examples/sample-collection.json
```

If your collection file is available as an URL (such as from our [Cloud API service](https://api.getpostman.com)),
Newman can fetch your file and run it as well.

```console
$ newman run https://www.getpostman.com/collections/631643-f695cab7-6878-eb55-7943-ad88e1ccfd65-JsLv
```

For the complete list of options, refer the [Command Line Options](#command-line-options) section below.

![terminal-demo](https://raw.githubusercontent.com/postmanlabs/postmanlabs.github.io/develop/global-artefacts/newman-terminal.gif)

### Using Newman as a Library
Newman can be easily used within your JavaScript projects as a Node.js module. The entire set of Newman CLI functionality is available for programmatic use as well. The following example runs a collection by reading a JSON collection file stored on disk.

```javascript
const newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./sample-collection.json'),
    reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});
```

For the complete list of options, refer the [API Reference](#api-reference) section below.

### Using Reporters with Newman
Reporters provide information about the current collection run in a format that is easy to both: disseminate and assimilate.
Reporters can be configured using the `-r` or `--reporters` options. Inbuilt reporters in newman are: `cli`, `json`, `junit`, `progress` and `emojitrain`.

CLI reporter is enabled by default when Newman is used as a CLI, you do not need to specifically provide the same as part of reporters option. However, enabling one or more of the other reporters will result in no CLI output. Explicitly enable the CLI option in such a scenario. Check the example given below using the CLI and JSON reporters:

```console
$ newman run examples/sample-collection.json -r cli,json
```

For more details on [Reporters](#reporters) and writing your own [External Reporters](#external-reporters) refer to their corresponding sections below.

[back to top](#table-of-contents)

## Command Line Options

### `newman [options]`

- `-h`, `--help`<br />
  Show command line help, including a list of options, and sample use cases.

- `-v`, `--version`<br />
  Displays the current Newman version, taken from [package.json](https://github.com/postmanlabs/newman/blob/master/package.json)


### `newman run <collection-file-source> [options]`

- `-e <source>`, `--environment <source>`<br />
  Specify an environment file path or URL. Environments provide a set of variables that one can use within collections.
  [Read More](https://learning.postman.com/docs/postman/variables-and-environments/managing-environments/)

- `-g <source>`, `--globals <source>`<br />
  Specify the file path or URL for global variables. Global variables are similar to environment variables but have a lower
  precedence and can be overridden by environment variables having the same name.

- `-d <source>`, `--iteration-data <source>`<br />
  Specify a data source file (JSON or CSV) to be used for iteration as a path to a file or as a URL.
  [Read More](https://learning.postman.com/docs/postman/collection-runs/working-with-data-files/)

- `-n <number>`, `--iteration-count <number>`<br />
  Specifies the number of times the collection has to be run when used in conjunction with iteration data file.

- `--folder <name>`<br />
  Run requests within a particular folder/folders or specific requests in a collection. Multiple folders or requests can be specified by using
  --folder multiple times, like so: --folder f1 --folder f2 --folder r1 --folder r2.


- `--working-dir <path>`<br />
  Set the path of the working directory to use while reading files with relative paths. Default to current directory.

- `--no-insecure-file-read`<br />
  Prevents reading of files situated outside of the working directory.

- `--export-environment <path>`<br />
  The path to the file where Newman will output the final environment variables file before completing a run.

- `--export-globals <path>`<br />
  The path to the file where Newman will output the final global variables file before completing a run.

- `--export-collection <path>`<br />
  The path to the file where Newman will output the final collection file before completing a run.

- `--timeout <ms>`<br />
  Specify the time (in milliseconds) to wait for the entire collection run to complete execution.

- `--timeout-request <ms>`<br />
  Specify the time (in milliseconds) to wait for requests to return a response.

- `--timeout-script <ms>`<br />
  Specify the time (in milliseconds) to wait for scripts to complete execution.

- `-k`, `--insecure`<br />
  Disables SSL verification checks and allows self-signed SSL certificates.

- `--ignore-redirects`<br />
  Prevents newman from automatically following 3XX redirect responses.

- `--delay-request`<br />
  Specify the extent of delay between requests (milliseconds).

- `--cookie-jar <path>`<br />
  Specify the file path for a JSON Cookie Jar. Uses [`tough-cookie`](https://github.com/salesforce/tough-cookie) to deserialize the file.

- `--export-cookie-jar <path>`<br />
  The path to the file where Newman will output the final cookie jar file before completing a run. Uses `tough-cookie`'s serialize method.

- `--bail [optional modifiers]`<br />
  Specify whether or not to stop a collection run on encountering the first test script error.<br />
  Can optionally accept modifiers, currently include `folder` and `failure`.<br />
  `folder` allows you to skip the entire collection run in case an invalid folder
  was specified using the `--folder` option or an error was encountered in general.<br />
  On the failure of a test, `failure` would gracefully stop a collection run after completing the current test script.

- `-x`, `--suppress-exit-code`<br />
  Specify whether or not to override the default exit code for the current run.

- `--color <value>`<br />
  Enable or Disable colored CLI output. The color value can be any of the three: `on`, `off` or `auto`*(default)*.<br/>
  With `auto`, Newman attempts to automatically turn color on or off based on the color support in the terminal.
  This behaviour can be modified by using the `on` or `off` value accordingly.

- `--disable-unicode`<br />
  Specify whether or not to force the unicode disable option. When supplied, all symbols in the output will be replaced
  by their plain text equivalents.

- `--global-var "<global-variable-name>=<global-variable-value>"`<br />
  Allows the specification of global variables via the command line, in a key=value format. Multiple CLI global variables
  can be added by using `--global-var` multiple times, like so: `--global-var "foo=bar" --global-var "alpha=beta"`.

- `--env-var "<environment-variable-name>=<environment-variable-value>"`<br />
  Allows the specification of environment variables via the command line, in a key=value format. Multiple CLI environment variables
  can be added by using `--env-var` multiple times, like so: `--env-var "foo=bar" --env-var "alpha=beta"`.

- `--verbose`<br />
  Show detailed information of collection run and each request sent.

### SSL

#### Client Certificates

Client certificates are an alternative to traditional authentication mechanisms. These allow their users to make authenticated requests to a server, using a public certificate, and an optional private key that verifies certificate ownership. In some cases, the private key may also be protected by a secret passphrase, providing an additional layer of authentication security.

Newman supports SSL client certificates, via the following CLI options:

#### Using a single SSL client certificate
- `--ssl-client-cert`<br/>
The path to the public client certificate file.

- `--ssl-client-key`<br/>
The path to the private client key (optional).

- `--ssl-client-passphrase`<br/>
The secret passphrase used to protect the private client key (optional).


#### Using SSL client certificates configuration file (supports multiple certificates per run)

- `--ssl-client-cert-list`<br/>
The path to the SSL client certificate list configuration file (JSON format). See [examples/ssl-client-cert-list.json](https://github.com/postmanlabs/newman/blob/develop/examples/ssl-client-cert-list.json).

This option allows setting different SSL client certificate according to URL or hostname.
This option takes precedence over `--ssl-client-cert`, `--ssl-client-key` and `--ssl-client-passphrase` options. If there is no match for the URL in the list, these options are used as fallback.


#### Trusted CA

When it is not wanted to use the `--insecure` option, additionally trusted CA certificates can be provided like this:

- `--ssl-extra-ca-certs`<br/>
The path to the file, that holds one or more trusted CA certificates in PEM format

### Configuring Proxy

Newman can also be configured to work with proxy settings via the following environment variables:

 * `HTTP_PROXY` / `http_proxy`
 * `HTTPS_PROXY` / `https_proxy`
 * `NO_PROXY` / `no_proxy`

For more details on using these variables, [refer here](https://github.com/postmanlabs/postman-request/blob/master/README.md#controlling-proxy-behaviour-using-environment-variables).

[back to top](#table-of-contents)

## API Reference

### newman.run(options: _object_ , callback: _function_) => run: EventEmitter
The `run` function executes a collection and returns the run result to a callback function provided as parameter. The
return of the `newman.run` function is a run instance, which emits run events that can be listened to.

| Parameter | Description   |
|-----------|---------------|
| options                   | This is a required argument and it contains all information pertaining to running a collection.<br /><br />_Required_<br />Type: `object` |
| options.collection        | The collection is a required property of the `options` argument. It accepts an object representation of a Postman Collection which should resemble the schema mentioned at [https://schema.getpostman.com/](https://schema.getpostman.com/). The value of this property could also be an instance of Collection Object from the [Postman Collection SDK](https://github.com/postmanlabs/postman-collection).<br /><br />As `string`, one can provide a URL where the Collection JSON can be found (e.g. [Postman Cloud API](https://api.getpostman.com/) service) or path to a local JSON file.<br /><br />_Required_<br />Type: `object\|string` [PostmanCollection](https://github.com/postmanlabs/postman-collection/wiki#Collection) |
| options.environment       | One can optionally pass an environment file path or URL as `string` to this property and that will be used to read Postman Environment Variables from. This property also accepts environment variables as an `object`. Environment files exported from Postman App can be directly used here.<br /><br />_Optional_<br />Type: `object\|string` |
| options.envVar            | One can optionally pass environment variables as an array of key-value string object pairs. It will be used to read Postman Environment Variables as well as overwrite environment variables from `options.environments`. <br /><br />_Optional_<br />Type: `array\|object` |
| options.globals           | Postman Global Variables can be optionally passed on to a collection run in form of path to a file or URL. It also accepts variables as an `object`.<br /><br />_Optional_<br />Type: `object\|string` |
| options.globalVar         | One can optionally pass global environment variables as an array of key-value string object pairs. It will be used to read Postman Global Environment Variables as well as overwrite global environment variables from `options.globals`. <br /><br />_Optional_<br />Type: `array\|object` |
| options.iterationCount    | Specify the number of iterations to run on the collection. This is usually accompanied by providing a data file reference as `options.iterationData`.<br /><br />_Optional_<br />Type: `number`, Default value: `1` |
| options.iterationData     | Path to the JSON or CSV file or URL to be used as data source when running multiple iterations on a collection.<br /><br />_Optional_<br />Type: `string` |
| options.folder            | The name or ID of the folder/folders (ItemGroup) in the collection which would be run instead of the entire collection.<br /><br />_Optional_<br />Type: `string\|array` |
| options.workingDir        | The path of the directory to be used as working directory.<br /><br />_Optional_<br />Type: `string`, Default value: `Current Directory` |
| options.insecureFileRead  | Allow reading files outside of working directory.<br /><br />_Optional_<br />Type: `boolean`, Default value: `true` |
| options.timeout           | Specify the time (in milliseconds) to wait for the entire collection run to complete execution.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.timeoutRequest    | Specify the time (in milliseconds) to wait for requests to return a response.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.timeoutScript     | Specify the time (in milliseconds) to wait for scripts to return a response.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.delayRequest      | Specify the time (in milliseconds) to wait for between subsequent requests.<br /><br />_Optional_<br />Type: `number`, Default value: `0` |
| options.ignoreRedirects   | This specifies whether newman would automatically follow 3xx responses from servers.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.insecure          | Disables SSL verification checks and allows self-signed SSL certificates.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.bail              | A switch to specify whether or not to gracefully stop a collection run (after completing the current test script) on encountering the first error. Takes additional modifiers as arguments to specify whether to end the run with an error for invalid name or path.<br /><br/>Available modifiers: `folder` and `failure`.<br />eg. `bail : ['folder']`<br /><br />_Optional_<br />Type: `boolean\|object`, Default value: `false` |
| options.suppressExitCode  | If present, allows overriding the default exit code from the current collection run, useful for bypassing collection result failures. Takes no arguments.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.reporters         | Specify one reporter name as `string` or provide more than one reporter name as an `array`.<br /><br />Available reporters: `cli`, `json`, `junit`, `progress` and `emojitrain`.<br /><br />_Optional_<br />Type: `string\|array` |
| options.reporter          | Specify options for the reporter(s) declared in `options.reporters`. <br /> e.g. `reporter : { junit : { export : './xmlResults.xml' } }` <br /> e.g. `reporter : { html : { export : './htmlResults.html', template: './customTemplate.hbs' } }` <br /><br />_Optional_<br />Type: `object` |
| options.color             | Enable or Disable colored CLI output.<br/><br/>Available options: `on`, `off` and `auto`<br /><br />_Optional_<br />Type: `string`, Default value: `auto` |
| options.sslClientCert     | The path to the public client certificate file.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientKey      | The path to the private client key file.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientPassphrase | The secret client key passphrase.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientCertList | The path to the client certificate configuration list file. This option takes precedence over `sslClientCert`, `sslClientKey` and `sslClientPassphrase`. When there is no match in this configuration list, `sslClientCert` is used as fallback.<br /><br />_Optional_<br />Type: `string\|array` |
| options.sslExtraCaCerts   | The path to the file, that holds one or more trusted CA certificates in PEM format.<br /><br />_Optional_<br />Type: `string` |
| options.requestAgents     | Specify the custom requesting agents to be used when performing HTTP and HTTPS requests respectively. Example: [Using Socks Proxy](#using-socks-proxy)<br /><br />_Optional_<br />Type: `object` |
| options.cookieJar     | One can optionally pass a CookieJar file path as `string` to this property and that will be deserialized using [`tough-cookie`](https://github.com/salesforce/tough-cookie). This property also accepts a `tough-cookie` CookieJar instance.<br /><br />_Optional_<br />Type: `object\|string` |
| options.newmanVersion     | The Newman version used for the collection run.<br /><br />_This will be set by Newman_ |
| callback                  | Upon completion of the run, this callback is executed with the `error`, `summary` argument.<br /><br />_Required_<br />Type: `function` |

### newman.run~callback(error: _object_ , summary: _object_)

The `callback` parameter of the `newman.run` function receives two arguments: (1) `error` and (2) `summary`

| Argument  | Description   |
|-----------|---------------|
| error                     | In case newman faces an error during the run, the error is passed on to this argument of callback. By default, only fatal errors, such as the ones caused by any fault inside Newman is passed on to this argument. However, setting `abortOnError:true` or `abortOnFailure:true` as part of run options will cause newman to treat collection script syntax errors and test failures as fatal errors and be passed down here while stopping the run abruptly at that point.<br /><br />Type: `object` |
| summary                   | The run summary will contain information pertaining to the run.<br /><br />Type: `object` |
| summary.error             | An error object which if exists, contains an error message describing the message <br /><br />Type: `object` |
| summary.collection        | This object contains information about the collection being run, it's requests, and their associated pre-request scripts and tests.<br /><br />Type: `object` |
| summary.environment       | An object with environment variables used for the current run, and the usage status for each of those variables.<br /><br />Type: `object` |
| summary.globals           | This object holds details about the globals used within the collection run namespace.<br /><br />Type: `object` |
| summary.run               | A cumulative run summary object that provides information on .<br /><br />Type: `object` |
| summary.run.stats         | An object which provides details about the total, failed, and pending counts for pre request scripts, tests, assertions, requests, and more.<br /><br />Type: `object` |
| summary.run.failures      | An array of failure objects, with each element holding details, including the assertion that failed, and the request.<br /><br />Type: `array.<object>` |
| summary.run.executions    | This object contains information about each request, along with it's associated activities within the scope of the current collection run.<br /><br />Type: `array.<object>` |

### newman.run~events

Newman triggers a whole bunch of events during the run.

```javascript
newman.run({
    collection: require('./sample-collection.json'),
    iterationData: [{ "var": "data", "var_beta": "other_val" }],
    globals: {
        "id": "5bfde907-2a1e-8c5a-2246-4aff74b74236",
        "name": "test-env",
        "values": [
            {
                "key": "alpha",
                "value": "beta",
                "type": "text",
                "enabled": true
            }
        ],
        "timestamp": 1404119927461,
        "_postman_variable_scope": "globals",
        "_postman_exported_at": "2016-10-17T14:31:26.200Z",
        "_postman_exported_using": "Postman/4.8.0"
    },
    globalVar: [ 
        { "key":"glboalSecret", "value":"globalSecretValue" },
        { "key":"globalAnotherSecret", "value":`${process.env.GLOBAL_ANOTHER_SECRET}`}
    ],
    environment: {
        "id": "4454509f-00c3-fd32-d56c-ac1537f31415",
        "name": "test-env",
        "values": [
            {
                "key": "foo",
                "value": "bar",
                "type": "text",
                "enabled": true
            }
        ],
        "timestamp": 1404119927461,
        "_postman_variable_scope": "environment",
        "_postman_exported_at": "2016-10-17T14:26:34.940Z",
        "_postman_exported_using": "Postman/4.8.0"
    },
    envVar: [ 
        { "key":"secret", "value":"secretValue" },
        { "key":"anotherSecret", "value":`${process.env.ANOTHER_SECRET}`}
    ],
}).on('start', function (err, args) { // on start of run, log to console
    console.log('running a collection...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});
```

All events receive two arguments (1) `error` and (2) `args`. **The list below describes the properties of the second
argument object.**

| Event     | Description   |
|-----------|---------------|
| start                     | The start of a collection run |
| beforeIteration           | Before an iteration commences |
| beforeItem                | Before an item execution begins (the set of prerequest->request->test) |
| beforePrerequest          | Before `prerequest` script is execution starts |
| prerequest                | After `prerequest` script execution completes |
| beforeRequest             | Before an HTTP request is sent |
| request                   | After response of the request is received |
| beforeTest                | Before `test` script is execution starts |
| test                      | After `test` script execution completes |
| beforeScript              | Before any script (of type `test` or `prerequest`) is executed |
| script                    | After any script (of type `test` or `prerequest`) is executed |
| item                      | When an item (the whole set of prerequest->request->test) completes |
| iteration                 | After an iteration completes |
| assertion                 | This event is triggered for every test assertion done within `test` scripts |
| console                   | Every time a `console` function is called from within any script, this event is propagated |
| exception                 | When any asynchronous error happen in `scripts` this event is triggered |
| beforeDone                | An event that is triggered prior to the completion of the run |
| done                      | This event is emitted when a collection run has completed, with or without errors |

<!-- TODO: write about callback summary -->

[back to top](#table-of-contents)

## Reporters

### Configuring Reporters

- `-r <reporter-name>`, `--reporters <reporter-name>`<br />
  Specify one reporter name as `string` or provide more than one reporter name as a comma separated list of reporter names. Available reporters are: `cli`, `json`, `junit`, `progress` and `emojitrain`.<br/><br/>
  Spaces should **not** be used between reporter names / commas whilst specifying a comma separated list of reporters. For instance:<br/><br/>
  :white_check_mark: `-r cli,json,junit`<br/>
  :x: `-r cli , json,junit`

- `--reporter-{{reporter-name}}-{{reporter-option}}`<br />
  When multiple reporters are provided, if one needs to specifically override or provide an option to one reporter, this
  is achieved by prefixing the option with `--reporter-{{reporter-name}}-`.<br /><br />
  For example, `... --reporters cli,json --reporter-cli-silent` would silence the CLI reporter only.

- `--reporter-{{reporter-options}}`<br />
  If more than one reporter accepts the same option name, they can be provided using the common reporter option syntax.
  <br /><br />
  For example, `... --reporters cli,json --reporter-silent` passes the `silent: true` option to both JSON and CLI
  reporter.

**Note:** Sample collection reports have been provided in [examples/reports](https://github.com/postmanlabs/newman/blob/develop/examples/reports).

### CLI Reporter
The built-in CLI reporter supports the following options, use them with appropriate argument switch prefix. For example, the
option `no-summary` can be passed as `--reporter-no-summary` or `--reporter-cli-no-summary`.

CLI reporter is enabled by default when Newman is used as a CLI, you do not need to specifically provide the same as part of `--reporters` option.
However, enabling one or more of the other reporters will result in no CLI output. Explicitly enable the CLI option in
such a scenario.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-cli-silent`         | The CLI reporter is internally disabled and you see no output to terminal. |

| `--reporter-cli-show-timestamps` | This prints the local time for each request made. | 
| `--reporter-cli-no-summary`     | The statistical summary table is not shown. |
| `--reporter-cli-no-failures`    | This prevents the run failures from being separately printed. |
| `--reporter-cli-no-assertions`  | This turns off the output for request-wise assertions as they happen. |
| `--reporter-cli-no-success-assertions`  | This turns off the output for successful assertions as they happen. |
| `--reporter-cli-no-console`     | This turns off the output of `console.log` (and other console calls) from collection's scripts. |
| `--reporter-cli-no-banner`      | This turns off the `newman` banner shown at the beginning of each collection run. |

### JSON Reporter
The built-in JSON reporter is useful in producing a comprehensive output of the run summary. It takes the path to the
file where to write the report. The content of this file is exactly the same as the `summary` parameter sent to the callback
when Newman is used as a library.

To enable JSON reporter, provide `--reporters json` as a CLI option.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-json-export <path>` | Specify a path where the output JSON file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. If the specified path does not exist, it will be created. However, if the specified path is a pre-existing directory, the report will be generated in that directory. |

### JUNIT/XML Reporter
The built-in JUnit reporter can output a summary of the collection run to a JUnit compatible XML file. To enable the JUNIT reporter, provide
`--reporters junit` as a CLI option.

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-junit-export <path>` | Specify a path where the output XML file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. If the specified path does not exist, it will be created. However, if the specified path is a pre-existing directory, the report will be generated in that directory. |

### HTML Reporter
An external reporter, maintained by Postman, which can be installed via `npm install -g newman-reporter-html`. This reporter was part of the Newman project but was separated out into its own project in V4.

The complete installation and usage guide is available at [newman-reporter-html](https://github.com/postmanlabs/newman-reporter-html#readme). Once the HTML reporter is installed you can provide `--reporters html` as a CLI option.

[back to top](#table-of-contents)

## External Reporters

### Using External Reporters
Newman also supports external reporters, provided that the reporter works with Newman's event sequence. Working examples of
how Newman reporters work can be found in [lib/reporters](https://github.com/postmanlabs/newman/tree/develop/lib/reporters).

For instance, to use the [Newman HTML Reporter](https://github.com/postmanlabs/newman-reporter-html):

- Install the reporter package. Note that the name of the package is of the form `newman-reporter-<name>`. The installation should be global if Newman is installed globally, local otherwise. (Remove `-g` flag from the command below for a local installation.)
```console
$ npm install -g newman-reporter-html
```

- Use the installed reporter, either via the CLI, or programmatic usage. Here, the `newman-reporter` prefix is **not** required while specifying the reporter name in the options.<br/>
```console
$ newman run /path/to/collection.json -r cli,html
```
```javascript
const newman = require('newman');

newman.run({
    collection: '/path/to/collection.json',
    reporters: ['cli', 'html']
}, process.exit);
```

#### Community Maintained Reporters

Several members of the Postman community have created custom reporters offering different option to output the data coming from Newman. Listed below is a selection of these but more can be found [here](https://www.npmjs.com/search?q=newman-reporter) on NPM.

Once the custom reporter NPM package has been installed either globally or locally, this can be then used with Newman in the following ways:

```console
$ newman run /path/to/collection.json -r htmlextra,csv
```

```javascript
const newman = require('newman');

newman.run({
    collection: '/path/to/collection.json',
    reporters: ['htmlextra', 'csv']
}, process.exit);
```

- [htmlextra](https://github.com/DannyDainton/newman-reporter-htmlextra) -
This is an updated version of the standard HTML reporter containing a more in-depth data output and a few helpful extras
- [csv](https://github.com/matt-ball/newman-reporter-csv) -
This reporter creates a `csv` file containing the high level summary of the Collection run
- [json-summary](https://github.com/spenceclark/newman-reporter-json-summary) -
A Newman JSON Reporter that strips the results down to a minimum
- [teamcity](https://github.com/leafle/newman-reporter-teamcity) -
A reporter built to be used with the [Team City](https://www.jetbrains.com/teamcity/) CI server
- [testrail](https://github.com/billylam/newman-reporter-testrail) -
A reporter built for [Test Rail](https://www.gurock.com/testrail/), the test case management tool
- [statsd](https://github.com/gsorry/newman-reporter-statsd) -
This reporter can be used to send the Collection run data to `statsd` and used on time series analytic tools like [Grafana](https://grafana.com/)
- [confluence](https://github.com/OmbraDiFenice/newman-reporter-confluence) -
Confluence reporter for Newman that uploads a Newman report on a Confluence page
- [influxdb](https://github.com/vs4vijay/newman-reporter-influxdb) -
This reporter sends the test results information to InfluxDB which can be used from [Grafana](https://grafana.com/) to build dashboards

### Creating Your Own Reporter
A custom reporter is a Node module with a name of the form `newman-reporter-<name>`. To create a custom reporter:
1. Navigate to a directory of your choice, and create a blank npm package with `npm init`.
2. Add an `index.js` file, that exports a function of the following form:
```javascript
function CustomNewmanReporter (emitter, reporterOptions, collectionRunOptions) {
  // emitter is an event emitter that triggers the following events: https://github.com/postmanlabs/newman#newmanrunevents
  // reporterOptions is an object of the reporter specific options. See usage examples below for more details.
  // collectionRunOptions is an object of all the collection run options: https://github.com/postmanlabs/newman#newmanrunoptions-object--callback-function--run-eventemitter
}
module.exports = CustomNewmanReporter
```
3. To use your reporter locally, use the `npm pack` command to create a `.tgz` file. Once created, this can be installed using the `npm i -g newman-reporter-<name>.<version>.tgz` command.

Once you're happy with your reporter, it can be published to `npm` using `npm publish`. This will then be made available for other people to download.

Scoped reporter package names like `@myorg/newman-reporter-<name>` are also supported. Working reporter examples can be found in [lib/reporters](lib/reporters).

[back to top](#table-of-contents)

## File uploads

Newman also supports file uploads for request form data. The files must be present in the
current working directory. Your collection must also contain the filename in
the "src" attribute of the request.

In this collection, `sample-file.txt` should be present in the current working directory.
```json
{
    "info": {
        "name": "file-upload"
    },
    "item": [
        {
            "request": {
                "url": "https://postman-echo.com/post",
                "method": "POST",
                "body": {
                    "mode": "formdata",
                    "formdata": [
                        {
                            "key": "file",
                            "type": "file",
                            "enabled": true,
                            "src": "sample-file.txt"
                        }
                    ]
                }
            }
        }
    ]
}
```

```console
$ ls
file-upload.postman_collection.json  sample-file.txt

$ newman run file-upload.postman_collection.json
```

[back to top](#table-of-contents)

## Using Newman with the Postman API

1 [Generate an API key](https://app.getpostman.com/dashboard/integrations)<br/>
2 Fetch a list of your collections from: `https://api.getpostman.com/collections?apikey=$apiKey`<br/>
3 Get the collection link via it's `uid`: `https://api.getpostman.com/collections/$uid?apikey=$apiKey`<br/>
4 Obtain the environment URI from: `https://api.getpostman.com/environments?apikey=$apiKey`<br/>
5 Using the collection and environment URIs acquired in steps 3 and 4, run the collection as follows:
```console
$ newman run "https://api.getpostman.com/collections/$uid?apikey=$apiKey" \
    --environment "https://api.getpostman.com/environments/$uid?apikey=$apiKey"
```

[back to top](#table-of-contents)

## Using Newman in Docker
To use Newman in Docker check our [docker documentation](https://learning.postman.com/docs/postman/collection-runs/newman-with-docker/).

## Using Socks Proxy

When using Newman as a library, you can pass a custom HTTP(S) agent which will be used for making the requests. Here's an example of how to setup socks proxy using a custom agent.

```js
const newman = require('newman');
const SocksProxyAgent = require('socks-proxy-agent');
const requestAgent = new SocksProxyAgent({ host: 'localhost', port: '1080' });

newman.run({
    collection: require('./sample-collection.json'),
    requestAgents: {
        http: requestAgent, // agent used for HTTP requests
        https: requestAgent, // agent used for HTTPS requests
    }
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});
```

[back to top](#table-of-contents)

## Migration Guide

- [Newman v4 to v5 Migration Guide](MIGRATION.md)
- [Newman v4.x Documentation](https://github.com/postmanlabs/newman/blob/release/4.x/README.md)


## Compatibility

### NodeJS

|      Newman       |    Node    |
|:-----------------:|:----------:|
|       v3.x        |  >= v4.x   |
|       v4.x        |  >= v6.x   |
|       v5.x        |  >= v10.x  |

The current Node version compatibility can also be seen from the `engines.node` property in [package.json](https://github.com/postmanlabs/newman/blob/develop/package.json)

### File Encoding

Newman attempts to detect file encoding for files that are provided as
command line input. However, it mostly relies on NodeJS and the underlying
operating system to do the heavy lifting. Currently, `ASCII`, `UTF-8`, `UTF-16LE`
and `ISO-8859-1` are the only ones that are detection assisted.

[back to top](#table-of-contents)

## Contributing
Please take a moment to read our [contributing guide](.github/CONTRIBUTING.md) to learn about our development process.
Open an [issue](https://github.com/postmanlabs/newman/issues) first to discuss potential changes/additions.

## Community Support

<img src="https://avatars1.githubusercontent.com/u/3220138?v=3&s=120" align="right" />
If you are interested in talking to the Postman team and fellow Newman users, you can find us on our <a href="https://community.postman.com">Postman Community Forum</a>. Feel free to drop by and say hello. You'll find us posting about upcoming features and beta releases, answering technical support questions, and contemplating world peace.

Sign in using your Postman account to participate in the discussions and don't forget to take advantage of the <a href="https://community.postman.com/search?q=newman">search bar</a> - the answer to your question might already be waiting for you! Don’t want to log in? Then lurk on the sidelines and absorb all the knowledge.


## License
This software is licensed under Apache-2.0. Copyright Postdot Technologies, Inc. See the [LICENSE.md](LICENSE.md) file for more information.

[![Analytics](https://ga-beacon.appspot.com/UA-43979731-9/newman/readme)](https://postman.com)
