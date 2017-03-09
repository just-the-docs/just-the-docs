# CSS properties

List of standard and browser specific CSS properties.

## Source

1. Standard properties (only 'CR', 'WD', 'FPWD', 'LC', 'REC' statuses): http://www.w3.org/Style/CSS/all-properties.en.json 
2. Browser supported properties from `window.getComputedStyle` / `document.body.style`:

 ### Windows
 |                   | XP     | 7      | 8      | 10     |
 | ----------------- | ------ | ------ | ------ | ------ |
 | Chrome            | 18-49  | 18-50  | 22-50  | 37-52  |
 | Firefox           | 6-45   | 6-45   | 16-45  | 32-46  |
 | Internet Explorer |        | 8-11   | 10-11  | 11     |
 | Edge              |        |        |        | 13     |

 ### OSX
 |                   | 10.6  | 10.11  |
 | ----------------- | ----- | ------ |
 | Chrome            | 14-49 | 14-54  |
 | Firefox           | 6-42  | 6-48   |

 ### Others:

 - Safari: 6, 6.2, 7, 8, 9, 9.1, 10.0
 - Mobile Safari: 6, 7, 8, 8.3, 9.0, 9.3, 10.0
 - Chrome Android: 30, 35, 37, 46
 - Firefox mobile: 47
 - IE mobile: 11
 - Opera Win XP: 12.10, 12.14, 12.15, 12.16
 - Opera Win 8: 36-38
 - Opera OSX: 36-40

### JavaScript API

```js
const properties = require('known-css-properties').all;
```
