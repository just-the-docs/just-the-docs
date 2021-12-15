# AVRO-schemas

A repository to maintain AVRO schema's for use in the DRIVER+ test-bed.

## Introduction

The test-bed is a message-based system, i.e. its functionality is based on exchanging messages between systems. Therefore, messages become a kind of _contract_ between information producers and consumers. This is different from an API (Application Programmer Interface) based system such as REST, where the API is the contract.

Since messages are so important, the test-bed requires you to define an AVRO-based schema for each message that you want to send. These schema's will be stored in the test-bed's schema registry. As multiple producers may use the same topic, each message is a so-called KeyedMessage, where the _key_ is set to the producer's ID, and the _value_ is the actual message. In this way, we can easily filter messages based on producer's ID.

## Registering a new message (schema)

In order to register a new message, therefore, we need two schema's, one for the key and one for the value. By convention, these schema's are named `TOPIC_NAME-key` and `TOPIC_NAME-value`, and need to be registered before actually sending messages with them. Fortunately, it is no problem to register them multiple times: in case the schema is already present, it will simply be ignored. Additionally, please note that all messages use the same key schema, based on EDXL DE, which can be found [here](https://github.com/DRIVER-EU/avro-schemas/blob/master/edxl-de/edxl-de-key.avsc). So you just need to copy it over to your `TOPIC_NAME-key` file.

To register a new schema pair, you have several possibilities:

- Use the [schema registry-ui](http://localhost:3601/) by registering both schema's manually. The subject is `TOPIC_NAME-key` and `TOPIC_NAME-value`, respectively. Please note that I've experienced schema rejections using the UI, which were accepted by the schema registry.
- Use the [postj](npmjs.com/postj) utility.
- Use your adapter, which may contain functionality for it too.

## Known schema's

In this repository, we store the known schema's, divided in two main folders:

- `core`: Contains the core schema's for use in the test-bed, e.g. for logging, configuration and heartbeat. These should always be registered in the schema registry. Also note that core schema's should be prefixed with 'connect-status-' in order to show as system topics. See this issue [here](https://github.com/Landoop/kafka-topics-ui/issues/99).
- `other`: Contains schema's that may be useful during a trial, depending on the systems that are connected.

Each folder is subdivided into folders per topic. The `core` topics are preceded by an underscore by convention, as to indicate that we are dealing with system topics.

## Conventions

- All messages are Keyed message, i.e. they contain a key (typically, the id of the service as string), and a value.
- Both key and value are encoded using the schema's, named TOPIC-key and TOPIC-value, respectively. Otherwise, the Kafka-REST service does not handle them correctly (for now).
- Type names are written in PascalCase with a leading capital
- Field names are written in camelCase with a small cap
- Default domain is `eu.driver.model.YYY`, where YYY is either core for the core messages, or something else otherwise.

## Observations creating an AVRO schema

The AVRO schema is specified [here](https://avro.apache.org/docs/current/spec.html). When creating a new schema from scratch based on an XML schema definition (XSD), most conversions are quite straightforward. However, there were some small issues that I observed while converting the [CAP XML Schema](https://github.com/DRIVER-EU/node-test-bed-adapter/blob/master/data/cap/cap.xsd) definition to a [CAP AVRO schema](https://github.com/DRIVER-EU/node-test-bed-adapter/blob/master/data/cap/cap.avsc):

- The CAP XSD contains an `any` element, meaning that you can put anything you like in the CAP message. Besides the fact that I don't consider this a good idea, I also do not know how to encode this in AVRO. So for now, I have ignored it.
- The CAP schema uses `xs:dateTime`, which is basically a string that can be validated using a regular expression pattern. In AVRO, such functionality seems to be missing, and I represented it using a string. Alternatively, we could use a [LogicalType](https://avro.apache.org/docs/current/spec.html#Logical+Types) for this, but those must be defined in each adapter.
- The CAP schema uses `minOccors = "0"` (optional element). I've converted this to an AVRO UnionType, for example when the type is `xs:string`, it becomes `type: ["null", "string"], default: null`.
- The CAP schema uses `maxOccors = "unbounded"` (array). I've converted this to an AVRO UnionType, for example when the type is `xs:string`, it becomes `type: ["null", "string", { type: "array", items: "string" }], default: null`. So the element is optional (type is null and default is null), a simple string, or a string array.
- The CAP schema contains many types: each type has been converted to an AVRO `enum` with symbols (e.g. for `simpleType`)), or `record` (e.g. for `complexType`). As a consequence, the AVRO schema may contain many types, in which case we need to specify the actual (top) type that we will use for validating/encoding/decoding messages.

## Additional tooling

This repository also contains a simple JavaScript tool, which can be used to validate a schema against a JSON or XML message, and which can infer a schema too. You can install it using:

```console
npm i -g avro-schema-validator
```

In case this does not work due to permission issues, you can also run it from a Linux VM or Docker (`docker pull node`)

```bash
# After installing node.js using the package manager
$ sudo npm i -g avro-schema-validator --unsafe-perm=true --allow-root
```

```console
avro-schema-validator, v0.2.0

  MIT license.

  A tool to infer AVRO schema's from JSON messages, and to validate it.

  Use avro-schema-validator to infer an AVRO schema based on JSON or XML input,
  or validate a JSON message against a schema.

  In some cases, a valid JSON message may be considered invalid when wrapped
  unions are used, e.g. when you have a property 'content', whose type is
  ['int', 'float'], in JSON you would need to wrap its value in order to
  distinguish between an integer and a float. In case normal parsing fails,
  it retries the validation using the -w option (wrapped).


Options

  -h, --help            Show help text
  -f, --file string     JSON or XML file that must be validated against a schema, or for
                        which we want to infer a schema.
  -s, --schema string   The schema file which is used to validate the JSON or XML file.
  -o, --output string   Override the default schema file name.
  -w, --wrapped         If set, use wrapped union types.

Examples

  01. Infer a cap.avsc schema from the          $ avro-schema-validator cap.json
  cap.json file.
  02. Infer a schema, and specify the output    $ avro-schema-validator cap.json -o
  file.                                         mySchema.avsc
  03. Validate a cap.json against the           $ avro-schema-validator cap.json -s
  cap.avsc schema.                              cap.avsc
  04. Validate a wrapped cap.json against the   $ avro-schema-validator -w cap.json -s
  cap.avsc schema.                              cap.avsc
```
