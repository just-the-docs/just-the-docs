# Reswap

### Reswap is still in early development, 0.1.x is not a stable release yet!

**Reswap is a fully reactive state container built on the current [observable proposal](https://github.com/tc39/proposal-observable)**, enabling powerful asynchronous patterns out of the box. It is inspired by Clojure's take on mutable state, atoms, and Reagent's (ClojureScript's React Wrapper) reactive atoms.

Current popular JavaScript state containers have comparably a lot of boilerplate or depend on reacting to mutable state. Reswap follows the state model made popular by Redux but aims to simplify it by reducing boilerplate and decreasing the amount of concepts to learn. As it follows the predictable model of declaring how state is allowed to be changed, it is **not** built on the need to mutate objects, as mutation introduces complexity, is error-prone and is especially troublesome in asynchronous and concurrent programs. You cannot control who mutates what, and you cannot track where and when it happens.

```js

import { store, reducer } from 'reswap'

//just a normal Observable following ECMAScript spec
const hello = new Observable((observer) => {
    setTimeout(() => observer.next('hello world'), 1000)
})

const store = store('', //give initial value to store
    //reducers listen to observables and update store as they emit new values
    reducer(hello, (currentState, value) => value),

    //named reducer can be used to update store imperatively
    reducer('replace', (currentState, word, newWord) => currentState.replace(word, newWord))
)

//store created by reswap is also an Observable
store.subscribe({
    next: (state) => {
        console.log(state) //0ms: ''
                           //1000ms: 'hello world'
                           //after: 'hello reswap'

        if (state === 'hello world') {
            //push value directly to named reducer, causing state to update
            store.reducers.replace('world', 'reswap')
        }
    }
})
```

## Library features

- **Simple reactive API** which gives your program just enough structure but gives freedom to choose the architecture around it.
- **Built on ECMAScript observable proposal**, will work with all Observable libraries supporting the spec.
- **Stores are observables** holding state as their current value. The state can only be changed by reducers defined by the store.
- **No imperative dispatch()**, or dispatch at all, to be exact. **Reducers are also built on observables and update store through reacting to other observables**. You can, however, also push data to reducers directly as convenience to work with imperative APIs. Reactive reducers are great for programs dealing with concurrency and enable nice separation of concerns.
- **Works with existing FRP libraries out of the box**, such as [Kefir](https://rpominov.github.io/kefir/), [RXJS](http://reactivex.io/) and [Most](https://github.com/cujojs/most). If it supports ES Observables, it works. Other FRP libraries are also interoperable with small amount of glue code.
- **Focus on immutable data** but since JavaScript has no built-in immutable collections, it is not enforced and works with mutable state as well.
- **Debug mode** which will tell if you are accidentally mutating state in or out of your reducers.
- **No mandatory actions**, the idea is to avoid unnecessary granular code and have as little boilerplate as possible. Actions make sense if you have multiple sources interested in any given event, otherwise you can just directly update your store. The need for actions is usually seen by having multiple sources interested in the action, be it stores or reactions (=side-effects). Reswap actions are simply observables which you can push values to.
- **Application state** is easily built from multiple reactive stores, and it scales better and is easier to optimize than a single-store approach, still giving all the same benefits due to being built on observables. Your reactive stores can be as large or as small as you want to.

## Advanced example

To be coming...

## License

MIT