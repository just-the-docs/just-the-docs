---
layout: page
title: Datasets
nav_order: 6
description: "CityJSON datasets"
permalink: /datasets/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Simple geometries

  - [https://github.com/cityjson/specs/blob/develop/example-datasets/simplegeom/tetra.json](tetra.json)
  - [https://github.com/cityjson/specs/blob/develop/example-datasets/simplegeom/cube.json](cube.json)
  - [https://github.com/cityjson/specs/blob/develop/example-datasets/simplegeom/torus.json](torus.json)
  - [https://github.com/cityjson/specs/blob/develop/example-datasets/simplegeom/twocube.json](twocube.json)

For different City Objects (buildings, trees, roads, etc.) and different geometries, see the latest [CityJSON specifications](https://www.cityjson.org/specs/).

## Datasets converted from CityGML

{% assign ds = site.data.datasets | sort: 'name' %}

<table >
  <tr>
    <td><b>dataset</b></td>
    <td><b>CityGML file (size)</b></td>
    <td><b>CityJSON file (size)</b></td>
    <td><b>textures</b></td>
    <td><b>details</b></td>
  </tr>
  {% for i in ds %}
    <tr>
      <td><a href="{{ i.url }}">{{ i.name }}</a></td>
      <td><a href="https://3d.bk.tudelft.nl/opendata/cityjson/citygml/{{ i.gml }}">[GML]</a> ({{ i.gml-size }}MB)</td>
      <td><a href="https://3d.bk.tudelft.nl/opendata/cityjson/1.0/{{ i.json }}">[JSON]</a> ({{ i.json-size }}MB)</td>
      <td>
        {% if i.textures %}
          <a href="https://3d.bk.tudelft.nl/opendata/cityjson/citygml/{{ i.textures }}">[ZIP]</a>
        {% else %}
          none
        {% endif %}
      </td>
      <td>{{ i.details }}</td>
    </tr>
  {% endfor %}
</table>

<i class="fas fa-exclamation-circle"></i> It should be observed that on average CityJSON compresses ~6X a CityGML, and that without any loss of information ([see details](https://github.com/cityjson/specs/wiki/Compression-factor-for-a-few-open-CityGML-datasets)).

## Generating automatically your own area

It is possible to generate automatically a 3D city model in CityJSON with [3dfier](https://github.com/tudelft3d/3dfier), just follow that simple [tutorial](https://tudelft3d.github.io/3dfier/generate_lod1.html).


## All USA buildings

The project [Open City Model](https://github.com/opencitymodel/opencitymodel) has converted all buildings in the USA to LoD1 buildings and offers them in CityJSON.

<i class="fas fa-exclamation-circle"></i> Watch out: the coordinates are in (lat, long, meters), which means that there's a mix of units (degrees and meters) and several viewers and processing software do not like this very much...
