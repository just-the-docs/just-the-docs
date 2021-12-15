angular-virtual-keyboard
========================
[![npm version](https://badge.fury.io/js/angular-virtual-keyboard.svg)](http://badge.fury.io/js/angular-virtual-keyboard)
[![Bower version](https://badge.fury.io/bo/angular-virtual-keyboard.svg)](http://badge.fury.io/bo/angular-virtual-keyboard)

An AngularJs Virtual Keyboard Interface based on [GreyWyvern VKI](http://www.greywyvern.com/code/javascript/keyboard). See example in the [Demo page](http://the-darc.github.io/angular-virtual-keyboard).

![Demo image](http://the-darc.github.io/angular-virtual-keyboard/images/demo.png)

## Install

### With bower

```sh
$ bower install angular-virtual-keyboard
```

### With npm

```sh
$ npm install angular-virtual-keyboard
```

## Dependencies

- Optional: [angular-useragent-parser](https://github.com/the-darc/angular-useragent-parser)
_Obs.: Required to auto-hide the keyboard interface in mobile devices or to use the 'vk-force-mobile' configuration._

## Usage

1. Import the ```angular-virtual-keyboard.min.js``` script in your page.

2. Include the module ```angular-virtual-keyboard``` in your angular app.

3. Include the module ```angular-useragent-parser``` in your angular app. _Optional, used to auto hide the virtual keyboard interface in mobile devices._

4. Use the 'ng-virtual-keyboard' directive in any text fields, password fields or textareas:

```html
<input type='text' ng-model="yourModel" ng-virtual-keyboard/>
```

## Supported Configurations

### Directive global configurations

The angular-virtual-keyboard module use an [Angular.js Constant](https://docs.angularjs.org/api/auto/service/$provide#constant) named ``VKI_CONFIG`` to handle the configurations that will be applied to all instances of the ``ng-virtual-keyboard`` directive. See list below:

 - __Keyboard layouts configurations__ ``VKI_CONFIG.layout`` Array of Keyboard Layout configurations. See [vki-layouts.js](https://github.com/the-darc/angular-virtual-keyboard/blob/master/src/vki-layouts.js) for keyboard layout configuration examples.
 - __Deadkeys configurations__ ``VKI_CONFIG.deadkey`` Array of Deadkeys configurations. See [vki-deadkeys.js](https://github.com/the-darc/angular-virtual-keyboard/blob/master/src/vki-deadkeys.js) for deadkeys configuration examples.
 - __Default keyboard layout__ ``VKI_CONFIG.kt`` Name of the layout configuration to be used as default (if no specific layout configuration is provided in the directive instance configuration). _Default: 'US International'_
 - __Relative position__ ``VKI_CONFIG.relative`` Use ``true`` to position the keyboard next to the input, ``false`` to place in the bottom of page. _Default: ``true``_
 - __Adjust keyboard size__ ``VKI_CONFIG.sizeAdj`` Allow user to adjust keyboard size. _Default: ``true``_
 - __i18n configuration__ ``VKI_CONFIG.i18n`` An array to replace the default labels of the keyboard interface. See example below:
 - __Custom CSS Class__ ``VKI_CONFIG.customClass`` A CSS class name to add in the first html element of the keyboard
```javascript
VKI_CONFIG.i18n = {
	'00': "Exibir teclado numérico",
	'01': "Exibir teclado virtual",
	'02': "Selecionar layout do teclado",
	'03': "Teclas mortas",
	'04': "Ligado",
	'05': "Desligado",
	'06': "Fechar teclado",
	'07': "Limpar",
	'08': "Limpar campo",
	'09': "Versão",
	'10': "Diminuir tamanho do teclado",
	'11': "Aumentar tamanho do teclado"
};
```

### Directive instance configurations

The ``ng-virtual-keyboard`` could receive an array with the configurations that will be applied to the keyboard interface instance of the input field. See list below:

 - __Default keyboard layout__ ``kt`` Change the default keyboard which displays first for each directive instance. _Default: Defined in global configuration_
 - __Dead keys__ ``deadkeysOn`` To turn dead keys on or off by default. _Default: true_
 - __Number pad__ ``numberPad`` To enable de number pad button. _Default: false_
 - __VKI Version__ ``showVersion`` To show the VKI-core based version. _Default: false_
 - __Imageless mode__ ``imageURI`` By default the keyboard will be show on input field focus. Pass a image URI to add a clickable image next to inputs and replace the on focus default behavior. _Default: false_
 - __Show in mobile__ ``showInMobile`` True to display the interface on mobiles devices. _Default: false_
 - __Foce position__ ``forcePosition`` Force to position the virtual keyborad above (_use ``"top"``_) or below (_use ``"bottom"``_) the input field. Use ``false`` to let the directive choose the better position. _Default: false_
 - __Enter callback__ ``enterSubmit`` Define a callback function for the enter key. Use ~~true to submit forms when Enter is pressed or~~ a function to execute a custom function. _Default: false_ (See _[enterSubmit issues #5](https://github.com/the-darc/angular-virtual-keyboard/issues/5)_)
 - __Relative position__ ``relative`` Use ``true`` to position the keyboard next to the input, and ``false`` to place in the bottom of page. _Default: ``true``_
 - __Keyboard size control__ ``size`` Five sizes based on font-size have been pre-programmed: 13px, 16px (default), 20px, 24px and 28px; corresponding to the sizes 1 to 5 respectively. _Default: 3_
 - __Adjust keyboard size__ ``sizeAdj`` Allow user to adjust keyboard size. _Default: ``true``_
 - __Custom CSS Class__ ``customClass`` A CSS class name to add in the first html element of the keyboard

### Example of use

_See example in the [Demo page](http://the-darc.github.io/angular-virtual-keyboard) or the [demo code](https://github.com/the-darc/angular-virtual-keyboard/blob/master/demo/index.html)_

## License

The MIT License (MIT)

Copyright (c) 2015 Daniel Campos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
