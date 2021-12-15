# Doctop [![Build Status](https://travis-ci.org/times/doctop.svg)](https://travis-ci.org/times/doctop)

A jQuery plugin for consuming Google Docs via JSON.
Now with [ArchieML](http://www.archieml.org) support!

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/times/doctop/master/dist/jquery.doctop.min.js
[max]: https://raw.github.com/times/doctop/master/dist/jquery.doctop.js

Create a Google Docs document, using proper header formats to denote sections of the document.
Publish it to the web via File->Publish to the web->Publish.

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/doctop.min.js"></script>
<script>
  $.doctop({
    url: 'https://docs.google.com/document/d/1_zs07o2m1BQisqWT5WEk_aC4TFl9nIZgufc9IYeL64Y/pub',
    callback: function(d){console.dir(d);}
  });
</script>
```

Returns:

```
{
  "copy": {
    "h1-1": [
      "This is a paragraph of text",
      "this is another paragraph",
      "h2-1" [
        "this should be a child of h2-1, which should be a child of h1-1",
        "h3-1": [
          "This should be a child of h3-1, which should be a child of h2-1"
        ]
      ]
    ],
    "h1-2": [
      "This should be a child of h1-2, which itself should be in the top level of the object.",
      "h3-2": [
        "This should be a child of h3-2, which should be a child of h1-2"
      ]
    ],
    "h1-3": [
      "This should be a child of h1-3",
      "Another child of h1-3"
    ]
  }
}
```

## Documentation

### Options

#### url (required)

The full URL of a published Google Doc. In Google Docs, go "File->Publish to the Web->Publish"
to get this URL.

#### callback (required)

Asynchronous callback for the data. Takes one argument, the response, containing copy and any Tabletop data.
The `this` context is the contents of `response.copy`.

#### fancyOutput (default: `false`)

Return detailed response wherein items have indices and are easier to order.
Note: This is provided for backwards compatibility with 1.0.0. It may be depreciated in 2.0.0.

#### simpleKeys (default: `false`)

Instead of creating keys for the sections that are the inner text version of the headers,
return keys in the format `section_0` — this may be desirable if you have journalists
who enjoy arbitrarily changing the header text on you!

#### preserveFormatting (default: `true`)

This will attempt to preserve text formatting from Google Docs. It will yield messier
output because Google Docs loves to wrap everything under the sun in a `<span>` tag.

#### cache (default: `true`)

This enables `jQuery.ajax()`'s cache feature.

#### archieml (default: `false`) -- *New in 1.1.2*

This enables basic [ArchieML](http://archieml.org/) parsing and adds an `archie`
object to `copy` in the response.

#### staticExport (default: `false`)

This allows the parser to consume pages created via Google Docs' "Download as Web page (.html, zipped)"
feature. For those times when you just don't want to publish a confidential document to the broad intarwebz.

#### tabletop_url (default: `undefined`)

If you have Tabletop.js included on the page, you can supply a published Google Sheets URL
in order to only need one callback. The Tabletop response will be in the "data" key of the returned object,
i.e, spreadsheet data in `data.data`, Tabletop object in `data.tabletop`.

#### tabletop_proxy (default: `undefined`)

If you're using Tabletop with Doctop, you can specify the Tabletop proxy here. Note this only works for
Google Sheets that have been copied to S3 or elsewhere; Doctop proxy support [is still forthcoming](https://github.com/times/doctop/issues/1).

#### tabletop_simplesheet (default: `false`)

Use Tabletop's "simpleSheet" method when grabbing that data. This only really works if you only have one sheet.

#### ~~returnJquery (default: `false`)~~ **DEPRECIATED in 1.0.0**

~~This returns non-H1 elements as jQuery objects instead of either HTML or text.~~

## Building

+ `git clone git@github.com:times/doctop.git doctop && cd $_`
+ `npm install && bower install`
+ With ArchieML support (adds ~8kb):
  + `grunt`
+ Without ArchieML support:
  + `grunt build:noarchie`

## Roadmap/ToDos

- [x] Remove speakingurl and return actual headlines as key
- [ ] Remove jQuery dependency
- [ ] Make usable via NodeJS
- [x] Add the preserveFormatting option
- [x] Add support for other heading tags (h2-6)
- [x] Unit tests all up in hurr / up in hurr

## NOTE ON DOCTOP 1.2.x

Doctop 1.2.x removes speakingurl as a dependency. If you're upgrading and weren't
using the `simpleKeys` option, you'll need to update the object keys in your code
to be the full inner text of each header.

## NOTE ON DOCTOP 1.1.x

This is a somewhat-rewritten version of Doctop that tries to redo the hierarchical
infrastructure proposed in 1.0.0. It creates a DOM-like tree, wherein headers
have `children` objects, containing either more headers or paragraphs. Also new
are `index` properties on each item, allowing things to be ordered or converted
into ordered arrays (times/doctop#6).

In order to be backwards compatible, use continues as per before. To get the new
output format, pass `fancyOutput: true` when instantiating.

N.b., Doctop.js 2.0.0 (release date TBC) will use fancyOutput by default.

## Roadmap

### 2.0.0 — No reliance on jQuery; usable in NodeJS.

## Release History

### 1.2.0 — Removed speakingurl.

### 1.1.2 — Added ArchieML support; improved inline documentation.

### 1.1.1 — Bugfix release. Fixes some edge cases with the walker, adds more tests.

### 1.1.0 — Feature release. Adds `fancyOutput` and `staticExport` options.

### 1.0.0 - First stable release. Adds `preserveFormatting` option and tests; removes `returnJquery`.

### 0.0.2 - Adds more Tabletop features.

### 0.0.1 — Initial release.
