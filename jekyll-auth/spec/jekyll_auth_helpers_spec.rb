# frozen_string_literal: true

require "spec_helper"

describe "strategies" do
  class TestHelper
    include JekyllAuth::Helpers

    def initialize(path = nil)
      @path = path
    end

    def request
      Rack::Request.new("PATH_INFO" => @path)
    end
  end

  before(:each) do
    JekyllAuth.instance_variable_set("@config", nil)
    @helper = TestHelper.new
    ENV["GITHUB_ORG_NAME"] = nil
    ENV["GITHUB_TEAM_ID"] = nil
    ENV["GITHUB_TEAMS_ID"] = nil
  end

  it "should return nil if no ID is set" do
    expect(@helper.authentication_strategy).to eql(nil)
  end

  it "should detect the org strategy" do
    with_env("GITHUB_ORG_NAME", "some_org") do
      expect(@helper.authentication_strategy).to eql(:org)
    end
  end

  it "should detect the team strategy" do
    with_env("GITHUB_TEAM_ID", "1234") do
      expect(@helper.authentication_strategy).to eql(:team)
    end
  end

  it "should detect the teams strategy" do
    with_env("GITHUB_TEAM_IDS", "1234,5678") do
      expect(@helper.authentication_strategy).to eql(:teams)
    end
  end

  it "should know if a path is whitelisted" do
    File.write(JekyllAuth.config_file, "jekyll_auth:\n  whitelist:\n   - drafts?\n")

    helper = TestHelper.new("/foo")
    expect(helper.whitelisted?).to eql(false)

    helper = TestHelper.new("/draft")
    expect(helper.whitelisted?).to eql(true)
  end

  it "should not err out if there is no whitelist" do
    helper = TestHelper.new("/drafts")
    JekyllAuth.instance_variable_set("@config", {})
    expect(helper.whitelisted?).to eql(false)
  end
end
