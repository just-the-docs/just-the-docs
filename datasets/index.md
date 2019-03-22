---
layout: default
title: Datasets
nav_order: 6
description: "CityJSON datasets"
permalink: /datasets/
---

# Software

We offer here a *curated* list of sofware that we believe are useful to practioners and researchers dealing with CityGML.
Most of the software are recent and well-maintained; if you believe your software should be there please [let us know](/contribute/).

Free and open-source software are marked by <img height="15" src="/img/foss.svg">


## Table of contents
{: .no_toc .text-delta }

1. TOC
* Table of Content
{:toc}

- - -

{% assign software = site.data.software | better_sort: 'name' %}

## Viewers
{: .d-inline-block }
New
{: .label .label-green }

{% for i in software %}
{% if i.category contains 'viewer' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="/img/foss.svg"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}

- - -

## Generators of 3D city models in CityGML
{% for i in software %}
{% if i.category contains 'generator' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="/img/foss.svg"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}

- - -

## Parsers and API for programmers
{% for i in software %}
{% if i.category contains 'parser' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="/img/foss.svg"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}


- - -

## Validators of different aspects of CityGML

(look at the [validation page](/validation/) where more details are available)

{% for i in software %}
{% if i.category contains 'validator' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="/img/foss.svg"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}

- - -

## Storage in DBMS
{% for i in software %}
{% if i.category contains 'storage' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="/img/foss.svg"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}

- - -

## Software that uses CityGML as input 
{% for i in software %}
{% if i.category contains 'applications' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="/img/foss.svg"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}



