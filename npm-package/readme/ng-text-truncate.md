ng-text-truncate
================

This is a simple, but fully functional, directive for truncating text in [angularjs](https://angularjs.org/) apps. This directive not only truncates your text, but also permits toggling the hidden part of the truncated text.

If you are using *ng-text-truncate* in a project that already uses [Twitter Boostrap](http://getbootstrap.com/), then the toggling elements (i.e. textual links with the texts "More" and "Less") shall inherit Bootstrap's styles for textual links. If you are not using Twitter Boostrap or if you want to customize some aspect of the toggling elements, then you can write your own CSS for the class *ngTruncateToggleText*.

[DEMO 1 (Most of the use cases)](https://rawgit.com/lorenooliveira/ng-text-truncate/master/demo1.html)

[DEMO 2 (Custom CSS)](https://rawgit.com/lorenooliveira/ng-text-truncate/master/demo2.html)

Usage Instructions
==================

1. Include the JS file
----------------------

```html
<script src="angular.min.js"></script>
...
<script src="ng-text-truncate.js"></script>
```

As usual, include this file after the inclusion of the *angular.min.js* file.

2. Import *ng-text-truncate* in your app
--------------------------------------

```javascript
angular.module( "TestApp", [ "ngTextTruncate" ] );
```

3. Assign a text to some variable
---------------------------------

```javascript
$scope.longText = "Lorem ipsum dolor sit amet, and a possibly long remaining text.";
```

4. Apply the directive to the element where you intend to put your text
-----------------------------------------------------------------------

Use the *cs-truncate* attribute to pass the variable holding your text. In the *cs-truncate-threshould* attribute you should indicate the maximum number of chars to be displayed before truncation. That is, any string bigger than *cs-truncate-threshould* will be truncated.

```html
<p ng-text-truncate="longText"
   ng-tt-chars-threshold="40"></p>
```

5. And...... that's all folks
-----------------------------

Now open your HTML and everything should be working as intended.

6. Ok, but, what are all this directive's features?
---------------------------------------------------

By using this directive you can:

* Truncate your text based on the number of chars to be displayed;
* Truncate your text based on the number of words to be displayed;
* Toggle the hidden part of truncated text visible or not;
* Customize the text of the toggling elements (the defaults are "More" and "Less");
* If you want/need, you can just truncate the text (i.e., ommit the toggling elements);
* Take a ride in Bootstrap's styles for the toggling elements;
* Customize the appearance of the toggling elements by means of a custom CSS class (for the case you don't like Bootstrap's defaults or if you are not using Bootstrap).

7. Nice. And how to use them?
-----------------------------

Take a look at our live demos. There we have clear examples about using each of our features.

[DEMO 1 (Most of the use cases)](https://rawgit.com/lorenooliveira/ng-text-truncate/master/demo1.html)

[DEMO 2 (Custom CSS)](https://rawgit.com/lorenooliveira/ng-text-truncate/master/demo2.html)

Future Improvements
===================

Get in touch if you have ideas for improvements. Bug reports and pull requests are welcome.