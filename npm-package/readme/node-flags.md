# Node-Flags

This is a flags library for use with [node.js](http://nodejs.org/).  Flag definitions can be distributed across multiple files, as long as they are defined before `flags.parse()` is called.

## Installation

Fork the latest source from github, or else use NPM:

    npm install flags

## Example

    var flags = require('flags');

    flags.defineString('name', 'Billy Noone', 'Your name');
    flags.defineInteger('age', 21, 'Your age in whole years');
    flags.defineNumber('height', 1.80, 'Your height in meters');
    flags.defineStringList('pets', []);
    flags.defineMultiString('hobby', []);

    flags.parse();

    // ====

    var info = [];
    info.push('Name : ' + flags.get('name'));
    info.push('Age : ' + flags.get('age'));
    info.push('Height : ' + flags.get('height') + '"');
    info.push('Pets : ' + flags.get('pets').join(', '));
    info.push('Hobbies : \n  ' + flags.get('hobby').join('\n  '));

    console.log(info.join('\n'));

Then on the command line:

    node example.js --name='Your Name' --age 43  --height=1.234 --pets=fred,bob --hobby biking --hobby=snowboarding

## Passing Flags

 * Flag names should be prefixed with two dashes: e.g. `--flagname`
 * Values can be separated from the name with either an equal sign or a space: e.g. `--flagname=flagvalue` or `--flagname flagvalue`
 * Complex string flags should be quoted: e.g. `--flag="some flag with spaces"`
 * Additional non-flag arguments can be passed by adding `--` before the subsequent args.  The remaining args will be returned from `flags.parse()` as an array, e.g. `--one --two -- other stuff here`

## Defining Flags

To define flags, use one of the defineX functions exported by the `flags` module:

**flags.defineString** - Takes the raw input from the command line.

**flags.defineBoolean** - Usually doesn't take a value, passing --flag will set the corresponding flag to true.  Also supported are --noflag to set it to false and --flag=true or --flag=false or --flag=0 or --flag=1 or --flag=f or --flag=t 

**flags.defineInteger** - Must take a value and will be cast to a Number.  Passing a non-integer arg will throw.

**flags.defineNumber** - Must take a value and will be cast to a number.  Passing an arg that evaluates to NaN will throw.

**flags.defineStringList** - Takes a comma separated argument list and returns an array as it's value.

**flags.defineMultiString** - Same as defineString but allows multiple flags to be passed.  All values will be returned in an array.


All the define methods take the same arguments:

    flags.defineX(name, opt_default, opt_description);

`name` - The flag's name.  
`opt_default` - [optional] The default value if not specified on the command line.  
`opt_description` - [optional] Description to show in the help text.

The methods return a Flag object that exposes the following methods, for additional configuration:

`flag.setDefault({*} defaultValue)` - Sets the flag's default value.  
`flag.setDescription({string} description)` - Sets the flag's description field.  
`flag.setValidator({function(string)} validator)` - Sets a function for validating the input, should throw if the input isn't valid.  
`flag.setSecret({boolean} secret)` - If set to true then the flag won't show up in the help text.  

These setters return the flag instance so they can be chained:

    flags.defineString('test').
        setDefault('empty').
        setDescription('A test flag').
        setValidator(function(inp) {
          if (inp.substr(0, 1) != 'e') {
            throw Error('Flag must start with an "e"');
          }
        });

## Querying Flag Values

A flag's value can be queried by either calling `flags.get('flagname')` or by querying the flags object directly `flags.FLAGS.flagname.get()`.

The flag object also contains the following properties you may be interested in:

    flag.name
    flag.defaultValue
    flag.currentValue
    flag.isSet

## Testing

By default `flags.parse` uses process.argv and slices off the first 2 elements.  For tests you can pass a predefined set of arguments as an array:

    flags.parse(['--flag', '--nofood', '--foo=bar']);

If you want to change flags between test cases, you may call:

    flags.reset();

## TODOs

 * Support --flagsfile
 * Support multi space separated flags, e.g. --files file1 file2 file3

## Licence

The MIT License (MIT)

Copyright (c) 2011 Daniel Pupius

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
