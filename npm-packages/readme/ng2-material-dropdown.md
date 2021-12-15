# Angular2 Dropdown Component

Material-like dropdown component for Angular2.

NB: This repository is currently unmaintained. Please fork or use Angular Material's module, it's better.

## Install

    npm install ng2-material-dropdown --save

## Usage

Once installed, import the directives and use it them your container component:

```html
<ng2-dropdown>
    <ng2-dropdown-button>
        Open Menu
    </ng2-dropdown-button>
    <ng2-dropdown-menu>
        <ng2-menu-item *ngFor="let page of pages">
            {{ page }}
        </ng2-menu-item>

        <div class='ng2-menu-divider'></div>

        <ng2-menu-item>
            With Divider
        </ng2-menu-item>
    </ng2-dropdown-menu>
</ng2-dropdown>
```

```javascript
// import module
import { Ng2DropdownModule } from 'ng2-material-dropdown';

@NgModule({
    imports: [ Ng2DropdownModule ]
    // ..
})
export class MyModule {}
```

## API

`ng2-dropdown`
- **`dynamicUpdate`** - **`[?boolean]`** : option to disable the dynamic update of the position on scroll events (defaults to `true`)
- **`onItemSelected()`** - **`[(onItemSelected($event)]`** : event that emits the currently selected/hovered item
- **`onItemClicked()`** - **`[(onItemClicked($event)]`** : event that emits the item clicked on
- **`onShow()`** - **`[(onItemClicked($event)]`** : event that emits when the dropdown gets shown
- **`onHide()`** - **`[(onItemClicked($event)]`** : event that emits when the dropdown gets hidden

`ng2-dropdown-menu`
- **`focusFirstElement`** - **`[?boolean]`** : by default the first element is immediately focused. You can disable by setting this option to false
- **`width`** - **`[?number]`**: this determines the width of the menu. Possible values are 2, 4 and 6. By default, this is set to 4
- **`offset`** - **`[?string]`**: offset to adjust the position of the dropdown with absolute values
- **`appendToBody`** - **`[?boolean]`** : by default the dropdown is appended to the body, but you can disable this by setting it to `false`


`ng2-dropdown-button`
- **`showCaret`** - **`[?boolean]`** : if present, a caret will be appended to the button's text

`ng2-menu-item`
- **`preventClose`** - `[?boolean]` : if present, this attribute prevents the menu to hide when the menu item is clicked
- **`value` - `[?any]`** : any value that you may want to attach to a menu item. Useful for using this component with other components.
