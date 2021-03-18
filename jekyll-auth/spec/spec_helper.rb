# frozen_string_literal: true

require "bundler/setup"
require "fileutils"

ENV["RACK_ENV"] = "test"
$LOAD_PATH.push File.join(File.dirname(__FILE__), "..", "lib")

require "rack/test"
require "sinatra/auth/github"
require "sinatra/auth/github/test/test_helper"
require "webmock/rspec"
require "dotenv"
require "open3"

def base_dir
  File.expand_path "../", File.dirname(__FILE__)
end

def tmp_dir
  File.expand_path "tmp", base_dir
end

def bin_path
  File.expand_path "./bin/jekyll-auth", base_dir
end

def tear_down_tmp_dir
  FileUtils.rm_rf tmp_dir
end

def setup_tmp_dir
  tear_down_tmp_dir
  FileUtils.mkdir tmp_dir
  File.write File.expand_path("index.html", tmp_dir), "My awesome site"
  FileUtils.mkdir "#{tmp_dir}/some_dir"
  File.write File.expand_path("some_dir/index.html", tmp_dir), "My awesome directory"
  Dir.chdir tmp_dir
end

def with_env(key, value)
  old_env = ENV[key]
  ENV[key] = value
  yield
  ENV[key] = old_env
end

def execute_bin(env, *args)
  output, status = Open3.capture2e(env, bin_path, *args)
  raise "Command `#{bin_path} #{args.join(" ")}` failed: #{output}" if status != 0
  output
end

Dotenv.load
ENV["GITHUB_CLIENT_ID"] ||= "IGNORE"
ENV["GITHUB_CLIENT_SECRET"] ||= "IGNORE"
setup_tmp_dir

require_relative "../lib/jekyll-auth"
WebMock.disable_net_connect!

RSpec.configure do |config|
  config.include(Sinatra::Auth::Github::Test::Helper)
end
