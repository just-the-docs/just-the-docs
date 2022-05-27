---
layout: default
title: Create StudioConfigId
parent: Creating Flowcode
nav_order: 1
---

# Create StudioConfigId
{: .no_toc }

In order to create StudioConfigId , we need to call graphql api called `https://api.stg.flowcode.com/graphql` and there is a mutation called createStudioConfigId.

We need to pass three aruments.
 1. configuration = FlowcodeOptionsObject
 2. name =Flowcode Url
 3. source= "DIY"(default)

The mutation query and response will look like the following 

```graphql

mutation createStudioConfig {
  createStudioConfig(configuration: "{\"data\":\"https://flowcode.com/p/50JKXaba0\",\"qrrotate\":false,\"logoWidth\":0,\"logoHeight\":0,\"radiusMask\":78,\"containerText\":[{\"text\":\"PRIVACY.FLOWCODE.COM\",\"font\":\"inter_medium\",\"fontSize\":7,\"fontColor\":\"#000\",\"position\":{\"property\":7,\"offsetPercentage\":2}}],\"containerShape\":1,\"gridModuleColor\":\"#00000\",\"gridModuleShape\":1,\"gridModuleImageUrl\":null,\"containerBorderSize\":7.5,\"containerBorderColor\":\"#000000\",\"errorCorrectionLevel\":2,\"gridModuleRandomSizes\":\"85\",\"dataGridPercentageSize\":72,\"gridModuleColorFillSvg\":false,\"positionElementTopLeft\":{\"outerShapeOutlineSize\":0,\"innerShapeWidth\":45,\"outerShapeWidth\":15,\"insetBorderPadding\":0.11,\"outerShape\":2,\"innerShape\":2},\"containerEmptySpaceSize\":6,\"positionElementTopRight\":{\"outerShapeOutlineSize\":0,\"innerShapeWidth\":45,\"outerShapeWidth\":15,\"insetBorderPadding\":0.11,\"outerShape\":2,\"innerShape\":2},\"containerImageUrlOpacity\":1,\"positionElementBottomLeft\":{\"outerShapeOutlineSize\":0,\"innerShapeWidth\":45,\"outerShapeWidth\":15,\"insetBorderPadding\":0.11,\"outerShape\":5,\"innerShape\":2,\"text\":{\"text\":\"FLOWCODE\",\"font\":\"inter_black\",\"fontColor\":\"#000000\",\"fontSize\":12,\"position\":{\"property\":0,\"offsetPercentage\":0}}},\"containerOuterPatternColor\":\"#000000\",\"containerOuterPatternShape\":1,\"containerImageBackgroundOnly\":false,\"containerImageOverlayPrivacy\":true,\"containerOuterPatternImageUrl\":null,\"containerBackgroundInsetExtend\":4,\"containerOuterPatternRandomSizes\":\"85\",\"containerOuterPatternColorFillSvg\":false,\"logoImageUrl\":\"\",\"defaultColor\":\"#FF0000\",\"alwaysUseDefaultColor\":true,\"isTVCode\":true,\"qrdensity\":4,\"containerBorderInsetEyes\":7,\"containerRimPatternSize\":85}", source: DIY, name: "DIY-F20-TEST"){
    studioConfig {
      id
    }
  }
}
​
### result
{
  "data": {
    "createStudioConfig": {
      "studioConfig": {
        "id": "U3R1ZGlvQ29uZmlnT2JqZWN0VHlwZTpjYTk0N2EyMS05YTgxLTRmYTgtOWI2MC1kZDQ3YzY2ZTY5NWM="
      }
    }
  }
}
```
- The above base64 decoded id is StudioConfigObjectType:ca947a21-9a81-4fa8-9b60-dd47c66e695c which is the global id for the created object.

- The id is then used in createBatch to build as many codes as you would like with the same design.

- NOTE: when we create codes with the same design we usually create a new studio_config_object so that when a user edits a design they don't affect all of the codes.
