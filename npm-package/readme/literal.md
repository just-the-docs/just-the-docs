# Literal

Literal augments your online reading experience; capture annotations, sources, and knowledge.

[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
     alt="Get it on F-Droid"
     height="80">](https://f-droid.org/packages/io.literal/)
[<img src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"
     alt="Get it on Google Play"
     height="80">](https://play.google.com/store/apps/details?id=io.literal)

## How It Works

1. Share web content to Literal to add it to your library of sources and start annotating it.
2. As you read, highlight text to create annotations.
3. Build a knowledge base from your annotations, a library of idea bookmarks that link back to their source context.
4. Read annotations in their source context, and never lose track or access to sources within your library.
5. Organize annotations with tags, or view them grouped by their source.


## Demo Videos

- [How to annotate the Web](https://www.youtube.com/watch?v=nH1ukQY3Ia8)
- [How to annotate Twitter](https://www.youtube.com/watch?v=s7hps6_4VTU)
- [How to annotate PDF](https://www.youtube.com/watch?v=9NurlekUeZ8)

## Status

Literal is actively being used, but is also under active development. If you have ideas for features or encounter a bug, please open an issue.

Literal is distributed as an Android application, with support for other platforms planned. To indicate your support for a platform add a reaction or comment on the issue for [adding iOS support](https://github.com/literal-io/literal/issues/81), [adding Web support](https://github.com/literal-io/literal/issues/82), [adding Web Extension support](https://github.com/literal-io/literal/issues/83), or by creating an issue for adding support to your platform of choice.

Releases are regularly published on [Github](https://github.com/literal-io/literal/releases), [Google Play](https://play.google.com/store/apps/details?id=io.literal) and [F-Droid](https://f-droid.org/packages/io.literal/).

## Architecture

Literal is a client for the [W3C Web Annotation Data Model](https://www.w3.org/TR/annotation-model/), and uses this model for all data storage and transmission. A closed-source GraphQL API implementing this data model is used for data persistance, though in the future alternate APIs (including local-only APIs: see [#123](https://github.com/literal-io/literal/issues/123)) may be supported. There are some application specific extensions to the model that are annotated appropriately, but the intent is to hew as close as possible to the original specification.

## Philosophy

### A Tool for Digital Reading

The way that we read has remained relatively unchanged even as the medium that carries text has evolved. E-reader applications are traditionally skeumorphic and seek to make reading digital text more like reading a physical book. Literal is instead designed to support interaction with digital-text in a native way.

### A Commonplace Book

The web has led to the proliferation of information at a scale never before seen. Literal is a [Commonplace Book](https://en.wikipedia.org/wiki/Commonplace_book), and enables you to build a personal knowledgebase of curated information through annotation and source capture.

### A Star in a Constellation

Literal is a component of a much larger system though which your personal data flows. Literal is open source to increase trust and prevent proprietary lock-in, and implements the [W3C Web Annotation Data Model](https://www.w3.org/TR/annotation-model/) to ensure that your data is portable.
