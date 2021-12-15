# strip-bom

> Strip UTF-8 [byte order mark](https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8) (BOM) from a string

From Wikipedia:

> The Unicode Standard permits the BOM in UTF-8, but does not require nor recommend its use. Byte order has no meaning in UTF-8.

## Install

```
$ npm install strip-bom
```

## Usage

```js
import stripBom from 'strip-bom';

stripBom('\uFEFFunicorn');
//=> 'unicorn'
```

## Related

- [strip-bom-cli](https://github.com/sindresorhus/strip-bom-cli) - CLI for this module
- [strip-bom-buf](https://github.com/sindresorhus/strip-bom-buf) - Buffer version of this module
- [strip-bom-stream](https://github.com/sindresorhus/strip-bom-stream) - Stream version of this module

---

<div>
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-strip-bom?utm_source=npm-strip-bom&utm_medium=referral&utm_campaign=readme">Get professional support for 'strip-bom' with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
