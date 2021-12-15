# ng2-datepicker

ng2-datepicker is simple and minimal Angular datepicker component. It is fully customizable.

## Installation

1. Install package from `npm`.

```sh
npm install ng2-datepicker --save
```

2. Include DatepickerModule into your application.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [BrowserModule, DatepickerModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

And that's it, you can then use it in your component as:

```ts
date = new Date();
```

```html
<ngx-datepicker [(ngModel)]="date"></ngx-datepicker>
```

## Options

```ts
import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';

// options sample with default values
options: DatepickerOptions = {
  minYear: getYear(new Date()) - 30, // minimum available and selectable year
  maxYear: getYear(new Date()) + 30, // maximum available and selectable year
  placeholder: '', // placeholder in case date model is null | undefined, example: 'Please pick a date'
  format: 'LLLL do yyyy', // date format to display in input
  formatTitle: 'LLLL yyyy',
  formatDays: 'EEEEE',
  firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  locale: locale, // date-fns locale
  position: 'bottom',
  inputClass: '', // custom input CSS class to be applied
  calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
  scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
  keyboardEvents: true // enable keyboard events
};
```

For available `format`, `formatTitle` and `formatDays` options check out [here](https://date-fns.org/docs/format).

Then you apply custom options in your template as:

```html
<ngx-datepicker [(ngModel)]="date" [options]="options"></ngx-datepicker>
```

## Theme customization

This examples uses SASS as style preprocessor.

```sass
.datepicker-blue
  .calendar-container
    background: #32A8E4
    border: 1px solid #32A8E4
    box-shadow: 0 4px 12px rgba(0, 0, 0, .3)
    top: 35px
    left: 0
    font-weight: 700
  .month-year-text
    color: #ffffff
  .control
    path
      fill: #eff1f5
    &:hover
      path
        fill: #ffffff
  .day-name-unit
    color: #fafafa
  .day-unit, .year-unit
    color: #ffffff
    &.is-prev-month
      color: #8ed0f0
    &.is-today
      background: #8ed0f0
    &:hover, &.is-selected
      background: #ffffff
      color: #686669
    &.is-disabled
      color: #aaa8ab
      &:hover
        background: transparent
```

And in your component:

```ts
import { DatepickerOptions } from 'ng2-datepicker';

options: DatepickerOptions = {
  calendarClass: 'datepicker-blue',
  scrollBarColor: '#ffffff'
};
```

## Run Demo

1. Clone this repository.

```sh
git clone https://github.com/bleenco/ng2-datepicker
```

2. Install dependencies

```sh
npm install
```

3. Start the demo

```sh
npm start
```

## License

MIT
