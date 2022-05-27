---
layout: default
title: Importing types and objects
nav_order: 2
---

# Importing types and objects
{: .no_toc }

You need import types and objects inorder to create flocodeGenerationOptions Object.

```js
import {
    FcShape,
    FcText,
    FcGeneratorPositionElementOptions,
    FcPositionProperty,
    FcPosition,
    FcColorBlack,
    FcGeneratorOptions,

 } from '@flowcode/flowcode-generator-types'


 const tvCodeSizeOptions = {
 outerShapeOutlineSize: 0,
 innerShapeWidth: 45,
 outerShapeWidth: 15,
 insetBorderPadding: 0.11
}
const logoEyesStyle: FcGeneratorPositionElementOptions = {
 ...tvCodeSizeOptions,
 outerShape: FcShape.LOGO,
 innerShape: FcShape.SQUARE,
 text: {
   text: 'FLOWCODE',
   font: 'inter_black',
   fontColor: '#000000',
   fontSize: 12,
   position: { property: FcPositionProperty.DEFAULT, offsetPercentage: 0 }
 }
}
const otherEyesStyle: FcGeneratorPositionElementOptions = {
 ...tvCodeSizeOptions,
 outerShape: FcShape.SQUARE,
 innerShape: FcShape.SQUARE
}
const tvCodeOptions: FcGeneratorOptions = {
  data:"https://flowcode.com/p/",
 isTVCode: true,
 containerBackgroundInsetExtend: 4,
 qrdensity: 4,
 containerBorderSize: 7.5,
 containerBorderInsetEyes: 7,
 dataGridPercentageSize: 72,
 radiusMask: 78,
 containerRimPatternSize: 85,
 containerEmptySpaceSize: 6,
 containerText: [
   new FcText(
     'PRIVACY.FLOWCODE.COM',
     'inter_medium',
     7,
     FcColorBlack,
     new FcPosition(FcPositionProperty.BOTTOM, 2)
   )
 ]
}
export const TV_CODE_FLOWCODE_OPTIONS: FcGeneratorOptions = {
 ...tvCodeOptions,
 qrrotate: false,
 positionElementTopRight: otherEyesStyle,
 positionElementBottomLeft: logoEyesStyle,
 positionElementTopLeft: otherEyesStyle
}
export const TV_CODE_FLOWCODE_OPTIONS_ROTATED_EYES: FcGeneratorOptions = {
 ...tvCodeOptions,
 qrrotate: true,
 positionElementTopRight: logoEyesStyle,
 positionElementBottomLeft: otherEyesStyle,
 positionElementTopLeft: otherEyesStyle
}
export const getChangedColorTvCode =(color:string)=>{
  if(color){
    return{
      ...TV_CODE_FLOWCODE_OPTIONS,
      containerBorderColor:color,
      containerOuterPatternColor:color,
      gridModuleColor:color,
      positionElementTopLeft:{
       ...TV_CODE_FLOWCODE_OPTIONS.positionElementTopLeft,
       innerShapeColor:color,
       outerShapeColor:color,
      },
      positionElementTopRight:{
        ...TV_CODE_FLOWCODE_OPTIONS.positionElementTopLeft,
        innerShapeColor:color,
        outerShapeColor:color,
       },
       positionElementBottomLeft:{
        ...TV_CODE_FLOWCODE_OPTIONS.positionElementTopLeft,
        innerShapeColor:color,
        outerShapeColor:color,
       },
       containerText: [
        new FcText(
          'PRIVACY.FLOWCODE.COM',
          'inter_medium',
          7,
          color,
          new FcPosition(FcPositionProperty.BOTTOM, 2)
        )
      ]

    }
  }
}
```

> - These are the deafult options for flowcode Options. The main two objects are `TV_CODE_FLOWCODE_OPTIONS` and `TV_CODE_FLOWCODE_OPTIONS_ROTATED_EYES`. 

