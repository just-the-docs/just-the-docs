# frozen_string_literal: true

require 'jekyll'

# Tools to build / compile the Jekyll site and extract the sitemap
def site_config
  # Consider simplifying baseurl / url
  # Consider forcing the desination folder to not clobber _site?
  # Consider appending jekyll-sitemap to the plugins here, instead of in _config.
  # Note: Config keys must be strings and thus use => style hashes.
  @site_config ||= Jekyll.configuration({ 'sass' => { 'quiet_deps' => true } })
end

def build_jekyll_site!
  puts 'Building site...'
  @site = Jekyll::Site.new(site_config)
  @site.process
  puts 'Site build complete.'
end

def load_sitemap
  # Ensure that you have called build_jekyll_site! first.
  sitemap_text = File.read('_site/sitemap.xml')
  sitemap_links = sitemap_text.scan(%r{<loc>.+</loc>})
  sitemap_links.filter_map do |link|
    link = link.gsub("<loc>#{site_config['url']}", '').gsub('</loc>', '')
    # Skip non-html pages
    # (FUTURE?) Are there other pages that should be audited for accessibility?
    # (e.g. PDFs, documents. They'd need a different checker.)
    next unless link.end_with?('.html') || link.end_with?('/')

    link
  end.sort
end

# Start a local Rack server
# adapted from https://nts.strzibny.name/how-to-test-static-sites-with-rspec-capybara-and-webkit/
class StaticSite
  attr_reader :root, :server

  def initialize(root)
    @root = root
    @server = Rack::Files.new(root)
  end

  def call(env)
    # Remove the /baseurl prefix, which is present in all URLs, but not in the file system.
    path = "_site#{env['PATH_INFO'].gsub(site_config['baseurl'], '/')}"

    env['PATH_INFO'] = if path.end_with?('/') && exists?("#{path}index.html")
                         "#{path}index.html"
                       elsif !exists?(path) && exists?("#{path}.html")
                         "#{path}.html"
                       else
                         path
                       end

    server.call(env)
  end

  def exists?(path)
    File.exist?(File.join(root, path))
  end
end
