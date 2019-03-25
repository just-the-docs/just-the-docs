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
    <td><b>CityGML file</b></td>
    <td><b>files</b></td>
    <td><b>textures</b></td>
    <td><b>details</b></td>
  </tr>
  {% for i in ds %}
    <tr>
      <td><a href="{{ i.url }}">{{ i.name }}</a></td>
      <td><a href="{{ i.json }}">[JSON]</a> <a href="{{ i.gml }}">[GML]</a></td>
      <td>
        {% if i.textures %}
          <a href="{{ i.textures }}">[ZIP]</a>
        {% else %}
          none
        {% endif %}
      </td>
      <td>{{ i.details }}</td>
    </tr>
  {% endfor %}
</table>


## Generating own area in 3D automatically

It is possible to generate automatically a 3D city model in CityJSON with [3dfier](https://github.com/tudelft3d/3dfier), just follow that simple [tutorial](https://github.com/tudelft3d/3dfier/wiki/General-3dfier-tutorial-to-generate-LOD1-models)



