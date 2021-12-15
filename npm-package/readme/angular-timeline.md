# Angular Timeline

An Angular.js directive that generates a responsive, data-driven vertical timeline to tell a story, 
show history or describe a sequence of events.

[![Build Status](https://secure.travis-ci.org/rpocklin/angular-timeline.svg)](http:/travis-ci.org/rpocklin/angular-timeline)

# Demo

[Demo](http://rpocklin.github.io/angular-timeline/example/index.html)

[Demo without bootstrap](http://rpocklin.github.io/angular-timeline/example/index-no-bootstrap.html)

[Original Implementation (HTML / Javascript)](http://bootsnipp.com/snippets/featured/timeline-responsive)

# NG Docs

[link](http://rpocklin.github.io/angular-timeline/docs/#/api/angular-timeline.directive:timeline)

# Inspiration
[1](http://bootsnipp.com/snippets/featured/two-column-timeline-not-responsive)
[2](http://bootsnipp.com/snippets/featured/timeline-single-column)
[3](http://bootsnipp.com/snippets/featured/single-column-timeline)
[4](http://bootsnipp.com/snippets/featured/timeline-with-images-and-tooltip)
[5](http://bootsnipp.com/snippets/featured/timeline-dotted)
[6](http://codyhouse.co/demo/vertical-timeline/index.html)

## Installation

1. Install the plugin into your Angular.js project, manually or via

  `bower install angular-timeline --save`

1. Include `angular-timeline.css` in your app:

  `<link rel="stylesheet" href="bower_components/angular-timeline/dist/angular-timeline.css"/>`

1. Include `angular-timeline.js` in your app:

  `<script src="bower_components/angular-timeline/dist/angular-timeline.js"></script>`

1. Add `angular-timeline` as a new module dependency in your angular app.

  `var myapp = angular.module('myapp', ['angular-timeline']);`

1. To define a timeline, do the following (either manually or using ng-repeat on a dataset):

  ```javascript
  
    // in controller
    $scope.events = [{
      badgeClass: 'info',
      badgeIconClass: 'glyphicon-check',
      title: 'First heading',
      content: 'Some awesome content.'
    }, {
      badgeClass: 'warning',
      badgeIconClass: 'glyphicon-credit-card',
      title: 'Second heading',
      content: 'More awesome content.'
    }];
  ```

  ```html
  
    <!-- view -->
    <timeline>
      <timeline-event ng-repeat="event in events" side="right">
        <timeline-badge class="{{event.badgeClass}}">
          <i class="glyphicon {{event.badgeIconClass}}"></i>
        </timeline-badge>
        <timeline-panel class="{{event.badgeClass}}">
          <timeline-heading>
            <h4>{{event.title}}</h4>
          </timeline-heading>
          <p>{{event.content}}</p>
        </timeline-panel>
      </timeline-event>
    </timeline>
  ```

There is a bit of markup here but `<timeline-heading>` is optional.
`<timeline-badge>` is for the centre line between the two sides, and should represent the event type that occured.

## Notes

- The demo uses [angular-scroll-animate](https://github.com/rpocklin/angular-scroll-animate) to trigger CSS animations when timeline events scroll into view.  It's totally optional to include this or not and is just there for effect.

- Panels are now designed to float left, then right, side to side.  Float right is forced on smaller (eg. mobile) devices.
- If you define the events in an array and have HTML content to output, use `ng-bind-html={{event.attribute}}` and require the `ngSanitize` module.

- You can use either the SASS styles directly file under `/dist` or the compiled CSS files, up to you :)

- If you are using Bootstrap 3 it affects the timeline CSS, so include `angular-timeline-bootstrap.[css|scss]}` to re-adjust the offsets e.g:

```html
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
  <link rel="stylesheet" href="bower_components/angular-timeline/dist/angular-timeline-bootstrap.css" />
  <script src="bower_components/angular-timeline/dist/angular-timeline.js"></script>
```


## Running Locally

1. Checkout git repository locally: `git clone git@github.com:rpocklin/angular-timeline.git`
1. `npm install`
1. `bower install`
1. `grunt serve`
1. View `http://localhost:9000/example/` in your browser to see the example.


## Contributing

1. Fork it
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Beautify (`grunt beautify`)
1. Ensure it passes code-checks / tests (`grunt`)
1. Commit your changes (`git commit -am 'Added some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create a new Pull Request


## History

* 1.7.0 Changed CSS classes to fix animations in and out (in example).
* 1.6.2 Fixed missing logic in passing `side` attribute declaration (was watching parent scope)
* 1.6.1 Added attribute for `side=left` or `side=right` to force left or right-handed columns for timeline events.
* 1.6.0 Changed `hidden` to `timeline-hidden` class in example an `angular-timeline-animations.css`.
* 1.5.2 Updated dependency used in example `angular-scroll-animate` from 0.8.0 to 0.9.1.
* 1.5.0 Updated dependencies, simplified nested components and improved example.  Changed `timeline-node` to `timeline-event`. Removed `replace = true` in directives.
* 1.2.1 Cleaned up dependencies and build steps.
* 1.2.0 Updated example and styling to be more responsive.
* 1.0.0 Initial release


## TODO

- Add some tests

## Thanks
*luisrudge* for the original vanilla JS implementation on [Bootsnipp](http://bootsnipp.com/snippets/featured/timeline-responsive)


## License

Released under the MIT License. See the [LICENSE][license] file for further details.

[license]: https://github.com/rpocklin/angular-timeline/blob/master/LICENSE
