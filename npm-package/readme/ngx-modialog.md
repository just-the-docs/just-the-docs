# ngx-modialog (previously `angular2-modal`)


---

**This project is looking for a new maintainer, see [#414](https://github.com/shlomiassaf/ngx-modialog/issues/414) for details.**

---

### ngx-modialog version 5.x.x works with angular 5.x.x

# IMPORTANT - V4 BREAKING CHANGE:
Version 4.x.x contains some breaking changes, please see the [CHANGELOG](./CHANGELOG.md)

## Library has been renamed from version 3.0.2


Modal / Dialog implementation for angular.

  - Easy to use API via Fluent API Presets (alert, prompt, confirm)
  - Can render Component's, TemplateRef's and literal string
  - Extendable via plugins.
  - Easy to use
```typescript
modal.alert()
    .title('Hello World')
    .body('In Angular')
    .open();
```


Available plugins: 

  - Bootstrap (3 & 4)
  - [Vex 3 & 4](http://github.hubspot.com/vex/docs/welcome/)

## Install
```bash
npm install ngx-modialog
```

## Basic plunker playground (bootstrap plugin):

##### ngx-modialog @ 4.x.x
http://plnkr.co/edit/lV7zsw7Yqossgs9JOfQU?p=preview

##### ngx-modialog @ 3.x.x
http://plnkr.co/edit/2ppVYl517GI1Byv8vVbG?p=preview

## Quick start

**In your application root module definition add `ModalModule` and the plugin you want to use:**

We will use the bootstrap plugin (`BootstrapModalModule`) for this introduction.

```typescript
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

// lots of code...

@NgModule({
  bootstrap: [ /* ... */ ],
  declarations: [ /* ... */ ],
  imports: [
    /* ... */
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
})
export class AppModule { /* lots of code... */ }
```

**In any angular component or service inject the `Modal` service and open a modal**:


```typescript
import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'my-app',
  template: `<button (click)="onClick()">Alert</button>`
})
export class AppComponent {
  constructor(public modal: Modal) { }

  onClick() {
    const dialogRef = this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('A simple Alert style modal window')
        .body(`
            <h4>Alert is a classic (title/body/footer) 1 button modal window that 
            does not block.</h4>
            <b>Configuration:</b>
            <ul>
                <li>Non blocking (click anywhere outside to dismiss)</li>
                <li>Size large</li>
                <li>Dismissed with default keyboard key (ESC)</li>
                <li>Close wth button click</li>
                <li>HTML content</li>
            </ul>`)
        .open();

    dialogRef.result
        .then( result => alert(`The result is: ${result}`) );
  }
}
```

If you are using **ngx-modialog** version 3.X.X or below, `open()` returned a promise so replace the last 2 lines with:
```typescript
   dialogRef
       .then( dialogRef => {
           dialogRef.result.then( result => alert(`The result is: ${result}`);
       });
```

We are using the `alert()` method, one of 3 (prompt, confirm)) fluent-api methods we call `drop-ins`

We then use the `result` property to wait for the modal closing event.

**Notes:**
  - Fluent API methods (drop-ins) are pre-configured (presets) methods that allow easy configuration and execution, you can create custom presets - see the demo application.
  - For more control use the `open()` method, which is used by all drop in's internally.
  - We import the `Modal` service from the plugin and not from the root library.
  Import from the root should work but being explicit allow using multiple plugins.

## Demo App
The Demo application is a full implementation of the library with the native plugins.

View it at [shlomiassaf.github.io/ngx-modialog](http://shlomiassaf.github.io/ngx-modialog/)

The demo application is [part of this repository](https://github.com/shlomiassaf/ngx-modialog/tree/master/src/demo/app) and it is a great place to learn by example.

#### Bootstrap / VEX features:
  - Customizable with components, Presets and more...  
  - Select cancel/quit key.
  - Cascading modals.  
  - Element blocking.  
  - Blocking / Non blocking modal.  
  - Modal as a component, replace the content by supplying a custom component.   

The demo application comes with a [dynamic modal generator](http://shlomiassaf.github.io/ngx-modialog#/bootstrap-demo/customizeModals) for the **Boostrap** plugin

## Plugins
Plugins serve as a concrete UI implementation for a modal.

It can be an implementation for a known library (e.g: bootstrap) or something completely unique

While `ngx-modialog` has some built in plugins it is also possible to use external plugins from NPM, if someone decide to build one.

> Built a plugin? I would love to know :)

# Known bugs
### The dialog closes when removing the target DOM element in a click event
ref [issue#111](https://github.com/shlomiassaf/ngx-modialog/issues/111)

To avoid this problem use `event.stopPropagation();` or put the element removal inside a `setTimeout` call

---

# HELP WANTED!

As a sole author I find it difficult to maintain multiple open source projects.
As a result it is hard for me to replay rapidly to requests/help/etc...

If you would like to contribute, please contact me, the community will thank you.

You can contribute via:

  - Implementing features & Bug fixes
  - Documentation (Extremely important)
  - Issue management

Thank you!

Shlomi.

---
