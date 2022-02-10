---
layout: page
title: Converting to/from CityGML files
parent: Tutorials
nav_order: 2
permalink: /tutorials/conversion/
---

The open-source software [citygml-tools](https://github.com/citygml4j/citygml-tools) allows us to automatically convert between CityGML and CityJSON, and vice-versa. 

Download its [latest release](https://github.com/citygml4j/citygml-tools/releases) (v1.4.3 at the time of writing this), and unzip its content.

![](../files/c-download.png)

Open a console/terminal (also called "Command Prompt" in Windows)

The executable is at the root of the folder, type `./citygml-tools`:

![](../files/c-help.png)




## Conversion CityGML -> CityJSON

<span class="label label-yellow">Coming soon for v1.1, only v1.0 at the moment</span>

Download this [CityGML file of The Hague](https://3d.bk.tudelft.nl/opendata/cityjson/citygml/DenHaag_01.xml) (or any CityGML files; these can have textures too), and place it in a given folder (say `/home/elvis/temp/data/`)
To convert it to CityJSON:

```
./citygml-tools to-cityjson /home/elvis/temp/data/DenHaag_01.xml
```

![](../files/c-tocityjson.png)

Voilà, this creates a new CityJSON v1.0 file: `/home/elvis/hugo/temp/data/DenHaag_01.json`

To upgrade the file to CityJSON v1.1: `cjio DenHaag_01.json upgrade save DenHaag_01.city.json`

If you drag that file into the viewer [ninja](https://ninja.cityjson.org/), you can view it:

![](../files/c-ninja.png)


## Conversion CityJSON -> CityGML

From the CityJSON file, a new GML file can be created with that command `from-cityjson`



