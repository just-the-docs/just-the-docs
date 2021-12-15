# Angular Svg Icons

Easily use icons in your Angular app with this component. It uses the `<use>` element to duplicate SVG's without manipulating the DOM (the browser does all the work).

## Breaking Changes from v1.x.x => v2.x.x

I never liked how the attribute for selecting the icon was `i`:

```ts
// v1.x.x
<icon i="home"></icon>
```

The attribute has been changed to `name`:

```ts
// v2.x.x
<icon name="home"></icon>
```

## Install

```shell
$ npm install angular2-svg-icons --save
```

## Implement

**Note:** Building an Angular library has been a pain to get the implementation just right. There's WAY to many tools to get this thing working... (`typescript`, `angular-compiler`, `rollup`, etc etc).

Currently, the only way I've gotten this to work is by importing the `@Component`, rather then `@NgModule`:

```ts
import { IconComponent } from 'angular2-svg-icons';

@NgModule({
  declaration: [IconComponent],
  exports: [IconComponent]
})
export class SomeModule {}
```

I'm doing more research on why `@NgModule` isn't working. No breaking changes should occur once I get this working.

## Use

    <icon name="search"></icon>

The above code generates the following:

```html
<svg class="icon"
     x="0" y="0"
     xmlns="http://www.w3.org/2000/svg"
     width="24px"
     height="24px"
     preserveAspectRatio="xMidYMin">
    <use xlink:href="baseUrl/#search" />
</svg>
```

The attribute `name` should match the SVG symbol `id` when you set that up.

## Symbol Requirement

You must add all your symbols to your page prior to using this component. For example, you can create a `svg-symbols.ts` file that has all your symbols with the appropriate `id` as the name:

```js
export const svgSymbols = `
<svg style="display: none">
    <symbol id="search" d="path-stuff"></symbol>
</svg>`;
```

Then add this to your application. For example, you can add it to your root component:

```js
import { Component } from '@angular/core';
import { svgSymbols } from './components/icons/svg-symbols';

@Component({
  selector: 'app',
  template: `
${svgSymbols}
<rest-of-your-app></rest-of-your-app>`,
})
export class RootComponent { }
```

**NOTE:** It's recommended to hide the `<svg>` or else the entire sheet will be displayed when added to your app.

#### Recommended: Icosystem CLI

Create SVG symbols easily with the [icosystem-cli](https://github.com/geoctrl/icosystem-cli). The CLI takes in an icon json file and then produces a module file that houses all your icons: `svg-symbols.ts`.

The repo houses all the svg icons, so all you have to do is specify the list of icons you want in your json file: `["search","home","person"]`.

This is pretty specific to my needs (and currently only houses material design icons), but I'll be adding more open-source icon libraries soon. Feedback welcome.

### Styling

I purposefully left out styles -- the generated icons have an `icon` class so you can style them however you want. Just be aware of the limitations of the `<use>` element ([A guide to SVG <use> elements](http://taye.me/blog/svg/a-guide-to-svg-use-elements/))

```scss
// example of changing color and size
// remember to style the <icon> element as well
icon {
    width: 24px;
    height: 24px;
    display: inline-block;

    svg {
        fill: #404040;
        width: 24px;
        height: 24px;
    }
}
```
