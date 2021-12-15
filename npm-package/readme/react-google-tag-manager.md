[![NPM Version](https://img.shields.io/npm/v/react-google-tag-manager.svg?style=flat)](https://www.npmjs.org/package/react-google-tag-manager)
[![Build Status](https://img.shields.io/travis/holidaycheck/react-google-tag-manager/master.svg?style=flat)](https://travis-ci.org/holidaycheck/react-google-tag-manager)
[![Dependencies](http://img.shields.io/david/holidaycheck/react-google-tag-manager.svg?style=flat)](https://david-dm.org/holidaycheck/react-google-tag-manager)

# react-google-tag-manager

This repository contains a react based implementation for
Google's Tag Manager [snippet](https://developers.google.com/tag-manager/quickstart).

## Motivation & Expectation

We like to use **G**oogle's **T**ag **M**anager in our React Stack. We wrap it into a component because
it makes it testable. And based on our agreement every component needs to be tested.

Other requirements for the GTM implementation are:

1. provide a GTM-ID
1. provide additional events on script initialization (optional)
1. provide a name for the dataLayer (optional)
1. can be used for server-side-rendering and client-side-rendering
1. contains tests
1. installable via npm

## How to use

To use it in your project run `npm i react-google-tag-manager`. It could be used like the following example:

```javascript
import React from 'react';
import gtmParts from 'react-google-tag-manager';

class GoogleTagManager extends React.Component {
    componentDidMount() {
        const dataLayerName = this.props.dataLayerName || 'dataLayer';
        const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

        if (!window[dataLayerName]) {
            const gtmScriptNode = document.getElementById(scriptId);

            eval(gtmScriptNode.textContent);
        }
    }

    render() {
        const gtm = gtmParts({
            id: this.props.gtmId,
            dataLayerName: this.props.dataLayerName || 'dataLayer',
            additionalEvents: this.props.additionalEvents || {},
            previewVariables: this.props.previewVariables || false,
            scheme: this.props.scheme || 'https:',
        });

        return (
            <div>
                <div>{gtm.noScriptAsReact()}</div>
                <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
                    {gtm.scriptAsReact()}
                </div>
            </div>
        );
    }
}

GoogleTagManager.propTypes = {
    gtmId: React.PropTypes.string.isRequired,
    dataLayerName: React.PropTypes.string,
    additionalEvents: React.PropTypes.object,
    previewVariables: React.PropTypes.string,
    scriptId: React.PropTypes.string,
    scheme: React.PropTypes.string,
};

export default GoogleTagManager;
```

You can render this later simply by

```
// inside the render method where you want to include the tag manager
<GoogleTagManager gtmId='GTM-12345' />

// or with all optional parameters
const event = { platform: 'react-stack' }

<GoogleTagManager gtmId='GTM-12345' scriptId='gtm-script-container' dataLayerName='dl-backup' additionalEvents={event} previewVariables='' scheme='https:' />
```

In this example the google tag manager id, the dataLayer name, additional events and the script id where gtm script should be mounted are configurable through props:

| prop                | required      | default value                   |
| ------------------- | ------------- |-------------------------------- |
| `gtmId`             | yes           |                                 |
| `dataLayerName`     | no            | `dataLayer`                     |
| `additionalEvents`  | no            | `{}`                            |
| `scriptId`          | no            | `react-google-tag-manager-gtm`  |
| `previewVariables`  | no            | `false`                         |
| `scheme          `  | no            | `https:`                         |

## Notes:

* The `componentDidMount` part is required as the script contents itself would not be executed otherwise on the client side
* As `eval` can be used to do harm, make sure that you are understanding what you are doing here and read through the script that is evaluated
* Additionally this module exports `noScriptAsHTML()` and `scriptAsHTML()` which return a simple HTML string
* `gtmParts` takes the following arguments:

| argument keys       | required      | default value |
| ------------------- | ------------- | ------------- |
| `id`                | yes           |               |
| `dataLayerName`     | no            | `dataLayer`   |
| `additionalEvents`  | no            | `{}`          |
| `scheme`            | no            | ``            |
| `previewVariables`  | no            | `false`       |
