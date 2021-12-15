# pwd [![NPM version](https://badge.fury.io/js/pwd2.svg)](http://badge.fury.io/js/pwd2)
> &lt;pwd.h&gt; binding for [node](http://nodejs.org).



```js
var fs = require('fs');
var pwd = require('pwd2');

var stat = fs.statSync(path);

var passwd = pwd.getpwuid(stat.uid);
console.log('the username for "' + path + '" is: ' + passwd.pw_name);
```
## Installation

```sh
$ npm install pwd2 --save
```    

## Features

There is two available functions:

+ getpwuid(uid)
```js
    var passwd = pwd.getpwuid(0);
```
+ getpwnam(name)
```js
    var passwd = pwd.getpwnam('root');
```

These functions obtain information from opendirectoryd(8), including records in /etc/master.passwd which is described in master.passwd(5).
Each entry in the database is defined by the structure passwd found in the include file &lt;pwd.h&gt;:

```js
{
    pw_name,       /* user name */
    pw_passwd,     /* encrypted password - NOT SUPPORTED IN V1.0.0 */
    pw_uid,        /* user uid */
    pw_gid,        /* user gid */
    pw_change,     /* password change time - NOT SUPPORTED IN V1.0.0 */
    pw_class,      /* user access class - NOT SUPPORTED IN V1.0.0 */
    pw_gecos,      /* Honeywell login info - NOT SUPPORTED IN V1.0.0 */
    pw_dir,        /* home directory */
    pw_shell,      /* default shell */
    pw_expire,     /* account expiration - NOT SUPPORTED IN V1.0.0 */
    pw_fields      /* internal: fields filled in - NOT SUPPORTED IN V1.0.0 */
}
```

## More Information

```sh
$ man 3 getpwuid
```
## License

MIT