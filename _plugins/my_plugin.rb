# _plugins/custom_converter.rb

Jekyll::Hooks.register :documents, :pre_render do |doc|
  doc.content.gsub!(/\^([^\^]+)\^/) do
    "<span class='test-class'>#{$1}</span>"
  end
end
