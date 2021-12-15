# IPEMS.JS

> THIS MODULE IS NOT YET STABLE! USE IN PRODUCTION IS AT YOUR OWN RISK!

This package is an implementation of the [Internal Program Error Management System (IPEMS)](https://github.com/arctic-hen7/ipems) (v0.1.0) for JavaScript and NodeJS, with inbuilt TypeScript support!

## What is IPEMS?

IPEMS is a system of managing errors within a program. Every time we as programmers need to throw an error for some reason, we usually use a simple error message written in *natural language*, that is, language for people. However, this means there's very often little-to-no consistency between error messages in a program. You can have everything from a highly detailed error even offering possible solutions to "the program failed successfully". IPEMS tries to make error management more universal by providing a powerful system of initialising errors with a *class*, *type*, and *severity* to organize them. Each error can then be encoded into some human-readable form by and *encoder*.

For a full introduction to IPEMS, see [this document from the IPEMS project](https://github.com/arctic-hen7/ipems/blob/main/protocol/basic-introduction.md).

## Documentation

IPEMS uses *classes*, *types*, and *severities* to classify errors. You should read the [basic introduction to IPEMS](https://github.com/arctic-hen7/ipems/blob/main/protocol/basic-introduction.md) to understand how these work. For quick reference, see the [default paradigm cheatsheet](./cheatsheet.md).

You can install IPEMS easily with:
```
npm install ipems
```
or (better)
```
yarn add ipems
```

### Setup

It's recommended to set up IPEMS in its own file for each project, that way, you can define your own extensions (custom classes, types, severities, operations, etc.).

```javascript
// The default-exported function will create an IPEMS class
// preloaded with the default paradigm
import createDefaultIpems, {
	createIpemsOperation,
	applyUnionDefaults,
	applyIntersectionDefaults,
} from "ipems";

const Ipems = createDefaultIpems();

// Create the Union and Intersection operations (if you need them)
export const IpemsUnion = applyUnionDefaults(createIpemsOperation());
export const IpemsIntersection = applyIntersectionDefaults(
	createIpemsOperation()
);

// Create the `Generic` and `Unknown` special classes
// (if you need them, most projects won't)
export const IpemsGeneric = applyGenericDefaults(createIpemsGeneric());
export const IpemsUnknown = applyUnknownDefaults(createIpemsUnknown());

// You should export a function like this from all your setups
// It allows users of your code to change the default encoding of IPEMS
// So, they could easily switch to `verbose` for debugging for example
export const changeIpemsDefaultEncoding = (encoding) => {
	Ipems.defaultEncoding = encoding;
	IpemsUnion.defaultEncoding = encoding;
	IpemsIntersection.defaultEncoding = encoding;
	IpemsGeneric.defaultEncoding = encoding;
	IpemsUnknown.defaultEncoding = encoding;
};

export default Ipems;
```

### Simple Example
```javascript
import Ipems from "./ipems";

const exampleFn = (param) => {
	if (typeof param !== "string") {
		// The parameter should've been a string, but wasn't, throw
		throw new Ipems("caller", "parameter", "critical", {
			params: {
				invalidParam: "param",
				validityPrereqs: ["must be a string"],
			},
		}).encodeAsDefault(); // The encoding is CRUCIAL!
	}
}
```

### Example with Operations

Sometimes, you'll be in situations where you need to generate an error composed of multiple sub-errors. The most common scenario is if one of two parameters needs to be provided, and you check them with `&&`. See below:

```javascript
import Ipems, { IpemsUnion } from "./ipems";

const exampleFn = ({ url, literal }) => {
	if (!url && !literal) {
		// One of the parameters needed to be provided,
		// but neither were, throw
		// We don't know which parameter was the problem, so Union
		throw new IpemsUnion(
			new Ipems("caller", "parameter", "critical", {
				params: {
					invalidParam: "url",
					validityPrereqs: [
						"must be present if `literal` is not provided",
					],
				},
			}),
			new Ipems("caller", "parameter", "critical", {
				params: {
					invalidParam: "literal",
					validityPrereqs: [
						"must be present if `url` is not provided",
					],
				},
			}),
		).encodeAsDefault(); // The encoding is CRUCIAL!
	}
}
```

### Incremental Adoption

If you want to switch a large project over to IPEMS quickly, you probably don't want to have to think about the class, type, and severity for every single error (at least not all at once). For that, this module implements the `Generic` special class:

```javascript
import { IpemsGeneric } from "./ipems";

const exampleFn = (url) => {
	if (!url) {
		// throw new Error("you must provide a URL");
		throw new IpemsGeneric({ 
			details: "you must provide a URL"
		}).encodeAsDefault();
	}
}
```

## Versioning

This project uses [semantic versioning](https://semver.org/), though the version of this module may not correspond to the version of IPEMS that it implements! That version is listed at the top of the page, and in the module's `package.json` description. The reason for the incontinuity is that there may be a bug in this module, but no bug in the IPEMS protocol, and so only this module would need be updated.

## Stability

The IPEMS protocol is still in beta, and will likely stay that way until around June 2021. Until then, this module will also remain in beta, and breaking changes may occur without notice. We don't yet advise using this module in production!

## Authors

This module was built and is maintained by @arctic_hen7, the author and maintainer of the IPEMS protocol itself!
