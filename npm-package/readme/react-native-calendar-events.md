# React Native Calendar Events

[![npm](https://img.shields.io/npm/v/react-native-calendar-events.svg?style=flat-square)](https://www.npmjs.com/package/react-native-calendar-events)
[![npm](https://img.shields.io/npm/dm/react-native-calendar-events.svg?style=flat-square)](https://www.npmjs.com/package/react-native-calendar-events)
[![npm](https://img.shields.io/npm/l/react-native-calendar-events.svg?style=flat-square)](https://github.com/wmcmahan/react-native-calendar-events/blob/master/LICENSE.md)

A React Native module to help access and save events to iOS and Android calendars.

## Table of contents
- [**Getting started**](#getting-started)
  - [Install](#step-1---install)
  - [Link the library](#step-2---link-the-library)
  - [OS specific setup](#step-3---os-specific-setup)
- [**API methods**](#api)
  - [authorizationStatus](#authorizationstatus)
  - [authorizeEventStore](#authorizeeventstore)
  - [findCalendars](#findcalendars)
  - [findEventById](#findeventbyid)
  - [fetchAllEvents](#fetchallevents)
  - [saveEvent](#saveevent)
  - [removeEvent](#removeevent)
- [**Event fields**](#event-fields)
  - [Recurrence rules](#recurrence-rule)
  - [Alarm](#alarms)
  - [Alarm structuredLocation](#alarm-structuredlocation)
  - [Options](#options)
- [**Wiki**](https://github.com/wmcmahan/react-native-calendar-events/wiki)


## Getting started
This package assumes that you already have a React Native project or are familiar with React Native. If not, checkout the official documentation for more details about getting started with [React Native](https://facebook.github.io/react-native/docs/getting-started.html).
<br/>

The following is **required** for the package to work properly.

### Step 1. - Install
Install the `react-native-calendar-events` library with native code.

```
npm install --save react-native-calendar-events
```

### Step 2. - Link the library
Since this package contains native code, you will need to include the code as a library. The React Native documentation on ["Linking Libraries"](https://facebook.github.io/react-native/docs/linking-libraries-ios.html) also provides some details for this process.

+ **Automatic linking**
```
react-native link
```

+ **Manual linking**<br/>
Sometimes "automatic linking" is not sufficient or is not properly including the library. Fortunately, the React Native docs on ["Manual Linking"](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking) serves a helpful guide (with pictures) in the process.

### Step 3. - OS specific setup

- [**iOS specific instructions**](https://github.com/wmcmahan/react-native-calendar-events/wiki/iOS-setup)<br/> iOS specific requirements, such as mandatory privacy usage descriptions and including the `EventKit.framework`.

- [**Android specific instructions**](https://github.com/wmcmahan/react-native-calendar-events/wiki/Android-setup)<br/> Android specific requirements, such as mandatory application permissions.

<br/>

## API
The following API allows for interacting with both iOS and Android device calendars. See the full list of available [event fields](#event-fields).


```javascript
import RNCalendarEvents from 'react-native-calendar-events';
```

<br/>

### authorizationStatus
Get calendar authorization status.

```javascript
RNCalendarEvents.authorizationStatus()
```

Returns: **Promise** 
- fulfilled: String - `denied`, `restricted`, `authorized` or `undetermined`
- rejected: Error

<br/>

### authorizeEventStore
Request calendar authorization. Authorization must be granted before accessing calendar events.

> Android note: This is only necessary for targeted SDK of 23 and higher.

```javascript
RNCalendarEvents.authorizeEventStore()
```

Returns: **Promise** 
 - fulfilled: String - `denied`, `restricted`, `authorized` or `undetermined`
 - rejected: Error

<br/>


### findCalendars
Finds all the calendars on the device.

```javascript
RNCalendarEvents.findCalendars()
```

Returns: **Promise**
 - fulfilled: Array - A list of known calendars on the device
 - rejected: Error

<br/>

### findEventById
Find calendar event by id.
Returns a promise with fulfilled found events.

```javascript
RNCalendarEvents.findEventById(id)
```

Arguments: 
 - id: String - The events unique id.

Returns: **Promise**  
 - fulfilled: Object | null - Found event with unique id.
 - rejected: Error

<br/>

### fetchAllEvents
Fetch all calendar events.
Returns a promise with fulfilled found events.

```javascript
RNCalendarEvents.fetchAllEvents(startDate, endDate, calendars)
```

Arguments: 
 - startDate: Date - The start date of the range of events fetched.
 - endDate: Date - The end date of the range of events fetched.
 - calendars: Array - List of calendar id strings to specify calendar events. Defaults to all calendars if empty.

Returns: **Promise**  
 - fulfilled: Array - Matched events within the specified date range.
 - rejected: Error

<br/>

### saveEvent
Creates or updates a calendar event. - [wiki guide](https://github.com/wmcmahan/react-native-calendar-events/wiki/Creating-basic-event)

```javascript
RNCalendarEvents.saveEvent(title, details, options);
```

Arguments: 
 - title: String - The title of the event.
 - [details](#event-fields): Object - The event's details.
 - [options](#options): Object - Options specific to the saved event.

Returns: **Promise** 
 - fulfilled: String - Created event's ID.
 - rejected: Error

<br/>

To update an event, the event `id` must be defined. - [wiki guide](https://github.com/wmcmahan/react-native-calendar-events/wiki/Updating-events)

```javascript
RNCalendarEvents.saveEvent(title, {id: 'FE6B128F-C0D8-4FB8-8FC6-D1D6BA015CDE'})
```

<br/>

### removeEvent
Removes calendar event.

```javascript
RNCalendarEvents.removeEvent(id, options)
```

Arguments:
 - id: String - The id of the event to remove.
 - [options](#options): Object - Options specific to event removal.

Returns: **Promise** 
 - fulfilled: Bool - Successful
 - rejected: Error

<br/>

## Event fields

| Property        | Type            | Description | iOS | Android |
| :--------------- | :---------------- | :----------- | :-----------: | :-----------: |
| **id***  | String  | Unique id for the calendar event. | ✓ | ✓ |
| **calendarId****   | String           | Unique id for the calendar where the event will be saved. Defaults to the device's default calendar. | ✓ | ✓ |
| **title**           | String           | The title for the calendar event. | ✓ | ✓ |
| **startDate**       | Date             | The start date of the calendar event in ISO format. | ✓ | ✓ |
| **endDate**         | Date             | The end date of the calendar event in ISO format. | ✓ | ✓ |
| **allDay**          | Bool             | Indicates whether the event is an all-day event. | ✓ | ✓ |
| **recurrence**      | String           | The simple recurrence frequency of the calendar event `daily`, `weekly`, `monthly`, `yearly` or none. | ✓ | ✓ |
| [**recurrenceRule**](#recurrence-rule) **  | Object           | The events recurrence settings. | ✓ | ✓ |
| **occurrenceDate***  | Date | The original occurrence date of an event if it is part of a recurring series. | ✓ |  |
| **isDetached**      | Bool        | Indicates whether an event is a detached instance of a repeating event. | ✓ |  |
| **url**             | String           | The url associated with the calendar event. | ✓ |  |
| **location**        | String           | The location associated with the calendar event. | ✓ | ✓ |
| **notes**           | String           | The notes associated with the calendar event. | ✓ |  |
| **description**     | String           | The description associated with the calendar event. |  | ✓ |
| [**alarms**](#alarms)          | Array            | The alarms associated with the calendar event, as an array of alarm objects. | ✓ | ✓ |
| [**attendees**](#attendees)*   | Array            | The attendees of the event, including the organizer. | ✓ | ✓ |
| [**calendar**](#calendar)*    | Object      | The calendar containing the event.| ✓ | ✓ |


### Calendar

| Property        | Type            | Description | iOS | Android |
| :--------------- | :---------------- | :----------- | :-----------: | :-----------: |
| **id**       | String   | Unique calendar ID. | ✓ | ✓ |
| **title**       | String   | The calendar’s title. | ✓ | ✓ |
| **type**       | String   | The calendar’s type. | ✓ | ✓ |
| **source**       | String   | The source object representing the account to which this calendar belongs. | ✓ | ✓ |
| **isPrimary***   | Bool | Indicates if the calendar is assigned as primary. | ✓ | ✓ |
| **allowsModifications***   | Bool | Indicates if the calendar allows events to be written, edited or removed. | ✓ | ✓ |
| **color***   | String   | The color assigned to the calendar represented as a hex value. | ✓ | ✓ |
| **allowedAvailabilities***   | Array   | The event availability settings supported by the calendar. | ✓ | ✓ |


### Attendees

| Property        | Type            | Description | iOS | Android |
| :--------------- | :---------------- | :----------- | :-----------: | :-----------: |
| **name**  | String  | The name of the attendee. | ✓ | ✓ |
| **email***   | String           | The email address of the attendee. | ✓ | ✓ |
| **phone***   | String           | The phone number of the attendee. | ✓ |  |


### Recurrence rule
| Property        | Type            | Description |  iOS | Android |
| :--------------- | :---------------- | :----------- | :-----------: | :-----------: |
| **frequency**     | String           | Event recurring frequency. Allowed values are `daily`, `weekly`, `monthly`, `yearly`. | ✓ | ✓ |
| **endDate**       | Date             | Event recurring end date. This overrides occurrence. | ✓ | ✓ |
| **occurrence**    | Number           | Number of event occurrences. | ✓ | ✓ |
| **interval**      | Number           | The interval between events of this recurrence. | ✓ | ✓ |


### Alarms

| Property        | Type            | Description | iOS | Android |
| :--------------- | :------------------| :----------- | :-----------: | :-----------: | 
| **date**           | Date or Number    | If a Date is given, an alarm will be set with an absolute date. If a Number is given, an alarm will be set with a relative offset (in minutes) from the start date. | ✓ | ✓ |
| [**structuredLocation**](#alarm-structuredlocation) | Object             | The location to trigger an alarm. | ✓ |  |


### Alarm structuredLocation

| Property        | Type            | Description | iOS | Android |
| :--------------- | :------------------| :----------- | :-----------: | :-----------: |
| **title**           | String  | The title of the location.| ✓ |  |
| **proximity** | String             | A value indicating how a location-based alarm is triggered. Possible values: `enter`, `leave`, `none`. | ✓ |  |
| **radius** | Number             | A minimum distance from the core location that would trigger the calendar event's alarm. | ✓ |  |
| **coords** | Object             | The geolocation coordinates, as an object with latitude and longitude properties | ✓ |  |


### Options
| Property        | Type            | Description |  iOS | Android |
| :--------------- | :---------------- | :----------- | :-----------: | :-----------: |
| **exceptionDate**   | Date           | The start date of a recurring event's exception instance. Used for updating single event in a recurring series | ✓ | ✓ |
| **futureEvents**   | Bool            | If `true` the update will span all future events. If `false` it only update the single instance.  | ✓ |  |

<p>* <i>Read only</i>, ** <i>Write only</i> </p>

<br/>

## Wiki

- [Create basic event](https://github.com/wmcmahan/react-native-calendar-events/wiki/Creating-basic-event)
- [Create recurring event](https://github.com/wmcmahan/react-native-calendar-events/wiki/Create-recurring-event)
- [Updating events](https://github.com/wmcmahan/react-native-calendar-events/wiki/Updating-events)
- [Adding alarms](https://github.com/wmcmahan/react-native-calendar-events/wiki/Event-alarms)

## Authors

* **Will McMahan** - Initial code - [github.com/wmcmahan](https://github.com/wmcmahan)

See also the list of [contributors](https://github.com/wmcmahan/react-native-calendar-events/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/wmcmahan/react-native-calendar-events/blob/master/LICENSE.md) file for details

## Acknowledgments

* Big thanks to all who have contributed, raised an issue or simply find use in this project. Cheers!
