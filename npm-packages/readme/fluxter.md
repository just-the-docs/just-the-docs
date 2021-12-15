[![view on npm](http://img.shields.io/npm/v/fluxter.svg)](https://www.npmjs.org/package/fluxter)
[![npm module downloads](http://img.shields.io/npm/dt/fluxter.svg)](https://www.npmjs.org/package/fluxter)
[![Build Status](https://travis-ci.org/uxter/fluxter.svg?branch=master)](https://travis-ci.org/uxter/fluxter)
[![Coverage Status](https://codecov.io/gh/uxter/fluxter/branch/master/graph/badge.svg)](https://codecov.io/gh/uxter/fluxter)
[![Dependency Status](https://david-dm.org/uxter/fluxter.svg)](https://david-dm.org/uxter/fluxter)
[![Join the chat at https://gitter.im/fluxter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/fluxter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# <a href="https://github.com/uxter/fluxter"><img src="https://rawgithub.com/uxter/fluxter/master/logo/fluxter-logo-title-245x60.png"></a>

Fluxter is a simple container of unidirectional data flow.

![Fluxter data flow](https://rawgithub.com/uxter/fluxter/master/fluxter-data-flow.png)

## Install

```
$ npm install --save fluxter
```

## Classes

<dl>
<dt><a href="#Fluxter">Fluxter</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#addReducer">addReducer(stateKey, reducer)</a></dt>
<dd><p>Add reducer to store</p>
</dd>
<dt><a href="#addMiddleware">addMiddleware(middleware)</a></dt>
<dd><p>Add middleware to store</p>
</dd>
<dt><a href="#addAction">addAction(actionName, action)</a></dt>
<dd><p>Add action to store</p>
</dd>
<dt><a href="#dispatch">dispatch(actionName, ...args)</a></dt>
<dd><p>Dispatch action to store</p>
</dd>
<dt><a href="#subscribe">subscribe(handler)</a></dt>
<dd><p>Add handler</p>
</dd>
<dt><a href="#next">next(actionData)</a></dt>
<dd><p>Call next middleware or done</p>
</dd>
</dl>

<a name="Fluxter"></a>

## Fluxter
**Kind**: global class  
**Access**: public  
<a name="new_Fluxter_new"></a>

### new Fluxter()
Class Fluxter

**Example**  
```js
let store = new Fluxter({
    user: {
        logged: false,
        name: null,
        token: null
    }
});
```
<a name="addReducer"></a>

## addReducer(stateKey, reducer)
Add reducer to store

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stateKey | <code>String</code> | A state field |
| reducer | <code>function</code> | A pure function |

**Example**  
```js
store.addReducer('user', (state = {}, actionName, actionData) => {
    if (actionName === 'login') {
        return {
            ...state,
            logged: actionData.logged,
            name: actionData.name,
            token: actionData.token
        };
    }
    return state;
});
```
<a name="addMiddleware"></a>

## addMiddleware(middleware)
Add middleware to store

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | A middleware function |

**Example**  
```js
store.addMiddleware('user', (store, actionName, actionData, next) => {
    if (actionName === 'login') {
        SomeRepository.check(actionData).then(data => next({
            ...data,
            ...actionData
        }));
    } else {
        next(actionData);
    }
});
```
<a name="addAction"></a>

## addAction(actionName, action)
Add action to store

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| actionName | <code>String</code> | An action name |
| action | <code>function</code> | An action creator function |

**Example**  
```js
store.addAction('login', (name, password) => ({
    name,
    password
}));
```
<a name="dispatch"></a>

## dispatch(actionName, ...args)
Dispatch action to store

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| actionName | <code>String</code> | An action name |
| ...args | <code>\*</code> | Arguments that take action |

**Example**  
```js
store.dispatch('login', 'example-name', 'example-password');
```
<a name="subscribe"></a>

## subscribe(handler)
Add handler

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Change state handler |

**Example**  
```js
store.subscribe(store => view.setState(store.state));
```
<a name="next"></a>

## next(actionData)
Call next middleware or done

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| actionData | <code>\*</code> | An action data |


## Example
<a href="https://github.com/uxter/seawars"><img src="https://rawgithub.com/uxter/seawars/master/logo/seawars-logo-title-316x68.png" style="max-width:100%;"></a>

Online game [SeaWars](https://github.com/uxter/seawars). Example of using [Fluxter](https://github.com/uxter/fluxter).

### :boom: [Try it out](https://uxter.github.io/seawars/) :boom:

## Note on Patches/Pull Requests

1. Fork the project.
2. Make your feature addition or bug fix.
3. Send me a pull request.

* * *

&copy; 2017 Vasily Shilov
