# baresm
Web service worker to resolve es6 bare module specifiers.

allows the use of `npm` installed `package.json` dependencies in `node_modules` as es6 module imports. eg.

index.html
```
<script type="module" src="index.mjs"></script>
```

index.mjs
```
import f, { n } from "some-lib";

f();
n();

```

# why?

Browsers that support es6 module loading only do so with relative or absolute paths. package.json dependencies referenced in import statements will not be resolved by browsers. `baresm.js` will intercept bare module specifiers in javascript modules and rewrite them to absolute paths allowing you to use package.json dependencies in your module without any packaging / build stage of your code.

# should I use this?

No. This is proof of concept and ultimately a stop-gap until browsers support bare module specifiers, if ever. The web specification for es6 module dependencies will likely look different to analyzing package.json files and resolving node_modules paths. Moreover, many typical/popular node_modules won't execute correctly without a packaging step directly in the browser and/or are very large and ultimatley unnecessary to deliver effectively your entire raw node_modules to browsers.

If you decide to use this:

- use HTTP/2, streams will make a huge difference for loading a ton of small files. 
- ensure your dependencies can execute directly in the browsers you're targetting.
- reconsider using this

# install

`npm install --save baresm`

## copy baresm.js to your web root

if you web server supports following symlinks, create a symlink as a sibling to your index.html, ie

`ln -s node_modules/baresm/baresm.js .`

otherwise, copy:

`cp node_modules/baresm/baresm.js .`

index.html
```
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/baresm.js?your-version"));
  }
</script>
```

replace `your-version` with a version token that reflects your module and/or dependency changes.

## Alternatively use Service-Worker-Allowed header

have your index request serve `Service-Worker-Allowed` header as `/` so `/node_modules/baresm/baresm.js` may use the root scope `/`

`Service-Worker-Allowed: /`

index.html
```
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/node_modules/baresm/baresm.js?your-version", { scope: "/" }));
  }
</script>
```

# caching

`baresm.js` will create a `node_modules` cache key and will effectively cache any fetch requests for your origin that are Content-Type `application/javascript`. It is advised to version your service worker registration to ensure you reload this cache whenever you change your code and/or package dependencies.
