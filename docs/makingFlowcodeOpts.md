---
layout: default
title: Making FlowcodeOptions object 
nav_order: 3
---
# Making FlowcodeOptions object

For making the flowcode options object, it will depende on the parameter of the user . for expample user can select different pattern, colors, centerImgae. etc .
depending on the user Input the value of the deafult objects will change and create a new object . the code is given in the following.

```js
const tvFlowcodeOptions = useMemo(() => {
  const isInverted=false;
  const rotateEyes = true;
  const backgroundColor=selectedColor?.code;
  const gridModuleShape= +selectedPattern?.id
  const invertedColorOpts = getInvertedColorTvCodeProps(rotateEyes, backgroundColor || '')
  const changedColors=getChangedColorTvCode(backgroundColor);
  const standardOpts = rotateEyes
    ? TV_CODE_FLOWCODE_OPTIONS
    : TV_CODE_FLOWCODE_OPTIONS_ROTATED_EYES
  // TODO = look into better way to distinguish between different shapes
  const customShape = !rotateEyes ? 'heart' : undefined
  const gridModuleSize = getGridModuleSizeForTVCode(gridModuleShape || customShape)

  return {
    ...(isInverted ? invertedColorOpts : changedColors !== null? changedColors: standardOpts),
    gridModuleRandomSizes: gridModuleSize,
    containerOuterPatternRandomSizes: gridModuleSize
  }
}, [selectedPattern, selectedColor])
```

>This tvFlowcodeOptions object will change depending on user input pattern and color

to Support thesese changes there are few function you need to make to adjust the value that need to change

```js
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
export const getInvertedColorTvCodeProps = (
 isRotated: boolean,
 backgroundColor: string
): FcGeneratorOptions => {
 if (isRotated) {
   return {
     ...TV_CODE_FLOWCODE_OPTIONS_ROTATED_EYES,
     positionElementTopRight: {
       ...logoEyesStyle,
       backgroundColor
     },
     positionElementTopLeft: {
       ...otherEyesStyle,
       backgroundColor
     },
     positionElementBottomLeft: {
       ...otherEyesStyle,
       backgroundColor
     }
   }
 } else {
   return {
     ...TV_CODE_FLOWCODE_OPTIONS,
     positionElementTopRight: {
       ...otherEyesStyle,
       backgroundColor
     },
     positionElementTopLeft: {
       ...otherEyesStyle,
       backgroundColor
     },
     positionElementBottomLeft: {
       ...logoEyesStyle,
       backgroundColor
     }  
   }
 }
}
export const getGridModuleSizeForTVCode = (shape?: FcShape | 'heart'): string => {
 switch (shape) {
   case FcShape.SQUARE:
     return '80'
   case FcShape.SHAGGY:
     return '101'
   case 'heart':
   case FcShape.CIRCLE:
     return '95'
   default:
     return '125'
 }
}
```

> - You need make you own funtions and changing parameters if needed.
