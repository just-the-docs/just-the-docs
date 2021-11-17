---
layout: page
title:  The CityJSON logo, in different forms
nav_exclude: true
permalink: /logo/
---

- - -


{% for file in site.static_files %}
  {% if file.path contains "/logo/" %}

<small>{{ file.path }}</small><br>
<a href="{{ file.path | prepend: site.baseurl }}"><img width="400" src="{{ file.path | prepend: site.baseurl}}"/></a>

  {% endif %}
{% endfor %}