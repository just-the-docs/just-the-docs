# Angular Autocomplete
* See [Demo](https://gmerabishvili.github.io/angular-ng-autocomplete/) or try in [Stackblitz](https://stackblitz.com/edit/angular-ng-autocomplete)
* Example with images [Stackblitz](https://stackblitz.com/edit/angular-ng-autocomplete-with-images)
* Example with Angular forms API [Stackblitz](https://stackblitz.com/edit/angular-ng-autocomplete-with-forms)


Table of contents
=================

  * [Features](#features)
  * [Getting started](#getting-started)
  * [Usage](#usage-sample)
  * [API](#api)
  * [Styles](#styles)

## Features
- [x] Flexible autocomplete with client/server filtering.
- [x] Variable properties and event bindings.
- [x] Selection history.
- [x] Custom item and 'not found' templates.
- [x] Infinite scroll.
- [x] Compatible with Angular forms API (Both Reactive and Template-driven forms).
- [x] Keyboard navigation.
- [x] Accessibility.

## Getting started
### Step 1: Install `angular-ng-autocomplete`:

#### NPM
```shell
npm i angular-ng-autocomplete
```
### Step 2: Import the AutocompleteLibModule:
```js
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [AppComponent],
  imports: [AutocompleteLibModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
### Usage sample

```html
<div class="ng-autocomplete">
<ng-autocomplete 
  [data]="data"
  [searchKeyword]="keyword"
  (selected)='selectEvent($event)'
  (inputChanged)='onChangeSearch($event)'
  (inputFocused)='onFocused($event)'
  [itemTemplate]="itemTemplate"
  [notFoundTemplate]="notFoundTemplate">                                 
</ng-autocomplete>

<ng-template #itemTemplate let-item>
<a [innerHTML]="item.name"></a>
</ng-template>

<ng-template #notFoundTemplate let-notFound>
<div [innerHTML]="notFound"></div>
</ng-template>
</div>

```
```javascript

class TestComponent {
  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];


  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }
}
```

## API
### Inputs
| Input  | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [data] | `Array<any>`  | `null` | yes | Items array. It can be array of strings or array of objects. |
| searchKeyword | `string` |  `-` | yes | Variable name to filter data with. |
| customFilter | `(items: any[], query: string) => any[]` | `undefined` | no | Custom filter function. You can use it to provide your own filtering function, as e.g. fuzzy-matching filtering, or to disable filtering at all (just pass `(items) => items` as a filter). Do not change the `items` argument given, return filtered list instead. |
| placeholder  | `string` | `-` | no |  HTML `<input>` placeholder text.  |
| heading | `string` | `-` | no | Heading text of items list. If it is null then heading is hidden. |
| initialValue | `any` | `_` | no | initial/default selected value. |
| focusFirst | `boolean` | `false` | no | Automatically focus the first matched item on the list. |
| historyIdentifier  | `string` | `_` | no | History identifier of history list. When valid history identifier is given, then component stores selected item to local storage of user's browser. If it is null then history is hidden. History list is visible if at least one history item is stored. History identifier must be unique.  |
| historyHeading | `string` | `Recently selected` | no | Heading text of history list. If it is null then history heading is hidden. |
| historyListMaxNumber | `number` | `15` | no | Maximum number of items in the history list. |
| notFoundText | `string` | `Not found` | no | Set custom text when filter returns empty result. |
| isLoading | `boolean` | `false` | no | Set the loading state when data is being loaded. |
| minQueryLength | `number` | `1` | no | The minimum number of characters the user must type before a search is performed. |
| debounceTime | `number` | `_` | no | Delay time while typing. |
| disabled | `boolean` | `false` | no | input disable/enable. |
| name | `string` | `_` | yes (If NgModel is used within a form tag) |  Tracks the name bound to the NgModel directive. For more details click [here](https://angular.io/api/forms/NgModel) |
| [(ngModel)] | `any` | `_` | no |  Tracks the value bound to this directive. Used with Template-driven forms. For more details click [here](https://angular.io/api/forms/NgModel) |
| [formControl] / formControlName | `string` | `_` | no |  Tracks the FormControl instance bound to the directive. Used with Reactive forms. For more details click [here](https://angular.io/api/forms/FormControlDirective) and [here](https://angular.io/api/forms/FormControlName) |




### Outputs
| Output  | Description |
| ------------- | ------------- |
| (selected) | Event is emitted when an item from the list is selected. |
| (inputChanged) | Event is emitted when an input is changed. |
| (inputFocused) | Event is emitted when an input is focused. |
| (inputCleared) | Event is emitted when an input is cleared. |
| (opened)  | Event is emitted when the autocomplete panel is opened. |
| (closed)  | Event is emitted when the autocomplete panel is closed. |
| (scrolledToEnd)  | Event is emitted when scrolled to the end of items. Can be used for loading more items in chunks. |


### Methods (controls)
 Name  | Description |
| ------------- | ------------- |
| open  | Opens the autocomplete panel |
| close | Closes the autocomplete panel |
| focus | Focuses the autocomplete input element |
| clear | Clears the autocomplete input element |

To access the control methods of the component you should use  `@ViewChild` decorator.
See the example below:

```html
<ng-autocomplete #auto></ng-autocomplete>
```

```javascript
class TestComponent {
  @ViewChild('auto') auto;

  openPanel(e): void {
    e.stopPropagation();
    this.auto.open();
  }
  
  closePanel(e): void {
    e.stopPropagation();
    this.auto.close();
    }
    
  focus(e): void {
    e.stopPropagation();
    this.auto.focus();
  }  
}
``` 

## Styles
If you are not happy with default styles you can easily override them:

```html
<div class="ng-autocomplete">
<ng-autocomplete></ng-autocomplete>
</div>
```

```css
.ng-autocomplete {
    width: 400px;
}
```

## Support Angular autocomplete!
If you do love angular-ng-autocomplete I would appreciate a donation :)

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://paypal.me/gmerabishvili?locale.x=en_US)


### Author
* [Giorgi Merabishvili](https://www.linkedin.com/in/giorgi-merabishvili-3719a2121/)


## License

MIT


