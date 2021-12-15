# Angular-Animations Utility Library

[![npm version](https://badge.fury.io/js/angular-animations.svg)](https://www.npmjs.com/package/angular-animations)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Gitter chat](https://badges.gitter.im/angular-animations.png)](https://gitter.im/angular-animations/Lobby)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Easy, Reusable Animation Utility library for Angular Apps.

Angular Animations utility library is a collection of reusable and parametrized animations build for Angular 4.4.6+ that can be used in a declarative manner. It implements all animations from [animate.css](https://daneden.github.io/animate.css/) (and more). Works both with AOT and JIT compilations.

### Quick links

[Demo](https://filipows.github.io/angular-animations/) |
[StackBlitz Demo](https://stackblitz.com/edit/angular-animations-lib-demo) |
[StackBlitz Base Template](https://stackblitz.com/edit/angular-animations-lib-base-template)

### Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Animations `on enter` / `on leave`](#animations-on-enter--on-leave)
  - [Animations with state or triggered by state changes](#animations-with-state-or-triggered-by-state-changes)
  - [Parametrized animations](#parametrized-animations)
  - [Animation Callbacks](#animation-callbacks)
    - [Loop animation](#loop-animation)
    - [Chain animations](#chain-animations)
- [Available Animations and Parameters](#available-animations-and-parameters)
- [Running Demo App](#running-demo-app)
- [Authors](#authors)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you import `BrowserAnimationModule` in your angular app.

```bash
 npm i @angular/animations@latest --save
```

Import `BrowserAnimationsModule` from `@angular/platform-browser/animations` in your root NgModule

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```

```ts
@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    BrowserAnimationsModule
  ],
})
export class AppModule { }
```

## Installation

```bash
 npm i angular-animations --save
```

## Usage

### Animations `on enter` / `on leave`

Animations on enter / on leave are triggered in a moment when element is added to or removed from the dom.
Basic example would be with `*ngIf` template directive.

Import animation functions that you want to use and add them to `animations` in a component decorator:

```ts
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: '...',
  templateUrl: '...',
  styleUrls: ['...'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
```

and use them in the template:

```html
<div *ngIf="CONDITION" [@fadeInOnEnter] [@fadeOutOnLeave]></div>
```

### Animations with state or triggered by state changes

These animations take as an input a boolean value. Some animations, like Attention Seekers are triggered depending on the `direction` parameter; bidirectional (`<=>`) will be triggered by any state change, unidirectional (`=>`) will be triggered only when state changes from false to true.

All `in` and `out` animations are triggered by changes of state from `false` to `true`. Animations that preserve state, like `collapse` or `rotate` display default state when the value is `false` and transition to end state when the value is `true`

```ts
import { collapseAnimation, rubberBandAnimation } from 'angular-animations';

@Component({
  ...
  animations: [
    rubberBandAnimation(),
    collapseAnimation(),
  ]
})
```

```html
<div [@rubberBand]="rubberState"></div>
<div [@collapse]="collapseState"></div>
```

### Parametrized animations

All animations are open for customizations. All of them have parameters: `duration` and `delay`, and if it make sense for an animation, additional ones: `translate`, `degrees` or `scale`.

Parameters can be used either in a component decorator or dynamically in a template.

In a decorator:

```ts
@Component({
  ...
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100, translate: '30px' }),
    bounceOutDownOnLeaveAnimation({ anchor: 'leave', duration: 500, delay: 200, translate: '40px' })
  ]
})
```

```html
<div *ngIf="CONDITION" [@enter] [@leave]></div>
```

Animations like Attention Seekers can take a direction parameter (cannot be in template)

```ts
@Component({
  ...
  animations: [
    // triggers when STATE changes from false to true
    rubberBandAnimation({anchor: 'rubber', direction: '=>', duration: 500})
  ]
})
```

```html
<div [@rubber]="STATE"></div>
```

In a template (providing option for dynamic changes):

```ts
@Component({
  ...
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter'),
  ]
})
```

```html
<div *ngIf="CONDITION" [@enter]="{ value: '', params: { duration: 300, delay: 0, translate: '30px' } }" [@leave]></div>
<div *ngIf="CONDITION" [@enter]="{ value: '', params: { duration: 300, delay: 100, translate: '40px } }" [@leave]></div>
```

With parameters in a template, we can for example achieve staggering animations:

```html
<div *ngFor="let i of [1,2,3]" [@enter]="{ value: '', params: { delay: i * 100 } }"></div>
```

### Animation Callbacks

Each animation supports `start` and `done` callbacks to setup hook methods that get called at the start or end of animations.
We can add callbacks with the syntax `(@trigger.start)` or `(@trigger.done)`, where `trigger` is the name of the animation trigger/anchor being used.

```html
<div [@fadeIn]="animationState" (@fadeIn.start)="animStart($event)" (@fadeIn.done)="animDone($event)"></div>
```

The callbacks receive an `AnimationEvent` that contains the following properties: `fromState` `phaseName`("start" or "done"), `toState` and `totalTime`

```ts
import { AnimationEvent } from '@angular/animations';

//...

animStart(event: AnimationEvent) {
  console.log('Animation Started', event);
}

animDone(event: AnimationEvent) {
  console.log('Animation Ended', event);
}
```

You can find more information about Animation callbacks in the [Angular docs](https://angular.io/guide/transition-and-triggers#animation-callbacks)

#### Loop animation

You can achieve looped animation by using `done` callback. Define a variable that triggers animation and toggle it when animation done callback is called:

```html
<div [@bounce]="animState" (@bounce.done)="animDone()"></div>
```

and in the component:

```ts
  animState = false;

  animDone() {
    this.animState = !this.animState
  }
```

[Example: simple infinite loop animation](https://stackblitz.com/edit/angular-animations-lib-simple-loop?file=src/app/demo-main/demo-main.component.html) <br />
[Example: repeat animation N times after clicking the button](https://stackblitz.com/edit/angular-animations-lib-simple-loop-repeat-n-times?file=src/app/demo-main/demo-main.component.html)<br />
[Example: repeat animation until certain event occurs](https://stackblitz.com/edit/angular-animations-lib-simple-loop-repeat-until-btn-click?file=src/app/demo-main/demo-main.component.html)

#### Chain animations

You can chain animations (e.g. wait for the first animation to finish before the second one starts) by using the `done` callback.
[Example: OnEnter/OnLeave chained animations](https://stackblitz.com/edit/angular-animations-lib-chained-on-enter?file=src/app/demo-main/demo-main.component.html)

## Available Animations and Parameters

All animations have `duration` and `delay` params.

|                    | Animation          | Default Anchor                               | OnEnter/OnLeave                                                                                                                                                                                                                              | Additional Params                                         |
| ------------------ | ------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Attention Seekers  |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | bounce             | `[@bounce]`                                  | `[@bounceOnEnter]`                                                                                                                                                                                                                           |                                                           |
|                    | flash              | `[@flash]`                                   | `[@flashOnEnter]`                                                                                                                                                                                                                            |                                                           |
|                    | pulse              | `[@pulse]`                                   | `[@pulseOnEnter]`                                                                                                                                                                                                                            | `scale` (default: 1.05)                                   |
|                    | rubberBand         | `[@rubberBand]`                              | `[@rubberBandOnEnter]`                                                                                                                                                                                                                       |                                                           |
|                    | shake              | `[@shake]`                                   | `[@shakeOnEnter]`                                                                                                                                                                                                                            | `translate` (default: '10px')                             |
|                    | swing              | `[@swing]`                                   | `[@swingOnEnter]`                                                                                                                                                                                                                            |                                                           |
|                    | tada               | `[@tada]`                                    | `[@tadaOnEnter]`                                                                                                                                                                                                                             |                                                           |
|                    | wobble             | `[@wobble]`                                  | `[@wobbleOnEnter]`                                                                                                                                                                                                                           |                                                           |
|                    | jello              | `[@jello]`                                   | `[@jelloOnEnter]`                                                                                                                                                                                                                            |                                                           |
|                    | heartBeat          | `[@heartBeat]`                               | `[@heartBeatOnEnter]`                                                                                                                                                                                                                        | `scale` (default: 1.3)                                    |
|                    | headShake          | `[@headShake]`                               | `[@headShakeOnEnter]`                                                                                                                                                                                                                        |                                                           |
| Bouncing entrances |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | bounceIn           | `[@bounceIn]`                                | `[@bounceInOnEnter]`                                                                                                                                                                                                                         |                                                           |
|                    | bounceInDown       | `[@bounceInDown]`                            | `[@bounceInDownOnEnter]`                                                                                                                                                                                                                     | `translate` (default: '3000px')                           |
|                    | bounceInLeft       | `[@bounceInLeft]`                            | `[@bounceInLeftOnEnter]`                                                                                                                                                                                                                     | `translate` (default: '3000px')                           |
|                    | bounceInRight      | `[@bounceInRight]`                           | `[@bounceInRightOnEnter]`                                                                                                                                                                                                                    | `translate` (default: '3000px')                           |
|                    | bounceInUp         | `[@bounceInUp]`                              | `[@bounceInUpOnEnter]`                                                                                                                                                                                                                       | `translate` (default: '3000px')                           |
| Bouncing exits     |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | bounceOut          | `[@bounceOut]`                               | `[@bounceOutOnLeave]`                                                                                                                                                                                                                        |                                                           |
|                    | bounceOutDown      | `[@bounceOutDown]`                           | `[@bounceOutDownOnLeave]`                                                                                                                                                                                                                    | `translate` (default: '2000px')                           |
|                    | bounceOutLeft      | `[@bounceOutLeft]`                           | `[@bounceOutLeftOnLeave]`                                                                                                                                                                                                                    | `translate` (default: '2000px')                           |
|                    | bounceOutRight     | `[@bounceOutRight]`                          | `[@bounceOutRightOnLeave]`                                                                                                                                                                                                                   | `translate` (default: '2000px')                           |
|                    | bounceOutUp        | `[@bounceOutUp]`                             | `[@bounceOutUpOnLeave]`                                                                                                                                                                                                                      | `translate` (default: '2000px')                           |
| Fading entrances   |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | fadeIn             | `[@fadeIn]`                                  | `[@fadeInOnEnter]`                                                                                                                                                                                                                           |                                                           |
|                    | fadeInDown         | `[@fadeInDown]`                              | `[@fadeInDownOnEnter]`                                                                                                                                                                                                                       | `translate` (default: '100%')                             |
|                    | fadeInDownBig      | `[@fadeInDownBig]`                           | `[@fadeInDownBigOnEnter]`                                                                                                                                                                                                                    | `translate` (default: '2000px')                           |
|                    | fadeInLeft         | `[@fadeInLeft]`                              | `[@fadeInLeftOnEnter]`                                                                                                                                                                                                                       | `translate` (default: '100%')                             |
|                    | fadeInLeftBig      | `[@fadeInLeftBig]`                           | `[@fadeInLeftBigOnEnter]`                                                                                                                                                                                                                    | `translate` (default: '2000px')                           |
|                    | fadeInRight        | `[@fadeInRight]`                             | `[@fadeInRightOnEnter]`                                                                                                                                                                                                                      | `translate` (default: '100%')                             |
|                    | fadeInRightBig     | `[@fadeInRightBig]`                          | `[@fadeInRightBigOnEnter]`                                                                                                                                                                                                                   | `translate` (default: '2000px')                           |
|                    | fadeInUp           | `[@fadeInUp]`                                | `[@fadeInUpOnEnter]`                                                                                                                                                                                                                         | `translate` (default: '100%')                             |
|                    | fadeInUpBig        | `[@fadeInUpBig]`                             | `[@fadeInUpBigOnEnter]`                                                                                                                                                                                                                      | `translate` (default: '2000px')                           |
| Fading exits       |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | fadeOut            | `[@fadeOut]`                                 | `[@fadeOutOnLeave]`                                                                                                                                                                                                                          |                                                           |
|                    | fadeOutDown        | `[@fadeOutDown]`                             | `[@fadeOutDownOnLeave]`                                                                                                                                                                                                                      | `translate` (default: '100%')                             |
|                    | fadeOutDownBig     | `[@fadeOutDownBig]`                          | `[@fadeOutDownBigOnLeave]`                                                                                                                                                                                                                   | `translate` (default: '2000px')                           |
|                    | fadeOutLeft        | `[@fadeOutLeft]`                             | `[@fadeOutLeftOnLeave]`                                                                                                                                                                                                                      | `translate` (default: '100%')                             |
|                    | fadeOutLeftBig     | `[@fadeOutLeftBig]`                          | `[@fadeOutLeftBigOnLeave]`                                                                                                                                                                                                                   | `translate` (default: '2000px')                           |
|                    | fadeOutRight       | `[@fadeOutRight]`                            | `[@fadeOutRightOnLeave]`                                                                                                                                                                                                                     | `translate` (default: '100%')                             |
|                    | fadeOutRightBig    | `[@fadeOutRightBig]`                         | `[@fadeOutRightBigOnLeave]`                                                                                                                                                                                                                  | `translate` (default: '2000px')                           |
|                    | fadeOutUp          | `[@fadeOutUp]`                               | `[@fadeOutUpOnLeave]`                                                                                                                                                                                                                        | `translate` (default: '100%')                             |
|                    | fadeOutUpBig       | `[@fadeOutUpBig]`                            | `[@fadeOutUpBigOnLeave]`                                                                                                                                                                                                                     | `translate` (default: '2000px')                           |
| Flippers           |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | flip               | `[@flip]`                                    | `[@flipOnEnter]`                                                                                                                                                                                                                             |                                                           |
|                    | flipInX            | `[@flipInX]`                                 | `[@flipInXOnEnter]`                                                                                                                                                                                                                          | `degrees` (default: 90)                                   |
|                    | flipInY            | `[@flipInY]`                                 | `[@flipInYOnEnter]`                                                                                                                                                                                                                          | `degrees` (default: 90)                                   |
|                    | flipOutX           | `[@flipOutX]`                                | `[@flipOutXOnLeave]`                                                                                                                                                                                                                         | `degrees` (default: 90)                                   |
|                    | flipOutY           | `[@flipOutY]`                                | `[@flipOutYOnLeave]`                                                                                                                                                                                                                         | `degrees` (default: 90)                                   |
| Light speed        |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | lightSpeedIn       | `[@lightSpeedIn]`                            | `[@lightSpeedInOnEnter]`                                                                                                                                                                                                                     | `translate` (default: '100%')                             |
|                    | lightSpeedOut      | `[@lightSpeedOut]`                           | `[@lightSpeedOutOnLeave]`                                                                                                                                                                                                                    | `translate` (default: '100%')                             |
| Rotating entrances |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | rotateIn           | `[@rotateIn]`                                | `[@rotateInOnEnter]`                                                                                                                                                                                                                         | `degrees` (default: -200)                                 |
|                    | rotateInDownLeft   | `[@rotateInDownLeft]`                        | `[@rotateInDownLeftOnEnter]`                                                                                                                                                                                                                 | `degrees` (default: -45)                                  |
|                    | rotateInDownRight  | `[@rotateInDownRight]`                       | `[@rotateInDownRightOnEnter]`                                                                                                                                                                                                                | `degrees` (default: 45)                                   |
|                    | rotateInUpLeft     | `[@rotateInUpLeft]`                          | `[@rotateInUpLeftOnEnter]`                                                                                                                                                                                                                   | `degrees` (default: 45)                                   |
|                    | rotateInUpRight    | `[@rotateInUpRight]`                         | `[@rotateInUpRightOnEnter]`                                                                                                                                                                                                                  | `degrees` (default: -90)                                  |
| Rotating exits     |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | rotateOut          | `[@rotateOut]`                               | `[@rotateOutOnLeave]`                                                                                                                                                                                                                        | `degrees` (default: 200)                                  |
|                    | rotateOutDownLeft  | `[@rotateOutDownLeft]`                       | `[@rotateOutDownLeftOnLeave]`                                                                                                                                                                                                                | `degrees` (default: 45)                                   |
|                    | rotateOutDownRight | `[@rotateOutDownRight]`                      | `[@rotateOutDownRightOnLeave]`                                                                                                                                                                                                               | `degrees` (default: -45)                                  |
|                    | rotateOutUpLeft    | `[@rotateOutUpLeft]`                         | `[@rotateOutUpLeftOnLeave]`                                                                                                                                                                                                                  | `degrees` (default: -45)                                  |
|                    | rotateOutUpRight   | `[@rotateOutUpRight]`                        | `[@rotateOutUpRightOnLeave]`                                                                                                                                                                                                                 | `degrees` (default: -90)                                  |
| Sliding entrances  |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | slideInUp          | `[@slideInUp]`                               | `[@slideInUpOnEnter]`                                                                                                                                                                                                                        | `translate` (default: '100%')                             |
|                    | slideInDown        | `[@slideInDown]`                             | `[@slideInDownOnEnter]`                                                                                                                                                                                                                      | `translate` (default: '100%')                             |
|                    | slideInLeft        | `[@slideInLeft]`                             | `[@slideInLeftOnEnter]`                                                                                                                                                                                                                      | `translate` (default: '100%')                             |
|                    | slideInRight       | `[@slideInRight]`                            | `[@slideInRightOnEnter]`                                                                                                                                                                                                                     | `translate` (default: '100%')                             |
| Sliding exits      |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | slideOutUp         | `[@slideOutUp]`                              | `[@slideOutUpOnLeave]`                                                                                                                                                                                                                       | `translate` (default: '100%')                             |
|                    | slideOutDown       | `[@slideOutDown]`                            | `[@slideOutDownOnLeave]`                                                                                                                                                                                                                     | `translate` (default: '100%')                             |
|                    | slideOutLeft       | `[@slideOutLeft]`                            | `[@slideOutLeftOnLeave]`                                                                                                                                                                                                                     | `translate` (default: '100%')                             |
|                    | slideOutRight      | `[@slideOutRight]`                           | `[@slideOutRightOnLeave]`                                                                                                                                                                                                                    | `translate` (default: '100%')                             |
| Zooming entrances  |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | zoomIn             | `[@zoomIn]`                                  | `[@zoomInOnEnter]`                                                                                                                                                                                                                           |                                                           |
|                    | zoomInDown         | `[@zoomInDown]`                              | `[@zoomInDownOnEnter]`                                                                                                                                                                                                                       |                                                           |
|                    | zoomInLeft         | `[@zoomInLeft]`                              | `[@zoomInLeftOnEnter]`                                                                                                                                                                                                                       |                                                           |
|                    | zoomInRight        | `[@zoomInRight]`                             | `[@zoomInRightOnEnter]`                                                                                                                                                                                                                      |                                                           |
|                    | zoomInUp           | `[@zoomInUp]`                                | `[@zoomInUpOnEnter]`                                                                                                                                                                                                                         |                                                           |
| Zooming exits      |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | zoomOut            | `[@zoomOut]`                                 | `[@zoomOutOnLeave]`                                                                                                                                                                                                                          |                                                           |
|                    | zoomOutDown        | `[@zoomOutDown]`                             | `[@zoomOutDownOnLeave]`                                                                                                                                                                                                                      |                                                           |
|                    | zoomOutLeft        | `[@zoomOutLeft]`                             | `[@zoomOutLeftOnLeave]`                                                                                                                                                                                                                      |                                                           |
|                    | zoomOutRight       | `[@zoomOutRight]`                            | `[@zoomOutRightOnLeave]`                                                                                                                                                                                                                     |                                                           |
|                    | zoomOutUp          | `[@zoomOutUp]`                               | `[@zoomOutUpOnLeave]`                                                                                                                                                                                                                        |                                                           |
| Specials           |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | hinge              | `[@hinge]`                                   | `[@hingeOnLeave]`                                                                                                                                                                                                                            |                                                           |
|                    | jackInTheBox       | `[@jackInTheBox]`                            | `[@jackInTheBoxOnEnter]`                                                                                                                                                                                                                     |                                                           |
|                    | rollIn             | `[@rollIn]`                                  | `[@rollInOnEnter]`                                                                                                                                                                                                                           | `degrees` (default: -120), `translate` (default: '-100%') |
|                    | rollOut            | `[@rollOut]`                                 | `[@rollOutOnLeave]`                                                                                                                                                                                                                          | `degrees` (default: 120), `translate` (default: '100%')   |
| Other              |                    |                                              |                                                                                                                                                                                                                                              |                                                           |
|                    | collapse           | `[@collapse]` <br> `[@collapseHorizontally]` | `[@expandOnEnter]` <br> `[@collapseOnLeave]` <br> `[@fadeInExpandOnEnter]`<br> `[@fadeOutCollapseOnLeave]` <br> `[@expandRightOnEnter]` <br> `[@collapseLeftOnLeave]` <br> `[@fadeInExpandRightOnEnter]`<br> `[@fadeOutCollapseLeftOnLeave]` |                                                           |
|                    | rotate             | `[@rotate]`                                  | `-`                                                                                                                                                                                                                                          | `degrees` (default: 90)                                   |
|                    | hueRotate          | `[@hueRotate]`                               | `-`                                                                                                                                                                                                                                          |                                                           |

## Running Demo App

```
npm install
npm start
```

## Authors

- **Chris Filipowski** - [filipows](https://github.com/filipows)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
