---
layout: page
title: Upgrading a file from v1.1 to v2.0
parent: Tutorials
nav_order: 6
permalink: /tutorials/upgrade20/
---


{: .warning }
This is the manual to upgrade a file from v1.1, if you have v1.0 first check our [v1.0 -> v1.1 guide]({{ '/dev/upgrade11/' | prepend: site.baseurl }}).


## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Upgrading a file -> cjio 

Your CityJSON v1.1 files can be *automatically* upgraded to v2.0 with [cjio](https://github.com/cityjson/cjio).

First install or upgrade cjio:
```
pip install -U cjio
```
You should have >=v0.9.

After the installation, you have a small program called `cjio`.

To upgrade your file `myfile.json`:
```
cjio myfile.json upgrade save myfile_v20.city.json
```

which will save a new file `myfile_v20.city.json`.


## Validation of your Extension

The validator of CityJSON is [cjval](https://validator.cityjson.org), and it validates files with Extensions, see the [tutorial]({{ '/tutorials/validation/' | prepend: site.baseurl }}).

