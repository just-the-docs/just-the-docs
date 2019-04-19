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

## Datasets converted from CityGML


{% assign ds = site.data.datasets | better_sort: 'name' %}
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
      <td><a href="https://3d.bk.tudelft.nl/opendata/cityjson/v09/{{ i.json }}">[JSON]</a> ({{ i.json-size }}MB)</td>
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

<i class="fas fa-exclamation-circle"></i> It should be observed that on average CityJSON compresses 7X a CityGML, and that without any loss of information ([see details](https://github.com/tudelft3d/cityjson/wiki/Compression-factor-for-a-few-open-CityGML-datasets)).

## Generating automatically your own area

It is possible to generate automatically a 3D city model in CityJSON with [3dfier](https://github.com/tudelft3d/3dfier), just follow that simple [tutorial](https://github.com/tudelft3d/3dfier/wiki/General-3dfier-tutorial-to-generate-LOD1-models)



