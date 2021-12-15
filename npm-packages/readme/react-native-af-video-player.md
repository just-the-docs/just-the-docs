# react-native-af-video-player

[![npm version](http://img.shields.io/npm/v/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-989898.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![npm](https://img.shields.io/npm/dt/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")

A customisable React Native video player for Android and IOS

![Demo](https://github.com/abbasfreestyle/react-native-af-video-player/blob/master/demo.gif)

## Features

* Fullscreen support for Android and iOS!
* Works with react-navigation
* Optional action button for custom use
* Add your own logo and/or placeholder
* Customise theme

## Install

```shell
npm i -S react-native-af-video-player
```

Then link

```shell
react-native link react-native-video
react-native link react-native-keep-awake
react-native link react-native-vector-icons
react-native link react-native-orientation
react-native link react-native-linear-gradient
```

## Simple Usage

```jsx
import React from 'react'
import { AppRegistry, StyleSheet, View } from 'react-native'
import Video from 'react-native-af-video-player'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

const url = 'https://your-url.com/video.mp4'

class VideoExample extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Video url={url} />
      </View>
    )
  }
}

AppRegistry.registerComponent('VideoExample', () => VideoExample)
```

## Props

Prop                  | Type     | Required | Default                   | Description
--------------------- | -------- | -------- | ------------------------- | -----------
url                   | string, number | Yes |                          | A URL string (or number for local) is required.
autoPlay              | bool     | No       | false                     | Autoplays the video as soon as it's loaded
loop                  | bool     | No       | false                     | Allows the video to continuously loop
title                 | string   | No       | ''                        | Adds a title of your video at the top of the player
placeholder           | string   | No       | undefined                 | Adds an image placeholder while it's loading and stopped at the beginning
logo                  | string   | No       | undefined                 | Adds an image logo at the top left corner of the video
theme                 | string   | No       | 'white'                   | Adds an optional theme colour to the players controls
hideFullScreenControl | bool     | No       | false                     | This hides the full screen control
style                 | number, object | No | {}                        | Apply styles directly to the Video player (ignored in fullscreen mode)
resizeMode            | string   | No       | 'contain'                 | Fills the whole screen at aspect ratio. contain, cover etc
rotateToFullScreen    | bool     | No       | false                     | Tapping the fullscreen button will rotate the screen. Also rotating the screen will automatically switch to fullscreen mode
fullScreenOnly        | bool     | No       | false                     | This will play only in fullscreen mode
inlineOnly            | bool     | No       | false                     | This hides the fullscreen button and only plays the video in inline mode
playInBackground      | bool     | No       | false                     | Audio continues to play when app enters background.
playWhenInactive      | bool     | No       | false                     | [iOS] Video continues to play when control or notification center are shown.
rate                  | number   | No       | 1                         | Adjusts the speed of the video. 0 = stopped, 1.0 = normal
volume                | number   | No       | 1                         | Adjusts the volume of the video. 0 = mute, 1.0 = full volume
onMorePress           | function | No       | undefined                 | Adds an action button at the top right of the player. Use this callback function for your own use. e.g share link
onFullScreen          | function | No       | (value) => {}             | Returns the fullscreen status whenever it toggles. Useful for situations like react navigation.
onTimedMetadata       | function | No       | undefined                 | Callback when the stream receives metadata
scrollBounce          | bool     | No       | false                     | Enables the bounce effect for the ScrollView
lockPortraitOnFsExit  | bool     | No       | false                     | Keep Portrait mode locked after Exiting from Fullscreen mode
lockRatio             | number   | No       | undefined                 | Force a specific ratio to the Video player. e.g. lockRatio={16 / 9}
onLoad                | function | No       | (data) => {}              | Returns data once video is loaded
onProgress            | function | No       | (progress) => {}          | Returns progress data
onEnd                 | function | No       | () => {}                  | Invoked when video finishes playing  
onError               | function | No       | (error) => {}             | Returns an error message argument
onPlay                | function | No       | (playing) => {}           | Returns a boolean during playback
error                 | boolean, object | No | true                     | Pass in an object to Alert. See https://facebook.github.io/react-native/docs/alert.html
theme                 | object   | No       | all white                 | Pass in an object to theme. (See example below to see the full list of available settings)
controlDuration             | number   | No       | 3                 | Set the visibility time of the pause button and the progress bar after the video was started

## Referencing

To toggle play/pause manually, you can do it like so:

```jsx

  const theme = {
    title: '#FFF',
    more: '#446984',
    center: '#7B8F99',
    fullscreen: '#446984',
    volume: '#A5957B',
    scrubberThumb: '#234458',
    scrubberBar: '#DBD5C7',
    seconds: '#DBD5C7',
    duration: '#DBD5C7',
    progress: '#446984',
    loading: '#DBD5C7'
  }

  class MyComponent extends Component {

    play() {
      this.video.play()
      this.video.seekTo(25)
    }

    pause() {
      this.video.pause()
    }

    render() {
      return (
        <View>
          <Video
            url={url}
            ref={(ref) => { this.video = ref }}
            theme={theme}
          />
          <Button onPress={() => this.play()}>Play</Button>
          <Button onPress={() => this.pause()}>Pause</Button>
        </View>
      )
    }
  }
```

# Issues

## Container

Avoid adding alignItems: 'center' to the container, it can cause fullscreen mode to disappear :D

## React Navigation

If you’re using react-navigation you need to manually hide the headers / tab bars to take advantage of fullscreen videos.

## Example

```jsx
import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Alert, Text } from 'react-native'

import Video from 'react-native-af-video-player'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class ReactNavigationExample extends Component {

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    // Setup the header and tabBarVisible status
    const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    return {
      // For stack navigators, you can hide the header bar like so
      header,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible,
    }
  }

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    })
  }

  onMorePress() {
    Alert.alert(
      'Boom',
      'This is an action call!',
      [{ text: 'Aw yeah!' }]
    )
  }

  render() {

    const url = 'https://your-url.com/video.mp4'
    const logo = 'https://your-url.com/logo.png'
    const placeholder = 'https://your-url.com/placeholder.png'
    const title = 'My video title'

    return (
      <View style={styles.container}>
        <Video
          autoPlay
          url={url}
          title={title}
          logo={logo}
          placeholder={placeholder}
          onMorePress={() => this.onMorePress()}
          onFullScreen={status => this.onFullScreen(status)}
          fullScreenOnly
        />
        <ScrollView>
          <Text>Some content here...</Text>
        </ScrollView>
      </View>
    )
  }
}

export default ReactNavigationExample

```

## http vs https

For your sanity you should use https especially if you’re planning to use this for iOS. Using http will not work due to App Transport Security Settings will result in AppStore rejection.

## Fullscreen videos inside a ScrollView

If you need the video inside a ScrollView, use our ScrollView instead:
The reason for this is because we need to hide all of it's content due to ScrollView styling challenges when enabling fullscreen mode. We wouldn't want you deal with that headache, instead let this component handle it :)
You can also apply styles to the video by wrapping our Container around it. Note: wrapping the video with your own element can cause fullscreen defects.
Also having multiple videos in a ScrollView isn't perfect, so use at your own risk.

## Example

```jsx

  import Video, { ScrollView, Container } from 'react-native-af-video-player'

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    videoContainer: {
      margin: 10
    }
  })

  class VideoInScrollView extends React.Component {

    render() {
      return (
        <ScrollView style={styles.container}>

          <Text>Some content above</Text>

          <Container style={styles.videoContainer}>
            <Video
              autoPlay
              url={url}
              title={title}
              logo={logo}
              placeholder={logo}
              rotateToFullScreen
            />
          </Container>

          {/* Or use without the Container */}
          <Video
            autoPlay
            url={url}
            title={title}
            logo={logo}
            placeholder={logo}
            rotateToFullScreen
          />

          <Text>Some content below</Text>

        </ScrollView>
      )
    }
  }
```

# To Do

- [ ] Option to use custom icons
- [ ] Support Immersive mode for Android
- [ ] improve multiple videos fullscreen support within a ScrollView
- [ ] investigate subtitle support
- [x] Improve scrubber controls for iOS
- [x] Provide fullscreen support within a ScrollView
- [x] Customise specific components for better theming

---

**MIT Licensed**
