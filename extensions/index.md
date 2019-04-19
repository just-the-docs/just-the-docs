---
layout: default
title: Extensions
nav_order: 7
permalink: /extensions/
---

# Extensions
{: .no_toc }

CityJSON uses [JSON Schemas](http://json-schema.org/) to document and validate the data model, schemas should be seen as basically validating the syntax of a JSON document.

A CityJSON *Extension* is a JSON file that allows us to document how the core data model of CityJSON may be extended, and to validate CityJSON files containing new objects and/or attributes.
This is conceptually akin to the *Application Domain Extensions* (ADEs) in CityGML; see Section 10.13 of the [official CityGML documentation](https://portal.opengeospatial.org/files/?artifact_id=47842).

See the [Extensions specifications for v{{site.lastversion}}]({{ site.url }}{{ site.baseurl }}specs/{{ site.lastversion }}/#extensions)


## Registry of current Extensions

{% assign extensions = site.data.extensions | better_sort: 'name' %}

{% for i in extensions %}
<p>
  <b>{{ i.name }}</b>
  <br/>
  {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} 
  <br/>
  <a href="{{ i.url }}">download schema</a>
  {% if i.status %}
  <br/>
  status: {{ i.status }}
  {% endif %}
  {% if i.organisation %}
  <br/>
  developers: {{ i.organisation | markdownify | remove: '<p>' | remove: '</p>' }} 
  {% endif %}
</p>
{% endfor %}
