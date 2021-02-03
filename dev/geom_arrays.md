---
layout: page
title: Geometric primitives and depth of arrays
parent: Help for developers
nav_order: 3
permalink: /dev/geom-arrays/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


## MultiPoint

Four different points can be stored as follows, notice that the depth of the ``"boundaries"`` array is 1.

```javascript
{
  "type": "MultiPoint",
  "lod": 1,
  "boundaries": [2, 44, 0, 7]
}
```

---

## MultiLineString

Two line strings can be stored as follows,  notice that the depth of the ``"boundaries"`` array is 2.

```javascript
{
  "type": "MultiLineString",
  "lod": 1,
  "boundaries": [
    [2, 3, 5], [77, 55, 212]
  ]  
}
```

---

## MultiSurface

The depth of the ``"boundaries"`` array is one more: 3.

![](../files/ms.jpeg)

```javascript
{
  "type": "MultiSurface",
  "lod": 2,
  "boundaries": [
    [[0, 3, 2, 1]], [[4, 5, 6, 7]], [[0, 1, 5, 4]]
  ]
}
```

![](../files/msi.jpeg)

Notice that a MultiSurface can contain one surface with interior boundaries, and one without:

```javascript
{
  "type": "MultiSurface",
  "lod": 2,
  "boundaries": [
    [ [1, 2, 3, 4, 5], [6, 8, 7], [9, 12, 11, 10] ], [[14, 15, 16]]
  ]
}
```

---

## CompositeSurface

The depth of the ``"boundaries"`` array is the same as that of the MultiSurface

![](../files/cs.jpeg)

```javascript
{
  "type": "CompositeSurface",
  "lod": 2,
  "boundaries": [
    [[0, 3, 2, 1]], [[4, 5, 6, 7]], [[0, 1, 5, 4]]
  ]
}
```

---

## Solid

The depth of the ``"boundaries"`` array is one more: 4.

![](../files/sol.jpeg)

If the solid has interior boundaries (see the [ISO 19107 definition](http://geovalidation.bk.tudelft.nl/val3dity/docs/definitions/#solid)), then we obtain something like this:

```javascript
{
  "type": "Solid",
  "lod": 2,
  "boundaries": [
    [ [[0, 3, 2, 1, 22]], [[4, 5, 6, 7]], [[0, 1, 5, 4]], [[1, 2, 6, 5]] ], 
    [ [[240, 243, 124]], [[244, 246, 724]], [[34, 414, 45]], [[111, 246, 5]] ] 
  ]
}
```

---

## MultiSolid

The depth of the ``"boundaries"`` array is one more: 5 (same as CompositeSolid).

![](../files/msol.jpeg)

```javascript
{
  "type": "MultiSolid",
  "lod": 3,
  "boundaries": [
    [ 
      [ [[0, 3, 2, 1, 22]], [[4, 5, 6, 7]], [[0, 1, 5, 4]], [[1, 2, 6, 5]] ],
      [ [[240, 243, 124]], [[244, 246, 724]], [[34, 414, 45]], [[111, 246, 5]] ]
    ],
    [ 
      [ [[666, 667, 668]], [[74, 75, 76]], [[880, 881, 885]], [[111, 122, 226]] ] 
    ]    
  ]
}
```


---

## CompositeSolid

The depth of the ``"boundaries"`` array is 5 (same as MultiSolid).

![](../files/csol.jpeg)

```javascript
{
  "type": "CompositeSolid",
  "lod": 3,
  "boundaries": [
    [ 
      [ [[0, 3, 2, 1, 22]], [[4, 5, 6, 7]], [[0, 1, 5, 4]], [[1, 2, 6, 5]] ],
      [ [[240, 243, 124]], [[244, 246, 724]], [[34, 414, 45]], [[111, 246, 5]] ]
    ],
    [ 
      [ [[666, 667, 668]], [[74, 75, 76]], [[880, 881, 885]], [[111, 122, 226]] ] 
    ]    
  ]
}
```

---