# frozen_string_literal: true

require "spec_helper"

describe "jekyll site" do
  include Rack::Test::Methods

  def app
    JekyllAuth::JekyllSite
  end

  before do
    setup_tmp_dir
    File.write File.expand_path("_config.yml", tmp_dir), "foo: bar"
    `bundle exec jekyll build`
  end

  it "serves the index" do
    get "/"
    expect(last_response.body).to eql("My awesome site")
  end

  it "serves a page" do
    get "/index.html"
    expect(last_response.body).to eql("My awesome site")
  end

  it "serves a directory index" do
    get "/some_dir"
    expect(last_response.body).to eql("My awesome directory")
  end

  it "serves the default 404" do
    get "/a-bad-path"
    expect(last_response.status).to eql(404)
    expect(last_response.body).to eql("<h1>Not Found</h1>")
  end

  it "serves a custom 404" do
    File.write File.expand_path("_site/404.html", tmp_dir), "My custom 404"
    get "/a-bad-path"
    expect(last_response.status).to eql(404)
    expect(last_response.body).to eql("My custom 404")
  end
end
