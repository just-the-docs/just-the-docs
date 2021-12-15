# Angular 2 Material Datepicker

[![Version](http://img.shields.io/npm/v/angular2-material-datepicker.svg)](https://www.npmjs.org/package/angular2-material-datepicker)
[![BuildStatus](https://travis-ci.org/koleary94/Angular-2-Datepicker.svg?branch=master)](https://travis-ci.org/koleary94/Angular-2-Datepicker)

A minimalist datepicker library for Angular 2

![](https://j.gifs.com/ERwG6l.gif)

### Installation
```
npm install angular2-material-datepicker
```

### Usage
Import the Datepicker Module and add it to the `imports` of your module
```
import { DatepickerModule } from 'angular2-material-datepicker'

@NgModule({
  imports: [ DatepickerModule ],
  declarations: [ ... ],
  bootstrap: [ ... ]
})
export class YourModule { }
```
If you already have a module of the same name, you can create an alias
```
import { DatepickerModule as YourAlias } from 'angular2-material-datepicker'
```
Call the component from within a template
```
<material-datepicker [(date)]="yourModelDate"></material-datepicker>
```
and you're set!

### API
The datepicker component can be called with no arguments. See the [Angular 2 Documentation](https://angular.io/docs/ts/latest/cookbook/component-communication.html) for how to communicate with child components. If you use an event emitter, the datepicker component has an emitter called `onSelect` (when the date is picked), and `dateChange` (for two-way binding).

Optional parameters are listed below.

| Parameter | Type | Description |
|---|---|---|
| `accentColor` | string  | Replaces the default blue accent color  |
|`altInputStyle` | boolean | If `true`, changes the input styling to primarily use the accent color |
| `date` | Date | The source of truth for the selected date. If passed, the date will automatically be displayed in the input field and clicking on the input field will bring up the respective month. |
| `dateFormat` | string or function | By default, the date will be shown in `YYYY-MM-DD` (ISO 8601 standard). Other formats include `MM-DD-YYYY` and `DD-MM-YYYY`. If you pass in a string, it is *not* case sensitive. You can also pass in a function to create the string yourself, which must be of the type `(date: Date): string`. |
|`disabled` | boolean | If `true`, adds "disabled" attribute to input |
| `fontFamily` | string | By default, the element will use `'Helvetica Neue', 'Helvetica', 'Arial', 'Calibri', 'Roboto'` in that order. Passing in this value will override these defaults.|
|`placeholder` | string | This text will be shown if the date is empty |
| `rangeStart` | Date | The beginning boundary for selecting a date. For example, passing in `new Date(2015,2)` will prevent the user from being able to get to February 2015. |
| `rangeEnd` | Date | Same as `rangeStart`, but for the end boundary. e.g. passing in `new Date()` will prevent the user from being able to get to the next month. |
| `cancelText` | string | default is `Cancel` can be changed to the text you desire. |
| `weekStart` | number | default is `0` witch is Sunday, Monday is `1` and so on |


### CSS
The css is inlined and autoprefixed to support the last two versions of major browsers as of 2016/9/20

### Animation
The animation between months uses the angular 2 animation api. Check out [caniuse](http://caniuse.com/#feat=web-animation) to see what the browser compatibility status is for these animations. For incompatible browsers, a polyfill is required. Grab [web-animations.min.js from GitHub](https://github.com/web-animations/web-animations-js) and add it to your page.

### Todo
- Possibly make the ranges impact selection on a more granular level by preventing days, not just months, from being selected.

### License
MIT
