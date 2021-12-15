# Quill Emoji Selector
Module extension for [Quill.js](https://github.com/quilljs/quill) that handles emojis in the toolbar. Through this extension, you can add emojis through the toolbar at the top, or by typing the emoji code.

![Screenshot](/demo/screenshot.png)

To add an emoji via emoji code, type ``:`` followed by the first few letters, and an autocomplete menu will appear. You can then select or ``tab`` to the preferred emoji.




#### This module is still in active development

## Installation

```sh
yarn add quill-emoji
```

## Usage
### Webpack/ES6

```javascript
const toolbarOptions = {
  container: [
    ['bold', 'italic', 'underline', 'strike'],
    ['emoji'],   
  ],
  handlers: {'emoji': function() {}}
}
const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    toolbar: toolbarOptions,
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
  }
});
```

or 

```javascript
import * as Emoji from "quill-emoji";
Quill.register("modules/emoji", Emoji);

<Quill
  defaultValue=""
  theme="snow"
  modules={{
    toolbar: toolbarOptions,
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
  }}
  value={quill_data.delta}
/>
```

### Import styles

Styles are present under

```javascript
import "quill-emoji/dist/quill-emoji.css";
```



### Examples
- [Classic HTML/JS](demo/index.html)
- [AngularJS](demo/angular.html) using [ng-quill](https://github.com/KillerCodeMonkey/ng-quill)

### Options
See [emoji-list.js](src/emoji-list.js) for emoji list example

#### Example options
```javascript
// Custom emoji-list
const emojiList = [ /* emojiList */ ];

// MDI emojicon instead of default icon
const emojiIcon = '<svg class="i" viewBox="0 0 24 24"><use href="#emoticon-happy"></use></svg>';

const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    "emoji-shortname": {
      emojiList: emojiList,
      fuse: {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "shortname"
        ]
      },
      onOpen: function() { /* ... */ },
      onClose: function(emojiListItem) { /* ... */ }
    },
    "emoji-toolbar": {
      buttonIcon: emojiIcon
    },
    "emoji-textarea": {
      buttonIcon: emojiIcon
    }
            
  }
});
```

### Custom Emoji Blot
If you need to display the emojis in a different way, you can customize the [emoji blot](src/format-emoji-blot.js) by creating a new blot or extending the default emoji blot.

#### New emoji blot
```javascript
import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class EmojiBlot extends Embed {
    // Customized version of src/format-emoji-blot.js
    // ...
}

EmojiBlot.blotName = 'emoji';
EmojiBlot.tagName = 'span';

Quill.register({
    'formats/emoji': EmojiBlot
}, true);
```

## Contributing

Please check out our [contributing guidelines](CONTRIBUTING.md).
)
