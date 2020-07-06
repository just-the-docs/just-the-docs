---
layout: default
title: Markdown line number test
nav_order: 999
---

```
Some unknown code in fences
```

Some of the code examples below require the following setting in `_config.yml`:
```yaml
compress_html:
  ignore:
    envs: all
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

{% highlight ruby linenos %}
# Ruby code with syntax highlighting and unfixed line numbers using Liquid
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
{% endhighlight %}
