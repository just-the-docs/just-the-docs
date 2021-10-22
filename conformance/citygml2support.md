---
layout: default
title: CityGML compatibility
nav_exclude: true
permalink: /conformance/v20/
---

# Conformance of CityJSON v1.0 with CityGML 2.0

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


CityJSON v1.0 implements most of the CityGML v2.0 data model, and *all* the CityGML modules have been mapped to CityJSON objects. 
However, for the sake of simplicity and efficiency, some modules and features have been omitted and/or simplified. 
If a module is supported, it does not mean that there is a 1-to-1 mapping between the classes and features in CityGML and CityJSON, but rather that it is possible to represent the same information, but in a different manner. 
The differences in the structure of the modules were made to improve the usability of CityJSON in practice (we identified where XML-encoded CityGML files were cumbersome to work with, and modified those), all decisions were made so that developers can easily manipulate files.

CityJSON is thus conformant to a subset of CityGML (although technically only CityGML files can be conformant to the specifications of CityGML, see Section 2 of [the official documentation for version 2.0.0](https://portal.opengeospatial.org/files/?artifact_id=47842)).
And as shown below, CityJSON files can be automatically to XML-encoded CityGML files, and vice-versa.

## CityGML features supported

The types of objects stored in CityGML are grouped into different modules, and CityJSON supports these (more details below):

1.  **CityGML Core**: all geometries can be represented, Implicit Geometries are supported (called Geometry Templates). However, the `ExternalReferences` are not supported. `Address`: everything is supported.
2.  **Building**: everything is supported except LoD4 features (interior of buildings) and the concept of Terrain-Intersection-Curve (TIC)
3.  **Bridge**: everything is supported except LoD4 features (interior rooms of bridges)
4.  **Tunnel**: everything is supported except LoD4 features (interior parts of Tunnel Installations)
5.  **CityFurniture**: benches, traffic lights, signs, etc. are all supported
6.  **LandUse**: everything supported
7.  **Relief/DTM**: only the `TINRelief/TriangulatedSurface` is currently supported. `Tin` (where only elevation points and break lines are stored) is not supported since it would require viewer/applications to have a *constrained Delaunay triangulator*, which is problematic (especially for web-based tools). Also, it is not possible to store areas over a terrain that would support different resolutions (as in Figure 25 of the [CityGML standard document](https://portal.opengeospatial.org/files/?artifact_id=47842)). `RasterRelief` is also not supported.
8.  **Transportation**: most modules supported, except the class "Path" is not used (an attribute to the class "Road" is used instead). We plan to develop a network type in future versions to support modelling a network properly, a simple set of line strings is not sufficient.
9.  **CityObjectGroup**: groups of City Objects are supported, but not groups of parts of objects (eg it is not possible to group some walls of a building together)
10. **Vegetation**: everything is supported
11. **WaterBody**: everything is supported
12. **Generics**: everything is supported
13. **Groups**: everything is supported, except that groups can only be for grouping City Objects (and not surfaces or parts of City Objects as it can be in CityGML)

__Extensions__ to the core data model are also supported (called ADEs in CityGML -- Application Domain Extensions).
CityJSON Extensions are however different from CityGML ADEs, they do not follow the same rules and thus cannot be considered as a direct JSON translation.
They are deliberately *simpler* than ADEs, with the aim of being easy to use in practice (ADEs are generally not very user-friendly).
However, they have the same purpose as ADEs, see the [Extensions page]({{ site.baseurl }}/extensions/) for details.


## CityGML features __not__ supported

  1. __LoD4 of CityGML,__ which was mostly designed to represent the interior of buildings (including details and furniture). The main reason is that currently there are virtually no datasets having LoD4 buildings. If there is a need in the future, the concepts and the implementation would follow the same rules described above.
  1. __Several CRSs in the same datasets.__ In CityJSON, all geometries in a given CityJSON object must use the same CRS. In CityGML, 3 adjacent buildings can all have different CRSs, and some of the geometries to represent the walls can be in yet another CRS (although admittedly it is seldom used!).
  1. __Arbitrary coordinate reference systems (CRSs).__ Only an [EPSG code](https://epsg.io) can be used. (For the future, we plan to allow other authorities than only EPSG.)
  1. __Identifiers for low-level geometries.__ In CityGML most objects can have an ID (usually a `gml:id). That is, not only can one building have an ID, but also each of the 3D primitives forming its geometry can have an ID. In CityJSON, only city objects and semantic surfaces can have IDs.
  1. __Raster files for the relief.__ Only TINs are supported.
  1. __CityGML class `GeoreferencedTexture`.__ In the **Appearance** module, the CityGML class `TexCoordGen` is not supported, ie one must specify the UV coordinates in the texture files. 
  1. __topological relationships,__ eg *relativeToTerrain* and *relativeToWater*, which qualify relationships, are not supported. XLinks to identify that some surfaces are shared between 2 objects is also not supported, however the fact that more topology is explicitly stored compensates somehow.
  1. __Terrain Intersection Curve (TIC).__ This feature of CityGML is seldom used in practice it seems, and can always be simply computed on-the-fly: intersection between the solid of the buildings (or other objects) and the terrain. Furthermore, it is dependent on the LoD of the object (different LoDs can have different footprints)
  1. __Complex attributes have been simplified__. For instance, several attributes in CityGML are derived from `gml:Measure` (like `bldg:measuredHeight`), and thus you cannot just store a value but also the unit of measurement. This is not represented in CityJSON directly, an Extension must be used. Also, generic attributes in CityGML cannot be mapped simply because in CityJSON you can add any attributes you like (inline with the JSON philosophy). 


## Extra features (not in CityGML)

  1. CityJSON has built-in support for the metadata of a dataset (and is ISO 19115-compliant), while, surprisingly, CityGML does not offer that possibility.
  2. CityJSON supports the so-called ["TU Delft LoDs"](https://3d.bk.tudelft.nl/lod), which refine and improve the 5 LoDs in CityGML (only for buildings).


## Conversion CityJSON files <-> XML-encoded CityGML files

The open-source software [citygml-tools](https://github.com/citygml4j/citygml-tools), which is based on [citygml4j](https://github.com/citygml4j/citygml4j) allows us to convert a CityJSON file to an XML-encoded CityGML file, and vice-versa.

  - if the CityGML file contains features not supported (see above) then a warning is raise.
  - identifiers for edges and points are simply discarded.
  - if a CityJSON file has metadata, then they are ignored in the output CityGML file. Since CityGML has no structure way to store metadata, if there are in a XML-encoded file then they are ignored in the conversion.
  - all the elements in the CityGML need to be in the same CRS for the conversion to be successful.