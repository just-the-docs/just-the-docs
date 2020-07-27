namespace :search do
  desc 'Generate the files needed for search functionality'
  task :init do
    puts 'Creating search data json file...'
    mkdir_p 'assets/js'
    touch 'assets/js/zzzz-search-data.json'
    puts 'Done.'
    puts 'Generating content...'

    File.open('assets/js/zzzz-search-data.json', 'w') do |f|
      f.puts '---
permalink: /assets/js/search-data.json
---
{
  {%- assign i = 0 -%}
  {% for page in site.html_pages %}
    {%- if page.title and page.search_exclude != true -%}
      {%- assign page_content = page.content -%}
      {%- assign heading_level = site.search.heading_level | default: 2 -%}
      {%- for j in (2..heading_level) -%}
        {%- assign tag = \'<h\' | append: j -%}
        {%- assign closing_tag = \'</h\' | append: j -%}
        {%- assign page_content = page_content | replace: tag, \'<h1\' | replace: closing_tag, \'</h1\' -%}
      {%- endfor -%}
      {%- assign parts = page_content | split: \'<h1\' -%}
      {%- assign title_found = false -%}
      {% for part in parts offset: 1 %}
        {%- assign titleAndContent = part | split: \'</h1>\' -%}
        {%- assign title = titleAndContent[0] | replace_first: \'>\', \'<h1>\' | split: \'<h1>\' -%}
        {%- assign title = title[1] | strip_html -%}
        {%- assign content = titleAndContent[1] -%}
        {%- assign url = page.url -%}
        {%- if title == page.title and parts[0] == \'\' -%}
          {%- assign title_found = true -%}
        {%- else -%}
          {%- assign id = titleAndContent[0] -%}
          {%- assign id = id | split: \'id="\' -%}
          {%- if id.size == 2 -%}
            {%- assign id = id[1] -%}
            {%- assign id = id | split: \'"\' -%}
            {%- assign id = id[0] -%}
            {%- capture url -%}{{ url | append: \'#\' | append: id }}{%- endcapture -%}
          {%- endif -%}
        {%- endif -%}
  {%- unless i == 0 -%},{%- endunless -%}
  "{{ i }}": {
    "doc": {{ page.title | jsonify }},
    "title": {{ title | jsonify }},
    "content": {{ content | replace: \'</h\', \' . </h\' | replace: \'<hr\', \' . <hr\' | replace: \'</p\', \' . </p\' | replace: \'<ul\', \' . <ul\' | replace: \'</ul\', \' . </ul\' | replace: \'<ol\', \' . <ol\' | replace: \'</ol\', \' . </ol\' | replace: \'</tr\', \' . </tr\' | replace: \'<li\', \' | <li\' | replace: \'</li\', \' | </li\' | replace: \'</td\', \' | </td\' | replace: \'<td\', \' | <td\' | replace: \'</th\', \' | </th\' | replace: \'<th\', \' | <th\' | strip_html | remove: \'Table of contents\' | normalize_whitespace | replace: \'. . .\', \'.\' | replace: \'. .\', \'.\' | replace: \'| |\', \'|\' | append: \' \' | jsonify }},
    "url": "{{ url | absolute_url }}",
    "relUrl": "{{ url }}"
  }
        {%- assign i = i | plus: 1 -%}
      {%- endfor -%}
      {%- unless title_found -%}
  {%- unless i == 0 -%},{%- endunless -%}
  "{{ i }}": {
    "doc": {{ page.title | jsonify }},
    "title": {{ page.title | jsonify }},
    "content": {{ parts[0] | replace: \'</h\', \' . </h\' | replace: \'<hr\', \' . <hr\' | replace: \'</p\', \' . </p\' | replace: \'<ul\', \' . <ul\' | replace: \'</ul\', \' . </ul\' | replace: \'<ol\', \' . <ol\' | replace: \'</ol\', \' . </ol\' | replace: \'</tr\', \' . </tr\' | replace: \'<li\', \' | <li\' | replace: \'</li\', \' | </li\' | replace: \'</td\', \' | </td\' | replace: \'<td\', \' | <td\' | replace: \'</th\', \' | </th\' | replace: \'<th\', \' | <th\' | strip_html | remove: \'Table of contents\' | normalize_whitespace | replace: \'. . .\', \'.\' | replace: \'. .\', \'.\' | replace: \'| |\', \'|\' | append: \' \' | jsonify }},
    "url": "{{ page.url | absolute_url }}",
    "relUrl": "{{ page.url }}"
  }
        {%- assign i = i | plus: 1 -%}
      {%- endunless -%}
    {%- endif -%}
  {% endfor %}
}'
    end
    puts 'Done.'
  end
end
