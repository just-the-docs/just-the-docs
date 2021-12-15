# QuillJS table

Test lab for creating `TABLE` functionality in QuillJS using Containers.

Code of quill is included in project so we can easily play with it in our tests.

## Usage
```javascript
const quillTable = require('quill-table');

Quill.register(quillTable.TableCell);
Quill.register(quillTable.TableRow);
Quill.register(quillTable.Table);
Quill.register(quillTable.Contain);
Quill.register('modules/table', quillTable.TableModule);
```
## Progress so far
* `TABLE`, `TR` and `TD` are containers - it is possible to have multiple block blots in `TD`.
* all tables, rows and cells are identified by random strings and optimize merge only those with the same id.
* It is possible to add tables by defining rows and cols count in grid.
* It is possible to add rows and columns to existing tables (accessible by buttons in toolbar).
* it is possible to copy & paste table from Word. Works ok. Needs to test edge cases.

## Known issues
It is early stage so there is a lot of issues with current state.
Still there are some worth to mention which should be dealt with.

* Lists (number or bullet) in cell upon enter loose list format on previous line but keeps it on actual.
* Delete and backspace behavior on tables should be either disabled or should have some well defined behavior. Now it is pretty easy to destroy table in ugly way.
* Definition of TableTrick is hacked in just to test if adding of rows and cols is easily possible - which is. Should be done differently so quill doesn't throw exception (it continues to work).
* Undo/History breaks badly with cell deletions (disabled backspace could solve this).
* When loading delta of nested container in table cell, nested container loose format.
* Containers need order similar to Inline.order. Otherwise delta is not canonical.
* ...
