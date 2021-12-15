[![npm version](https://badge.fury.io/js/fproxy.svg)](https://badge.fury.io/js/fproxy)

# fproxy #
==========

**generic javascript functional lazy proxy abstraction**

Functional generic lazy proxy, provides functions to access stored values, arguments, objects, files or documents.

### examples

```javascript
//using local file system text file reader with watcher sync/assync modes
var fProxy=require("fproxy");
var textFile=fProxy(fProxy.mediaDescriptors.file,o=>o.toString());
var text=textFile("test/resources/test.txt");
text(o=>console.log("Text:",o));//get updated & parsed document
//do some external changes to the text file
text(o=>console.log("Text:",o));//get updated & parsed document
console.log(text());//get file content in sync mode (no callback provided)
text((e,o)=>console.log(e||o));//assync mode
```

```javascript
//es6 promises using node-swear
var swear=require("node-swear");
var fProxy=require("fproxy");
var textFile=fProxy(fProxy.mediaDescriptors.file,o=>o.toString());
var text=swear(textFile("test/resources/test.txt"));
text().then(o=>log(o)).catch(e=>log(e));
```

fproxy must be initialized with a media descriptor. The media descriptor has the option to be sync or assync, the resulting access function can be then turned into a promise with node-swear.

A set o media descriptors is available at:
>require("fproxy").mediaDescriptors

media descriptors are ES6 classes

mem:  Mem, memory storage of single values
args: Params, storing passed params
obj:  Obj, creates new objects where parser is then a constructor
file: File, sync/assync file system (use *node-swear* for ES6 promises)

#media descriptor#

a media descriptor is a class with:

**constructor**: define parser

**load**: sync/assync read and parse the data with specific implementation parameters

#inocuous#

- result document is not polluted with any property of this module.
- client receives no information/access about other proxy items.
