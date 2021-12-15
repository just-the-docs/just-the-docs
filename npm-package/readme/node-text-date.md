# node-text-date
Get text values back for date components

## Usage

```javascript
var textdate = require('textdate');

console.log('Text Date');

console.log(
	'Month from index (0 based): ',
	textdate.monthFromIndex( 7 )
);

console.log(
	'Full month from index (0 based): ',
	textdate.monthFromIndex( 7, true )
);

console.log(
	'Day from index (0 based): ',
	textdate.dayFromIndex( 3 )
);

console.log(
	'Full Day from index (0 based): ',
	textdate.dayFromIndex( 3, true )
);
```
