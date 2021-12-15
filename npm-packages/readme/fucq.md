#FIFO Uniqueness Circular Queue

(acronym intended)

Fixed-capacity FIFO queue that enforces uniqueness among elements, using Redis.

Every operation requires only one I/O to and from Redis, minimizing I/O overhead.

- Adding N items takes O(N) time.
- Fetching all N items in queue takes O(1) time with Redis, but O(N) time because of deserialization.
- Everything else is O(1).

##Install

```
npm install fucq
```

##Example

Check out the following example written in ES6. Hopefully you're familiar with coroutines/generators/Bluebird! :)

```JavaScript
var QUEUE_CAPACITY = 3;

var fucq = require('fucq');
var assert = require('assert');
var Bluebird = require('bluebird');

var q = fucq.create({
    client: redisClient, // required
    key: 'foo:1', // required - Redis key name
    capacity: QUEUE_CAPACITY, // required
    serialize: function (numericResult) { // optional
        // If not set, a default serializer is used (which is basically a JSON.stringify()
        // that can handle undefined). Redis can only store strings, so everything needs
        // to be converted to and from a string.
        return String(numericResult);
    }
    deserialize: function (stringStored) { // optional - similar to serialize
        // If not set, a default deserializer is used (which is basically a JSON.parse()
        // that can handle undefined)
        return Number(stringStored);
    }
});
q = Bluebird.promisifyAll(q);

assert.strictEqual(q.capacity, QUEUE_CAPACITY); // property .capacity - not asynchronous

Bluebird.coroutine(function* () {
    yield q.emptyAsync(); // method .empty() - clears out all relevant Redis keys
    
    yield q.addAsync(1); // method .add() - queue is now [1]
    assert.strictEqual(res, q.OK); // status OK
    
    yield q.addAsync(2, 3); // queue is now [3, 2, 1]
    assert.strictEqual(res, q.OK);
    
    yield q.addAsync(3); // duplicates cannot be added
    assert.strictEqual(res, q.DUP_ENTRY); // status DUP_ENTRY
    
    yield q.addAsync(4); //  queue is now [4, 3, 2]
    assert.strictEqual(res, q.OK);

    console.log(yield q.allAsync()); // method .all()
    // prints [4, 3, 2]
    // instead of ['4', '3', '2']
    // which a plain ol' Redis call would return without a deserializer
    
    assert.strictEqual(yield q.sizeAsync(), QUEUE_CAPACITY); // method .size() - asynchronous
})();
```

##Test

Test is written in ES6, so Regenerator, 6to5 and Bash are being used for transpilation.

```
npm install
npm test
```
