---
layout: default
title: Code
parent: UI Components
has_children: true
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

---

## Code blocks with rendered examples

To demonstrate front end code, sometimes it's useful to show a rendered example of that code. After including the styles from your project that you'll need to show the rendering, you can use a `<div>` with the `code-example` class, followed by the code block syntax. If you want to render your output with Markdown instead of HTML, use the `markdown="1"` attribute to tell Jekyll that the code you are rendering will be in Markdown format... This is about to get meta...

<div class="code-example" markdown="1">

<div class="code-example" markdown="1">

[Link button](http://example.com/){: .btn }

</div>
```markdown
[Link button](http://example.com/){: .btn }
```

</div>
{% highlight markdown %}
<div class="code-example" markdown="1">

[Link button](http://example.com/){: .btn }

</div>
```markdown
[Link button](http://example.com/){: .btn }
```
{% endhighlight %}

---

## Mermaid diagram code blocks

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

The contents of this object should follow [mermaid's configuration API](https://mermaid-js.github.io/mermaid/#/./Setup?id=configuration). For example, to override the theme, change `_includes/mermaid_config.js` to:

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
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
{% endhighlight %}

which renders:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

*Note: for demonstration purposes, we've enabled mermaid on this site. It is still disabled by default, and users need to opt-in to use it.*

## Copy button

The copy button for code blocks can be enabled or disabled via the `enable_copy_code_button` key in `_config.yml`. By default, the value of this key is `false`; users need to opt-in.

```yaml
# For copy button on code
enable_copy_code_button: true
```

Note that this feature requires JavaScript; if JavaScript is disabled in the browser, this feature will not work.