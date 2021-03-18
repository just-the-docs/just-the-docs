# frozen_string_literal: true

require "spec_helper"

describe "bin" do
  before(:each) do
    setup_tmp_dir
  end

  it "spits out the help do" do
    env = { "GITHUB_TOKEN" => nil }
    output = execute_bin(env, "--help")
    expect(output).to match(%r!A simple way to use Github OAuth to serve a protected jekyll site to your GitHub organization!)
  end

  describe "team id" do
    it "errors if no token is given" do
      env = { "GITHUB_TOKEN" => nil }
      expect { execute_bin(env, "team_id", "--org", "balter-test-org", "--team", "1") }.to raise_error(RuntimeError)
        .with_message(%r!prefix the jekyll-auth command with GITHUB_TOKEN!)
    end

    it "errors if no team_id or org_name is given" do
      env = { "GITHUB_TOKEN" => "1234" }
      expect { execute_bin(env, "team_id") }.to raise_error(RuntimeError)
        .with_message(%r!An org name and team ID are required!)
    end
  end

  it "initializes a new site" do
    `git init`
    `git add .`
    `git commit -m 'initial commit'`
    execute_bin({ "RACK_ENV" => "TEST" }, "new")
    expect(File).to exist("#{tmp_dir}/config.ru")
    expect(File).to exist("#{tmp_dir}/Rakefile")
    expect(File).to exist("#{tmp_dir}/.gitignore")
    expect(File).to exist("#{tmp_dir}/.env")
  end

  it "builds the site" do
    execute_bin({}, "build")
    expect(File).to exist("#{tmp_dir}/_site/index.html")
  end
end
