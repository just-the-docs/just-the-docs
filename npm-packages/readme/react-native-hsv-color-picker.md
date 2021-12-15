
# react-native-hsv-color-picker
> a react native HSV(hue, saturation, value) color picker

![npm](https://img.shields.io/npm/v/react-native-hsv-color-picker.svg?style=flat-square) ![](https://img.shields.io/travis/yuanfux/react-native-hsv-color-picker/master.svg?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/yuanfux/react-native-hsv-color-picker.svg?style=flat-square) ![NPM](https://img.shields.io/npm/l/react-native-hsv-color-picker.svg?style=flat-square) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) ![](https://img.shields.io/maintenance/yes/2020.svg?style=flat-square)

<p>
  <img width="300" src="https://user-images.githubusercontent.com/6414178/53297993-aef84480-3861-11e9-99ad-b957639414fa.gif">
</p>

## Preview
[View Live Demo](https://snack.expo.io/@fuyuanx/react-native-hsv-color-picker)

`react-native-hsv-color-picker` is a React Native component for building an [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) (hue, saturation, value) color picker. 

Highlighted Features:
1. **Real Rendering** - no image involved / all colors are truly rendered
2. **Performance** - empowered by native gradient lib
4. **Fully Controlled** - no inner state involved
3. **Fully Supported** - support both React Native & Expo projects

## Install
```bash
$ npm install react-native-hsv-color-picker --save
```

### Use with Expo Project
> You are all set.

### Use with React Native Project
> `react-native-hsv-color-picker` is powered by the lib [`expo-linear-gradient`](https://github.com/react-native-community/react-native-linear-gradient). Besides above command, you have to follow this [Instruction](https://github.com/expo/expo/tree/master/packages/expo-linear-gradient#installation-in-bare-react-native-projects) to add relevant dependencies to your project.

## Usage
> a minimally-configured HSV color picker
```js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      sat: 0,
      val: 1,
    };
    this.onSatValPickerChange = this.onSatValPickerChange.bind(this);
    this.onHuePickerChange = this.onHuePickerChange.bind(this);
  }

  onSatValPickerChange({ saturation, value }) {
    this.setState({
      sat: saturation,
      val: value,
    });
  }

  onHuePickerChange({ hue }) {
    this.setState({
      hue,
    });
  }

  render() {
    const { hue, sat, val } = this.state;
    return (
      <View style={styles.container}>
        <HsvColorPicker
          huePickerHue={hue}
          onHuePickerDragMove={this.onHuePickerChange}
          onHuePickerPress={this.onHuePickerChange}
          satValPickerHue={hue}
          satValPickerSaturation={sat}
          satValPickerValue={val}
          onSatValPickerDragMove={this.onSatValPickerChange}
          onSatValPickerPress={this.onSatValPickerChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```


## Props
#### Basic Props
| Prop | Type | Default | Description |
|--|--|--| -- |
| `containerStyle` | ViewPropTypes.style  | `{}` |  style for the outmost container  |
| `huePickerContainerStyle` | ViewPropTypes.style  | `{}` |  style for the hue picker container  |
| `huePickerBorderRadius` | number  | `0` | border radius for the hue picker  |
| `huePickerHue` | number  | `0` | hue value(`h` in `hsv`, ranged in `[0, 360]`) for the hue picker |
| `huePickerBarWidth` | number  | `12` | bar width for the hue picker  |
| `huePickerBarHeight` | number  | `200` | bar height for the hue picker  |
| `huePickerSliderSize` | number  | `24` | slider diameter for the hue picker |
| `satValPickerContainerStyle` | ViewPropTypes.style  | `{}` | style for the saturation & value picker container   |
| `satValPickerBorderRadius` | number  | `0` | border radius for the saturation & value picker  |
| `satValPickerSize` | number  | `200` | width / height for the saturation & value picker  |
| `satValPickerSliderSize` | number  | `24` | slider diameter for the saturation & value picker  |
| `satValPickerHue` | number  | `0` | hue value(`h` in `hsv`, ranged in `[0, 360]`) for the saturation & value picker |
| `satValPickerSaturation` | number  | `1` | saturation value(`s` in `hsv`, ranged in `[0, 1]`) for the saturation & value picker |
| `satValPickerValue` | number  | `1` | value(`v` in `hsv`, ranged in `[0, 1]`) for the saturation & value picker |

#### Callback Props
| Prop | Callback Params | Description |
|--|--| -- |
| `onHuePickerDragStart` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;hue: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;gestureState:&nbsp;[gestureState](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when hue picker starts to drag |
| `onHuePickerDragMove` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;hue: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;gestureState:&nbsp;[gestureState](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when hue picker is dragging |
| `onHuePickerDragEnd` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;hue: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;gestureState:&nbsp;[gestureState](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when hue picker stops dragging |
| `onHuePickerDragTerminate` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;hue: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;gestureState:&nbsp;[gestureState](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when another component has become the responder |
| `onHuePickerPress` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;hue: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;nativeEvent:&nbsp;[nativeEvent](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when hue picker is pressed |
| `onSatValPickerDragStart` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;saturation: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;value: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;gestureState:&nbsp;[gestureState](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when saturation & value picker starts to drag |
| `onSatValPickerDragMove` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;saturation: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;value: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;gestureState:&nbsp;[gestureState](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when saturation & value picker is dragging |
| `onSatValPickerDragEnd` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;saturation: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;value: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;gestureState:&nbsp;[gestureState](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when saturation & value picker stops dragging |
| `onSatValPickerDragTerminate` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;saturation: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;value: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;gestureState:&nbsp;[gestureState](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when another component has become the responder |
| `onSatValPickerPress` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;saturation: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;value: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;nativeEvent:&nbsp;[nativeEvent](https://facebook.github.io/react-native/docs/panresponder)<br>} | called when saturation & value picker is pressed |

## Methods
#### Instance Methods
> Use [`ref`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to call instance methods

| Method | Params | Return Type| Description |
|--|:--:|:--:| -- |
| `getCurrentColor` | - | `string` | get current picked color in hex format |



## Dev
> The `demo` folder contains a standalone Expo project, which can be used for dev purpose.

> react-native - 0.61 <br />
> react - 16.9

1. Start Expo
	```bash
	$ npm install

	$ npm start
	```

2. Run on `simulator`
	- type the following command in the `Terminal` after the project is booted up
	- `a` for `android` simulator
	- `i` for `iOS` simulator

3. Run on `device`
	- require the installation of corresponding [`iOS client`](https://itunes.apple.com/app/apple-store/id982107779) or [`android client`](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) on the device
	- scan the QR code from `Terminal` using the device

4. More on [`Expo Guide`](https://docs.expo.io/versions/v36.0.0/)

## Related
- scaffolded by [**react-native-component-cli**](https://github.com/yuanfux/react-native-component-cli) 

## License
MIT
