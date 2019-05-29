---
layout: page
title: Modelling guide for CityJSON
parent: Tutorials
nav_order: 5
permalink: /tutorials/modelling-guide/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Geometry objects and Semantic Surfaces

Note that a single, empty surface is represented with a `[[]]`. In case the surface has one interior boundary then we have `[[],[]]`. However CityJSON does not allow `Surface` or `Polygon` as geometry type, only `MultiSurface`. Thus in case of a `MultiSurface` we have an array of surfaces, such as `[ [[0, 3, 2, 1]], [[4, 5, 6, 7]], [[0, 1, 5, 4]] ]`. 

A Semantic Surface refers to a *single* surface (as its name implies). Also, holes, interior surfaces cannot have semantics, but they the semantic of info of the surface itself. Hence there are 5 indices in the `semantics.values` property below (one per surface), not 6.

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
