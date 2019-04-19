---
layout: page
title: Software
nav_order: 8
description: "CityJSON homepage"
permalink: /software/
---

Here is a list of sofware that we believe are useful to practioners and researchers dealing with CityJSON.
Free and open-source software are marked by <img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}">
<!-- Most of the software are recent and well-maintained; if you believe your software should be there please [let us know](/contribute/). -->

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
* Table of Content
{:toc}

---

{% assign software = site.data.software | better_sort: 'name' %}

## Viewers
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'viewer' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -

## Generators of 3D city models in CityJSON
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'generator' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -

## Editor and manipulators for CityJSON files
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'manipulator' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -

## Parsers and API for programmers
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'parser' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}


- - -

## Validators of different aspects of CityGML

(look at the [tutorial on validation]({{ "/tutorials/validation/" | prepend: site.baseurl }}) where more details are available)

{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'validator' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -

<!-- ## Software that uses CityJSON as input 
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'applications' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}


 -->
