# angular-mojier(もじゃー)
AngularJS module adapting [mojier](https://github.com/sashimizakana/mojier)
# Demo
http://sashimizakana.github.io/angular-mojier/
# Installation
- Download release/mojier.js
- After loading AngularJS
```html
<script src="mojier.js"></script>
```
```js
angular.module('app',['sakana.mojier']);
```
You can also use npm(and browserify).
```sh
npm install angular-mojier
```
```node
var mojier = require('angular-mojier');
angular.module('app',[mojier]);
```
# Service
```js
angular.module('app',['sakana.mojier']).controller('ctrl',function(mojier){
  var emoji = mojier.get('smile');//U+1F604
  mojier.findAlias(emoji);//smile
  this.aliases = mojier.getAllAliases();//array of the all emoji aliases
});
```
# Filter
```html
<input ng-model="text"><!-- Thank you :smile: -->
{{text|mojier}}<!-- Thank you (U+1F604) -->
```

## Prefix and suffix

```js

$filter('Thank you :smile:','<span class="emoji">','</span>');
//Thank you <span class="emoji">(U+1F604)</span>

```

# Lisence

MIT

---

Demoみてね
