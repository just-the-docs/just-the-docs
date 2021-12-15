# Cordova Push Notifications Plugin for Android, iOS, WP8, Windows8, BlackBerry 10 and Amazon Fire OS

## DESCRIPTION

This plugin is for use with [Cordova](http://incubator.apache.org/cordova/), and allows your application to receive push notifications on Amazon Fire OS, Android, iOS, Windows Phone and Windows8 devices.
* The Amazon Fire OS implementation uses [Amazon's ADM(Amazon Device Messaging) service](https://developer.amazon.com/sdk/adm.html).
* The Android implementation uses [Google's GCM (Google Cloud Messaging) service](http://developer.android.com/guide/google/gcm/index.html).
* The BlackBerry 10 version  uses [blackberry push service](https://developer.blackberry.com/devzone/develop/platform_services/push_service_overview.html).
* The iOS version is based on [Apple APNS Notifications](http://developer.apple.com/library/mac/#documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/ApplePushService/ApplePushService.html).
* The WP8 implementation is based on [MPNS](http://msdn.microsoft.com/en-us/library/windowsphone/develop/ff402558(v=vs.105).aspx).
* Windows8 uses [Microsoft WNS Notifications](http://msdn.microsoft.com/en-us/library/windows/apps/hh913756.aspx).

**Important** - Push notifications are intended for real devices. They are not tested for WP8 Emulator. The registration process will fail on the iOS simulator. Notifications can be made to work on the Android Emulator, however doing so requires installation of some helper libraries, as outlined [here,](http://www.androidhive.info/2012/10/android-push-notifications-using-google-cloud-messaging-gcm-php-and-mysql/) under the section titled "Installing helper libraries and setting up the Emulator".

### Contents

- [LICENSE](#license)
- [Manual Installation](#manual_installation)
- [Automatic Installation](#automatic_installation)
- [Plugin API](#plugin_api)
- [Testing](#testing)
- [Additional Resources](#additional_resources)
- [Acknowledgments](#acknowledgments)



##<a name="license"></a> LICENSE

  The MIT License

  Copyright (c) 2012 Adobe Systems, inc.
  portions Copyright (c) 2012 Olivier Louvignes

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.




##<a name="manual_installation"></a>Manual Installation

### Manual Installation for Amazon Fire OS

1) Install the ADM library

- Download the [Amazon Mobile App SDK](https://developer.amazon.com/public/resources/development-tools/sdk) and unzip.
- Create a folder called `ext_libs` in your project's `platforms/amazon-fireos` folder.
- Copy `amazon-device-messaging-x.x.x.jar` into the `ext_libs` folder above.
- Create a new text file called `ant.properties` in the `platforms/amazon-fireos` folder, and add a java.compiler.classpath entry pointing at the library. For example: `java.compiler.classpath=./ext_libs/amazon-device-messaging-1.0.1.jar`


2) Copy the contents of the Push Notification Plugin's `src/amazon/com` folder to your project's `platforms/amazon-fireos/src/com` folder.

3) Modify your `AndroidManifest.xml` and add the following lines to your manifest tag:

```xml
<permission android:name="$PACKAGE_NAME.permission.RECEIVE_ADM_MESSAGE" android:protectionLevel="signature" />
<uses-permission android:name="$PACKAGE_NAME.permission.RECEIVE_ADM_MESSAGE" />
<uses-permission android:name="com.amazon.device.messaging.permission.RECEIVE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

4) Modify your `AndroidManifest.xml` and add the following **activity**, **receiver** and **service** tags to your **application** section.

```xml
<amazon:enable-feature android:name="com.amazon.device.messaging" android:required="true"/>
<service android:exported="false" android:name="com.amazon.cordova.plugin.ADMMessageHandler" />
<activity android:name="com.amazon.cordova.plugin.ADMHandlerActivity" />
<receiver android:name="com.amazon.cordova.plugin.ADMMessageHandler$Receiver" android:permission="com.amazon.device.messaging.permission.SEND">
  <intent-filter>
          <action android:name="com.amazon.device.messaging.intent.REGISTRATION" />
                <action android:name="com.amazon.device.messaging.intent.RECEIVE" />
                <category android:name="$PACKAGE_NAME" />
  </intent-filter>
</receiver>
```

5) If you are using Cordova 3.4.0 or earlier, modify your `AndroidManifest.xml` and add "amazon" XML namespace to <manifest> tag:

```xml
xmlns:amazon="http://schemas.amazon.com/apk/res/android"
```

6) Modify `res/xml/config.xml` to add a reference to PushPlugin:

```xml
<feature name="PushPlugin" >
  <param name="android-package" value="com.amazon.cordova.plugin.PushPlugin"/>
</feature>
```

7) Modify `res/xml/config.xml` to set config options to let Cordova know whether to display ADM message in the notification center or not. If not, provide the default message. By default, message will be visible in the notification. These config options are used if message arrives and app is not in the foreground (either killed or running in the background).

```xml
<preference name="showmessageinnotification" value="true" />
<preference name="defaultnotificationmessage" value="New message has arrived!" />
```

8) Create an file called `api_key.txt` in the platforms/amazon-fireos/assets folder containing the API Key from the "Security Profile Android/Kindle Settings" tab on the [Amazon Developer Portal](https://developer.amazon.com/sdk/adm.html). For detailed steps on how to register for ADM please refer to section below: [Registering your app for Amazon Device Messaging (ADM)](#registering_for_adm)



### Manual Installation for Android

1) Install GCM support files

- copy the contents of `src/android/com/` to your project's `src/com/` folder.
- copy the contents of `libs/` to your `libs/` folder.
- copy `{android_sdk_path}/extras/android/support/v13/android-support-v13.jar` to your `libs/` folder.

The final hierarchy will likely look something like this:

  {project_folder}
    libs
      gcm.jar
      android-support-v13.jar
      cordova-3.4.0.jar
    src
      com
        plugin
          gcm
            CordovaGCMBroadcastReceiver.java
            GCMIntentService.java
            PushHandlerActivity.java
            PushPlugin.java
        {company_name}
          {intent_name}
            {intent_name}.java

2) Modify your `AndroidManifest.xml` and add the following lines to your manifest tag:

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<permission android:name="$PACKAGE_NAME.permission.C2D_MESSAGE" android:protectionLevel="signature" />
<uses-permission android:name="$PACKAGE_NAME.permission.C2D_MESSAGE" />
```

3) Modify your `AndroidManifest.xml` and add the following **activity**, **receiver** and **service** tags to your **application** section. (See the Sample_AndroidManifest.xml file in the Example folder.)

```xml
<activity android:name="com.plugin.gcm.PushHandlerActivity"/>
<receiver android:name="com.plugin.gcm.CordovaGCMBroadcastReceiver" android:permission="com.google.android.c2dm.permission.SEND" >
  <intent-filter>
    <action android:name="com.google.android.c2dm.intent.RECEIVE" />
    <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
    <category android:name="$PACKAGE_NAME" />
  </intent-filter>
</receiver>
<service android:name="com.plugin.gcm.GCMIntentService" />
```

4) Check that the launch mode for the main Cordova Activity is one of the **[singleXXX](http://developer.android.com/guide/topics/manifest/activity-element.html#lmode)** options in **AndroidManifest.xml**.

```xml
<activity ... android:launchMode="singleTop">
```

Otherwise a new activity instance, with a new webview, will be created when activating the notifications.

5) Modify your `res/xml/config.xml` to include the following line in order to tell Cordova to include this plugin and where it can be found: (See the Sample_config.xml file in the Example folder)

```xml
<feature name="PushPlugin">
  <param name="android-package" value="com.plugin.gcm.PushPlugin" />
</feature>
```

6) Add the `PushNotification.js` script to your assets/www folder (or javascripts folder, wherever you want really) and reference it in your main index.html file. This file's usage is described in the **Plugin API** section below.

```html
<script type="text/javascript" charset="utf-8" src="PushNotification.js"></script>
```

### Manual Installation for iOS

Copy the following files to your project's Plugins folder:

```
AppDelegate+notification.h
AppDelegate+notification.m
PushPlugin.h
PushPlugin.m
```

Add a reference for this plugin to the plugins section in `config.xml`:

```xml
<feature name="PushPlugin">
  <param name="ios-package" value="PushPlugin" />
</feature>
```

Add the `PushNotification.js` script to your assets/www folder (or javascripts folder, wherever you want really) and reference it in your main index.html file.

```html
<script type="text/javascript" charset="utf-8" src="PushNotification.js"></script>
```

### Manual Installation for WP8

Copy the following files to your project's Commands folder and add it to the VS project:

```
PushPlugin.cs
```

Add a reference to this plugin in `config.xml`:

```xml
<feature name="PushPlugin">
  <param name="wp-package" value="PushPlugin" />
</feature>
```

Add the `PushNotification.js` script to your assets/www folder (or javascripts folder, wherever you want really) and reference it in your main index.html file.
```html
<script type="text/javascript" charset="utf-8" src="PushNotification.js"></script>
```

Do not forget to reference the `cordova.js` as well.

<script  type="text/javascript" charset="utf-8" src="cordova.js"></script>

In your Visual Studio project add reference to the `Newtonsoft.Json.dll` as well - it is needed for serialization and deserialization of the objects.

Also you need to enable the **"ID_CAP_PUSH_NOTIFICATION"** capability in **Properties->WMAppManifest.xml** of your project.

### Manual Installation for Windows8

Add the `src/windows8/PushPluginProxy.js` script to your `www` folder and reference it in your main index.html file.
```html
<script type="text/javascript" charset="utf-8" src="PushPluginProxy.js"></script>
```

Do not forget to reference the `cordova.js` as well.

<script  type="text/javascript" charset="utf-8" src="cordova.js"></script>

To receive toast notifications additional [toastCapable=’true’](http://msdn.microsoft.com/en-us/library/windows/apps/hh781238.aspx) attribute is required to be manually added in manifest file.



##<a name="automatic_installation"></a>Automatic Installation

Below are the methods for installing this plugin automatically using command line tools. For additional info, take a look at the [Plugman Documentation](https://github.com/apache/cordova-plugman/blob/master/README.md) and [Cordova Plugin Specification](https://github.com/alunny/cordova-plugin-spec).

**Note:** For each service supported - ADM, APNS, GCM or MPNS - you may need to download the SDK and other support files. See the [Manual Installation](#manual_installation) instructions below for more details about each platform.

### Cordova

The plugin can be installed via the Cordova command line interface:

1) Navigate to the root folder for your phonegap project. 2) Run the command.

```sh
cordova plugin add https://github.com/phonegap-build/PushPlugin.git
```

### Phonegap

The plugin can be installed using the Phonegap command line interface:

1) Navigate to the root folder for your phonegap project. 2) Run the command.

```sh
phonegap local plugin add https://github.com/phonegap-build/PushPlugin.git
```

### Plugman

The plugin is based on [plugman](https://github.com/apache/cordova-plugman) and can be installed using the Plugman command line interface:

```sh
plugman install --platform [PLATFORM] --project [TARGET-PATH] --plugin [PLUGIN-PATH]

where
  [PLATFORM] = ios, amazon-fireos, android, wp8, windows8 or blackberry10
  [TARGET-PATH] = path to folder containing your phonegap project
  [PLUGIN-PATH] = path to folder containing this plugin
```





##<a name="plugin_api"></a> Plugin API

In the plugin `examples` folder you will find a sample implementation showing how to interact with the PushPlugin. Modify it to suit your needs.

#### pushNotification
The plugin instance variable.

```js
var pushNotification;

document.addEventListener("deviceready", function(){
    pushNotification = window.plugins.pushNotification;
    ...
});
```

#### register
To be called as soon as the device becomes ready.

```js
$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
    pushNotification.register(
    successHandler,
    errorHandler,
    {
        "senderID":"replace_with_sender_id",
        "ecb":"onNotification"
    });
} else if ( device.platform == 'blackberry10'){
    pushNotification.register(
    successHandler,
    errorHandler,
    {
        invokeTargetId : "replace_with_invoke_target_id",
        appId: "replace_with_app_id",
        ppgUrl:"replace_with_ppg_url", //remove for BES pushes
        ecb: "pushNotificationHandler",
        simChangeCallback: replace_with_simChange_callback,
        pushTransportReadyCallback: replace_with_pushTransportReady_callback,
        launchApplicationOnPush: true
    });
} else {
    pushNotification.register(
    tokenHandler,
    errorHandler,
    {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"onNotificationAPN"
    });
}
```

On success, you will get a call to tokenHandler (iOS), onNotification (Android and Amazon Fire OS), onNotificationWP8 (WP8) or successHandler (Blackberry10), allowing you to obtain the device token or registration ID, or push channel name and Uri respectively. Those values will typically get posted to your intermediary push server so it knows who it can send notifications to.

***Note***

- **Amazon Fire OS**:  "ecb" MUST be provided in order to get callback notifications. If you have not already registered with Amazon developer portal,you will have to obtain credentials and api_key for your app. This is described more in detail in the [Registering your app for Amazon Device Messaging (ADM)](#registering_for_adm) section below.

- **Android**: If you have not already done so, you'll need to set up a Google API project, to generate your senderID. [Follow these steps](http://developer.android.com/guide/google/gcm/gs.html) to do so. This is described more fully in the **Testing** section below. In this example, be sure and substitute your own senderID. Get your senderID by signing into to your [google dashboard](https://code.google.com/apis/console/). The senderID is found at *Overview->Dashboard->Project Number*.

- **BlackBerry10**: "ecb" MUST be provided to get notified of incoming push notifications. Also note, if doing a public consumer (BIS) push, you need to manually add the _sys_use_consumer_push permission to config.xml. `<rim:permit system="true">_sys_use_consumer_push</rim:permit>`. In order to receieve notifications, an invoke target must be [setup](http://developer.blackberry.com/html5/documentation/v2_1/rim_invoke-target.html) for push. See [BlackBerry Push Service](http://developer.blackberry.com/html5/apis/v2_1/blackberry.push.pushservice.html) for additional information about blackberry push options.




#### successHandler
Called when a plugin method returns without error

```js
// result contains any message sent from the plugin call
function successHandler (result) {
  alert('result = ' + result);
}
```

#### errorHandler
Called when the plugin returns an error

```js
// result contains any error description text returned from the plugin call
function errorHandler (error) {
  alert('error = ' + error);
}
```

#### ecb (Amazon Fire OS, Android and iOS)
Event callback that gets called when your device receives a notification

```js
// iOS
function onNotificationAPN (event) {
  if ( event.alert )
  {
    navigator.notification.alert(event.alert);
  }

  if ( event.sound )
  {
    var snd = new Media(event.sound);
    snd.play();
  }

  if ( event.badge )
  {
    pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
  }
}
```

```js
// Android and Amazon Fire OS
function onNotification(e) {
  $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

  switch( e.event )
  {
  case 'registered':
    if ( e.regid.length > 0 )
    {
      $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
      // Your GCM push server needs to know the regID before it can push to this device
      // here is where you might want to send it the regID for later use.
      console.log("regID = " + e.regid);
    }
  break;

  case 'message':
    // if this flag is set, this notification happened while we were in the foreground.
    // you might want to play a sound to get the user's attention, throw up a dialog, etc.
    if ( e.foreground )
    {
      $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

      // on Android soundname is outside the payload.
      // On Amazon FireOS all custom attributes are contained within payload
      var soundfile = e.soundname || e.payload.sound;
      // if the notification contains a soundname, play it.
      var my_media = new Media("/android_asset/www/"+ soundfile);
      my_media.play();
    }
    else
    {  // otherwise we were launched because the user touched a notification in the notification tray.
      if ( e.coldstart )
      {
        $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
      }
      else
      {
        $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
      }
    }

     $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
           //Only works for GCM
     $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
     //Only works on Amazon Fire OS
     $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
  break;

  case 'error':
    $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
  break;

  default:
    $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
  break;
  }
}
```

```js
// BlackBerry10
function pushNotificationHandler(pushpayload) {
    var contentType = pushpayload.headers["Content-Type"],
        id = pushpayload.id,
        data = pushpayload.data;//blob

    // If an acknowledgement of the push is required (that is, the push was sent as a confirmed push
    // - which is equivalent terminology to the push being sent with application level reliability),
    // then you must either accept the push or reject the push
    if (pushpayload.isAcknowledgeRequired) {
        // In our sample, we always accept the push, but situations might arise where an application
        // might want to reject the push (for example, after looking at the headers that came with the push
        // or the data of the push, we might decide that the push received did not match what we expected
        // and so we might want to reject it)
        pushpayload.acknowledge(true);
    }
};
```

Looking at the above message handling code for Android/Amazon Fire OS, a few things bear explanation. Your app may receive a notification while it is active (INLINE). If you background the app by hitting the Home button on your device, you may later receive a status bar notification. Selecting that notification from the status will bring your app to the front and allow you to process the notification (BACKGROUND). Finally, should you completely exit the app by hitting the back button from the home page, you may still receive a notification. Touching that notification in the notification tray will relaunch your app and allow you to process the notification (COLDSTART). In this case the **coldstart** flag will be set on the incoming event. You can look at the **foreground** flag on the event to determine whether you are processing a background or an in-line notification. You may choose, for example to play a sound or show a dialog only for inline or coldstart notifications since the user has already been alerted via the status bar.

For Amazon Fire OS, offline message can also be received when app is launched via carousel or by tapping on app icon from apps. In either case once app delivers the offline message to JS, notification will be cleared.

Since the Android and Amazon Fire OS notification data models are much more flexible than that of iOS, there may be additional elements beyond **message**. You can access those elements and any additional ones via the **payload** element. This means that if your data model should change in the future, there will be no need to change and recompile the plugin.



#### senderID (Android only)
This is the Google project ID you need to obtain by [registering your application](http://developer.android.com/guide/google/gcm/gs.html) for GCM


#### tokenHandler (iOS only)
Called when the device has registered with a unique device token.

```js
function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    alert('device token = ' + result);
}
```

#### setApplicationIconBadgeNumber (iOS only)
Set the badge count visible when the app is not running

```js
pushNotification.setApplicationIconBadgeNumber(successCallback, errorCallback, badgeCount);
```

The `badgeCount` is an integer indicating what number should show up in the badge. Passing 0 will clear the badge.

#### unregister (Amazon Fire OS, Android and iOS)
You will typically call this when your app is exiting, to cleanup any used resources. Its not strictly necessary to call it, and indeed it may be desireable to NOT call it if you are debugging your intermediarry push server. When you call unregister(), the current token for a particular device will get invalidated, and the next call to register() will return a new token. If you do NOT call unregister(), the last token will remain in effect until it is invalidated for some reason at the GCM/ADM side. Since such invalidations are beyond your control, its recommended that, in a production environment, that you have a matching unregister() call, for every call to register(), and that your server updates the devices' records each time.

```js
pushNotification.unregister(successHandler, errorHandler, options);
```


### WP8

#### register (WP8 Only)

```js

if(device.platform == "Win32NT"){
    pushNotification.register(
        channelHandler,
        errorHandler,
        {
            "channelName": channelName,
            "ecb": "onNotificationWP8",
            "uccb": "channelHandler",
            "errcb": "jsonErrorHandler"
        });
}

```

#### channelHandler (WP8 only)
Called after a push notification channel is opened and push notification URI is returned. [The application is now set to receive notifications.](http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202940(v=vs.105).aspx)


#### ecb (WP8 Only)
Event callback that gets called when your device receives a notification. This is fired if the app is running when you receive the toast notification, or raw notification.

```js
//handle MPNS notifications for WP8
function onNotificationWP8(e) {

  if (e.type == "toast" && e.jsonContent) {
    pushNotification.showToastNotification(successHandler, errorHandler,
    {
      "Title": e.jsonContent["wp:Text1"], "Subtitle": e.jsonContent["wp:Text2"], "NavigationUri": e.jsonContent["wp:Param"]
    });
    }

  if (e.type == "raw" && e.jsonContent) {
    alert(e.jsonContent.Body);
  }
}
```

#### uccb (WP8 only)
Event callback that gets called when the channel you have opened gets its Uri updated. This function is needed in case the MPNS updates the opened channel Uri. This function will take care of showing updated Uri.


#### errcb (WP8 only)
Event callback that gets called when server error occurs when receiving notification from the MPNS server (for example invalid format of the notification).

```js
function jsonErrorHandler(error) {
    $("#app-status-ul").append('<li style="color:red;">error:' + error.code + '</li>');
    $("#app-status-ul").append('<li style="color:red;">error:' + error.message + '</li>');
  }
```

#### showToastNotification (WP8 only)
Show toast notification if app is deactivated.

    pushNotification.showToastNotification(successCallback, errorCallback, options);

The toast notification's properties are set explicitly using json. They can be get in onNotificationWP8 and used for whatever purposes needed.


To control the launch page when the user taps on your toast notification when the app is not running, add the following code to your mainpage.xaml.cs
```cs
protected override void OnNavigatedTo(System.Windows.Navigation.NavigationEventArgs e)
{
    base.OnNavigatedTo(e);
    try
    {
        if (this.NavigationContext.QueryString["NavigatedFrom"] == "toast") // this is set on the server
        {
            this.PGView.StartPageUri = new Uri("//www/index.html#notification-page", UriKind.Relative);
        }
    }
    catch (KeyNotFoundException)
    {
    }
}
```
Or you can add another `Page2.xaml` just for testing toast navigate url. Like the [MSDN Toast Sample](http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202967(v=vs.105).aspx)

To test the tile notification, you will need to add tile images like the [MSDN Tile Sample](http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202970(v=vs.105).aspx#BKMK_CreatingaPushClienttoReceiveTileNotifications)

#### unregister (WP8 Only)

When using the plugin for wp8 you will need to unregister the push channel you have register in case you would want to open another one. You need to know the name of the channel you have opened in order to close it. Please keep in mind that one application can have only one opened channel at time and in order to open another you will have to close any already opened channel.

```cs
function unregister() {
  var channelName = $("#channel-btn").val();
  pushNotification.unregister(
    successHandler, errorHandler,
      {
        "channelName": channelName
      });
}
```

You'll probably want to trap on the **backbutton** event and only call this when the home page is showing. Remember, the back button on android is not the same as the Home button. When you hit the back button from the home page, your activity gets dismissed. Here is an example of how to trap the backbutton event;

```js
function onDeviceReady() {
  $("#app-status-ul").append('<li>deviceready event received</li>');

  document.addEventListener("backbutton", function(e)
  {
    $("#app-status-ul").append('<li>backbutton event received</li>');

    if( $("#home").length > 0 )
    {
      e.preventDefault();
      pushNotification.unregister(successHandler, errorHandler);
      navigator.app.exitApp();
    }
    else
    {
      navigator.app.backHistory();
    }
  }, false);

  // additional onDeviceReady work...
}
```

For the above to work, make sure the content for your home page is wrapped in an element with an id of home, like this;

```html
<div id="home">
  <div id="app-status-div">
    <ul id="app-status-ul">
      <li>Cordova PushNotification Plugin Demo</li>
    </ul>
  </div>
</div>
```

### windows8
Sample usage is showed below. **Note**. To be able to receive toast notifications additional [toastCapable=’true’](http://msdn.microsoft.com/en-us/library/windows/apps/hh781238.aspx) attribute is required in manifest file.

```js
// fired when push notification is received
window.onNotification = function (e) {
    navigator.notification.alert('Notification received: ' + JSON.stringify(e));
}  
var pushNotification = window.plugins.pushNotification;
pushNotification.register(successHandler, errorHandler, {"channelName":"your_channel_name","ecb":"onNotification"});

function successHandler(result) {
    console.log('registered###' + result.uri);
    // send uri to your notification server
}
function errorHandler(error) {
    console.log('error###' + error);
}
```
See [Sending push notifications with WNS](http://msdn.microsoft.com/en-us/library/windows/apps/hh465460.aspx) to send test push notification.



##<a name="testing"></a> Testing
The notification system consists of several interdependent components.

1. The client application which runs on a device and receives notifications.
2. The notification service provider (ADM for Amazon Fire OS, APNS for Apple, GCM for Google, MPNS for WP8)
3. Intermediary servers that collect device IDs from clients and push notifications through ADM, APNS GCM or MPNS.

This plugin and its target Cordova application comprise the client application.The ADM, APNS, GCM and MPNS infrastructure are maintained by Amazon, Apple, Google and Microsoft, respectively. In order to send push notifications to your users, you would typically run an intermediary server or employ a 3rd party push service. This is true for all ADM (Amazon), APNS (iOS), GCM (Android) and MPNS (WP8) notifications. However, when testing the notification client applications, it may be desirable to be able to push notifications directly from your desktop, without having to design and build those server's first. There are a number of solutions out there to allow you to push from a desktop machine, sans server.

### Testing APNS and GCM notifications

An easy solution to test APNS and GCM is a ruby gem called [pushmeup](http://rubygems.org/gems/pushmeup) (tested only on Mac, but it probably works fine on Windows as well).

#### Prerequisites:

- Ruby gems is installed and working.
- You have successfully built a client with this plugin, on both iOS and Android and have installed them on a device.
- You have installed the [PushMeUp gem](https://github.com/NicosKaralis/pushmeup): `$ sudo gem install pushmeup`



#### APNS/iOS Setup
[Follow this tutorial](http://www.raywenderlich.com/3443/apple-push-notification-services-tutorial-part-12) to create a file called ck.pem.

Start at the section entitled "Generating the Certificate Signing Request (CSR)", and substitute your own Bundle Identifier, and Description.

1. Go the this plugin's Example/server folder and open pushAPNS.rb in the text editor of your choice.
2. Set the APNS.pem variable to the path of the ck.pem file you just created
3. Set APNS.pass to the password associated with the certificate you just created. (warning this is cleartext, so don't share this file)
4. Set device_token to the token for the device you want to send a push to. (you can run the Cordova app / plugin in Xcode and extract the token from the log messages)
5. Save your changes.


#### Android/GCM Setup
[Follow these steps](http://developer.android.com/guide/google/gcm/gs.html) to generate a project ID and a server based API key.

1. Go the this plugin's Example/server folder and open pushGCM.rb in the text editor of your choice.
2. Set the GCM.key variable to the API key you just generated.
3. Set the destination variable to the Registration ID of the device. (you can run the Cordova app / plugin in on a device via Eclipse and extract the regID from the log messages)

####  Sending a test notification

1. cd to the directory containing the two .rb files we just edited.
2. Run the Cordova app / plugin on both the Android and iOS devices you used to obtain the regID  / device token, respectively.
3. `$ ruby pushGCM.rb` or `$ ruby pushAPNS.rb`

If you run this demo using the emulator you will not receive notifications from GCM. You need to run it on an actual device to receive messages or install the proper libraries on your emulator (You can follow [this guide](http://www.androidhive.info/2012/10/android-push-notifications-using-google-cloud-messaging-gcm-php-and-mysql/) under the section titled "Installing helper libraries and setting up the Emulator") If everything seems right and you are not receiving a registration id response back from Google, try uninstalling and reinstalling your app. That has worked for some devs out there.

While the data model for iOS is somewhat fixed, it should be noted that GCM is far more flexible. The Android implementation in this plugin, for example, assumes the incoming message will contain a '**message**' and a '**msgcnt**' node. This is reflected in both the plugin (see GCMIntentService.java) as well as in provided example ruby script (pushGCM.rb). Should you employ a commercial service, their data model may differ. As mentioned earlier, this is where you will want to take a look at the **payload** element of the message event. In addition to the cannonical message and msgcnt elements, any additional elements in the incoming JSON object will be accessible here, obviating the need to edit and recompile the plugin. Many thanks to Tobias Hößl for this functionality!

### Testing ADM Notifications for Amazon Fire OS

####<a name="registering_for_adm"></a>Register your app for Amazon Device Messaging (ADM)

1. Create a developer account on [Amazon Developer Portal](https://developer.amazon.com/home.html)
2. [Add a new app](https://developer.amazon.com/application/new.html) and turn Device Messaging switch to ON. Create a sample app for your device so you have the app name and package name used to register online.
3. Create [Security Profile](https://developer.amazon.com/iba-sp/overview.html) and obtain [ADM credentials](https://developer.amazon.com/sdk/adm/credentials.html) for your app.

####  Sending a test notification

1. Inside the plugin's examples/server folder, open the `pushADM.js` NodeJS script with a text editor. (You should already have NodeJS installed).
2. Edit the CLIENT_ID and CLIENT_SECRET variables with the values from the ADM Security Profile page for your app. This will allow your app to securely identify itself to Amazon services.
3. Compile and run the sample app on your device. Note the sample app requires the Cordova Device and Media plugins to work.
4. The sample app will display your device's registration ID. Copy that value (it's very long) from your device into `pushADM.js`, entered in the REGISTRATION_IDS array. To test sending messages to more than one device, you can enter in multiple REGISTRATION_IDS into the array.
5. To send a test push notification, run the test script via a command line using NodeJS: `$ node pushADM.js`.


### Testing MPNS Notification for WP8
The simplest way to test the plugin is to create an ASP.NET webpage that sends different notifications by using the URI that is returned when the push channel is created on the device.

You can see how to create one from MSDN Samples:

- [Send Toast Notifications (MSDN Sample)](http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202967(v=vs.105).aspx#BKMK_SendingaToastNotification)
- [Send Tile Notification (MSDN Sample)](http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202970(v=vs.105).aspx#BKMK_SendingaTileNotification)
- [Send Raw Notification (MSDN Sample)](http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202977(v=vs.105).aspx#BKMK_RunningtheRawNotificationSample)


### Sending push notifications on BlackBerry10
If doing a BES push, ensure the device has been enterprise activated, has network access (wifi or sim) and your app is installed in the work permiter. You also need to make sure the _sys_use_consumer_push permission is NOT specified in the config.xml. This permission is meant only for public consumer BIS pushes and will cause an error when registering.

If doing a public consumer BIS push, please ensure the _sys_use_consumer_push permission is added to the config.xml.

Both types of pushes require the use of a Push Initiator.

- [App based BIS Initiator](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/pushCaptureBasics/pushInitiator)
- [Web based BIS Initiator (Push Service SDK)](https://developer.blackberry.com/services/push/)
- [Web based BES Initiator](https://github.com/blackberry/BES10-WebWorks/tree/master/SimplePushTest/WW2.0/server)

For additional information on BlackBerry Push see https://developer.blackberry.com/services/push/.

### Troubleshooting and next steps
If all went well, you should see a notification show up on each device. If not, make sure you are not being blocked by a firewall, and that you have internet access. Check and recheck the token id, the registration ID and the certificate generating process.

In a production environment, your app, upon registration, would send the device id (iOS) or the registration id (Android/Amazon), to your intermediary push server. For iOS, the push certificate would also be stored there, and would be used to authenticate push requests to the APNS server. When a push request is processed, this information is then used to target specific apps running on individual devices.

If you're not up to building and maintaining your own intermediary push server, there are a number of commercial push services out there which support both APNS and GCM.

- [Amazon Simple Notification Service](https://aws.amazon.com/sns/)
- [kony](http://www.kony.com/push-notification-services)
- [openpush](http://openpush.im)
- [Pushwoosh](http://www.pushwoosh.com/)
- [Urban Airship](http://urbanairship.com/products/push-notifications/)
- etc.




##<a name="additional_resources"></a>Additional Resources

- [Amazon Device Messaging](https://developer.amazon.com/sdk/adm/credentials.html)
- [Apple Push Notification Services Tutorial: Part 1/2](http://www.raywenderlich.com/3443/apple-push-notification-services-tutorial-part-12)
- [Apple Push Notification Services Tutorial: Part 2/2](http://www.raywenderlich.com/3525/apple-push-notification-services-tutorial-part-2)
- [Google Cloud Messaging for Android](http://developer.android.com/guide/google/gcm/index.html) (Android)
- [How to Implement Push Notifications for Android](http://tokudu.com/2010/how-to-implement-push-notifications-for-android/)
- [Local and Push Notification Programming Guide](http://developer.apple.com/library/mac/#documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/ApplePushService/ApplePushService.html) (Apple)


##<a name="acknowledgments"><a/> Acknowledgments

Huge thanks to Mark Nutter whose [GCM-Cordova plugin](https://github.com/marknutter/GCM-Cordova) forms the basis for the Android side implimentation.

Likewise, the iOS side was inspired by Olivier Louvignes' [Cordova PushNotification Plugin](https://github.com/phonegap/phonegap-plugins/tree/master/iOS/PushNotification) (Copyright (c) 2012 Olivier Louvignes) for iOS.

Props to [Tobias Hößl](https://github.com/CatoTH), who provided the code to surface the full JSON object up to the JS layer.
