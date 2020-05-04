---
layout: page
title: Software
nav_order: 8
description: "CityJSON homepage"
permalink: /software/
---

Here is a list of sofware that we believe are useful to practioners and researchers dealing with CityJSON.
Free and open-source software are marked by <img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}">
Software for experimental features can be found in the beta section of the website.
<!-- Most of the software are recent and well-maintained; if you believe your software should be there please [let us know](/contribute/). -->

---

<div class="d-xs-none d-md-block">

<h2 id="summary-table">Summary table</h2>

<table class="table table-hover d-block" id="software-table">
  <thead class="thead-light">
    <tr>
      <th scope="col">Software</th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">Viewer</th>
      <th scope="col">Generator</th>
      <th scope="col">Editor</th>
      <th scope="col">Transformer</th>
      <th scope="col">Parser</th>
      <th scope="col">Validator</th>
    </tr>
  </thead>
  <tbody>
    {% assign software = site.data.software %}
    {% for sf in software %}
      <tr>
        <th scope="row" style="text-align:left"><a href="{{ sf.webpage }}"><b>{{ sf.name }}</b></a> {% if sf.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}</th>
        <th scope="row">
        {% assign interface = sf.interface %}
        {% case interface %}
            {% when "gui" %}
                <i class="fas fa-mouse-pointer"></i>
            {% when "cli" %}
                <i class="fas fa-terminal"></i>
            {% when "both" %}
                <i class="fas fa-laptop-code"></i>
            {% else %}
        {% endcase %}
        </th>
        <th scope="row">
        {% assign type = sf.type %}
        {% case type %}
            {% when "app" %}
                <i class="fas fa-desktop"></i>
            {% when "lib" %}
                <i class="fas fa-code"></i>
            {% when "both" %}
                <i class="fas fa-folder-plus"></i>
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
            {% if cat contains 'transformer' %}
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

## Transformers
{% for i in software %}
{% for cat in i.category %}
{% if cat contains 'transformer' %}
<p><a href="{{ i.webpage }}"><b>{{ i.name }}</b></a> {% if i.foss == true %}<img height="15" src="{{ '/assets/images/foss.svg' | prepend: site.baseurl }}"> {% endif %}<br/> {{ i.description | markdownify | remove: '<p>' | remove: '</p>' }} </p>
{% endif %}
{% endfor %}
{% endfor %}

- - -
## DBMS storage
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

(look at the [tutorial on validation]({{ "/help/users/validation/" | prepend: site.baseurl }}) where more details are available)

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
