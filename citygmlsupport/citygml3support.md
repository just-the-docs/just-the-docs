---
layout: default
title: CityGML v3.0 conformance
nav_exclude: true
permalink: /citygml3-conformance/
---

# Conformance of CityJSON v1.1 with CityGML 3.0

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

- - -

CityJSON v1.1 is conformant with the CityGML v3.0 data model.


The CityGML conceptual model is thematically decomposed into one Core module and 16 extension modules.
As the "modularisation" allows us to select which modules are supported by an encoding, below we list each of the modules and describe what is supported and where the so-called *null mapping* are applied.

![](../citygmlsupport/figs/citygml3modules.png)


## Overview CityGML modules

    ✅ : 100% supported
    ⚠️ : partially supported (often missing features are for the sake of an efficient implementation)
    ❌ : module not supported at all


| CityGML module   | compliant?  | extra info |
|:-----------------|:-----------:|:-----------|
| Core             | ⚠️          | All geometries can be represented, Implicit Geometries are supported (called [Geometry Templates](https://www.cityjson.org/specs/#geometry-templates)). Only the `ExternalReferences` are not supported.   |
| Appearance       | ⚠️          | the CityGML class `TexCoordGen` is not supported, ie one must specify the UV coordinates in the texture files.   |
| Bridge           | ✅          |   |
| Building         | ✅          |   |  
| CityFurniture    | ✅          |   |      
| CityObjectGroup  | ⚠️          | groups of City Objects are supported, but not groups of parts of objects (eg it is not possible to group some walls of a building together)  |       
| Construction     | ✅          |   |     
| Dynamizer        | ❌          |   | 
| Generics         | ✅          | everything supported, but implemention differs, [see details below](./#generics-module)  | 
| LandUse          | ✅          |   |
| PointCloud       | ❌          |   | 
| Relief           | ⚠️          | only the `TINRelief/TriangulatedSurface` is  supported. `Tin` (where only elevation points and break lines are stored) is not supported since it would require viewer/applications to have a *constrained Delaunay triangulator*, which is problematic (especially for web-based tools). Also, it is not possible to store areas over a terrain that would support different resolutions (as in Figure 25 of the [CityGML standard document](https://portal.opengeospatial.org/files/?artifact_id=47842)). `RasterRelief` is also not supported.  |
| Transportation   | ✅          |   | 
| Tunnel           | ✅          |   |
| Vegetation       | ✅          |   | 
| Versioning       | ❌          | instead, CityJSON aims at offering a Git-based alternative, see [our work-in-progress](/experimental/versioning/)  | 
| WaterBody        | ✅          |  | 



## Generics module

The generics module is for:

  1. adding generic attributes that are not prescribed by the CityGML data model
  1. representing city objects that are not described in the CityGML data model

CityJSON implements these but the handling differs from CityGML slightly.

### Adding new attributes

One of the philosophy of JSON is "schema-less", which means that one is allowed to define new properties for the JSON objects without documenting them in a JSON schema. 
While this is in contrast to CityGML (and GML as a whole) where the schemas are central, the schemas of CityJSON are partly following that philosophy. 
That is, for a given City Object, the "allowed" properties/attributes are listed in the schema, but it is not an error to add new ones. 
The "official validator" of CityJSON (cjio with the option `--validate`) does more than simply validate a dataset against the schemas, and will return a warning if an attribute is not in the schema, but it is not considered as invalid in CityJSON.

### Extensions to extend the data model

To add new city objects, CityGML has the ADE mecanism (Application Domain Extensions).
CityJSON has a similar concept, called [*Extensions*]({{ site.baseurl }}/extensions/).
Extensions do not follow the same rules and thus cannot be considered as a direct JSON translation of ADEs.
They are deliberately *simpler* than ADEs, with the aim of being easy to use in practice (ADEs are generally not very user-friendly).

Extensions allows us to: (1) add new complex attributes to existing City Objects; (2) add new properties at the root of a document; (3) create a new City Object, or "extending" one, and defining complex geometries


## Specific CityGML v3.0 features __not__ supported


  1. __Several CRSs in the same datasets.__ In CityJSON, all geometries in a given CityJSON object must use the same CRS. In CityGML, 3 adjacent buildings can all have different CRSs, and some of the geometries to represent the walls can be in yet another CRS (although admittedly it is seldom used!).
  1. __Identifiers for low-level geometries.__ In CityGML most objects can have an ID (usually a `gml:id). That is, not only can one building have an ID, but also each of the 3D primitives forming its geometry can have an ID. In CityJSON, only city objects and semantic surfaces can have IDs.
  1. __topological relationships,__ eg *relativeToTerrain* and *relativeToWater*, which qualify relationships, are not supported. XLinks to identify that some surfaces are shared between 2 objects is also not supported, however the fact that more topology is explicitly stored compensates somehow.
  1. __Terrain Intersection Curve (TIC).__ This feature of CityGML is seldom used in practice it seems, and can always be simply computed on-the-fly: intersection between the solid of the buildings (or other objects) and the terrain. Furthermore, it is dependent on the LoD of the object (different LoDs can have different footprints)
  1. __Complex attributes have been simplified__. For instance, several attributes in CityGML are derived from `gml:Measure` (like `bldg:measuredHeight`), and thus you cannot just store a value but also the unit of measurement. This is not represented in CityJSON directly, an Extension must be used. Also, generic attributes in CityGML cannot be mapped simply because in CityJSON you can add any attributes you like (inline with the JSON philosophy). 


## Extra features (not in CityGML)

  1. CityJSON has built-in support for the metadata of a dataset (and is ISO 19115-compliant), while, surprisingly, CityGML does not offer that possibility.
  1. CityJSON supports the so-called ["TU Delft LoDs"](https://3d.bk.tudelft.nl/lod), which refine and improve the 5 LoDs in CityGML (only for buildings).
  1. CityJSON addresses the issue of very large files, and how to stream them.

