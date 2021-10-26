---
layout: page
title: News
nav_exclude: true
description: "CityJSON news"
permalink: /news/
---

<a href="{{ site.baseurl }}/feed.xml"><i class="fa fa-rss"></i> subscribe to the news</a>
{: .no_toc .text-delta }


{% for post in site.posts %}
  <h3><span class="text-delta">{{ post.date | date_to_string }}</span><br><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>
{% endfor %}

