# react-input-mask

[![Build Status](https://img.shields.io/travis/sanniassin/react-input-mask/master.svg?style=flat)](https://travis-ci.org/sanniassin/react-input-mask) [![npm version](https://img.shields.io/npm/v/react-input-mask.svg?style=flat)](https://www.npmjs.com/package/react-input-mask) [![npm downloads](https://img.shields.io/npm/dm/react-input-mask.svg?style=flat)](https://www.npmjs.com/package/react-input-mask)

Input masking component for React. Made with attention to UX.

**This is a development branch for version 3.0. For the latest stable version [see v2 branch](https://github.com/sanniassin/react-input-mask/tree/v2).**

#### [Demo](http://sanniassin.github.io/react-input-mask/demo.html)

# Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Properties](#properties)
* [Known Issues](#known-issues)

# Installation
```npm install react-input-mask@next --save```

react-input-mask requires **React 16.8.0 or later.** If you need support for older versions, use [version 2](https://github.com/sanniassin/react-input-mask/tree/v2).

# Usage
```jsx
import React from "react"
import InputMask from "react-input-mask";

function DateInput(props) {
  return <InputMask mask="99/99/9999" onChange={props.onChange} value={props.value} />;
}
```

# Properties
|                           Name                            |               Type                | Default | Description |
|        :-----------------------------------------:        |    :-------------------------:    | :-----: | :--------------------------------------------------------------------- |
|                    **[`mask`](#mask)**                    | `{String\|Array<String, RegExp>}` |         | Mask format |
|         **[`maskPlaceholder`](#maskplaceholder)**         |            `{String}`             |   `_`   | Placeholder to cover unfilled parts of the mask |
|          **[`alwaysShowMask`](#alwaysshowmask)**          |            `{Boolean}`            | `false` | Whether mask prefix and placeholder should be displayed when input is empty and has no focus |
| **[`beforeMaskedStateChange`](#beforemaskedstatechange)** |            `{Function}`           |         | Function to modify value and selection before applying mask |
|                **[`children`](#children)**                |          `{ReactElement}`         |         | Custom render function for integration with other input components |


### `mask`

Mask format. Can be either a string or array of characters and regular expressions.<br /><br />


```jsx
<InputMask mask="99/99/99" />
```
Simple masks can be defined as strings. The following characters will define mask format:

| Character | Allowed input |
| :-------: | :-----------: |
|     9     |      0-9      |
|     a     |    a-z, A-Z   |
|     *     | 0-9, a-z, A-Z |

Any format character can be escaped with a backslash.<br /><br />


More complex masks can be defined as an array of regular expressions and constant characters.
```jsx
// Canadian postal code mask
const firstLetter = /(?!.*[DFIOQU])[A-VXY]/i;
const letter = /(?!.*[DFIOQU])[A-Z]/i;
const digit = /[0-9]/;
const mask = [firstLetter, digit, letter, " ", digit, letter, digit];
return <InputMask mask={mask} />;
```


### `maskPlaceholder`
```jsx
// Will be rendered as 12/--/--
<InputMask mask="99/99/99" maskPlaceholder="-" value="12" />

// Will be rendered as 12/mm/yy
<InputMask mask="99/99/99" maskPlaceholder="dd/mm/yy" value="12" />

// Will be rendered as 12/
<InputMask mask="99/99/99" maskPlaceholder={null} value="12" />
```
Character or string to cover unfilled parts of the mask. Default character is "\_". If set to `null` or empty string, unfilled parts will be empty as in a regular input.


### `alwaysShowMask`

If enabled, mask prefix and placeholder will be displayed even when input is empty and has no focus.


### `beforeMaskedStateChange`
In case you need to customize masking behavior, you can provide `beforeMaskedStateChange` function to change masked value and cursor position before it's applied to the input.

It receieves an object with `previousState`, `currentState` and `nextState` properties. Each state is an object with `value` and `selection` properites where `value` is a string and selection is an object containing `start` and `end` positions of the selection.
1. **previousState:** Input state before change. Only defined on `change` event.
2. **currentState:** Current raw input state. Not defined during component render.
3. **nextState:** Input state with applied mask. Contains `value` and `selection` fields.

Selection positions will be `null` if input isn't focused and during rendering.

`beforeMaskedStateChange` must return a new state with `value` and `selection`.

```jsx
// Trim trailing slashes
function beforeMaskedStateChange({ nextState }) {
  let { value } = nextState;
  if (value.endsWith("/")) {
    value = value.slice(0, -1);
  }

  return {
    ...nextState,
    value
  };
}

return <InputMask mask="99/99/99" maskPlaceholder={null} beforeMaskedStateChange={beforeMaskedStateChange} />;
```

Please note that `beforeMaskedStateChange` executes more often than `onChange` and must be pure.


### `children`
To use another component instead of regular `<input />` provide it as children. The following properties, if used, should always be defined on the `InputMask` component itself: `onChange`, `onMouseDown`, `onFocus`, `onBlur`, `value`, `disabled`, `readOnly`.
```jsx
import React from 'react';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';

// Will work fine
function Input(props) {
  return (
    <InputMask mask="99/99/9999" value={props.value} onChange={props.onChange}>
      <MaterialInput type="tel" disableUnderline />
    </InputMask>
  );
}

// Will throw an error because InputMask's and children's onChange props aren't the same
function InvalidInput(props) {
  return (
    <InputMask mask="99/99/9999" value={props.value}>
      <MaterialInput type="tel" disableUnderline onChange={props.onChange} />
    </InputMask>
  );
}
```

# Known Issues
### Autofill
Browser's autofill requires either empty value in input or value which exactly matches beginning of the autofilled value. I.e. autofilled value "+1 (555) 123-4567" will work with "+1" or "+1 (5", but won't work with "+1 (\_\_\_) \_\_\_-\_\_\_\_" or "1 (555)". There are several possible solutions:
1. Set `maskChar` to null and trim space after "+1" with `beforeMaskedStateChange` if no more digits are entered.
2. Apply mask only if value is not empty. In general, this is the most reliable solution because we can't be sure about formatting in autofilled value.
3. Use less formatting in the mask.

Please note that it might lead to worse user experience (should I enter +1 if input is empty?). You should choose what's more important to your users — smooth typing experience or autofill. Phone and ZIP code inputs are very likely to be autofilled and it's a good idea to care about it, while security confirmation code in two-factor authorization shouldn't care about autofill at all.

### Cypress tests
The following sequence could fail
```js
cy.get("input")
  .focus()
  .type("12345")
  .should("have.value", "12/34/5___"); // expected <input> to have value 12/34/5___, but the value was 23/45/____
````

Since [focus is not an action command](https://docs.cypress.io/api/commands/focus.html#Focus-is-not-an-action-command), it behaves differently than the real user interaction and, therefore, less reliable.

There is a few possible workarounds
```js
// Start typing without calling focus() explicitly.
// type() is an action command and focuses input anyway
cy.get("input")
  .type("12345")
  .should("have.value", "12/34/5___");

// Use click() instead of focus()
cy.get("input")
  .click()
  .type("12345")
  .should("have.value", "12/34/5___");

// Or wait a little after focus()
cy.get("input")
  .focus()
  .wait(50)
  .type("12345")
  .should("have.value", "12/34/5___");
````

# Thanks
Thanks to [BrowserStack](https://www.browserstack.com/) for the help with testing on real devices
