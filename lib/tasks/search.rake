namespace :search do
  desc 'Generate the files needed for search functionality'
  task :init do
    puts 'Creating search data json file...'
    mkdir_p 'assets/js'
    touch 'assets/js/search-data.json'
    content = %Q[{{ page.content | markdownify | replace: '</h', ' . </h' | replace: '<hr', ' . <hr' | replace: '</p', ' . </p' | replace: '</ul', ' . </ul' | replace: '</tr', ' . </tr' | replace: '</li', ' | </li' | replace: '</td', ' | </td' | strip_html | escape_once | remove: 'Table of contents' | remove: '```'  | remove: '---' | replace: '\', ' ' | replace: ' .  .  . ', ' . ' | replace: ' .  . ', ' . ' | normalize_whitespace }}]
    puts 'Done.'
    puts 'Generating content...'

    File.open('assets/js/search-data.json', 'w') do |f|
      f.puts '---
---
{
  {% assign comma = false %}
  {% for page in site.html_pages %}{% if page.search_exclude != true %}{% if comma == true%},{% endif %}"{{ forloop.index0 }}": {
    "title": "{{ page.title | replace: \'&amp;\', \'&\' }}",
    "content": "\'+content+\'",
    "url": "{{ page.url | absolute_url }}",
    "relUrl": "{{ page.url }}"
  }{% assign comma = true %}
  {% endif %}{% endfor %}
}'
    end
    puts 'Done.'
  end
end
