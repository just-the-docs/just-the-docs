---
layout: page
title: Mapping the CityGML Noise ADE to a CityJSON Extension
parent: Help for users
grand_parent: Help
nav_order: 4
permalink: /help/users/extension/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

To illustrate the process of creating a new CityJSON Extension, we use the Noise ADE, which is the example case in the [CityGML 2.0 documentation](https://portal.opengeospatial.org/files/?artifact_id=47842) (Section 10.13.2 on p. 151 describes it; and Annex H on p. 305 gives more implementation details). 
The XSDs and some test datasets are available [here](http://schemas.opengis.net/citygml/examples/2.0/ade/noise-ade/).

The resulting files for this tutorial are available:

  - [noise.json](../files/noise.json)
  - [noise_data.json](../files/noise_data.json)


## Adding new attributes to Buildings

<img src="../files/noise_building.png" width="60%">

We first need to define the new attributes and specify that they can be used for `"Building"` and `"BuildingPart"`

```javascript
"definitions": {
  "measure": {
    "type": "object",
    "properties": {
      "value": { "type": "number" },
      "uom": { "type": "string" }
    },
    "required": [ "value", "uom" ],
    "additionalProperties": false
  }
},
"extraAttributes": {
  "Building": {
    "+noise-buildingReflection": { "type": "string" },
    "+noise-buildingReflectionCorrection": { "$ref": "#/definitions/measure" },
    "+noise-buildingLDenMax": { "$ref": "#/definitions/measure" },
    "+noise-buildingLDenMin": { "$ref": "#/definitions/measure" },
    "+noise-buildingLDenEq": { "$ref": "#/definitions/measure" },
    "+noise-buildingLNightMax": { "$ref": "#/definitions/measure" },
    "+noise-buildingLNightMin": { "$ref": "#/definitions/measure" },
    "+noise-buildingLNightEq": { "$ref": "#/definitions/measure" },
    "+noise-buildingHabitants": { "type": "integer" },
    "+noise-buildingAppartments": { "type": "integer" },
    "+noise-buildingImmissionPoints": { 
      "type": "array",
      "items": { "type": "integer" } },
    "+noise-remark": { "type": "string" }
  },
  "BuildingPart": {...}
}
```

A CityJSON file containing this new City Object would look like this:

```javascript
{
  "type": "CityJSON",
  "version": "1.0",
  "extensions": {
    "Noise": "https://someurl.org/noise.json" 
  },
  "CityObjects": {
    "1234": {
      "type": "Building",
      "toplevel": true,
      "attributes": {
        "roofType": "gable",
        "+noise-buildingReflectionCorrection": {
          "value": 4.123,
          "uom": "dB"
        },
        "+noise-buildingLNightMax": {
          "value": 43.123,
          "uom": "dB"
        }
      },
      "geometry": [...]
    }
  }
}
```

## Adding complex types for CityFurniture

<img src="../files/noise_cf.png" width="80%">

As it can be seen in the UML diagram, extending `"CityFurniture"` is more challenging because not only new simple attributes need to be defined, but a `"NoiseCityFurnitureSegment"` object, which has its own geometry (a 'gml:Curve').

The steps to follow are thus:

1.  Create new City Object: `"+NoiseCityFurnitureSegment"`
2.  Since `"CityFurniture"` is allowed to have `"children"` (all City Objects), we can reuse this to link a given `"CityFurniture"` to its children `"+NoiseCityFurnitureSegment"`.
3.  `"+NoiseCityFurnitureSegment"` is a new City Object and it gets the attributes common to all City Objects, and its geometry is restricted to a `"MultiLineString"`. It also gets one property `"parent"` which links to its parent `"CityFurniture"`.

```javascript
"+NoiseCityFurnitureSegment": {
  "allOf": [
    { "$ref": "../cityobjects.json#/_AbstractCityObject"},
    {
      "properties": {
        "type": { "enum": ["+NoiseCityFurnitureSegment"] },
        "toplevel": { "type": "boolean" },
        "attributes": {
          "properties": {
            "reflection": { "type": "string" },
            "reflectionCorrection": { "$ref": "#/definitions/measure" },
            "height": { "$ref": "#/definitions/measure" },
            "distance": { "$ref": "#/definitions/measure" }
          }
        },
        "parent": {
          "type": "string",
          "description": "the ID of the children CityFurniture"
        },
        "geometry": {
          "type": "array",
          "items": {
            "oneOf": [
              {"$ref": "../geomprimitives.json#/MultiLineString"}
            ]
          }
        }        
      },
      "required": ["type", "toplevel", "parent", "geometry"]
    }
  ]
}
```

```javascript
"a_noisy_bench": {
  "type": "CityFurniture",
  "geometry": [
    {
      "type": "Solid",
      "toplevel": true,
      "lod": 2,
      "boundaries": [
        [ [[0, 3, 2, 1]], [[4, 5, 6, 7]], [[0, 1, 5, 4]], [[1, 2, 6, 5]], [[2, 3, 7, 6]], [[3, 0, 4, 7]] ] 
      ]
    }
  ],
  "children": ["thesegment_1", "thesegment_2"]
},
"thesegment_1": {
  "type": "+NoiseCityFurnitureSegment",
  "geometry": [
    {
      "type": "MultiLineString",
      "toplevel": false,
      "lod": 0,
      "boundaries": [
        [2, 3, 5], [77, 55, 212]
      ]
    }      
  ],
  "parent": "a_noisy_bench",
  "attributes": {
    "reflectionCorrection": 2.33
  }
}    
```

## Validation of the CityJSON_Extension file

We offer a small [validation script](https://github.com/cityjson/cityjson-example-code/tree/master/validate-extension) for the CityJSON_Extension.

For it to function properly, you need to add the CityJSON_Extension file (`noise.json` in our case) in the folder `/extensions` of the [CityJSON schemas]({{ '/schemas/' | prepend: site.baseurl }}); you need to download them locally. 
The files will therefore be structured as follows:

```
|-- appearance.schema.json
|-- cityjson.schema.json
|-- cityobjects.schema.json
|-- geomprimitives.schema.json
|-- geomtemplates.schema.json
|-- metadata.schema.json
|-- /extensions
    |-- extension.schema.json
    |-- noise.json
    |-- other_extensions.json
```  

To validate your extension (against the schema `extension.schema.json`) you can simply do:

```bash
python validate-extension.py noise.json
```


## Validation of CityJSON files containing extensions

The validation of a CityJSON file containing extensions needs to be performed as a 2-step operation:

  1.  The standard validation of all City Objects (except the new ones; those starting with `"+"` are ignored at this step);
  2.  Each City Object defined in the Extensions is (individually) validated against its schema defined in the new schema file.

While this could be done with any JSON schema validator, resolving all the JSON references could be slightly tricky. 
Thus, [cjio](https://github.com/cityjson/cjio) (with the option `--validate`) has automated this process. 

You just need to add the CityJSON_Extension files in the folder `/extensions`, as explained above.
Then specify the folder where the schemas are with the option `--folder_schemas`.

```bash
cjio noise_data.json validate --folder_schemas /home/elvis/cityjson/schema/
```


