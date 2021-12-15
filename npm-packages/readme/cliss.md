# CLIss

[![Build Status](https://api.travis-ci.org/DiegoZoracKy/cliss.svg)](https://travis-ci.org/DiegoZoracKy/cliss) [![npm](https://img.shields.io/npm/v/cliss.svg)]() [![npm](https://img.shields.io/npm/l/cliss.svg)]()

CLI Simple, Stupid. Automatic discovery of parameters names and support to subcommands down to N levels. Provides an easy and minimal setup by passing in only a function reference without the need of declaring all expected options names or create a help section by hand.

Side note: It is worth taking a look at [MagiCLI](https://github.com/DiegoZoracKy/magicli), which is a module capable to create a CLI interface automatically for a module, instead of creating one by hand.

## Goals

 * Simple and easy API
 * Easy minimal setup, extracting options names from functions parameters
 * Out of the box support to sync or async (Promise) functions
 * Subcommands down to N levels
 * Automatic Help section generation, that can be improved only when needed

## Installation

```bash
$ npm install cliss
```

## Usage

Through this section we'll be going from the most minimal usage of the module, where options names are extracted from functions parameters:
```javascript
const func = (param1, param2) => `${param1}_${param2}`;
cliss(func);
```

to a version using all the possible options it provides:

```javascript
const cliSpec = {
	name,
	description,
	version,
	options: [{
		name,
		description,
		required,
		type
	}],
	pipe: {
		stdin: (stdinValue, args, positionalArgs, argsAfterEndOfOptions) => {},
		before: (args, positionalArgs, argsAfterEndOfOptions) => {},
		after: (result, parsedArgs, positionalArgs, argsAfterEndOfOptions) => {}
	},
	action: () => {},
	commands: [{}]
};

const clissOptions = {
	command: {
		subcommandsDelimiter
	},
	options: {
		validateRequiredParameters
	},
	version: {
		option
	},
	help: {
		option,
		stripAnsi
	},
	pipe: {
		stdin: (stdinValue, args, positionalArgs, argsAfterEndOfOptions) => {},
		before: (args, positionalArgs, argsAfterEndOfOptions) => {},
		after: (result, parsedArgs, positionalArgs, argsAfterEndOfOptions) => {}
	}
};

cliss(cliSpec, clissOptions);
```

### A CLI for a function (the most simple and minimal use case)
`cliss(functionReference)`

Creating a CLI for a function by doing nothing more than passing it as a parameter to cliss. The options names will be the same as the parameters expected by the function.

```javascript
'use strict';
const cliss = require('cliss');

const aFunctionWithWeirdParametersDefinition = (param1, param2, { someProp: [[ param3 ]] = [[]] } = {}, ...args) => {
	let result = `param1: ${param1} \n`;
	result += `param2: ${param2} \n`;
	result += `param3: ${param3} \n`;
	result += `args: ${args.join(',')}`;

	return result;Run the program passing with the following options:


};

cliss(aFunctionWithWeirdParametersDefinition);
```
Calling it via CLI with `--help` will give you:

```bash
Options:

  --param1
  --param2
  --param3
  --args
```

Passing in the options:
`node cli.js --param2=PARAM2 --param1=PARAM1 --param3=PARAM3 --args=a --args=r --args=g --args=s`

Or passing options + arguments (arguments for the "...args" parameter in this case):
`node cli.js --param2=PARAM2 --param1=PARAM1 --param3=PARAM3 a r g s`

Will result in:

```bash
param1: PARAM1
param2: PARAM2
param3: PARAM3
args: a,r,g,s
```
Note that the order of the options doesn't need to match the order of the parameters.

### Improving the help section
`cliss(cliSpec)`

Great, but probably one would like to improve a bit the `--help` section of the module, by providing to the end user the **name** (the command's name for calling it via CLI), **description** and **version** of the module. In this case a *Object Literal* will be used instead of just a function reference.

```javascript
'use strict';
const cliss = require('../');

cliss({
	name: 'some-command',
	description: 'Just an example that will do nothing but concat all the parameters.',
	version: '1.0.0',
	action: (param1, param2, { someProp: [[ param3 ]] = [[]] } = {}, ...args) => {
		let result = `param1: ${param1} \n`;
		result += `param2: ${param2} \n`;
		result += `param3: ${param3} \n`;
		result += `args: ${args.join(',')}`;

		return result;
	}
});
```

Now, when calling it with `--help`, a better help section will be shown:

```bash
Description:

  Just an example that will do nothing but concat all the parameters.

Usage:

  $ some-command  [options] [args...]

Options:

  --param1
  --param2
  --param3
  --args
```

### Providing more information about the expected options
`cliss(cliSpec)`

The options were effortlessly extracted from the parameters names, but **cliss** provides a way for one to provide more information about each of them. The *Object Literal* passed in the *cliSpec* parameter can have a property named **options**, which expects an *Array* of objects, containing the **name** of the option plus some of the following properties:

* **required**
To tell if the parameter is required.

* **description**
To give hints or explain what the option is about.

* **type**
To define how the parser should treat the option (Array, Object, String, Number, etc.). Check [yargs-parser](https://github.com/yargs/yargs-parser) for instructions about *type*, as it is the engine being used to parse the options.

* **alias**
To define an alias for the option.

Following the last example, let's improve it to:
 * give more information about **param1**
 * check **args** as required

```javascript
cliss({
	name: 'some-command',
	description: 'Just an example that will do nothing but concat all the parameters.',
	version: '1.0.0',
	options: [{
		name: 'param1',
		description: 'This param is the base value to compute everything else.',
		required: true,
		type: 'String'
	}, {
		name: 'args',
		required: true
	}],
	action: (param1, param2, { someProp: [[ param3 ]] = [[]] } = {}, ...args) => {
		let result = `param1: ${param1} \n`;
		result += `param2: ${param2} \n`;
		result += `param3: ${param3} \n`;
		result += `args: ${args.join(',')}`;

		return result;
	}
});
```

Call `--help`, and note that the *Usage* section will also be affected. Now *[options] [args...]* will be shown as *<options> <args...>*, because both of them are required.

```bash
Description:

  Just an example that will do nothing but logging all the parameters.

Usage:

  $ some-command  <options> <args...>

Options:

  --param1 String   Required - This param is the base value to compute
                    everything else.
  --param2
  --param3
  --args            Required
```

Run the program with the following options:
`node cli.js --param1=001 --param2=002 --param3=PARAM3 a r g s`

And check the result to see how *param1* was indeed treated as a string, while *param2* was parsed as a number:

```bash
param1: 001
param2: 2
param3: PARAM3
args: a,r,g,s
```

### Pipe: STDIN, Before and After
`cliss(cliSpec)`

A property named **pipe** can also be defined on *cliSpec* in order to handle **stdin** and also, some steps of the execution flow (**before** and **after**). To define a single handle for all the commands, the **pipe** option can be defined on [Cliss options](#cliss-options) as will be shown later on the documentation. The pipeline execution of a command is:

**stdin** *(command.pipe.stdin || clissOptions.pipe.stdin)* =>

**clissOptions.pipe.before** =>

**command.pipe.before** =>

**command.action** =>

**command.pipe.after** =>

**clissOptions.pipe.after** =>

**stdout**

Where each of these steps can be handled if needed.

The properties expected by **pipe** are:

* **stdin**
`(stdinValue, args, positionalArgs, argsAfterEndOfOptions)`

* **before**
`(args, positionalArgs, argsAfterEndOfOptions)`
To transform the data being input, before it is passed in to the main command action.

* **after**
`(result, parsedArgs, positionalArgs, argsAfterEndOfOptions)`
To transform the *output* (for example, to JSON.stringify an *Object Literal*)

Note: **stdin** and **before** must always return *args*, and **after** must always return *result*, as these values will be passed in for the next function in the pipeline.

To better explain with an example, let's modify the previous one to:

* get *param3* from **stdin**
* use **before** to reverse *...args* array
* use **after** to decorate the output

Check the *pipe* property on the following code:

```javascript
cliss({
	name: 'some-command',
	description: 'Just an example that will do nothing but concat all the parameters.',
	version: '1.0.0',
	options: [{
		name: 'param1',
		description: 'This param is needed to compute everything else.',
		required: true,
		type: 'String'
	}, {
		name: 'args',
		required: true
	}],
	pipe: {
		stdin: (stdinValue, args, positionalArgs, argsAfterEndOfOptions) => {
			args.param3 = stdinValue;
			return args;
		},
		before: (args, positionalArgs, argsAfterEndOfOptions) => {
			positionalArgs.reverse();
			return args;
		},
		after: (result, parsedArgs, positionalArgs, argsAfterEndOfOptions) => {
			return `======\n${result}\n======`;
		}
	},
	action: (param1, param2, { someProp: [[ param3 ]] = [[]] } = {}, ...args) => {
		let result = `param1: ${param1} \n`;
		result += `param2: ${param2} \n`;
		result += `param3: ${param3} \n`;
		result += `args: ${args.join(',')}`;

		return result;
	}
});
```

Calling it as:
`echo "fromSTDIN" | node cli.js --param1=001 --param2=002 a r g s`

Will result in:

```bash
=======
param1: 001
param2: 2
param3: fromSTDIN
args: s,g,r,a
=======
```

### Subcommands

Subcommands can be defined in a very simple way. Thinking naturally, a subcommand should be just a command that comes nested into another one, and it is exactly how it's done.

Here one more property of the *cliSpec* is introduced: **commands**. It is an *Array* that can contains N commands, including the **commands** property (commands can be nested down to N levels).

As each subcommand is a command itself, they also counts with its own `--help` section, and possibly its own `--version` (if it is not defined for a subcommand, the one defined for the root will be shown).

The following example will introduce:

* 1 subcommand, thas has no action, and contains more 2 subcommands
* 1 subcommand that contains an action

```javascript
cliss({
	name: 'some-command',
	description: 'Just an example that will do nothing but concat all the parameters.',
	version: '1.0.0',
	options: [{
		name: 'param1',
		description: 'This param is the base value to compute everything else.',
		required: true,
		type: 'String'
	}, {
		name: 'args',
		required: true
	}],
	pipe: {
		stdin: (stdinValue, args, positionalArgs, argsAfterEndOfOptions) => {
			args.param3 = stdinValue;
			return args;
		},
		before: (args, positionalArgs, argsAfterEndOfOptions) => {
			positionalArgs.reverse();
			return args;
		},
		after: (result, parsedArgs, positionalArgs, argsAfterEndOfOptions) => {
			return `======\n${result}\n======`;
		}
	},
	action: (param1, param2, { someProp: [[ param3 ]] = [[]] } = {}, ...args) => {
		let result = `param1: ${param1} \n`;
		result += `param2: ${param2} \n`;
		result += `param3: ${param3} \n`;
		result += `args: ${args.join(',')}`;

		return result;
	},
	commands: [{
		name: 'subcommand1',
		commands: [{
			name: 'action1',
			options: [{
				name: 'param',
				required: true
			}],
			action: param => `subcommand1 action1 param: ${param}`
		}, {
			name: 'action2',
			action: () => 'subcommand1 action2'
		}]
	}, {
		name: 'subcommand2',
		action: () => console.log('subcommand2')
	}]
});
```

Call `--help` to see that a new section *Commands:* is presented:

```bash
Description:

  Just an example that will do nothing but concat all the parameters.

Usage:

  $ some-command  <options> <args...>
  $ some-command  [command]

Options:

  --param1 String   Required - This param is needed to compute
                    everything else.
  --param2
  --param3
  --args            Required

Commands:

  subcommand1
  subcommand2
```

Each subcomand has its own help section, check:
`node cli.js subcommand1 --help`

```bash
Usage:

  $ some-command subcommand1
```

`node cli.js subcommand2 --help`:

```bash
Usage:

  $ some-command subcommand2 <command>

Commands:

  action1
  action2
```

Just call the commands names separated by space:
`node cli.js subcommand2 action1 --param=VALUE`

Result:

```bash
subcommand2 action1 param: VALUE
```

### Cliss options
`cliss(cliSpec, clissOptions)`

An `Object Literal` with the following options can be passed in as the second parameter to cliss:

* **command**

  * **subcommandsDelimiter**
  To define a delimiter for a subcommand to be used instead of a white space. For example, if `'-'` is passed in, the subcommands should be called as `subcommand1-action1` instead of `subcommand1 action1`.

* **options**

  * **validateRequiredParameters**
  If set to `true`, the required parameters will be checked before the command action is called, and the help section will be shown in case a required parameter is missing.

* **help**
  * **option**
  	To define a different option name to show the help section. For example, if `'helpsection'` is passed in, `--helpsection` must be used instead of `--help`.

  * **stripAnsi**
  	Set to `true` to strip all ansi escape codes (colors, underline, etc.) and output just a raw text.

* **version**
  * **option**
  To define a different option name to show the version. For example, if `'moduleversion'` is passed in, `--moduleversion` must be used instead of `--version`.

* **pipe**
As it is defined on *cliSpec* for each command, **pipe** can also be defined in *clissOptions* to implement for all commands a unique way to handle **stdin** and also, some steps of the execution flow (**before** and **after**) in case it is needed. The pipeline execution of a command is:
**stdin** *(command.pipe.stdin || clissOptions.pipe.stdin)* =>
=> **clissOptions.pipe.before** =>
=> **command.pipe.before** =>
=> **command.action** =>
=> **command.pipe.after** =>
=> **clissOptions.pipe.after**
=> **stdout**
The properties expected by **pipe** are:

  * **stdin**
`(stdinValue, args, positionalArgs, argsAfterEndOfOptions)`

  * **before**
`(args, positionalArgs, argsAfterEndOfOptions)`
To transform the data being input, before it is passed in to the main command action.

  * **after**
`(result, parsedArgs, positionalArgs, argsAfterEndOfOptions)`
To transform the *output* (for example, to JSON.stringify an *Object Literal*)

Note: **stdin** and **before** must always return *args*, and **after** must always return *result*, as these values will be passed in for the next function in the pipeline.
