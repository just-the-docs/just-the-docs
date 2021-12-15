<!-- markdownlint-disable MD024 MD034 MD033 -->

# react-native-device-info

[![npm version](https://badge.fury.io/js/react-native-device-info.svg)](http://badge.fury.io/js/react-native-device-info)
[![npm total downloads](https://img.shields.io/npm/dt/react-native-device-info.svg)](https://img.shields.io/npm/dt/react-native-device-info.svg)
[![npm monthly downloads](https://img.shields.io/npm/dm/react-native-device-info.svg)](https://img.shields.io/npm/dm/react-native-device-info.svg)
[![npm weekly downloads](https://img.shields.io/npm/dw/react-native-device-info.svg)](https://img.shields.io/npm/dw/react-native-device-info.svg)

Device Information for [React Native](https://github.com/facebook/react-native).

## TOC

- [Installation](#installation)
- [Linking](#linking)
- [Usage](#usage)
- [API](#api)
- [Hooks & Events](#hooks--events)
- [Troubleshooting](#troubleshooting)
- [Release Notes](#release-notes)
- [react-native-dom / react-native-web](#react-native-dom)

## v6 to v7 upgrade

Your iOS Podfile will need to move to an iOS 10 minimum. v7 of this module no longer supports iOS9.

## Installation

Using npm:

```shell
npm install --save react-native-device-info
```

or using yarn:

```shell
yarn add react-native-device-info
```

## Proguard

If you want to use Install Referrer tracking, you will need to add this config to your Proguard config

```
-keepclassmembers class com.android.installreferrer.api.** {
  *;
}
```

If you are experiencing issues with hasGms() on your release apks, please add the following rule to your Proguard config
```
-keep class com.google.android.gms.common.** {*;}
```

## AndroidX Support

This module defaults to AndroidX you should configure your library versions similar to this in your `android/build.gradle` file's "ext" block

<details>
    <summary>Android</summary>

```gradle
...
  ext {
    // dependency versions

    We have 3 options for deviceId:
    //Option 1 (latest):
    firebaseIidVersion = "19.0.1" // default: "19.0.1"
    //Option 2 (legacy GooglePlay dependency but using AndroidX):
    googlePlayServicesIidVersion = "17.0.0" // default: "17.0.0" - AndroidX
    //Option 3 (legacy GooglePlay dependency before AndroidX):
    googlePlayServicesIidVersion = "16.0.1"


    //include as needed:
    compileSdkVersion = "28" // default: 28 (28 is required for AndroidX)
    targetSdkVersion = "28" // default: 28 (28 is required for AndroidX)
    supportLibVersion = '1.0.2' // Use '28.0.0' or don't specify for old libraries, '1.0.2' or similar for AndroidX
    mediaCompatVersion = '1.0.1' // Do not specify if using old libraries, specify '1.0.1' or similar for androidx.media:media dependency
    supportV4Version = '1.0.0' // Do not specify if using old libraries, specify '1.0.0' or similar for androidx.legacy:legacy-support-v4 dependency
  }
...
```

</details>

If you need non-AndroidX you will need to use the jetifier package in reverse mode, documentation available with that package.

## Linking

Linking in native modules is a frequent source of trouble for new react-native developers, resulting in errors like "RNDeviceInfo is null" etc. For this reason automatic linking was implemented, and it should be used in your project.

Automatic linking is supported for all platforms (even windows on React native >= 0.63!)

Previous versions need to do manual linking. No support is offered for these previous react-native versions but you may refer to older versions of this README if you like. _Upgrade to modern versions of react-native. Use `upgrade-helper` tool on the internet if needed._

## Usage

```js
import DeviceInfo from 'react-native-device-info';

// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';
```

## API

Note that many APIs are platform-specific. If there is no implementation for a platform, then the "default" return values you will receive are `"unknown"` for string, `-1` for number, and `false` for boolean. Arrays and Objects will be empty (`[]` and `{}` respectively).

Most APIs return a Promise but also have a corresponding API with `Sync` on the end that operates synchronously. For example, you may prefer to call `isCameraPresentSync()` during your app bootstrap to avoid async calls during the first parts of app startup.

The example app in this repository shows an example usage of every single API, consult the example app if you have questions, and if you think you see a problem make sure you can reproduce it using the example app before reporting it, thank you.

| Method                                                            | Return Type         |  iOS | Android | Windows | Web |
| ----------------------------------------------------------------- | ------------------- | :--: | :-----: | :-----: | :-: |
| [getAndroidId()](#getandroidid)                                   | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getApiLevel()](#getapilevel)                                     | `Promise<number>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getApplicationName()](#getapplicationname)                       | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getAvailableLocationProviders()](#getAvailableLocationProviders) | `Promise<Object>`   |  ✅  |   ✅    |   ❌    | ❌  |
| [getBaseOs()](#getbaseOs)                                         | `Promise<string>`   |  ❌  |   ✅    |   ✅    | ✅  |
| [getBuildId()](#getbuildid)                                       | `Promise<string>`   |  ✅  |   ✅    |   ✅    | ❌  |
| [getBatteryLevel()](#getbatterylevel)                             | `Promise<number>`   |  ✅  |   ✅    |   ✅    | ✅  |
| [getBootloader()](#getbootloader)                                 | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getBrand()](#getbrand)                                           | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getBuildNumber()](#getbuildnumber)                               | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getBundleId()](#getbundleid)                                     | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [isCameraPresent()](#iscamerapresent)                             | `Promise<boolean>`  |  ❌  |   ✅    |   ✅    | ✅  |
| [getCarrier()](#getcarrier)                                       | `Promise<string>`   |  ✅  |   ✅    |   ❌    | ❌  |
| [getCodename()](#getcodename)                                     | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getDevice()](#getdevice)                                         | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getDeviceId()](#getdeviceid)                                     | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getDeviceType()](#getDeviceType)                                 | `string`            |  ✅  |   ✅    |   ❌    | ❌  |
| [getDisplay()](#getdisplay)                                       | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getDeviceName()](#getdevicename)                                 | `Promise<string>`   |  ✅  |   ✅    |   ✅    | ❌  |
| [getDeviceToken()](#getdevicetoken)                               | `Promise<string>`   |  ✅  |   ❌    |   ❌    | ❌  |
| [getFirstInstallTime()](#getfirstinstalltime)                     | `Promise<number>`   |  ❌  |   ✅    |   ✅    | ❌  |
| [getFingerprint()](#getfingerprint)                               | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getFontScale()](#getfontscale)                                   | `Promise<number>`   |  ✅  |   ✅    |   ✅    | ❌  |
| [getFreeDiskStorage()](#getfreediskstorage)                       | `Promise<number>`   |  ✅  |   ✅    |   ✅    | ✅  |
| [getFreeDiskStorageOld()](#getfreediskstorageold)                 | `Promise<number>`   |  ✅  |   ✅    |   ✅    | ✅  |
| [getHardware()](#gethardware)                                     | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getHost()](#gethost)                                             | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getIpAddress()](#getipaddress)                                   | `Promise<string>`   |  ✅  |   ✅    |   ✅    | ❌  |
| [getIncremental()](#getincremental)                               | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getInstallerPackageName()](#getinstallerpackagename)             | `Promise<string>`   |  ✅  |   ✅    |   ✅    | ❌  |
| [getInstallReferrer()](#getinstallreferrer)                       | `Promise<string>`   |  ❌  |   ✅    |   ✅    | ✅  |
| [getInstanceId()](#getinstanceid)                                 | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getLastUpdateTime()](#getlastupdatetime)                         | `Promise<number>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getMacAddress()](#getmacaddress)                                 | `Promise<string>`   |  ✅  |   ✅    |   ❌    | ❌  |
| [getManufacturer()](#getmanufacturer)                             | `Promise<string>`   |  ✅  |   ✅    |   ✅    | ❌  |
| [getMaxMemory()](#getmaxmemory)                                   | `Promise<number>`   |  ❌  |   ✅    |   ✅    | ✅  |
| [getModel()](#getmodel)                                           | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getPhoneNumber()](#getphonenumber)                               | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getPowerState()](#getpowerstate)                                 | `Promise<object>`   |  ✅  |   ✅    |   ✅    | ✅  |
| [getProduct()](#getproduct)                                       | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getPreviewSdkInt()](#getPreviewSdkInt)                           | `Promise<number>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getReadableVersion()](#getreadableversion)                       | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getSerialNumber()](#getserialnumber)                             | `Promise<string>`   |  ❌  |   ✅    |   ✅    | ❌  |
| [getSecurityPatch()](#getsecuritypatch)                           | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getSystemAvailableFeatures()](#getSystemAvailableFeatures)       | `Promise<string[]>` |  ❌  |   ✅    |   ❌    | ❌  |
| [getSystemName()](#getsystemname)                                 | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getSystemVersion()](#getsystemversion)                           | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getTags()](#gettags)                                             | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getType()](#gettype)                                             | `Promise<string>`   |  ❌  |   ✅    |   ❌    | ❌  |
| [getTotalDiskCapacity()](#gettotaldiskcapacity)                   | `Promise<number>`   |  ✅  |   ✅    |   ✅    | ✅  |
| [getTotalDiskCapacityOld()](#gettotaldiskcapacityold)             | `Promise<number>`   |  ✅  |   ✅    |   ✅    | ✅  |
| [getTotalMemory()](#gettotalmemory)                               | `Promise<number>`   |  ✅  |   ✅    |   ❌    | ✅  |
| [getUniqueId()](#getuniqueid)                                     | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [getUsedMemory()](#getusedmemory)                                 | `Promise<number>`   |  ✅  |   ✅    |   ✅    | ✅  |
| [getUserAgent()](#getuseragent)                                   | `Promise<string>`   |  ✅  |   ✅    |   ❌    | ✅  |
| [getVersion()](#getversion)                                       | `string`            |  ✅  |   ✅    |   ✅    | ❌  |
| [hasGms()](#hasGms)                                               | `Promise<boolean>`  |  ❌  |   ✅    |   ❌    | ❌  |
| [hasHms()](#hasHms)                                               | `Promise<boolean>`  |  ❌  |   ✅    |   ❌    | ❌  |
| [hasNotch()](#hasNotch)                                           | `boolean`           |  ✅  |   ✅    |   ✅    | ❌  |
| [hasSystemFeature()](#hassystemfeaturefeature)                    | `Promise<boolean>`  |  ❌  |   ✅    |   ❌    | ❌  |
| [isAirplaneMode()](#isairplanemode)                               | `Promise<boolean>`  |  ❌  |   ✅    |   ❌    | ✅  |
| [isBatteryCharging()](#isbatterycharging)                         | `Promise<boolean>`  |  ✅  |   ✅    |   ✅    | ✅  |
| [isEmulator()](#isemulator)                                       | `Promise<boolean>`  |  ✅  |   ✅    |   ✅    | ❌  |
| [isKeyboardConnected()](#iskeyboardconnected)                     | `Promise<bool>`     |  ❌  |   ❌    |   ✅    | ❌  |
| [isLandscape()](#isLandscape)                                     | `Promise<boolean>`  |  ✅  |   ✅    |   ✅    | ❌  |
| [isLocationEnabled()](#isLocationEnabled)                         | `Promise<boolean>`  |  ✅  |   ✅    |   ❌    | ✅  |
| [isMouseConnected()](#ismouseconneted)                            | `Promise<bool>`     |  ❌  |   ❌    |   ✅    | ❌  |
| [isHeadphonesConnected()](#isHeadphonesConnected)                 | `Promise<boolean>`  |  ✅  |   ✅    |   ❌    | ❌  |
| [isPinOrFingerprintSet()](#ispinorfingerprintset)                 | `Promise<boolean>`  |  ✅  |   ✅    |   ✅    | ❌  |
| [isTablet()](#istablet)                                           | `boolean`           |  ✅  |   ✅    |   ✅    | ❌  |
| [isTabletMode()](#istabletmode)                                   | `Promise<bool>`     |  ❌  |   ❌    |   ✅    | ❌  |
| [supported32BitAbis()](#supported32BitAbis)                       | `Promise<string[]>` |  ❌  |   ✅    |   ❌    | ❌  |
| [supported64BitAbis()](#supported64BitAbis)                       | `Promise<string[]>` |  ❌  |   ✅    |   ❌    | ❌  |
| [supportedAbis()](#supportedAbis)                                 | `Promise<string[]>` |  ✅  |   ✅    |   ❌    | ❌  |
| [syncUniqueId()](#syncuniqueid)                                   | `Promise<string>`   |  ✅  |   ❌    |   ❌    | ❌  |

---

### getApiLevel()

Gets the API level.

#### Examples

```js
DeviceInfo.getApiLevel().then((apiLevel) => {
  // iOS: ?
  // Android: 25
  // Windows: ?
});
```

#### Notes

> See [API Levels](https://developer.android.com/guide/topics/manifest/uses-sdk-element.html#ApiLevels)

---

### getAndroidId()

Gets the ANDROID_ID. See [API documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID) for appropriate use.

#### Examples

```js
DeviceInfo.getAndroidId().then((androidId) => {
  // androidId here
});
```

---

### getApplicationName()

Gets the application name.

#### Examples

```js
let appName = DeviceInfo.getApplicationName();
// AwesomeApp
```

---

### getBaseOs()

The base OS build the product is based on.

#### Examples

```js
DeviceInfo.getBaseOs().then((baseOs) => {
  // "Windows", "Android" etc
});
```

---

### getBatteryLevel()

Gets the battery level of the device as a float comprised between 0 and 1.

#### Examples

```js
DeviceInfo.getBatteryLevel().then((batteryLevel) => {
  // 0.759999
});
```

#### Notes

> To be able to get actual battery level enable battery monitoring mode for application.
> Add this code:

```objective-c
[UIDevice currentDevice].batteryMonitoringEnabled = true;
```

> to AppDelegate.m application:didFinishLaunchingWithOptions:
>
> Returns -1 on the iOS Simulator

---

### getBootloader()

The system bootloader version number.

#### Examples

```js
DeviceInfo.getBootloader().then((bootloader) => {
  // "mw8998-002.0069.00"
});
```

---

### getBrand()

Gets the device brand.

#### Examples

```js
let brand = DeviceInfo.getBrand();
// iOS: "Apple"
// Android: "xiaomi"
// Windows: ?
```

---

### getBuildNumber()

Gets the application build number.

#### Examples

```js
let buildNumber = DeviceInfo.getBuildNumber();
// iOS: "89"
// Android: "4"
// Windows: ?
```

---

### getBundleId()

Gets the application bundle identifier.

#### Examples

```js
let bundleId = DeviceInfo.getBundleId();
// "com.example.AwesomeApp"
```

---

### isCameraPresent()

Tells if the device has any camera now.

#### Examples

```js
DeviceInfo.isCameraPresent()
  .then((isCameraPresent) => {
    // true or false
  })
  .catch((cameraAccessException) => {
    // is thrown if a camera device could not be queried or opened by the CameraManager on Android
  });
```

#### Notes

> - Hot add/remove of camera is supported.
> - Returns the status of the physical presence of the camera. If camera present but your app don't have permissions to use it, isCameraPresent will still return the true

---

### getCarrier()

Gets the carrier name (network operator).

#### Examples

```js
DeviceInfo.getCarrier().then((carrier) => {
  // "SOFTBANK"
});
```

---

### getCodename()

The current development codename, or the string "REL" if this is a release build.

#### Examples

```js
DeviceInfo.getCodename().then((codename) => {
  // "REL"
});
```

---

### getDevice()

The name of the industrial design.

#### Examples

```js
DeviceInfo.getDevice().then((device) => {
  // "walleye"
});
```

---

### getDeviceId()

Gets the device ID.

#### Examples

```js
let deviceId = DeviceInfo.getDeviceId();
// iOS: "iPhone7,2"
// Android: "goldfish"
// Windows: "Y3R94UC#AC4"
```

---

### getDisplay()

A build ID string meant for displaying to the user.

#### Examples

```js
DeviceInfo.getDisplay().then((display) => {
  // "OPM2.171026.006.G1"
});
```

---

### getDeviceName()

Gets the device name.

#### Examples

```js
DeviceInfo.getDeviceName().then((deviceName) => {
  // iOS: "Becca's iPhone 6"
  // Android: ?
  // Windows: ?
});
```

This used to require the android.permission.BLUETOOTH but the new implementation in v3 does not need it. You may remove that from your AndroidManifest.xml if you had it for this API.

---

### getDeviceToken()

Gets the device token (see [DeviceCheck](https://developer.apple.com/documentation/devicecheck)). Only available for iOS 11.0+ on real devices.
This will reject the promise when getDeviceToken is not supported, be careful with exception handling.

#### Examples

```js
DeviceInfo.getDeviceToken().then((deviceToken) => {
  // iOS: "a2Jqsd0kanz..."
});
```

---

### getFirstInstallTime()

Gets the time at which the app was first installed, in milliseconds.

#### Examples

```js
DeviceInfo.getFirstInstallTime().then((firstInstallTime) => {
  // Android: 1517681764528
});
```

---

### getFingerprint()

A string that uniquely identifies this build.

#### Examples

```js
DeviceInfo.getFingerprint().then((fingerprint) => {
  // "google/walleye/walleye:8.1.0/OPM2.171026.006.G1/4820017:user/release-keys"
});
```

---

### getFontScale()

Gets the device font scale.
The font scale is the ratio of the current system font to the "normal" font size, so if normal text is 10pt and the system font is currently 15pt, the font scale would be 1.5
This can be used to determine if accessability settings has been changed for the device; you may want to re-layout certain views if the font scale is significantly larger ( > 2.0 )

#### Examples

```js
DeviceInfo.getFontScale().then((fontScale) => {
  // 1.2
});
```

---

### getFreeDiskStorage()

Method that gets available storage size, in bytes, taking into account both root and data file systems calculation.

#### Examples

```js
DeviceInfo.getFreeDiskStorage().then((freeDiskStorage) => {
  // Android: 17179869184
  // iOS: 17179869184
});
```

#### Notes

The API used by this method for Android was changed in [v6.0.0](https://github.com/react-native-device-info/react-native-device-info/releases/tag/v6.0.0). The older version has been maintained below as `getFreeDiskStorageOld()`. On iOS, `getFreeDiskStorage()` and `getFreeDiskStorageOld()` return the same value.

---

### getFreeDiskStorageOld()

Old implementation of method that gets available storage size, in bytes.

#### Examples

```js
DeviceInfo.getFreeDiskStorageOld().then((freeDiskStorage) => {
  // Android: 17179869184
  // iOS: 17179869184
});
```

#### Notes

> From [developer.android.com](<https://developer.android.com/reference/android/os/Environment.html#getExternalStorageDirectory()>):
>
> This method was deprecated in API level 29.
>
> Return the primary shared/external storage directory.
>
> Note: don't be confused by the word "external" here. This directory can better be thought as
> media/shared storage. It is a filesystem that can hold a relatively large amount of data and
> that is shared across all applications (does not enforce permissions). Traditionally this is
> an SD card, but it may also be implemented as built-in storage in a device that is distinct
> from the protected internal storage and can be mounted as a filesystem on a computer.

---

### getHardware()

The name of the hardware (from the kernel command line or /proc).

#### Examples

```js
DeviceInfo.getHardware().then(hardware => {
  // "walleye"
};
```

---

### getHost()

Hostname

#### Examples

```js
DeviceInfo.getHost().then((host) => {
  // "wprd10.hot.corp.google.com"
});
```

---

### getIpAddress()

**Deprecated** Gets the device current IP address. (of wifi only)
Switch to [react-native-netinfo/netinfo](https://github.com/react-native-netinfo/react-native-netinfo) or [react-native-network-info](https://github.com/pusherman/react-native-network-info)

#### Examples

```js
DeviceInfo.getIpAddress().then((ip) => {
  // "92.168.32.44"
});
```

#### Android Permissions

- [android.permission.ACCESS_WIFI_STATE](https://developer.android.com/reference/android/Manifest.permission.html#ACCESS_WIFI_STATE)

#### Notes

> Support for iOS was added in 0.22.0

---

### getIncremental()

The internal value used by the underlying source control to represent this build.

#### Examples

```js
DeviceInfo.getIncremental().then((incremental) => {
  // "4820017"
});
```

---

### getInstallerPackageName()

The internal value used by the underlying source control to represent this build.

#### Examples

```js
DeviceInfo.getInstallerPackageName().then((installerPackageName) => {
  // Play Store: "com.android.vending"
  // Amazon: "com.amazon.venezia"
  // Samsung App Store: "com.sec.android.app.samsungapps"
  // iOS: "AppStore", "TestFlight", "Other"
});
```

---

### getInstallReferrer()

Gets the referrer string upon application installation.

#### Examples

```js
DeviceInfo.getInstallReferrer().then((installReferrer) => {
  // If the app was installed from https://play.google.com/store/apps/details?id=com.myapp&referrer=my_install_referrer
  // the result will be "my_install_referrer"
});
```

---

### getInstanceId()

Gets the application instance ID.

#### Examples

```js
DeviceInfo.getInstanceId().then((instanceId) => {
  // Android: ?
});
```

#### Notes

> See https://developers.google.com/instance-id/

---

### getLastUpdateTime()

Gets the time at which the app was last updated, in milliseconds.

#### Examples

```js
DeviceInfo.getLastUpdateTime().then((lastUpdateTime) => {
  // Android: 1517681764992
});
```

---

### getMacAddress()

Gets the network adapter MAC address.

#### Examples

```js
DeviceInfo.getMacAddress().then((mac) => {
  // "E5:12:D8:E5:69:97"
});
```

#### Android Permissions

- [android.permission.ACCESS_WIFI_STATE](https://developer.android.com/reference/android/Manifest.permission.html#ACCESS_WIFI_STATE)

#### Notes

> iOS: This method always return "02:00:00:00:00:00" as retrieving the MAC address is [disabled since iOS 7](https://developer.apple.com/library/archive/releasenotes/General/WhatsNewIniOS/Articles/iOS7.html#//apple_ref/doc/uid/TP40013162-SW34)

---

### getManufacturer()

Gets the device manufacturer.

#### Examples

```js
DeviceInfo.getManufacturer().then((manufacturer) => {
  // iOS: "Apple"
  // Android: "Google"
  // Windows: ?
});
```

---

### getMaxMemory()

Returns the maximum amount of memory that the VM will attempt to use, in bytes.

#### Examples

```js
DeviceInfo.getMaxMemory().then((maxMemory) => {
  // 402653183
});
```

---

### getModel()

Gets the device model.

**iOS warning:** The list with device names is maintained by the community and could lag new devices. It is recommended to use `getDeviceId()` since it's more reliable and always up-to-date with new iOS devices. We do accept pull requests that add new iOS devices to the list with device names.

#### Examples

```js
let model = DeviceInfo.getModel();
// iOS: ?
// Android: ?
// Windows: ?
```

---

### getPhoneNumber()

Gets the device phone number.

#### Examples

```js
DeviceInfo.getPhoneNumber().then((phoneNumber) => {
  // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
});
```

#### Android Permissions

- [android.permission.READ_PHONE_STATE](https://developer.android.com/reference/android/Manifest.permission.html#READ_PHONE_STATE)

#### Notes

> This can return `undefined` in certain cases and should not be relied on. [SO entry on the subject](https://stackoverflow.com/questions/2480288/programmatically-obtain-the-phone-number-of-the-android-phone#answer-2480307).

---

### getPowerState()

Gets the power state of the device including the battery level, whether it is plugged in, and if the system is currently operating in low power mode.
Displays a warning on iOS if battery monitoring not enabled, or if attempted on an emulator (where monitoring is not possible)

#### Examples

```js
DeviceInfo.getPowerState().then((state) => {
  // {
  //   batteryLevel: 0.759999,
  //   batteryState: 'unplugged',
  //   lowPowerMode: false,
  // }
});
```

---

### getProduct()

The name of the overall product.

#### Examples

```js
DeviceInfo.getProduct().then((product) => {
  // "walleye"
});
```

---

### getPreviewSdkInt()

The developer preview revision of a prerelease SDK.

#### Examples

```js
DeviceInfo.getPreviewSdkInt().then((previewSdkInt) => {
  // 0
});
```

---

### getReadableVersion()

Gets the application human readable version (same as getVersion() + '.' + getBuildNumber())

#### Examples

```js
let readableVersion = DeviceInfo.getReadableVersion();
// iOS: 1.0.1.32
// Android: 1.0.1.234
// Windows: ?
```

---

### getSerialNumber()

Gets the device serial number. Will be 'unknown' in almost all cases [unless you have a privileged app and you know what you're doing](<https://developer.android.com/reference/android/os/Build.html#getSerial()>).

#### Examples

```js
DeviceInfo.getSerialNumber().then((serialNumber) => {
  // iOS: unknown
  // Android: ? (maybe a serial number, if your app is privileged)
  // Windows: ? (a serial number, if your app has the "capability smbios")
});
```
## Notes
### capability smbios
If you want to use this method in windows, you have to add smbios capability in your aplication. Please following this [documentation](https://docs.microsoft.com/en-us/windows/win32/sysinfo/access-smbios-information-from-a-universal-windows-app) for add the capability in your manifest file.

---

### getSecurityPatch()

The user-visible security patch level.

#### Examples

```js
DeviceInfo.getSecurityPatch().then((securityPatch) => {
  // "2018-07-05"
});
```

---

### getSystemName()

Gets the device OS name.

#### Examples

```js
let systemName = DeviceInfo.getSystemName();
// iOS: "iOS" on newer iOS devices "iPhone OS" on older devices, including older iPad's.
// Android: "Android"
// Windows: ?
```

---

### getSystemVersion()

Gets the device OS version.

#### Examples

```js
let systemVersion = DeviceInfo.getSystemVersion();
// iOS: "11.0"
// Android: "7.1.1"
// Windows: ?
```

---

### getBuildId()

Gets build number of the operating system.

#### Examples

```js
DeviceInfo.getBuildId().then((buildId) => {
  // iOS: "12A269"
  // tvOS: not available
  // Android: "13D15"
  // Windows: not available
});
```

---

### getTags()

Comma-separated tags describing the build.

#### Examples

```js
DeviceInfo.getTags().then((tags) => {
  // "release-keys, unsigned, debug",
});
```

---

### getType()

The type of build.

#### Examples

```js
DeviceInfo.getType().then((type) => {
  // "user", "eng"
});
```

---

### getTotalDiskCapacity()

Method that gets full disk storage size, in bytes, taking into account both root and data file systems calculation.

#### Examples

```js
DeviceInfo.getTotalDiskCapacity().then((capacity) => {
  // Android: 17179869184
  // iOS: 17179869184
});
```

#### Notes

The API used by this method for Android was changed in [v6.0.0](https://github.com/react-native-device-info/react-native-device-info/releases/tag/v6.0.0). The older version has been maintained below as `getTotalDiskCapacityOld()`. On iOS, `getTotalDiskCapacity()` and `getTotalDiskCapacityOld()` return the same value.

---

### getTotalDiskCapacityOld()

Old implementation of method that gets full disk storage size, in bytes.

#### Examples

```js
DeviceInfo.getTotalDiskCapacityOld().then((capacity) => {
  // Android: 17179869184
  // iOS: 17179869184
});
```

---

### getTotalMemory()

Gets the device total memory, in bytes.

#### Examples

```js
DeviceInfo.getTotalMemory().then((totalMemory) => {
  // 1995018240
});
```

---

### getUniqueId()

This is a constant and may be referenced directly

Gets the device unique ID.
On Android it is currently identical to `getAndroidId()` in this module.
On iOS it uses the `DeviceUID` uid identifier.
On Windows it uses `Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation.id`.

#### Examples

```js
let uniqueId = DeviceInfo.getUniqueId();
// iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
// Android: "dd96dec43fb81c97"
// Windows: ?
```

#### Notes

> - iOS: This is [`IDFV`](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) or a random string if IDFV is unavaliable. Once UID is generated it is stored in iOS Keychain and NSUserDefaults. So it would stay the same even if you delete the app or reset IDFV. You can _carefully_ consider it a persistent, cross-install unique ID. It can be changed only in case someone manually override values in Keychain/NSUserDefaults or if Apple would change Keychain and NSUserDefaults implementations.
>   Beware: The IDFV is calculated using your bundle identifier and thus will be different in app extensions.
> - android: Prior to Oreo, this id ([ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID)) will always be the same once you set up your phone.

---

### syncUniqueId()

This method is intended for iOS.

This synchronizes uniqueId with [`IDFV`](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) or sets new a random string.

On iOS it uses the `DeviceUID` uid identifier.
On other platforms it just call `getUniqueId()` in this module.

#### Examples

```js
DeviceInfo.syncUniqueId().then((uniqueId) => {
  // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
  // Android: "dd96dec43fb81c97"
  // Windows: ?
});
```

#### Notes

> - If user moved or restored data from one iOS device to second iOS device then he will have two different devices with same `uniqueId` in Keychain/NSUserDefaults. User can call `syncUniqueId()` on new iOS device. That will update his `uniqueId` from [`IDFV`](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) or a random string.

---

### getUsedMemory()

Gets the app memory usage, in bytes.

⚠️ [A note from the Android docs.](https://developer.android.com/reference/android/app/ActivityManager#getProcessMemoryInfo(int%5B%5D))
> Note: this method is only intended for debugging or building a user-facing process management UI.

#### Examples

```js
DeviceInfo.getUsedMemory().then((usedMemory) => {
  // 23452345
});
```

---

### getUserAgent()

Gets the device User Agent.

#### Examples

```js
DeviceInfo.getUserAgent().then((userAgent) => {
  // iOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143"
  // tvOS: not available
  // Android: ?
  // Windows: ?
});
```

---

### getVersion()

Gets the application version.

#### Examples

```js
let version = DeviceInfo.getVersion();
// iOS: "1.0"
// Android: "1.0"
// Windows: ?
```

---

### isAirplaneMode()

Tells if the device is in Airplane Mode.

#### Examples

```js
DeviceInfo.isAirplaneMode().then((airplaneModeOn) => {
  // false
});
```

#### Notes

> - This only works if the remote debugger is disabled.

---

### isBatteryCharging()

Tells if the battery is currently charging.

#### Examples

```js
DeviceInfo.isBatteryCharging().then((isCharging) => {
  // true or false
});
```

---

### isEmulator()

Tells if the application is running in an emulator.

#### Examples

```js
DeviceInfo.isEmulator().then((isEmulator) => {
  // false
});
```

---

### isKeyboardConnected()

Tells if the device has a keyboard connected.

#### Examples

```js
let isKeyboardConnected = DeviceInfo.isKeyboardConnected();
// true
```

---

### isPinOrFingerprintSet()

Tells if a PIN number or a fingerprint was set for the device.

#### Examples

```js
DeviceInfo.isPinOrFingerprintSet().then((isPinOrFingerprintSet) => {
  if (!isPinOrFingerprintSet) {
    // ...
  }
});
```

---

### isTablet()

Tells if the device is a tablet.

#### Examples

```js
let isTablet = DeviceInfo.isTablet();
// true
```

---

### isTabletMode()

Tells if the device is in tablet mode.

#### Examples

```js
let isTabletMode = DeviceInfo.isTabletMode();
// true
```

---

### isLandscape()

Tells if the device is currently in landscape mode.

#### Examples

```js
DeviceInfo.isLandscape().then((isLandscape) => {
  // true
});
```

---

### isMouseConnected()

Tells if the device has a mouse connected.

#### Examples

```js
let isMouseConnected = DeviceInfo.isMouseConnected();
// true
```

---

### hasGms()

Tells if the device supports Google Mobile Services.

#### Examples

```js
DeviceInfo.hasGms().then((hasGms) => {
  // true
});
```

---

### hasHms()

Tells if the device supports Huawei Mobile Services.

#### Examples

```js
DeviceInfo.hasHms().then((hasHms) => {
  // true
});
```

---

### hasNotch()

Tells if the device has a notch.

#### Examples

```js
let hasNotch = DeviceInfo.hasNotch();
// true
```

---

### getDeviceType()

Returns the device's type as a string, which will be one of:

- `Handset`
- `Tablet`
- `Tv`
- `Desktop`
- `GamingConsole`
- `unknown`

#### Examples

```js
let type = DeviceInfo.getDeviceType();
// 'Handset'
```

---

### supported32BitAbis()

An ordered list of 32 bit ABIs supported by this device.

#### Examples

```js
DeviceInfo.supported32BitAbis().then((abis) => {
  // ["armeabi-v7a", "armeabi"]
});
```

---

### supported64BitAbis()

An ordered list of 64 bit ABIs supported by this device.

#### Examples

```js
DeviceInfo.supported64BitAbis().then((abis) => {
  // ["arm64-v8a"]
});
```

---

### supportedAbis()

Returns a list of supported processor architecture version

#### Examples

```js
DeviceInfo.supportedAbis().then((abis) => {
  // [ "arm64 v8", "Intel x86-64h Haswell", "arm64-v8a", "armeabi-v7a", "armeabi" ]
});
```

---

### hasSystemFeature(feature)

Tells if the device has a specific system feature.

#### Examples

```js
DeviceInfo.hasSystemFeature('amazon.hardware.fire_tv').then((hasFeature) => {
  // true or false
});
```

---

### getSystemAvailableFeatures()

Returns a list of available system features on Android.

#### Examples

```js
DeviceInfo.getSystemAvailableFeatures().then((features) => {
  // ["android.software.backup", "android.hardware.screen.landscape", "android.hardware.wifi", ...]
});
```

### isLocationEnabled()

Tells if the device has location services turned off at the device-level (NOT related to app-specific permissions)

#### Examples

```js
DeviceInfo.isLocationEnabled().then((enabled) => {
  // true or false
});
```

### isHeadphonesConnected()

Tells if the device is connected to wired headset or bluetooth headphones

#### Examples

```js
DeviceInfo.isHeadphonesConnected().then((enabled) => {
  // true or false
});
```

### getAvailableLocationProviders()

Returns an object of **platform-specfic** location providers/servcies, with `boolean` value whether or not they are currently available.

> NOTE: This function requires access to the Location permission on Android

#### Android Example

```js
DeviceInfo.getAvailableLocationProviders().then((providers) => {
  // {
  //   gps: true
  //   network: true
  //   passive: true
  // }
});
```

#### iOS Example

```js
DeviceInfo.getAvailableLocationProviders().then((providers) => {
  // {
  //   headingAvailable: false
  //   isRangingAvailable: false
  //   locationServicesEnabled: true
  //   significantLocationChangeMonitoringAvailable: true
  // }
});
```

## Hooks & Events

Currently iOS & Android only (web support for battery/charging-related APIs).

### useBatteryLevel or RNDeviceInfo_batteryLevelDidChange

Fired when the battery level changes; sent no more frequently than once per minute.

#### Examples

```js
import { useBatteryLevel } from 'react-native-device-info';

const batteryLevel = useBatteryLevel(); // 0.759999

<Text>{batteryLevel}</Text>;
```

```js
import { NativeEventEmitter, NativeModules } from 'react-native';
const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

deviceInfoEmitter.addListener('RNDeviceInfo_batteryLevelDidChange', (level) => {
  // 0.759999
});
```

---

### useBatteryLevelIsLow or RNDeviceInfo_batteryLevelIsLow

Fired when the battery drops is considered low

| Platform | Percentage |
| -------- | ---------- |
| iOS      | 20         |
| Android  | 15         |
| Web      | 20         |

#### Examples

```js
import { useBatteryLevelIsLow } from 'react-native-device-info';

const batteryLevelIsLow = useBatteryLevelIsLow(); // 0.19

<Text>{batteryLevelIsLow}</Text>;
```

```js
import { NativeEventEmitter, NativeModules } from 'react-native';
const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

deviceInfoEmitter.addListener('RNDeviceInfo_batteryLevelIsLow', (level) => {
  // 0.19
});
```

---

### usePowerState or RNDeviceInfo_powerStateDidChange

Fired when the battery state changes, for example when the device enters charging mode or is unplugged.

#### Examples

```js
import { usePowerState } from 'react-native-device-info';

const powerState = usePowerState(); // 'charging'

<Text>{powerState}</Text>;
```

```js
import { NativeEventEmitter, NativeModules } from 'react-native'
const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo)

deviceInfoEmitter.addListener('RNDeviceInfo_powerStateDidChange', { batteryState } => {
  // 'charging'
});
```

---

### useFirstInstallTime

Gets the time at which the app was first installed, in milliseconds.

#### Example

```jsx
import { useFirstInstallTime } from 'react-native-device-info';

const { loading, result } = useFirstInstallTime(); // { loading: true, result: 1517681764528}

<Text>{loading ? 'loading...' : result}</Text>;
```

---

### useDeviceName

Gets the device name.

#### Example

```jsx
import { useDeviceName } from 'react-native-device-info';

const { loading, result } = useDeviceName(); // { loading: true, result: "Becca's iPhone 6"}

<Text>{loading ? 'loading...' : result}</Text>;
```

---

### useHasSystemFeature

Tells if the device has a specific system feature.

#### Example

```jsx
import { useHasSystemFeature } from 'react-native-device-info';

const { loading, result } = useHasSystemFeature('amazon.hardware.fire_tv'); // { loading: true, result: false }

<Text>{loading ? 'loading...' : result}</Text>;
```

---

### useIsEmulator

Get whether the application is running in an emulator.

#### Example

```jsx
import { useIsEmulator } from 'react-native-device-info';

const { loading, result } = useIsEmulator(); // { loading: true, result: false }

<Text>{loading ? 'loading...' : result}</Text>;
```

---

### useManufacturer

Gets the device manufacturer.

#### Example

```jsx
import { useManufacturer } from 'react-native-device-info';

const { loading, result } = useManufacturer(); // { loading: true, result: "Apple"}

<Text>{loading ? 'loading...' : result}</Text>;
```

---

### useIsHeadphonesConnected

Tells if the device is connected to wired headset or bluetooth headphones.

This hook subscribes to the event, `RNDeviceInfo_headphoneConnectionDidChange` , and updates the `result` field accordingly.

#### Example

```jsx
import { useIsHeadphonesConnected } from 'react-native-device-info';

const { loading, result } = useIsHeadphonesConnected(); // { loading: true, result: false}

<Text>{loading ? 'loading...' : result}</Text>;
```

=======

## Native interoperatibily

If you need to check for device type from the native side, you can use the following:

```java
import com.learnium.resolver.DeviceTypeResolver

...
deviceTypeResolver = new DeviceTypeResolver(context);
...
//Check if the device is a Tablet:
if(deviceTypeResolver.isTablet){
  ...
}else{
  ...
}
```

## Troubleshooting

When installing or using `react-native-device-info`, you may encounter the following problems:

<details>
  <summary>[android] - Unable to merge dex / Multiple dex files / Problems with `com.google.android.gms`</summary>

`react-native-device-info` uses `com.google.android.gms:play-services-gcm` to provide [getInstanceId()](#getinstanceid).
This can lead to conflicts when building the Android application.

If you're using a different version of `com.google.android.gms:play-services-gcm` in your app, you can define the
`googlePlayServicesVersion` gradle variable in your `build.gradle` file to tell `react-native-device-info` what version
it should require. See the example project included here for a sample.

If you're using a different library that conflicts with `com.google.android.gms:play-services-gcm`, and you are certain you know what you are doing such that you will avoid version conflicts, you can simply
ignore this dependency in your gradle file:

```groovy
 compile(project(':react-native-device-info')) {
    exclude group: 'com.google.android.gms'
}
```

</details>

<details>
  <summary>[ios] - ld: library not found for -lRNDeviceInfo-tvOS</summary>

Seems to be a bug caused by `react-native link`. You can manually delete `libRNDeviceInfo-tvOS.a` in `Xcode -> [Your iOS build target] -> Build Phrases -> Link Binary with Libraries`.

</details>

<details>
  <summary>[ios] - [NetworkInfo] Descriptors query returned error: Error Domain=NSCocoaErrorDomain Code=4099
 “The connection to service named com.apple.commcenter.coretelephony.xpc was invalidated.”</summary>

This is a system level log that may be turned off by executing:
`xcrun simctl spawn booted log config --mode "level:off" --subsystem com.apple.CoreTelephony`.
To undo the command, you can execute:
`xcrun simctl spawn booted log config --mode "level:info" --subsystem com.apple.CoreTelephony`

</details>

<details>
  <summary>[ios] - Multiple versions of React when using CocoaPods
  "tries to require 'react-native' but there are several files providing this module"</summary>

### RN<=59 You may need to adjust your Podfile like this if you use Cocoapods and have undefined symbols or duplicate React definitions

```ruby
target 'yourTargetName' do
  # See http://facebook.github.io/react-native/docs/integration-with-existing-apps.html#configuring-cocoapods-dependencies
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # Include this for RN >= 0.47
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # Needed for debugging
    'RCTAnimation', # Needed for FlatList and animations running on native UI thread
    # Add any other subspecs you want to use in your project
  ]

  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

  # Third party deps podspec link - you may have multiple pods here, just an example
  pod 'RNDeviceInfo', path: '../node_modules/react-native-device-info'

end

# if you see errors about React duplicate definitions, this fixes it. The same works for yoga.
post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == "React"
      target.remove_from_project
    end
  end
end
```

</details>

<details>
  <summary>[tests] - Cannot run my test suite when using this library</summary>

`react-native-device-info` contains native code, and needs to be mocked. Jest Snapshot support may work though.

If you do not have a Jest Setup file configured, you should add the following to your Jest settings and create the jest.setup.js file in project root:

```js
setupFiles: ['<rootDir>/jest.setup.js'];
```

You should then add the following to your Jest setup file to mock the DeviceInfo Native Module:

```js
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

jest.mock('react-native-device-info', () => mockRNDeviceInfo);
```

Checkout the example project for more information.

</details>
<details>
    <summary>[warnings] - I get too many warnings (battery state, etc)</summary>

Some of the APIs (like getBatteryState) will throw warnings in certain conditions like on tvOS or the iOS emulator. This won't be visible in production but even in development it may be irritating. It is useful to have the warnings because these devices return no state, and that can be surprising, leading to github support issues. The warnings is intended to educate you as a developer. If the warnings are troublesome you may try this in your code to suppress them:

```javascript
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Battery state']);
```

</details>

## Release Notes

See the [CHANGELOG.md](https://github.com/react-native-device-info/react-native-device-info/blob/master/CHANGELOG.md).

## Contributing

Please see the [`contributing guide`](/CONTRIBUTING.md).

## react-native-dom

As a courtesy to developers, this library was made compatible in v0.21.6 with [react-native-dom](https://github.com/vincentriemer/react-native-dom) and [react-native-web](https://github.com/necolas/react-native-web) by providing an empty polyfill in order to avoid breaking builds.

Only [getUserAgent()](#getuseragent) will return a correct value. All other API methods will return an "empty" value of its documented return type: `0` for numbers, `''` for strings, `false` for booleans.
