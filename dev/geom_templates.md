---
layout: page
title: Help with geometry templates
parent: Help for developers
nav_order: 3
permalink: /dev/geom-templates/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


![](../files/bktree.png)


The file [`geomtemplate.city.json` (download it)](https://3d.bk.tudelft.nl/opendata/cityjson/simplegeom/v1.1/geomtemplate.city.json) shows an example of a [Geometry template]({{ '/specs/' | append: site.lastversion | append: '#geometry-templates' | prepend: site.baseurl }}).

The file contains one tree (here in yellow because it is selected in the viewer) represented as a cube of 10mX10mX10m and modelled with a Geometry template. 
It is located in front of the [building BK-City at TUDelft](https://iamap.tudelft.nl/en/poi/gebouw-08/).
As the metadata indicate, its CRS is [EPSG:7415](https://epsg.io/7415).

If you open the file with a viewer that supports geometry templates (eg [azul](https://github.com/tudelft3d/azul) and [QGIS-plugin](https://github.com/tudelft3d/cityjson-qgis-plugin)), and you open the [corresponding 3D BAG file](https://data.3dbag.nl/cityjson/v210908_fd2cee53/3dbag_v210908_fd2cee53_5910.json) you should see the "tree" in front of the main entrance (as in the screenshot above). 
The centre of the tree is about at location (85178.0, 446878.0, 10.0).

First notice that the transformation matrix has "1" in the diagonal so that the template is used as is, not scaling/rotation/translation.

```javascript
"geometry":
[
  {
    "type": "GeometryInstance",
    "template": 0,
    "boundaries": [0],
    "transformationMatrix": [
      1, 0, 0, 0, 
      0, 1, 0, 0, 
      0, 0, 1, 0, 
      0, 0, 0, 1 
    ] 
  }
]
```

The `"boundaries": [0]` means that the first vertex in `"vertices"` is used as the anchor point, and then the geometry template is a simple cube.


## Matrices for translation/scaling/rotation

![](../files/matrices.png)


## How to calculate the (x,y,z) for the tree

![](../files/realcoords.svg)