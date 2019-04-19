---
layout: page
title: Getting started with CityJSON
parent: Tutorials
nav_order: 1
permalink: /tutorials/getting-started/
---


## Download a simple file with 2 buildings

Download [twobuilding.json](../files/twobuildings.json), a simple file with 2 buildings.

You can open that file in any text editor to see its structure, and notice that you can manually edit it to change values and add new metadata, new buildings, or delete some.

![](../files/gs-structure.png)


## Visualising the file

Go to the [CityJSON official online viewer](https://view.cityjson.org) and drop the file on the logo, and voilà:

![](../files/gs-viewer.png)


You can also use (more powerful) viewers (where the semantics of the buildings is shown for instance, and attributes), we offer a [list of viewers]({{ 'software/#viewers' | prepend: site.baseurl }}) (and other software).
One of them is [azul](https://itunes.apple.com/nl/app/azul/id1173239678?mt=12), a macOS-only viewer:

![](../files/gs-azul.png)

## Manipulating CityJSON files with cjio

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


To get some general information about the file you downloaded, navigate to the folder where it is located, and:

```console
cjio twobuildings.json info
```


