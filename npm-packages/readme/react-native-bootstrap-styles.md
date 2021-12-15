<p>  
<img title="React Native Bootstrap Styles" alt="React Native Bootstrap Styles" src="./assets/logo.svg" width="15%">  
</p>  

# React Native Bootstrap Styles  


[![npm version](https://img.shields.io/npm/v/react-native-bootstrap-styles.svg)](https://www.npmjs.com/package/react-native-bootstrap-styles)

Bootstrap style library for React Native.  

Original class names are transformed from "dashed" to "camelcase" format, for example: `text-center` to `textCenter` and `my-sm-4` to 'mySm4'. Also all the constants (variables in terms of Bootstrap) could be accessible in templates. It helps to make custom tweaks preserving styling guidelines, for example: {fontSize: 10 * FONT_SIZE_BASE}.

Documentation with snippets and live samples: [alpha version](https://expo.io/@andrenerd/react-native-bootstrap-styles).  


Basic "Hello world" example:  
```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

class Hello extends Component {
  render() {
    return (
      <View style={[s.body]}>
        <Text style={[s.text, s.textPrimary]}>Hello world! 🤓🚀🚀🚀</Text>
      </View>
    );
  }
}
```

Advanced "Hello world" example with custom styles:

```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const
  BODY_COLOR = '#000022',
  TEXT_PRIMARY = '#882288';

// custom constants
const constants = {
  BODY_COLOR, TEXT_PRIMARY,
};

// custom classes
const classes = {
  title: {
    color: 'red',
  }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const { styles: s, constants: c } = bootstrapStyleSheet;

class Hello extends Component {
  render() {
    return (
      <View style={[s.body]}>
        <View style={[s.container, s.h100, s.justifyContentCenter]}>
          <Text style={[s.text, s.title]}>Hello world!</Text>
          <Text style={[s.text, s.textPrimary, s.myXs1, s.myMd3]}>Hello second world!</Text>
          <Text style={[s.text, s.py3, {fontSize: 5 * c.REM}]}>🤓🚀🚀🚀</Text>
        </View>
      </View>
    );
  }
}
```




## Constants

Bootstrap renamed `constants` to `variables` some time ago.  
No renaming here for now. See actual example above.  

Check the full list of constants in the source code:  
[./src/constants.js](./src/constants.js)

Extra dynamic parameters available as `constants` or properties of the `bootstrapStyleSheet` object:
```js
DIMENSIONS_WIDTH, // ex. 750
DIMENSIONS_HEIGHT, //  ex. 1334
DIMENSIONS_MAX, //  ex. 1334
ORIENTATION_PORTRAIT, // ex. true
ORIENTATION_LANDSCAPE, // ex. false
MODE_LIGHT, // ex. false
MODE_DARK, // ex. true
SCREENS, // ['Xs', 'Md']
SCREEN, // ex. 'Md'
```



## Events

Styles, containing "media queries", are automatically updated on dimentions, orientaion and mode changes. There is nothing to bother about, except one little thing. Components should be forced to re-render with the updated styles. That's where the events could be helpful:  
- addDimensionsListener
- addOrientationListener (portrait/landscape)
- addModeListener (light/dark)**

Here is an example:

```jsx
class App extends Component {

  componentDidMount() {
    bootstrapStyleSheet.addDimensionsListener(data => {
      // params are accessible
      // const dimensions = data;

      // direct call
      // this.forceUpdate();

      // or via state change
      // this.setState({update: me})

      // or via redux state change
      // dispatch('NAME', {update: me})
    });
  }

  render() {
    // poor pattern, supposed to be passed in state or props
    const width = bootstrapStyleSheet.DIMENSIONS_WIDTH

    return (
      <View style={s.container}>
        <Text style={[s.mediaDependentClass]}>Screen width: {width}</Text>
      </View>
    );
  }
}

```

** extra package should be installed: [react-native-appearance](https://github.com/expo/react-native-appearance).



## Layout

Simplified version of the original layout classes.
Any ideas how to extend grid classes are welcome.

Impelemented features: `.container-*`, `.gutters-*`, `.no-gutters-*`. `.row-{screen}-{n}`, `.col-{screen}-{n}`.  
Among non-impelemented features: `.row-cols-*`, `.offset-*-*`, `.order-*-*`.  



## Text

As there is no such things as "tag-based" styles, "inheritance" and "nesting" for styles in React Native. Extra text classes defined, that should be applied to all `Text` tags, for example:
```
<Text style="{[s.text]}">Text</Text>
<Text style="{[s.text, s.textSmall]}">Text</Text>
<Text style="{[s.text, s.textMuted]}">Text</Text>
<Text style="{[s.text, s.textWhite]}">Text</Text>
<Text style="{[s.text, s.textBlack50]}">Text</Text>
...
```

Text styles for elements already include base `s.text` style instructions and can be used without it:
```
<Text style="{[s.btnText]}">Button text</Text>
<Text style="{[s.formText]}">Form text</Text>
<Text style="{[s.formLabelText]}">Form label text</Text>
<Text style="{[s.navLinkText]}">Nav link</Text>
...
```



## Content and Utilities

Check the related chapter in the Bootstrap [documentation](https://getbootstrap.com/docs/4.5/utilities/) to get the list of all the utilities.

What's implemented or near to:  
- align 
- background 
- borders 
- display 
- flex 
- sizing 
- spacing 
- text  

also:  
- tables




## Elements

Bootstrap calls them components. The term is changed to not mess with React components.
Check the related chapter in the Bootstrap [documentation](https://getbootstrap.com/docs/4.5/components/) to get the list of all the elements (ie components).

What's implemented or neat to: 
- buttons 
- cards 
- forms 
- modal 
- pagination 
- progress 




### Buttons


TouchableHighlight as button:
```jsx
<TouchableHighlight onPress={this.onPress} style=[{s.btnTouchable}]>
  <View style={[s.btn, s.btnPrimary]}>
    <Text style={[s.btnText, s.btnPrimaryText]}>Signup</Text>
  </View>
</TouchableHighlight>
```

Links as default and outline buttons with some optional tweaks (see `underlayColor`):
```jsx
// import { Link } from 'react-router-native';
<Link to="/submit" component={TouchableHighlight} underlayColor={c.BLACK} style={[s.btnTouchable]}>
  <View style={[s.btn, s.btnPrimary]}>
    <Text style={[s.btnText, s.btnPrimaryText]}>Submit</Text>
  </View>
</Link>

<Link to="/cancel" component={TouchableHighlight} underlayColor={c.BLACK} style={[s.btnTouchable, s.mt3]}>
  <View style={[s.btn, s.btnOutlinePrimary]}>
    <Text style={[s.btnText, s.btnOutlinePrimaryText]}>Cancel</Text>
  </View>
</Link>
```



### Card

Basic card:
```jsx
<View style={[s.card]}>
  <View style={[s.cardBody]}>
    <Text style={[s.text]}>Hello Card!</Text>
  </View>
</View>
```



### Modal

Basic modal (temporal approach, till higher level component added to the lib):
```jsx
<Modal
  animationType={animationType}
  transparent={transparent}
  visible={this.state.modal}
  onRequestClose={this.hide}
  onShow={this.onShown}
  onDismiss={this.onHidden}
>
  <View style={[s.modal]}>
    <View style={[s.modalDialog]}>
      <View style={[s.modalContent]}>
        <Text style={[s.text]>Hello Modal!</Text>
      </View>
    </View>
  </View>
</Modal>
```



### Progress bar

Basic progress bar
```jsx
<View style={[s.progress]}>
  <View style={[s.progressBar, {width: `${progress * 100}%`}]} />
</View>
```




## Misc


### Selectors  

An attempt to mimic CSS selectors for group pseudo-classes, such as `:first-child`, and media queries:
```jsx
<View style={[s.flexRow]}>
  {
    group.map((item, index) => (
      <View key={index} style={[s.selectorFirstChild(index, s.bgLight)]}>
        <Text style={[s.selectorMediaUpMd([s.text, s.textPrimary])>Colored for Md+</Text>
        <Text style={[s.selectorMediaLandscape([s.text, s.textPrimary])>Colored for Lanscape</Text>
      </View>
    ))
  }
</View>
```

Check the full list of selectors in the source code:  
[./src/mixins/selectors.js](./src/mixins/selectors.js)

Some element classes have selector-based extensions, for example `cardHeaderFirstChild`:
```
provide an example...
```


### Custom

- `flex` is an alias for `flex1`, and the same for `flex{screen}`  
- some styles contain undocumented, but supported by [Yoga](https://yogalayout.com/), instructions, such as `width: '100%'`. React Native uses Yoga as a layout engine.  

