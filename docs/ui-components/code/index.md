---
title: Code
parent: UI Components
nav_order: 6
---

# Code
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Inline code

Code can be rendered inline by wrapping it in single back ticks.

<div class="code-example" markdown="1">
Lorem ipsum dolor sit amet, `<inline code snippet>` adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Heading with `<inline code snippet>` in it.
{: .no_toc }
</div>
```markdown
Lorem ipsum dolor sit amet, `<inline code snippet>` adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Heading with `<inline code snippet>` in it.
```

---

## Syntax highlighted code blocks

Use Jekyll's built-in syntax highlighting with Rouge for code blocks by using three backticks, followed by the language name:

<div class="code-example" markdown="1">
```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```
</div>
{% highlight markdown %}
```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```
{% endhighlight %}

Syntax highlighting, line numbers, and HTML compression do not work together; **the combination of these features generates invalid HTML that renders incorrectly**. To learn more, see ["Code with line numbers"]({% link docs/ui-components/code/line-numbers.md %}).

---

## Code blocks with rendered examples

To demonstrate front end code, sometimes it's useful to show a rendered example of that code. After including the styles from your project that you'll need to show the rendering, you can use a `<div>` with the `code-example` class, followed by the code block syntax. If you want to render your output with Markdown instead of HTML, use the `markdown="1"` attribute to tell Jekyll that the code you are rendering will be in Markdown format... This is about to get meta...

<div class="code-example" markdown="1">

<div class="code-example" markdown="1">

[Link button](https://just-the-docs.com){: .btn }

</div>
```markdown
[Link button](https://just-the-docs.com){: .btn }
```

</div>
{% highlight markdown %}
<div class="code-example" markdown="1">

[Link button](https://just-the-docs.com){: .btn }

</div>
```markdown
[Link button](https://just-the-docs.com){: .btn }
```
{% endhighlight %}

---

## Mermaid diagram code blocks
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

[Mermaid](https://mermaid-js.github.io/mermaid/) allows you to add diagrams and visualizations using Markdown code blocks. **It is disabled by default**. However, you can turn on support for mermaid by adding a `mermaid` key to your `_config.yml`.

The minimum configuration requires a `version` key (matching a version in [jsDelivr](https://cdn.jsdelivr.net/npm/mermaid/)):

```yaml
mermaid:
  # Version of mermaid library
  # Pick an available version from https://cdn.jsdelivr.net/npm/mermaid/
  version: "9.1.3"
```

Additional configuration options are loaded through `_includes/mermaid_config.js`. By default, the contents of the file are the empty object:

```js
// _includes/mermaid_config.js
{}
```

This loads the default settings.

The contents of this object should follow [mermaid's configuration API](https://mermaid.js.org/config/configuration.html). For example, to override the theme, change `_includes/mermaid_config.js` to:

```js
// _includes/mermaid_config.js
{
  theme: "forest"
}
```

Once mermaid is installed, it can be used in markdown files. The markdown for a simple flowchart example might look like the following:

{% highlight markdown %}
```mermaid
graph TD;
    accTitle: the diamond pattern
    accDescr: a graph with four nodes: A points to B and C, while B and C both point to D
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
{% endhighlight %}

which renders:

```mermaid
graph TD;
    accTitle: the diamond pattern
    accDescr: a graph with four nodes: A points to B and C, while B and C both point to D
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

*Note: for demonstration purposes, we've enabled mermaid on this site. It is still disabled by default, and users need to opt-in to use it.*

### Using a local mermaid library

To load a local version of mermaid, also use the `path` key to specify the location of the library; e.g.

```yaml
mermaid:
  version: "10.1.0"
  # for (v10+)
  path: "/assets/js/mermaid.esm.min.mjs"
  # for (<v10):
  # path: "/assets/js/mermaid.min.js"
  # Note: copy both `mermaid.esm.min.mjs` (v10+) or `mermaid.min.js` (<v10) and the associated
  # `.map` file from the specified version of `mermaid/dist` to `/assets/js/`.
```

For mermaid versions `>=10`, this file is imported directly as an ESM module (rather than as a plain `<script>` tag); users should use the `mermaid.esm.min.mjs` file. In contrast, for mermaid versions `<10`, this file is loaded as a script tag; it should be a standalone CJS file (i.e. `mermaid.min.js`).

{: .warning }
Mermaid versions `10.0` - `10.1` (and possibly, future releases) still encode relative imports in `mermaid.esm.min.mjs`. Local users must copy *all* of the contents of the `dist` folder to the specified path (preserving the relative location of the files). Just the Docs is actively monitoring mermaid releases; an upstream fix is planned.

### Using mermaid with AsciiDoc

Users of [AsciiDoc](https://asciidoc.org/) (e.g. via [jekyll-asciidoc](https://github.com/asciidoctor/jekyll-asciidoc)) may need additional configuration to use mermaid.

By default, AsciiDoc generates HTML markup that mermaid cannot properly parse. The simplest way to resolve this is to use a [passthrough block](https://docs.asciidoctor.org/asciidoc/latest/pass/pass-block/):
{% highlight asciidoc %}
++++
<pre class="language-mermaid">
graph TD;
    accTitle: the diamond pattern
    accDescr: a graph with four nodes: A points to B and C, while B and C both point to D
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</pre>
++++
{% endhighlight %}

Alternatively, community member [@flyx](https://github.com/flyx) has contributed a Ruby extension that does not require extra markup. The extension is available [as a GitHub Gist](https://gist.github.com/flyx/9fff080cf4edc95d495bc661a002232c). Thank you to [@flyx](https://github.com/flyx)!

The [asciidoctor-diagram](https://docs.asciidoctor.org/diagram-extension/latest/) extension which also supports mermaid is not recommended for use with Just the Docs, since it requires separate configuration e.g. for theming, and is known to not be trivial to set up.

## Copy button
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

The copy button for code blocks can be enabled or disabled via the `enable_copy_code_button` key in `_config.yml`. By default, the value of this key is `false`; users need to opt-in.

```yaml
# For copy button on code
enable_copy_code_button: true
```

Note that this feature requires JavaScript; if JavaScript is disabled in the browser, this feature will not work. In addition, this feature uses `navigator.clipboard`, which is only available in [secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (such as over HTTPS). If the site is viewed in an insecure context, the copy button will not work ([relevant issue: #1202](https://github.com/just-the-docs/just-the-docs/issues/1202)).
