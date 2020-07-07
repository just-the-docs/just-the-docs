---
layout: default
title: Markdown line number test
nav_order: 999
---

# Configuration options

The default settings for HTML compression are incompatible with the HTML
produced by Jekyll (4.1.1 or earlier) for line numbers from highlighted code
-- both when using Kramdown code fences and when using Liquid highlight tags.

To avoid non-conforming HTML and unsatisfactory layout, HTML compression
can be turned off by using the following configuration option:

{% highlight yaml %}
compress_html:
  ignore:
    envs: all
{% endhighlight %}

When using Kramdown code fences, line numbers are turned on globally by the
following configuration option:

{% highlight yaml %}
kramdown:
  syntax_highlighter_opts:
    block:
      line_numbers: false
{% endhighlight %}

Line numbers can then be suppressed locally using Liquid tags (_without_ the
`linenos` option) instead of fences:

{% highlight yaml %}
{% raw %}{% highlight some_language %}
Some code
{% endhighlight %}{% endraw %}
{% endhighlight %}

# Workarounds

To use HTML compression together with line numbers, all highlighted code
needs to be wrapped using one of the following workarounds.
(The variable name `some_var` can be changed to avoid clashes; it can also
be replaced by `code` -- but note that `code=code` cannot be removed).

## Code fences

{% highlight default %}
{% raw %}{% capture some_var %}
```some_language
Some code
```
{% endcapture %}
{% assign some_var = some_var | markdownify %}
{% include fix_linenos.html code=some_var %}{% endraw %}
{% endhighlight %}

## Liquid highlighting

{% highlight default %}
{% raw %}{% capture some_var %}
{% highlight some_language linenos %}
Some code
{% endhighlight %}
{% endcapture %}
{% include fix_linenos.html code=some_var %}{% endraw %}
{% endhighlight %}

_Credit:_ The original version of the above workaround was suggested by
Dmitry Hrabrov at
<https://github.com/penibelst/jekyll-compress-html/issues/71#issuecomment-188144901>.

# Examples

```
Some unknown code in fences
```

```js
// Javascript code with syntax highlighting in fences
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

```ruby
# Ruby code with syntax highlighting in fences
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

{% highlight ruby %}
# Ruby code with syntax highlighting using Liquid
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
{% endhighlight %}

{% capture code %}
{% highlight ruby linenos %}
# Ruby code with syntax highlighting and fixed line numbers using Liquid
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
{% endhighlight %}
{% endcapture %}
{% include fix_linenos.html code=code %}
{% assign code = nil %}

With the default configuration options, the following example illustrates
the incorrect formatting arising from the incompatibility of HTML compression
and the non-conforming HTML produced by Jekyll for line numbers:

{% highlight ruby linenos %}
# Ruby code with syntax highlighting and unfixed line numbers using Liquid
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
{% endhighlight %}
