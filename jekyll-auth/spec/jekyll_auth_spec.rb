# frozen_string_literal: true

require "spec_helper"

describe "JekyllAuth" do
  before(:each) do
    setup_tmp_dir
    JekyllAuth.instance_variable_set("@config", nil)
  end

  it "should know the config file path" do
    expected = File.expand_path "tmp/_config.yml", base_dir
    expect(JekyllAuth.config_file).to eql(expected)
  end

  it "should return a null hash if no config file exists" do
    expect(JekyllAuth.config).to eql({})
  end

  it "should return a null hash if config file doesn't contain jekyll_auth" do
    File.write(JekyllAuth.config_file, "foo: bar\n")
    expect(JekyllAuth.config).to eql({})
  end

  it "should return the config hash if the config files contains jekyll_auth" do
    File.write(JekyllAuth.config_file, "jekyll_auth:\n  ssl: true\n  whitelist:\n   - drafts?\n")
    expect(JekyllAuth.config).to eql("ssl" => true, "whitelist" => ["drafts?"])
  end

  it "should disable ssl by default" do
    expect(JekyllAuth.ssl?).to eql(false)
  end

  it "should know when ssl is requested" do
    File.write(JekyllAuth.config_file, "jekyll_auth:\n  ssl:true\n")
    expect(JekyllAuth.ssl?).to eql(true)
  end

  it "should know when ssl is disabled" do
    File.write(JekyllAuth.config_file, "jekyll_auth:\n  ssl:false\n")
    expect(JekyllAuth.ssl?).to eql(true)
  end

  it "should parse the whitelist" do
    File.write(JekyllAuth.config_file, "jekyll_auth:\n  whitelist:\n   - drafts?\n")
    expect(JekyllAuth.whitelist).to eql(%r!drafts?!)
  end
end
