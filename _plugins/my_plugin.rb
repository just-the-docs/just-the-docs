class Jekyll::Converters::Markdown::MyCustomProcessor
  def initialize(config)
    require 'kramdown'
    @config = config

  rescue LoadError
    STDERR.puts 'You are missing a library required for Markdown. Please run:'
    STDERR.puts '  $ [sudo] gem install funky_markdown'
    raise FatalException.new("Missing dependency: funky_markdown")
  end

  def convert(content)
    # ابتدا محتوای اصلی را با استفاده از تبدیل‌کننده‌ی پیش‌فرض Markdown به HTML تبدیل می‌کنیم
    html = Kramdown::Document.new(content).to_html

    # { bage bold new | Example text } to <span class="bage bold new">Example text</span>
    html.gsub!(/\{\s*([^|]+?)\s*\\\s*(.+?)\s*\}/, '<span class="\1">\2</span>')

    # جایگزینی فهرست مطالب با نسخه wrapped درون تگ‌های <details> و <summary>
    toc_placeholder_regex = /\\TOC/
    if html[toc_placeholder_regex]
      html.gsub!(toc_placeholder_regex, '')
      toc_html = '<details open markdown="block"><summary>فهرست مطالب</summary>'
      toc_content = Kramdown::Document.new(content, toc_levels: [1, 2, 3, 4, 5, 6], generate_toc: true).toc_content
      toc_html += toc_content
      toc_html += '</details>'
      html = toc_html + html
    end

    html
  end
end
