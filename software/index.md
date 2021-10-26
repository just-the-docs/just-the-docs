---
layout: page
title: Software
nav_order: 3
description: "CityJSON homepage"
permalink: /software/
---

Here is a list of sofware that we believe are useful to practioners and researchers dealing with CityJSON.

Free and open-source software are marked by <img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}">.

Software for experimental features can be found in the respective pages of the [Experimental](https://www.cityjson.org/experimental) section of the website.

Most of the software are recent and well-maintained; if you believe your software should be there please [let us know](/contribute/).

---

<div class="d-xs-none d-md-block">

<h2 id="summary-table">Summary table</h2>

<table class="table table-hover d-block" id="software-table">
  <thead class="thead-light">
    <tr>
      <th>Software</th>
      <th></th>
      <th></th>
      <th>View</th>
      <th>Generate</th>
      <th>Edit</th>
      <th>Convert</th>
      <th>Parse/API</th>
      <th>Validate</th>
      <th>Store</th>
    </tr>
  </thead>
  <tbody>
    {% assign software = site.data.software %}
    {% for sf in software %}
      <tr>
        <th scope="row" style="text-align:left"><a style="font-size: 13px" href="{{ sf.webpage }}">{{ sf.name }} {% if sf.foss == true %}<img style="height: 13px" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}</a></th>
        <th scope="row">
        {% assign interface = sf.interface %}
        {% case interface %}
            {% when "gui" %}
                <i style="font-size: 11px" class="fas fa-mouse-pointer"></i>
            {% when "cli" %}
                <i style="font-size: 11px" class="fas fa-terminal"></i>
            {% when "both" %}
                <i style="font-size: 11px" class="fas fa-laptop-code"></i>
            {% else %}
        {% endcase %}
        </th>
        <th scope="row">
        {% assign type = sf.type %}
        {% case type %}
            {% when "app" %}
                <i style="font-size: 11px" class="fas fa-desktop"></i>
            {% when "lib" %}
                <i style="font-size: 11px" class="fas fa-code"></i>
            {% when "both" %}
                <i style="font-size: 11px" class="fas fa-folder-plus"></i>
            {% else %}
        {% endcase %}
        </th>
        <th scope="row">
        {% for cat in sf.category %}
            {% if cat contains 'viewer' %}
                <i class="fas fa-certificate"></i>
            {% endif %}
        {% endfor %}
        </th>
        <th scope="row">
        {% for cat in sf.category %}
            {% if cat contains 'generator' %}
                <i class="fas fa-certificate"></i>
            {% endif %}
        {% endfor %}
        </th>
        <th scope="row">
        {% for cat in sf.category %}
            {% if cat contains 'editor' %}
                <i class="fas fa-certificate"></i>
            {% endif %}
        {% endfor %}
        </th>
        <th scope="row">
        {% for cat in sf.category %}
            {% if cat contains 'converter' %}
                <i class="fas fa-certificate"></i>
            {% endif %}
        {% endfor %}
        </th>
        <th scope="row">
        {% for cat in sf.category %}
            {% if cat contains 'parser' %}
                <i class="fas fa-certificate"></i>
            {% endif %}
        {% endfor %}
        </th>
        <th scope="row">
        {% for cat in sf.category %}
            {% if cat contains 'validator' %}
                <i class="fas fa-certificate"></i>
            {% endif %}
        {% endfor %}
        </th>
        <th scope="row">
        {% for cat in sf.category %}
            {% if cat contains 'storage' %}
                <i class="fas fa-certificate"></i>
            {% endif %}
        {% endfor %}
        </th>
      </tr>
    {% endfor %}
  </tbody>
  <tfoot>
        <tr>
            <td colspan="9"><i class="fas fa-terminal"></i> Command Line Interface (CLI); <i class="fas fa-mouse-pointer"></i> Graphical User Interface (GUI); <i class="fas fa-laptop-code"></i> Both CLI & GUI</td>
        </tr>
        <tr>
            <td colspan="9"><i class="fas fa-desktop"></i> Application; <i class="fas fa-code"></i> Library; <i class="fas fa-folder-plus"></i> Both Application & Library</td>
        </tr>
    </tfoot>
</table>

<hr>

</div>

## Table of contents
{: .no_toc .text-delta }

1. TOC
<i class="fas fa-certificate"></i> Table of Content
{:toc}

---

{% assign software = site.data.software %}

## Viewers
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'viewer' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -

## Generators
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'generator' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -

## Editors
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'editor' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -

## Converters
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'converter' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -
## Storage
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'storage' %}
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

## Validators

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
