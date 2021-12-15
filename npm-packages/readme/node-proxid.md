# Node-ProxId

[![Codeship Status for RussTheAerialist/node-proxid](https://codeship.com/projects/d40c6000-a5e2-0132-f089-42192025a880/status?branch=master)](https://codeship.com/projects/66873)[![NPm Dependencies](https://david-dm.org/RussTheAerialist/node-proxid.svg)](http://npmjs.com/package/proxid)

A stream-based proximity card reader interface.

It is a translation layer between existing rfid/proximity card libraries, and a
common stream interface.

It also provides an interface to the sparkfun USB RFID reader which is a
line-oriented card reader.

## Example

```javascript
var ProxIdStream = require('./lib/proxid')

var p = new ProxIdStream({
    port: '/dev/tty.usbserial-A5026PIE',
    baudrate: 9600,
    source: 'sparkfun'
})

p.pipe(process.stdout)
```
