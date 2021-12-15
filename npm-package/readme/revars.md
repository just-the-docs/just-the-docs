# <p>![Revars logo](/logo.png "Logo")</p>
![npm](https://img.shields.io/npm/v/revars)
![GitHub](https://img.shields.io/github/license/alevnyacow/revars)
![GitHub last commit](https://img.shields.io/github/last-commit/alevnyacow/revars)
![GitHub top language](https://img.shields.io/github/languages/top/alevnyacow/revars)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Minzipped Size](https://badgen.net/bundlephobia/minzip/revars)

React global variables (some call it **state management** though).

# <p>**Usage**</p>

```ts
import { newRevar } from "revars";

const [
    /**
     * mutable object you can use anywhere,
     * think of it as of state
     */
    counter,
    /**
     * hook that makes component rerender
     * whenever according state object changes
     */
    useCounterRerender
] = newRevar(
    /**
     * initial state value
     */
    { counterValue: 0 }
);
```

Really, like *this* simple. It works with any nesting levels and array fields. And you also can have any number of revars in your React application. 

# <p>**Timer example** [(codesandbox link)](https://codesandbox.io/s/revars-timer-example-71fw6)</p>

```tsx
import React, { useEffect, useCallback } from "react";
import { newRevar } from "revars";

// creating revars
const [timer, useTimerRerender] = newRevar({ ticks: 0 });
const [stats, useStatsRerender] = newRevar({ resetCount: 0 });

// custom hooks
const useTimerIncrease = () => {
    useEffect(() => {
        setInterval(() => timer.ticks++, 1000);
    }, []);
};

const useTimerReset = () => {
    return useCallback(() => {
        timer.ticks = 0;
        stats.resetCount++;
    }, []);     
};

// components
const Timer: React.FC = () => {
    useTimerRerender();
    useTimerIncrease();
    const timerReset = useTimerReset();

    return <div>
        <span>{ timer.ticks } ticks</span>
        <button onClick={ timerReset }>
            Reset timer
        </button>
    </div>
};

const Stats: React.FC = () => {
    useStatsRerender();

    return <div>Reset happened { stats.resetCount } times</div>
};

const App: React.FC = () => {
    const timerReset = useTimerReset();

    return <>
        <Timer />
        <Stats />
        <button onClick={ timerReset }>Reset timer from App</button>
    </>
};
```

# <p>**Package API**</p>

<p>newRevar</p>

Takes initial Revar value as a parameter and returns array of Revar and a hook for using rerenders on this Revar changes. 

```ts
function newRevar<T>(initialState: T): [T, () => void]
```
