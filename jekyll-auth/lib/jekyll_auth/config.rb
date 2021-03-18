# frozen_string_literal: true

class JekyllAuth
  def self.config_file
    File.join(Dir.pwd, "_config.yml")
  end

  def self.jekyll_config
    @config ||= YAML.safe_load_file(config_file)
  rescue StandardError
    {}
  end

  def self.config
    jekyll_config.fetch("jekyll_auth", {})
  end

  def self.destination
    jekyll_config.fetch("destination", File.expand_path("_site", Dir.pwd))
  end

  def self.whitelist
    whitelist = config["whitelist"]
    Regexp.new(whitelist.join("|")) unless whitelist.nil?
  end

  def self.ssl?
    !!config["ssl"]
  end
end
