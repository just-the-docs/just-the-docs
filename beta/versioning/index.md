---
layout: page
title: Versioning
parent: Beta
nav_order: 2
has_children: false
permalink: /beta/versioning/
---

Versioning is our approach to solving the problem of storing different iterations or variations of a city model in a structured and meaningful way. Our proposed solution describes how this can be possible through the CityJSON encoding.

We are actively working on perfecting the data structure and developing tools to work with it.

## Motivation

When a 3D city model is created, it represents its real-world counterpart at a snapshot in time. However, as time passes, the model needs to updated and evolve, much like its real-world counterpart. 

In order to keep a 3D city model up to date, new versions should regularly be created, due to three main reasons:
 1. Cities are constantly changing (e.g. a new building is built, a road is closed, etc.). 
 2. The modelling aspect of a project may change, such as when new information becomes available for existing city objects through the acquisition of a new dataset or the output of a new simulation. 
 3. Certain maintenance processes may cause changes to a dataset (e.g. geometric errors are fixed, or the classification used in an attribute is changed).

## Proposed Framework

All versions of all CityJSON objects are stored in a single file. Therefore, a CityJSON file acts as a repository, which can be refered to as “versioned CityJSON” (vCityJSON). 

Users can interact with a vCityJSON in two ways:
 1. By directly adding new city object versions manually (e.g. by duplicating an existing city object, renaming it and making the necessary changes). In this approach, they would need to add a new version and define it accordingly.
 2. It is possible to develop a tool that extracts a “simple” city model based on the description of one version in a vCityJSON file. Then, changes can be made to this file, after which the tool can incorporate the changes in the versioned CityJSON by adding all of the necessary new objects.

The structure of a vCityJSON is similar to a regular CityJSON, with the addition of a `versioning` property at the root of the CityJSON object:
```js
{
  "type": "CityJSON",
  "version": "1.0",
  "CityObjects": {},
  "versioning": {},
  "vertices": []
}
``` 
All versions of city objects are listed under the `CityObjects` property, as is the case in a regular CityJSON file. For example, if one vCityJSON file contains two versions of a building, then two city objects will be in the file as follows:
```js
{
  ... // Start of CityJSON
  "CityObjects": {
    "building1-original": {
      "type": "building",
      "geometry": [ ... ]
    },
    "building1-renovated": {
      "type": "building",
      "geometry": [ ... ]
    },
  },
  ... // Rest of CityJSON
}
``` 
Then the versions and their corresponding city objects are defined in the `versioning` property:
```js
{
  ... // Start of CityJSON
  "versioning": {
    "versions": {
      "v2": {
        "author": "John Doe",
        "message": "Change building1 according to renovation",
        "date": "20200501T13:46:45.511Z",
        "parents": ["v1"],
        "objects": {
          "building1": "building1-renovated"
        }
      },
      "v1": {
        "author": "John Doe",
        "message": "Add building1",
        "date": "20200221T13:46:45.511Z",
        "objects": {
          "building1": "building1-original"
        }
      }
    },
    "branches": {
      "master": "v2"
    },
    "tags": {
      "first-version": "v1"
    }
  }
  ... // Rest of CityJSON
}
```
Every `version` contains the `author`, `date`, and `message`. It also contains the list of objects that exist in this version through the `objects` property; this is a dictionary which maps the original city object's id with the versioned city object's id. For instance, in the example above the same building (which originally had the id `building1`) is represented in two different states, which are described by the `building-original` and `building1-renovated` city objects in the versioned file. Finally, every version has a list of `parents`, which is the name of the version that it derived from. For instance, `v2` came after `v1`, therefore `v1` is its parent. 

Traversing the versions through their parents builds the city model's history, as a graph. In this graph, `branches` can be denoted through the respective dictionary which maps a branch's name to a specific version. In a similar fashion, `tags` can be defined in the model to denote certain milestones.

## Software

{% assign software = site.data.beta.beta_software | better_sort: 'name' %}

{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'versioning' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

## Sample Data

<p><a href="https://github.com/tudelft3d/cityjson-versioning-prototype/blob/develop/Examples/dummy/buildingBeforeAndAfter.json"><b>J.R.R. Tolkien's dataset</b></a><br/>
Simple example with dummy data (no geometries) to describe a scenario with versions and branches. Created by J.R.R. Tolkien himself...
</p>

## Read More

**A Data Structure to Incorporate Versioning in 3D City Models.** Stelios Vitalis, Anna Labetski, Ken Arroyo Ohori, Hugo Ledoux and Jantien Stoter. 14th 3D GeoInfo Conference 2019, ISPRS Annals of the Photogrammetry, Remote Sensing and Spatial Information Sciences IV-4(W8), ISPRS, 2019 [<i class="fas fa-bookmark"></i>](https://doi.org/10.5194/isprs-annals-IV-4-W8-123-2019) [<i class="fas fa-file-pdf"></i>](https://www.isprs-ann-photogramm-remote-sens-spatial-inf-sci.net/IV-4-W8/123/2019/)