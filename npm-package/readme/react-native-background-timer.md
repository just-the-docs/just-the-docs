# React Native Background Timer
Emit event periodically (even when app is in the background).

## Installation
1. If you use Expo to create a project [you'll just need to](https://facebook.github.io/react-native/docs/getting-started#caveats) "[eject](https://docs.expo.io/versions/latest/expokit/eject)".

    ```bash
    expo eject
    ```

2. Install React Native Background Timer package.

    ```bash
    yarn add react-native-background-timer
    # or using npm
    npm install react-native-background-timer --save
    ```

3. Link React Native Background Timer library. This step is not necessary when you use React Native >= 0.60 (and your app is not ejected from Expo).

    ```bash
    react-native link react-native-background-timer
    ```

4. If you use CocoaPods or React Native >= 0.60 (and your app is not ejected from Expo) or your app is ejected from Expo, then before running your app on iOS, make sure you have CocoaPods installed and run:

    ```bash
    cd ios
    pod install
    ```

Link the library manually if you get errors:

- Android: `TypeError: Cannot read property 'setTimeout' of undefined` or `TypeError: null is not an object (evaluating 'RNBackgroundTimer.setTimeout')`
- iOS: `Native module cannot be null`

<details>
    <summary>Android manual linking</summary>

- `android/settings.gradle`

    ```diff
    + include ':react-native-background-timer'
    + project(':react-native-background-timer').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-background-timer/android')
    ```

- `android/app/build.gradle`

    ```diff
    dependencies {
    +   implementation project(':react-native-background-timer')
    }
    ```

- `android/app/src/main/java/com/your-app/MainApplication.java`

    ```diff
    + import com.ocetnik.timer.BackgroundTimerPackage;

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
    +   new BackgroundTimerPackage()
      );
    }
    ```
</details>

<details>
  <summary>iOS manual linking</summary>

- `ios/Podfile`

    ```diff
    + pod 'react-native-background-timer', :path => '../node_modules/react-native-background-timer'
    ```
</details>

## Usage

```js
import BackgroundTimer from 'react-native-background-timer';
```

### Crossplatform
To use the same code both on Android and iOS use runBackgroundTimer() and stopBackgroundTimer(). There can be used only one background timer to keep code consistent.

```js
BackgroundTimer.runBackgroundTimer(() => { 
//code that will be called every 3 seconds 
}, 
3000);
//rest of code will be performing for iOS on background too

BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
```

### iOS
After iOS update logic of background task little bit changed. So we can't use as it was. 
You have to use only start() and stop() without parameters. And all code that is performing will continue performing on background including all setTimeout() timers.

Example:
```js
BackgroundTimer.start();
// Do whatever you want incuding setTimeout;
BackgroundTimer.stop();
```

> If you call stop() on background no new tasks will be started!
> Don't call .start() twice, as it stop performing previous background task and starts new. 
> If it will be called on backgound no tasks will run.

### Android
You can use the `setInterval` and `setTimeout` functions.
This API is identical to that of `react-native` and can be used to quickly replace existing timers
with background timers.

```js
// Start a timer that runs continuous after X milliseconds
const intervalId = BackgroundTimer.setInterval(() => {
	// this will be executed every 200 ms
	// even when app is the the background
	console.log('tic');
}, 200);

// Cancel the timer when you are done with it
BackgroundTimer.clearInterval(intervalId);
```

```js
// Start a timer that runs once after X milliseconds
const timeoutId = BackgroundTimer.setTimeout(() => {
	// this will be executed once after 10 seconds
	// even when app is the the background
  	console.log('tac');
}, 10000);

// Cancel the timeout if necessary
BackgroundTimer.clearTimeout(timeoutId);
```

### Obsolete
Obsolete usage which doesn't support multiple background timers.

```js
import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform,
} from 'react-native';

import BackgroundTimer from 'react-native-background-timer';
```

```js
const EventEmitter = Platform.select({
  ios: () => NativeAppEventEmitter,
  android: () => DeviceEventEmitter,
})();
```

```js
// start a global timer
BackgroundTimer.start(5000); // delay in milliseconds only for Android
```
```js
// listen for event
EventEmitter.addListener('backgroundTimer', () => {
	// this will be executed once after 5 seconds
	console.log('toe');
});
```
```js
// stop the timer
BackgroundTimer.stop();
```
