require 'kramdown'

class Jekyll::Converters::Markdown::MyCustomProcessor
    priority :low

  def initialize(config)
    @config = config

  rescue LoadError
    STDERR.puts 'You are missing a library required for Markdown. Please run:'
    STDERR.puts '  $ [sudo] gem install funky_markdown'
    raise FatalException.new("Missing dependency: funky_markdown")
  end

  def convert(content)
    # ابتدا محتوای اصلی را با استفاده از تبدیل‌کننده‌ی پیش‌فرض Markdown به HTML تبدیل می‌کنیم
    html = Kramdown::Document.new(content).to_html

    # سپس محتوای HTML را جایگزینی می‌کنیم
    html.gsub!(/\^([^\^]+)\^/, '<span class="span-class">\1</span>')

    html
  end
end
