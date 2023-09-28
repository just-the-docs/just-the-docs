---
layout: page
title: Upgrading your code for v2.0 (from v1.1)
parent: Help for developers
nav_order: 6
permalink: /dev/upgrade20/
---

{: .warning }
This is the manual to upgrade from v1.1, if you have v1.0 first check our [v1.0 -> v1.1 guide]({{ '/dev/upgrade11/' | prepend: site.baseurl }}).

The following 4 changes need to be considered:

1. TOC
{:toc}

---

## 1. `"version"` (obviously)

```json
"version": "2.0"
```

## 2. `"GenericCityObject"` is now an allowed City Object

It is no longer needed to use an Extension and `"+GenericCityObject"` for generic objects.

To switch to `"GenericCityObject"`, remove the `"+"` from the name, and remove the entry in the `"extensions"`:

```json
"extensions":
{
  "Generic":
  {
    "url": "https://www.cityjson.org/extensions/download/generic.ext.json",
    "version": "1.0"
  }
}
```


## 3. `"metadata/pointOfContact/address"` is now a JSON object, not a string

To harmonise with other addresses in the standards (for Buildings and Bridges for example).

```json
"pointOfContact": {
  "contactName": "Justin Trudeau",
  "emailAddress": "justin.trudeau@parl.gc.ca",
  "phone": "+1-613-992-4211",
  "address": {
    "thoroughfareNumber": "24",
    "thoroughfareName": "Sussez Drive",
    "postcode": "H0H 0H0",
    "locality": "Ottawa",
    "country": "Canada"
  },    
  "contactType": "individual",
  "role": "pointOfContact"
}
```

## 4. If an Extension is used, update its `"versionCityJSON"` and add `"extraSemanticSurfaces"`

The `"versionCityJSON"` should be `"2.0"` and it is now possible to define new Semantic Surfaces, [see the specs](https://cityjson.org/specs/#case-3-defining-a-new-semantic-object):

```json
{
  "type": "CityJSONExtension",
  "name": "Demo",
  "uri": "https://www.someurl.org/demo.ext.json",
  "version": "1.0",
  "versionCityJSON": "2.0",
  "description": "Extension to handle massive potatoes in our cities",
  "extraRootProperties": {},     
  "extraAttributes": {},
  "extraCityObjects": {},
  "extraSemanticSurfaces": {}
}
```