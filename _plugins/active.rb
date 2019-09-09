def getActive(nodes, url, pages)
  active = false
  for node in nodes do
    if node["url"] == url
      active = true
      break
    end
    title = node["title"]
    active = getActive(pages.select{ |item| item["parent"] == title }, url, pages)
  end
  active
end

module Jekyll
  module ActiveFilter
    def active(node)
      getActive([node], @context["page"]["url"], @context["site"]["html_pages"])
    end
  end
end

Liquid::Template.register_filter(Jekyll::ActiveFilter)