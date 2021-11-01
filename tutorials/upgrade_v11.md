---
layout: page
title: Upgrading to v1.1
parent: Tutorials
nav_order: 5
permalink: /tutorials/upgrade11/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Upgrading a file -> cjio 

Your CityJSON v1.0 files can be *automatically* upgraded to v1.1 with [cjio](https://github.com/cityjson/cjio).

First install or upgrade cjio:
```
pip install -U cjio
```

After the installation, you have a small program called `cjio` (with version >=0.7).

To upgrade your file `myfile.json`:
```
cjio myfile.json upgrade save myfile_v11.city.json
```

which will save a new file `myfile_v11.city.json`.


## If your file had Extensions

If your input files had Extensions, then these need to be updating manually.

1. change the `"type"` to `"CityJSONExtension"` (without the `"_"`)
2. add a new root properties `"cityjson_version": "1.1"` to indicate against which version (X.Y) of CityJSON the Extension is for
3. if you reused objects from the CityJSON schemas, then in v1.1 we assume that the Extension is in the "same folder" as those of CityJSON and the `../` must be removed

This is the old way:
```javascript
"+NoiseCityFurnitureSegment": {
  "allOf": [
    { "$ref": "../cityobjects.json#/_AbstractCityObject"},
    {
      "properties": { 
```

This is the new way in v1.1:
```javascript
"+NoiseCityFurnitureSegment": {
  "allOf": [
    { "$ref": "cityobjects.json#/_AbstractCityObject"},
    {
      "properties": { 
```


## Make your file publicly accessible

It is good practice to make your Extension publicly accessible so that data files using it can fetch the schema automatically.
You can put them on a repository in GitHub and link to the file directly, eg:

```json
"extensions": {
  "MyExtension": {
    "url" : "https://raw.githubusercontent.com/cityjson/specs/v1.1/extensions/Generic/generic.ext.json",
    "version": "0.2"
  }
}
```

## Validation of your Extension

The new validator of CityJSON is [cjval](https://validator.cityjson.org), and it validates files with Extensions, see the tutorial.

