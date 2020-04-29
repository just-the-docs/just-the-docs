---
layout: page
title: Versioning
parent: Beta
nav_order: 2
has_children: false
permalink: /beta/versioning/
---

When a 3D city model is created, it represents its real-world counterpart at a snapshot in time. However, as time passes, the model needs to be updated and to evolve, much like its real-world counterpart. 

In order to keep a 3D city model up to date, new versions of it should be regularly created due to three main causes:
 1. Cities are constantly changing (e.g. a new building is built, a road is closed, etc.). 
 2. The modelling aspect of a project may change, such as when new information becomes available for existing city objects through the acquisition of a new dataset or the output of a new simulation. 
 3. Certain maintenance processes may cause changes to a dataset (e.g. geometric errors are fixed, or the classification used in an attribute is changed).

## Proposed Framework

All versions of all CityJSON objects are stored in a single file. Therefore, a CityJSON file acts as a repository, which can be refered to as “versioned CityJSON” (vCityJSON). 

Users can interact with a vCityJSON in two ways:
 1. By directly adding new city object versions manually (e.g. by duplicating an existing city object, renaming it and making the necessary changes). In this approach, they would need to add a new version and define it accordingly.
 2. It is possible to develop a tool that extracts a “simple” city model based on the description of one version in a vCityJSON file. Then, changes can be made to this file, after which the tool can incorporate the changes in the versioned CityJSON by adding all of the necessary new objects.

The structure vCityJSON is similar to a regular CityJSON, with the addition of a "versioning" property at the root of the CityJSON object:
```js
{
  "type": "CityJSON",
  "version": "1.0",
  "CityObjects": {},
  "versioning": {},
  "vertices": []
}
``` 
All versions of city objects are listed under the "CityObjects" property, as is the case in a regular CityJSON file. For example, if one vCityJSON file contains two versions of a building, then two city objects will be in the file as follows:
```js
{
  ... // Start of CityJSON
  "CityObjects": {
    "building1": {
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

*I think it would be nice to have a link here to sample data? What do you think?*

## Read More

**A Data Structure to Incorporate Versioning in 3D City Models.** Stelios Vitalis, Anna Labetski, Ken Arroyo Ohori, Hugo Ledoux and Jantien Stoter. 14th 3D GeoInfo Conference 2019, ISPRS Annals of the Photogrammetry, Remote Sensing and Spatial Information Sciences IV-4(W8), ISPRS, 2019 [<i class="fas fa-bookmark"></i>](https://doi.org/10.5194/isprs-annals-IV-4-W8-123-2019) [<i class="fas fa-file-pdf"></i>](https://www.isprs-ann-photogramm-remote-sens-spatial-inf-sci.net/IV-4-W8/123/2019/)