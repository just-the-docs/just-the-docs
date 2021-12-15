# Frídagar

Node module that returns Icelandic holidays and other special days

## Installation

```
npm install fridagar
```

## Usage

```javascript
// Use 'fridagar' if you installed via NPM
var fridagar = require('./fridagar');

// Get holidays and other important days for June 2016
var allDays = fridagar.getAllDays(2016, 6);

// Get only holidays for June 2016
var holidays = fridagar.getHolidays(2016, 6);

// Get only other important days for June 2016
var otherDays = fridagar.getOtherDays(2016, 6);
```

## Sample output

```javascript
const notableDays2018 = fridagar.getAllDays(2018 );
JSON.stringify(notableDays2018) === [
  ...
  {
    "date": "2018-12-23T00:00:00.000Z",
    "description": "Þorláksmessa",
  },
  {
    "date": "2018-12-24T00:00:00.000Z",
    "description": "Aðfangadagur",
    "halfDay": true,
    "holiday": true
  },
  {
    "date": "2018-12-25T00:00:00.000Z",
    "description": "Jóladagur",
    "holiday": true
  },
  ...
]
```



## Changelog

### 3.2.0
_2021-07-14_
- Add TypeScript type definitions


### 3.1.1
_2018-05-11_
- Fix documentation


### 3.1.0
_2018-04-28_
- Add "Hrekkjavaka"
- Demote "Þorláksmessa" to notable day status
- Add flagging of "half-day" holidays
- Use current day/year as default for all methods
- Improve performance
- Minor bugfixes


### 3.0.0
_2016-06-18_
- Calculate holidays instead of scraping them.
- Removed promises (breaking changes).


### 2.0.0
_2016-03-28_
- Use promises instead of callbacks.


### 1.0.0
_2016-03-27_
- Initial release.
