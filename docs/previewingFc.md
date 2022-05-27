---
layout: default
title: Previewing flowcode
nav_order: 4
---

# Previewing flowcode

To Preview the flowcode after the input is taken from the user , the above object need to pass in the url to get the generated flowcode preview

For previewing the flowcode, the Url is `https://stg-generator.dtxcloud.com/v1/flowcode?opts=${encodeURIComponent(JSON.stringify(tvFlowcodeOptions))}` thats for `Stagging` and correspondingly
`https://generator.dtxcloud.com/v1/flowcode?opts=${encodeURIComponent(JSON.stringify(tvFlowcodeOptions))}`for `Production` environment

You need to make http call to make these requests.