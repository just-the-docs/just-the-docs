[React App Rewire Multiple Entry] lets you configure multiple entries in [Create React App]
without ejecting.

## Usage

1. Add [React App Rewire Multiple Entry] to your [Rewired] React app:

```bash
npm install --save-dev react-app-rewired react-app-rewire-multiple-entry
```

##### For create-react-app 1.x or react-scripts-ts with Webpack 3:

```bash
$ npm install --save-dev react-app-rewired@1.6.2
```

2. Modify `package.json`

```diff
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

3. Add [React App Rewire Multiple Entry] to `config-overrides.js` in your React app
   directory:

### Basic Usage

```js
// config-overrides.js

const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/entry/landing.js',
    template: 'public/landing.html',
    outPath: '/landing.html'
  }
]);

module.exports = {
  webpack: function(config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  }
};
```

### Work with [customize-cra]

```js
// config-overrides.js

const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/entry/landing.js',
    template: 'public/landing.html',
    outPath: '/landing.html'
  }
]);

const {
  // addBundleVisualizer,
  override,
  overrideDevServer
} = require('customize-cra');

module.exports = {
  webpack: override(
    multipleEntry.addMultiEntry
    // addBundleVisualizer()
  )
};
```

### More Examples

```js
// config-overrides.js

const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    // Webpack extra entry
    entry: 'src/entry/standard.js',
    // HTML template used in plugin HtmlWebpackPlugin
    template: 'src/entry/standard.html',
    // The file to write the HTML to. You can specify a subdirectory
    outPath: '/entry/standard.html'
    // Visit: http[s]://localhost:3000/entry/standard.html
  },
  {
    entry: 'src/entry/login.js',
    // if [template] is empty, Default value: `public/index.html`
    // template: 'public/index.html',
    outPath: 'public/login.html'
    // Visit: http[s]://localhost:3000/public/login.html
  },
  {
    entry: 'src/entry/404.js',
    template: 'public/404.html'
    // if [outPath] is empty, calculated by `path.relative(process.cwd(), template)` --> `public/404.html`
    // outPath: '/public/404.html'
    // Visit: http[s]://localhost:3000/public/404.html
  },
  {
    entry: 'src/entry/home.js'
    // Default value: `public/index.html`
    // template: 'public/index.html',
    // Calculated by `path.relative(process.cwd(), template)` --> `public/index.html`
    // outPath: '/public/index.html'
    // Visit: http[s]://localhost:3000/public/index.html
  }
]);

module.exports = {
  webpack: function(config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  }
};
```

## API

### Options

You can pass a array of entry configuration options to `react-app-rewire-multiple-entry`, the entry in the array has attributes below:

- `entry` [Required] Webpack entry JS file. Throw error when empty.
- `template` [Optional] HTML template used in plugin [HtmlWebpackPlugin]. Default value: `public/index.html`.
- `outPath`: [Optional] The file wirte the HTML to. You can specify a subdirectory. **If empty, it will be calculated by `path.relative(process.cwd(), template)`**

### Method

- `addMultiEntry` Inject settings for multiple entry in webpack config

That’s it! Now you can control mulitple entries, enjoy coding!

---

[create react app]: https://github.com/facebook/create-react-app
[react app rewire multiple entry]: https://github.com/Derek-Hu/react-app-rewire-multiple-entry
[customize-cra]: https://github.com/arackaf/customize-cra#readme
[rewired]: https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project
[htmlwebpackplugin]: https://github.com/jantimon/html-webpack-plugin
