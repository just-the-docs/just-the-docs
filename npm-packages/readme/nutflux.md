# Nutflux
Simple idiomatic flux helpers based on Facebook's Dispatcher.

# Installation

```js
npm install nutflux --save
```

# Usage

* Creating constants that won't overlap, even with the same string value

```es6
var { createConstants } = require("nutflux");

var MyConstants = createConstants(
    "HELLO_WORLD"
);

module.exports = MyConstants;
```

* Built in single `flux.Dispatcher` instance - `Nutflux.AppDispatcher`

```es6
var { AppDispatcher } = require("nutflux");
var MyConstants = require("./MyConstants");

AppDispatcher.dispatch({
    actionType: MyConstants.HELLO_WORLD,
    to: "Nutmeg"
});
```

* Handy `BaseStore` class:
```es6
var { BaseStore } = require("nutflux");
var React = require("react");
var baseStore = new BaseStore();

baseStore.registerWithDispatcher();

var TestContainer = React.createClass({

    componentDidMount() {
        baseStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        baseStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        console.log("CHANGED!");
    },

});

baseStore.emitChange();
```

* Even handier `createStore` wrapper function
  * Use `initialize` function to set up initial state for the store
  * Use `mixins` in much the same way as `React.createClass` does.
  * Define `handlers` for `actionTypes` declaratively.

```es6
var { createStore } = require("nutflux");
var MyConstants = require("./MyConstants");
var MyStoreMixin = require("./MyStoreMixin");

var HelloWorldStore = createStore({
    mixins: [
        MyStoreMixin
    ],

    initialize: function() {
        this.saidHello = false;
    },

    handlers: {
        [MyConstants.HELLO_WORLD]: "helloWorld"
    },

    helloWorld() {
        console.log("hello there!");
        this.saidHello = true;
        this.emitChange();
    },

    getHasSaidHello: function() {
        return this.saidHello;
    }
});

module.exports = HelloWorldStore;
```

* Even handier `createStoreListenMixin` lets us build a way of components listening to stores and setting state when those stores change.

```es6
var { createStoreListenMixin } = require("nutflux");
var React = require("react");
var HelloWorldStore = require("./HelloWorldStore");

var HelloWorldContainer = React.createClass({

    mixins: [
        createStoreListenMixin(HelloWorldStore)
    ],

    getStateFromStores() {
        return {
            hasSaidHello:  return HelloWorldStore.getHasSaidHello()
        }
    },

});

module.exports = HelloWorldContainer;
```

* `createPureClass(obj)` simplifies using PureRenderMixin - it adds PureRenderMixin `obj.mixins` and passes obj to `React.createClass()`
