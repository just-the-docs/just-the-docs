# ikea-name-generator
A node.js module that returns a random ikea furniture name because it's so cool !

## Installation 
```sh
npm install ikea-name-generator --save
yarn add ikea-name-generator
```

## Usage

### JavaScript

```javascript
var ikea = require('ikea-name-generator');

var furnitureWithMaybeSwedishCharacters = ikea.getName();
console.log(furnitureWithMaybeSwedishCharacters);

var furnitureWithoutSwedishCharacters = ikea.getName(false);
console.log(furnitureWithoutSwedishCharacters);
```
```sh
Output should be for example 'Pendubdö'
Output should be for example 'Ripce'
```

### TypeScript
```typescript
import { getName } from 'ikea-name-generator';

console.log(getName())
console.log(getName(false))
```
```sh
Output should be for example 'Pendubdö'
Output should be for example 'Ripce'
```

## Test 
```sh
npm run test
```

## Credits

The algorithm to generate ikea furniture names comes from [@crazykate](https://github.com/craftykate/)[/ikea-name-generator](https://github.com/craftykate/). 
You can see the generator live on [ikea-name-generator.surge.sh](http://ikea-name-generator.surge.sh/)

I just needed a package for node to use it into my project :)