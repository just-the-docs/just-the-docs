# angular-resizable
A directive for creating resizable containers.

## Why?
All other resizable directive concepts I came across include layout logic in the directive. I wanted a directive that only handled the resize logic. This way, the layout logic is quarantined to the CSS.

## Usage

1. `npm install angular-resizable` or `bower install angular-resizable` or clone/download this repo
2. Include `angular-resizable.min.js` in your project.
3. Include `angular-resizable.min.css` in your project as well (this provides default styling for the resize handles).
4. Then include the module in your app: `angular.module('app', ['angularResizable'])`
5. Use it: `<section resizable r-directions="['bottom', 'right']" r-flex="true">`

Include any sides you want to be resizable in an array inside `r-directions`. Accepts 'top','right','bottom', and 'left'. You can style the handles however you want. Just override the styles in the css in your own stylesheet.

## Options

Attributes  | Default | Accepts | Description
--- | --- | --- | ---
rDirections | ['right'] | ['top', 'right', 'bottom', 'left',] | Determines which sides of the element are resizable.
rFlex | false | boolean | Set as true if you are using flexbox. [See this codepen](http://codepen.io/Reklino/pen/raRaXq).
rCenteredX | false | boolean | If set as true, the velocity of horizontal resizing will be doubled.
rCenteredY | false | boolean | If set as true, the velocity of vertical resizing will be doubled.
rWidth | false | integer or $scope variable | If set, the resizable element will be rendered with a predefined width relative to this value in pixels and a watcher will be set on the 'rWidth' attribute. [See this codepen](http://codepen.io/Reklino/pen/EjKXqg).
rHeight | false | integer or $scope variable | If set, the resizable element will be rendered with a predefined height relative to this value in pixels and a watcher will be set on the 'rHeight' attribute. [See this codepen](http://codepen.io/Reklino/pen/EjKXqg).
rGrabber | `<span></span>` | string | Defines custom inner html for the grabber.
rNoThrottle | false | boolean | Disables `angular-resizable.resizing` throttling (see events section below).

## Events

For an example using the events, [see this codepen](http://codepen.io/Reklino/pen/EjKXqg).

### angular-resizable.resizeStart

This event is emitted at the beginning of a resize with the following info object:
- `info.width` : The width of the directive at time of resize start. **Will be false if resizing vertically**
- `info.height` : The height of the directive at time of resize start. **Will be false if resizing horizontally**
- `info.id` : The id of the directive. **Will be false if there is no id set.**
- `info.evt` : original mouse event object

### angular-resizable.resizing

Called repeatedly while the mouse is being moved. By default, only calls once every 100ms to keep CPU usage low. For smooth resizing, use the `rNoThrottle` attribute. This event is emitted during the resizing of the element with the following object as an argument:
- `info.width` : The width of the directive at time of resize end. **Will be false if resizing vertically**
- `info.height` : The height of the directive at time of resize end. **Will be false if resizing horizontally**
- `info.id` : The id of the directive. **Will be false if there is no id set.**
- `info.evt` : original mouse event object

### angular-resizable.resizeEnd

This event is emitted at the end of a resize with the following object as an argument:
- `info.width` : The width of the directive at time of resize end. **Will be false if resizing vertically**
- `info.height` : The height of the directive at time of resize end. **Will be false if resizing horizontally**
- `info.id` : The id of the directive. **Will be false if there is no id set.**
- `info.evt` : original mouse event object

## version notes

### 1.2.0
- Add angular-resizable.resizing event (see pull request #7)
- Add attribute for providing custom inner html to the grabber element (see pull request #7)

## License

MIT
