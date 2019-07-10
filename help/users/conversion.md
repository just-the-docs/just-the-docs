---
layout: page
title: Converting to/from CityGML files
parent: Help for users
grand_parent: Help
nav_order: 2
permalink: /help/users/conversion/
---

The open-source software [citygml-tools](https://github.com/citygml4j/citygml-tools) allows us to automatically convert between CityGML and CityJSON, and vice-versa. 

Download its [latest release](https://github.com/citygml4j/citygml-tools/releases) (v1.2.0 at the time of writing this), and unzip its content.

![](../files/c-download.png)

Open a console/terminal (also called "Command Prompt" in Windows)

Then navigate to the folder `/bin/`, there is a program called `citygml-tools`. 
To see its capabilities, type `./citygml-tools`:

![](../files/c-help.png)


## Conversion CityGML -> CityJSON

Download this [CityGML file of The Hague](https://3d.bk.tudelft.nl/opendata/cityjson/citygml/DenHaag_01.xml) (or any CityGML files; these can have textures too), and place it in a given folder (say `/Users/hugo/temp/data/`)
To convert it to CityJSON:

```
./citygml-tools to-cityjson /Users/hugo/temp/data/DenHaag_01.xml
```

![](../files/c-tocityjson.png)

Voilà, this creates a new CityJSON file: `/Users/hugo/temp/data/DenHaag_01.json`

If you drag that file in the [CityJSON web-viewer](http://tudelft3d.github.io/CityJSON-viewer/), you can view it:

![](../files/c-webview.png)


## Conversion CityJSON -> CityGML

From the CityJSON file, a new GML file can be created with that command:

![](../files/c-fromcityjson.png)



