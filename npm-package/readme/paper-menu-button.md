[![Published on NPM](https://img.shields.io/npm/v/@polymer/paper-menu-button.svg)](https://www.npmjs.com/package/@polymer/paper-menu-button)
[![Build status](https://travis-ci.org/PolymerElements/paper-menu-button.svg?branch=master)](https://travis-ci.org/PolymerElements/paper-menu-button)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/paper-menu-button)

## &lt;paper-menu-button&gt;

`paper-menu-button` allows one to compose a designated "trigger" element with
another element that represents "content", to create a dropdown menu that
displays the "content" when the "trigger" is clicked.

The child element assigned to the `dropdown-trigger` slot will be used as the
"trigger" element. The child element assigned to the `dropdown-content` slot will be
used as the "content" element.

The `paper-menu-button` is sensitive to its content's `iron-select` events. If
the "content" element triggers an `iron-select` event, the `paper-menu-button`
will close automatically.

### Styling

The following custom properties and mixins are also available for styling:

| Custom property | Description | Default |
| --- | --- | --- |
| `--paper-menu-button-dropdown-background` | Background color of the paper-menu-button dropdown | `--primary-background-color` |
| `--paper-menu-button` | Mixin applied to the paper-menu-button | `{}` |
| `--paper-menu-button-disabled` | Mixin applied to the paper-menu-button when disabled | `{}` |
| `--paper-menu-button-dropdown` | Mixin applied to the paper-menu-button dropdown | `{}` |
| `--paper-menu-button-content` | Mixin applied to the paper-menu-button content | `{}` |

## paper-menu-button-animations.js

Defines these animations:
- &lt;paper-menu-grow-height-animation&gt;
- &lt;paper-menu-grow-width-animation&gt;
- &lt;paper-menu-shrink-height-animation&gt;
- &lt;paper-menu-shrink-width-animation&gt;

See: [Documentation](https://www.webcomponents.org/element/@polymer/paper-menu-button),
  [Demo](https://www.webcomponents.org/element/@polymer/paper-menu-button/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/paper-menu-button
```

### In an html file
```html
<html>
  <head>
    <script type="module">
      import '@polymer/paper-icon-button/paper-icon-button.js';
      import '@polymer/paper-item/paper-item.js';
      import '@polymer/paper-listbox/paper-listbox.js';
      import '@polymer/paper-menu-button/paper-menu-button.js';
    </script>
  </head>
  <body>
    <paper-menu-button>
      <paper-icon-button icon="menu" slot="dropdown-trigger"></paper-icon-button>
      <paper-listbox slot="dropdown-content">
        <paper-item>Share</paper-item>
        <paper-item>Settings</paper-item>
        <paper-item>Help</paper-item>
      </paper-listbox>
    </paper-menu-button>
  </body>
</html>
```
### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-menu-button>
        <paper-icon-button icon="menu" slot="dropdown-trigger"></paper-icon-button>
        <paper-listbox slot="dropdown-content">
          <paper-item>Share</paper-item>
          <paper-item>Settings</paper-item>
          <paper-item>Help</paper-item>
        </paper-listbox>
      </paper-menu-button>
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
git clone https://github.com/PolymerElements/paper-menu-button
cd paper-menu-button
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
