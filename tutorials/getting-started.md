---
layout: page
title: Getting started with CityJSON
parent: Tutorials
nav_order: 1
permalink: /tutorials/getting-started/
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Download a simple file with 2 buildings

Download [twobuilding.json](../files/twobuildings.json), a simple file with 2 buildings.

You can open that file in any text editor to see its structure, and notice that you can manually edit it to change values and add new metadata, new buildings, or delete some.

![](../files/gs-structure.png)


## Visualise the file

Go to the [CityJSON official online viewer](https://viewer.cityjson.org) and drop the file on the logo, and voilà:

![](../files/gs-viewer.png)

You can also use (more powerful) viewers (where the semantics of the buildings is shown for instance, and attributes), we offer a [list of viewers]({{ 'software/#viewers' | prepend: site.baseurl }}) (and other software).
One of them is [azul](https://itunes.apple.com/nl/app/azul/id1173239678?mt=12), a macOS-only viewer:

![](../files/gs-azul.png)


## Manipulate CityJSON files with cjio

Manually editing a file is painful and error-prone, so instead you can use the main software accompanying CityJSON.
Install [cjio](https://github.com/tudelft3d/cjio), which is used to manipulate, edit, and validate CityJSON files.
You must have Python (version >3.5) installed, and [pip](https://pypi.org/project/pip/).

cjio is a command-line interface program, which means that there is no graphical user interface and that you need to use the console (also called the "Command Prompt" or the terminal).

To install the latest release:
```
pip install cjio
```

After installation, you have a small program called `cjio`, to see its possibilities type `cjio --help` and it should print all the options, as shown below.

![](../files/gs-cjiohelp.png)


To get some general information about the file you downloaded, navigate to the folder where it is located, and type:

```
cjio twobuildings.json info
```

and you should get this output:
```
Parsing twobuildings.json
{
  "cityjson_version": "1.0",
  "epsg": null,
  "cityobjects_total": 2,
  "cityobjects_present": [
    "Building"
  ],
  "vertices_total": 255,
  "transform/compressed": false,
  "geom_primitives_present": [
    "MultiSurface"
  ],
  "materials": false,
  "textures": false
}
```
Observe that the `"epsg"` is null.
To assign an [EPSG](https://epsg.io/) to the file (26918 is the value, that dataset is part of the [Montréal open 3D dataset](http://donnees.ville.montreal.qc.ca/dataset/maquette-numerique-batiments-citygml-lod2-avec-textures)), we can simply type:
```
cjio twobuildings.json assign_epsg 26918 save twobuildings_reprojected.json 
```
Notice that 2 cjio operators are used in one command: `assign_epsg` and `save`: the first one assigns the CRS to the file, and the second allows us to save the file on disk (in the current folder).
If you type `cjio twobuildings_reprojected.json info` you should see that an EPSG is assigned to that file.

The cjio operators can be linked in a pipeline, and the 3D city model opened is passed through all the operators, and it gets modified by some operators.
Operators like `info` and `validate` output information in the console and just pass the 3D city model to the next operator.
Some examples:

```
$ cjio example.json subset --id house12 info remove_materials info save out.json
$ cjio example.json remove_textures compress info
$ cjio example.json upgrade_version save new.json
$ cjio myfile.json merge '/home/elvis/temp/*.json' save all_merged.json
```


## What else?

One important point is ensuring that the files you produce and manipulate are valid, see our [validation tutorial]({{ '/tutorials/validation/' | prepend: site.baseurl }}).

Several datasets can be downloaded from the [datasets page]({{ '/datasets/' | prepend: site.baseurl }}), but more importantly, it is possible to convert any CityGML file, see [our tutorial]({{ '/tutorials/conversion/' | prepend: site.baseurl }}).

