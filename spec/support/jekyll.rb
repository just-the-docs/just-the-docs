# frozen_string_literal: true

require 'jekyll'
require 'yaml'

# Tools to build / compile the Jekyll site and extract the sitemap
def site_config
  # Consider appending jekyll-sitemap to the plugins here, instead of in _config.
  # Note: Config keys must be strings and thus use => style hashes.
  @site_config ||= Jekyll.configuration({
    'destination' => DESTINATION,
    'url' => '',
    'baseurl' => '/',
    'sass' => { 'quiet_deps' => true },
  })
end

def build_jekyll_site!
  puts 'Building site...'
  @site = Jekyll::Site.new(site_config)
  @site.process
  puts 'Site build complete.'
end

def load_sitemap
  # Ensure that you have called build_jekyll_site! first.
  sitemap_text = File.read("#{DESTINATION}/sitemap.xml")
  sitemap_links = sitemap_text.scan(%r{<loc>(.+)</loc>})
  sitemap_links.filter_map do |link, *_unused|
    # Skip non-html pages
    # Are there other pages that should be audited for accessibility?
    # (e.g. PDFs, documents. They'd need a different checker.)
    next unless link.end_with?('.html') || link.end_with?('/')

    link
  end.sort
end
