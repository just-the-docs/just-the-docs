module Jekyll
  class MyCustomProcessor < Converters::Markdown
    def convert(content)
      # ابتدا محتوای اصلی را با استفاده از تبدیل‌کننده‌ی پیش‌فرض Markdown به HTML تبدیل می‌کنیم
      html = super(content)

      # سپس محتوای HTML را جایگزینی می‌کنیم
      html.gsub!(/\^([^\^]+)\^/, '<span class="span-class">\1</span>')

      html
    end
  end
end

# تغییر تبدیل‌کننده‌ی پیش‌فرض Markdown به CustomMarkdownConverter
Jekyll::Converters::Markdown = Jekyll::MyCustomProcessor
