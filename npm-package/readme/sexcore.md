Sexcore
=======

[![NPM Package](https://img.shields.io/npm/v/litecore.svg?style=flat-square)](https://www.npmjs.org/package/sexcore)
[![Build Status](https://travis-ci.org/Sxcmarket/sexcore.svg?branch=master&style=flat-square)](https://travis-ci.org/Sxcmarket/sexcore)

Infrastructure to build Bitcoin and blockchain-based applications for the next generation of financial technology.

**Note:** If you're looking for the Sexcore Library please see: https://github.com/Sxcmarket/sexcore-lib

## Getting Started

Before you begin you'll need to have Node.js v4 or v0.12 installed. There are several options for installation. One method is to use [nvm](https://github.com/creationix/nvm) to easily switch between different versions, or download directly from [Node.js](https://nodejs.org/).

```bash
npm install -g sexcore
```

Spin up a full node and join the network:

```bash
npm install -g sexcore
sexcored
```

You can then view the Insight block explorer at the default location: `http://localhost:3001/insight`, and your configuration file will be found in your home directory at `~/.sexcore`.

Create a transaction:
```js
var sexcore = require('sexcore');
var transaction = new sexcore.Transaction();
var transaction.from(unspent).to(address, amount);
transaction.sign(privateKey);
```

## Applications

- [Node](https://github.com/sxcmarket/sexcore-node) - A full node with extended capabilities using Sexcoin Core
- [Insight Sexcoin API](https://github.com/sxcmarket/insight-sexcoin-api) - A blockchain explorer HTTP API
- [Insight Sexcoin UI](https://github.com/Sxcmarket/insight-sexcoin-ui) - A blockchain explorer web user interface
- [Wallet Service](https://github.com/Sxcmarket/sexcore-wallet-service) - A multisig HD service for wallets
- [Wallet Client](https://github.com/Sxcmarket/bitcore-wallet-client) - A client for the wallet service
- [CLI Wallet](https://github.com/Sxcmarket/sexcore-wallet) - A command-line based wallet client
- [Sexcoin-Copay](https://github.com/Sxcmarket/sexcoin-copay) - An easy-to-use, multiplatform, multisignature, secure sexcoin wallet

## Libraries

- [Lib](https://github.com/Sxcmarket/sexcore-lib) - All of the core Sexcoin primatives including transactions, private key management and others
- [Payment Protocol](https://github.com/Sxcmarket/sexcore-payment-protocol) - A protocol for communication between a merchant and customer
- [P2P](https://github.com/Sxcmarket/sexcore-p2p) - The peer-to-peer networking protocol
- [Mnemonic](https://github.com/Sxcmarket/sexcore-mnemonic) - Implements mnemonic code for generating deterministic keys
- [Channel](https://github.com/Sxcmarket/sexcore-channel) - Micropayment channels for rapidly adjusting sexcoin transactions
- [Message](https://github.com/Sxcmarket/sexcore-message) - Sexcoin message verification and signing
- [ECIES](https://github.com/Sxcmarket/sexcore-ecies) - Uses ECIES symmetric key negotiation from public keys to encrypt arbitrarily long data streams.

## Documentation

The complete docs are hosted here: [sexcore documentation](http://litecore.io/guide/). There's also a [sexcore API reference](http://litecore.io/api/) available generated from the JSDocs of the project, where you'll find low-level details on each sexcore utility.

- [Read the Developer Guide](http://litecore.io/guide/)
- [Read the API Reference](http://litecore.io/api/)

To get community assistance and ask for help with implementation questions, please use our [community forums](http://bitpaylabs.com/c/bitcore).

## Security

We're using Sexcore in production, as are [many others](http://litecore.io#projects), but please use common sense when doing anything related to finances! We take no responsibility for your implementation decisions.

If you find a security issue, please email security@bitpay.com.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/sxcmarket/sexcore/blob/master/CONTRIBUTING.md) file.

This will generate files named `sexcore.js` and `sexcore.min.js`.

You can also use our pre-generated files, provided for each release along with a PGP signature by one of the project's maintainers. To get them, checkout a release commit (for example, https://github.com/bitpay/bitcore/commit/e33b6e3ba6a1e5830a079e02d949fce69ea33546 for v0.12.6).

To verify signatures, use the following PGP keys:
- @braydonf: https://pgp.mit.edu/pks/lookup?op=get&search=0x9BBF07CAC07A276D `D909 EFE6 70B5 F6CC 89A3 607A 9BBF 07CA C07A 276D`
- @gabegattis: https://pgp.mit.edu/pks/lookup?op=get&search=0x441430987182732C `F3EA 8E28 29B4 EC93 88CB  B0AA 4414 3098 7182 732C`
- @kleetus: https://pgp.mit.edu/pks/lookup?op=get&search=0x33195D27EF6BDB7F `F8B0 891C C459 C197 65C2 5043 3319 5D27 EF6B DB7F`
- @matiu: https://pgp.mit.edu/pks/lookup?op=get&search=0x9EDE6DE4DE531FAC `25CE ED88 A1B1 0CD1 12CD  4121 9EDE 6DE4 DE53 1FAC`

## License

Code released under [the MIT license](https://github.com/sxcmarket/sexcore/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
Copyright 2016 The Litecore Core Developers
Copyright 2017 The Sexcore Core Developers
