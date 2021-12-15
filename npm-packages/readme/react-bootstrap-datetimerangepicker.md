# React Date&Time Range Picker for Bootstrap

[![NPM version][npm-badge]][npm] [![Build Status][travis-ci-image]][travis-ci-url]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]
[![peerDependency Status][peer-deps-badge]][peer-deps]

![Improvely.com](http://i.imgur.com/LbAMf3D.png)

This date range picker component for Bootstrap creates a dropdown menu from which a user can select a range of dates.

Base on [bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker)

Online demo: http://luqin.github.io/react-bootstrap-datetimerangepicker

## Features

* limiting the selectable date range
* localizable strings and date formats
* a single date picker mode
* optional time picker (for e.g. making appointments or reservations)
* styles that match the default Bootstrap 3 theme



## Upgrade guide

**<2.0 to 2.x**

Using official `bootstrap-daterangepicker`

```sh
# <2.0
npm install react-bootstrap-datetimerangepicker onefe-bootstrap-daterangepicker --save

# 2.x
npm install react-bootstrap-datetimerangepicker bootstrap-daterangepicker --save
```

```js
// <2.0
import 'bootstrap/dist/css/bootstrap.css';
import 'onefe-bootstrap-daterangepicker/daterangepicker.css';

// 2.x
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
```

## Installation

```
npm install react-bootstrap-datetimerangepicker bootstrap-daterangepicker --save
```

## Usage

Date Range Picker relies on [Bootstrap](http://getbootstrap.com/), [jQuery](http://www.jquery.com/) and [Moment.js](http://momentjs.com/). Include the required stylesheet in your page:

```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
```

```js
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

<DatetimeRangePicker
    startDate={this.state.startDate}
    endDate={this.state.endDate}
    onApply={this.handleApply}
>
    <input type="text" value={label}/>
</DatetimeRangePicker>

<DatetimeRangePicker
    timePicker
    timePicker24Hour
    showDropdowns
    timePickerSeconds
    locale={locale}
    startDate={this.state.startDate}
    endDate={this.state.endDate}
    onApply={this.handleApply}
>
    <Button>
        <i className="fa fa-calendar"/> &nbsp;
        <span>{label}</span>
        <i className="fa fa-angle-down"/>
    </Button>
</DatetimeRangePicker>
```

More examples: [Online demo](http://luqin.github.io/react-bootstrap-datetimerangepicker), [Source](https://github.com/luqin/react-bootstrap-datetimerangepicker/tree/master/examples)

## Documentation

For in depth documentation, see the original
[bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker) project page.

### Options

- **startDate**: (Date object, moment object or string) The start of the initially selected date range
- **endDate**: (Date object, moment object or string) The end of the initially selected date range
- **minDate**: (Date object, moment object or string) The earliest date a user may select
- **maxDate**: (Date object, moment object or string) The latest date a user may select
- **dateLimit**: (object) The maximum span between the selected start and end dates. Can have any property you can add to a moment object (i.e. days, months)
- **showDropdowns**: (boolean) Show year and month select boxes above calendars to jump to a specific month and year
- **showWeekNumbers**: (boolean) Show week numbers at the start of each week on the calendars
- **timePicker**: (boolean) Allow selection of dates with times, not just dates
- **timePickerIncrement**: (number) Increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30)
- **timePicker24Hour**: (boolean) Use 24-hour instead of 12-hour times, removing the AM/PM selection
- **timePickerSeconds**: (boolean) Show seconds in the timePicker
- **ranges**: (object) Set predefined date ranges the user can select from. Each key is the label for the range, and its value an array with two dates representing the bounds of the range
- **opens**: (string: 'left'/'right'/'center') Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to
- **drops**: (string: 'down' or 'up') Whether the picker appears below (default) or above the HTML element it's attached to
- **buttonClasses**: (array) CSS class names that will be added to all buttons in the picker
- **applyClass**: (string) CSS class string that will be added to the apply button
- **cancelClass**: (string) CSS class string that will be added to the cancel button
- **locale**: (object) Allows you to provide localized strings for buttons and labels, customize the date display format, and change the first day of week for the calendars
- **singleDatePicker**: (boolean) Show only a single calendar to choose one date, instead of a range picker with two calendars; the start and end dates provided to your callback will be the same single date chosen
- **autoApply**: (boolean) Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates or a predefined range is selected
- **linkedCalendars**: (boolean) When enabled, the two calendars displayed will always be for two sequential months (i.e. January and February), and both will be advanced when clicking the left or right arrows above the calendars. When disabled, the two calendars can be individually advanced and display any month/year.
- **parentEl**: (string) jQuery selector of the parent element that the date range picker will be added to, if not provided this will be 'body'
- **isInvalidDate**: (function) A function that is passed each date in the two calendars before they are displayed, and may return true or false to indicate whether that date should be available for selection or not.
- **autoUpdateInput**: (boolean) Indicates whether the date range picker should automatically update the value of an <input> element it's attached to at initialization and when the selected dates change.

### Events

- **onShow**: Triggered when the picker is shown
- **onHide**: Triggered when the picker is hidden
- **onHideCalendar**: Triggered when the calendar(s) are shown
- **onApply**: Triggered when the calendar(s) are hidden
- **onCancel**: Triggered when the apply button is clicked, or when a predefined range is clicked
- **onEvent**: Triggered when the cancel button is clicked

All of the events above should take a handler that is passed 2 arguments: **event** and **picker**

#### Example event handler:

```js
var SomeReactComponent = React.createClass({
    handleEvent: function (event, picker) {
        console.log(picker.startDate);
    },
    render: function () {
        return (
            <DatetimeRangePicker onEvent={this.handleEvent} />
        );
    }
});
```

## Browser support

* Google Chrome
* Firefox (2+)
* IE (9+)
* Opera (11.6+)
* Safari (6+)

## Local Setup

* Install the dependencies with `npm install`
* Run the docs site in development mode with `npm start`. This will watch for file changes as you work. And auto refresh the page to see the updates.

[npm-badge]: http://badge.fury.io/js/react-bootstrap-datetimerangepicker.svg
[npm]: https://www.npmjs.com/package/react-bootstrap-datetimerangepicker

[deps-badge]: https://david-dm.org/luqin/react-bootstrap-datetimerangepicker.svg
[deps]: https://david-dm.org/luqin/react-bootstrap-datetimerangepicker

[dev-deps-badge]: https://david-dm.org/luqin/react-bootstrap-datetimerangepicker/dev-status.svg
[dev-deps]: https://david-dm.org/luqin/react-bootstrap-datetimerangepicker#info=devDependencies

[peer-deps-badge]: https://david-dm.org/luqin/react-bootstrap-datetimerangepicker/peer-status.svg
[peer-deps]: https://david-dm.org/luqin/react-bootstrap-datetimerangepicker#info=peerDependencies

[travis-ci-image]: https://travis-ci.org/luqin/react-bootstrap-datetimerangepicker.svg
[travis-ci-url]: https://travis-ci.org/luqin/react-bootstrap-datetimerangepicker
