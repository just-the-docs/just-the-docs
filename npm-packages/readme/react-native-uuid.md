# react-native-uuid

[![GitHub license](https://img.shields.io/github/license/eugenehp/react-native-uuid.svg?color=blue&style=for-the-badge)](./LICENSE)
[![npm](https://img.shields.io/npm/v/react-native-uuid.svg?color=green&style=for-the-badge)](https://www.npmjs.com/package/react-native-uuid)
[![npm downloads](https://img.shields.io/npm/dw/react-native-uuid.svg?label=npm%20downloads&style=for-the-badge)](https://npmcharts.com/compare/react-native-uuid?minimal=true)
[![total npm downloads](https://img.shields.io/npm/dt/react-native-uuid.svg?label=total%20npm%20downloads&style=for-the-badge)](https://npmcharts.com/compare/react-native-uuid?minimal=true)
[![GitHub watchers](https://img.shields.io/github/watchers/eugenehp/react-native-uuid.svg?style=for-the-badge)](https://github.com/eugenehp/react-native-uuid/watchers)
[![GitHub stars](https://img.shields.io/github/stars/eugenehp/react-native-uuid.svg?label=GitHub%20stars&style=for-the-badge)](https://github.com/eugenehp/react-native-uuid/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/eugenehp/react-native-uuid.svg?style=for-the-badge)](https://github.com/eugenehp/react-native-uuid/network/members)
[![open bugs](https://img.shields.io/github/issues-raw/eugenehp/react-native-uuid/bug.svg?color=d73a4a&label=open%20bugs&style=for-the-badge)](https://github.com/eugenehp/react-native-uuid/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug)
[![total open issues](https://img.shields.io/github/issues-raw/eugenehp/react-native-uuid.svg?label=total%20open%20issues&style=for-the-badge)](https://github.com/eugenehp/react-native-uuid/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/eugenehp/react-native-uuid.svg?style=for-the-badge)](https://github.com/eugenehp/react-native-uuid/pulls)

[![Packagephobia](https://badgen.net/packagephobia/install/react-native-uuid)](https://packagephobia.com/result?p=react-native-uuid)
[![Bundlephobia](https://badgen.net/bundlephobia/min/react-native-uuid)](https://bundlephobia.com/result?p=react-native-uuid@2.0.0)

`react-native-uuid` is a zero-dependency TypeScript implementation of [RFC4122](https://tools.ietf.org/html/rfc4122) standard **A Universally Unique IDentifier (UUID) URN Namespace**. Please note, this library uses pseudo random generator based on top of `Math.random`. New version with hardware support is WIP.

**Heavily inspired by:**

- [uuid](https://github.com/uuidjs/uuid)
- [pure-uuid](https://github.com/rse/pure-uuid)
- [nanoid](https://www.npmjs.com/package/nanoid)

Huge thanks to [Randy Coulman](https://github.com/randycoulman) for the early version of a code.

## Getting started

Use this steps to install and create UUIDs. Example projec is available [here](https://github.com/eugenehp/RNUUID)

### 1. Install

```shell
npm install react-native-uuid
```

### 2. Create a UUID

```javascript
import uuid from 'react-native-uuid';
uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'
```

## Documentation

Methods documentation is available [here](./docs/modules.md)

## Troubleshooting

Previous version has been based on `randombytes` that is not compatible with react-native out of the box.
Please submit an [issue](https://github.com/eugenehp/react-native-uuid/issues) if you found a bug.

## react-native-uuid for enterprise

Available as part of the Tidelift Subscription.

The maintainers of react-native-uuid and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source packages you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact packages you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-react-native-uuid?utm_source=npm-react-native-uuid&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Sponsorship

Thank you to our sponsors:

[<img width="300px" src="https://user-images.githubusercontent.com/1857263/114124204-c4e1eb80-98a8-11eb-80ab-64683c24bbc5.png" alt="Reactive Lions™" target="_blank">](https://www.reactivelions.com)

## License

[MIT](./LICENSE)

Copyright (c) 2016-2021 Eugene Hauptmann
