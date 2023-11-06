---
layout: page
title: Converting to/from CityGML files
parent: Tutorials
nav_order: 2
permalink: /tutorials/conversion/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}





The open-source software [citygml-tools](https://github.com/citygml4j/citygml-tools) allows us to automatically convert between CityGML-XML files v3.0/v2.0/v1.0 and CityJSON v2.0/v1.1/v1.0, and vice-versa. 

Download its [latest release](https://github.com/citygml4j/citygml-tools/releases) (v2.2.0 at the time of writing this), and unzip its content.
Notice that you need to have [Java 11 or higher](https://github.com/citygml4j/citygml-tools?tab=readme-ov-file#system-requirements) installed.

![](../files/c-download.png)

Open a console/terminal (also called "Command Prompt" in Windows)

The executable is at the root of the folder, type `./citygml-tools`:

![](../files/c-help.png)



## Conversion CityGML -> CityJSON


Download this [CityGML file of The Hague](https://3d.bk.tudelft.nl/opendata/cityjson/3dcities/citygml/DenHaag_01.xml) (or any CityGML files; these can have textures too), and place it in a given folder (say `/home/elvis/data/`)
To convert it to CityJSON:

```
./citygml-tools to-cityjson /home/elvis/data/DenHaag_01.xml
```

![](../files/c-tocityjson.png)

Voilà, you're done, this creates a new CityJSON v2.0 file: `/home/elvis/data/DenHaag_01.json`


And now, if you drag that file into the viewer [ninja](https://ninja.cityjson.org/), you can view it:

![](../files/c-ninja.png)


## Conversion CityJSON -> CityGML

From the CityJSON file, a new GML file can be created with that command `from-cityjson`.



