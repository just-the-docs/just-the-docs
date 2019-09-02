---
layout: default
title: Home
nav_order: 1
description: "CityJSON homepage"
permalink: /
---

<!-- <img src="{{ '/assets/images/cityjson_logo.svg' | prepend: site.baseurl }}" width="200"> -->
<img src="{{ '/assets/images/cityjson_logo.svg' | prepend: site.baseurl }}" width="600">

A compact and developer-friendly JSON-based encoding of the CityGML data model
{: .fs-6 .fw-300 }

[Getting started]({{ '/help/users/getting-started/' | prepend: site.baseurl }}){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } 
[Specifications (v{{ site.lastversion }})]({{ '/specs/' | append: site.lastversion | prepend: site.baseurl }}){: .btn .fs-5 .mb-4 .mb-md-0 }
<!-- [Web-viewer](https://tudelft3d.github.io/CityJSON-viewer/){: .btn .fs-5 .mb-4 .mb-md-0 } -->
<!-- [<i class="fab fa-github"></i> GitHub repository](https://github.com/tudelft3d/cityjson/){: .btn .fs-5 .mb-4 .mb-md-0 } -->


---

CityJSON is a [JSON-based](http://json.org) encoding for a subset of the [OGC CityGML](http://www.opengeospatial.org/standards/citygml) data model (version 2.0.0), which is an open standardised data model and exchange format (in [GML](http://www.opengeospatial.org/standards/gml)) to store digital 3D models of cities and landscapes. 

The aim of CityJSON is to offer an alternative to the GML encoding of CityGML, which can be verbose and complex (and thus rather frustrating to work with). 
CityJSON aims at being easy-to-use, both for reading datasets, and for creating them.
It was designed with programmers in mind, so that tools and APIs supporting it can be quickly built, and [several]({{ "/software/" | prepend: site.baseurl }}) have been created already.

We believe that you should use CityJSON because: 

  1. its simplicity means that it is already supported by [several software]({{ "/software/" | prepend: site.baseurl }}) 
  2. you can in one-click convert CityGML files to CityJSON files, and vice versa, with the open-source tool [citygml-tools](https://github.com/citygml4j/citygml-tools); we even have a [tutorial]({{ "/help/users/conversion/" | prepend: site.baseurl }})
  3. files are on average [6X more compact](https://github.com/tudelft3d/cityjson/wiki/Compression-factor-for-a-few-open-CityGML-datasets) than their CityGML equivalent
  4. there is a [web-viewer](https://viewer.cityjson.org) where you can drag-and-drop a file
  5. you can easily manipulate files with [cjio](https://github.com/tudelft3d/cjio), you can for instance merge files, remove/filter objects, change the CRS, manage the textures, etc.
  6. you can *easily* define [Extensions]({{ "/extensions/" | prepend: site.baseurl }}) to the core model (akin to ADEs) 
  7. its development is [open on GitHub](https://github.com/tudelft3d/cityjson/issues/), it is supported by a vibrant community, and everyone is welcome to contribute


---

## Contributing to the project 

We invite anyone to contribute to the development and improvement of CityJSON, all discussions, issues, and developments are open to everyone on the [GitHub repository of CityJSON](https://github.com/tudelft3d/cityjson).


## If you use CityJSON in an academic context, please cite this article

Ledoux H, Arroyo Ohori K, Kumar K, Dukai B, Labetski A, Vitalis S (2019). CityJSON: A compact and easy-to-use encoding of the CityGML data model. **Open Geospatial Data, Software and Standards**, 4:4 [<i class="fas fa-bookmark"></i>](http://dx.doi.org/10.1186/s40965-019-0064-0) [<i class="fas fa-file-pdf"></i>](https://opengeospatialdata.springeropen.com/track/pdf/10.1186/s40965-019-0064-0)



