---
layout: default
title: Finishing up the process
nav_order: 6
---

#  Finishing up the process.

After creating the studioConfig Id and batch Id , we need to get the flowcode image to use it but this the the generator api and the parameter will be diffrent.

we need to call `https://stg-generator.flowcode.com/v1/flowcode?` api and add `&data=(encodedUriComponent(flowcodeUrl))` and `&studio_config_id=studioConfigId`
to get desired image with desired flowcode url.

> You need to adjust those logics according to your code structure.