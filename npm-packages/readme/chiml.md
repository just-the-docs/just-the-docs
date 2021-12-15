# CHIML

## What is it?

CHIML (Chimera Markup Language) is a declarative dependency injection framework based on `Ramda.js`. CHIML allows you to build software by composing your pre-existing components (`CLI programs`, or `JavasScript modules`).

## What problems does it solve?

* Spaghetti code
* Unclear error message
* Code redundancy

## Who is it for?

* Developers who want to build solution by composing `Javascript module` and `CLI programs` in a declarative way using `YAML`.
* Developers who don't want to memorize a lot of keyword. CHIML only has 5 keywords: `injection`, `bootstrap`, `component`, `arity`, `setup`, `parts`.

# Convention and Philosophy

* No global state.
* What to do instead of how to do.
* Readability matters, brevity follows.
* Currying and composition are prioritized.
* Components should be small and composable.
* Structure should be flat and sparse.

# Install

```
npm install -g chiml
```

__NOTE:__

* You might need `root` privilege to install package as global.
* This package require nodejs version `10.12.0` or newer since it use `module.createRequireFromPath`. To install the newest stable node.js you can do the following:

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo npm config set scripts-prepend-node-path true
```

# Structure

Below is the comparison between `javascript` and `CHIML`:

## Javascript

```javascript
// filename: cat.js
const f = require("fs");
function readFileAndShowContent(fileName) {
    writeFile(fileName).then(console.log);
}
function writeFile(fileName) {
    return new Promise((resolve, reject) => {
        f.readFile(fileName, (error, content) => {
            if (error) {
                return reject(error);
            }
            return resolve(error);
        });
    });
}
if (require.main === module) {
    const fileName = process.argv.slice[2];
    readFileAndShowContent(fileName);
}
```

To run the program you can do:

```bash
node cat.js ./somefile.txt
```

## Chiml

```yaml
# filename: cat.yml
injection: fs as f
bootstrap: readFileAndShowContent
component:
    readFileAndShowContent:
        setup: R.pipeP
        parts:
            - $readFile
            - $console.log
    readFile:
        setup: X.wrapNodeback
        parts: $f.readFile
```

To run the program you can do:

```bash
chie cat.yml ./somefile.txt
```

Or if you have your own library that behave like `fs` (i.e: Have `readFile` function with same signature), you can also do:

```bash
chie cat.yml ./somefile.txt --injection "./my-fs.js as f"
```

That's how chiml's dependency injection works. You can define the default injection, but in the runtime, you can always swap the injected components with something else. Not only useful for `mocking` and `testing`, dependency injection let you leverage the capability of your program (i.e: read from database instead of from text file).

# API

By default, Chiml injects 2 Objects:

## R
[Ramda Js](https://ramdajs.com/docs/)

Some notable functions are: `R.pipe`, `R.pipeP`, `R.apply`, `R.unapply`, `R.init`, `R.last`, `R.head`, `R.tail`, `R.always`, `R.cond`.

## X
Chiml parser, injector, and some utilities not provided in ramda

### X.invoker

__Definition:__

`invoker: (arity: number, methodName: string, ...params: any[]) => (...args: any[]) => any;`

__Example:__

```javascript

// Example 1:

console.log("01234".slice(1)); // "1234"

const sliceFrom = X.invoker(1, "slice");
const result = sliceFrom("01234", 1);
console.log(result[0]); // "1234"
console.log(result[1]); // "01234"

// Example 2:
const player = new Player("Arthas");
player.setWeapon("Frostmourne");
player.setDamage(50);
console.log(player.attack()); // will yield something

const initPlayer = R.construct(Player as any);
const setWeapon = X.invoker(1, "setWeapon", "Frostmourne"); // parameter can be defined here
const setDamage = X.invoker(1, "setDamage"); // or later
const attack = X.invoker(0, "attack");
const initPlayerAndAttack = R.pipe(
    initPlayer,
    setWeapon,
    R.last,
    setDamage(50),
    R.last,
    attack(),
    R.head,
);
console.log(initPlayerAndAttack("Arthas")); // will yield the same thing
```

### X.fluent

__Definition:__

`fluent: (invokerConfigs: any[][], ...fluentParams: any[]) => (...args: any[]) => any;`

__Example:__

```javascript
const player = new Player("Arthas");
player.setWeapon("Frostmourne");
player.setDamage(50);
console.log(player.attack()); // will yield something

const initPlayer = R.construct(Player as any);
const setDamageAndDoAttack = X.fluent([
    [1, "setWeapon", "Frostmourne"], // parameter can be defined here
    [1, "setDamage"], // or later
    [0, "attack"],
]);
const initPlayerAndAttack = R.pipe(
    initPlayer,
    setDamageAndDoAttack(50),
);
console.log(initPlayerAndAttack("Arthas")); // will yield the same thing
```

### X.initAndFluent

__Definition:__

`initAndFluent: (configs: any[], ...params) => (...args: any[]) => any;`

__Example:__

```javascript
const player = new Player("Arthas");
player.setWeapon("Frostmourne");
player.setDamage(50);
console.log(player.attack()); // will yield something

const initPlayer = R.construct(Player as any);
const initPlayerAndAttack = X.initAndFluent([
    [1, initPlayer],
    [1, "setWeapon"],
    [1, "setDamage"],
    [0, "attack"],
]);
console.log(main("Arthas", "Frostmourne", 50)); // will yield the same thing
```

### X.concurrent

__Definition:__

`concurrent: (...fnList: AnyAsyncFunction[]) => AnyAsyncFunction;`

__Example:__

```javascript
function add(n1, n2) { return Promise.resolve(n1 + n2); }
function minus(n1, n2) { return Promise.resolve(n1 - n2); }

Promise.all([add(5, 4), minus(5, 4)]).then(
    (result) => console.log(result); // [9, 1]
);

const promise = X.concurrent(add, minus)(5, 4);
promise.then(
    (result) => console.log(result); // [9, 1]
);
```
### X.wrapCommand

__Definition:__

`wrapCommand: (stringCommand: string) => AnyAsyncFunction;`

__Example:__

```javascript
const ls = X.wrapCommand("ls ${1}");
ls("/home/").then((result) => console.log(result)); // output of `ls /home/`
```
### X.wrapNodeback

__Definition:__

`wrapNodeback: (fn: AnyFunction) => AnyAsyncFunction;`

__Example:__

```javascript
function addNodeback(n1, n2, cb) { cb(null, n1 + n2); }
const addPromise = X.wrapNodeback(addNodeback);
addPromise(4, 5).then((result) => console.log(result);) // 9
```
### X.wrapNodeback

# Examples

* [Animal Calendar](./example/animal-calendar/)
* [Microservice](./example/microservice/)
