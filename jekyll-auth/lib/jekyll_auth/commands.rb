# frozen_string_literal: true

class JekyllAuth
  class Commands
    FILES = %w(Rakefile config.ru .gitignore .env).freeze
    VARS  = %w(client_id client_secret team_id org_name).freeze

    def self.source
      @source ||= File.expand_path("../../templates", File.dirname(__FILE__))
    end

    def self.destination
      @destination ||= Dir.pwd
    end

    def self.changed?
      !execute_command("git", "status", destination, "--porcelain").empty?
    rescue StandardError
      false
    end

    def self.execute_command(*args)
      output, status = Open3.capture2e(*args)
      raise "Command `#{args.join(" ")}` failed: #{output}" unless status.exitstatus.zero?
      output
    end

    def self.copy_templates
      FILES.each do |file|
        if File.exist? "#{destination}/#{file}"
          puts "* #{destination}/#{file} already exists... skipping."
        else
          puts "* creating #{destination}/#{file}"
          FileUtils.cp "#{source}/#{file}", "#{destination}/#{file}"
        end
      end
    end

    def self.team_id(org, team)
      client = Octokit::Client.new :access_token => ENV["GITHUB_TOKEN"]
      client.auto_paginate = true
      teams = client.organization_teams org
      found = teams.find { |t| t[:slug] == team }
      found[:id] if found
    end

    def self.env_var_set?(var)
      !ENV[var].to_s.blank?
    end

    def self.init_repo
      execute_command "git", "init", destination
      FILES.each do |file|
        next if file == ".env"
        execute_command("git", "add", "--", "#{destination}/#{file}")
      end
    end

    def self.initial_commit
      execute_command "git", "commit", "-m", "'[Jekyll Auth] Initial setup'"
    end

    def self.heroku_remote_set?
      remotes = execute_command "git", "remote", "-v"
      !!(remotes =~ %r!^heroku\s!)
    end

    def self.configure_heroku(options)
      VARS.each do |var|
        execute_command "heroku", "config:set", "GITHUB_#{var.upcase}=#{options[var]}" if options[var]
      end
    end
  end
end
