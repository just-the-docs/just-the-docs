# Red Hat Access : udsjs
JavaScript Library to interact with the Unified Data Services

Requires [jQuery](https://jquery.org/) and [jsUri](https://github.com/derek-watson/jsUri)


# Build

npm run build

# Test

Make sure you are running https://github.com/redhataccess/accessproxy and a general proxy such as Apache or Nginx that proxies all traffic on 8080.

Then you'll want to start a python server in the main directory: `python -m SimpleHTTPServer 8080`

Finally hit: https://qa.foo.redhat.com/test/index.html or https://prod.foo.redhat.com/test/index.html and look at the js console.

See `test/js/uds-driver.js` for usage examples
