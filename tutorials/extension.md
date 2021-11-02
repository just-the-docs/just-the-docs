---
layout: page
title: Mapping the Noise ADE to a CityJSON Extension
parent: Tutorials
nav_order: 4
permalink: /tutorials/extension/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

To illustrate the process of creating a new CityJSON Extension, we use the Noise ADE, which is the example case in the [CityGML 2.0 documentation](https://portal.opengeospatial.org/files/?artifact_id=47842) (Section 10.13.2 on p. 151 describes it; and Annex H on p. 305 gives more implementation details). 
The XSDs and some test datasets are available [here](http://schemas.opengis.net/citygml/examples/2.0/ade/noise-ade/).

The resulting files for this tutorial are available:

  - [noise.ext.json](../files/noise.ext.json)
  - [noise_data.city.json](../files/noise_data.city.json)


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
  "version": "1.1",
  "extensions": {
    "Noise": {
      "url" : "https://someurl.org/noise.json",
      "version": "1.1"
    }
  },
  "CityObjects": {
    "1234": {
      "type": "Building",
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
    { "$ref": "cityobjects.schema.json#/_AbstractCityObject"},
    {
      "properties": {
        "type": { "enum": ["+NoiseCityFurnitureSegment"] },
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
              {"$ref": "geomprimitives.schema.json#/MultiLineString"}
            ]
          }
        }        
      },
      "required": ["type", "parent", "geometry"]
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
      "lod": "2",
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
      "lod": "0",
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


## Validation of the CityJSONExtension file

First use [this simple JSON schema](https://github.com/cityjson/specs/blob/main/extensions/extension.schema.json) to ensure that your `CityJSONExtension` is syntactically valid.
You can use an [online JSON Schema validator](https://jsonschemalint.com/#!/version/draft-07/markup/json):

<img src="../files/noise-jsonschema.png">


To validate a given CityJSON file and test it locally with your Extension you have to use [cjval](https://github.com/cityjson/cjval).
If you use the option `--extensionfile` when validating, the Extension schemas will not be fetched automatically.

<img src="../files/noise-results.png">


Alternatively (if you don't want to install cjval), you can put your file `noise.ext.json` somewhere where it can be fetched (eg http://mywebsite.org/noise.ext.json), put that URL at line 6 and use the [online validator](https://validator.cityjson.org)



