module Jekyll
  module Convertible
    def transform
      # Call the original function
      super
      # Custom conversion
      self.content = convert_custom_span_tag(content)
    end

    private

    def convert_custom_span_tag(text)
      text.gsub(/^\^([^\^]+)\^$/) { |match| "<span class=\"span-class\">#{$1}</span>" }
    end
  end
end


