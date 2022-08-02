---
layout: page
title: Upgrading your code for v1.1
parent: Help for developers
nav_order: 5
permalink: /dev/upgrade11/
---

The following 11 changes need to be considered:

1. TOC
{:toc}

---

## 1. `"version"` (obviously)

```json
"version": "1.1"
```

## 2. `"transform"` property is mandatory

Files are thus always compressed.


## 3. the `"lod"` for each Geometry is now a X.Y string (and not a number)

```json
"lod": "2.2"
```

## 4. `"metadata/referenceSystem"` is now using OGC URLs

```json
"metadata": {
  "referenceSystem": "https://www.opengis.net/def/crs/EPSG/0/2355"
}
```

The coordinate reference system (CRS) may be given as a URL, formatted this way according to the [OGC Name Type Specification](https://docs.opengeospatial.org/pol/09-048r5.html#_production_rule_for_specification_element_names): 

```
http://www.opengis.net/def/crs/{authority}/{version}/{code}
```

where `{authority}` designates the authority responsible for the definition of this CRS (usually "EPSG" or "OGC"), and where `{version}` designates the specific version of the CRS ("0" (zero) is used if there is no version).


## 5. Metadata properties are now limited to those 6

```json
"metadata": {
  "identifier": "eaeceeaa-3f66-429a-b81d-bbc6140b8c1c",
  "pointOfContact": {
    "contactName": "3D geoinformation group, Delft University of Technology",
    "contactType": "organization",
    "role": "owner",
    "phone": "+31-6666666666",
    "emailAddress": "3dgeoinfo-bk@tudelft.nl",
    "website": "https://3d.bk.tudelft.nl",
    "address": "Julianalaan 134, Delft 2628BL, the Netherlands"
  },
  "referenceDate": "1977-02-28",
  "title": "Buildings in LoD2.3 of Chibougamau, Québec",
  "geographicExtent": [ 84710.1, 446846.0, -5.3, 84757.1, 446944.0, 40.9 ],
  "referenceSystem": "https://www.opengis.net/def/crs/EPSG/0/2355"
}
```

The storage of additional ISO19115-compliant metadata attributes and/or of statistics related to 3D city models can be done with the [MetadataExtended Extension](https://github.com/cityjson/metadata-extended).


## 6. `"CityObjectGroup"`: `"members"` -> `"children"` 

and the children need to add the group ID as a `"parents"`

This harmonises the `"CityObjectGroup"` with the other City Objects in CityJSON.


## 7. `"GenericCityObject"` does not exist anymore

Instead, an Extension needs to be used.

You can just use the type `"+GenericCityObject"` we have defined with its [Extension schema hosted there](https://www.cityjson.org/extensions/download/generic.ext.json).

```json
"extensions":
{
  "Generic":
  {
    "url": "https://www.cityjson.org/extensions/download/generic.ext.json",
    "version": "1.0"
  }
}
```

The [resulting file would look like this](https://3d.bk.tudelft.nl/opendata/cityjson/simplegeom/v1.1/cube.city.json).



## 8. New City Objects from CityGML v3.0 have been added

  - `"BridgeRoom"`
  - `"BridgeFurniture"`
  - `"BuildingConstructiveElement"`
  - `"BuildingFurniture"`
  - `"BuildingStorey"` 
  - `"BuildingRoom"`
  - `"BuildingUnit"`
  - `OtherConstruction`
  - `"TunnelConstructiveElement"`
  - `"TunnelHollowSpace"`
  - `"TunnelFurniture"`
  - `"Waterway"`

These behave exactly as the other City Objects (and thus no code should have to be modified).


## 9. `"BridgeConstructionElement"` -> `"BridgeConstructiveElement"`

For reasons that are not understood by nobody, CityGML v3 decided to rename `"BridgeConstructionElement"` to `"BridgeConstructiveElement"`.

So CityJSON did the same too.


## 10. `"geometry"` is not mandatory anymore

City Objects do not have to have a `"geometry"` property anymore (in v1.0 an empty array was required).


## 11. If relevant, support the type `"CityJSONFeature"`

This is relevant in the context of streaming datasets on the web, eg for the [OGC API - Features](https://github.com/opengeospatial/ogcapi-features).

See [the specifications for more details](https://cityjson.org/specs/1.1.0/#text-sequences-and-streaming-with-cityjsonfeature).