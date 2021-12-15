# Vue Media Manager

> A stand-alone Vue.js Media Manager/Library.

A companion package exists for Laravel which can be used as a back-end service for this Media Manager Library, or you can create your own compatible server-side package to work with the Vue Media Manager.

This library is in the early-stages of development and has a number of requirements which we would like to eventually make less restrictive.

## Dependencies

* axios ~0.17
* vue2-dropzone ~3.0
* vuetify ~1.0
* Compatible back-end

## Installation

`npm install @thesold/vue-media-manager`

## Usage

Import the Library and load it into Vue.

```js
import VueMediaManager from '@thesold/vue-media-manager'

Vue.use(VueMediaManager)
```

Now you can use the `<media-manager></media-manager>` tag to initialize an instance of the Media Manager.

```js
<media-manager
    api="https://myapp.localhost/mediamanager"
    library="demo"
    v-model="booleanToDetermineOpenState"
    width="800"
    height="600"
    gravity="auto"
    @mediaSelected="image => console.log(image)"
>
```

## Parameters

|Param|Value|Description|
|---|---|---|
|api|myapp.localhost/mediamanager|The server-side URL of the endpoint to handle requests|
|library|default|A string key to identify the name of the Media Library|
|v-model|boolean|A reactive parameter to determine the open state of the media manager|
|width|800|The desired width (in px) of the image to be returned|
|height|600|The desired height (in px) of the image to be returned|
|gravity|auto|The crop/resize mode to be used (values depend on library driver)|

## Events

|Key|Value|Description|
|---|---|---|
|mediaSelected|myapp.localhost/images/foo.png|Returns the full URL to the selected image|
