# frozen_string_literal: true

class JekyllAuth
  class AuthSite < Sinatra::Base
    configure :production do
      require "rack-ssl-enforcer"
      use Rack::SslEnforcer if JekyllAuth.ssl?
    end

    use Rack::Session::Cookie,       :http_only => true,
                                     :secret    => ENV["SESSION_SECRET"] || SecureRandom.hex

    set :github_options, :scopes => "read:org"

    ENV["WARDEN_GITHUB_VERIFIER_SECRET"] ||= SecureRandom.hex
    register Sinatra::Auth::Github

    use Rack::Logger

    include JekyllAuth::Helpers

    before do
      pass if whitelisted?

      logger.info "Authentication strategy: #{authentication_strategy}"

      case authentication_strategy
      when :team
        github_team_authenticate! ENV["GITHUB_TEAM_ID"]
      when :teams
        github_teams_authenticate! ENV["GITHUB_TEAM_IDS"].split(",")
      when :org
        github_organization_authenticate! ENV["GITHUB_ORG_NAME"]
      else
        raise JekyllAuth::ConfigError
      end
    end

    get "/logout" do
      logout!
      redirect "/"
    end
  end
end
