# react-native-wheel-pick

React native wheel picker for both iOS and android. (Support DatePicker)

This is not original but inspire by  [react-native-wheel-datepicker](https://github.com/pinguinjkeke/react-native-wheel-datepicker)

![](https://preview.ibb.co/iUjDZo/screen1.png)

## How to use

```
npm install react-native-wheel-pick
react-native link react-native-wheel-pick
```
[react-native-wheel-pick](https://www.npmjs.com/package/react-native-wheel-pick)

## Example code

```jsx
import { Platform } from 'react-native';
import { Picker, DatePicker } from 'react-native-wheel-pick';

const isIos = Platform.OS === 'ios'

// use Picker
<Picker
  style={{ backgroundColor: 'white', width: 300, height: 215 }}
  selectedValue='item4'
  pickerData={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7']}
  onValueChange={value => { }}
  itemSpace={30} // this only support in android
/>

// use DatePicker
<DatePicker
  style={{ backgroundColor: 'white', height: 215, width: isIos ? 300 : undefined }} 
  // android not support width
  onDateChange={date => { }}
/>

```
## Note

- For iOS use default PickerIOS / DatePickerIOS of React Native.
- For Android use WheelPicker of [WheelPicker](https://github.com/AigeStudio/WheelPicker)
- Line color is white in android. (Support Line style in future. Pull request welcome)
- Line color is grey in IOS but it has bug line not show in Picker (iOS 11.4 not sure other version).

### Pull request are welcome for more support in future (Text Style / Line Style / Line Bug)

## More Example

```jsx
// DatePicker set default choose date
<DatePicker
  style={{ height: 215, width: isIos ? 300 : undefined }}
  date={new Date('2018-06-27')} // Optional prop - default is Today
  onDateChange={date => { }}
/>

// DatePicker set min/max Date
<DatePicker
  style={{ height: 215, width: isIos ? 300 : undefined }}
  minimumDate={new Date('2000-01-01')}
  maximumDate={new Date('2050-12-31')}
  onDateChange={date => { }}
/>
```

## Release Note

### 1.1.1 (November 20 2021)
- Edit broken url.

### 1.1.0 (January 14 2020)
- Use react-native.config.js instead of rnpm section. [@darkbluesun](https://github.com/darkbluesun)

[Android]
- Add safeExtGet to get sdk version from root project.[@darkbluesun](https://github.com/darkbluesun)

### 1.0.9 (June 27 2018)
[IOS]
- Fix bug props date of DatePicker is not work right.

### 1.0.8 (June 27 2018)
- Support props for date picker (date / minimumDate / maximumDate)

[IOS]
- Fix bug cannot read property 'getTime' of null

### 1.0.7 (June 25 2018)

[Android]
- Fix bug android value wrong from array

### 1.0.5 (June 24 2018)
- Fix Lifecycle for support React 16 (Remove componentWillMount / componentWillReceiveProps)

[Android]
- Fix bug onValueChange occur first time without change

### 1.0.4 (June 24 2018)
[Android]
- Support compileSDKVersion 26
