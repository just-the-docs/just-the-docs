task :init do
  touch search-data.json

  File.open('search-data.json', 'w') do |f|
    f.puts '
---
---
{
  {% for page in site.html_pages %}"{{ forloop.index0 }}": {
    "id": "{{ forloop.index0 }}",
    "title": "{{ page.title | xml_escape }}",
    "content": "{{ page.content | markdownify | strip_html | xml_escape | remove: \'Table of contents\' | remove: page.title | strip_newlines | replace: \'\\', \' \'}}",
    "url": "{{ page.url | xml_escape }}"
  }{% if forloop.last %}{% else %},
  {% endif %}{% endfor %}
}'
  end
end
