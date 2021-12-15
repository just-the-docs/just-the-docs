# shindan
shindanmaker web scraper

[![NPM](https://nodei.co/npm/shindan.png?mini=true)](https://nodei.co/npm/shindan/)
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

shindan is a web scraper for [ShindanMaker](https://en.shindanmaker.com/), a joke fortune telling website.

```js
const shindan = require('shindan')

shindan
  .diagnose(587327, 'Pudding')
  .then(console.log) // Yes, Pudding is 795% cute.
```

Authors on ShindanMaker create short, often comical diagnoses based on message fragments that are shuffled together, and then visitors enter their names and read these random diagnoses with their names inserted in. I couldn't find an official API to do this on ShindanMaker's site, so I decided to just scrape their website for data.

## Diagnoses
```js
promise = shindan.diagnose(shindanID, name[, callback])
```
Sends a request to ShindanMaker for the provided `shindanID` with your `name`.

* `shindanID` *number*. You can find this in your shindan's uri. Must be an integer.
* `name` *string*. Who is the diagnosis for? Can't be an empty string, but can be anything else ShindanMaker supports.
* `promise` / `callback` You can use either or both.
  - `error` *Error*. You can get request errors and parsing errors
  - `result` *object*. Diagnosis result. Currently only has one property but will eventually have more.
    - `result` *string*. Your result.

Generally, providing the same pair of arguments will give you the same results for a day. [Try it yourself](https://en.shindanmaker.com/587458) for more details.

## Shindan listing
```js
promise = shindan.list([options], [callback])
```
Scrapes ShindanMaker's list page, passing `options` as a query string.

* `options` You can either provide an object or a string here. If you leave this blank, you'll get the newest listing.
  - *string*. Provide a string instead of an object and it'll be treated as the `mode` parameter.
  - *object*. Query string parameters. Some useful ones:
    - `mode` Your list mode. You can find them by browsing [ShindanMaker](https://en.shindanmaker.com/c/list), but the most useful one is probably `hot` for HOT items.
    - `p` List page.
* `promise` / `callback` You can use either or both.
  - `error` *Error*. You can get request errors.
  - `results` *array*. An array of objects representing the items found in the list
    - `order` *number*. The current list index
    - `id` *number*. Shindan ID
    - `title` *string*. Shindan name / title
    - `author` *string*. Whoever wrote the shindan
    - `description` *string*. Shindan description
    - `tags` *array*. An array of strings representing the tags given to this shindan
    - `favorites` *number*. Number of favorites
    - `diagnoses` *number*. Number of diagnoses given. Sometimes inaccurate.
