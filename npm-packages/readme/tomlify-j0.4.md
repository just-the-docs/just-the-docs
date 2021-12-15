# TOMLify-j0.4

[![Build Status](https://travis-ci.org/jakwings/tomlify-j0.4.svg)](https://travis-ci.org/jakwings/tomlify-j0.4)
[![NPM version](https://badge.fury.io/js/tomlify-j0.4.svg)](http://badge.fury.io/js/tomlify-j0.4)

As its name *TOMLify-j0.4* says, this is a [TOML] v[0.4.0] compliant encoder.
(JavaScript Object -> TOML text)

[TOML]: https://github.com/toml-lang/toml
[0.4.0]: https://github.com/toml-lang/toml/blob/master/versions/en/toml-v0.4.0.md


### Live Demo

<https://jakwings.github.io/tomlify-j0.4/demo/>

You can see the result from tomlify-j0.4 in the debug console of your browser.

The parser used in the demo is [toml-j0.4]

[toml-j0.4]: https://github.com/jakwings/toml-j0.4


### Usage

You can install it via `npm install tomlify-j0.4`, or just include the script
`tomlify.js` or `dist/tomlify.min.js` in your web pages.

```javascript
var tomlify = require('tomlify-j0.4');

var table = {
    about: {
        name: 'tomlify-j0.4',
        maintainers: ['Jak Wings'],
        todos: [
            {
                done: false,
                priority: 'important',
                text: 'Add some test scripts.'
            },
            {
                done: true,
                priority: 'normal',
                text: 'Open source this project.'
            }
        ]
    },
    more: {
        version: [2, 0, 0],
        date: new Date('2017-04-14T00:08:00+08:00')
    }
};

try {
    var text = tomlify.toToml(table, {space: 2});  // indent with 2 spaces
    /* OUTPUT:
     * [about]
     * name = "tomlify-j0.4"
     * maintainers = [
     *   "Jak Wings"
     * ]
     *
     *   [[about.todos]]
     *   done = false
     *   priority = "important"
     *   text = "Add some test scripts."
     *
     *   [[about.todos]]
     *   done = true
     *   priority = "normal"
     *   text = "Open source this project."
     *
     * [more]
     * version = [
     *   2.0,
     *   0.0,
     *   0.0
     * ]
     * date = 2017-04-13T16:08:00.000Z
     */
    var text = tomlify.toToml(table, {
        space: '  ',
        replace: function (key, value) {
            var context = this;
            var path = tomlify.toKey(context.path);
            if (/^more\.version\.\[\d+\]$/.test(path)) {
                return value.toFixed(0);  // Change the text transformed from the value.
            }
            if (context.path[0] === 'about' &&
                context.path[1] === 'todos' &&
                context.path[2] === 1) {
                return null;  // Drop one table from the todo array.
            }
            return false;  // Let tomlify decide for you.
        }
    });
    /* OUTPUT:
     * [about]
     * name = "tomlify-j0.4"
     * maintainers = [
     *   "Jak Wings"
     * ]
     *
     *   [[about.todos]]
     *   done = false
     *   priority = "important"
     *   text = "Add some test scripts."
     *
     * [more]
     * version = [
     *   2,
     *   0,
     *   0
     * ]
     * date = 2017-04-13T16:08:00.000Z
     */
    var text = tomlify.toToml({
        null: null,
        undefined: undefined,
        numbers: [1, 2, null, , 3, 4]
    });
    /* OUTPUT:
     * numbers = [1.0, 2.0, 3.0, 4.0]
     */
} catch (err) {
    // do something
}
```


### APIs

#### tomlify.toToml(table, options)

Use it to transform a table object into TOML text.

*   `table`: must be an object other than an instance of Array or Date.

    By default, all numbers are transformed into floats and arrays of numbers
    will become arrays of floats. And `null` or `undefined` in an array or
    object property whose value is `null` or `undefined` will be ignored. You
    can change this behavior through `options.replace`.

*   options.replace - `{function(this: Context, key: String|Number, value:Mixed): Mixed}`:

    The function used to change the default text output.

    *   `@this {Context}`:
        *   `@property {Array.<String|Number>}` path: The key path to current value.
        *   `@property {Table|Array}` table: The direct parent object.
    *   `@param {String|Number}` key: The key of the value in current parent object.
    *   `@param {Mixed}` value: The current value.
    *   `@return {Mixed}` A string to change the value output, `false` to
        cancel, `null` or `undefined` to remove the output.

*   options.space - `{String|Number}`:

    Specify the padding string for indentation.

    If it is a non-negative integer N, then use N space " " for indentation. If
    it is a string, then use this string for indentation. Otherwise, no
    indentation will be performed.

*   options.sort - `{function(a: String, b: String): Number}`:

    The compare function for sorting table keys.

    It is used for `Array.prototype.sort()`.

#### tomlify.toValue(value, options)

Just like `tomlify.toToml(table, options)`, it is used to transform a value into TOML
value for a key-value pair. `value` cannot be null or undefined.

However, an inline-table always fits into one line, no matter what it contains.

E.g.

```javascript
tomlify.toValue({one: 1, two: 2});
//=> {one = 1.0, two = 2.0}

tomlify.toValue(["apple", "banana"], {space: 2});
//=>
//[
//  "apple",
//  "banana"
//]

tomlify.toValue([
  {people: ["Alice", "Bob"]},
  {fruits: ["apple", "banana"]}
], {space: 2});
//=>
//[
//  {people = ["Alice", "Bob"]},
//  {fruits = ["apple", "banana"]}
//]
```

#### tomlify.toKey(path, alternative)

*   path - `{String|Array.<String|Number>}`: A key or a key path.
*   alternative - `{Boolean}`: Whether numbers in the key path will be ignored.

Use it to get a TOML key or key path for the key-value pair. E.g.

```javascript
tomlify.toKey('money');  //=> money
tomlify.toKey('$');      //=> "$"

tomlify.toKey(['sir', 'Mr. Smith']);        //=> sir."Mr. Smith"
tomlify.toKey(['food', 0, 'price']);        //=> food.[0].price
tomlify.toKey(['food', 0, 'price'], true);  //=> food.price
```


### Known Problems

*   JavaScript does not have any integer type.

    All numbers are floats in JavaScript. Any integer bigger than
    Number.MAX_SAFE_INTEGER (9007199254740991 < 2^63 - 1) or smaller than
    Number.MIN_SAFE_INTEGER (-9007199254740991 > -(2^63 - 1)) is not safe when
    being converted or used as a pure integer! You should store big integers in
    strings.

    All numbers are transformed into floats by default. You can change this
    behavior by using a replacer function with tomlify-j0.4.
