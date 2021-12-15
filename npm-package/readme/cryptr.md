# cryptr

cryptr is a simple `aes-256-gcm` encrypt and decrypt module for node.js

It is for doing simple encryption of values UTF-8 strings that need to be decrypted at a later time.

If you require anything more than that you probably want to use something more advanced or [crypto](https://nodejs.org/api/crypto.html) directly.

The Cryptr constructor takes 1 required argument.

`Cryptr(secret)`

The `salt` and `iv` are randomly generated and prepended to the result

**DO NOT USE THIS MODULE FOR ENCRYPTING PASSWORDS!**

Passwords should be a one way hash. Use [bcrypt](https://npmjs.org/package/bcrypt) for that.

## Install

`npm install cryptr`

## Usage

```javascript
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const encryptedString = cryptr.encrypt('bacon');
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString); // e7b75a472b65bc4a42e7b3f78833a4d00040beba796062bf7c13d9533b149e5ec3784813dc20348fdf248d28a2982df85b83d1109623bce45f08238f6ea9bd9bb5f406427b2a40f969802635b8907a0a57944f2c12f334bd081d5143a357c173a611e1b64a
console.log(decryptedString); // bacon
```
