# Node-OwOifier

A simple text OwOifier made for NodeJS

## Installation
```sh
# If you use NPM
npm install node-owoifier --save

# If you use Yarn
yarn add node-owoifier
```

## Usage
```js
const OwOifier = require("node-owoifier");

const owo = new OwOifier();
const owoifiedText = owo.OwOify("Hello! My name is Tejas Agarwal. How are you?");
```
Don't want your text to be OwOified so hard? Use different modes!
```js
// Set the setting to "low"
owo.OwOify("Sample text to OwOify", "low");

// Set the setting to "medium"
owo.OwOify("Sample Medium setting text", "medium");

// [DEFAULT] Set the setting to "high"
owo.OwOify("Sample High setting text", "high");
```

Made with 💖 by [Tejas Agarwal](https://github.com/tejasag)
