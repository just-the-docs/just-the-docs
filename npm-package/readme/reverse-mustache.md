# reverse-mustache [![Build status](https://travis-ci.org/twolfson/reverse-mustache.png?branch=master)](https://travis-ci.org/twolfson/reverse-mustache)

Reverse templating library for [mustache][], generating variables from a template's output

This was created to explore the untapped reverse templating domain. It was initially inspired by [@laktek's `extract-values` library][extract-values].

[mustache]: https://github.com/janl/mustache.js
[extract-values]: http://www.laktek.com/2012/10/04/extract-values-from-a-string/

```js
reverseMustache({
  template: 'hello {{#place}}world{{/place}}',
  content: 'hello world'
});
// {world: true}
```

## Getting Started
Install the module with: `npm install reverse-mustache`

```javascript
var reverseMustache = require('reverse-mustache');
reverseMustache({
  template: 'hello {{#place}}world{{/place}}',
  content: 'hello world'
});
/*
{
  place: true
}
*/
```

## Documentation
**Foreword**: The current implementation is quick and dirty to see if the project was possible.

`reverse-mustache` exposes the `reverseMustache` function as its `module.exports`.

### `reverseMustache(params)`
Reverse template output into its original variables

- params `Object`, container for function parameters
  - template `String`, template used to generate output
  - content `String`, output to reverse/extract variables from
  - partials `Object|Function`, container or function that returns partial templates
      - More info: https://github.com/janl/mustache.js/tree/0.8.1#partials
  - tags `String[]`, 2 item array containing opening and closing tags
      - More info: https://github.com/janl/mustache.js/tree/0.8.1#set-delimiter

**Returns**:

If `reverseMustache` cannot resolve variables that match the output, then it will return `null`.

If the match is successful, it will return an object `context`.

- context `Object`, container for state of template
  - tokensByName `Object`, key-value pairs representing original data
  - We are skipping over other variables which may change later on

### Functionality
```
[x] Reverse text nodes
[x] Reverse boolean conditionals
[x] Reverse escaped variables
[x] Reverse unescaped variables
[x] Reverse for loops
[x] Re-use variables / prevent contradictions
[x] Reverse nested objects/nested paths
[x] Reverse inverted conditionals
[x] Handle comments
[x] Handle partials
[x] Handle alternative open/close tags
```

## Examples
Below are some examples of using `reverseMustache`

### Variables
This is an example where we have a variable in our template

```js
reverseMustache({
  template: 'hello {{place}}',
  content: 'hello moon'
});
// {place: 'moon'}
```

### Partials
This is an example using an object containing partials

```js
reverseMustache({
  template: 'hello {{> place}}',
  content: 'hello moon'
  partials: {
    place: '{{name}}'
  }
});
// {place: {name: 'moon'}}
```

### Tags
This is an example using an alternative open/close tags

```js
reverseMustache({
  template: 'hello <%=place%>',
  content: 'hello moon'
});
// {place: 'moon'}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Mar 23 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
