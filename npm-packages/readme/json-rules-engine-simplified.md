[![Build Status](https://travis-ci.org/RxNT/json-rules-engine-simplified.svg?branch=master)](https://travis-ci.org/RxNT/json-rules-engine-simplified)
[![Coverage Status](https://coveralls.io/repos/github/RxNT/json-rules-engine-simplified/badge.svg?branch=master)](https://coveralls.io/github/RxNT/json-rules-engine-simplified?branch=master)
[![npm version](https://badge.fury.io/js/json-rules-engine-simplified.svg)](https://badge.fury.io/js/json-rules-engine-simplified)
# json-rules-engine-simplified
A simple rules engine expressed in JSON

The primary goal of this project is to be 
an alternative of [json-rules-engine](https://github.com/CacheControl/json-rules-engine) for [react-jsonschema-form-conditionals](https://github.com/RxNT/react-jsonschema-form-conditionals),
as such it has similar interface and configuration, but simplified predicate language, similar to SQL. 

## Features

- Optional schema and rules validation
- Basic boolean operations (`and` `or` and `not`) that allow to have any arbitrary complexity 
- Rules expressed in simple, easy to read JSON 
- Declarative conditional logic with [predicates](https://github.com/landau/predicate)
- Relevant conditional logic support 
- Support of nested structures with [selectn](https://github.com/wilmoore/selectn.js) 
including composite arrays 
- Secure - no use of eval()

## Installation

Install `json-rules-engine-simplified` by running:

```bash
npm install --s json-rules-engine-simplified
```

## Usage

The simplest example of using `json-rules-engine-simplified`

```jsx
import Engine from 'json-rules-engine-simplified'

let rules = [{
    conditions: {
      firstName: "empty"
    },
    event: {
        type: "remove",
        params: { 
            field: "password"
        },
    }
}];

/**
 * Setup a new engine
 */
let engine = new Engine(rules);

let formData = {
  lastName: "Smit"
}

// Run the engine to evaluate
engine
  .run(formData)
  .then(events => { // run() returns remove event
    events.map(event => console.log(event.type));
  })

```

Rules engine expects to know all the rules in advance, it effectively drops builder pattern, but keeps the interface.

### Appending rule to existing engine

You don't have to specify all rules at the construction time, you can add rules in different time in process.
In order to add new rules to the `Engine` use `addRule` function.

For example, following declarations are the same
```js
import Engine from 'json-rules-engine-simplified';

let engineA = new Engine();

let rule = {
    conditions: {
      firstName: "empty"
    },
    event: {
        type: "remove",
        params: { 
            field: "password"
        },
    }
};

engineA.addRule(rule);

let engineB = new Engine(rule);

```

In this case `engineA` and `engineB` will give the same results.

## Validation

In order to prevent most common errors, `Engine` does initial validation on the schema, during construction.
Validation is done automatically if you specify `schema` during construction.
 
```js
let rules = [{
    conditions: {
      firstName: "empty"
    },
    event: {
        type: "remove",
        params: { field: "password" },
    }
}];

let schema = {
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" }
    }
}

let engine = new Engine(rules, schema);
```
### Types of errors

- Conditions field validation (conditions use fields that are not part of the schema)
- Predicate validation (used predicates are not part of the
 [predicates](https://github.com/landau/predicate) library and most likely wrong)

Validation is done only during development, validation is disabled by default in `production`. 

WARNING!!! Currently validation does not support nested structures, so be extra careful, when using those.

## Conditional logic

Conditional logic is based on public [predicate](https://github.com/landau/predicate) library 
with boolean logic extension. 

[Predicate](https://github.com/landau/predicate) library has a lot of predicates that we found more, than sufficient for our use cases.

To showcase conditional logic, we'll be using simple `registration` schema

```js
let schema = {
  definitions: {
    hobby: {
      type: "object",
      properties: {
        name: { type: "string" },
        durationInMonth: { type: "integer" },
      }
    }
  },
  title: "A registration form",
  description: "A simple form example.",
  type: "object",
  required: [
    "firstName",
    "lastName"
  ],
  properties: {
    firstName: {
      type: "string",
      title: "First name"
    },
    lastName: {
      type: "string",
      title: "Last name"
    },
    age: {
      type: "integer",
      title: "Age",
    },
    bio: {
      type: "string",
      title: "Bio",
    },
    country: {
      type: "string",
      title: "Country" 
    },
    state: {
      type: "string",
      title: "State" 
    },
    zip: {
      type: "string",
      title: "ZIP" 
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 3
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10
    },
    work: { "$ref": "#/definitions/hobby" },
    hobbies: {
        type: "array",
        items: { "$ref": "#/definitions/hobby" }
    }
  }
}
```
Assuming action part is taken from [react-jsonschema-form-conditionals](https://github.com/RxNT/react-jsonschema-form-conditionals)

### Single line conditionals

Let's say we want to `remove` `password` , when `firstName` is missing, we can expressed it like this:

```js
let rules = [{
    conditions: {
      firstName: "empty"
    },
    event: {
      type: "remove",
      params: {
        field: "password"
      }
    }
}]
```

This translates into -
when `firstName` is `empty`, trigger `remove` `event`. 

`Empty` keyword is [equal in predicate library](https://landau.github.io/predicate/#equal) and required 
event will be performed only when `predicate.empty(registration.firstName)` is `true`. 

### Conditionals with arguments

Let's say we need to `require` `zip`, when `age` is `less` than `16`,
because the service we are using is legal only after `16` in some countries   

```js
let rules = [{
    conditions: {
      age: { less : 16 }
    },
    event: {
      type: "require",
      params: {
        field: "zip"
      }
    }
}]
```

This translates into -  when `age` is `less` than `16`, `require` zip.

[Less](https://landau.github.io/predicate/#less) keyword is [less in predicate](https://landau.github.io/predicate/#less) and required 
event will be returned only when `predicate.empty(registration.age, 5)` is `true`. 

### Boolean operations on a single field

#### AND

For the field AND is a default behavior.

Looking at previous rule, we decide that we want to change the rule and `require` `zip`, 
when `age` is between `16` and `70`, so it would be available
only to people older, than `16` and younger than `70`.

```js
let rules = [{
    conditions: {
        age: {
          greater: 16,
          less : 70,
        }
    },
    event: {
      type: "require",
      params: {
        field: "zip"
      }
    }
}]
```

By default action will be applied only when both field conditions are true.
In this case, when age is `greater` than `16` and `less` than `70`.
 
#### NOT

Let's say we want to change the logic to opposite, and trigger event only when 
`age` is `less`er then `16` or `greater` than `70`, 
 
```js
let rules = [{
  conditions: {
    age: {
      not: {
          greater: 16,
          less : 70,
      }
    }
  },
  event: {
    type: "require",
    params: {
      field: "zip"
    }
  }
}]
```

This does it, since the final result will be opposite of the previous condition.
 
#### OR

The previous example works, but it's a bit hard to understand, luckily we can express it differently
with `or` conditional.

```js
let rules = [{
  conditions: { age: { 
      or: [
        { lessEq : 5 },
        { greaterEq: 70 }
      ]
    }
  },
  event: {
    type: "require",
    params: {
      field: "zip"
    }
  }
}]
```

The result is the same as `NOT`, but easier to grasp.

### Boolean operations on multi fields

To support cases, when action depends on more, than one field meeting criteria we introduced
multi fields boolean operations.

#### Default AND operation

Let's say, when `age` is less than 70 and `country` is `USA` we want to `require` `bio`.

```js
let rules = [{
  conditions: {
    age: { less : 70 },
    country: { is: "USA" }
  },
  event: { 
    type: "require",
    params: { fields: [ "bio" ]}
  }
}]
```

This is the way we can express this. By default each field is treated as a 
separate condition and all conditions must be meet.

#### OR

In addition to previous rule we need `bio`, if `state` is `NY`.

```js
let rules = [{
  conditions: {
    or: [
      {
        age: { less : 70 },
        country: { is: "USA" }
      },
      {
        state: { is: "NY"}
      }
    ]
  },
  event: { 
    type: "require",
    params: { fields: [ "bio" ]}
  }
}]
```

#### NOT

When we don't require `bio` we need `zip` code.

```js
let rules = [{
    conditions: {
      not: {
        or: [
          {
            age: { less : 70 },
            country: { is: "USA" }
          },
          {
            state: { is: "NY"}
          }
        ]
      }
    },
    event: { 
      type: "require",
      params: { fields: [ "zip" ]}
    }
}]
```

### Nested object queries

Rules engine supports querying inside nested objects, with [selectn](https://github.com/wilmoore/selectn.js),
any data query that works in [selectn](https://github.com/wilmoore/selectn.js), will work in here

Let's say we need to require `state`, when `work` has a `name` `congressman`, this is how we can do this:

```js
let rules = [{
    conditions: {
      "work.name": { is: "congressman" }
    },
    event: { 
      type: "require",
      params: { fields: [ "state" ]}
    }
}]
```

### Nested arrays object queries

Sometimes we need to make changes to the form if some nested condition is true. 

For example if one of the `hobbies` is `baseball`, we need to make `state` `required`.
This can be expressed like this:

```js
let rules = [{
    conditions: {
      hobbies: {
        name: { is: "baseball" },
      }
    },
    event: { 
      type: "require",
      params: { fields: [ "state" ]}
    }
}]
``` 

Rules engine will go through all the elements in the array and trigger `require` if `any` of the elements meet the criteria.

### Extending available predicates

If for some reason the list of [predicates](https://github.com/landau/predicate) is insufficient for your needs, you can extend them pretty easy,
by specifying additional predicates in global import object.

For example, if we want to add `range` predicate, that would verify, that integer value is in range, we can do it like this: 
```js
import predicate from "predicate";
import Engine from "json-rules-engine-simplified";

predicate.range = predicate.curry((val, range) => {
  return predicate.num(val) &&
    predicate.array(range) &&
    predicate.equal(range.length, 2) &&
    predicate.num(range[0]) &&
    predicate.num(range[1]) &&
    predicate.greaterEq(val, range[0]) &&
    predicate.lessEq(val, range[1]);
});

let engine = new Engine([{
  conditions: { age: { range: [ 20, 40 ] } },
  event: "hit"
}]);
```

Validation will automatically catch new extension and work as expected.

## Logic on nested objects

Support of nested structures with [selectn](https://github.com/wilmoore/selectn.js), so basically any query you can define in selectn you can use here.

For example if in previous example, age would be a part of person object, we could work with it like this:
```js
    let rules = [ { conditions: { "person.age": { range: [ 20, 40 ] } } } ]; 
```

Also in order to support systems where keys with "." not allowed (for example if you would like to store data in mongo), you can use `$` to separate references:
 
For example, this is the same condition, but instead of `.` it uses `$`:
```js
    let rules = [ { conditions: { "person$age": { range: [ 20, 40 ] } } } ]; 
```

## Relevant conditional logic

Sometimes you would want to validate `formData` fields one against the other.
You can do this simply by appending `$` to the beginning of reference.

For example, you want to trigger event only when `a` is less then `b`, when you don't know ahead `a` or `b` values

```js
let schema = {
  type: "object",
  properties: {
    a: { type: "number" },
    b: { type: "number" }
  }
}

let rules = [{
  conditions: {
    a: { less: "$b" }
  },
  event: "some"
}]

let engine = new Engine(schema, rules);
``` 
This is how you do it, in run time `$b` will be replaces with field `b` value.

Relevant fields work on nested objects as well as on any field condition. 

## Events

Framework does not put any restrictions on event object, that will be triggered, in case conditions are meet

For example, `event` can be a string:
```js
let rules = [{
    conditions: { ... },
    event: "require"
}]
```
Or number
```js
let rules = [{
    conditions: { ... },
    event: 4
}]
```

Or an `object`
```js
let rules = [{
    conditions: { ... },
    event: { 
      type: "require",
      params: { fields: [ "state" ]}
    }
}]
```

You can even return an array of events, each of which will be added to final array of results
```js
let rules = [{
    conditions: { ... },
    event: [
      { 
        type: "require",
        params: { field: "state"}
      },
      { 
        type: "remove",
        params: { fields: "fake" }
      },
    ]
}]
```

## License

The project is licensed under the Apache Licence 2.0.