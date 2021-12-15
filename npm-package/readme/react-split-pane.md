# React Split Pane

Split-Pane component built with [React](http://facebook.github.io/react), can be split vertically or horizontally.


[![Build Status](https://img.shields.io/travis/tomkp/react-split-pane/master.svg?style=flat-square)](https://travis-ci.org/tomkp/react-split-pane)
[![Coverage Status](https://img.shields.io/coveralls/tomkp/react-split-pane/master.svg?style=flat-square)](https://coveralls.io/r/tomkp/react-split-pane)


Check out the [demo](http://zonked-knife.surge.sh/)


```html
   <SplitPane split="vertical" minSize="50" defaultSize="100">
       <div></div>
       <div></div>
   </SplitPane>
```

```html
    <SplitPane split="vertical" minSize="50">
        <div></div>
        <SplitPane split="horizontal">
            <div></div>
            <div></div>
        </SplitPane>
    </SplitPane>
```

### Persisting Positions

Each SplitPane accepts an onChange function prop.  Used in conjunction with
defaultSize and a persistence layer, you can ensure that your splitter choices
survive a refresh of your app.

For example, if you are comfortable with the trade-offs of localStorage, you
could do something like the following:

```html
    <SplitPane split="vertical" minSize="50"
               defaultSize={ localStorage.getItem('splitPos') }
               onChange={ size => localStorage.setItem('splitPos', size) }>
        <div></div>
        <div></div>
    </SplitPane>
```

Disclaimer: localStorage has a variety of performance trade-offs.  Browsers such
as Firefox have now optimized localStorage use so that they will asynchronously
initiate a read of all saved localStorage data for an origin once they know the
page will load.  If the data has not fully loaded by the time code accesses
localStorage, the code will cause the page's main thread to block until the
database load completes.  When the main thread is blocked, no other JS code will
run or layout will occur.  In multiprocess browsers and for users with fast
disk storage, this will be less of a problem.  You *are* likely to get yelled at
if you use localStorage.

A potentially better idea is to use something like
https://github.com/mozilla/localForage although hooking it up will be slightly
more involved.  You are likely to be admired by all for judiciously avoiding
use of localStorage.

### Example styling

This gives a single pixel wide divider, but with a 'grabbable' surface of 11 pixels.

Thanks to ```background-clip: padding-box;``` for making transparent borders possible.


```css

    .Resizer {
        background: #000;
        opacity: .2;
        z-index: 1;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -moz-background-clip: padding;
        -webkit-background-clip: padding;
        background-clip: padding-box;
    }

     .Resizer:hover {
        -webkit-transition: all 2s ease;
        transition: all 2s ease;
    }

     .Resizer.horizontal {
        height: 11px;
        margin: -5px 0;
        border-top: 5px solid rgba(255, 255, 255, 0);
        border-bottom: 5px solid rgba(255, 255, 255, 0);
        cursor: row-resize;
        width: 100%;
    }

    .Resizer.horizontal:hover {
        border-top: 5px solid rgba(0, 0, 0, 0.5);
        border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    }

    .Resizer.vertical {
        width: 11px;
        margin: 0 -5px;
        border-left: 5px solid rgba(255, 255, 255, 0);
        border-right: 5px solid rgba(255, 255, 255, 0);
        cursor: col-resize;
        height: 100%;
    }

    .Resizer.vertical:hover {
        border-left: 5px solid rgba(0, 0, 0, 0.5);
        border-right: 5px solid rgba(0, 0, 0, 0.5);
    }
 ```
