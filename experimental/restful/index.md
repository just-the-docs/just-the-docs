---
layout: default
title: RESTful + streaming
parent: Experimental
nav_order: 1
has_children: false
permalink: /experimental/restful/
---

<h1>{{ page.title }} <span class="label label-yellow">beta</span></h1>


## RESTful access

[![](demo.png)](http://cityjson.pythonanywhere.com/collections/tudelft/items/NL.IMBAG.Pand.0503100000032914/)

We envision CityJSON being used, exchanged, manipulated, and viewed __on the web__.

We have built a super simple [RESTful access](https://en.wikipedia.org/wiki/Representational_state_transfer) to CityJSON datasets, it uses [Flask](https://palletsprojects.com/p/flask/) as a server, and the datasets are simply hosted on the server and [cjio](https://github.com/cityjson/cjio) is used obtain subsets of the datasets.

The demo is inspired from the [OGC API -- Features](https://github.com/opengeospatial/ogcapi-features) and especially the [pygeoapi demo](https://demo.pygeoapi.io/stable), but it is not OGC-compliant (yet).

<i class="fab fa-github"></i> <a href="https://github.com/cityjson/restful_demo">code of the demo</a>


## Streaming 

The demo contains the code to *stream* the datasets, by using [`CityJSONFeature`](https://www.cityjson.org/specs/1.1.0/#text-sequences-and-streaming-with-cityjsonfeature).

If `/stream/` is added to the URL of any collections in the demo, then a [JSON Lines](https://jsonlines.org/) is returned. 
This is realised with `cjio myfile.city.json export --format jsonl`.

<i class="fas fa-external-link-alt"></i> <a href="http://cityjson.pythonanywhere.com/collections/tudelft/stream/">http://cityjson.pythonanywhere.com/collections/tudelft/stream/</a>


## MSc thesis on the topic

[![](msc-li.png){:width="250px"}](https://repository.tudelft.nl/islandora/object/uuid:e6bb2142-c113-4add-a466-41bf0fea3b11?collection=education)


Xiaoai Li. *CityREST: CityJSON in a database + RESTful access*. MSc thesis in Geomatics, Delft University of Technology. 2021. <small><a href="http://resolver.tudelft.nl/uuid:e6bb2142-c113-4add-a466-41bf0fea3b11"><i class="fas fa-book" title="thesis"></i></a></small> <small><a href="https://github.com/xiaoai-li/api_cityjson"><i class="fab fa-github" title="github"></i></a></small> 
        