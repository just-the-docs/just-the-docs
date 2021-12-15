<h1>angular 12.0+ calendar</h1>

<div>

[![Sponsorship](https://img.shields.io/badge/funding-github-%23EA4AAA)](https://github.com/users/mattlewis92/sponsorship)
[![Build Status](https://travis-ci.org/mattlewis92/angular-calendar.svg?branch=master)](https://travis-ci.org/mattlewis92/angular-calendar)
[![codecov](https://codecov.io/gh/mattlewis92/angular-calendar/branch/master/graph/badge.svg)](https://codecov.io/gh/mattlewis92/angular-calendar)
[![npm version](https://badge.fury.io/js/angular-calendar.svg)](http://badge.fury.io/js/angular-calendar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter Follow](https://img.shields.io/twitter/follow/mattlewis92_.svg)](https://twitter.com/mattlewis92_)

</div>

<h2>Demo</h2>

<div>

https://mattlewis92.github.io/angular-calendar/

</div>

<h2>Sponsors</h2>

<div>
  
<a href="https://clickup.com/careers/senior-frontend-engineer" target="_blank"><img src="https://i.imgur.com/0RWYhEB.jpg"></a>
  
<a href="https://github.com/sponsors/mattlewis92">Become a silver or gold sponsor<a> and get your logo on this README on Github with a link to your site.
</div>

## Table of contents

- [About](#about)
- [Getting started](#getting-started)
- [Documentation](#documentation)
- [Breaking changes](#breaking-changes)
- [FAQ](#faq)
- [Angular 1 version](#angular-1-version)
- [Development](#development)
- [License](#license)

<h2>About</h2>

A calendar component for Angular 12.0+ that can display events on a month, week or day view. The successor of [angular-bootstrap-calendar](https://github.com/mattlewis92/angular-bootstrap-calendar).

<h2>Getting started</h2>

### ng add (recommended)

```sh
ng add angular-calendar
```

### Manual setup (ng add will do this all for you)

First install through npm:

```bash
npm install --save angular-calendar date-fns
```

Next include the CSS file in the global (not component scoped) styles of your app:

```
/* angular-cli file: src/styles.css */
@import "../node_modules/angular-calendar/css/angular-calendar.css";
```

Finally import the calendar module into your apps module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class MyModule {}
```

In order to allow the most flexibility for all users there is a substantial amount of boilerplate required to get up and running. Please see the [demos list](https://mattlewis92.github.io/angular-calendar/) for a series of comprehensive examples of how to use this library within your application.

Once you are up and running, to access a full list of options for each component, the individual APIs are documented here: [`mwl-calendar-month-view`](https://mattlewis92.github.io/angular-calendar/docs/components/CalendarMonthViewComponent.html), [`mwl-calendar-week-view`](https://mattlewis92.github.io/angular-calendar/docs/components/CalendarWeekViewComponent.html) and [`mwl-calendar-day-view`](https://mattlewis92.github.io/angular-calendar/docs/components/CalendarDayViewComponent.html).

If you would like a one on one consultation with me where I can show you the best way to integrate and customise this calendar within your application, then you can get this by becoming a Platinum Sponsor on [GitHub](https://github.com/users/mattlewis92/sponsorship).

> Please note: angular-calendar uses [Scarf](https://scarf.sh/) to collect anonymized installation analytics. These analytics help support the maintainers of this library. However, if you'd like to opt out, you can do so by setting `scarfSettings.enabled = false` in your project's package.json. Alternatively, you can set the environment variable `SCARF_ANALYTICS=false` before you install.

<h2>Documentation</h2>

To see all available API options, take a look at the auto generated [documentation](https://mattlewis92.github.io/angular-calendar/docs/). You may find it helpful to view the examples on the demo page.

<h2>Breaking changes</h2>

Where possible this library will strictly adhere to [semver](http://semver.org/) and only introduce API breaking changes in 0.x releases or new major versions post 1.0. The only exception to this is if you are using custom templates or extending the base components to add additional functionality, whereby critical bug fixes may introduce breakages as the internal API changes.

<h2>FAQ</h2>

### Is this library AoT and universal compatible?

Yes.

### What major versions of angular does this library support?

| Angular major   | Last supported angular-calendar version                                  |
| --------------- | ------------------------------------------------------------------------ |
| 12.x and higher | latest version                                                           |
| 6.x - 11.x      | [0.28.28](https://github.com/mattlewis92/angular-calendar/tree/v0.28.28) |
| 5.x             | [0.24.1](https://github.com/mattlewis92/angular-calendar/tree/v0.24.1)   |
| 4.x             | [0.22.3](https://github.com/mattlewis92/angular-calendar/tree/v0.22.3)   |
| 2.x             | [0.9.1](https://github.com/mattlewis92/angular-calendar/tree/v0.9.1)     |

### No styles are appearing?

No component styles are included with each component to make it easier to override them (otherwise you’d have to use `!important` on every rule that you customised). Thus you need to import the CSS file separately from `node_modules/angular-calendar/css/angular-calendar.css`.

### How come there are so many dependencies?

When building the calendar some parts were found to be reusable so they were split out into their own modules. Only the bare minimum that is required is included with the calendar, there is no extra code than if there were no dependencies. `date-fns` especially only imports directly the functions it needs and not the entire library.

### The month, week or day view doesn’t meet my project requirements, but the other views do.

Build your own component to replace that view, and use it in place of the one this library provides. It’s impossible to provide a calendar component that meets everyones use cases, hopefully though at least some of the day / week / month view components provided can be customised with the calendars API enough to be of some use to most projects.

### How come there’s no year view like the ng1 version?

As there are so many events to show on each month, it doesn’t provide a lot of value and is just an extra burden to maintain. There is nothing to stop someone from building a new lib like `angular-calendar-year-view` though ;)

### Does this calendar work with mobile?

This library is not optimised for mobile. Due to the complex nature of a calendar component, it is non trivial to build a calendar that has a great UX on both desktop and mobile. It is recommended to build your own calendar component for mobile that has a dedicated UX. You may be able to get some degree of mobile support by setting some custom CSS rules for smaller screens on the month view and showing less days on the [week view](https://mattlewis92.github.io/angular-calendar/#/responsive-week-view).

### How do I use a custom template?

All parts of this calendar can be customised via the use of an `ng-template`. The recipe for applying one is as follows:

- Find the template you would like to customise for the month, week or day view component. You can find all available custom templates by reading the [documentation](https://mattlewis92.github.io/angular-calendar/docs/) for each component. For this example we will pick the [`cellTemplate`](https://mattlewis92.github.io/angular-calendar/docs/components/CalendarMonthViewComponent.html#cellTemplate) from the month view.
- Next find the corresponding child component that will render the template by viewing the source. For our example of the month view cell it is [this component](https://github.com/mattlewis92/angular-calendar/blob/master/projects/angular-calendar/src/modules/month/calendar-month-cell.component.ts)
- Now copy the [template source](https://github.com/mattlewis92/angular-calendar/blob/be842da460a803ebb570418bc10e11fab56bd7b9/projects/angular-calendar/src/modules/month/calendar-month-cell.component.ts#L15-L72) for your chosen template into your own component and modify as your see fit.
- Finally pass the template to the components input: `<mwl-calendar-month-view [cellTemplate]="cellTemplateId" />`
- You can see an e2e working example of this [here](https://mattlewis92.github.io/angular-calendar/#/custom-templates)

### What is the browser compatibility?

All browsers supported by angular, apart from IE9 as it doesn't support flexbox.

### Does this library require bootstrap?

No! While the demo site uses bootstrap, it isn't a requirement of this library. The styling is designed to adapt to whatever global styling your app has.

<h2>Angular 1 version</h2>

<div>

https://github.com/mattlewis92/angular-bootstrap-calendar

</div>

<h2>Development</h2>

### Prepare your environment

- Install [Node.js](http://nodejs.org/) and NPM (should come with)
- Install local dev dependencies: `npm install` while current directory is this repo

### Development server

Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing

Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release

- Bump the version in package.json (once the module hits 1.0 this will become automatic)

```bash
npm run release
```
