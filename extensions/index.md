---
layout: default
title: Extensions
nav_order: 7
has_children: true
permalink: /extensions/
---

# Extensions
{: .no_toc }


The CityGML data model allows us to represent the most common city features, but sometimes practitioners may want to model additional features and/or add certain attributes to the data model. 
For this, CityGML has the concept of [ADEs (Application Domain Extensions)](https://doi.org/10.1186/s40965-018-0055-6). 
An ADE is defined in an extra [XML Schema](https://en.wikipedia.org/wiki/XML_schema/) (XSD file) with its own namespace, and often inheritance is used to refine the classes of the CityGML data model, to define entirely new classes, and to modify any class by adding for instance new geometries and complex attribute anywhere in a City Model. 
The ADE allows us to document in a structured way, and also to validate, an instance of a CityGML document that would contain both classes from the core model and from the ADEs.

