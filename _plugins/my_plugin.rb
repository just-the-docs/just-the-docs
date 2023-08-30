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
    html.gsub!(/\{\s*(.+?)\s*\|\s*(.+?)\s*\}/, '<span class="\1">\2</span>')
  end
end
