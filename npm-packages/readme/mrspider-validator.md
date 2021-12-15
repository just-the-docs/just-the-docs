# mrspider-validator

middleware for [mrspider](https://github.com/vermiculite/mrspider) typically used after data extraction middlware such as [regex data extractor](https://github.com/vermiculite/mrspider-regex-data-extractor), [css image extraction](https://github.com/vermiculite/mrspider-css-image-extraction) and [css data extractor](https://github.com/vermiculite/mrspider-css-data-extractor) before any persistence middleware such as [mongodb persister](https://github.com/vermiculite/mrspider-mongodb-persister).

Its purpose is to clean up extracted data removing any fields not included in the validation and converting types to those specified in the validation. Also marks the `page.valid` property true or false to avoid persisting invalid data.

## Install

`npm i -S mrspider-validator`

## Usage

```js
var spider = require('mrspider');
var mrspiderValidator = require('mrspider-validator');
var validRules = {
            name: {
                type: 'string',
                required: true,
                message: 'name is required'
            },
            age: {
                type: 'number',
                required: true,
                message: 'supposed to be a number'
            }
        };
spider.use(mrspidervalidator(validRules));

```
