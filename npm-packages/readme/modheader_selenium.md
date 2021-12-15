# ModHeader for Selenium (WebDriver)

This is the repo for using [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) in [Selenium](https://www.seleniumhq.org/). For ModHeader's browser extension source code, please visit https://github.com/bewisse/modheader

## Donation

If you find ModHeader useful, please consider making a donation. If you use it for your company project, please ask your company to make a monthly donation!

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/pools/c/84aPpFIA0Z)

## Installation:

To use this in NodeJS for Chrome, install the [chrome-modheader](https://www.npmjs.com/package/chrome-modheader) package:

```
npm install chrome-modheader
```

To use this in NodeJS for Firefox, install the [firefox-modheader](https://www.npmjs.com/package/firefox-modheader) package:

```
npm install firefox-modheader
```

For other programming languages, you can find the prepackaged extensions in the `chrome-modheader` and `firefox-modheader`
subdirectories. Load them into WebDriver as needed.

## Usage:

For Chrome:

```
const { getExtension, getAddHeaderUrl } = require('chrome-modheader');
const options = new chrome.Options().addExtensions(getExtension());
const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
await driver.get(getAddHeaderUrl('HeaderName', 'HeaderValue'));
```

For Firefox:

```
const { getExtension, getAddHeaderUrl } = require('firefox-modheader');

const options = new firefox.Options();
options.addExtensions(getExtension());
const driver = await new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();
await driver.get(getAddHeaderUrl('HeaderName', 'HeaderValue'));
```

For Webdriver.io:

Modify wdio.conf.js file

```
const chromeModheader = require('chrome-modheader');

exports.config = {
...
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            extensions: [chromeModheader.getExtension()],
        }
    }],
...
    before: function (capabilities, specs) {
        browser.url(chromeModheader.getAddHeaderUrl('accept-encoding', ''));
    },
...
}

```

## API:

All APIs are URL-based. Please make sure to URL encode your name and value
properly.

If you are using npm, you can also use the `getAddHeaderUrl()` and `getClearHeadersUrl()`
functions to craft these URLs. Be sure to do `driver.get()`, and be mindful that these
will change the URL of the WebDriver.

### Add request header:

```
https://webdriver.bewisse.com/add?{name1}={value1}&{name2}={value2}&...
```

e.g., `https://webdriver.bewisse.com/add?Test=1`

### Clear all modified request headers:

```
https://webdriver.bewisse.com/clear
```

### Load custom profile:

```
https://webdriver.bewisse.com/load?profile={exported_profile_in_json}
```

exported_profile_in_json can be obtained from the regular ModHeader
extension using ... -> Export Profile.

## Updating codes

### Packaging the extensions

For Chrome (update the modheader.crx file):
Go to chrome://extensions, and click on "Pack extension".

For Firefox (update the modheader.xpi file):

```
npm install --global web-ext
web-ext sign --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET
```

### Verification

Copy `modheader.crx` into chrome-modheader, and copy `modheader.xpi` into firefox-modheader.
Run `npm run verify-chrome` and `npm run verify-firefox` to verify that the packaged extensions are working fine.

### Publishing

`cd chrome-modheader`, update the version in `package.json`, then `npm publish`
`cd firefox-modheader`, update the version in `package.json`, then `npm publish`
