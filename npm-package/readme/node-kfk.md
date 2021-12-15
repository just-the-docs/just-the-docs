# Node-Kfk

<img width="200px;" src="logo.png" />

[![Build Status](https://travis-ci.org/joway/node-kfk.svg?branch=master)](https://travis-ci.org/joway/node-kfk)
[![npm](https://img.shields.io/npm/v/kfk.svg)](https://www.npmjs.com/package/kfk)
[![npm](https://img.shields.io/npm/dt/kfk.svg)](https://www.npmjs.com/package/kfk)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/51840be97e8d47d38fddb09cd95099ad)](https://app.codacy.com/app/joway/node-kfk?utm_source=github.com&utm_medium=referral&utm_content=joway/node-kfk&utm_campaign=Badge_Grade_Dashboard)
[![Coverage Status](https://coveralls.io/repos/github/joway/node-kfk/badge.svg?branch=test-coverage)](https://coveralls.io/github/joway/node-kfk?branch=test-coverage)

## Why I need it

Kafka is not friendly enough for programmers who don't have a clear knowledge on it.

Considering our usage are similar at most of the time, we want to provide a simple client for simple use case on kafka.

## Usage

### Install

```shell
npm i kfk -S
```

### Kafka Producer

```js
const conf = {
  'client.id': 'kafka',
  'metadata.broker.list': '127.0.0.1:9092',
}
const topicConf = {
}
const options = {
  debug: false,
}

const producer = new KafkaProducer(conf, topicConf, options)

await producer.connect()

console.log('connected')

while (true) {
  const msg = `${new Date().getTime()}-${crypto.randomBytes(20).toString('hex')}`

  await producer.produce(_.sample([
    'rdkafka-test0',
    'rdkafka-test1',
    'rdkafka-test2',
  ]), null, msg)
}
```

### Kafka ALO(at least once) Consumer

```js
const conf = {
  'group.id': 'alo-consumer-test-1',
  'metadata.broker.list': '127.0.0.1:9092',
}
const topicConf = {
  'auto.offset.reset': 'largest',
}
const options = {
  debug: false,
}

const consumer = new KafkaALOConsumer(conf, topicConf, options)
await consumer.connect()
await consumer.subscribe([
  'rdkafka-test0',
  'rdkafka-test1',
  'rdkafka-test2',
])

while (true) {
  await consumer.consume(message => {
    console.log(`topic: ${message.topic} offset : ${message.offset} val: ${message.value.toString('utf-8')}`)
  }, {
      size: 10,
      concurrency: 5,
    })
}
```

### Kafka AMO(at most once) Consumer

```js
const conf = {
  'group.id': 'amo-consumer-test-1',
  'metadata.broker.list': '127.0.0.1:9092',
}
const topicConf = {
  'auto.offset.reset': 'largest',
}
const options = {
  debug: false,
}

const consumer = new KafkaAMOConsumer(conf, topicConf, options)
await consumer.connect()
await consumer.subscribe([
  'rdkafka-test0',
  'rdkafka-test1',
  'rdkafka-test2',
])

while (true) {
  await consumer.consume(message => {
    console.log(`topic: ${message.topic} offset : ${message.offset} val: ${message.value.toString('utf-8')}`)
  }, {
      size: 10,
      concurrency: 5,
    })
}
```

### Graceful Death

```ts
const gracefulDeath = async () => {
  await producer.die()
  await consumer.die()
  process.exit(0)
}
process.on('SIGINT', gracefulDeath)
process.on('SIGQUIT', gracefulDeath)
process.on('SIGTERM', gracefulDeath)
```

## Deep Dive

### Choose your right consumer

`node-kfk` provide two consumer choices for you: `KafkaALOConsumer` and `KafkaAMOConsumer`. `ALO` means `At Least Once`, and `AMO` means `At Most Once`.

#### At Least Once

If you cannot tolerate any message loss and you have handled the repetitive execution situation in your consumer function, you may want your consumer has `at least once` guarantee.

`KafkaALOConsumer` will monitor your consume callback function execute state and if there are any `Error` thrown in your consumer callback function (or process crashed), it will begin at the offsets you last consumed successfully.

#### At Most Once

If you do not very care about little messages loss when problem happens, but you want to make sure that every message only can be handled on time, you can just use the `KafkaAMOConsumer`.

`KafkaAMOConsumer` will auto commits the offsets when fetched the messages. It has better performance than `KafkaALOConsumer`, but not guarantee that all messages will be consumed.

### Offset Management Detail

In `KafkaAMOConsumer`, `node-kfk` use the `enable.auto.commit=true` and `enable.auto.offset.store=true` options which completely depend on librdkafka to management the offsets and will auto commit the latest offsets periodically(the interval depends on `auto.commit.interval.ms`, default is `1000`).

In `KafkaALOConsumer`, we still want librdkafka to commit automatically, but we need to control offsetStore manually(now we set `enable.auto.commit=true` and `enable.auto.offset.store=false`). When `node-kfk` ensure that all messages had been handled successfully, it will store the latest offsets in offsetStore, and wait for committed by librdkafka.

### Others

The client has been tested on:

```yaml
- os: linux
  env: KAFKA_VERSION=0.10.2.2
  node_js: 8
- os: linux
  env: KAFKA_VERSION=0.10.2.2
  node_js: 10
- os: linux
  env: KAFKA_VERSION=0.11.0.3
  node_js: 10
- os: linux
  env: KAFKA_VERSION=1.1.0
  node_js: 10
- os: linux
  env: KAFKA_VERSION=2.0.0
  node_js: 10
```

More detailed document for `conf` and `topicConf` params in [librdkafka](https://github.com/edenhill/librdkafka) and [node-rdkafka](https://github.com/Blizzard/node-rdkafka)
