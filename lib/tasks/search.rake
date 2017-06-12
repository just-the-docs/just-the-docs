namespace :search do
  desc 'Generate the files needed for search functionality'
  task :init do
    puts 'Creating search data json file...'
    touch 'search-data.json'
    content = %Q[{{ page.content | markdownify | strip_html | xml_escape | remove: 'Table of contents' | strip_newlines | replace: '\\', ' ' }}]

    File.open('search-data.json', 'w') do |f|
      f.puts '---
---
{
  {% for page in site.html_pages %}"{{ forloop.index0 }}": {
    "id": "{{ forloop.index0 }}",
    "title": "{{ page.title | xml_escape }}",
    "content": "'+content+'",
    "url": "{{ page.url | xml_escape }}"
  }{% if forloop.last %}{% else %},
  {% endif %}{% endfor %}
}'
    end
  end
end
