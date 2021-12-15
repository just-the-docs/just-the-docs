#	"osapi" or "ceph"
__Common and CEPH Compatible Object Storage API__

>	Other Languages / [简体中文](./README.zh_CN.md) / [繁體中文](./README.zh_TW.md)  
>	If links in this document not avaiable, please access [README on GitHub](https://github.com/YounGoat/nodejs.osapi/blob/master/README.md) directly.

__Milestone version 1.0.0 is released.__ The package now can be used to access [different object storage servers](./docs/vendors.md).

##  Table of Contents

* [Table Of Contents](#table-of-contents)
* [Get Started](#get-started)
	* [Get Started With OpenStack Swift Server](#get-started-with-openstack-swift-server)
	* [Get Started With AWS S3 Server](#get-started-with-aws-s3-server)
* [API](#api)
* [Terms](#terms)
* [About](#about)
* [References](#references)

##  Description

The name [osapi](https://www.npmjs.com/package/osapi) is abbreviation of *Object Storage Application Programming Interface*. And, because this API is compatible with CEPH object storage, so it is also named __[ceph](https://www.npmjs.com/package/ceph)__. You may install and require one of `osapi` and `ceph` at your will. For simplicity, we use `osapi` hereinafter.

__osapi__ is based on OpenStack *SWIFT* API and Amazon *S3* API. Before osapi@1.0.0, the package offers a standalone sub module for each style. Since 1.0.0, the two sub modules are nearly compatible with each other. Both of them implements a common interface [__Connection__](./docs/connection.md).

##	Table Of Contents

*	[Get Started](#get-started)
	*	[Get Started In OpenStack Swift Style](#get-started-with-openstack-swift-style)
	*	[Get Started In AWS S3 Style](#get-started-with-openstack-swift-style)
*	[Documentations](./docs/README.md)
*	[Terms](#terms)
*	[About](#about)
*	[References](#references)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/nodejs.osapi)

##	Get Started

```javascript
const osapi = require('osapi');

let conn = osapi.createConnection({
    endPoint   : 'http://storage.example.com/',
    subuser    : 'userName:subUserName',
    key        : '380289ba59473a368c593c1f1de6efb0380289ba5',
    container  : 'containerName',
});

conn.createObject('hello/world', 'Hello world!', (err) => {
    // ...
});

conn.readObject('hello/world', (err, data) => {
    // ...
    data.contentType;
    data.buffer;
});
```

###	Get Started With OpenStack Swift Server

```javascript
const swift = require('osapi/swift');

let conn = new swift.Connection({
    endPoint   : 'http://storage.example.com/',
    subuser    : 'userName:subUserName',
    key        : '380289ba59473a368c593c1f1de6efb0380289ba5',
                 // generally 40 characters 
    tempURLKey : '380289ba59473a368c593c1f1de6efb0', 
                 // generally 32 characters
    container  : 'containerName',
});

conn.createObject('hello/world', 'Hello world!', (err) => {
    // ...
});

conn.readObject('hello/world', (err, data) => {
    // ...
    data.contentType;
    data.buffer;
});
```

###	Get Started With AWS S3 Server

```javascript
const s3 = require('osapi/s3');

let conn = new s3.Connection({
    endPoint        : 'http://storage.example.com/',
    accessKey       : '380289ba59473a368c59', 
                      // 20 characters 
    secretAccessKey : '380289ba59473a368c593c1f1de6efb0380289ba5', 
                      // 40 characters
    bucket          : 'bucketName',
});

let options = {
    name: 'hello/world',
    meta: { /* self defined meta info */ }
};
let content = 'Hello world!';
conn.createObject(options, content)
    .then(ret => {
        // ...
    })
    .catch(err => {
        // ...
    });

conn.readObject('hello/world', (err, data) => {
    // ...
    data.contentType;
    data.buffer;
    data.meta;
});
```

##	API

Please read [documentation](./docs/README.md).

##  Terms

Amazon Simple Storage Service (S3) and OpenStack Swift are similiar but still two different things.

| S3                   | SWIFT          | meaning        |
| :----------------    | :------------- | :------------- |
| bucket               | container      | An container belongs to one account and is used to store objects. |
| access_key           | -              | Unique token used to identify an account. |
| secret\_secret\_key  | -              | Secret token accompanying the *access_key* and used to verify the requests. |
| -                    | key            | Secret token used to generate access token for current subuser. |
| -                    | temp\_url\_key | Secret token used to generate temporary downloading URLs for objects. |
| -                    | user           | Account. |
| -                    | subuser        | User under specified account. |

##	About

For convenience, this package is published in following names (alias):
*	[ceph](https://www.npmjs.com/package/ceph)
*	[osapi](https://www.npmjs.com/package/osapi)

##  References

*	[S3 vs Swift](https://oldhenhut.com/2016/05/31/s3-vs-swift/)
