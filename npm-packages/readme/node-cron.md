# Node Cron

[![npm](https://img.shields.io/npm/l/node-cron.svg)](https://github.com/merencia/node-cron/blob/master/LICENSE.md)
[![npm](https://img.shields.io/npm/v/node-cron.svg)](https://img.shields.io/npm/v/node-cron.svg)
[![Coverage Status](https://coveralls.io/repos/github/node-cron/node-cron/badge.svg?branch=master)](https://coveralls.io/github/node-cron/node-cron?branch=master)
[![Code Climate](https://codeclimate.com/github/node-cron/node-cron/badges/gpa.svg)](https://codeclimate.com/github/merencia/node-cron)
[![Build Status](https://travis-ci.org/node-cron/node-cron.svg?branch=master)](https://travis-ci.org/merencia/node-cron)
[![Dependency Status](https://david-dm.org/node-cron/node-cron.svg)](https://david-dm.org/merencia/node-cron)
[![devDependency Status](https://david-dm.org/node-cron/node-cron/dev-status.svg)](https://david-dm.org/merencia/node-cron#info=devDependencies)
[![Backers on Open Collective](https://opencollective.com/node-cron/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/node-cron/sponsors/badge.svg)](#sponsors) 

The node-cron module is tiny task scheduler in pure JavaScript for node.js based on [GNU crontab](https://www.gnu.org/software/mcron/manual/html_node/Crontab-file.html). This module allows you to schedule task in node.js using full crontab syntax.

**Need a job scheduler with support for worker threads and cron syntax?** Try out the [Bree](https://github.com/breejs/bree) job scheduler!

[![NPM](https://nodei.co/npm/node-cron.png?downloads=true&downloadRank=true&stars=false)](https://nodei.co/npm/node-cron/)


## Getting Started

Install node-cron using npm:

```console
$ npm install --save node-cron
```

Import node-cron and schedule a task:

```javascript
var cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
```

## Cron Syntax

This is a quick reference to cron syntax and also shows the options supported by node-cron.

### Allowed fields

```
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

### Allowed values

|     field    |        value        |
|--------------|---------------------|
|    second    |         0-59        |
|    minute    |         0-59        |
|     hour     |         0-23        |
| day of month |         1-31        |
|     month    |     1-12 (or names) |
|  day of week |     0-7 (or names, 0 or 7 are sunday)  |


#### Using multiples values

You may use multiples values separated by comma:

```javascript
var cron = require('node-cron');

cron.schedule('1,2,4,5 * * * *', () => {
  console.log('running every minute 1, 2, 4 and 5');
});
```

#### Using ranges

You may also define a range of values:

```javascript
var cron = require('node-cron');

cron.schedule('1-5 * * * *', () => {
  console.log('running every minute to 1 from 5');
});
```

#### Using step values

Step values can be used in conjunction with ranges, following a range with '/' and a number. e.g: `1-10/2` that is the same as `2,4,6,8,10`. Steps are also permitted after an asterisk, so if you want to say “every two minutes”, just use `*/2`.

```javascript
var cron = require('node-cron');

cron.schedule('*/2 * * * *', () => {
  console.log('running a task every two minutes');
});
```

#### Using names

For month and week day you also may use names or short names. e.g:

```javascript
var cron = require('node-cron');

cron.schedule('* * * January,September Sunday', () => {
  console.log('running on Sundays of January and September');
});
```

Or with short names:

```javascript
var cron = require('node-cron');

cron.schedule('* * * Jan,Sep Sun', () => {
  console.log('running on Sundays of January and September');
});
```

## Cron methods

### Schedule

Schedules given task to be executed whenever the cron expression ticks.

Arguments:

- **expression** `string`: Cron expression
- **function** `Function`: Task to be executed
- **options** `Object`: Optional configuration for job scheduling.

#### Options

 - **scheduled**: A `boolean` to set if the created task is scheduled. Default `true`;
 - **timezone**: The timezone that is used for job scheduling. See [moment-timezone](https://momentjs.com/timezone) for valid values.

 **Example**:

 ```js
  var cron = require('node-cron');

  cron.schedule('0 1 * * *', () => {
    console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
  });
 ```

## ScheduledTask methods

### Start

Starts the scheduled task.

```javascript
var cron = require('node-cron');

var task = cron.schedule('* * * * *', () =>  {
  console.log('stopped task');
}, {
  scheduled: false
});

task.start();
```

### Stop

The task won't be executed unless re-started.

```javascript
var cron = require('node-cron');

var task = cron.schedule('* * * * *', () =>  {
  console.log('will execute every minute until stopped');
});

task.stop();
```

### Destroy

The task will be stopped and completely destroyed.

```javascript
var cron = require('node-cron');

var task = cron.schedule('* * * * *', () =>  {
  console.log('will not execute anymore, nor be able to restart');
});

task.destroy();
```

### Validate

Validate that the given string is a valid cron expression.

```javascript
var cron = require('node-cron');

var valid = cron.validate('59 * * * *');
var invalid = cron.validate('60 * * * *');
```

## Issues

Feel free to submit issues and enhancement requests [here](https://github.com/merencia/node-cron/issues).

## Contributing

In general, we follow the "fork-and-pull" Git workflow.

 - Fork the repo on GitHub;
 - Commit changes to a branch in your fork;
 - Pull request "upstream" with your changes;

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

Please do not contribute code you did not write yourself, unless you are certain you have the legal ability to do so. Also ensure all contributed code can be distributed under the ISC License.

## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/node-cron/node-cron/graphs/contributors"><img src="https://opencollective.com/node-cron/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/node-cron#backer)]

<a href="https://opencollective.com/node-cron#backers" target="_blank"><img src="https://opencollective.com/node-cron/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/node-cron#sponsor)]

<a href="https://opencollective.com/node-cron/sponsor/0/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/1/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/2/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/3/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/4/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/5/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/6/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/7/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/8/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/node-cron/sponsor/9/website" target="_blank"><img src="https://opencollective.com/node-cron/sponsor/9/avatar.svg"></a>



## License

node-cron is under [ISC License](https://github.com/merencia/node-cron/blob/master/LICENSE.md).
