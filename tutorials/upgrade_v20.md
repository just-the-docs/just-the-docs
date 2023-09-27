---
layout: page
title: Upgrading a file from v1.1 to v2.0
parent: Tutorials
nav_order: 6
permalink: /tutorials/upgrade20/
---


{: .warning }
This is the manual to upgrade a file from v1.1, if you have v1.0 first check our [v1.0 -> v1.1 guide]({{ '/dev/upgrade11/' | prepend: site.baseurl }}).
The latest `cjio upgrade` will however update a v1.0 file directly to v2.0. 


## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Upgrading a file -> cjio 

Your CityJSON v1.1 files can be *automatically* upgraded to v2.0 with [cjio](https://github.com/cityjson/cjio).

First install or upgrade cjio:
```
pip install -U cjio
```
You should have >=v0.9.

After the installation, you have a small program called `cjio`.

To upgrade your file `myfile.json`:
```
cjio myfile.json upgrade save myfile_v20.city.json
```

which will save a new file `myfile_v20.city.json`.


## Upgrade your Extensions

If an Extension is used, update its `"versionCityJSON"` and add `"extraSemanticSurfaces"`

The `"versionCityJSON"` should be `"2.0"` and it is now possible to define new Semantic Surfaces, [see the specs](https://cityjson.org/specs/#case-3-defining-a-new-semantic-object):

```json
{
  "type": "CityJSONExtension",
  "name": "Demo",
  "uri": "https://www.someurl.org/demo.ext.json",
  "version": "1.0",
  "versionCityJSON": "2.0",
  "description": "Extension to handle massive potatoes in our cities",
  "extraRootProperties": {},     
  "extraAttributes": {},
  "extraCityObjects": {},
  "extraSemanticSurfaces": {}
}
```

To validate an Extension, you can use the validator of CityJSON ([cjval](https://validator.cityjson.org)), and it validates files with Extensions, see the [tutorial]({{ '/tutorials/validation/' | prepend: site.baseurl }}).

