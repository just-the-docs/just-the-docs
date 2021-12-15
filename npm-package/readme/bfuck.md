# bfuck
A Brainfuck compiler for Javascript.

``` javascript
const bfuck = require("bfuck");

const func = bfuck(`++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`);
console.log(func());
```

```
Hello World!


```
