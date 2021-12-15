# react-native-popup-menu
[![](https://img.shields.io/npm/dm/react-native-popup-menu.svg?style=flat-square)](https://www.npmjs.com/package/react-native-popup-menu)

Extensible popup menu component for React Native for Android, iOS and (unofficially) UWP and react-native-web.

Features:
* Simple to use popup/context menu
* Multiple modes: animated, not animated, slide in from bottom or popover
* By default opening and closing animations
* Optional back button handling
* Easy styling
* Customizable on various levels - menu options, positioning, animations
* Can work as controlled as well as uncontrolled component
* Different lifecycle hooks
* RTL layout support

Community driven features:
* Support for UWP, react-native-web and react-native-desktop
* Typescript definitions

We thank our community for maintaining features that goes over our scope.

| Context Menu, Slide-in Menu | Popover |
|---|---|
|![Popup menu demo](./android.demo.gif)|![Popup menu demo](./android.demo-popover.gif)|

## Installation

```
npm install react-native-popup-menu --save
```
If you are using **older RN versions** check our compatibility table.

## Basic Usage
Wrap your application inside `MenuProvider` and then simply use `Menu` component where you need it. Below you can find a simple example.

For more detailed documentation check [API](./doc/api.md).

```js
// your entry point
import { MenuProvider } from 'react-native-popup-menu';

export const App = () => (
  <MenuProvider>
    <YourApp />
  </MenuProvider>
);

// somewhere in your app
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export const YourComponent = () => (
  <View>
    <Text>Hello world!</Text>
    <Menu>
      <MenuTrigger text='Select action' />
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
        <MenuOption onSelect={() => alert(`Delete`)} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
      </MenuOptions>
    </Menu>
  </View>
);

```

## Documentation

- [Examples](doc/examples.md)
- [API](doc/api.md)
- [Extension points](doc/extensions.md)

## Contributing
Contributions are welcome! Just open an issues with any idea or pull-request if it is no-brainer. Make sure all tests and linting rules pass.

## React Native Compatibility
We keep compatibility on best effort basis.

| popup-menu version | min RN (React) version |
| ------------------ | -------------- |
| 0.13               | 0.55 (16.3.1)  |
| 0.9                | 0.40           |
| 0.8                | 0.38           |
| 0.7                | 0.18           |
