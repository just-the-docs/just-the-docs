# Angular Calendar Scheduler

[![Build Status](https://travis-ci.org/mounthorse-slns/angular-calendar-scheduler.svg?branch=master)](https://travis-ci.org/mounthorse-slns/angular-calendar-scheduler)
[![npm version](https://badge.fury.io/js/angular-calendar-scheduler.svg)](https://www.npmjs.com/package/angular-calendar-scheduler)
[![codecov](https://codecov.io/gh/mounthorse-slns/angular-calendar-scheduler/branch/master/graph/badge.svg)](https://codecov.io/gh/mounthorse-slns/angular-calendar-scheduler)
[![issues](https://img.shields.io/github/issues/mounthorse-slns/angular-calendar-scheduler.svg)](https://github.com/mounthorse-slns/angular-calendar-scheduler/issues)
[![forks](https://img.shields.io/github/forks/mounthorse-slns/angular-calendar-scheduler.svg)](https://github.com/mounthorse-slns/angular-calendar-scheduler/network)
[![stars](https://img.shields.io/github/stars/mounthorse-slns/angular-calendar-scheduler.svg)](https://github.com/mounthorse-slns/angular-calendar-scheduler/stargazers)
[![license](https://img.shields.io/github/license/mounthorse-slns/angular-calendar-scheduler.svg)](https://github.com/mounthorse-slns/angular-calendar-scheduler/blob/master/LICENSE)

___

## Demo

https://angular-calendar-scheduler-demo.stackblitz.io

## Table of contents

* [About](#about)
* [Getting Started](#getting-started)
    * [Install](#install)
    * [Include Component](#include-component)
    * [Usage](#usage)
<!-- * [API](#api)
  * [Properties](#properties) -->
* [License](#license)

## About

This project provide a scheduler view component for [mattlewis92/angular-calendar](https://github.com/mattlewis92/angular-calendar).

## Getting Started

### Install

#### NPM

```sh
npm install angular-calendar-scheduler date-fns --save
```

#### Yarn

```sh
yarn add angular-calendar-scheduler date-fns
```

### Include Component

#### Import

```ts
import { CalendarModule } from 'angular-calendar';
import { SchedulerModule } from 'angular-calendar-scheduler';

@NgModule({
    ...
    imports: [
        ...,
        CalendarModule.forRoot(),
        SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
        ...
    ],
    ...
})
class AppModule { }
```

### Usage

#### app.component.ts

```ts
import {
    CalendarView,
    CalendarDateFormatter,
    DateAdapter
} from 'angular-calendar';
import {
    ...
} from 'angular-calendar-scheduler';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [{
        provide: CalendarDateFormatter,
        useClass: SchedulerDateFormatter
    }]
})
export class AppComponent implements OnInit {
    title = 'Angular Calendar Scheduler Demo';

    CalendarView = CalendarView;

    view: CalendarView = CalendarView.Week;
    viewDate: Date = new Date();
    viewDays: number = DAYS_IN_WEEK;
    refresh: Subject<any> = new Subject();
    locale: string = 'en';
    hourSegments: number = 4;
    weekStartsOn: number = 1;
    startsWithToday: boolean = true;
    activeDayIsOpen: boolean = true;
    excludeDays: number[] = []; // [0];
    weekendDays: number[] = [0,6];
    dayStartHour: number = 6;
    dayEndHour: number = 22;

    minDate: Date = new Date();
    maxDate: Date = endOfDay(addMonths(new Date(), 1));
    
    dayModifier: Function;
    hourModifier: Function;
    segmentModifier: Function;
    eventModifier: Function;

    prevBtnDisabled: boolean = false;
    nextBtnDisabled: boolean = false;

    actions: CalendarSchedulerEventAction[] = [
        {
            when: 'enabled',
            label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
            title: 'Delete',
            onClick: (event: CalendarSchedulerEvent): void => {
                console.log('Pressed action \'Delete\' on event ' + event.id);
            }
        },
        {
            when: 'disabled',
            label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
            title: 'Restore',
            onClick: (event: CalendarSchedulerEvent): void => {
                console.log('Pressed action \'Restore\' on event ' + event.id);
            }
        }
    ];

    events: CalendarSchedulerEvent[];

    @ViewChild(CalendarSchedulerViewComponent) calendarScheduler: CalendarSchedulerViewComponent;

    constructor(@Inject(LOCALE_ID) locale: string, private appService: AppService, private dateAdapter: DateAdapter) {
        this.locale = locale;

        this.dayModifier = ((day: SchedulerViewDay): void => {
            if (!this.isDateValid(day.date)) {
                day.cssClass = 'cal-disabled';
            }
        }).bind(this);

        this.hourModifier = ((hour: SchedulerViewHour): void => {
            if (!this.isDateValid(hour.date)) {
                hour.cssClass = 'cal-disabled';
            }
        }).bind(this);

        this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
            if (!this.isDateValid(segment.date)) {
                segment.isDisabled = true;
            }
        }).bind(this);

        this.eventModifier = ((event: CalendarSchedulerEvent): void => {
            event.isDisabled = !this.isDateValid(event.start);
        }).bind(this);

        this.dateOrViewChanged();
    }

    ngOnInit(): void {
        this.appService.getEvents(this.actions)
            .then((events: CalendarSchedulerEvent[]) => this.events = events);
    }

    viewDaysOptionChanged(viewDays: number): void {
        console.log('viewDaysOptionChanged', viewDays);
        this.calendarScheduler.setViewDays(viewDays);
    }

    changeDate(date: Date): void {
        console.log('changeDate', date);
        this.viewDate = date;
        this.dateOrViewChanged();
    }

    changeView(view: CalendarView): void {
        console.log('changeView', view);
        this.view = view;
        this.dateOrViewChanged();
    }

    dateOrViewChanged(): void {
        if (this.startsWithToday) {
            this.prevBtnDisabled = !this.isDateValid(subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
            this.nextBtnDisabled = !this.isDateValid(addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
        } else {
            this.prevBtnDisabled = !this.isDateValid(endOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
            this.nextBtnDisabled = !this.isDateValid(startOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
        }

        if (this.viewDate < this.minDate) {
            this.changeDate(this.minDate);
        } else if (this.viewDate > this.maxDate) {
            this.changeDate(this.maxDate);
        }
    }

    private isDateValid(date: Date): boolean {
        return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate;
    }

    viewDaysChanged(viewDays: number): void {
        console.log('viewDaysChanged', viewDays);
        this.viewDays = viewDays;
    }

    dayHeaderClicked(day: SchedulerViewDay): void {
        console.log('dayHeaderClicked Day', day);
    }

    hourClicked(hour: SchedulerViewHour): void {
        console.log('hourClicked Hour', hour);
    }

    segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
        console.log('segmentClicked Action', action);
        console.log('segmentClicked Segment', segment);
    }

    eventClicked(action: string, event: CalendarSchedulerEvent): void {
        console.log('eventClicked Action', action);
        console.log('eventClicked Event', event);
    }

    eventTimesChanged({ event, newStart, newEnd }: SchedulerEventTimesChangedEvent): void {
        console.log('eventTimesChanged Event', event);
        console.log('eventTimesChanged New Times', newStart, newEnd);
        let ev = this.events.find(e => e.id === event.id);
        ev.start = newStart;
        ev.end = newEnd;
        this.refresh.next();
    }
}
```

#### app.component.html

```html
    ...
    <select #viewDayOptionSelect class="form-control" [ngModel]="viewDays" (change)="viewDaysOptionChanged(viewDayOptionSelect.value)">
            <option [value]="1">One day</option>
            <option [value]="3">Three days</option>
            <option [value]="7">One week</option>
    </select>
    ...
    <calendar-scheduler-view *ngSwitchCase="CalendarView.Week"
                            [viewDays]="viewDays"
                            [viewDate]="viewDate"
                            [events]="events"
                            [locale]="locale"
                            [responsive]="true"
                            [weekStartsOn]="weekStartsOn"
                            [excludeDays]="excludeDays"
                            [startsWithToday]="startsWithToday"
                            [hourSegments]="hourSegments"
                            [dayStartHour]="dayStartHour"
                            [dayEndHour]="dayEndHour"
                            [dayModifier]="dayModifier"
                            [hourModifier]="hourModifier"
                            [segmentModifier]="segmentModifier"
                            [eventModifier]="eventModifier"
                            [showEventActions]="true"
                            [showSegmentHour]="true"
                            [zoomEventOnHover]="true"
                            (viewDaysChanged)="viewDaysChanged($event)"
                            (dayHeaderClicked)="dayHeaderClicked($event.day)"
                            (hourClicked)="hourClicked($event.hour)"
                            (segmentClicked)="segmentClicked('Clicked', $event.segment)"
                            (eventClicked)="eventClicked('Clicked', $event.event)"
                            (eventTimesChanged)="eventTimesChanged($event)"
                            [refresh]="refresh">
      </calendar-scheduler-view>
    ...
```

## License

This software is released under the MIT license. See [LICENSE](LICENSE) for more details.