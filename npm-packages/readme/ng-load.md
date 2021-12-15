ng-load
=======

Angular ngLoad directive


### Installing

Install via `bower`

```sh
bower install ng-load --save
```

Add a `<script>` to your html

```html
<script src="bower_components/ng-load/ng-load.js"></script>
```

### Usage

```js
// add 'ngLoad' as dependency to your module
var yourModule = angular.module("yourModule", ['ngLoad']);
```

You can add the `ng-load` directive in `<img>` tags
```html
<img src="beautifulImage.jpg" ng-load="someFunction()" alt="" />
```
