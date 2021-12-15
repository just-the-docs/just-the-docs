# sqsqs
SQSQS(Simple Quick SQS wrapper)

# Usage
```typescript
import Queue from 'sqsqs';
// const Queue = require("sqsqs").default;

const awsConfig = {
  apiVersion: '2012-01-01',
  region: 'ap-northeast-2',
};
const queue = new Queue({ QueueUrl: string, }, awsConfig);

const data1 = "data1"
const data2 = "data2"

/* Send any number of string messages */
/* Warning: the order of messages are not kept in the batch list! */
await queue.send([data1, data2])

/* Receive specific number of string messages */
/* it might wait until messages count reach that number or there are no remain messages in SQS queue */
let queueSize = 50
let received = await queue.receive(queueSize)

/* ***
received = [{
  Body: "data1",
  ReceiptHandleId: ...,
  Id: ...
},{
  Body: "data2",
  ReceiptHandleId: ...,
  Id: ...
}]
*** */

/* parallel receive */
/* the final message count could exceed the queueSize */
let concurrency = 10
let received = await queue.receive(queueSize, concurrency)


/* Delete Messages */
await queue.delete(received);

/* Heartbeat Messages */
await queue.heartbeat(received);

```
