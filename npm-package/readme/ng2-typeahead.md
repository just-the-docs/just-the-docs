

# [deprecated] ng2-typeahead [![npm version](https://badge.fury.io/js/ng2-typeahead.svg)](http://badge.fury.io/js/ng2-typeahead)
A simple Angular2 typeahead/autocomplete component.

**This package is no longer being developed.**

[See ng2-typeahead on GitHub](https://github.com/brinkmanjg/ng2-typeahead)

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Join the chat at https://gitter.im/brinkmanjg/ng2-bootstrap](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/brinkmanjg/ng2-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/brinkmanjg/ng2-typeahead.svg)](https://david-dm.org/brinkmanjg/ng2-typeahead)
[![devDependency Status](https://david-dm.org/brinkmanjg/ng2-typeahead/dev-status.svg)](https://david-dm.org/brinkmanjg/ng2-typeahead#info=devDependencies)
[![Throughput Graph](https://graphs.waffle.io/brinkmanjg/ng2-typeahead/throughput.svg)](https://waffle.io/brinkmanjg/ng2-typeahead/metrics)

## Installation

1. A recommended way to install ***ng2-typeahead*** is through the [npm](https://www.npmjs.com/search?q=ng2-typeahead) package manager using the following command:

  `npm i ng2-typeahead --save`

  Alternatively, you can [download it in a ZIP file](https://github.com/brinkmanjg/ng2-typeahead/archive/master.zip).

2. Currently `ng2-typeahead` contains one directive: `typeahead`.


### Example

###### my.component.ts
```javascript
import { Typeahead } from 'ng2-typeahead';

@NgModule({
   declarations: [ Typeahead ],
})

@Component({
    selector: 'my-component',
    template: require('./my.component.html'),
    styles: [`
        .typeahead-input,
        .typeahead-typeahead{
            width: 250px;
            padding: 8px;
            border-radius: 5px;
        }
    `]
})
export class MyComponent {

  fruitName: string;
  fruits: any[] = [
    {
      id: 1,
      name: "Apple",
      searchText: "apple"
    },
    {
      id: 2,
      name: "Orange",
      searchText: "orange"
    },
    {
      id: 3,
      name: "Banana",
      searchText: "banana"
    }
  ];

  selectedFruit: any = this.fruits[0];

  public fruitSelected(fruit) {
    this.fruitName = fruit ? fruit.name : 'none';
  }

}
```

###### my.component.html
```html
<typeahead
  [(ngModel)]="selectedFruit"
  [list]="fruits"
  [searchProperty]="'searchText'" [displayProperty]="'name'"
  [maxSuggestions]="2"
  (suggestionSelected)="fruitSelected($event)"
  placeholder="Begin typing a fruit">
</typeahead>

<p>You selected {{ fruitName }}</p>
```

The following adjustments may be required in systemjs.config.js to run the example code.
[Issue #7](https://github.com/brinkmanjg/ng2-typeahead/issues/7)

```
var map = {
    ...
    'ng2-typeahead':              'node_modules/ng2-typeahead',                             
  };
  ...
  var packages = {
    ...
    'ng2-typeahead':              { main: 'ng2-typeahead.js', defaultExtension: 'js' }
  };
```

###### Demo
![](https://cloud.githubusercontent.com/assets/6796665/16323353/2755a59e-3978-11e6-874c-905a0459d7a5.gif)


## API for `typeahead`

This is the only directive. Provide a list of suggestions as an object array, specify the display and search properties, and handle the selection event however you like.


### Properties

Binding Property | Type | Remarks
------------ | ---------- | -------------
`[(ngModel)]` | `any` | The model property to which the component is bound. Optional.
`[list]` | `any[]` | The complete list of items. These can be any type of object. This is required.
`[displayProperty]` | `string` | The property of a list item that should be displayed. The default is 'name'.
`[searchProperty]` | `string` | The property of a list item that should be used for matching. The default is 'name'.
`[maxSuggestions]` | `number` | The maximum number of suggestions to display. The default is -1 (no limit).

Note: `displayProperty` and `searchProperty` can be the same property or different properties based on your needs.  


### Events

Event Binding | Remarks
------------ | -------------
`(suggestionSelected)` | Called when a suggestion has been selected. The only parameter is the selected item.


### Styles

Selector | Remarks
------------ | -------------
`.typeahead` | The outer `div` which holds all component elements.
`.typeahead-input` | The `input` element into which the user enters text.
`.typeahead-input-has-selection` | The `input` element into which the user enters text when a suggestion is selected. This alerts the user that a selection has been made.
`.typeahead-typeahead` | The type-ahead `input` element which displays the suggested text.
`.typeahead-suggestions` | The `div` which holds the suggestions elements.
`.typeahead-suggestions ul` | The unordered list of suggestions.
`.typeahead-suggestions ul li` | The individual suggestion elements.
`.typeahead-suggestion-active` | The active (highlighted) suggestion in the suggestions list.



# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/brinkmanjg/ng2-typeahead/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding, and apologies for any issues experienced thus far.



### License

The MIT License (see the [LICENSE](https://github.com/brinkmanjg/ng2-typeahead/blob/master/LICENSE) file for the full text)
