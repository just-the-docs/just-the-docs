---
layout: default
title: Home
nav_order: 1
description: "CityJSON homepage"
permalink: /
---

<img src="/assets/images/cityjson_logo.svg" width="200">

A compact and developer-friendly JSON-based encoding of the OGC CityGML data model
{: .fs-6 .fw-300 }

[Specifications (v1.0)]({{ '/specs/1.0/' | prepend: site.baseurl}}){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [Getting started]({{ '/tutorials/getting-started/' | prepend: site.baseurl}}){: .btn .fs-5 .mb-4 .mb-md-0 }

---

```js
{
  "type": "CityJSON",
  "version": "1.0",
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
  }
}
```

---

## Is CityJSON an official OGC standard?

No, and there are no concrete plans for CityJSON to be an OGC standard.
We simply implement an easier-to-use encoding of the [OGC CityGML data model](http://www.opengeospatial.org/standards/citygml).

CityJSON was started, and is maintained, by the [3D geoinformation group at TU Delft](https://3d.bk.tudelft.nl).



## Contributing to the project 

We invite anyone to contribute to the development and improvement of CityJSON, all [discussions, issues, and developments](https://github.com/tudelft3d/cityjson/issues) are open to everyone on the [GitHub repository of CityJSON](https://github.com/tudelft3d/cityjson).


## If you use CityJSON in an academic context, please cite this preprint

Ledoux H, Arroyo Ohori K, Kumar K, Dukai B, Labetski A, Vitalis A (2019). CityJSON: A compact and easy-to-useencoding of the CityGML data model. **arXiv 1902.09155** [<i class="fas fa-file-pdf"></i>](https://arxiv.org/pdf/1902.09155.pdf)



