# Angular Material Timepicker

[![Build Status](https://travis-ci.org/Agranom/ngx-material-timepicker.svg?branch=master)](https://travis-ci.org/Agranom/ngx-material-timepicker)
[![codecov](https://codecov.io/gh/Agranom/ngx-material-timepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/Agranom/ngx-material-timepicker)
[![npm version](https://badge.fury.io/js/ngx-material-timepicker.svg)](https://badge.fury.io/js/ngx-material-timepicker)

Handy multifunctional [material design](https://material.io/guidelines/components/pickers.html#pickers-time-pickers) timepicker for Angular 6.0+

## Demo

https://agranom.github.io/ngx-material-timepicker/

## Table of contents
* [Getting started](#getting-started)
* [Internationalization](#internationalization)
* [Documentation](#documentation)
    * [NgxTimepicker](#ngxtimepicker)
    * [NgxMaterialTimepickerComponent](#ngxmaterialtimepickercomponent)
    * [NgxTimepickerFieldComponent](#ngxtimepickerfieldcomponent)
    * [NgxMaterialTimepickerToggleComponent](#ngxmaterialtimepickertogglecomponent)
    * [NgxMaterialTimepickerToggleIconDirective](#ngxmaterialtimepickertoggleicondirective)
    * [NgxMaterialTimepickerThemeDirective (deprecated)](#ngxmaterialtimepickerthemedirective)
* [Development](#development)
* [Tests](#tests)
* [License](#license)

## Getting started

Install timepicker through npm:
```angular2html
npm install --save ngx-material-timepicker
```
Next import the timepicker module into your app's module:
```typescript
import {NgModule} from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  imports: [NgxMaterialTimepickerModule]
})
export class MyModule {}
```
Finally connect the timepicker to an input via a template property:
```angular2html
<input [ngxTimepicker]="picker">
<ngx-material-timepicker #picker></ngx-material-timepicker>
```
The timepicker opens once you click on the input

## Internationalization
Timepicker supports locales in format `BCP 47`. It has `en-US` locale by default.

To override default locale:
```typescript
import {NgModule} from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  imports: [NgxMaterialTimepickerModule.setLocale('ar-AE')]
})
export class MyModule {}
```
 
## Documentation

#### API reference for Angular Material Timepicker
```typescript
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
```
#### NgxTimepicker

Directive responsible for managing the timepicker popup and setting value to input

Selector: `ngxTimepicker`

**Properties**

| Name | Description |
|------|-------------|
| @Input()
  ngxTimepicker: NgxMaterialTimepickerComponent | The timepicker that this input is associated with. | 
| @Input()
  disabled: boolean | Weather the timepicker popup should be disabled. |
| @Input()
  value: string | Set a default value and time for a timepicker. The format of the time is in 12 hours notation `11:00 PM` or in 24 hours notation `23:00`. A Date string won't work. |
| @Input()
  format: number | `12` or `24` . 12h/24h view for hour selection clock . `12` (AM/PM) format by default. |
| @Input()
  min: string or DateTime | Set min time for timepicker (`11:15 pm` ) |
| @Input()
  max: string or DateTime | Set max time for timepicker (`11:15 pm` ) |
| @Input()
  disableClick: boolean | Set `true` to disable opening timepicker by clicking on the input |

  
#### NgxMaterialTimepickerComponent

Component responsible for visualisation the timepicker

Selector: `ngx-material-timepicker`

**Properties**


| Name | Description |
|------|-------------|
| @Input()
  cancelBtnTmpl: TemplateRef<Node> |  Set if you want to change cancel button to your custom one. | 
| @Input()
  confirmBtnTmpl: TemplateRef<Node> | Set if you want to change confirm button to your custom one. |
| @Input()
  editableHintTmpl: TemplateRef<Node> | Set if you want to change dial hint to your custom one. Works only if `enableKeyboardInput = true` |
| @Input()
  ESC: boolean | Disable or enable closing timepicker by ESC. |
| @Input()
  enableKeyboardInput: boolean | To disable or enable changing time through a keyboard on the timepicker dial without interaction with a clock face. Set `false` by default |
| @Input()
  minutesGap: number | To define a gap between minutes. Set `1` by default |
| @Input()
  defaultTime: string | Set default time for a timepicker. `12:00 AM` by default |
| @Input()
  preventOverlayClick: boolean | Set `true` to prevent closing the timepicker by overlay click. Uses `false` by default |
| @Input()
  disableAnimation: boolean | Set `true` to prevent opening and closing timepicker animation. Uses `false` by default |
| @Input()
  hoursOnly: boolean | Set `true` to prevent switching to minutes automatically once hour is selected. Uses `false` by default |
| @Input()
  theme: NgxMaterialTimepickerTheme |  Custom css properties which will override the defaults |
| @Input()
  timepickerClass: string |  To provide a custom css class for the timepicker |
| @Output()
  timeSet: EventEmitter\<string\> | Emits time when that was set. |
| @Output()
  opened: EventEmitter\<null\> | Emits after timepicker was opened. |
| @Output()
  closed: EventEmitter\<null\> | Emits after timepicker was closed. |
| @Output()
  hourSelected: EventEmitter\<number\> | Emits after hour was selected. |
| @Output()
  timeChanged: EventEmitter\<string\> | Emits once time was changed. |
  
#### NgxTimepickerFieldComponent

The timepicker as a control.

Selector: `ngx-timepicker-field`

**Properties**


| Name | Description |
|------|-------------|
| @Input()
  disabled: boolean |  Whether the timepicker is disabled| 
| @Input()
  toggleIcon: TemplateRef\<HTMLObjectElement\> | Provide custom `svg` icon for toggle button |
| @Input()
  buttonAlign: 'right' or 'left' | Positioning toggle button (`right` by default) |
| @Input()
  clockTheme: NgxMaterialTimepickerTheme | Custom css properties which will override timepicker clock |
| @Input()
  controlOnly: boolean | Hide or display toggle button with the timepicker clock |
| @Input()
  format: number | `12` or `24` . Set format for timepicker. `12` (AM/PM) format by default. |
| @Input()
  cancelBtnTmpl: TemplateRef\<Node\> |  Set if you want to change cancel button for timepicker to your custom one. | 
| @Input()
  confirmBtnTmpl: TemplateRef\<Node\> | Set if you want to change confirm button for timepicker to your custom one. |
| @Input()
  min: string or DateTime | Set min time for timepicker (`11:15 pm` ) |
| @Input()
  max: string or DateTime | Set max time for timepicker (`11:15 pm` ) |
| @Output()
  timeChanged: EventEmitter\<string\> | Emit a new time once it is changed. |

  
#### NgxMaterialTimepickerToggleComponent

Component responsible for opening the timepicker.

Selector: `ngx-material-timepicker-toggle`

**Properties**


| Name | Description |
|------|-------------|
| @Input()
  for: NgxMaterialTimepickerComponent |  Timepicker instance that the button will toggle | 
| @Input()
  disabled: boolean | Whether the toggle button is disabled |
  
#### NgxMaterialTimepickerToggleIconDirective

Can be used to override the icon of a `NgxMaterialTimepickerToggleComponent`.

Selector: `[ngxMaterialTimepickerToggleIcon]`

#### NgxMaterialTimepickerThemeDirective (deprecated)

Can be used to override styles of a `NgxMaterialTimepicker`.

Selector: `ngx-material-timepicker[ngxMaterialTimepickerTheme]`

**Properties**

| Name | Description |
|------|-------------|
| @Input()
  ngxMaterialTimepickerTheme: NgxMaterialTimepickerTheme |  Custom css properties which will override the defaults | 

## Development

### Prepare your environment

Install local dev dependencies: `npm install` while current directory is this repo.
 
### Development server

Run `npm start` to start a development server on a port 4200.

Open `http//:localhost:4200` on your browser.

## Tests

Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

## License

MIT

