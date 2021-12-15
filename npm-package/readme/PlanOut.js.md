# PlanOut.js
[![Build Status](https://travis-ci.org/rawls238/PlanOut.js.svg?branch=master)](https://travis-ci.org/rawls238/PlanOut.js)
[![npm downloads](https://img.shields.io/npm/dm/planout.svg?style=flat-square)](https://www.npmjs.com/package/planout)

PlanOut.js is a JavaScript-based implementation of [PlanOut](http://facebook.github.io/planout/).
It provides a complete implementation of the PlanOut native API framework and
a PlanOut language interpreter.

PlanOut.js is implemented in ES6 and can also be used with ES5. It can be integrated client-side as well as with server-side with node.js.

## Installation

PlanOut.js is available on [npm](https://www.npmjs.com/package/planout) and can
be installed by running:

```
npm install planout
```

## Comparison with Reference Implementation

PlanOut.js provides an implementation of all PlanOut features (including the
experiment class, interpreter, and namespaces). The underlying randomization ops in the JavaScript implementation return different results for efficiency reasons. If you are using PlanOut cross-platform and want to enable compatibility mode then you can enable it by utilizing the [planout_core_compatible.js](dist/planout_core_compatible.js) distribution bundle instead of the default ```planout.js``` bundle. You can also utilize `v2.0.2` which contains both compat and non-compat modes in the main distribution.

The ```planout_core_compatible.js``` bundle should be used only if you want your random operation results to match that of the results from other planout implementations (java, python, etc). The filesize of the ```planout_core_compatible.js``` bundle is fairly larger (by ~100kb) and random operations are processed slower.

## Usage

This is how you would use PlanOut.js in ES6 to create an experiment:

```javascript
import * as PlanOut from "planout";

class MyExperiment extends PlanOut.Experiment {

  configureLogger() {
    return;
    //configure logger
  }

  log(event) {
    //log the event somewhere
  }

  previouslyLogged() {
    //check if we’ve already logged an event for this user
    //return this._exposureLogged; is a sane default for client-side experiments
  }

  setup() {
    //set experiment name, etc.
    this.setName('MyExperiment');
  }

  /*
  This function should return a list of the possible parameter names that the assignment procedure may assign.
  You can optionally override this function to always return this.getDefaultParamNames() which will analyze your program at runtime to determine what the range of possible experimental parameters are. Otherwise, simply return a fixed list of the experimental parameters that your assignment procedure may assign.
  */

  getParamNames() {
    return this.getDefaultParamNames();
  }

  assign(params, args) {
    params.set('foo', new PlanOut.Ops.Random.UniformChoice({choices: ['a', 'b'], 'unit': args.userId}));
  }

}
```

Then, to use this experiment you would simply need to do:

```javascript
var exp = new MyExperiment({userId: user.id });
console.log("User has foo param set to " + exp.get('foo'));
```

If you wanted to run the experiment in a namespace you would do:

```javascript

class MyNameSpace extends PlanOut.Namespace.SimpleNamespace {

  setupDefaults() {
    this.numSegments = 100;
  }

  setup() {
    this.setName('MyNamespace');
    this.setPrimaryUnit('userId');
  }

  setupExperiments() {
    this.addExperiment('MyExperiment', MyExperiment, 50);
  }
}
```

Then, to use the namespace you would do:
```javascript
var namespace = new MyNamespace({userId: user.id });
console.log("User has foo param set to " + namespace.get('foo'));
```

Note that the import for PlanOut has changed as of v5. The update modified the way that users should import PlanOut from ```import PlanOut from 'planout';``` to  ```import * as PlanOut from "planout";``` 

An example of using PlanOut.js with ES5 can be [found here](https://github.com/rawls238/PlanOut.js/blob/master/examples/sample_planout_es5.js).

An example with the PlanOut interpreter can be [found here](https://github.com/rawls238/PlanOut.js/blob/master/examples/sample_interpreter_es5.js).


## Experimental Overrides

There are two ways to override experimental parameters. There are global overrides and local overrides. Global overrides let you define who should receive these overrides and what those values should be set. It is not recommended to be used for anything apart from feature rollouts.

To use global overrides simply do something similar the following in your namespace class:

```javascript
allowedOverride() {
  //(you may need to pass additional information to the namespace this to work)
  //some criteria for determining who should receive overrides
  return this.inputs.email.indexOf('hubspot.com') >= 0;
}

getOverrides() {
  return {
    '[param name]': {
      'experimentName': [experiment Name],
      'value': [value of override]
    },
    'show_text': {
      'experimentName': 'Experiment1',
      'value': 'test'
    }
  };
}
```

Local overrides are basically client-side overrides you can set via query parameters or via localStorage.

For example, suppose you want to override the show_text variable to be 'test' locally. You would simply do
```
http://[some_url]?experimentOverride=Experiment1&show_text=test
```

or you could set experimentOverride=Experiment1 and show_text=test in localStorage

Note that in both cases exposure will be logged as though users had been randomly assigned these values.

The primary use of global overrides should be for feature rollouts and the primary use of local overrides should be for local testing


## Registering experiment inputs

PlanOut.js comes packaged with an ```ExperimentSetup``` utility to make it easier to register experiment inputs outside from experiment initialization.

By calling ```ExperimentSetup.registerExperimentInput('key', 'value', [optional namespace name])```, you can register a particular value as an input to either all namespaces (by not passing the third argument, it assumes that this should be registered as an input across all experiments) or to a particular namespace (by passing the namespace name as the third argument).

This allows you to keep your namespace class definition and initialization separate from your core application bootstrapping and simply makes it necessary to call ExperimentSetup when you have fetched the necessary inputs.

For instance, one could have a namespace defined in a file called 'mynamespace.js'

```javascript
var namespace = new MyNamespace({ 'foo': 'bar'});
```

and register a user identifier input to it when the application bootstraps and fetches user information.

```javascript
getUserInfo().then((response) => {
  ExperimentSetup.registerExperimentInput('userid', response.userId);
});
```

This is also useful when an experiment is intended to interface with external services and allows certain experiment-specific inputs to be restricted to the namespaces that they are intended for.

With this it is important to watch out for race conditions since you should ensure that before your application ever fetches any experiment parameters it registers the necessary inputs.

## Use with React.js

If you are using React.js for your views, [react-experiments](https://github.com/HubSpot/react-experiments) should make it very easy to run UI experiments

## Logging

The event structure sent to the logging function is as follows:

```
{
  'event': 'EXPOSURE',
  'name': [Experiment Name],
  'time': [time]
  'inputs': { ...inputs }
  'params': { ...params},
  'extra_data': {...extra data passed in}
}
```

Here are several implementations of the log function using popular analytics libraries:

### [Mixpanel](https://www.mixpanel.com) / [Amplitude](https://amplitude.com/).

Both Mixpanel and Amplitude effectively have the same API for logging events so just swap out the last line depending on which library you're using.

This log function brings the inputs and params fields onto the top level event object so that they're queryable in Mixpanel / Amplitude and uses the
following as the event name ```[Experiment Name] - [Log Type]``` so for exposure logs it would look like ```[Experiment Name] - EXPOSURE```.

```javascript
log(eventObj) {

  //move inputs out of nested field into top level event object
  var inputs = eventObj.inputs;
  Object.keys(inputs).forEach(function (input) {
    eventObj[input] = inputs[input];
  });

  //move params out of nested field into top level event object
  var params = eventObj.params;
  Object.keys(params).forEach(function (parameter) {
    eventObj[parameter] = params[parameter];
  });

  var eventName = eventObj.name + ' - ' + eventObj.event;

  //if using mixpanel
  return mixpanel.track(eventName, eventObj);

  //if using amplitude*
  return amplitude.logEvent(eventName, eventObj);
}
```
#### [Google Analytics](https://google.com/analytics/)

Google Analytics unfortunately has a relatively weak events API compared to Mixpanel and Amplitude, which means that we have to forego some event fields when using it.

Here is the anatomy of the resulting log function:

The event category field to equal ```EXPERIMENT``` so that all experiment events are grouped under the same category.
The event name is [Experiment Name] - [Log Type] so for exposure logs it would look like ```[Experiment Name] - EXPOSURE```.
The event label takes all experiment parameter values and joins them together into a comma-delimited single string due to the constraints of the API.

```javascript
log(eventObj) {
  var eventCategory = 'EXPERIMENT';
  var eventName = eventObj.name + ' - ' + eventObj.event;

  var params = eventObj.params;
  var paramVals = Object.keys(params).map(function (key) {
    return params[key];
  });
  var eventLabel = paramVals.join(',');

  return ga('send', 'event', eventCategory, eventName, eventLabel);
}
```


## Development

This project uses [Jest](https://facebook.github.io/jest/) for testing. The tests can be found in the __tests__ folder and building + running the tests simply requires running the command: ```npm run-script build-and-test```

If you are making changes to the ES6 implementation, simply run ```npm run-script build``` and it will transpile to the corresponding ES5 code.
