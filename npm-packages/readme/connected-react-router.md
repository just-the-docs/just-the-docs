> Breaking change in v5.0.0! Please read [How to migrate from v4 to v5/v6](https://github.com/supasate/connected-react-router/blob/master/FAQ.md#how-to-migrate-from-v4-to-v5v6).

> v6.0.0 requires React v16.4.0 and React Redux v6.0 / v7.0.

Connected React Router [![Build Status](https://travis-ci.org/supasate/connected-react-router.svg?branch=master)](https://travis-ci.org/supasate/connected-react-router) [![Open Source Helpers](https://www.codetriage.com/supasate/connected-react-router/badges/users.svg)](https://www.codetriage.com/supasate/connected-react-router)
======================
A Redux binding for React Router v4 and v5

Main features
-------------
:sparkles: Synchronize router state with redux store through uni-directional flow (i.e. history -> store -> router -> components).

:gift: Supports [React Router v4 and v5](https://github.com/ReactTraining/react-router).

:sunny: Supports functional component hot reloading while preserving state (with [react-hot-reload](https://github.com/gaearon/react-hot-loader)).

:tada: Dispatching of history methods (`push`, `replace`, `go`, `goBack`, `goForward`) works for both [redux-thunk](https://github.com/gaearon/redux-thunk) and [redux-saga](https://github.com/yelouafi/redux-saga).

:snowman: Nested children can access routing state such as the current location directly with `react-redux`'s `connect`.

:clock9: Supports time traveling in Redux DevTools.

:gem: Supports [Immutable.js](https://facebook.github.io/immutable-js/)

:muscle: Supports TypeScript


Installation
-----------
Connected React Router requires **React 16.4 and React Redux 6.0 or later**.


    npm install --save connected-react-router

Or

    yarn add connected-react-router

Usage
-----
### Step 1
In your root reducer file, 
- Create a function that takes `history` as an argument and returns a root reducer.
- Add `router` reducer into root reducer by passing `history` to `connectRouter`. 
- **Note: The key MUST be `router`**.
 
```js
// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ... // rest of your reducers
})
export default createRootReducer
```

### Step 2
When creating a Redux store,
- Create a `history` object.
- Provide the created `history` to the root reducer creator.
- Use `routerMiddleware(history)` if you want to dispatch history actions (e.g. to change URL with `push('/path/to/somewhere')`).


```js
// configureStore.js
...
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
...
export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )

  return store
}
```

### Step 3

- Wrap your react-router v4/v5 routing with `ConnectedRouter` and pass the `history` object as a prop.  Remember to delete any usage of `BrowserRouter` or `NativeRouter` as leaving this in will [cause](https://github.com/supasate/connected-react-router/issues/230#issuecomment-461628073) [problems](https://github.com/supasate/connected-react-router/issues/230#issuecomment-476164384) synchronising the state.
- Place `ConnectedRouter` as a child of `react-redux`'s `Provider`.
- **N.B.** If doing server-side rendering, you should still use the `StaticRouter` from `react-router` on the server.

```js
// index.js
...
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'
...
const store = configureStore(/* provide initial state if any */)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
      <> { /* your usual react-router v4/v5 routing */ }
        <Switch>
          <Route exact path="/" render={() => (<div>Match</div>)} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-root')
)
```
Note: the `history` object provided to `router` reducer, `routerMiddleware`, and `ConnectedRouter` component must be the same `history` object.

Now, it's ready to work!


Examples
--------
See the [examples](https://github.com/supasate/connected-react-router/tree/master/examples) folder

[FAQ](https://github.com/supasate/connected-react-router/tree/master/FAQ.md)
-----
- [How to navigate with Redux action](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-navigate-with-redux-action)
- [How to get the current browser location (URL)](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-get-the-current-browser-location-url)
- [How to set Router props e.g. basename, initialEntries, etc.](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-set-router-props-eg-basename-initialentries-etc)
- [How to hot reload functional components](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-hot-reload-functional-components)
- [How to hot reload reducers](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-hot-reload-reducers)
- [How to support Immutable.js](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-support-immutablejs)
- [How to implement server-side rendering](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e) ([sample codebase](https://github.com/cereallarceny/cra-ssr))
- [How to migrate from v4 to v5](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-migrate-from-v4-to-v5)
- [How to use connected-react-router with react native](./FAQ.md#how-to-use-connected-react-router-with-react-native)
- [How to use your own context with react-redux](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-use-your-own-context-with-react-redux)

Build
-----
```bash
npm run build
```
Generated files will be in the `lib` folder.

Development
-----------
When testing the example apps with `npm link` or `yarn link`, you should explicitly provide the same `Context` to both `Provider` and `ConnectedRouter` to make sure that the `ConnectedRouter` doesn't pick up a different `ReactReduxContext` from a different `node_modules` folder.

In `index.js`.
```js
...
import { Provider, ReactReduxContext } from 'react-redux'
...
      <Provider store={store} context={ReactReduxContext}>
        <App history={history} context={ReactReduxContext} />
      </Provider>
...
```

In `App.js`,
```js
...
const App = ({ history, context }) => {
  return (
    <ConnectedRouter history={history} context={context}>
      { routes }
    </ConnectedRouter>
  )
}
...
```

Contributors
------------
See [Contributors](https://github.com/supasate/connected-react-router/graphs/contributors) and [Acknowledge](https://github.com/supasate/connected-react-router/blob/master/ACKNOWLEDGE.md).

License
-------
[MIT License](https://github.com/supasate/connected-react-router/blob/master/LICENSE.md)
