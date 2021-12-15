### React-Native-Giraffe-Player

> Video Player based on [GiraffePlayer](https://github.com/tcking/GiraffePlayer) for react-native

*Only Android support now.*

#### Integrate

##### Android

##### Install via npm
`npm i react-native-giraffe-player --save`

##### Add dependency to `android/settings.gradle`
```
...
include ':ijkplayer-java'
project(':ijkplayer-java').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-giraffe-player/android/ijkplayer-java')

include ':giraffeplayer'
project(':giraffeplayer').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-giraffe-player/android/giraffeplayer')

include ':react-native-giraffe-player'
project(':react-native-giraffe-player').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-giraffe-player/android/player')
```

##### Add `android/app/build.gradle`
```
...
dependencies {
    ...
    compile project(':react-native-giraffe-player')
}
```

#### If you're using react-native 0.25~0.29, follow these steps

##### Register module in `MainActivity.java`
```Java
import com.ghondar.gplayer.*;  // <--- import

@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new GPlayerPackage())  // <------- here
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "example", null);

        setContentView(mReactRootView);
    }
```

#### If you're using react-native 0.30+, follow these steps

##### Register module in `MainApplication.java`
```Java
import com.ghondar.gplayer.*;  // <--- import

@Override
 protected List<ReactPackage> getPackages() {
   return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new GPlayerPackage()  // <------- here
   );
 }
```

#### Usage

```Javascript
import React, { Component, View, Text, TouchableHighlight } from 'react-native'

import GPlayer from 'react-native-giraffe-player'

class Example extends Component {

  componentWillMount() {
    GPlayer.addEventListener('onRenderingStart', this.onRenderingStart);
  }
  
  componentDidMount() {
    // Config Video Player before playing
    GPlayer.setTitle('Video Title');
    GPlayer.setFullScreenOnly(true);
    GPlayer.setShowNavIcon(false);
  }
  
  componentWillUnmount() {
    GPlayer.removeEventListener('onRenderingStart', this.onRenderingStart);
  }

  onRenderingStart() {
    GPlayer.getDuration()
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress={() => { GPlayer.play('http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8'); }}>
          <Text>
            Play Video!!
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Example

```

## API
### Constants
* `SCALETYPE_FITPARENT` - scale the video uniformly (maintain the video's aspect ratio) so that both dimensions (width and height) of the video will be equal to or **less** than the corresponding dimension of the view. like ImageView's `CENTER_INSIDE`.
* `SCALETYPE_FILLPARENT` - scale the video uniformly (maintain the video's aspect ratio) so that both dimensions (width and height) of the video will be equal to or **larger** than the corresponding dimension of the view .like ImageView's `CENTER_CROP`.
* `SCALETYPE_WRAPCONTENT` - center the video in the view,if the video is less than view perform no scaling,if video is larger than view then scale the video uniformly so that both dimensions (width and height) of the video will be equal to or **less** than the corresponding dimension of the view.
* `SCALETYPE_FITXY` - scale in X and Y independently, so that video matches view exactly.
* `SCALETYPE_16_9` - scale x and y with aspect ratio 16:9 until both dimensions (width and height) of the video will be equal to or **less** than the corresponding dimension of the view.
* `SCALETYPE_4_3` - scale x and y with aspect ratio 4:3 until both dimensions (width and height) of the video will be equal to or **less** than the corresponding dimension of the view.

### Config
* `setTitle(title)` - set title => title: String
* `setFullScreenOnly(val)` - set fullscreen => val: Boolean
* `setShowNavIcon(val)` - set back button => val: Boolean

* `setScaleType(SCALE_TYPE)` - set video scale type => SCALE_TYPE: String

### initialize
* `play(url)` - play video => url: String

### initialized
* `setScaleType(SCALE_TYPE)` - set video scale type => SCALE_TYPE: String
* `stop()` - stop video
* `pause()` - pause video
* `start()` - start video
* `forward(percent)` - forward video, example: forward(0.1) => percent: Float
* `backward(percent)` - backward video, example: backward(0.1) => percent: Float
* `toggleAspectRatio()` - toggle video scale type
* `seekTo(milliseconds, showControlPanel)` - seek to specify position and show or hide control => milliseconds: Integer, showControlPanel: boolean
* `getCurrentPosition()` - get current position, example: `getCurrentPosition.then(position => {...}).catch(e => {..})` => position: Integer
* `getDuration()` - get video duration, example: `getDuration.then(duration => {...}).catch(e => {..})` => duration: Integer

### Events
* `onBufferingStart` - when have loaded buffer
* `onBufferingEnd`  - when have finalized buffer
* `onNetworkBandwidth` - get network bandwidth progress => milliseconds: Integer
* `onRenderingStart` - where show video
* `onControlPanelVisibilityChange` - where change control panel visibility
* `onComplete` - where complete configuration
* `onError` - get possible errors

#### LICENSE
MIT
