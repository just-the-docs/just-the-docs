# remimi - Redux Mixpanel Middleware

[![Build Status](https://travis-ci.org/BrandwatchLtd/remimi.svg?branch=master)](https://travis-ci.org/BrandwatchLtd/remimi)

Advanced Client Redux Mixpanel Middleware.

# Installation

`npm install --save @brandwatch/remimi`

## Important
**Since version 3 the package has moved to be under the `@brandwatch` scope,
make sure to update any imports/requires to include the scope.
The npm page can be found here: https://www.npmjs.com/package/@brandwatch/remimi**

# Basic Configuration

```js
import { createStore } from 'redux';
import mixpanelMiddleware from '@brandwatch/remimi';

import reducer from './your-reducers';

let store = createStore(reducer, ['Initial State'], mixpanelMiddleware(token, /*options*/));
```

This is very basic usage. You want to setup the Profiles for application in production.

# Advanced configuration - Profile

> Mixpanel allows you to tie data to a specific user, creating a profile. This is where you store things like their email address, where they came from, or their age.

https://mixpanel.com/help/reference/creating-a-profile

Function (optional) provided as second argument to middleware should be selector returning flat object for given state, see some examples below.
Middlewares requires unique identifier of an user, which is just standard id. Provide function to get the id from state.

```js
const uniqueIdSelector = state => state.me.id; // unique identifier
const personSelector = state => state.me; // data passed down to mixpanel
let store = createStore(
  reducer,
  ['Initial State'],
  mixpanelMiddleware(token, {
    personSelector: personSelector,
    uniqueIdSelector: uniqueIdSelectorm
  })
);
```

## Example example

```js
function getPerson(state) {
    const {
        auth: {
            user: {
                id,
                username,
                firstName,
                lastName,
                client: {
                    id: clientId,
                    name: clientName,
                } = {},
            } = {},
        },
    } = state;

    const person = {
        clientId: clientId,
        clientName: clientName,
        $first_name: firstName,
        $last_name: lastName,
        $email: username,
    };
}
```

## Notes
> Special properties have a leading "$". You shouldn't make up your own property names beginning with "$".

List of special properties
https://mixpanel.com/help/questions/articles/special-or-reserved-properties

# Use human-friendly names

> Developers implementing Mixpanel are sometimes tempted to use camel case, underscores, or obscure function names. We recommend choosing names that are easy to understand yet also convey the precise meaning for your Events. So for the example above, instead of calling the signup Event something like “newuser_su_done,” simply call it “Sign up complete” - that way, anyone looking at your project understand what action triggers that Event.

Mixpanel recommmend to use human names for action types and properties. You can pass formatter functions to library for humanizing names. I recommend to use existing package for humanizing the names e.g. https://www.npmjs.com/package/humanize-string

## Action Types

```
mixpanelMiddleware(token, {actionTypeFormatter: actionType => `---${actionType}---`}); // event will look like '---Action---'
```

## Properties and Increment name

```
mixpanelMiddleware(token, {propertyFormatter: property => `---${property}---`}); // mixpanel custom properties will look like '---Property---'
```

## Values
```
mixpanelMiddleware(token, {valueFormatter: value => `---${value}---`}); // mixpanel custom properties will look like '---Value---'
```


# Redux Actions

## Event

```js

const action = {
    type: 'Login',
    meta: {
        mixpanel: {
            eventName: 'Some event',
            props: {
                source: 'website',
            },
        },
    },
}
```

## Override Redux Action Type
You can use this option in case the action type is not descriptive enough, or you are moving tracking across actions but already collected some data.

```js
const action = {
    type: 'Login',
    meta: {
        mixpanel: {
            eventName: 'Some event',
            type: 'Login via API' // !!! this will take precedence over the Redux type
            props: {
                source: 'website',
            },
        },
    },
}

```

## Increment

> You can use mixpanel.people.increment to change the current value of numeric properties. This is useful when you want to keep a running tally of things, such as games played, messages sent, or points earned.

```js
// counting logins
const action = {
   type: 'Login',
   meta: {
     mixpanel: {
         eventName: 'Some event',
         increment: ['login', 1], // or
         increment: {'login': 1, 'logout': 2}, // or
         increment: 'login'
     },
   },
}
```

You can combine standard `events` with `increments`

# Warning
This is **client side mixpanel** middleware, it should be possible to make universal and support server side rendering.

Until then, you need to wrap in condition. Mixpanel-browser package requires `window` to be set, otherwise it crashes.

```js
  const middlewares = [];
  if (__CLIENT__) {
    middlewares.push(require('remimi').default(token, { personSelector, idSelector }));
  }
```


Library mixpanel-node https://github.com/mixpanel/mixpanel-node could be used to make middleware universal.

# Development

`npm test`

## Contributions

Contributions are very appreciated and welcome. We promise you a prompt response. Feel free to drop message to [kamil](https://twitter.com/kkamilio) if you have any questions.

# Credits
Thanks to [Harry](https://twitter.com/hogg_io) and [Andy](https://twitter.com/andrew_polhill) for implementing the middleware! Kudos to them.

:heart: :heart:  :heart: [Brandwatch](https://www.brandwatch.com/careers/) is looking for talented engineers in Brighton, Berlin and __Stuttgart__. :heart: :heart: :heart:
