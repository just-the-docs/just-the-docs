
# React native dropdown picker
A picker (dropdown) component for react native which supports both Android & iOS.
## Getting Started
![Screenshot](https://raw.githubusercontent.com/hossein-zare/react-native-dropdown-picker/master/screenshots/1.png)
![Screenshot](https://raw.githubusercontent.com/hossein-zare/react-native-dropdown-picker/master/screenshots/2.png)

### Installation
##### via NPM
```sh
npm install react-native-dropdown-picker --save
```
##### via Yarn
```sh
yarn add react-native-dropdown-picker
```
### Basic Usage
First of all import the package.
```javascript
import DropDownPicker from 'react-native-dropdown-picker';
```
Render the component.
Read the docs to avoid mixing up props.
```javascript
<DropDownPicker
    items={[
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
    ]}
    defaultValue="item1"
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => console.log(item.label, item.value)}
/>
```

#### borderRadius
The only thing you have to avoid is `borderRadius`. All the corners must be set separately.

```javascript
style={{
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
    borderBottomLeftRadius: 10, borderBottomRightRadius: 10
}}
dropDownStyle={{
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20
}}
```

#### zIndex conflicts
A lot of users use the `containerStyle` property to style the picker which results in unexpected behaviors like untouchable scrollviews.

The `style` and `dropDownStyle` properties must be used instead.

Use the `containerStyle` prop to adjust the outer part of the picker such as `margin`, `width`, `height`, `flex`, ...

### Default item
You may want to select one of the items as default.

**Use one of these ways:**
1. Add `selected: true` to the object.

    ```javascript
    items={[
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2', selected: true},
    ]}
    ```
2. The `defaultIndex` property.

    ```javascript
    defaultIndex={1}
    ```
3. The `defaultValue` property.

    ```javascript
    defaultValue="item2"
    ```
### Placeholder
You may want to have a placeholder while the default value is null.

Add the following properties to the component.
```javascript
...
defaultNull
placeholder="Select an item"
...
```
#### Dynamic placeholder
Take note of the `defaultNull` property.

```javascript
state = {
    item: null
}

<DropDownPicker
    items={[
        {label: 'Item 1', value: 1},
        {label: 'Item 2', value: 2}
    ]}
    defaultNull={this.state.item === null}
    placeholder="Select an item"
    placeholderStyle={{fontWeight: 'bold'}}
    onChangeItem={(item)=> {
        this.setState({
            item: item.value
        });
    }}
    dropDownMaxHeight={240}
/>
```

In some cases you're going to create two or more pickers which are linked together.

Think of a country picker and city picker, whenever you're changing the country, the city picker should be reset and show the placeholder.
```javascript
import React from 'react';
export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: null,
            city: null,
            cities: []
        };
    }

    changeCountry(item) {
        let city = null;
        let cities;
        switch (item.value) {
            case 'fr':
                cities = [
                    {label: 'Paris', value: 'paris'}
                ];
            break;
            case 'es':
                cities = [
                    {label: 'Madrid', value: 'madrid'}
                ];
            break;
        }

        this.setState({
            city,
            cities
        });
    }

    changeCity(item) {
        this.setState({
            city: item.value
        });
    }

    render() {
        return (
            <>
                <DropDownPicker
                    items={[
                        {label: 'France', value: 'fr'},
                        {label: 'Spain', value: 'es'},
                    ]}
                    defaultNull={this.state.country === null}
                    placeholder="Select your country"
                    containerStyle={{height: 40}}
                    onChangeItem={item => this.changeCountry(item)}
                />
                <DropDownPicker
                    items={this.state.cities}
                    defaultNull={this.state.city === null}
                    placeholder="Select your city"
                    containerStyle={{height: 40}}
                    onChangeItem={item => this.changeCity(item)}
                />
            </>
        );
    }
}
```

### Dropdown Overflow
Adding borders to the component will separate or overflow elements. to solve this issue you just need to add `marginTop` to the `dropDownStyle` and specify the value which fits your component well.

```javascript
dropDownStyle={{marginTop: 2}}
```

### Styling the component
You have 9 options to style the component.
1. The `style` property.

    Use this to adjust the inner part of the picker.
    ```javacript
    style={{paddingVertical: 10}}
    ```
2. The `dropDownStyle` property.

    Additional styles for the dropdown box.
    ```javacript
    dropDownStyle={{backgroundColor: '#fafafa}}
    ```

3. The `containerStyle` property.
    
    Use this to adjust the outer part of the picker such as `margin`, `width`, `height`, `flex`, ...
    ```javacript
    containerStyle={{width: 150, height: 70}}
    ```
4. The `itemStyle` property.

    If you want the labels on the `left` and `right` side or to centerize them:
    ```javacript
    itemStyle={{alignItems: 'flex-start|flex-end|center'}}
    ```
5. The `labelStyle` property.

    This property gives full control over the label.
    ```javacript
    labelStyle={{fontSize: 14, color: '#000'}}
    ```
6. The `placeholderStyle` property.

    It is possible to style the placeholder text with this property.
    ```javacript
    placeholderStyle={{fontWeight: 'bold'}}
    ```
7. The `activeItemStyle` property.

    This property allows you to style the active item.
    ```javacript
    activeItemStyle={{alignItems: 'center'}}
    ```
8. The `activeLabelStyle` property.

    This property allows you to style the active label.
    ```javacript
    activeLabelStyle={{color: 'red'}}
    ```
9. The `arrowStyle` property.

    Adds your additional styles to the `View` element of the arrow.
    ```javacript
    arrowStyle={{marginRight: 10}}
    ```
### Props
|Name|Description|Type|Default|Required
|--|--|--|--|--
|**`items`**|The items for the component.|`array`||Yes
|`defaultIndex`|The index of the default item.|`number`|`0`|No
|`defaultValue`|The value of the default item.|`any`||No
|`defaultNull`|This sets the choice to null which should be used with `placeholder`|`bool`|`true`|No
|`placeholder`|Default text to be shown to the user which must be used with `defaultNull`|`string`|'Select an item'|No
|`dropDownMaxHeight`|Height of the dropdown box.|`number`|`150`|No
|`style`|Additional styles for the picker.|`object`|`{}`|No
|`dropDownStyle`|Additional styles for the dropdown box.|`object`|`{}`|No
|`containerStyle`|Additional styles for the container view.|`object`|`{}`|No
|`itemStyle`|Additional styles for the items.|`object`|`{}`|No
|`labelStyle`|Additional styles for the labels.|`object`|`{}`|No
|`placeholderStyle`|Additional styles for the placeholder text.|`object`|`{}`|No
|`activeItemStyle`|Additional styles for the active item.|`object`|`{}`|No
|`activeLabelStyle`|Additional styles for the active label.|`object`|`{}`|No
|`arrowStyle`|Additional styles for the arrow.|`object`|`{}`|No
|`arrowColor`|The color of arrow icons|`string`|`#000`|No
|`arrowSize`|The size of the arrow.|`number`|`15`|No
|`showArrow`|An option to show/hide the arrow.|`bool`|`true`|No
|`customArrowUp`|Customize the arrow-up.|`jsx`|`null`|No
|`customArrowDown`|Customize the arrow-down.|`jsx`|`null`|No
|`zIndex`|This property specifies the stack order of the component.|`number`|`5000`|No
|`disabled`|This disables the component.|`bool`|`false`|No
|`onChangeItem`|Callback which returns `item` and `index`. The `item` is the selected object.|`function`||No