namespace :search do
  desc 'Generate the files needed for search functionality'
  task :init do
    puts 'Creating search data json file...'
    mkdir_p 'assets/js'
    touch 'assets/js/search-data.json'
    content = %Q[{{ page.content | markdownify | strip_html | escape_once | remove: 'Table of contents' | remove: '```'  | remove: '---' | replace: '\\', ' ' | normalize_whitespace }}]
    puts 'Done.'
    puts 'Generating content...'

    File.open('assets/js/search-data.json', 'w') do |f|
      f.puts '---
---
{
  {% for page in site.html_pages %}{% if page.search_exclude != true %}"{{ forloop.index0 }}": {
    "id": "{{ forloop.index0 }}",
    "title": "{{ page.title | replace: \'&amp;\', \'&\' }}",
    "content": "'+content+'",
    "url": "{{ page.url | absolute_url }}",
    "relUrl": "{{ page.url }}"
  }{% unless forloop.last %},{% endunless %}
  {% endif %}{% endfor %}
}'
    end
    puts 'Done.'
  end
end
