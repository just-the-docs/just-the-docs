[![Published on NPM](https://img.shields.io/npm/v/@polymer/paper-dialog-behavior.svg)](https://www.npmjs.com/package/@polymer/paper-dialog-behavior)
[![Build status](https://travis-ci.org/PolymerElements/paper-dialog-behavior.svg?branch=master)](https://travis-ci.org/PolymerElements/paper-dialog-behavior)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/paper-dialog-behavior)

## PaperDialogBehavior

Use `PaperDialogBehavior` and `paper-dialog-shared-styles.js` to implement a Material Design
dialog.

For example, if `<paper-dialog-impl>` implements this behavior:

```html
<paper-dialog-impl>
  <h2>Header</h2>
  <div>Dialog body</div>
  <div class="paper-dialog-buttons">
    <paper-button dialog-dismiss>Cancel</paper-button>
    <paper-button dialog-confirm>Accept</paper-button>
  </div>
</paper-dialog-impl>
```

`paper-dialog-shared-styles.js` provide styles for a header, content area, and an action area for buttons.
Use the `<h2>` tag for the header and the `paper-dialog-buttons` or `buttons` class for the action area. You can use the
`paper-dialog-scrollable` element (in its own repository) if you need a scrolling content area.

Use the `dialog-dismiss` and `dialog-confirm` attributes on interactive controls to close the
dialog. If the user dismisses the dialog with `dialog-confirm`, the `closingReason` will update
to include `confirmed: true`.

### Accessibility

This element has `role="dialog"` by default. Depending on the context, it may be more appropriate
to override this attribute with `role="alertdialog"`.

If `modal` is set, the element will prevent the focus from exiting the element.
It will also ensure that focus remains in the dialog.

See: [Documentation](https://www.webcomponents.org/element/@polymer/paper-dialog-behavior),
  [Demo](https://www.webcomponents.org/element/@polymer/paper-dialog-behavior/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/paper-dialog-behavior
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {PaperDialogBehavior} from '@polymer/paper-dialog-behavior/paper-dialog-behavior.js';

class SampleElement extends mixinBehaviors(PaperDialogBehavior, PolymerElement) {
  static get template() {
    return html`
      <style include="paper-dialog-shared-styles"></style>
      <slot></slot>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/paper-dialog-behavior
cd paper-dialog-behavior
npm install
npm install -g polymer-cli
```

### Running the demo locally
```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
