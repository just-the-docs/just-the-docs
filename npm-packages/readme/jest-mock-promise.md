# What's this?
This a _synchronous_ implementation od JavaScript Promise. *JestMockPromise* implements the same API as native JavaScript Promise, with two added benefits:
* it works synchronously - it calls the handler functions (`then`, `catch`, `finally`) right away (examples below clarify this)
* it exposes the `resolve` and `reject` functions as instance methods allowig the promise to be resolved outside of _executor function_

Although its originally created to make writing unit tests easier, it can also be used outside the unit testing context.

# What's in this document?

* [API](#api)
* [JestMockPromise vs native Promise](#jestmockpromise-vs-native-promise)
* [An unit testing example?](#an-unit-testing-example)
  * [First example - Traditional async test](#first-example---traditional-async-test)
  * [Second example - Applying the synchronous Promise](#second-example---applying-the-synchronous-promise )
  * [Third example - Mocking `fetch`](#third-example---mocking-fetch)

# TL; DR
### Why is it then called *jest-mock-promise*?
Because it was originally written as a part of the [jest-mock-fetch](https://www.npmjs.com/package/jest-mock-fetch) project and still is it's integral part (as an external dependency). So it's name is a legacy of it's humble beginnings :)

### Can it be used in unit testing?
The answer is **Yes**! Since it's not married with Jest it can also be used with other JavaScript testing frameworks (i.e. Mocha, Jasmine).

# API

The API of this synchronous promise matches the one of the regular Promise, with two additional instance methods (attached to an instance of the Promise):
* `resolve` - resolves a promise instance
* `reject` - rejects a promise instance

This methods do the same job as the ones passed to the main callback function:
```javascript
new Promise((resolve, reject) => { resolve(1,2);  });
```
Having `resolve` and `reject` attached as instance methods enables us to call them outside the callback function, which makes our code much more readable:
```javascript
let promise = new Promise();

// resolving a promise
promise.resolve(1, 2);
```

# JestMockPromise vs native Promise

Let's jump right in and see an example:
```javascript
import JestMockPromise from "../lib/jest-mock-promise";

const promise = new JestMockPromise((resolve, reject) => {
    // do you business normal here as normaly
});

console.log('1. Promise is ready');

promise.then(() => console.log('3. Promise is resolved');

console.log('2. Will resolve the promise');
promise.resolve(); // resolving the promise directly

console.log('4. Last line of code');
```

Let's now have a look at what the console output will look:
```
1. Promise is ready
2. Will resolve the promise
3. Promise is resolved
4. Last line of code
```
As you can see, the `then` handler was executed **before** the last line of code!

The crutial thing here is that this promise exposes the *resolve* function as an **instance method**, which means that you can call it directly on the instance of the promise object. This becomes escpecially useful in unit testing when you need to mock a component which returns a promise (i.e. [`jest-mock-fetch`](https://github.com/knee-cola/jest-mock-fetch)).

Let's now try to implement something similar using regular Promise object:

```javascript
// here we'll store the resolve Function
let resolveFn;

// creating a new promis
let promise = new Promise((resolve, reject) => {
    // assigning the resolve function a variable from outter scope
    resolveFn = resolve;
    console.log('1. Promise is ready');
});

// attaching a `then` handler
promise.then(() => console.log('3. Promise is resolved'));

// resolving the promise right away
console.log('2. Will resolve the promise');
resolveFn();

console.log('4. Last line of code');
```
The regular promise would produce the following console output:
```
1. Promise is ready
2. Will resolve the promise
4. Last line of code
3. Promise is resolved
```

If you compare this with the first example you can notice the following:
1. the order of execution is different - *"3. Promise is resolved"* is logged to the console **AFTER** *"4. Last line of code"*
2. in order to access the `resolve` function you need to store to an outside variable within the Promise callback function

# An unit testing example

Synchronous Promise was created to simplify unit testing an async component. So in the next two examples we'll have a look at how we can do just that - simplify a unit test.

## What we'll be testing

We are going to test a component, which multiplies two numbers provided as a payload of a promise. The result is returned a call to a callback function.

The following snippet shows implementation of that component:
```javascript
// ./src/component.js
import Promise from 'es6-promise';

const onPromiseMultiply = (promise, callback) => {
    promise.then((a,b) => {
        callback(a*b);
    })
};

export {onPromiseMultiply};
```

Now let's write some Jest tests.

## First example - Traditional async test

In our first example we'll create a test in a traditional async way ... just to show how terible it is. Then, in the second example, we'll improve on the original idea by introducing `jest-mock-promise`.

The next snippet contains a test written in traditional async way:
```javascript
// ./src/__test__/component.spec.js
import {onPromiseMultiply} from '../component.js';

describe('testing the multiply component', () => {

    it('should multiply two numbers and provide the result to the callback function', () => {

        let callbackFn = jest.fn();
        let promise = new Promise((resolve, reject) {
            // providing two numbers which need to be multiplied
            // as we know, although we have resolved the promise right away,
            // `then` handlers will be called asnyc at later time
            resolve(1,2);
        });

        // calling the function we want to test
        onPromiseMultiply(promise, callbackFn);

        // Altought promise is already resolved, `then` handlers will
        // be called asnyc at later time. That's why we need to put
        // our expectation inside a `then` handler
        // + we need to return a promise to the Jest, so it knows
        // we're doing some async testing
        return(promise.then(() => {
            expect(callbackFn).toHaveBeenCalledWith(3);
        }));
    });
})
```
As we can see, it's not easy to see the order in which our code gets executed. Can we make this better? Yes we can! In the following section we'll see how ...

## Second example - Applying the synchronous Promise 
The first thing we need to do is install this component: `npm i --save-dev jest-mock-promise`

Since our component uses `es6-promise`, we'll manually mock this dependency (if you don't know what manual mocking is, have a look at [Manual Mocks @ Jest](https://facebook.github.io/jest/docs/en/manual-mocks.html) ). We'll create a `__mocks__` directory inside our project root. There we'll create a `es6-promise.js` file with the following content:
```javascript
// ./__mocks__/es6-promise.js
import JestMockPromise from 'jest-mock-promise';

// mocking the es6-promise, which is used by component we are testing
export { JestMockPromise as Promise };
```
Now that's set up, we can modify our test:
```javascript
// ./src/__test__/component.spec.js
import {onPromiseMultiply} from '../component.js';

describe('testing the multiply component', () => {

    it('should multiply two numbers and provide the result to the callback function', () => {

        let callbackFn = jest.fn();
        let promise = new Promise();

        // calling the function we want to test
        onPromiseMultiply(promise, callbackFn);

        // resolving our promise
        promise.resolve(1,2);

        // testing to see if our function is working correctly
        expect(callbackFn).toHaveBeenCalledWith(3);
    });
})
```
As we can see, reading our code just became much easier! Hooray!

## Third example - Mocking `fetch`

As the final example we can have a look source code of [`jest-mock-fetch`](https://github.com/knee-cola/jest-mock-fetch), which is based on `jest-mock-promise`.

# License
MIT License, http://www.opensource.org/licenses/MIT