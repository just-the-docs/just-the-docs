---
layout: default
title: Getting Started
nav_order: 1
description: "Just the Docs is a responsive Jekyll theme with built-in search that is easily customizable and hosted on GitHub Pages."
permalink: /
---

<!-- # Focus on writing good documentation.
{: .fs-9 } -->

# Getting Started 
{: .fs-9 }

Welcome! to get started for Flowcode Generation, You need to install some packages first.

After that, you need to create environmental varible to access the package credential for the `@flowcode/flowcode-generator-types` private package.

### Installation of the packages

```bash
yarn add "@flowcode/flowcode-generator-types": "1.1.3"

yarn add random-seed
```

### Setting up envirnment Variables for accessing the private package

Firstly, you need to add these follwing lines in .npmrc file.
These lines includes environment varibles for accessing the private package credentials.

``` bash
always-auth=true
@dtx-company:registry=https://npm.pkg.github.com
@flowcode:registry=https://flowcode.jfrog.io/artifactory/api/npm/fc-npm/
//flowcode.jfrog.io/artifactory/api/npm/fc-npm/:_password=${JFROG_FC_NPM_PASSWORD_B64}
//flowcode.jfrog.io/artifactory/api/npm/fc-npm/:username=${JFROG_FC_NPM_USERNAME}

```

Now you need to set these environment varibales `JFROG_FC_NPM_USERNAME` and `JFROG_FC_NPM_PASSWORD_B64` in you local machine.

> - See on google that how to setup environment varibles in your local machine (Mac/Linux/windows).

> - Ask Flowcode team for the values of these variables.

> - If you are using `Docker`, You need to check how to set environment varibales in Docker.


