# ngx-slider
[![npm version](https://badge.fury.io/js/%40angular-slider%2Fngx-slider.svg)](https://badge.fury.io/js/%40angular-slider%2Fngx-slider)
[![Travis CI Build](https://travis-ci.org/angular-slider/ngx-slider.svg?branch=master)](https://travis-ci.org/angular-slider/ngx-slider)

Website: https://angular-slider.github.io/ngx-slider/

Self-contained, mobile friendly slider component for Angular 6+ based on [angularjs-slider](https://github.com/angular-slider/angularjs-slider).

**NOTE:** This component used to be known as ng5-slider before the v2.0.0 release. Starting with v2.0.0, it has been re-branded as ngx-slider, targeting Angular 6+. If you have been using the previous version in your app, please follow the instructions in [UPGRADING.md](UPGRADING.md). If you are sticking with the old version, it will continue to be available in the v1.2.x release line under the old name of ng5-slider. If you are looking for documentation for the old version, it is available as [archived copy on Github](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/archive/ng5-slider-v1.2.6-site-archive.zip).

## Demos

 * Single slider - [StackBlitz](https://stackblitz.com/edit/ngx-slider-simple-slider-example?file=src%2Fapp%2Fapp.component.ts)

   ![simple slider image](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/simple-slider.png)

 * Range slider - [StackBlitz](https://stackblitz.com/edit/ngx-slider-range-slider-example?file=src%2Fapp%2Fapp.component.ts)

   ![range slider image](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/range-slider.png)

 * Slider with ticks - [StackBlitz](https://stackblitz.com/edit/ngx-slider-ticks-example?file=src%2Fapp%2Fapp.component.ts)

   ![ticks slider image](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/ticks-slider.png)

 * Customised slider - [StackBlitz](https://stackblitz.com/edit/ngx-slider-customised-range-slider-example?file=src%2Fapp%2Fapp.component.ts)

   ![customised slider image](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/customised-slider.png)

 * Slider with custom style - [StackBlitz](https://stackblitz.com/edit/ngx-slider-styled-slider-example?file=src%2Fapp%2Fapp.component.ts)

   ![styled slider image](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/styled-slider.png)

 * Vertical slider - [StackBlitz](https://stackblitz.com/edit/ngx-slider-vertical-slider-example?file=src%2Fapp%2Fapp.component.ts)

   ![vertical slider image](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/vertical-slider.png)

 * [More examples on official website](https://angular-slider.github.io/ngx-slider/demos)

## Dependencies

 * Angular 6+
 * rxjs 6+

## Installation

To add the slider to your Angular project:
```
npm install --save @angular-slider/ngx-slider
```

Once installed, add the slider to your `app.module.ts`:
```typescript
import { NgxSliderModule } from '@angular-slider/ngx-slider';

...

@NgModule({
   ...
   imports: [
     ...
     NgxSliderModule,
    ...
   ],
   ...
})
export class AppModule {}
```

## Sample usage

Now you can use the slider component in your app components, for example in `app.component.ts`:
```typescript
import { Options } from '@angular-slider/ngx-slider';
...

@Component({...})
export class AppComponent {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };
}
```

And in template file `app.component.html`:
```html
<ngx-slider [(value)]="value" [options]="options"></ngx-slider>
```

## Documentation
Full API documentation is available on [official website](https://angular-slider.github.io/ngx-slider/docs).

## Styling

An overview of how to apply your own style to the slider is described in [STYLING.md](STYLING.md).

## Animations

As of v1.2.0 the slider features CSS animations of slider movement. If you prefer the previous behaviour, without animations, you can set the flag `animate: false` in your slider options.

## Keyboard Shortcuts

In addition to mouse/touch events, the slider can also be controlled through keyboard. The available shortcuts are:
 - right/up arrow - increase by single step,
 - left/down arrow - decrease by single step,
 - page up - increase by 10% of slider range,
 - page down - decrease by 10% of slider range,
 - home - move to minimum value,
 - end - move to maximum value.

## Tooltips

The slider allows for customising how to implement tooltips. See [TOOLTIPS.md](TOOLTIPS.md) for more information.

## Known Issues

Before reporting a new bug, please look at [KNOWN_ISSUES.md](KNOWN_ISSUES.md) for a list of known problems and their workarounds. New bugs reports for these problems will not be accepted.

## Bugs

You can report any bugs as [Github issues](https://github.com/angular-slider/ngx-slider/issues).

Please describe the issue in detail pasting any relevant code, or preferrably a StackBlitz with reproduction of the problem by [forking and editing this sample StackBlitz](https://stackblitz.com/edit/ngx-slider-simple-slider-example?file=src/app/app.component.ts). Please also provide the version of NPM package you are using.

## Changelog

For list of changes and bugfixes, see [CHANGELOG.md](CHANGELOG.md).

## Developer information

If you would like to contribute to the project, see [DEVELOPERS.md](DEVELOPERS.md).

## License

The project is licensed under the MIT license.
