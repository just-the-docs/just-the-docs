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

    # تبدیل به یک رشته قابل تغییر با استفاده از `dup`
    non_frozen_string = content.dup

    # { bage bold new | Example text } to <span class="bage bold new">Example text</span>
    non_frozen_string.gsub!(/\{\s*(.+?)\s*\|\s*sub\s*\}/, '<sub>\1</sub>')
    non_frozen_string.gsub!(/\{(?!:)\s*([^\}]+?)\s*\|\s*([^|]+?)\s*\}/, '<span class="\2">\1</span>')
    non_frozen_string.gsub!(/\{(?!:)\s*([^|]+?)\s*\\\s*(.+?)\s*\}/, '<span class="\1">\2</span>')

    # ابتدا محتوای اصلی را با استفاده از تبدیل‌کننده‌ی پیش‌فرض Markdown به HTML تبدیل می‌کنیم
    html = Kramdown::Document.new(non_frozen_string).to_html

    html
  end
end
