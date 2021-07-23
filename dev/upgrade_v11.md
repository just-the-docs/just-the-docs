---
layout: page
title: Upgrade files to v1.1
parent: Help for developers
nav_order: 4
permalink: /dev/upgrade11/
---

CityJSON v1.0 files can be automatically upgraded to v1.1 with [cjio](https://github.com/cityjson/cjio) `upgrade_version` operator, it takes care of *everything*:

```bash
cjio myfile_v10.json upgrade_version save myfile_v11.json
```

---

The following 7 changes are needed to upgrade your files to v1.1 (from v1.0):

1. TOC
{:toc}

---

## 1. version (obviously)

```json
"version": "1.1"
```

## 2. `"transform"` property is mandatory

Files are thus always compressed.


## 3. the `"lod"` for each Geometry is now a string (and not a number)

```json
"lod": "2.2"
```

## 4. CityObjectGroup has its `"members"` renamed to `"children"` and the children need to add the group as a `"parents"`


## 5. Metadata properties are now limited to those 6

```json
"metadata": {
  "citymodelIdentifier": "eaeceeaa-3f66-429a-b81d-bbc6140b8c1c",
  "datasetTitle": "Buildings in LoD2.3 of Chibougamau, Québec",
  "datasetReferenceDate": "1977-02-28",
  "geographicalExtent": [ 84710.1, 446846.0, -5.3, 84757.1, 446944.0, 40.9 ],
  "geographicLocation": "Chibougamau, Québec, Canada",
  "referenceSystem": "https://www.opengis.net/def/crs/EPSG/0/2355"
}
```

The storage of additional ISO19115-compliant metadata attributes and/or of statistics related to 3D city models can be done with the [MetadataExtended Extension](https://github.com/cityjson/metadata-extended).

cjio takes care of this automatically.


## 6. `"Metadata/referenceSystem"` is now using OGC URLs

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
            

## 7. `"GenericCityObject"` do not exist anymore

Instead, an Extension needs to be used.

The automatic upgrade function in cjio transform them to `"+GenericCityObject"` and uses a built-in Extension from CityJSON.

```json
"extensions":
{
    "Generic":
    {
        "url": "https://homepage.tudelft.nl/23t4p/generic.ext.json",
        "version": "1.0"
    }
},
```