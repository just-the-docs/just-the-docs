# squeejy
a js queue with a stupid name

It's supposed to be simple, and it's supposed to be fast. Any changes within those parameters are welcome.

## Example

```js

const q = require('squeejy')

const orders = q()
orders.enq('food')
orders.enq('drinks')
console.log(orders.size()) // 2
console.log(orders.isEmpty()) // false
console.log(orders.peek()) // food
console.log(orders.deq()) // food
console.log(orders.size()) // 1
console.log(orders.peek()) // drinks
```
