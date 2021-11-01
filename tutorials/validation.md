---
layout: page
title: Validation of a CityJSON file
parent: Tutorials
nav_order: 2
permalink: /tutorials/validation/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Validation of a CityJSON dataset means that one must ensure that it respects the standardised specifications and definitions as given in the [specifications]({{ '/specs/latest/' | prepend: site.baseurl }}).


## Schema validation (is the syntax of the file OK?)

The JSON schemas of CityJSON can be downloaded, for each version, at [https://www.cityjson.org/schemas/](https://www.cityjson.org/schemas/).
These are based on the [JSON Schema project](https://json-schema.org/).

To validate a given file you can use any software listed [here](https://json-schema.org/implementations.html#validators).
However, it is rather tricky to stitch all the schemas together, and the handling of [Extensions]({{ '/extensions/' | prepend: site.baseurl }}) will not work.

The "official validator" for CityJSON is [cjval](https://github.com/cityjson/cjval), which is [available as a web-app](https://validator.cityjson.org) and with cjio.

To validate the file [twobuildings.city.json](../files/twobuildings.city.json), simply drag it to [https://validator.cityjson.org](https://validator.cityjson.org):

![](../files/v-cjval-wasm.png)

Or alternatively type `cjio twobuildings.city.json validate`

![](../files/v-cjio.png)

Observe that not only the schema was tested, but also the internal consistency of the file was tested.
The following were tested:
  1. JSON syntax
  1. CityJSON schemas
  1. Extension schemas
  1. parent_children_consistency
  1. wrong_vertex_index
  1. semantics_array
  1. extra_root_properties
  1. duplicate_vertices
  1. unused_vertices

It is possible that the validation returns warnings, eg when there are duplicate vertices, those are not considered errors and thus only a warning is raised.

Now download the [invalid file twobuildings_invalid.city.json](../files/twobuildings_invalid.city.json), and try to validate it.
You should get an error that `"CityObjects"` is a required property, and that it is missing from the file:

![](../files/v-invalid.png)

Fixing this is rather easy: remove the space between "City" and "Objects" at line 16 and then the file should be valid.

## Geometry (are the geometric primitives valid?)

CityJSON, as is the case for GML, use the [ISO 19107](http://www.iso.org/iso/catalogue_detail.htm?csnumber=26012) geometric primitives for representing the geometry of its objects: a 0D primitive is a `GM_Point`, a 1D a `GM_Curve`, a 2D a `GM_Surface`, and a 3D a `GM_Solid`.
A *d*-dimensional primitive is built with (*d-1*)-dimensional primitives, e.g. a `GM_Solid` is formed by several `GM_Surfaces`, which are formed of several `GM_Curves`, which are themselves formed of `GM_Point`.
While the ISO19107 primitives do not need to be linear or planar, i.e. curves defined by mathematical functions are allowed, CityGML uses a subset of ISO19107, with the following two restrictions: (1) `GM_Curves` can only be linear (thus only `LineStrings` and `LinearRings` are used); (2) `GM_Surfaces` can only be planar (thus `Polygons` are used).

![](../files/geomprimitives.png){: width="400px"}

Geometric primitives can be combined into either *aggregates* or *composites*.
An aggregate is an arbitrary collection of primitives of the same dimensionality that is simply used to bundle together geometries, it does not prescribe any topological relationships between the primitives.
The `Multi*` in CityGML are an example.
A composite of dimension *d* is a collection of *d*-dimensional primitives that form a *d*-manifold, which is a topological space that is locally like a *d*-dimensional Euclidean space. 
The most relevant example is `CompositeSurface`: it is a 2-manifold, or, in other words, a surface embedded in 3D space.

A valid primitive of dimension 3 means that all the lower-dimensional primitives used to represent the primitives are also valid.

To validate the geometric primitives in a CityJSON file, we recommend using [val3dity](https://github.com/tudelft3d/val3dity), which is ISO 19017 compliant, free, and open-source. 

It suffices to [download its latest binary](https://github.com/tudelft3d/val3dity/releases), open a console/terminal/shell and type: 

```
val3dity myfile.json
```

This will read the file and validate one-by-one each of the geometric primitives in the file and produce a summary.
If the file [twobuildings.city.json](../files/twobuildings.city.json) is used, then the following should be obtained:

![](../files/v-summary.png)

It can be seen that one of the 2 buildings is not valid, because it has duplicate vertices.
To know the details, you can produce a report (called `myreport.json`):
```
val3dity myfile.json --report myreport.json
```

Drag this file to the [online report browser](http://geovalidation.bk.tudelft.nl/val3dity/browser/), and we obtain:

![](../files/v-report.png)