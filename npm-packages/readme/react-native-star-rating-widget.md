# react-native-star-rating-widget

[![npm version](https://badge.fury.io/js/react-native-star-rating-widget.svg)](https://badge.fury.io/js/react-native-star-rating-widget)

A customizable, animated star rating component for React Native. Compatible with iOS and Android. Written in Typescript.

![Demo](https://github.com/benediktviebahn/react-native-star-rating-widget/raw/master/media/demo.gif)

## Installation
1. install react-native-star-rating-widget
`npm install react-native-star-rating-widget --save` or `yarn add react-native-star-rating-widget`
2. if not already installed, add [react-native-svg](https://github.com/react-native-community/react-native-svg)

## Usage
```js
import StarRating from 'react-native-star-rating-widget';

const Example = () => {
  const [rating, setRating] = useState(0);
  return (
      <StarRating
        rating={rating}
        onChange={setRating}
      />
  );
};
```

## Props
| Name            | Type                                    | Default          | Description                                           |
| --------------- | --------------------------------------- | ---------------- | ----------------------------------------------------- |
| rating          | number                                  | **REQUIRED**     | Rating Value. Should be between 0 and `maxStars`      |
| onChange        | (number) => void                        | **REQUIRED**     | called when rating changes                            |
| maxStars        | number                                  | 5                | number of stars                                       |
| starSize        | number                                  | 32               | star size                                             |
| color           | string                                  | "#fdd835"        | star color                                            |
| emptyColor      | string                                  | same as `color`  | empty star color                                      |
| style           | object                                  | undefined        | optional style                                        |
| starStyle       | object                                  | undefined        | optional star style                                   |
| enableHalfStar  | boolean                                 | true             | enable or disable display of half stars               |
| enableSwiping   | boolean                                 | true             | enable or disable swiping                             |
| animationConfig | see [AnimationConfig](#animationConfig) | see [AnimationConfig](#animationConfig) | animation configuration object |

### AnimationConfig
| Name     | Type               | Default           | Description                                |
| -------- | ------------------ | ----------------- | ------------------------------------------ |
| scale    | number             | 1.2               | star animation scale value                 |
| duration | number             | 300               | animation duration                         |
| delay    | number             | 300               | animation delay when interaction has ended |
| easing   | (number) => number | Easing.elastic(2) | animation easing function                  |

A `StarRatingDisplay` component without any interaction functionality is exported as well.
