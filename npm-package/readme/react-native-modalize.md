# Modalize

[![npm version](https://badge.fury.io/js/react-native-modalize.svg)](https://badge.fury.io/js/react-native-modalize)

A highly customizable modal/bottom sheet that loves scrolling content.

This component has been built with `react-native-gesture-handler` to address the common issue of **scrolling**, **swiping** and handling the **keyboard** behaviors, you can face with react-native's modal.

This component comes with a ScrollView, the default renderer, a FlatList or a SectionList. They are all three built-in and make your life easier, just pass your content and Modalize will handle the rest for you. You can also have the possibility to pass your own custom renderer.

<p align="left">
  <img src="https://user-images.githubusercontent.com/937328/80501705-458d2d80-895f-11ea-9667-d193c135cabf.gif" height="542" alt="Simple" />
  <img src="https://user-images.githubusercontent.com/937328/80501698-42923d00-895f-11ea-8db0-da3d4f772710.gif" height="542" alt="Fixed" />
  <img src="https://user-images.githubusercontent.com/937328/80501699-432ad380-895f-11ea-9dad-22505038234e.gif" height="542" alt="Snapping" />
  <img src="https://user-images.githubusercontent.com/937328/80501647-35754e00-895f-11ea-8ce0-cb53d2985787.gif" height="542" alt="Absolute" />
  <img src="https://user-images.githubusercontent.com/937328/80501682-3efeb600-895f-11ea-9c04-64154cf77012.gif" height="542" alt="FlatList" />
  <img src="https://user-images.githubusercontent.com/937328/80501668-3a3a0200-895f-11ea-92b6-a7bc9b301a1a.gif" height="542" alt="Open" />
  <img src="https://user-images.githubusercontent.com/937328/80615701-881e3b00-8a2f-11ea-94f5-a4cbf6d13d97.gif" height="542" alt="Apple" />
  <img src="https://user-images.githubusercontent.com/937328/80501688-40c87980-895f-11ea-97db-63b9b029eab4.gif" height="542" alt="Facebook" />
  <img src="https://user-images.githubusercontent.com/937328/80501707-4625c400-895f-11ea-8436-8e89de3b437e.gif" height="542" alt="Slack" />
</p>

## Installation

```bash
yarn add react-native-modalize react-native-gesture-handler
```

<details>
  <summary>iOS</summary>

```bash
npx pod-install ios
```

</details>

<details>
  <summary>Android</summary>

#### React Native <= 0.59

Follow [this guide](https://jeremybarbet.github.io/react-native-modalize/#/INSTALLATION) to complete the Android installation.

#### React Native > 0.60

You don't need to follow the guide mentioned above because autolinking from React already did the steps.

</details>

## Usage

Here is a quick example, using the default ScrollView renderer.

```tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';

export const App = () => {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}>...your content</Modalize>
    </>
  );
};
```

## Documentation

Please check out the full [documentation available here](https://jeremybarbet.github.io/react-native-modalize) to find all about the props, methods and examples of Modalize's usage.
