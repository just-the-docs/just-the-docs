# CashScript

[![Build Status](https://travis-ci.org/Bitcoin-com/cashscript.svg)](https://travis-ci.org/Bitcoin-com/cashscript)
[![Coverage Status](https://img.shields.io/codecov/c/github/Bitcoin-com/cashscript.svg)](https://codecov.io/gh/Bitcoin-com/cashscript/)
[![NPM Version](https://img.shields.io/npm/v/cashscript.svg)](https://www.npmjs.com/package/cashscript)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/cashscript.svg)](https://www.npmjs.com/package/cashscript)
[![NPM License](https://img.shields.io/npm/l/cashscript.svg)](https://www.npmjs.com/package/cashscript)

CashScript is a high-level programming language for smart contracts on Bitcoin Cash. It offers a strong abstraction layer over Bitcoin Cash' native virtual machine, Bitcoin Script. Its syntax is based on Ethereum's smart contract language Solidity, but its functionality is very different since smart contracts on Bitcoin Cash differ greatly from smart contracts on Ethereum. For a detailed comparison of them, refer to the blog post [*Smart Contracts on Ethereum, Bitcoin and Bitcoin Cash*](https://kalis.me/smart-contracts-eth-btc-bch/).

This repository contains the code for the CashScript compiler & command line tool under [`packages/cashc/`](/packages/cashc). This repository also contains the code for the CashScript JavaScript SDK under [`packages/cashscript/`](/packages/cashscript). The source code of the [CashScript.org](https://cashscript.org) website is included under [`website/`](/website). Visit the website for a detailed [Documentation](https://cashscript.org/docs/) on the CashScript language and SDK.

## The CashScript Language
CashScript is a high-level language that allows you to write Bitcoin Cash smart contracts in a straightforward and familiar way. Its syntax is inspired by Ethereum's Solidity language, but its functionality is different since the underlying systems have very different fundamentals. See the [language documentation](https://cashscript.org/docs/language/) for a full reference of the language.

## The CashScript Compiler
CashScript features a compiler as a standalone command line tool, called `cashc`. It can be installed through npm and used to compile `.cash` files into `.json` artifact files. These artifact files can be imported into the CashScript JavaScript SDK (or other SDKs in the future). The `cashc` NPM package can also be imported inside JavaScript files to compile `.cash` files without using the command line tool.

### Installation
```bash
npm install -g cashc
```

### Usage
```bash
Usage: cashc [options] [source_file]

Options:
  --output, -o   Specify a file to output the generated artifact.       [string]
  --hex, -h      Compile the contract to hex format rather than a full artifact
                                                                       [boolean]
  --asm, -A      Compile the contract to ASM format rather than a full artifact
                                                                       [boolean]
  --opcount, -c  Display the number of opcodes in the compiled bytecode[boolean]
  --size, -s     Display the size in bytes of the compiled bytecode    [boolean]
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
```

## The CashScript SDK
The main way to interact with CashScript contracts and integrate them into applications is using the CashScript SDK. This SDK allows you to import `.json` artifact files that were compiled using the `cashc` compiler and convert them to `Contract` objects. These objects are used to create new contract instances. These instances are used to interact with the contracts using the functions that were implemented in the `.cash` file. For more information on the CashScript SDK, refer to the [SDK documentation](https://cashscript.org/docs/sdk/).

### Installation
```bash
npm install cashscript
```

### Usage
```ts
import { Contract, ... } from 'cashscript';
```

```js
const { Contract, ... } = require('cashscript');
```

Using the CashScript SDK, you can import contract artifact files, create new instances of these contracts, and interact with these instances:

```ts
...
  // Import the P2PKH artifact
  const P2PKH = require('./p2pkh-artifact.json');

  // Instantiate a network provider for CashScript's network operations
  const provider = new ElectrumNetworkProvider('mainnet');

  // Create a new P2PKH contract with constructor arguments: { pkh: pkh }
  const contract = new Contract(P2PKH, [pkh], provider);

  // Get contract balance & output address + balance
  console.log('contract address:', contract.address);
  console.log('contract balance:', await contract.getBalance());

  // Call the spend function with the owner's signature
  // And use it to send 0. 000 100 00 BCH back to the contract's address
  const txDetails = await contract.functions
    .spend(pk, new SignatureTemplate(keypair))
    .to(contract.address, 10000)
    .send();

  console.log(txDetails);
...
```

## Examples
If you want to see CashScript in action and check out its usage, there are several example contracts in the [`examples/`](/examples) directory. The `.cash` files contain example contracts, and the `.ts` files contain example usage of the CashScript SDK to interact with these contracts.

The "Hello World" of CashScript contracts is defining the P2PKH pattern inside a contract, which can be found under [`examples/p2pkh.cash`](/examples/p2pkh.cash). Its usage can be found under [`examples/p2pkh.ts`](/examples/p2pkh.ts).

### Running the examples
To run the examples, clone this repository and navigate to the `examples/` directory. Since the examples depend on the SDK, be sure to run `npm install` or `yarn` inside the `examples/` directory, which installs all required packages.

```bash
git clone git@github.com:Bitcoin-com/cashscript.git
cd cashscript/examples
npm install
```

All `.ts` files in the [`examples/`](/examples) directory can then be executed with `ts-node`.

```bash
npm install -g ts-node
ts-node p2pkh.ts
```

All `.js` files can be executed with `node`.

```bash
node p2pkh.js
```
