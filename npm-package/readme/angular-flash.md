# angular-flash
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/gtramontina/angular-flash/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![Build Status](https://travis-ci.org/gtramontina/angular-flash.png?branch=master)](https://travis-ci.org/gtramontina/angular-flash)

Flash messages for Angular.js. [Demo](http://embed.plnkr.co/y1INk36bPbW7GaX15QbQ/preview)

Supports view changes, which means you can set a flash message, navigate to another view and your message will be displayed.
## Install
`bower install angular-flash-messages`

## Usage
After adding `angular-flash.js` to your project, add `flash` as a dependency to your module. Here is a simple example:

```javascript
angular.module('myModule', ['flash'])
.controller('EditProductController', function($scope, flash) {
  $scope.save = function() {
    // … save the product
    flash('Saved!');
  };
});
```

Then, in your HTML, simply add the `<flash:messages>` element where you want your messages to be displayed. It can be in your main template or individual partials.

```html
  <body ng-app="myModule">
    <flash:messages></flash:messages>

    <main ng:controller="HomeController">
      <h1>Home</h1>
    </main>
  </body>
```

### IE Support
If you need IE8 support (or prefer), you can use the attribute directive: `<ol flash:messages></ol>`.

## Examples

 - `flash('My message')`

```html
<ol id="flash-messages">
  <li class="success">My message</li>
</ol>
```

 - `flash([ 'Hi!', 'My message' ])`

```html
<ol id="flash-messages">
  <li class="success">Hi</li>
  <li class="success">My message</li>
</ol>
```

 - `flash('error', 'Something went wrong…')`

```html
<ol id="flash-messages">
  <li class="error">Something went wrong…</li>
</ol>
```

 - `flash([ 'Hi!', { level: 'warning', text: 'This is a warning!' } ])`

```html
<ol id="flash-messages">
  <li class="success">Hi</li>
  <li class="warning">This is a warning!</li>
</ol>
```

## License
This is licensed under the feel-free-to-do-whatever-you-want-to-do license.
