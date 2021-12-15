# NJOBS
Run some function, any function, on multiple threads up to the number of cores on your machine.
## Usage
```
npm install njobs
```

```
const runConcurrently = require('njobs');

// second argument is the number of repetitions
// third argument is the number of threads
await runConcurrently(myfunc, 8, 4);
console.log("Done!");
```

Note: child processes attach a `child=1` environment variable to the process to help you identify the main thread in more complicated code. Example function to determine whether you are in the main thread:
```
const isMain = () => {
  return !process.env.child;
};
```

## Test
`node test.js`