# gulp-environments

A Gulp plug-in that makes it convenient to create separate environments, such as development and production, to run your tasks in.

[![CircleCI](https://circleci.com/gh/gunpowderlabs/gulp-environments.svg?style=svg)](https://circleci.com/gh/gunpowderlabs/gulp-environments)

## Basic usage

Install the plugin using npm:

    $ npm install --save-dev gulp-environments

Require the plug-in somewhere in your `gulpfile.js`

    var environments = require('gulp-environments');

By default, the library defines two environments: development and production. For convenience sake, it is recommended to assign them to local variables:

    var development = environments.development;
    var production = environments.production;

You can use these environments as predicates (functions returning true/false depending on whether the given environment is active):

    var source = production() ? "source.min.js" : "source.js";

You can also use the environment as a filter in you Gulp pipelines:

    gulp.src(paths.js)
      // this will only init sourcemaps in development
      .pipe(development(sourcemaps.init()))
      .pipe(concat("app.js"))
      // only write out sourcemaps in development
      .pipe(development(sourcemaps.write('.')))
      // only minify the compiled JS in production mode
      .pipe(production(uglify()))
      .pipe(gulp.dest("./public/app/js/"));
  
## Setting the environment

By default, gulp-environments uses the NODE_ENV environment variable to determine environment:

    NODE_ENV=development gulp build

You can also pass a command line flag --env to set it (takes precedence over NODE_ENV):

    gulp build --env development

Alternatively, you can define a task that would set the appropriate environment before executing other tasks:

    gulp.task('set-dev', development.task);

and run it (or make it a dependency of a task that should also be run in that environment):

    gulp set-dev build

Finally, you can always set the environment by hand in your task definition:

    environments.current(development);

## Other environments

You don't have to limit yourself to using only the two provided environments. You can create other ones by calling (in the example, we are creating an environment called staging):

    var staging = environments.make("staging");

## License

MIT

## Author

Adam Pohorecki
