---
layout: default
title: CityGML compatibility
nav_exclude: true
permalink: /citygml-compatibility/
---

# Compatibility with CityGML 2.0.0

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


## CityGML features supported

CityJSON implements most of the data model, and *all* the CityGML modules have been mapped to CityJSON objects. 
However, for the sake of simplicity and efficiency, some modules and features have been omitted and/or simplified. 
If a module is supported, it does not mean that there is a 1-to-1 mapping between the classes and features in CityGML and CityJSON, but rather that it is possible to represent the same information, but in a different manner. 
CityJSON is thus conformant to a subset of CityGML (although technically only CityGML files can be conformant to the specifications of CityGML, see Section 2 of [the official documentation for version 2.0.0](https://portal.opengeospatial.org/files/?artifact_id=47842)).

The types of objects stored in CityGML are grouped into different modules, and CityJSON supports these (more details below):

1.  **CityGML Core**: all geometries can be represented, Implicit Geometries are supported (called Geometry Templates). However, the `ExternalReferences` are not supported. `Address`: everything is supported.
2.  **Building**: everything is supported except LoD4 features (interior of buildings) and the concept of Terrain-Intersection-Curve (TIC)
3.  **Bridge**: everything is supported except LoD4 features (interior rooms of bridges)
4.  **Tunnel**: everything is supported except LoD4 features (interior parts of Tunnel Installations)
5.  **CityFurniture**: benches, traffic lights, signs, etc. are all supported
6.  **LandUse**: everything supported
7.  **Relief/DTM**: only the `TINRelief/TriangulatedSurface` is currently supported. `Tin` (where only elevation points and break lines are stored) is not supported since it would require viewer/applications to have a Constrained Delaunay Triangulator, which is problematic (especially for web-based tools). Also, it is not possible to store areas over a terrain that would support different resolutions (as in Figure 25 of the [CityGML standard document](https://portal.opengeospatial.org/files/?artifact_id=47842)). `RasterRelief` is also not supported.
8.  **Transportation**: most modules supported, except the class "Path" is not used (an attribute to the class "Road" is used instead). We plan to develop a network type in future versions to support modelling a network properly, a simple set of line strings is not sufficient.
9.  **CityObjectGroup**: groups of City Objects are supported, but not groups of parts of objects (eg it is not possible to group some walls of a building together)
10. **Vegetation**: everything is supported
11. **WaterBody**: everything is supported
12. **Generics**: everything is supported
13. **Groups**: everything is supported, except that groups can only be for grouping City Objects (and not surfaces or parts of City Objects as it can be in CityGML)

Furthermore, for the **Appearance** module: the CityGML class `GeoreferencedTexture` is not supported. 
The CityGML class `TexCoordGen` is not supported, ie one must specify the UV coordinates in the texture files. 

ADEs (Application Domain Extensions) are also supported, see the [Extensions page]({{ site.baseurl }}/extensions/) .


## CityGML features not supported

1.  in CityGML most objects can have an ID (usually `gml:id`), that is one Building can have an ID, but also each 3D primitive forming its geometry can have an ID. In CityJSON, only specs\_cityobjects can have IDs, and each specs\_semantics.
2.  no support for arbitrary coordinate reference systems (CRSs). Only an [EPSG code](https://epsg.io) can be used. Furthermore, all geometries in a given CityJSON must be using the same CRS.
3.  no support for the topological relationships that can be defined, eg *relativeToTerrain* and *relativeToWater*
4.  no *ClosureSurface*


## New features (not in CityGML)

CityJSON has built-in support for the metadata of a dataset (and is ISO 19115-compliant), while, surprisingly, CityGML does not offer that possibility.
