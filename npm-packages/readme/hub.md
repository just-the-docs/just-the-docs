Hub
=
Hub is made to reduce redundant async calls.

Example
-
Program triggers multiple async calls at the same time, using hub, only one call will be actually send out.
Also the result could be saved by setting a timeout(in ms), null or undefined means permanent cache.

Interface
-
* **ctor**
    1. fn, a function takes nothing and return a promise
    2. timeout: ms (0 for nocache and null/undefined for permanent cache)
* **timeout** (boolean)
* **get** (Promise)
