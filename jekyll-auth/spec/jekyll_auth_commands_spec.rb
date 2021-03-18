# frozen_string_literal: true

require "spec_helper"

describe "commands" do
  before do
    setup_tmp_dir
  end

  it "should find the template directory" do
    expect(File.directory?(JekyllAuth::Commands.source)).to eql(true)
    expect(File).to exist("#{JekyllAuth::Commands.source}/config.ru")
  end

  it "should know the destination directory" do
    expect(JekyllAuth::Commands.destination).to eql(tmp_dir)
  end

  it "should execute a command" do
    expect(JekyllAuth::Commands.execute_command("ls")).to match(%r!index\.html!)
  end

  it "should retrieve a team's ID" do
    stub_request(:get, "https://api.github.com/orgs/batler-test-org/teams?per_page=100")
      .to_return(:status => 204, :body => [{ :slug => "test-team", :id => 1 }])
    expect(JekyllAuth::Commands.team_id("batler-test-org", "test-team")).to eql(1)
  end

  it "should copy the template files" do
    expect(File).to_not exist("#{tmp_dir}/config.ru")
    JekyllAuth::Commands.copy_templates
    expect(File).to exist("#{tmp_dir}/config.ru")
    expect(File).to exist("#{tmp_dir}/Rakefile")
    expect(File).to exist("#{tmp_dir}/.gitignore")
  end

  it "should know when a directory's changed" do
    `git init`
    `git add .`
    `git commit -m 'initial commit'`
    expect(JekyllAuth::Commands.changed?).to eql(false)
    `touch config.ru`
    expect(JekyllAuth::Commands.changed?).to eql(true)
  end

  it "knows when env vars are set" do
    var = "SOME_ENV_VAR"

    ENV.delete(var)
    expect(JekyllAuth::Commands.env_var_set?(var)).to eql(false)

    ENV[var] = "bar"
    expect(JekyllAuth::Commands.env_var_set?(var)).to eql(true)

    ENV[var] = ""
    expect(JekyllAuth::Commands.env_var_set?(var)).to eql(false)

    ENV[var] = nil
    expect(JekyllAuth::Commands.env_var_set?(var)).to eql(false)
  end

  it "knows when there's a heroku remote" do
    `git init`
    expect(JekyllAuth::Commands.heroku_remote_set?).to eql(false)
    `git remote add heroku https://example.com`
    expect(JekyllAuth::Commands.heroku_remote_set?).to eql(true)
  end

  it "should make an initial commit" do
    `git init`
    `touch foo.md`
    `git add foo.md`
    JekyllAuth::Commands.initial_commit
    output = JekyllAuth::Commands.execute_command "git", "log"
    expect(output).to match(%r!\[Jekyll Auth\] Initial setup!)
  end
end
