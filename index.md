---
layout: default
title: Home
nav_order: 1
description: "CityJSON homepage"
permalink: /
---

<img src="/assets/images/cityjson_logo.svg" width="200">

CityGML without the GML
{: .fs-6 .fw-300 }

[Specifications](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/pmarsceill/just-the-docs){: .btn .fs-5 .mb-4 .mb-md-0 }

---

```js
{
  "type": "CityJSON",
  "version": "0.9",
  "extensions": { "Noise": "https://someurl.org/noise.json" },
  "metadata": { "referenceSystem": "urn:ogc:def:crs:EPSG::7415" },
  "CityObjects": {
    "id-1": {
      "type": "Building",
      "attributes": { "roofType": "gable" },
      "geometry": [{
        "type": "Solid",
        "lod": 2,
        "boundaries": [...]
      }]
    },
    "id-56": {...}
  },
  "vertices": [
    [23.1, 2321.2, 11.0],
    [14.0, 2299.5, 14.0],
    ...
  ],
  "appearance": {
    "textures": [...]
  },
  "geometry-templates": {...}
}
```
