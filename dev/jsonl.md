---
layout: page
title: "CityJSONL: streaming with CityJSONFeature"
parent: Help for developers
nav_order: 6
permalink: /dev/jsonl/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


## CityJSONFeature

A `CityJSONFeature` object represents **one** feature in a CityJSON object, for instance a `"Building"` with eventually its children `"BuildingPart"` and/or `"BuildingInstallation"`.
The idea is to decompose a large file into each of its features, and each feature is a `CityJSONFeature`.
Each feature is independent, and has its own list of vertices (which is thus local).

See [full specifications for a CityJSONFeature](https://www.cityjson.org/specs/#text-sequences-and-streaming-with-cityjsonfeature).

```json
{
  "type": "CityJSONFeature",
  "id": "id-1", 
  "CityObjects": {
    "id-1": {
      "type": "Building", 
      "attributes": { 
        "roofType": "gabled roof"
      },
      "children": ["mypart"],
      "geometry": [...]
    },
    "mypart": {
      "type": "BuildingPart", 
      "parents": ["id-1"],
      "children": ["mybalcony"],
      "geometry": [...]
    },
    "mybalcony": {
      "type": "BuildingInstallation", 
      "parents": ["mypart"],
      "geometry": [...]
    }
  },
  "vertices": [...]
}
```


## Streaming with CityJSONL

Each CityJSON feature can become one line in a [JSON Lines text](https://jsonlines.org).
Since we want to have access to some properties, eg `"transformation"` and the CRS, those need to be known by the client/software parsing the stream.

We can add one line to a JSON Lines text stream (eg the first line) with those properties in a `"CityJSON"` object, as shown below.

```json
{"type":"CityJSON","version":"1.1","transform":{...},"CityObjects":{},"metadata":{...},"vertices":[]}
{"type":"CityJSONFeature","id":"a","CityObjects":{...},"vertices":[...]} 
{"type":"CityJSONFeature","id":"b","CityObjects":{...},"vertices":[...]} 
{"type":"CityJSONFeature","id":"c","CityObjects":{...},"vertices":[...]} 
```

## cjio can read and write CityJSONL

Starting from v0.8, cjio allows us to read/write from stdin/stdout (standard input/output streams), and it can use [CityJSONL (text sequences with CityJSONFeatures)](https://www.cityjson.org/specs/#text-sequences-and-streaming-with-cityjsonfeature).

One can create a CityJSONL stream (with the first line containing the metadata):

```
cjio --suppress_msg myfile.city.json export jsonl stdout
```

Observe that the different operators of cjio output messages/information, and those will get in the stdout stream, to avoid this add the flag `--suppress_msg` when reading the file

That stream can be saved to a file:

```
cjio --suppress_msg myfile.city.json export jsonl mystream.city.jsonl
```

And a CityJSONL can be compiled back to a CityJSON file by reading it from `stdin`:

```
cat mystream.city.jsonl | cjio stdin info save myfile_2.city.json
```

## cjval can validate a stream 

The official [schema-validator of CityJSON (called cjval)](https://github.com/cityjson/cjval) can also validate CityJSONL streams with its binary `cjfval`.
Each line is individually validated and errors reported:

```bash
cjio --suppress_msg myfile.city.json export jsonl stdout | cjfval --verbose
l.1 ✅
l.2 ❌ {"attributes":{"function":"something"},"geometry":[{"boundaries":[[[[0,1,2,3]],[[4,5,0,3]],[[5,6,1,0]],[[6,7,2,1]],[[3,2,7,4]],[[7,6,5,4]]]],"lod":"1","type":"Solid"}],"type":"+99999GnericCityObject"} is not valid under any of the given schemas [path:/CityObjects/id-1] |
l.3 ✅
l.4 🟡 Vertex (0, 1000, 0) duplicated | Vertex #8 is unused |
l.5 ✅
l.6 ✅
```


