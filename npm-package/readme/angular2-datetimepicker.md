
# Angular 2 / 4 DateTime Picker

# [Documentation](http://cuppalabs.github.io/components/datepicker) | [Demos / Examples](https://cuppalabs.github.io/angular2-datetimepicker).

### Overview 

Angular 2 DateTimepicker is a cool responsive DateTimepicker component for Web and Mobile. It is Mobile friendly and light weight. Developed by [Cuppa Labs](http://www.cuppalabs.com).

### Getting Started
To get started with using the multiselect dropdown component, follow the below steps. It’s easy to integrate and just a matter of minutes.

### Installation
- The datetimepicker package is published on the [npm](https://www.npmjs.com/package/angular2-datetimepicker) Registry. 
-  Install the package with [npm](https://www.npmjs.com): 

```js
	npm install angular2-datetimepicker
```

### Usage

Import `AngularDateTimePickerModule` into your `AppModule`

```js
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

@NgModule({
  // ...
  imports: [
    AngularDateTimePickerModule,
  ]
  // ...
})

```
Declare the component data variables and options in your component where you want to consume the dropdown component.

```js 
import { Component, OnInit } from '@angular/core';

export class AppComponent implements OnInit {
    
	date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: true
	}
	constructor(){}
    ngOnInit(){
       
    }
}

```

Add the following component tag in the template where your want to place the datepicker

```html

<angular2-date-picker [(ngModel)]="date" [settings]="settings"></angular2-date-picker>

```


### Settings

Following `settings` object properties can be used to configure the component.

|Property	|Type	|Default	|Description	|
|:--- |:--- |:--- |:--- |
|format|String|dd-MMM-yyyy hh:mm a|Date format of the selected date.|
|bigBanner|Boolean|true| The banner section to show the date details.  |
|defaultOpen|Boolean|false|To open the datepicker popover on load. Default is set to false.|
|timePicker|Boolean|false|Enable time picker feature.|
|closeOnSelect|Boolean|true|to close the popover on date select or on click of done button.|


## Callback Methods

- `onDateSelect`

Define a callback method to be called on select of the date.

```html
  
  <angular2-date-picker (onDateSelect)="onDateSelect($event)" 
			[(ngModel)]="date" 
			[settings]="settings" >
  </angular2-date-picker>

```
## Date Formats Support

format string can be composed of the following elements:

- 'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
- 'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
- 'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
- 'MMMM': Month in year (January-December)
- 'MMM': Month in year (Jan-Dec)
- 'MM': Month in year, padded (01-12)
- 'M': Month in year (1-12)
- 'LLLL': Stand-alone month in year (January-December)
- 'dd': Day in month, padded (01-31)
- 'd': Day in month (1-31)
- 'EEEE': Day in Week,(Sunday-Saturday)
- 'EEE': Day in Week, (Sun-Sat)
- 'HH': Hour in day, padded (00-23)
- 'H': Hour in day (0-23)
- 'hh': Hour in AM/PM, padded (01-12)
- 'h': Hour in AM/PM, (1-12)
- 'mm': Minute in hour, padded (00-59)
- 'm': Minute in hour (0-59)
- 'ss': Second in minute, padded (00-59)
- 's': Second in minute (0-59)
- 'sss': Millisecond in second, padded (000-999)
- 'a': AM/PM marker
- 'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
- 'ww': Week of year, padded (00-53). Week 01 is the week with the first Thursday of the year
- 'w': Week of year (0-53). Week 1 is the week with the first Thursday of the year
- 'G', 'GG', 'GGG': The abbreviated form of the era string (e.g. 'AD')
- 'GGGG': The long form of the era string (e.g. 'Anno Domini')

format string can also be one of the following predefined localizable formats:

- 'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 PM)

- 'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 PM)
- 'fullDate': equivalent to 'EEEE, MMMM d, y' for en_US locale (e.g. Friday, September 3, 2010)
- 'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010)
- 'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
- 'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
- 'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 PM)
- 'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 PM)

## Run locally
- Clone the repository or downlod the .zip,.tar files.
- Run `npm install`
- Run `ng serve` for a dev server
- Navigate to `http://localhost:4200/`

## License
MIT License.

## Credits
Thanks to Font Awesome and Moment.js for the libraries.

## Author
Pradeep Kumar Terli