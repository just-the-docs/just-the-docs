---
layout: page
title: Modelling guide for CityJSON
parent: Help for developers
nav_order: 1
permalink: /dev/modelling-guide/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Themes of Materials and Textures

The materials and textures of a Geometry are grouped into *themes*. In the example below, there are two material themes, `irradiation`, `irradiation-2`, and there are two texture themes, `winter-textures`, `summer-textures`.

A *theme* does not refer to a single Material or Texture object, but it gives a name to a certain configuration of materials or textures within a specific geometry.
In the example below, the material theme `irradiation` assigns the Materials with indices `0, 1` to the surfaces of the geometry.

```json
{
  "type": "Solid",
  "lod": "2.1",
  "boundaries": [
    [ [[0, 3, 2, 1]], [[4, 5, 6, 7]], [[0, 1, 5, 4]], [[1, 2, 6, 5]] ] 
  ],
  "material": {
    "irradiation": { 
      "values": [[0, 0, 1, null]] 
    },
    "irradiation-2": { 
      "values": [[2, 2, 1, null]] 
    }
  },
  "texture": {
    "winter-textures": {
      "values": [
        [ [[0, 10, 23, 22, 21]], [[0, 1, 2, 6, 5]], [[null]], [[null]] ]                  
      ]
    },
    "summer-textures": {
      "values": [
        [ 
          [[1, 10, 23, 22, 21]], 
          [[1, 1, 2, 6, 5]], 
          [[1, 66, 12, 64, 5]], 
          [[2, 99, 21, 16, 25]] 
        ]                  
      ]      
    }
  }
}
```

There is no global list of all the available themes in CityJSON, they are defined per geometry.
Following, the same theme for instance `irradiation`, can have a different configuration of materials (or textures) per geometry.
Although, it is possible to define a default theme in the Appearance object, it is advised to handle the case when the default theme cannot be found in the geometry.

## Geometry objects and Semantic Surfaces

Note that a single, empty surface is represented with a `[[]]`. In case the surface has one interior boundary then we have `[[],[]]`. However CityJSON does not allow `Surface` or `Polygon` as geometry type, only `MultiSurface`. Thus in case of a `MultiSurface` we have an array of surfaces, such as `[ [[0, 3, 2, 1]], [[4, 5, 6, 7]], [[0, 1, 5, 4]] ]`. 

A Semantic Surface refers to a *single* surface (as its name implies). Also, holes, interior surfaces cannot have semantics, but they get the semantic of info of the surface itself. Hence there are 5 indices in the `semantics.values` property below (one per surface), not 6.

```json
{
  "type": "MultiSurface",
  "lod": 2,
  "boundaries": [
    [[0, 3, 2, 1], [26, 13, 27, 28]], [[4, 5, 6, 7]], [[0, 1, 5, 4]], [[0, 2, 3, 8]], [[10, 12, 23, 48]]
  ],
  "semantics": {
    "surfaces" : [
      {
        "type": "WallSurface",
        "slope": 33.4,
        "children": [2]
      }, 
      {
        "type": "RoofSurface",
        "slope": 66.6
      },
      {
        "type": "Door",
        "parent": 0,
        "colour": "blue"
      }
    ],
    "values": [0, 0, null, 1, 2]
  }
}
```
