---
layout: page
title: News
nav_order: 3
description: "CityJSON news"
permalink: /news/
---

<h1>News</h1> 

{% for post in site.posts %}
  <h3><small><span class="post-date">{{ post.date | date_to_string }}</span></small><br><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>
{% endfor %}

<br>
<span class="grey"><a href="{{ site.baseurl }}/feed.xml"><i class="fa fa-rss"></i> RSS</a></span>
