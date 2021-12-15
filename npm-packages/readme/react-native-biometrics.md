
# react-native-biometrics

React native biometrics is a simple bridge to native iOS and Android keystore management.  It allows you to create public private key pairs that are stored in native keystores and protected by biometric authentication.  Those keys can then be retrieved later, after proper authentication, and used to create a cryptographic signature.

## React Native Compatibility

| `react-native-biometrics` version | Required React Native Version |
|:---------------------------------:|:-----------------------------:|
| `>= 2.0.0`                        | `>= 0.60`                     |
| `<= 1.7.0`                        | `<= 0.59.x`                   |

## Getting started

using either Yarn:

`yarn add react-native-biometrics`

or npm:

`$ npm install react-native-biometrics --save`

### Link / Autolinking

On React Native 0.60+ the [CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

## Additional configuration

#### iOS

This package requires an iOS target SDK version of iOS 10 or higher

Ensure that you have the `NSFaceIDUsageDescription` entry set in your react native iOS project, or Face ID will not work properly.  This description will be will be presented to the user the first time a biometrics action is taken, and the user will be asked if they want to allow the app to use Face ID.  If the user declines the usage of face id for the app, the `isSensorAvailable` function will indicate biometrics is unavailable until the face id permission is specifically allowed for the app by the user.

#### Android

This package requires a compiled SDK version of 29 (Android 10.0) or higher

## Usage

This package is designed to make server authentication using biometrics easier.  Here is an image from https://android-developers.googleblog.com/2015/10/new-in-android-samples-authenticating.html illustrating the basic use case:

![react-native-biometrics](https://2.bp.blogspot.com/-Lp2zaAZietw/Vi59hb6k6SI/AAAAAAAABLk/HsXXBYiIwqU/s1600/image01.png)

When a user enrolls in biometrics, a key pair is generated.  The private key is stored securely on the device and the public key is sent to a server for registration.  When the user wishes to authenticate, the user is prompted for biometrics, which unlocks the securely stored private key.  Then a cryptographic signature is generated and sent to the server for verification.  The server then verifies the signature.  If the verification was successful, the server returns an appropriate response and authorizes the user.

## Constants

### TouchID (iOS only)

A constant for the touch id sensor type, evaluates to `'TouchID'`

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

const { biometryType } = await ReactNativeBiometrics.isSensorAvailable()

if (biometryType === ReactNativeBiometrics.TouchID) {
  //do something fingerprint specific
}
```

### FaceID (iOS only)

A constant for the face id sensor type, evaluates to `'FaceID'`

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

const { biometryType } = await ReactNativeBiometrics.isSensorAvailable()

if (biometryType === ReactNativeBiometrics.FaceID) {
  //do something face id specific
}
```

### Biometrics (Android only)

A constant for generic Biometrics, evaluates to `'Biometrics'`

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

const { biometryType } = await ReactNativeBiometrics.isSensorAvailable()

if (biometryType === ReactNativeBiometrics.Biometrics) {
  //do something face id specific
}
```

## Methods

### isSensorAvailable()

Detects what type of biometric sensor is available.  Returns a `Promise` that resolves to an object with details about biometrics availability

__Result Object__

| Property | Type | Description |
| --- | --- | --- |
| available | bool | A boolean indicating if biometrics is available or not |
| biometryType | string | A string indicating what type of biometrics is available. `TouchID`, `FaceID`, `Biometrics`, or `undefined` if biometrics is not available. |
| error | string | An error message indicating why biometrics may not be available. `undefined` if there is no error. |

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

ReactNativeBiometrics.isSensorAvailable()
  .then((resultObject) => {
    const { available, biometryType } = resultObject

    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      console.log('TouchID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      console.log('FaceID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      console.log('Biometrics is supported')
    } else {
      console.log('Biometrics not supported')
    }
  })
```

### createKeys()

Generates a public private RSA 2048 key pair that will be stored in the device keystore.  Returns a `Promise` that resolves to an object providing details about the keys.

__Result Object__

| Property | Type | Description |
| --- | --- | --- |
| publicKey | string | A base64 encoded string representing the public key |

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

ReactNativeBiometrics.createKeys('Confirm fingerprint')
  .then((resultObject) => {
    const { publicKey } = resultObject
    console.log(publicKey)
    sendPublicKeyToServer(publicKey)
  })
```

### biometricKeysExist()

Detects if keys have already been generated and exist in the keystore.  Returns a `Promise` that resolves to an object indicating details about the keys.

__Result Object__

| Property | Type | Description |
| --- | --- | --- |
| keysExist | bool | A boolean indicating if keys exist in the keystore |

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

ReactNativeBiometrics.biometricKeysExist()
  .then((resultObject) => {
    const { keysExist } = resultObject

    if (keysExist) {
      console.log('Keys exist')
    } else {
      console.log('Keys do not exist or were deleted')
    }
  })
```

### deleteKeys()

Deletes the generated keys from the device keystore.  Returns a `Promise` that resolves to an object indicating details about the deletion.

__Result Object__

| Property | Type | Description |
| --- | --- | --- |
| keysDeleted | bool | A boolean indicating if keys were deleted from the keystore |

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

ReactNativeBiometrics.deleteKeys()
  .then((resultObject) => {
    const { keysDeleted } = resultObject

    if (keysDeleted) {
      console.log('Successful deletion')
    } else {
      console.log('Unsuccessful deletion because there were no keys to delete')
    }
  })
```

### createSignature(options)

Prompts the user for their fingerprint or face id in order to retrieve the private key from the keystore, then uses the private key to generate a RSA PKCS#1v1.5 SHA 256 signature.  Returns a `Promise` that resolves to an object with details about the signature.

**NOTE: No biometric prompt is displayed in iOS simulators when attempting to retrieve keys for signature generation, it only occurs on actual devices.

__Options Object__

| Parameter | Type | Description | iOS | Android |
| --- | --- | --- | --- | --- |
| promptMessage | string | Message that will be displayed in the fingerprint or face id prompt | ✔ | ✔ |
| payload | string | String of data to be signed by the RSA signature | ✔ | ✔ |
| cancelButtonText | string | Text to be displayed for the cancel button on biometric prompts, defaults to `Cancel` | ✖ | ✔ |

__Result Object__

| Property | Type | Description |
| --- | --- | --- |
| success | bool | A boolean indicating if the process was successful, `false` if the users cancels the biometrics prompt |
| signature | string | A base64 encoded string representing the signature. `undefined` if the process was not successful. |
| error | string | An error message indicating reasons why signature creation failed. `undefined` if there is no error. |

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'

ReactNativeBiometrics.createSignature({
    promptMessage: 'Sign in',
    payload: payload
  })
  .then((resultObject) => {
    const { success, signature } = resultObject

    if (success) {
      console.log(signature)
      verifySignatureWithServer(signature, payload)
    }
  })
```

### simplePrompt(options)

Prompts the user for their fingerprint or face id. Returns a `Promise` that resolves if the user provides a valid biometrics or cancel the prompt, otherwise the promise rejects.

**NOTE: This only validates a user's biometrics.  This should not be used to log a user in or authenticate with a server, instead use `createSignature`.  It should only be used to gate certain user actions within an app.

__Options Object__

| Parameter | Type | Description | iOS | Android |
| --- | --- | --- | --- | --- |
| promptMessage | string | Message that will be displayed in the biometrics prompt | ✔ | ✔ |
| cancelButtonText | string | Text to be displayed for the cancel button on biometric prompts, defaults to `Cancel` | ✖ | ✔ |

__Result Object__

| Property | Type | Description |
| --- | --- | --- |
| success | bool | A boolean indicating if the biometric prompt succeeded, `false` if the users cancels the biometrics prompt |
| error | string | An error message indicating why the biometric prompt failed. `undefined` if there is no error. |

__Example__

```js
import ReactNativeBiometrics from 'react-native-biometrics'

ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
  .then((resultObject) => {
    const { success } = resultObject

    if (success) {
      console.log('successful biometrics provided')
    } else {
      console.log('user cancelled biometric prompt')
    }
  })
  .catch(() => {
    console.log('biometrics failed')
  })
```

### Troubleshooting

- Because of this library's dependency on `androidx.biometric:biometric:1.0.0` it can cause transitive dependency resolution to change on certain version of React Native and `androidx.swiperefreshlayout` may no longer be able to be resolved.  This can be fixed by adding an explicit dependency on the library in your `android/app/build.gradle`:

    ```
    dependencies {
        implementation fileTree(dir: "libs", include: ["*.jar"])
        implementation "com.facebook.react:react-native:+"  // From node_modules
        implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.0.0" // temp fix
        ...
    }
    ```

- There is a [known issue](https://stackoverflow.com/questions/56700680/keychain-query-always-returns-errsecitemnotfound-after-upgrading-to-ios-13) on the iOS 13.x simulators where keys generated with access control flags cannot be queried and found properly.  This results in key not found errors in `biometricKeysExist` and `createSignature` on those simulators.  However, it works correctly on actual devices running iOS 13.
